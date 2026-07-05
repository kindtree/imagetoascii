# Tasks Document - Image to ASCII / ASCII Magic Clone

> **SCOPE UPDATE (2026-07-05): RETRO-CYBER THEME & UI SIMPLIFICATION (OPTION B).**
> - **Image-Only Focus**: The application is focused solely on image-to-ASCII. Video upload and video/GIF outputs are hidden.
> - **UI/UX Refactoring**: We are styling the page as a premium, immersive **Retro-Cyber Terminal console** using phosphor green, plasma orange, cyber cyan accents, CRT scanline overlay filters, glowing typography, and Bento grids.

- [x] 1. Refactor and Polish Landing Page (`index.html`)
  - File: index.html
  - Implement the exact design, spacing, colors, and layout of ASCII Magic's home page.
  - Rebuild the hero section comparison slider with actual canvas-based rendering for the "After" side.
  - Implement the style selection tabs (Characters, Dither, Mixed, Pixel Art, LEGO, Voxel, etc.) updating the before/after slider preview.
  - Implement the post-processing effects demonstration grid, where toggling Vignette, Scan Lines, Bloom, CRT, etc. applies filters to a preview card.
  - Fill out all community showcase cards, use cases cards, and accordions for FAQ answers to ensure a content-rich page.
  - Purpose: Match the exact landing page UI, UX, and copy of the target site.

- [x] 2. Create the Editor Application Layout (`app/index.html`)
  - File: app/index.html
  - Create the skeleton layout for the stylizer workspace (`/app`).
  - Implement the two-column interface on desktop (sidebar adjustment panels on the left/right, central viewport on the other side).
  - Create all panel sections: Source, Crop & Rotate, Background, Recipes, Characters/Styles, Intensity, Animation, Lights, Mask, Color, Blur, and Post-Processing.
  - Style the workspace using modern dark terminal themes with HSL colors and pixel borders.
  - Purpose: Build the foundational layout and controllers for the editor workspace.

- [x] 3. Implement Source Ingest, Cropper, and Recipe Manager
  - File: app/index.html (JS script section)
  - Add drag-and-drop file upload, file input browse, and clipboard paste capture handlers.
  - Build the Crop/Rotate dialog overlay displaying a cropper canvas with adjustable ratio handles and rotate ↺/↻ controls.
  - Implement state serialization to URL query parameters so that clicking "Share or Apply Recipe" copies a URL containing all slider/dropdown values.
  - Add the "Inspire Me" feature which selects a random sample background and randomize settings.
  - Purpose: Manage input media files, cropping dimensions, and sharing states.

- [x] 4. Implement Core Art Conversion Engines
  - File: app/index.html (JS script section)
  - Write the canvas rendering loop which takes the source image canvas and outputs stylized frames.
  - Implement style converters: Characters (ASCII mapping to brightness), Dither (Atkinson, Floyd-Steinberg, ordered matrices), Block Characters, Pixel Art (quantized color tiles), Photo Mosaic (color-matched shapes), LEGO ( studs/raised circle shadows), Voxel (isometric 3D cubes with per-face shading), Dots (halftone circles), and hatch lines.
  - Integrate density, Coverage, font size, custom character sets, and blend modes into the processing loop.
  - Purpose: Build the core graphics processors for all 15 artistic filters.

- [x] 5. Implement Backgrounds, Colors, and Post-Processing Overlays
  - File: app/index.html (JS script section)
  - Implement Background modes: blurred original background (using canvas drawing with stack blur/CSS filter), solid black, original, transparent.
  - Implement Color adjustments: B&W, Sepia, Cool, Vintage, Cyber filters; Tint color picker with opacity overlay and blend modes.
  - Implement stacked Post-processing filters: Vignette (radial gradient), Scan Lines (repeated pattern overlay), CRT Curvature (barrel distortion/CSS transform warp), Film Grain (randomized overlay), Glitch (random strip slice offsets), Chromatic Aberration/RGB Split (red/green/blue channels shifted), Bloom (blended blur layer).
  - Purpose: Implement color toning, background rendering, and terminal/retro shader effects.

- [x] 6. Image Export Only (video frame processing ❌ DESCOPED 2026-07-05)
  - File: app/index.html (JS script section)
  - Video upload, playback controls, and animated (GIF/MP4/WebM) export are REMOVED — image-only scope.
  - KEPT: high-resolution image export (PNG/JPG at 1x, 2x, 3x, 4x resolutions). Video files are rejected at upload.
  - Purpose: Support video files conversion and multi-scale image downloads.

- [ ] 7. Retro-Cyber Landing Page Style Update & Content Simplification
  - File: index.html
  - Add global CRT scanlines CSS overlay and phosphor green typography styling.
  - Hide style chips (`#pills`) and lock comparison slider to Characters (ASCII).
  - Hide the "Thirteen art styles" grid and "Styles" navigation.
  - Clean footer columns and FAQ questions related to non-ASCII features.
  - Success Criteria: Landing page operates cleanly in retro green terminal style with no mention or indicators of other render styles or video inputs.

- [ ] 8. Retro-Cyber Editor Panel Styling & Element Hiding
  - File: app/index.html
  - Add global retro-cyber styling (發光 borders, phosphor green elements, orange CTAs).
  - Apply `display: none` to the Dither Engine, Lights, Animation panels, and video playback control slider.
  - Limit the style dropdown to Characters, Braille, and Block Chars.
  - Hide GIF/MP4 export options in the exporter panel.
  - Success Criteria: Editor sidebar is simplified, showing only ASCII-relevant controls, with zero console errors.
