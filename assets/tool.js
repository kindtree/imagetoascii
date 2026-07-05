/* =====================================================================
   Image → ASCII  ·  homepage tool
   - Self-contained client-side ASCII engine (Rec.601 luma + auto-levels
     + character-ramp mapping, the same approach the reference tool uses).
   - Two sources: upload an image, or generate one with AI via /api/generate.
   ===================================================================== */
(function () {
  'use strict';

  const CHARSETS = {
    standard: '@#S08Xx+=-;:,. ',
    detailed: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
    blocks: '█▓▒░ ',
    minimal: '@+. ',
  };

  // ---- core engine: image -> {text, lines, colorRows, cols, rows} ----
  function imageToAscii(img, opts) {
    const cols = Math.max(20, opts.columns | 0);
    const charAspect = 0.5; // monospace glyph is ~0.5 as wide as tall
    const rows = Math.max(1, Math.round(cols * (img.naturalHeight || img.height) /
      (img.naturalWidth || img.width) * charAspect));

    const off = document.createElement('canvas');
    off.width = cols; off.height = rows;
    const octx = off.getContext('2d', { willReadFrequently: true });
    octx.drawImage(img, 0, 0, cols, rows);
    const px = octx.getImageData(0, 0, cols, rows).data;

    // auto-levels: sample the true luminance range so dim images still pop
    let mn = 255, mx = 0;
    for (let i = 0; i < px.length; i += 4) {
      const l = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
      if (l < mn) mn = l; if (l > mx) mx = l;
    }
    const range = (mx - mn) || 1;
    const pool = opts.charset || CHARSETS.standard;

    const lines = [], colorRows = [];
    for (let y = 0; y < rows; y++) {
      let line = ''; const crow = [];
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        let n = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2] - mn) / range;
        if (opts.invert) n = 1 - n;
        line += pool[Math.min(pool.length - 1, Math.floor((1 - n) * (pool.length - 1)))];
        crow.push(opts.color ? [px[i], px[i + 1], px[i + 2]] : null);
      }
      lines.push(line); colorRows.push(crow);
    }
    return { text: lines.join('\n'), lines, colorRows, cols, rows };
  }

  // ---- render ascii to a canvas (for a crisp PNG export / preview) ----
  function renderToCanvas(result, canvas, opts) {
    const fs = opts.fontSize || 12;
    const cw = fs * 0.6, ch = fs;
    canvas.width = Math.round(result.cols * cw);
    canvas.height = Math.round(result.rows * ch);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = opts.bg || '#040406';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fs + 'px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textBaseline = 'top';
    for (let y = 0; y < result.rows; y++) {
      const row = result.lines[y];
      for (let x = 0; x < result.cols; x++) {
        const chr = row[x];
        if (chr === ' ') continue;
        const c = result.colorRows[y][x];
        ctx.fillStyle = c ? 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')' : (opts.fg || '#e8fff4');
        ctx.fillText(chr, x * cw, y * ch);
      }
    }
  }

  // ---- state + DOM ----
  const $ = (id) => document.getElementById(id);
  const els = {};
  let currentImage = null; // the loaded HTMLImageElement (source)
  let lastResult = null;

  function opts() {
    return {
      columns: +els.res.value,
      charset: CHARSETS[els.charset.value] || CHARSETS.standard,
      invert: els.invert.checked,
      color: els.color.checked,
      fontSize: 12,
      bg: '#040406',
      fg: '#e8fff4',
    };
  }

  function rerender() {
    if (!currentImage) return;
    lastResult = imageToAscii(currentImage, opts());
    renderToCanvas(lastResult, els.canvas, opts());
    els.result.hidden = false;
  }

  function loadFromSrc(src) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      currentImage = img;
      rerender();
      els.result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    img.onerror = function () { setStatus('Could not load that image.', true); };
    img.src = src;
  }

  function setStatus(msg, isErr) {
    els.status.textContent = msg || '';
    els.status.classList.toggle('tool__status--err', !!isErr);
  }

  // ---- AI generate ----
  async function generate() {
    const prompt = els.prompt.value.trim();
    if (!prompt) { setStatus('Type a description first.', true); return; }
    els.generate.disabled = true;
    setStatus('Generating your image… this can take 10–40s.');
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt, size: els.size.value }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.detail || ('Server error ' + r.status));
      setStatus('Done — converting to ASCII.');
      loadFromSrc(data.image);
    } catch (e) {
      setStatus('Generation failed: ' + (e.message || e), true);
    } finally {
      els.generate.disabled = false;
    }
  }

  // ---- exports ----
  function downloadPng() {
    if (!lastResult) return;
    const a = document.createElement('a');
    a.download = 'ascii-art.png';
    a.href = els.canvas.toDataURL('image/png');
    a.click();
  }
  async function copyText() {
    if (!lastResult) return;
    try { await navigator.clipboard.writeText(lastResult.text); setStatus('ASCII text copied to clipboard.'); }
    catch (e) { setStatus('Copy failed — your browser blocked clipboard access.', true); }
  }

  // ---- init ----
  function init() {
    [
      'tool-file', 'tool-drop', 'tool-prompt', 'tool-size', 'tool-generate',
      'tool-status', 'tool-canvas', 'tool-result', 'tool-res', 'tool-charset',
      'tool-invert', 'tool-color', 'tool-download', 'tool-copy',
    ].forEach((id) => { els[id.replace('tool-', '')] = $(id); });
    els.file = $('tool-file');
    if (!els.canvas) return; // tool not on this page

    // mode tabs
    document.querySelectorAll('.tool__mode').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tool__mode').forEach((b) => b.classList.toggle('tool__mode--active', b === btn));
        document.querySelectorAll('.tool__panel').forEach((p) => { p.hidden = p.dataset.panel !== btn.dataset.mode; });
      });
    });

    // upload
    els.drop.addEventListener('click', () => els.file.click());
    els.file.addEventListener('change', (e) => {
      const f = e.target.files && e.target.files[0];
      if (f) loadFromSrc(URL.createObjectURL(f));
    });
    ['dragover', 'dragenter'].forEach((ev) => els.drop.addEventListener(ev, (e) => { e.preventDefault(); els.drop.classList.add('tool__drop--over'); }));
    ['dragleave', 'drop'].forEach((ev) => els.drop.addEventListener(ev, (e) => { e.preventDefault(); els.drop.classList.remove('tool__drop--over'); }));
    els.drop.addEventListener('drop', (e) => {
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f && f.type.startsWith('image/')) loadFromSrc(URL.createObjectURL(f));
    });

    // ai
    els.generate.addEventListener('click', generate);

    // controls
    ['res', 'charset', 'invert', 'color'].forEach((k) => {
      els[k].addEventListener('input', rerender);
      els[k].addEventListener('change', rerender);
    });
    els.download.addEventListener('click', downloadPng);
    els.copy.addEventListener('click', copyText);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
