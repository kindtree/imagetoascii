# Tasks Document - Image to ASCII / ASCII Magic Clone

- [x] 1. Refactor and Polish Landing Page (`index.html`)
  - File: index.html
  - Implement the exact design, spacing, colors, and layout of ASCII Magic's home page.
  - Rebuild the hero section comparison slider with actual canvas-based rendering for the "After" side.
  - Implement the style selection tabs (Characters, Dither, Mixed, Pixel Art, LEGO, Voxel, etc.) updating the before/after slider preview.
  - Implement the post-processing effects demonstration grid, where toggling Vignette, Scan Lines, Bloom, CRT, etc. applies filters to a preview card.
  - Fill out all community showcase cards, use cases cards, and accordions for FAQ answers to ensure a content-rich page.
  - Purpose: Match the exact landing page UI, UX, and copy of the target site.
  - _Leverage: index.html_
  - _Requirements: Req-1_
  - _Prompt: Role: Frontend Developer specializing in responsive CSS layouts and interactive canvas sliders | Task: Refactor index.html to match the exact visual style, copy, and layout of https://www.ascii-magic.com/. Implement the interactive comparison slider and style chips using HTML5 Canvas to render dynamic previews of styles. Connect the post-processing toggle switches to a live preview image using CSS/Canvas filters | Restrictions: Keep everything inside index.html, use Tailwind CSS CDN for styling, ensure perfect responsiveness | Success: The landing page matches the target site exactly, comparisons and toggles work in real-time, no layout breakages on any screen size_

- [x] 2. Create the Editor Application Layout (`app/index.html`)
  - File: app/index.html
  - Create the skeleton layout for the stylizer workspace (`/app`).
  - Implement the two-column interface on desktop (sidebar adjustment panels on the left/right, central viewport on the other side).
  - Create all panel sections: Source, Crop & Rotate, Background, Recipes, Characters/Styles, Intensity, Animation, Lights, Mask, Color, Blur, and Post-Processing.
  - Style the workspace using modern dark terminal themes with HSL colors and pixel borders.
  - Purpose: Build the foundational layout and controllers for the editor workspace.
  - _Leverage: index.html_
  - _Requirements: Req-2_
  - _Prompt: Role: Frontend Developer with expertise in building complex dashboard/workspace layouts | Task: Create app/index.html containing the skeletal workspace layout for the stylizer app. Build the side panels containing all inputs (dropdowns, sliders, text inputs, toggles) and the central preview canvas area. Apply the premium dark-terminal theme | Restrictions: All logic must be client-side, use Tailwind CSS for the panel styling, ensure layout adapts correctly on mobile screens | Success: The app page loads a styled sidebar with all panels and a central canvas viewport, with mobile layout support_

- [x] 3. Implement Source Ingest, Cropper, and Recipe Manager
  - File: app/index.html (JS script section)
  - Add drag-and-drop file upload, file input browse, and clipboard paste capture handlers.
  - Build the Crop/Rotate dialog overlay displaying a cropper canvas with adjustable ratio handles and rotate ↺/↻ controls.
  - Implement state serialization to URL query parameters so that clicking "Share or Apply Recipe" copies a URL containing all slider/dropdown values.
  - Add the "Inspire Me" feature which selects a random sample background and randomize settings.
  - Purpose: Manage input media files, cropping dimensions, and sharing states.
  - _Leverage: app/index.html_
  - _Requirements: Req-3, Req-8_
  - _Prompt: Role: Full-stack Web Developer specializing in file uploads and canvas-based cropping | Task: Implement file ingest handlers (drag-and-drop, clipboard paste, browser file load) in app/index.html. Build the crop & rotate overlay with interactive crop borders on canvas. Write state serialization/deserialization logic to load and save parameters from/to URL query strings | Restrictions: No server-side components, crop logic must be pure canvas manipulation | Success: Files load correctly, crop modal allows visual selection and cropping, URL recipes share the exact state_

