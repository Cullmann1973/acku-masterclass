# Animation Reference — Ullmann Blueprint Style

Chris wants the masterclass to use animation patterns from his Blueprint portfolio app.
Apply these patterns where feasible alongside the existing overhaul work.

## Blueprint GSAP Patterns

### 1. GSAPProvider Setup (already similar)
- `gsap.defaults({ ease: "power2.out", duration: 0.8 })`
- ScrollTrigger registered, cleanup on unmount via `gsap.context()`

### 2. Hero Section — Cinematic Timeline
- Master `gsap.timeline()` with sequenced phases
- **Flash/flicker effect** for key words: rapid opacity toggles (0.02-0.05s each) with white textShadow glow, flickering 4-5 times before settling
- **Color accent flash**: Same flicker pattern but in cyan (#00bcd4) with matching textShadow glow
- **Bridge animation**: Elements slide in from opposite sides (`.bridge-left` x:-20, `.bridge-right` x:+20) and meet in the middle
- Staggered reveals with precise timeline offsets (e.g., 2.3s, 2.6s, 3.0s)

### 3. Section Reveals — ScrollTrigger + Stagger
```js
// Title fade-up
gsap.fromTo(".section-title",
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
  }
);

// Card stagger
gsap.fromTo(".card",
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
    scrollTrigger: { trigger: ".card-container", start: "top 80%", toggleActions: "play none none reverse" }
  }
);
```

### 4. Pinned Reveal Section (Roles)
```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top", end: "+=200%",
    scrub: 1, pin: true,
  },
});
// Sequential reveals with staggered timing
roles.forEach((_, index) => {
  tl.fromTo(`.role-${index}`,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.15, ease: "none" },
    index * 0.12
  );
});
```

### 5. Accordion Expand
- Items stagger in on scroll (y:30 → y:0, stagger: 0.1)
- Content reveal uses CSS `transition-all duration-500` for expand/collapse

## Key Takeaways for Masterclass Slides
- **Stagger children** on list/stat slides (items appear one by one, 0.1-0.15s apart)
- **Text flicker effect** for impactful quotes or key numbers (rapid opacity toggles with glow)
- **Slide-in from sides** for comparison/split layouts (left content from -40px, right from +40px)
- **Scale-in** for spotlight numbers (scale: 0.8 → 1 with opacity)
- **Pin + scrub** could work for module divider slides (content reveals as you navigate)
- Use `power2.out` as default ease throughout
- `toggleActions: "play none none reverse"` for scroll-based reveals
