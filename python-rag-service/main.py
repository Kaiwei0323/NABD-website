"""
FastAPI service: developer Q&A RAG (developerQA.json) using the Nemotron RAG stack.
"""
from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from pathlib import Path
from typing import List, Literal, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from rag_core import build_retriever_and_llm, chat_with_rag

load_dotenv()

logging.basicConfig(level=logging.INFO)
_LOGGER = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent
QA_PATH = BASE_DIR / "developerQA.json"

retriever = None
llm = None
_load_error: Optional[str] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global retriever, llm, _load_error
    try:
        _LOGGER.info("Building vector index and models (first start may take several minutes)...")
        retriever, llm = build_retriever_and_llm(QA_PATH)
        _load_error = None
        _LOGGER.info("RAG pipeline ready.")
    except Exception as e:
        _load_error = str(e)
        _LOGGER.exception("Failed to initialize RAG: %s", e)
    yield


app = FastAPI(title="Inventec NA Developer RAG", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., max_length=12000)


class DeveloperChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    history: List[ChatTurn] = Field(default_factory=list)


class SourceRef(BaseModel):
    id: Optional[str] = None
    category: Optional[str] = None


class DeveloperChatResponse(BaseModel):
    reply: str
    sources: List[SourceRef] = Field(default_factory=list)


@app.get("/api/health")
def health():
    return {
        "status": "ok" if retriever and llm else "degraded",
        "rag_ready": bool(retriever and llm),
        "error": _load_error,
    }


@app.post("/api/developer-chat", response_model=DeveloperChatResponse)
def developer_chat(body: DeveloperChatRequest):
    if not retriever or not llm:
        detail = _load_error or "RAG pipeline is not initialized."
        raise HTTPException(status_code=503, detail=detail)
    try:
        hist = [t.model_dump() for t in body.history]
        reply, sources = chat_with_rag(retriever, llm, body.message.strip(), hist)
        return DeveloperChatResponse(
            reply=reply,
            sources=[SourceRef(**s) for s in sources],
        )
    except Exception as e:
        _LOGGER.exception("Chat error: %s", e)
        raise HTTPException(status_code=500, detail="Assistant failed to respond. Try again later.") from e
