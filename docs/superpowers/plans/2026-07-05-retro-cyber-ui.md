# Retro-Cyber UI Upgrade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the ASCII Magic clone into a highly optimized, single-purpose "Image to ASCII" tool styled as an immersive, premium Retro-Cyber Terminal with phosphor green, amber orange, and cyber cyan highlights, CRT scanline screen filters, and hidden video/non-ASCII options.

**Architecture:** Use CSS visual overrides in style blocks to set variables for custom font glow, space-black background grid, and horizontal scanlines overlays. Modify HTML structure to hide unused panels, dropdown options, and navigation links.

**Tech Stack:** Vanilla HTML5, CSS3, WebGL, Tailwind CSS (via CDN).

---

### Task 1: Landing Page (`index.html`) Retro-Cyber Upgrade & Content Hiding

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Inject CRT Scanline CSS rules and retro color overrides**
  Add a global CRT style block in the head of `index.html` containing phosphor glow (`text-shadow: 0 0 5px rgba(51,255,51,0.5)`), deep-space black backgrounds, and scanline grid overlay rules.
- [ ] **Step 2: Hide navigation links for non-ASCII features**
  Hide/remove the "Styles" and "Recipes" navigation links in both the desktop navbar list and the mobile overlay menu.
- [ ] **Step 3: Lock the Hero comparison slider to Characters (ASCII)**
  Hide the `#pills` row completely using CSS (`display: none !important;`). Force the default active style to stay on "Characters" (ASCII Art).
- [ ] **Step 4: Hide the Styles Showcase Grid**
  Hide the entire "Thirteen art styles, one source" section (`<section class="section">` wrapper around `#styles-grid`).
- [ ] **Step 5: Clean Use Cases and FAQs**
  Remove the "Cool Videos" card from the use-cases grid. Hide FAQ details questions related to video formats and non-ASCII outputs.
- [ ] **Step 6: Simplify the Footer**
  Remove the footer lists mapping other styles (Dither, Voxel, LEGO, etc.) and other tools, focusing the columns only on ASCII and general pages.
- [ ] **Step 7: Test the landing page locally**
  Verify visual aesthetics (phosphor glow, scanlines) and ensure the pills row and style showcase grid are completely hidden with no layout breaks.
- [ ] **Step 8: Commit landing page changes**
  ```bash
  git add index.html
  git commit -m "style: apply retro-cyber terminal styles and hide non-ASCII elements on landing page"
  ```

---

### Task 2: Editor Page (`app/index.html`) Retro-Cyber UI & Hiding Panels

**Files:**
- Modify: `app/index.html`

- [ ] **Step 1: Inject Retro CSS variables and element hiding rules**
  Add a `<style>` block in the head of `app/index.html` to override the CSS theme variables:
  - `--bg-body` to `#0a0a0c`
  - `--text-primary` to `#33ff33` (Phosphor Green)
  - `--btn-primary-bg` to `#ff9d00` (Amber Orange)
  - `--accent` to `#00ffff` (Cyber Cyan)
  - Add rules to hide the Dither section (`#dither-section`), Lights section, Animation panel, video playback scrubber track, and MP4/WebM/GIF export buttons.
- [ ] **Step 2: Filter the Render Style dropdown selector**
  Modify the style `<select id="style-select">` menu in the HTML body to only contain options for **Characters**, **Braille**, and **Block Characters**. Remove options for LEGO, Voxel, Mosaic, Dither, Halftone, etc.
- [ ] **Step 3: Modify upload zone descriptions**
  Change the drop-zone placeholder text from "Drop your images or videos here" to "Drop your images here" and update the file input tag to only accept image file extensions (`.png`, `.jpg`, `.jpeg`, `.webp`).
- [ ] **Step 4: Verify editor page console logs and interface**
  Load `http://localhost:8000/app` on the local server. Ensure all 404 logs remain at 0, check that only ASCII-relevant controls are displayed, and verify that PNG/JPG/TXT exports continue to function correctly.
- [ ] **Step 5: Commit editor changes**
  ```bash
  git add app/index.html
  git commit -m "style: apply retro-cyber styles and hide non-ASCII options on editor workspace page"
  ```
