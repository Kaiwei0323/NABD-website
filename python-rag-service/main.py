"""
FastAPI sidecar: FAISS + NVIDIA HF embeddings + reranker (same pipeline as the notebook).
Node chatbox calls POST /retrieve with the user query.
"""
from __future__ import annotations

import json
import logging
import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any, Dict, List, Optional

import torch
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from langchain.retrievers import ContextualCompressionRetriever
from langchain.schema import Document
from langchain_community.vectorstores import FAISS
from pydantic import BaseModel, Field

from rag_models import HuggingFaceNVIDIAEmbeddings, HuggingFaceNVIDIAReranker

load_dotenv()

logging.basicConfig(level=logging.INFO)
_LOGGER = logging.getLogger(__name__)

RETRIEVER_EMBEDDING_MODEL = os.environ.get(
    "RETRIEVER_EMBEDDING_MODEL", "nvidia/llama-3.2-nv-embedqa-1b-v2"
)
RETRIEVER_RERANK_MODEL = os.environ.get(
    "RETRIEVER_RERANK_MODEL", "nvidia/llama-3.2-nv-rerankqa-1b-v2"
)
FAISS_K = int(os.environ.get("FAISS_K", "6"))
RERANK_TOP_K = int(os.environ.get("RERANK_TOP_K", "3"))

_service_dir = Path(__file__).resolve().parent
_default_qa = _service_dir / "developerQA.json"
_raw_qa = os.environ.get("QA_JSON_PATH")
if _raw_qa:
    _p = Path(_raw_qa)
    QA_JSON_PATH = _p if _p.is_absolute() else (_service_dir / _p).resolve()
else:
    QA_JSON_PATH = _default_qa

_retriever: Optional[ContextualCompressionRetriever] = None
_doc_count: int = 0


def _load_qa_documents(path: Path) -> List[Document]:
    raw = path.read_text(encoding="utf8")
    data = json.loads(raw)
    items = data.get("items") if isinstance(data, dict) else data
    if not isinstance(items, list):
        raise ValueError("JSON must contain an 'items' array")
    docs: List[Document] = []
    for it in items:
        q = (it.get("question") or it.get("q") or "").strip()
        a = (it.get("answer") or it.get("a") or "").strip()
        iid = str(it.get("id") or "").strip()
        if not (q and a and iid):
            continue
        page = f"Q: {q}\nA: {a}"
        docs.append(
            Document(
                page_content=page,
                metadata={"id": iid, "question": q},
            )
        )
    return docs


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _retriever, _doc_count
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    _LOGGER.info("Device: %s", device)

    if not QA_JSON_PATH.is_file():
        raise FileNotFoundError(f"QA JSON not found: {QA_JSON_PATH}")

    docs = _load_qa_documents(QA_JSON_PATH)
    _doc_count = len(docs)
    if _doc_count == 0:
        raise RuntimeError("No Q&A documents loaded from JSON")

    embeddings = HuggingFaceNVIDIAEmbeddings(RETRIEVER_EMBEDDING_MODEL, device=str(device))
    _LOGGER.info("Building FAISS index (%d documents)...", _doc_count)
    vectordb = FAISS.from_documents(docs, embeddings)
    base = vectordb.as_retriever(search_type="similarity", search_kwargs={"k": FAISS_K})
    reranker = HuggingFaceNVIDIAReranker(
        RETRIEVER_RERANK_MODEL,
        device=str(device),
        top_k=RERANK_TOP_K,
    )
    _retriever = ContextualCompressionRetriever(
        base_retriever=base,
        base_compressor=reranker,
    )
    _LOGGER.info("RAG pipeline ready (FAISS k=%s, rerank top_k=%s)", FAISS_K, RERANK_TOP_K)
    yield
    _retriever = None


app = FastAPI(title="Inventec NA RAG (notebook-aligned)", lifespan=lifespan)


class RetrieveRequest(BaseModel):
    query: str = Field(..., min_length=1)


class Citation(BaseModel):
    id: str
    q: str
    score: float


class RetrieveResponse(BaseModel):
    context: str
    citations: List[Citation]
    mode: str = "faiss_rerank"


@app.get("/health")
def health() -> Dict[str, Any]:
    return {
        "ok": _retriever is not None,
        "doc_count": _doc_count,
        "embedding_model": RETRIEVER_EMBEDDING_MODEL,
        "rerank_model": RETRIEVER_RERANK_MODEL,
        "qa_json": str(QA_JSON_PATH),
    }


@app.post("/retrieve", response_model=RetrieveResponse)
def retrieve(req: RetrieveRequest) -> RetrieveResponse:
    if _retriever is None:
        raise RuntimeError("Retriever not initialized")

    q = req.query.strip()
    docs = _retriever.get_relevant_documents(q)

    parts: List[str] = []
    citations: List[Citation] = []
    for rank, doc in enumerate(docs):
        meta = doc.metadata or {}
        iid = str(meta.get("id", ""))
        question = str(meta.get("question", ""))
        score = 1.0 / float(rank + 1)
        parts.append(f"[{iid}] {doc.page_content}")
        citations.append(Citation(id=iid, q=question, score=score))

    context = "\n---\n".join(parts)
    return RetrieveResponse(context=context, citations=citations)


if __name__ == "__main__":
    # 0.0.0.0 avoids some Windows/loopback issues; still use http://127.0.0.1:8000 from Node
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "8000"))
    uvicorn.run("main:app", host=host, port=port, reload=False)
