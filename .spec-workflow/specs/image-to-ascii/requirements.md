# Requirements Document - Image to ASCII / ASCII Magic Clone

> **SCOPE UPDATE (2026-07-05): IMAGE-ONLY & RETRO-CYBER THEME.**
> - **Image-Only Conversion**: Video ingest, animation panels, playback controls, and animated MP4/WebM/GIF exports are **hidden from the UI** (Option B).
> - **Target Keyword Focus**: Focus strictly on the "image to ascii" keyword.
> - **Sleek Retro-Cyber Terminal Theme**: The visual style is updated to a premium, immersive Retro-Cyber Terminal console with phosphor green, plasma orange, and cyber cyan color accents, CRT scanline screen effects, and grid panel layouts.

## Introduction

This project is a premium, SEO-optimized web application designed to convert images into ASCII art, Braille art, and Block character text art. By executing all processing client-side, it ensures absolute privacy (no files uploaded to a server) and instant real-time feedback. The design and copy are optimized for the target keyword "image to ascii".

## Requirements

### Req-1: Landing Page and SEO Structure (Retro-Cyber Theme)
**User Story:** As an organic search visitor, I want a fast-loading, visually stunning retro-terminal style landing page so that I can understand the tool, interact with an ASCII preview, and open the app.

#### Acceptance Criteria
1. WHEN the user visits the home page (`/`), the system SHALL render a premium dark-themed Retro-Cyber Terminal console page with classic phosphor green (`#33ff33`), cyber cyan (`#00ffff`), and plasma orange (`#ff9d00`) highlights.
2. The page SHALL overlay a CRT screen scanline filter and text-shadow glow effect.
3. WHEN the user scrolls down the landing page, the system SHALL display:
   - A before/after comparison slider locked to the **Characters** (ASCII) style (the selection pills row is hidden).
   - An image-based ASCII art community showcase. (Video items are filtered out).
   - A post-processing effects demonstration grid applying Vignette, Scan Lines, Bloom, CRT, and Glitch filters to a live ASCII preview card.
   - An FAQ section with collapsible questions focused on image-to-ASCII questions (video FAQs are hidden).
   - An SEO-optimized footer targeting the "image to ascii" keyword.
4. The navigation header SHALL hide links to "Styles" and "Recipes" (which promoted non-ASCII styles on the original site).

### Req-2: Editor Page (/app) UI/UX layout
**User Story:** As a creator, I want an intuitive, responsive editor interface mimicking a cyber-hacker console with a sidebar control panel and central preview canvas.

#### Acceptance Criteria
1. WHEN the `/app` page loads, the system SHALL present a two-column layout on desktop:
   - A scrollable sidebar panel grouped into sections styled with cyber-cyan grids and dim-green monospace labels.
   - A central main viewport displaying the image drop-zone or the live ASCII canvas preview.
2. The system SHALL hide the following panels from the sidebar (`display: none`):
   - **Dither Engine** panel section.
   - **Lights** panel section.
   - **Animation** controls panel section.
3. The style selection dropdown SHALL only list:
   - **Characters** (ASCII)
   - **Braille** (Unicode dot-art)
   - **Block Chars** (Unicode blocks)
4. The video playback control scrubber track beneath the central preview canvas SHALL be hidden.

### Req-3: Source File Ingest (Image-Only)
**User Story:** As a user, I want to load my own images via drag-and-drop, file browsing, or clipboard paste.

#### Acceptance Criteria
1. The drag-and-drop zone SHALL only accept image files (`.png`, `.jpg`, `.jpeg`, `.webp`). Video files are blocked.
2. All placeholder text SHALL only refer to images (e.g. "Drop your images here").
3. WHEN the user clicks "Inspire Me", the system SHALL load a random sample image from local assets and apply random ASCII-related adjustments.

### Req-4: Core Style Converters (ASCII Text Only)
**User Story:** As an artist, I want to apply character-based filters in real-time.

#### Acceptance Criteria
1. The system SHALL support:
   - **Characters (ASCII)**: Renders the image as text using a character set (e.g., `@#S08Xx+=-;:,.`) mapped to pixel brightness.
   - **Braille**: Maps pixel densities to Unicode Braille characters (8-dot grid).
   - **Block Characters**: Uses Unicode block glyphs (▄, ▀, █, etc.) to achieve a high-density text look.
2. Non-ASCII rendering pipelines (Dither, Pixel Art, LEGO, Voxel/Cube, Mosaic, Halftone, Disco) are disabled or hidden in the UI.

### Req-5: Adjustments, Colors, and Filters
**User Story:** As a user, I want fine-grained control over sizing, character ramps, contrast, and color tints.

#### Acceptance Criteria
1. WHEN the user adjusts the **Font Size/Cell Size** slider, the system SHALL dynamically resize the processing grid.
2. WHEN the user inputs a custom string into the **Chars** textbox, the system SHALL use that sequence as the mapping ramp.
3. The system SHALL support background modes (blurred original, solid black, transparent, solid color) and color filter presets.

### Req-6: Post-Processing Overlays
**User Story:** As a designer, I want to apply CRT curvature, glitch, scanlines, and bloom overlays.

#### Acceptance Criteria
1. WHEN toggled, the system SHALL stack effects:
   - **Vignette**: Radial dark gradient.
   - **Scan Lines**: Horizontal low-opacity terminal overlay.
   - **CRT Curvature**: Barrel-distortion screen simulation.
   - **Film Grain**: Dynamic terminal noise.
   - **Glitch**: Random section slicing and channel splits.
   - **RGB Split**: Chromatic aberration shifts.
   - **Bloom**: Glowing light overlays.

### Req-7: Animation (Video Processing) — ❌ CANCELLED
Video ingest, playback controls, and animated outputs are removed from the product scope.

### Req-8: Share and Export
**User Story:** As a creator, I want to export my ASCII creations to image files or copy text.

#### Acceptance Criteria
1. The Exporter panel SHALL only present download buttons for:
   - **PNG**
   - **JPG**
   - **TXT** (Plain text copy/download)
2. Animated GIF, WebM, and MP4 download options are hidden from the UI.
3. Recipe sharing SHALL serialize all active ASCII parameters into a URL query string.

## Non-Functional Requirements
- **Visuals**: The UI SHALL look highly premium with consistent spacing, smooth transitions, Retro-Arcade HSL colors, scanlines overlays, and text shadow glows.
- **Client-Side Storage**: The app SHALL run entirely client-side, storing no user images on servers.
