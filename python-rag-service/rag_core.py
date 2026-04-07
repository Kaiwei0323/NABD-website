"""
RAG pipeline aligned with RAG Agent with Nemotron RAG Models.ipynb:
local HF NVIDIA embed + rerank, FAISS retrieval, NVIDIA AI Endpoints LLM.
"""
from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Any, List, Optional

import torch
import torch.nn.functional as F
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors.base import BaseDocumentCompressor
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document

try:
    from langchain_core.embeddings import Embeddings
except ImportError:  # pragma: no cover
    from langchain.embeddings.base import Embeddings  # type: ignore[no-redef]
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pydantic.v1 import PrivateAttr
from transformers import AutoModel, AutoModelForSequenceClassification, AutoTokenizer

_LOGGER = logging.getLogger(__name__)

# Match notebook defaults
LLM_MODEL = "nvidia/nvidia-nemotron-nano-9b-v2"
RETRIEVER_EMBEDDING_MODEL = "nvidia/llama-3.2-nv-embedqa-1b-v2"
RETRIEVER_RERANK_MODEL = "nvidia/llama-3.2-nv-rerankqa-1b-v2"
CHUNK_SIZE = 800
CHUNK_OVERLAP = 120
MAX_LENGTH = 8192
FAISS_K = 6
RERANK_TOP_K = 3


class HuggingFaceNVIDIAEmbeddings(Embeddings):
    def __init__(self, model_name: str, device: str = "auto", trust_remote_code: bool = True):
        self.model_name = model_name
        self.device = device if device != "auto" else ("cuda" if torch.cuda.is_available() else "cpu")
        _LOGGER.info("Loading embedding model: %s", model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=trust_remote_code)
        self.model = AutoModel.from_pretrained(model_name, trust_remote_code=trust_remote_code)
        self.model.to(self.device)
        self.model.eval()
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        _LOGGER.info("Embedding model loaded on %s", self.device)

    def average_pool(self, last_hidden_states: torch.Tensor, attention_mask: torch.Tensor) -> torch.Tensor:
        last_hidden_states_masked = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
        embedding = last_hidden_states_masked.sum(dim=1) / attention_mask.sum(dim=1)[..., None]
        embedding = F.normalize(embedding, dim=-1)
        return embedding

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        prefixed_texts = [f"passage: {text}" for text in texts]
        return self._embed_texts(prefixed_texts)

    def embed_query(self, text: str) -> List[float]:
        prefixed_text = f"query: {text}"
        return self._embed_texts([prefixed_text])[0]

    def _embed_texts(self, texts: List[str]) -> List[List[float]]:
        embeddings: List[List[float]] = []
        batch_size = 8
        for i in range(0, len(texts), batch_size):
            batch_texts = texts[i : i + batch_size]
            batch_inputs = self.tokenizer(
                batch_texts,
                padding=True,
                truncation=True,
                max_length=MAX_LENGTH,
                return_tensors="pt",
            ).to(self.device)
            with torch.no_grad():
                outputs = self.model(**batch_inputs)
                batch_embeddings = self.average_pool(outputs.last_hidden_state, batch_inputs["attention_mask"])
            embeddings.extend(batch_embeddings.to(torch.float32).cpu().numpy().tolist())
        return embeddings


class HuggingFaceNVIDIAReranker(BaseDocumentCompressor):
    _model_name: str = PrivateAttr()
    _device: str = PrivateAttr()
    _top_k: int = PrivateAttr()
    _max_length: int = PrivateAttr()
    _tokenizer: Any = PrivateAttr()
    _model: Any = PrivateAttr()

    def __init__(
        self,
        model_name: str,
        device: str = "auto",
        trust_remote_code: bool = True,
        top_k: int = RERANK_TOP_K,
        max_length: int = 512,
    ):
        super().__init__()
        object.__setattr__(self, "_model_name", model_name)
        object.__setattr__(self, "_device", device if device != "auto" else ("cuda" if torch.cuda.is_available() else "cpu"))
        object.__setattr__(self, "_top_k", top_k)
        object.__setattr__(self, "_max_length", max_length)
        _LOGGER.info("Loading reranking model: %s", model_name)
        self._tokenizer = AutoTokenizer.from_pretrained(
            model_name,
            trust_remote_code=trust_remote_code,
            padding_side="left",
        )
        if self._tokenizer.pad_token is None:
            self._tokenizer.pad_token = self._tokenizer.eos_token
        self._model = AutoModelForSequenceClassification.from_pretrained(
            model_name,
            trust_remote_code=trust_remote_code,
        ).eval()
        if self._model.config.pad_token_id is None:
            self._model.config.pad_token_id = self._tokenizer.eos_token_id
        self._model.to(self._device)
        _LOGGER.info("Reranking model loaded on %s", self._device)

    def _prompt_template(self, query: str, passage: str) -> str:
        return f"question:{query} \n \n passage:{passage}"

    def compress_documents(
        self,
        documents: List[Document],
        query: str,
        callbacks: Optional[Any] = None,
    ) -> List[Document]:
        if not documents:
            return documents
        scores = self._calculate_relevance_scores(query, [doc.page_content for doc in documents])
        doc_scores = list(zip(documents, scores))
        sorted_docs = sorted(doc_scores, key=lambda x: x[1], reverse=True)
        return [doc for doc, _ in sorted_docs[: self._top_k]]

    def _calculate_relevance_scores(self, query: str, documents: List[str]) -> List[float]:
        texts = [self._prompt_template(query, doc) for doc in documents]
        batch_dict = self._tokenizer(
            texts,
            padding=True,
            truncation=True,
            return_tensors="pt",
            max_length=self._max_length,
        )
        batch_dict = {k: v.to(self._device) for k, v in batch_dict.items()}
        with torch.inference_mode():
            logits = self._model(**batch_dict).logits
            scores = logits.view(-1).cpu().tolist()
        return scores


