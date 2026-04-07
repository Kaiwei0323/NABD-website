# CPU-only image (works on any host; embedding/rerank are slower than GPU)
FROM python:3.10-slim-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu && \
    sed '/^torch/d' requirements.txt > /tmp/req-notorch.txt && \
    pip install --no-cache-dir -r /tmp/req-notorch.txt

COPY . .

EXPOSE 8765

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8765"]
