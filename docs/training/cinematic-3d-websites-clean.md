# Cinematic 3D Websites — Practical Guide (Clean)

> Source: Cinematic_3D_Guide_Clean.docx | March 2026

## What Is a Cinematic 3D Website?

Scroll-controlled 3D animations + AI-generated video textures + real-time shaders. Scrolling replaces play button; browser = viewport into directed narrative.

### How It Works
1. AI generates short cinematic video from text prompt
2. Video split into 60-180 individual frames
3. Frames loaded into Three.js canvas
4. Scroll position controls which frame displays
5. DOM content overlays canvas, appearing/fading with scroll

### Scroll-as-Timeline Pattern
- "Scrub" = scroll-linked animation
- "Pin" = holding element while content animates
- "Sequence" = frames played by scroll position

## Technology Stack

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Three.js | WebGL 3D library | Any browser 3D |
| React Three Fiber | React renderer for Three.js | React apps with 3D |
| GSAP + ScrollTrigger | Scroll-driven animation | Scroll-controlled animations |
| Lenis | Smooth scroll | Any scroll-driven experience |
| GLSL Shaders | GPU custom effects | Custom effects, particles |
| Spline | Visual 3D (no code) | Designers who don't code |
| Theatre.js | Visual animation editor | Complex animation authoring |

## Decision Matrix

| Scenario | Recommended |
|----------|------------|
| Quick cinematic landing page | Draftly / frame-sequence |
| Interactive 3D product viewer | Spline or R3F + Drei |
| Scroll-driven narrative | Three.js + GSAP + Lenis |
| React app with 3D | React Three Fiber |
| Visual animation authoring | Theatre.js + R3F |
| CSS-only parallax | CSS 3D Transforms + GSAP |
| Shader art / generative | Three.js ShaderMaterial + GLSL |

## 10-Step Build Pipeline

1. **Art Direction** — Define subject, camera movement, lighting, mood, color, atmosphere
2. **Generate Video** — Runway Gen-3 / Kling / Pika / Sora / Veo (4-8 seconds, highest res)
3. **Extract Frames** — `ffmpeg -i input.mp4 -vf "scale=1920:-1,fps=30" -q:v 2 frames/frame_%04d.jpg`
4. **Optimize Assets** — Convert to WebP q80, target total <15MB, individual <80KB
5. **Three.js Player** — OrthographicCamera + PlaneGeometry + CanvasTexture, scroll→frame index
6. **Scroll Driver** — GSAP ScrollTrigger with scrub:1, pin canvas
7. **DOM Overlay** — HTML over canvas, fade in/out with scroll progress
8. **Loading Screen** — Preload all frames with progress bar
9. **Deploy** — Vercel / Netlify / GitHub Pages
10. **Performance Audit** — <15MB total, WebP, 60fps desktop, 30fps mobile, LCP <2.5s

## AI Video Prompt Categories (25 Prompts)

### Hero Sections (A1-A6)
- A1: Space/Nebula — slow dolly through nebula
- A2: Luxury Product Glass — orbit around crystal bottle
- A3: Cyberpunk Glitch — tracking through neon alley
- A4: Nature/Organic — descent through forest canopy
- A5: Abstract Fluid — macro black/gold liquid dynamics
- A6: Data/Tech Agency — fly-through data visualization

### Full Page (B1-B6)
- B1: SaaS Product Page — holographic UI assembly
- B2: Portfolio/Creative — floating gallery panels
- B3: E-Commerce Configurator — product orbit with color shifts
- B4: Agency Scroll Narrative — evolving architectural space
- B5: Startup Launch Page — growing network from single point
- B6: Digital Art Gallery — impossible museum spaces

### Visual Effects (C1-C7)
- C1: Galaxy Particle System
- C2: Morphing Geometry on Scroll
- C3: Glitch/Distortion Shader
- C4: Liquid Metal Sphere
- C5: Holographic UI Panels
- C6: Data Stream Visualization
- C7: Cosmic Wormhole Tunnel

### Mobile-First (D1-D3)
- D1: Touch-Driven Card Gallery
- D2: Mobile Hero (reduced complexity, 9:16)
- D3: Progressive Enhancement Pattern

### Accessibility (E1-E3)
- E1: Reduced-Motion Variants
- E2: WCAG-Compliant 3D
- E3: Fallback Strategy

## System Prompts for AI Development

### A: Three.js Single-File Expert
- Complete self-contained HTML, all inline
- ES modules from CDN, Three.js 0.162.0+
- Dark backgrounds, cinematic lighting, atmospheric effects
- FOV 50-65, pixelRatio capped at 2

### B: React Three Fiber Production
- React 18+ functional components
- @react-three/fiber, drei, postprocessing
- Never create objects inside useFrame
- useMemo for expensive computations

### C: Cinematic Scroll Director
- Lenis + GSAP ScrollTrigger + Three.js
- Narrative acts: Opening, Rising, Climax, Resolution
- Loading screen mandatory, first paint <3s
- scrub 0.5-2, never scrub:true for 3D cameras

## Performance Budgets

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Page weight | <10MB | 10-20MB | >20MB |
| Frame count | 60-120 | 120-200 | >200 |
| Frame size | <80KB | 80-150KB | >150KB |
| Draw calls | <50 | 50-100 | >100 |
| JS bundle | <200KB | 200-500KB | >500KB |
| TTI | <3s | 3-5s | >5s |
| Desktop FPS | 60 | 45 | <30 |
| Mobile FPS | 30 | 24 | <20 |

## Mobile Strategy
- Serve fewer frames (60 vs 120)
- Reduce resolution (960px vs 1920px)
- Remove post-processing on mobile
- Cap pixelRatio at 1.5
- Test on real devices

## FFMPEG Quick Reference
```bash
ffmpeg -i input.mp4 -q:v 2 frames/frame_%04d.jpg          # All frames
ffmpeg -i input.mp4 -vf "fps=30" -q:v 2 frames/frame_%04d.jpg  # Specific FPS
ffmpeg -i input.mp4 -vf "scale=1920:-1,fps=30" -q:v 2 frames/frame_%04d.jpg  # Resize
ffprobe -v quiet -print_format json -show_streams input.mp4  # Video info
```

## Key Resources
- Three.js: github.com/mrdoob/three.js | threejs.org/docs
- R3F: github.com/pmndrs/react-three-fiber | docs.pmnd.rs
- GSAP: github.com/greensock/GSAP | gsap.com/docs
- Lenis: github.com/darkroomengineering/lenis
- Theatre.js: github.com/theatre-js/theatre
- Shaders: thebookofshaders.com | shadertoy.com
