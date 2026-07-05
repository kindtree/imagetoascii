# Image → ASCII

A browser-based **image-to-ASCII** tool with an **AI image generator** built in.
On the homepage you can either **upload a photo** or **describe one** (AI generates it via
APIMart `gpt-image-2`), and it is converted to ASCII art entirely in the browser.

- **Frontend:** static `index.html` + `assets/tool.js` (self-contained ASCII engine, runs in the browser).
- **Backend:** one small **FastAPI** server that serves the site **and** proxies APIMart so the
  API key never reaches the browser.
- No `/app` page anymore — the tool lives on the homepage (`#tool`).

## 1. Requirements
- Python 3.9+
- An APIMart API key (https://api.apimart.ai) — **only needed for AI image generation**; upload-to-ASCII works without it.

## 2. Configure the API key (server-side only)
The backend looks for the key in this order:
1. `APIMART_API_KEY` environment variable ← **recommended for servers**
2. `./.env` file with `APIMART_API_KEY=...`
3. `~/.config/apimart/api_key`

Never commit the real key. `.env` is git-ignored; copy the template:
```bash
cp .env.example .env   # then edit .env and paste your key
# or, simplest on a server:
export APIMART_API_KEY=sk-...
```

## 3. Run locally
```bash
pip install -r requirements.txt
export APIMART_API_KEY=sk-...
uvicorn server:app --host 0.0.0.0 --port 8000
# open http://localhost:8000
```

## 4. Deploy on a server (VPS)
```bash
# 1) copy the project to the server, then:
pip install -r requirements.txt
# 2) set the key (persist it, e.g. in the systemd unit / shell profile)
export APIMART_API_KEY=sk-...
# 3) run with multiple workers behind the port you expose
uvicorn server:app --host 0.0.0.0 --port 8000 --workers 2
```
Put Nginx/Caddy in front for TLS and proxy to `127.0.0.1:8000`. Example systemd unit:
```ini
[Service]
WorkingDirectory=/opt/imagetoascii
Environment=APIMART_API_KEY=sk-...
ExecStart=/usr/bin/uvicorn server:app --host 127.0.0.1 --port 8000 --workers 2
Restart=always
```

## 5. Deploy on Coolify (Hostinger)
This repo ships a `Dockerfile`, so Coolify builds and runs it with zero extra config.

1. **New Resource → Application → your Git repo** (Coolify auto-detects the `Dockerfile`, build pack = Dockerfile).
2. **Port:** set the exposed/container port to **8000** (the Dockerfile `EXPOSE`s 8000 and honours `$PORT`).
3. **Environment variables** → add:
   - `APIMART_API_KEY` = your APIMart key  ← **required for AI generation** (there is no key file on the server, so this env var is the only source).
   - optional: `APIMART_IMAGE_MODEL` (default `gpt-image-2`), `APIMART_POLL_TIMEOUT`, `APIMART_INITIAL_WAIT`.
4. **Domain:** set `https://imagetoascii.app` (and `www`). DNS already points to the server; Coolify provisions TLS.
5. Deploy. Verify with `https://imagetoascii.app/api/health` → `{"ok":true,"key_configured":true}`.

> AI generation can take 30–70s and each request holds a worker; if you expect concurrency, raise the container's uvicorn `--workers` (edit the Dockerfile `CMD`) or Coolify replicas.

## Endpoints
| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | The site (index.html) + static assets |
| `GET` | `/api/health` | `{ok, model, key_configured}` — check the key is wired |
| `POST` | `/api/generate` | `{prompt, size?}` → `{image: "data:image/...;base64,...", prompt}` |

## Notes
- **AI generation takes ~30–70s** per image (APIMart submit + async polling). The UI shows a status line.
- The AI prompt is automatically enhanced (high contrast, bold subject, clean background) so results convert cleanly to ASCII — see `ASCII_PROMPT_SUFFIX` in `server.py`.
- Change the model / timeouts via env: `APIMART_IMAGE_MODEL`, `APIMART_POLL_TIMEOUT`, `APIMART_INITIAL_WAIT`.
- The ASCII conversion itself is 100% client-side (canvas), so it is instant and private.
