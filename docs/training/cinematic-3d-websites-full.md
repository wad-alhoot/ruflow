# Cinematic 3D Websites — Complete Technical & Creative Guide

> Source: Cinematic 3D Websites Guide.docx | March 2026 | ~12,500 words

## Overview

Complete technical guide covering:
- History: Flash → CSS3D → Production WebGL → AI-Generated Era (2024+)
- Draftly.space product analysis
- Full tech stack deep-dive (Three.js, R3F, GSAP, Lenis, GLSL, CSS 3D)
- Manual pipeline replication (10 steps)
- 25 production AI video prompts
- 3 system prompts for AI-assisted development
- 3 complete working code examples
- Performance, mobile, SEO, accessibility
- Future predictions (2026-2028)

## Chapter 1: 3D Web History

### Evolution
1. **Flash Era (1996-2012)** — Plugin-based, cinematic control, killed by mobile
2. **CSS3D + Early WebGL (2012-2018)** — Native alternatives, experimentation
3. **Production WebGL (2018-2024)** — Apple product pages popularized scroll-driven 3D
4. **AI-Generated Era (2024+)** — Generative video broke the asset bottleneck

### Market Segments
- Brand marketing teams (product launches)
- Creative agencies (portfolios, client work)
- Startups/solo creators (AI-generated at fraction of cost)

## Chapter 2: Draftly Deep Dive

### Pipeline
1. Prompt interpretation → art direction parameters
2. Video generation → 4-8s cinematic clip
3. Frame extraction → 60-180 frames
4. Asset optimization → WebP, progressive loading
5. Scene assembly → Three.js + scroll binding + DOM overlay
6. Deployment → unique URL

### Strengths vs Limitations
- Strengths: low barrier, high quality, consistent deployment, democratized
- Limitations: linear only, heavy assets, prompt-based control, AI quality dependent

## Chapter 3: Complete Tech Stack

### Three.js Core
```js
// Scene + Camera + Renderer pattern
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, w/h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
```

### Key Materials
- MeshStandardMaterial — PBR, most use cases
- MeshPhysicalMaterial — glass, clearcoat, transmission
- ShaderMaterial — custom GLSL

### Post-Processing
```js
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(size, 0.8, 0.4, 0.85));
```

### React Three Fiber
- Declarative JSX for Three.js scenes
- useFrame() for animation, useThree() for context
- Drei helpers: Environment, Float, Text, Html, OrbitControls

### GSAP ScrollTrigger
```js
gsap.to(camera.position, {
  z: -20, y: 5,
  scrollTrigger: { trigger: '#section', start: 'top top', end: '+=3000', scrub: 1.5, pin: true }
});
```

### Lenis Smooth Scroll
```js
const lenis = new Lenis({ duration: 1.2, smoothWheel: true, syncTouch: true });
lenis.on('scroll', ScrollTrigger.update);
```

### GLSL Shaders (5 Examples)
1. Ripple Displacement
2. Noise-Based Color Flow
3. Radial Pulse
4. Chromatic Aberration
5. Scroll-Driven Morph

## Chapter 4: Manual Pipeline (10 Steps)

### Step 1: Art Direction
Define: subject, camera movement, lighting, mood, color palette, atmosphere

### Step 2: AI Video Generation
- Runway Gen-3: reliable, 4K, 4-18s
- Kling: dramatic camera, 1080p, 5-10s
- Pika: stylized, 1080p, 3-8s
- Sora: highest quality, 4K, 60s
- Veo: cinematic, 4K, 8s

### Step 3: Frame Extraction
```bash
ffmpeg -i input.mp4 -vf "scale=1920:-1,fps=30" -q:v 2 frames/frame_%04d.jpg
```

### Step 4: Asset Optimization
```bash
for f in frames/*.jpg; do cwebp -q 80 "$f" -o "${f%.jpg}.webp"; done
```
Target: <10MB total, <80KB per frame

### Step 5: Three.js Frame Player
- OrthographicCamera + PlaneGeometry(2,2)
- Preload all frames, map scroll position to frame index
- Update texture only when frame changes

### Step 6: GSAP Scroll Driver
- Lenis for smooth scroll normalization
- ScrollTrigger with scrub 0.5 for smooth playback

### Step 7: DOM Overlay
- Fixed position, z-index above canvas
- pointer-events: none on overlay, auto on interactive elements
- Fade in/out with GSAP based on scroll progress

### Step 8: Loading Screen
- Progress bar with frame count tracking
- Fade out after all frames loaded

### Step 9: Deployment
- Vercel, Netlify, GitHub Pages
- CDN for frame assets on heavy sites

### Step 10: Performance Audit
- Total payload <10MB, WebP format
- 60fps desktop, 30fps mobile
- Loading screen, reduced-motion fallback
- LCP <2.5s

## Chapter 5: 25 Production Prompts

(See clean guide for full list — A1-A6 Hero, B1-B6 Full Page, C1-C7 Effects, D1-D3 Mobile, E1-E3 Accessibility)

## Chapter 6: System Prompts

### A: Three.js Single-File Expert
Complete self-contained HTML with CDN imports, cinematic defaults

### B: React Three Fiber Production Architect
Component-based, performance-optimized, TypeScript-ready

### C: Cinematic Scroll Director
Lenis + GSAP + Three.js with narrative structure (Opening, Rising, Climax, Resolution)

## Chapter 7: Three Working Examples

### Example 1: Cinematic Starfield Scroll
- 6000 star particles with color variation
- Scroll-driven camera movement through star field
- Nebula fog planes, bloom post-processing
- 3 text overlays appear/disappear with scroll
- Star wrapping for infinite depth

### Example 2: Interactive Particle Hero
- 4000 particles in fibonacci sphere distribution
- Mouse repulsion with spring physics
- Blue-to-cyan color gradient
- Bloom post-processing
- Physics: repulsion, spring return, velocity damping

### Example 3: Scroll-Morphing Geometry
- Sphere morphs to Cube → Torus → Octahedron
- Custom shader with fresnel edge glow
- Color transitions with morph progress
- Wireframe overlay
- Progress bar and shape label

## Chapter 8: Advanced Topics

### Performance
- InstancedMesh for repeated geometry (single draw call)
- KTX2 texture compression (4-8x smaller)
- Adaptive quality via GPU tier detection
- Memory management: always dispose geometry/materials/textures
- Frame budget: 16.67ms at 60fps

### Mobile
- Reduce particles 50-75%
- Cap pixelRatio at 1.5
- Lenis syncTouch for touch scroll
- detect-gpu library for tier classification

### SEO
- All text in DOM, not canvas
- Static poster image for OG/LCP
- `<link rel="preload">` for critical frames
- Structured data (JSON-LD)

### Accessibility
- prefers-reduced-motion: disable animation, show static
- canvas: tabindex=-1, aria-hidden=true, role=presentation
- aria-live region for screen reader narrative
- Keyboard navigation for all interactive elements

### Progressive Loading
- Phase 1 (<2s): HTML, CSS, poster, first frame
- Phase 2 (<5s): Three.js, first 20% frames, GSAP
- Phase 3 (<10s): Remaining frames, post-processing, Lenis
- Phase 4 (deferred): Analytics, fonts

## Chapter 9: Future (2026-2028)

- WebGPU: compute shaders, real-time ray tracing, neural networks on GPU
- AI Video: 30s 4K clips routine by 2027
- Real-time AI scenes: text-to-3D-scene in browser (2027-2028)
- WebXR: scroll-as-timeline → walk-as-timeline
- Tool consolidation: Figma/Framer/Webflow will acquire/replicate pipeline
