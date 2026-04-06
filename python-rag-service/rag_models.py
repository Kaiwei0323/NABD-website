"""
Same embedding + reranker stack as the Jupyter notebook (Hugging Face NVIDIA models).
"""
from __future__ import annotations

import logging
from typing import Any, List, Optional

import torch
import torch.nn.functional as F
from langchain.embeddings.base import Embeddings
from langchain.retrievers.document_compressors.base import BaseDocumentCompressor
from langchain.schema import Document
from pydantic.v1 import PrivateAttr
from transformers import AutoModel, AutoTokenizer

_LOGGER = logging.getLogger(__name__)

MAX_LENGTH = 8192


class HuggingFaceNVIDIAEmbeddings(Embeddings):
    """NVIDIA Llama 3.2 embedding model from Hugging Face (matches notebook)."""

    def __init__(self, model_name: str, device: str = "auto", trust_remote_code: bool = True):
        self.model_name = model_name
        self.device = device if device != "auto" else ("cuda" if torch.cuda.is_available() else "cpu")

        _LOGGER.info("Loading embedding model: %s", model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=trust_remote_code)
        _LOGGER.info("Loading model with trust_remote_code=True...")
        self.model = AutoModel.from_pretrained(model_name, trust_remote_code=trust_remote_code)
        self.model.to(self.device)
        self.model.eval()
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        _LOGGER.info("Embedding model loaded on %s", self.device)

    def average_pool(self, last_hidden_states: torch.Tensor, attention_mask: torch.Tensor) -> torch.Tensor:
        last_hidden_states_masked = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
        embedding = last_hidden_states_masked.sum(dim=1) / attention_mask.sum(dim=1)[..., None]
        return F.normalize(embedding, dim=-1)

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        prefixed = [f"passage: {t}" for t in texts]
        return self._embed_texts(prefixed)

    def embed_query(self, text: str) -> List[float]:
        return self._embed_texts([f"query: {text}"])[0]

    def _embed_texts(self, texts: List[str]) -> List[List[float]]:
        out: List[List[float]] = []
        batch_size = 8
        for i in range(0, len(texts), batch_size):
            batch = texts[i : i + batch_size]
            batch_inputs = self.tokenizer(
                batch,
                padding=True,
                truncation=True,
                max_length=MAX_LENGTH,
                return_tensors="pt",
            ).to(self.device)
            with torch.no_grad():
                outputs = self.model(**batch_inputs)
                batch_embeddings = self.average_pool(outputs.last_hidden_state, batch_inputs["attention_mask"])
            out.extend(batch_embeddings.to(torch.float32).cpu().numpy().tolist())
        return out


class HuggingFaceNVIDIAReranker(BaseDocumentCompressor):
    """NVIDIA Llama 3.2 reranker (matches notebook)."""

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
        top_k: int = 3,
        max_length: int = 512,
    ):
        super().__init__()
        object.__setattr__(self, "_model_name", model_name)
        object.__setattr__(
            self,
            "_device",
            device if device != "auto" else ("cuda" if torch.cuda.is_available() else "cpu"),
        )
        object.__setattr__(self, "_top_k", top_k)
        object.__setattr__(self, "_max_length", max_length)

        _LOGGER.info("Loading reranking model: %s", model_name)
        self._tokenizer = AutoTokenizer.from_pretrained(
            model_name, trust_remote_code=trust_remote_code, padding_side="left"
        )
        if self._tokenizer.pad_token is None:
            self._tokenizer.pad_token = self._tokenizer.eos_token

        from transformers import AutoModelForSequenceClassification

        self._model = AutoModelForSequenceClassification.from_pretrained(
            model_name, trust_remote_code=trust_remote_code
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
        scores = self._calculate_relevance_scores(query, [d.page_content for d in documents])
        pairs = list(zip(documents, scores))
        pairs.sort(key=lambda x: x[1], reverse=True)
        return [d for d, _ in pairs[: self._top_k]]

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
            scores = logits.to(torch.float32).view(-1).cpu().tolist()
        return scores
