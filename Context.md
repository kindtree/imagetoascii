<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>404, Lost in the noise | ASCII Magic</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="description" content="The page you're looking for doesn't exist or has moved. Head back to ASCII Magic.">
<meta property="og:title" content="404, Lost in the noise | ASCII Magic">
<meta property="og:description" content="That page doesn't exist or has moved. Head back to ASCII Magic.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.ascii-magic.com/">
<meta property="og:image" content="https://www.ascii-magic.com/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="404, Lost in the noise | ASCII Magic">
<meta name="twitter:image" content="https://www.ascii-magic.com/og.jpg">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#1a1a1a">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #111;
    --bg-card: #1a1a1a;
    --border: #2a2a2a;
    --text: #e0e0e0;
    --text-muted: #888;
    --text-dim: #555;
    --accent: #4a9eff;
  }

  :root.light {
    --bg: #f5f5f5;
    --bg-card: #ffffff;
    --border: #e0e0e0;
    --text: #1a1a1a;
    --text-muted: #777;
    --text-dim: #bbb;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    transition: background 0.3s, color 0.3s;
  }

  .wrap {
    max-width: 560px;
    width: 100%;
    text-align: center;
  }

  .art {
    font-family: 'SF Mono', Menlo, Consolas, monospace;
    font-size: 12px;
    line-height: 1.2;
    color: var(--text-muted);
    opacity: 0.55;
    white-space: pre;
    margin-bottom: 32px;
    user-select: none;
    overflow: hidden;
  }

  .code {
    font-family: 'SF Mono', Menlo, Consolas, monospace;
    font-size: 13px;
    letter-spacing: 0.3px;
    color: var(--text-dim);
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.5px;
    margin-bottom: 12px;
    color: var(--text);
  }

  p {
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.65;
    margin-bottom: 32px;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  }

  .links {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .links a {
    display: inline-block;
    color: var(--text);
    text-decoration: none;
    padding: 10px 18px;
    border: 1px solid var(--border);
    font-size: 14px;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .links a:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--text-muted);
    color: var(--text);
  }
  .links a.primary {
    background: var(--text);
    color: var(--bg);
    border-color: var(--text);
  }
  .links a.primary:hover {
    background: rgba(255, 255, 255, 0.92);
  }

  :root.light .links a.primary { color: #fff; }

  .small {
    margin-top: 40px;
    font-size: 12px;
    color: var(--text-dim);
  }
  .small a { color: var(--text-muted); text-decoration: underline; }

  @media (max-width: 600px) {
    .art { font-size: 10px; }
    h1 { font-size: 24px; }
    .links { flex-direction: column; align-items: stretch; }
    .links a { width: 100%; }
  }

  /* Thin scrollbars, transparent track (no scroll box), slim thumb only */
  * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.22) transparent; }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 999px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.34); }
</style>
  <!-- Ahrefs Web Analytics -->
  <script src="https://analytics.ahrefs.com/analytics.js" data-key="dFPAqJhSJ/gDwlM+vLyM4Q" async></script>
</head>
<body>
  <div class="wrap">
    <pre class="art" aria-hidden="true">
        .#@@#.
      *@@@@@@@@*
    +@@@@@@@@@@@@+
   @@@@@..  ..@@@@@
  @@@@@   404   @@@@@
   @@@@@..  ..@@@@@
    +@@@@@@@@@@@@+
      *@@@@@@@@*
        .#@@#.
    </pre>

    <div class="code">Error 404</div>
    <h1>Lost in the noise</h1>
    <p>This page either doesn't exist or has moved. No drama, head back to the tool or the homepage and you're back in business.</p>

    <div class="links">
      <a href="/app" class="primary">Open the editor</a>
      <a href="/?show-landing=1">Back to home</a>
      <a href="/changelog">Changelog</a>
    </div>

    <div class="small">
      Think this is a bug? <a href="mailto:hello.kailashsr@gmail.com">Let me know</a>.
    </div>
  </div>

  <script>
    const theme = localStorage.getItem('ascii-magic-theme') || 'dark';
    if (theme === 'light') document.documentElement.classList.add('light');
  </script>
</body>
</html>
