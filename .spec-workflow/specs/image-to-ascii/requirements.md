# Requirements Document - Image to ASCII / ASCII Magic Clone

## Introduction

This project aims to replicate and clone the functionality, UI, and UX of [ASCII Magic](https://www.ascii-magic.com/) for the target keyword "image to ascii". The goal is to build a high-performance, visually stunning, and SEO-optimized web application that allows users to convert images and videos into ASCII art, pixel art, photo mosaics, LEGO art, voxel cubes, halftone, glitch, and other retro/artistic formats directly in their browser.

## Alignment with Product Vision

This application provides a comprehensive suite of real-time web-based image-to-art converters. By executing all processing client-side, it ensures absolute privacy (no files uploaded to a server), instant real-time feedback, and high scalability. The landing page and secondary pages are fully optimized for search engine indexing (targeting terms like "image to ascii", "ascii art generator", "video to ascii") to capture organic traffic and build a strong online presence.

## Requirements

### Req-1: Landing Page and SEO Structure
**User Story:** As an organic search visitor, I want a fast-loading, responsive, and content-rich landing page so that I can understand what the tool does, see high-quality examples, read FAQs, and easily open the editor.

#### Acceptance Criteria
1. WHEN the user visits the home page (`/`), the system SHALL render a premium dark-themed landing page featuring modern typography, smooth gradients, and interactive elements.
2. WHEN the user scrolls down the landing page, the system SHALL display:
   - A before/after comparison slider with tabs to switch between different styles (Characters, Dither, Mixed, Pixel Art, LEGO, Voxel, etc.).
   - A grid showcasing community creations or style examples.
   - A showcase of post-processing filters with toggle buttons (Vignette, Scan Lines, Bloom, CRT, Film Grain, Glitch, etc.) updating a live preview card.
   - A comprehensive FAQ section with expandable/collapsible questions.
   - An SEO-optimized footer linking to styles, use cases, guides, privacy policy, and terms.
3. WHEN the user clicks any "Open tool" or "Try it out now" button, the system SHALL navigate the browser to the `/app` editor page.
4. IF a search engine crawler indexes the site, the system SHALL serve optimized meta titles, descriptions, open graph tags, and semantic HTML structure (h1, h2, h3 hierarchy) targeting "image to ascii" keywords.

### Req-2: Editor Page (/app) UI/UX layout
**User Story:** As a creator, I want an intuitive, responsive editor interface with a sidebar control panel and a central canvas preview area so that I can easily adjust style parameters and see the results instantly.

#### Acceptance Criteria
1. WHEN the `/app` page loads, the system SHALL present a two-column layout on desktop:
   - A left/right sidebar containing scrollable adjustment panels grouped into sections (Source, Crop & Rotate, Background, Recipes, Characters/Styles, Intensity, Animation, Lights, Mask, Color, Blur, Post-Processing).
   - A central main viewport displaying the drop-zone (when empty) or the live canvas preview with a loading spinner during rendering.
2. WHEN the user accesses the page on a mobile device, the system SHALL adapt the layout into a mobile-friendly view (e.g., collapsible menu or bottom drawer control panel).
3. WHEN the user clicks the "Menu" button, the system SHALL open a navigation menu linking back to the landing page, guides, or other subpages.

### Req-3: Source File Ingest (Image & Video)
**User Story:** As a user, I want to load my own images or videos via drag-and-drop, file browsing, clipboard paste, or use sample templates so that I can start stylizing immediately.

#### Acceptance Criteria
1. WHEN the user drops an image or video onto the editor viewport, or clicks the drop-zone to select a file, the system SHALL load the media file into memory.
2. WHEN the user presses `Ctrl+V` (or `Cmd+V`), the system SHALL read any image data from the clipboard and load it as the active source.
3. WHEN the user clicks "Inspire Me", the system SHALL load a random sample image from a curated set of local assets and apply a random combination of styles and effects.
4. IF the loaded file is an invalid format or fails to load, the system SHALL display an error toast/message.

### Req-4: Core Style Converters (Canvas/WebGL Engines)
**User Story:** As an artist, I want to apply various retro and artistic filters to my image/video in real-time so that I can achieve diverse aesthetic styles.

#### Acceptance Criteria
1. WHEN the source image/video is loaded, the system SHALL process the frame using a canvas-based or WebGL-based engine according to the selected style in the dropdown.
2. The system SHALL support the following core converter styles:
   - **Characters (ASCII)**: Renders the image as text using a character set (e.g., `@#S08Xx+=-;:,.`) mapped to pixel brightness.
   - **Dither**: Applies dithering algorithms (Floyd-Steinberg, Atkinson, Ordered/Bayer, Halftone, Line) across custom or retro palettes (C64, Game Boy, PICO-8, 1-bit B&W).
   - **Block Characters**: Uses Unicode block glyphs (▄, ▀, █, etc.) to achieve a high-density, low-res pixel art look.
   - **Pixel Art**: Groups pixels into quantized color blocks with adjustable cell size and grid borders.
   - **Photo Mosaic**: Renders cells as colored tiles or shapes (square, wide, tall) based on average color.
   - **LEGO Bricks**: Renders the image as studs/blocks resembling a LEGO mosaic.
   - **Voxel (Cube)**: Simulates 3D isometric voxel grids with per-face lighting and outlines.
   - **Dots (Halftone)**: Draws filled circles whose radius scales with local brightness, creating a halftone print look.
   - **Cross / Diagonal / Lines / Diamond / Mixed**: Uses custom stroke patterns and hatch lines.
   - **Disco**: Wraps the image onto a reflective mirror ball with bloom effects.
   - **Braille**: Maps pixel densities to Unicode Braille characters (8-dot grid).

### Req-5: Adjustments, Colors, and Filters
**User Story:** As a user, I want fine-grained control over sizing, character ramps, contrast, brightness, color tints, and blur effects so that I can customize the output precisely.

#### Acceptance Criteria
1. WHEN the user adjusts the **Font Size/Cell Size** slider, the system SHALL dynamically resize the processing grid and re-render the output.
2. WHEN the user inputs a custom string into the **Chars** textbox, the system SHALL use that sequence as the mapping ramp from dark to light.
3. WHEN the user adjusts the **Intensity** controls (Coverage, Edge Emphasis, Density, Brightness, Contrast), the system SHALL apply these adjustments to the source image pixels before style conversion.
4. WHEN the user selects a **Color Preset** (None, B&W, Sepia, Warm, Cool, Vintage, Fade, Cyber) or configures a custom **Tint Color** with **Tint Opacity** and **Blend Mode** (Multiply, Screen, Overlay, etc.), the system SHALL apply the color filter.
5. WHEN the user enables a **Blur** type (Gaussian, Lens, Tilt-Shift, Radial, Perspective) and adjusts parameters, the system SHALL apply a real-time blur to the canvas.

### Req-6: Post-Processing Overlays
**User Story:** As a designer, I want to apply secondary overlay effects (like CRT curvature, glitch, scanlines, bloom) so that the final ASCII art looks like it's displayed on a vintage terminal or retro screen.

#### Acceptance Criteria
1. WHEN any post-processing effect is toggled, the system SHALL stack and render that effect on the preview canvas:
   - **Vignette**: Renders a dark outer radial gradient.
   - **Scan Lines**: Overlays horizontal low-opacity lines simulating CRTs.
   - **CRT Curvature**: Distorts the canvas using a barrel-distortion shader.
   - **Film Grain**: Applies random dynamic noise.
   - **Glitch**: Randomly slices, offsets, and color-splits sections of the image.
   - **RGB Split (Chromatic Aberration)**: Splits red, green, and blue color channels at the edges.
   - **Bloom**: Blurs and overlays bright areas of the image to create a glow.

### Req-7: Animation (Video Processing)
**User Story:** As a video creator, I want to upload a short video, play it in the editor with real-time ASCII styling, and export it so that I can create animated terminal art.

#### Acceptance Criteria
1. WHEN a video file is loaded, the system SHALL extract and stylize frames in real-time as the video plays.
2. WHEN the video is playing, the system SHALL sync the audio track (if any) and maintain a stable frame rate.
3. The system SHALL provide playback controls (Play, Pause, Mute, Scrub bar).

### Req-8: Share and Export
**User Story:** As a creator, I want to export my stylized creations in high resolution or share the configuration so that I can save my work or send it to others.

#### Acceptance Criteria
1. WHEN the user clicks "Export" and selects a format (PNG, JPG), the system SHALL generate and download the image at the selected scale (1x, 2x, 3x, or 4x resolution of the preview).
2. WHEN the user clicks "Share or Apply Recipe", the system SHALL serialize all current controls into a URL query string (or copy a recipe code to clipboard) allowing instant restoration of the editor state when visited.

## Non-Functional Requirements

### Code Architecture and Modularity
- **Single Responsibility Principle**: The image processing engine, UI layout, post-processing shaders, and state management SHALL be separated into dedicated modules.
- **WebGL Performance**: Heavy filters and post-processing overlays (bloom, CRT, glitch) SHOULD run as WebGL fragment shaders for optimal frame rates.
- **Client-Side Storage**: The app SHALL run entirely client-side, storing no user images/videos on servers.

### Performance
- The rendering pipeline SHALL maintain a responsive frame rate (target > 30 FPS for previews, and smooth real-time scrubbing).
- Image export at 4x resolution SHALL execute in a web worker or optimized loop to prevent freezing the main UI thread.

### Accessibility
- The site SHALL follow Web accessibility best practices, using clean ARIA labels and keyboard navigation for controls.

### Usability
- The UI SHALL look highly premium with consistent spacing, smooth transitions, HSL tailored color schemes, and subtle animations.