def _load_qa_documents(json_path: Path) -> List[Document]:
    raw = json.loads(json_path.read_text(encoding="utf-8"))
    items = raw.get("items") or []
    docs: List[Document] = []
    for item in items:
        q = item.get("question", "")
        a = item.get("answer", "")
        cat = item.get("category", "")
        iid = item.get("id", "")
        page = f"Category: {cat}\nQuestion: {q}\nAnswer: {a}"
        docs.append(
            Document(
                page_content=page,
                metadata={"id": iid, "category": cat},
            )
        )
    return docs


def build_retriever_and_llm(qa_json_path: Path):
    if not os.environ.get("NVIDIA_API_KEY"):
        raise RuntimeError("NVIDIA_API_KEY is not set. Export it before starting the service.")

    docs = _load_qa_documents(qa_json_path)
    if not docs:
        raise RuntimeError(f"No Q&A items found in {qa_json_path}")

    splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
    chunks = splitter.split_documents(docs)
    _LOGGER.info("Indexed %s chunks from %s Q&A rows", len(chunks), len(docs))

    embeddings = HuggingFaceNVIDIAEmbeddings(RETRIEVER_EMBEDDING_MODEL)
    reranker = HuggingFaceNVIDIAReranker(RETRIEVER_RERANK_MODEL)

    vectordb = FAISS.from_documents(chunks, embeddings)
    kb_retriever = vectordb.as_retriever(search_type="similarity", search_kwargs={"k": FAISS_K})
    retriever = ContextualCompressionRetriever(base_retriever=kb_retriever, base_compressor=reranker)

    llm = ChatNVIDIA(model=LLM_MODEL, temperature=0.6, top_p=0.95, max_completion_tokens=8192)

    return retriever, llm


SYSTEM_INSTRUCTIONS = """You are an assistant for Inventec NA developer documentation (QC01W, NVIDIA Jetson reflash guides, EDL, ADB, etc.).
- Answer using the provided context when it is relevant.
- If the context does not contain enough information, say you are not sure and suggest checking the developer documentation pages or contacting support.
- Be concise, accurate, and conversational. Do not invent SFTP passwords or credentials; if the context says credentials are partner-only, repeat that."""


def format_context(docs: List[Document]) -> str:
    parts = []
    for i, d in enumerate(docs, start=1):
        meta = d.metadata or {}
        label = meta.get("id") or meta.get("category") or f"chunk-{i}"
        parts.append(f"[{label}]\n{d.page_content}")
    return "\n\n---\n\n".join(parts)


def chat_with_rag(
    retriever: ContextualCompressionRetriever,
    llm: ChatNVIDIA,
    message: str,
    history: List[dict],
) -> tuple[str, List[dict]]:
    docs = retriever.get_relevant_documents(message)
    context = format_context(docs)
    source_refs = []
    for d in docs:
        m = d.metadata or {}
        source_refs.append({"id": m.get("id"), "category": m.get("category")})

    from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

    system_content = f"{SYSTEM_INSTRUCTIONS}\n\nContext from knowledge base:\n{context}"
    messages: List[Any] = [SystemMessage(content=system_content)]
    for turn in history[-8:]:
        role = turn.get("role")
        content = (turn.get("content") or "").strip()
        if not content:
            continue
        if role == "user":
            messages.append(HumanMessage(content=content))
        elif role == "assistant":
            messages.append(AIMessage(content=content))
    messages.append(HumanMessage(content=message))

    resp = llm.invoke(messages)
    reply = (resp.content or "").strip()
    return reply, source_refs
