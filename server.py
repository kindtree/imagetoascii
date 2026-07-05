"""
Image-to-ASCII — backend server.

Serves the static site (index.html + assets) AND exposes a single AI image
generation endpoint that proxies APIMart (so the API key stays server-side).

Run:
    pip install -r requirements.txt
    export APIMART_API_KEY=sk-...        # or put it in .env / ~/.config/apimart/api_key
    uvicorn server:app --host 0.0.0.0 --port 8000

Endpoints:
    POST /api/generate   {prompt, size?}  -> {image: "data:image/...;base64,...", prompt}
    GET  /api/health                       -> {ok, model, key_configured}
    GET  /*                                -> static files (index.html at /)
"""
from __future__ import annotations

import base64
import json
import mimetypes
import os
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Some slim base images don't register modern image types → served as
# application/octet-stream. Register them so StaticFiles sends correct MIME.
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/avif", ".avif")

# ---------------------------------------------------------------- config ----
ROOT = Path(__file__).parent.resolve()
API_BASE = "https://api.apimart.ai/v1"
IMAGE_MODEL = os.environ.get("APIMART_IMAGE_MODEL", "gpt-image-2")
POLL_TIMEOUT = float(os.environ.get("APIMART_POLL_TIMEOUT", "180"))
INITIAL_WAIT = float(os.environ.get("APIMART_INITIAL_WAIT", "8"))
POLL_INTERVAL = 4.0

# Prompt engineering: nudge the model toward images that convert to crisp ASCII
# (high local contrast, one clear subject, clean background, bold edges).
ASCII_PROMPT_SUFFIX = (
    " — high contrast, one bold clear subject, strong directional lighting, "
    "clean uncluttered background, sharp well-defined edges and silhouette, "
    "no fine low-contrast texture; composed to read well as ASCII art."
)


def resolve_api_key() -> str | None:
    """Env var first (server deploy), then project .env, then the apimart CLI config."""
    k = os.environ.get("APIMART_API_KEY")
    if k:
        return k.strip()
    envf = ROOT / ".env"
    if envf.is_file():
        for line in envf.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line.startswith("APIMART_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    cfg = Path.home() / ".config" / "apimart" / "api_key"
    if cfg.is_file():
        return cfg.read_text(encoding="utf-8").strip()
    return None


# ------------------------------------------------------------ apimart ----
def _auth(key: str) -> dict:
    return {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "image-to-ascii/1.0",
    }


def _post(path: str, key: str, body: dict) -> dict:
    req = urllib.request.Request(
        API_BASE + path, data=json.dumps(body).encode(), method="POST", headers=_auth(key)
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read())


def _get(path: str, key: str) -> dict:
    req = urllib.request.Request(API_BASE + path, method="GET", headers=_auth(key))
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read())


def _download(url: str) -> tuple[bytes, str]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; image-to-ascii/1.0)",
            "Accept": "image/*,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        ctype = resp.headers.get("Content-Type", "image/png").split(";")[0].strip()
        return resp.read(), ctype


def apimart_submit(prompt: str, size: str) -> str:
    """Submit a generation task and return the APIMart task_id immediately (no blocking)."""
    key = resolve_api_key()
    if not key:
        raise HTTPException(500, "APIMART_API_KEY is not configured on the server.")
    body: dict = {"model": IMAGE_MODEL, "prompt": prompt + ASCII_PROMPT_SUFFIX}
    if size:
        body["size"] = size
    try:
        resp = _post("/images/generations", key, body)
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise HTTPException(e.code, f"APIMart submit failed: {detail}")
    data = resp.get("data") or []
    task_id = data[0].get("task_id") if data else None
    if not task_id:
        raise HTTPException(502, f"APIMart returned no task_id: {json.dumps(resp)[:400]}")
    return task_id


def apimart_poll_once(task_id: str) -> dict:
    """Poll a task ONCE (fast). Returns {status, image?|error?} — never blocks."""
    key = resolve_api_key()
    if not key:
        raise HTTPException(500, "APIMART_API_KEY is not configured on the server.")
    try:
        r = _get(f"/tasks/{urllib.parse.quote(task_id)}", key)
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise HTTPException(e.code, f"APIMart poll failed: {detail}")
    d = r.get("data") or {}
    if isinstance(d, list):
        d = d[0] if d else {}
    status = d.get("status")
    if status == "completed":
        images = (d.get("result") or {}).get("images") or []
        urls: list[str] = []
        for img in images:
            if not isinstance(img, dict):
                continue
            u = img.get("url")
            if isinstance(u, str):
                urls.append(u)
            elif isinstance(u, list):
                urls.extend(x for x in u if isinstance(x, str))
        if not urls:
            raise HTTPException(502, "APIMart completed but returned no image URL.")
        img_bytes, ctype = _download(urls[0])
        b64 = base64.b64encode(img_bytes).decode()
        return {"status": "completed", "image": f"data:{ctype};base64,{b64}"}
    if status == "failed":
        err = (d.get("error") or {}).get("message") or json.dumps(r)[:300]
        return {"status": "failed", "error": err}
    return {"status": "processing"}


# ---------------------------------------------------------------- app ----
app = FastAPI(title="Image to ASCII")


@app.middleware("http")
async def _cache_control(request, call_next):
    """Tell Cloudflare/browser to revalidate the app shell + scripts so a new
    deploy is never served stale from cache. Static images still cache normally."""
    resp = await call_next(request)
    path = request.url.path
    if path == "/" or path.endswith((".html", ".js", ".css")):
        resp.headers["Cache-Control"] = "no-cache, must-revalidate"
    return resp


class GenerateRequest(BaseModel):
    prompt: str
    size: str | None = "1:1"


@app.get("/api/health")
def health():
    return {"ok": True, "model": IMAGE_MODEL, "key_configured": bool(resolve_api_key())}


@app.post("/api/generate")
def generate(req: GenerateRequest):
    """Async: submit to APIMart and return a task_id immediately (short request,
    never hits Cloudflare's ~100s proxy timeout). The client polls /api/status."""
    prompt = (req.prompt or "").strip()
    if not prompt:
        raise HTTPException(400, "A prompt is required.")
    if len(prompt) > 1000:
        raise HTTPException(400, "Prompt too long (max 1000 chars).")
    task_id = apimart_submit(prompt, req.size or "1:1")
    return {"task_id": task_id}


@app.get("/api/status/{task_id}")
def status(task_id: str):
    """Fast, non-blocking poll. → {status:'processing'} or {status:'completed',image}
    or {status:'failed',error}. Each call returns in well under a second."""
    return apimart_poll_once(task_id)


# Static site LAST so /api/* wins. html=True serves index.html at "/".
app.mount("/", StaticFiles(directory=str(ROOT), html=True), name="static")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", "8000")))
