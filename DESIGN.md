---
version: alpha
name: AURA — Premium AI Personal Assistant
description: A sophisticated, high-density landing page for an AI-driven organizational tool, characterized by a clean 'glassmorphic' aesthetic, soft ambient glows, and a professional blue-on-slate color palette.
colors:
  primary: "#3b82f6"
  primary-dark: "#2563eb"
  bg-main: "#f3f5f8"
  surface-light: "#ffffff"
  surface-dark: "#172033"
  text-heading: "#0f172a"
  text-body: "#475569"
  border-light: "#e2e8f0"
  border-glass: "rgba(255, 255, 255, 0.9)"
typography:
  font-family: "'Inter', sans-serif"
  font-mono: "'JetBrains Mono', monospace"
  sizes:
    hero: "6.4rem"
    section-title: "5xl"
    body-md: "1rem"
    label-xs: "0.75rem"
spacing:
  base: "1rem"
  section-padding: "5rem"
rounded:
  full: "9999px"
  card: "2rem"
  section: "2.75rem"
components:
  button-primary: "rounded-full bg-gradient-to-b from-blue-500 to-blue-600 border-blue-700 text-white"
  glass-card: "bg-white/84 backdrop-blur-2xl border-white/90 shadow-lg"
  mono-label: "font-mono text-xs tracking-tight text-blue-500 uppercase"
---

## Overview
AURA is designed with a "Premium Personal AI" aesthetic that emphasizes clarity, focus, and modern productivity. The visual personality is light and airy (using white glass surfaces) but anchored by deep navy/slate sections to denote technological power and "Dark Mode" transformation. The layout is high-density but legible, utilizing significant white space and asymmetric "floating" elements to suggest an intelligent, non-linear assistant.

## Colors
- **Primary Blue Palette**: A range from a soft `#dbeafe` (Blue 50) to `#2563eb` (Blue 600) for CTA gradients.
- **Surface Palette**: Pure white for cards, `#f3f5f8` for the main canvas, and a rich midnight gradient (`#172033` to `#101827`) for impact sections.
- **Typography Colors**: Slate-950 for high-contrast headings, Slate-600 for body text, and Slate-400 for metadata or labels.
- **Accents**: Success Emerald (`#10b981`), Warning Amber (`#f59e0b`), and Soft Red for "OS-style" window controls.

## Typography
- **Headings**: Uses 'Inter' with light weights (300) at large scales (6.4rem) and tight tracking (-0.075em). This creates a sophisticated, editorial feel.
- **Mono Elements**: 'JetBrains Mono' is used exclusively for labels, status updates, and UI metadata, signaling the AI/technical nature of the product.
- **Body**: 'Inter' in regular (400) and light (300) weights with a comfortable 8px/2rem leading for readability.

## Layout
- **Grid System**: 12-column max-width (7xl) container with a standard 1.5rem (px-6) gutter.
- **Hero Composition**: A two-column split (1.02fr to 0.98fr) that contrasts high-impact text against a complex, multi-layered product mockup.
- **Floating Components**: Heavy use of absolute positioning for "status bubbles" that overlap card boundaries to create 3D depth.
- **Navigation**: A fixed, floating pill-shaped navbar with a high backdrop-blur value.

## Elevation & Depth
- **Shadows**: Multi-layered shadow system. Cards use soft, large-spread shadows (e.g., `0_30px_80px_-35px_rgba(15,23,42,0.35)`) combined with sharp interior white borders (`inset_0_1px_0_white`) to simulate physical glass depth.
- **Glows**: Large, blurred background blobs (`blur-[7.5rem]`) in blue and white provide a soft "aura" effect that lives behind the main content.
- **Borders**: Double-border effect using a thin colored stroke and a white inner highlight to create a "skeuomorphic-lite" button feel.

## Shapes
- **Curvature**: Highly rounded corners. Standard cards use 2rem (32px), while larger "transformation" blocks use 2.75rem (44px).
- **Buttons/Nav**: Strict use of `rounded-full` for all primary interactive elements.
- **Icons**: Enclosed in soft-square (2xl/1rem radius) containers with light background tints.

## Components
- **Glass Nav**: Pill shape, 84% white opacity, 2xl backdrop blur.
- **Product Mockup**: A layered container simulating a desktop OS with window controls, a top-bar, and a grid of actionable tiles.
- **Status Bubbles**: Floating cards with icon + two-line text (title/subtitle) and high-elevation shadows.
- **Skeuomorphic Tiles**: Gradients that flow from top (lighter) to bottom (darker) to simulate physical depth.

## Page Sections

### Navigation
- **Composition**: Centered 7xl max-width pill.
- **Content**: Left brand logo (AU initials), middle text links with underline hover effects, right dual-CTAs.
- **Interactions**: Underline expands from center on hover; buttons lift by 2px.

### Hero Section
- **Visuals**: Large tracking-tight headline. A primary blue gradient "pill" button style used for the word "Move faster."
- **Mockup Structure**: A "Daily Brief" dashboard showing captured voice notes, checklists, and a "Focus Window" lock icon.
- **Floating Elements**: Four asynchronous bubbles (Notifications, Summaries, Calendar, Chat) floating around the main card.

### Problem / Why It Matters
- **Layout**: Intro text followed by a 4-column grid of problem cards.
- **Card Style**: Transparent white borders and soft blue icon boxes.

### The Transformation (Dark Mode Section)
- **Composition**: A deep slate container with a subtle grid texture.
- **Visual Pipeline**: Left-to-right flow from "Scattered Inputs" (white cards) through an arrow icon into "Clear Action" (dark cards) and a final "Daily Brief" summary bar.
- **Contrast**: High contrast using white text and blue-300 labels against the dark background.

### Core Capabilities
- **Grid**: 3x2 grid of cards with a bottom wide-form "End-of-Day Wrap" card.
- **Labels**: Every card features a top-right JetBrains Mono status label (e.g., "3 priorities ready").

## Motion & Interaction
- **Ambient Drift**: Background blobs move slowly using `auraAmbientDrift` keyframes (26s-32s durations) to create a living canvas.
- **Entrance Animations**: Hero bubbles and cards use `aura-bubble-in` and `aura-card-in` which combine translateY and opacity fades.
- **Floating Idle**: Hero bubbles have a secondary `aura-float-soft` infinite animation (4.5s duration) to maintain a sense of weightlessness.
- **Hover States**: Cards translate -4px on the Y-axis and increase background opacity.

## Do's and Don'ts
- **Do**: Use heavy backdrop blurs on any overlapping surfaces.
- **Do**: Maintain the 'JetBrains Mono' font for all micro-copy and labels.
- **Don't**: Use sharp corners; all UI must have at least a 1rem radius.
- **Don't**: Use flat colors for primary buttons; always use a subtle top-to-bottom vertical gradient.

## Accessibility
- **Reduced Motion**: All background and floating animations are wrapped in `@media (prefers-reduced-motion: reduce)` to disable motion for sensitive users.
- **Contrast**: Large headings use Slate-950 against White/Light-Blue for high legibility.
- **Selection**: Custom selection color using `selection:bg-blue-100` and `selection:text-blue-900`.

## Assets
1. Tailwind CSS: https://cdn.tailwindcss.com
2. Iconify Library: https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js
3. Google Fonts (Inter & JetBrains Mono): https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap
4. Analytics: https://www.googletagmanager.com/gtag/js?id=G-2M6V79H761
5. UnicornStudio: https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js

### Exported Codebase Asset Inventory
1. embed: https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=JetBrains+Mono:wght@400;500;600&amp;display=swap
   Context: index.html: markup attribute; index.html: absolute url literal