- [x] 4. Implement Core Art Conversion Engines
  - File: app/index.html (JS script section)
  - Write the canvas rendering loop which takes the source image canvas and outputs stylized frames.
  - Implement style converters: Characters (ASCII mapping to brightness), Dither (Atkinson, Floyd-Steinberg, ordered matrices), Block Characters, Pixel Art (quantized color tiles), Photo Mosaic (color-matched shapes), LEGO ( studs/raised circle shadows), Voxel (isometric 3D cubes with per-face shading), Dots (halftone circles), and hatch lines.
  - Integrate density, Coverage, font size, custom character sets, and blend modes into the processing loop.
  - Purpose: Build the core graphics processors for all 15 artistic filters.
  - _Leverage: app/index.html_
  - _Requirements: Req-4, Req-5_
  - _Prompt: Role: Graphics Developer specializing in Canvas pixel manipulation and dithering algorithms | Task: Implement the core rendering engine in app/index.html. Add drawing functions for ASCII characters mapping, error diffusion and ordered dithering, LEGO bricks rendering, isometric voxel cubes, halftone dots, and block unicode elements. Connect all sidebar sliders to the drawing parameters | Restrictions: Must execute fully client-side and render in real-time, optimize performance to prevent UI lag | Success: All 15 converter styles render correctly on the canvas in real-time when inputs are adjusted_

- [x] 5. Implement Backgrounds, Colors, and Post-Processing Overlays
  - File: app/index.html (JS script section)
  - Implement Background modes: blurred original background (using canvas drawing with stack blur/CSS filter), solid black, original, transparent.
  - Implement Color adjustments: B&W, Sepia, Cool, Vintage, Cyber filters; Tint color picker with opacity overlay and blend modes.
  - Implement stacked Post-processing filters: Vignette (radial gradient), Scan Lines (repeated pattern overlay), CRT Curvature (barrel distortion/CSS transform warp), Film Grain (randomized overlay), Glitch (random strip slice offsets), Chromatic Aberration/RGB Split (red/green/blue channels shifted), Bloom (blended blur layer).
  - Purpose: Implement color toning, background rendering, and terminal/retro shader effects.
  - _Leverage: app/index.html_
  - _Requirements: Req-5, Req-6_
  - _Prompt: Role: Graphics and Filter Specialist with expertise in image processing | Task: Implement color adjustments, blur filters, background render modes, and the post-processing effects stack (vignette, scanlines, CRT curvature, film grain, glitch, RGB split, bloom) in app/index.html using HTML5 Canvas context properties, globalCompositeOperation, and CSS filter overlays | Restrictions: Keep operations highly efficient for real-time rendering | Success: Adjusting color, blur, or post-processing controls dynamically applies layered filters to the preview canvas_

- [x] 6. Implement Video Frame Processing and Export Capabilities
  - File: app/index.html (JS script section)
  - Implement video upload handling by feeding video frames into the Canvas rendering engine in real-time.
  - Build playback controls (Play, Pause, Progress scrub bar, Mute/Unmute) synced with audio track playback.
  - Implement high-resolution export for both images (PNG/JPG at 1x, 2x, 3x, 4x resolutions) and video sequences (exporting animated ASCII as WebM/MP4 or GIF).
  - Purpose: Support video files conversion and multi-scale image downloads.
  - _Leverage: app/index.html_
  - _Requirements: Req-7, Req-8_
  - _Prompt: Role: Video and Exporter Developer | Task: Implement video frame rendering loop using requestVideoFrameCallback (or standard requestAnimationFrame fallback) to process video frames in real-time. Build custom playback controls. Implement the multi-scale image exporter (PNG/JPG at 1x-4x resolution) and a GIF/video recorder using MediaRecorder or library-free Canvas record methods | Restrictions: No server processing, video export must run entirely client-side | Success: Videos play in real-time with ASCII styles applied, custom video controls work, and exports download files at correct resolution scales_
