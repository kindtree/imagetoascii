# Image to ASCII — tool context

A plain-text summary of imagetoascii.app. Paste it into an AI (ChatGPT, Claude,
etc.) and ask about the tool without scrolling the page.

## What it is
Image to ASCII (imagetoascii.app) is a free, no-signup web tool that turns any
image into ASCII art — a picture made entirely out of text characters. The
image-to-ASCII conversion runs entirely in your browser, so an uploaded photo
never leaves your device.

## Two ways to make ASCII art
1. Upload a photo — drag a JPG, PNG or WebP onto the drop zone (or click to
   browse); it is converted the moment it loads.
2. Generate with AI — describe the image you want in words; the tool creates it
   with AI and converts it straight to ASCII. Only the short text prompt is sent
   to a server for this step.

## How the conversion works
The converter reads the photo one small cell at a time, measures how bright each
cell is, and swaps it for a character from a ramp that runs from dense to sparse:
a solid "@" for the darkest areas, a light "." (or a blank space) for the
brightest. Lined up in a grid, the characters redraw the picture. It runs on an
HTML5 canvas, so it is instant and private.

## Character styles (4)
- Characters — the classic look; brightness mapped to a configurable ramp such
  as @#S08Xx+=-;:,.
- Detailed — a much larger glyph set for fine gradients and smooth shading.
- Block Chars — half/full block glyphs for a dense, pixel-block feel.
- Minimal — a handful of characters for a clean, high-contrast result.

## Controls
- Detail — how many characters make up the grid (output resolution).
- Character set — pick a style above, or type your own ramp from dark to light.
- Invert — flip the dark/light mapping.
- Color — sample the source photo's colours per character for colourful ASCII,
  or keep it monochrome.

## Export
- Download the result as a PNG.
- Or copy the raw text and paste it anywhere — chat, code, a README, social.

## Price & privacy
Completely free: no signup, no watermark, no export limit. Uploaded images are
converted on your own device and are never sent to a server; only the optional
AI generation talks to the network, and even then only your text prompt.

## Common uses
Social posts & avatars, desktop / phone wallpapers & lock screens, posters &
prints.
