# AIDD Workshop Website Design Brainstorm

## Context
An interactive workshop website for "AI工具的乐与怒" (The Joy & Fury of AI Tools) — a series prologue for pharmaceutical researchers. The site should let attendees navigate modules, explore tools, and interact with content. The tone is rebellious-academic, inspired by Beyond's 1993 album.

---

<response>
<text>
## Idea 1: "Lab Notebook Noir" — Dark Academic Research Journal

**Design Movement**: Dark Academia meets Technical Documentation — think of a researcher's midnight lab notebook digitized with neon annotations.

**Core Principles**:
1. Dense information architecture with progressive disclosure (accordion/tabs reveal depth)
2. Monochromatic dark canvas with surgical accent highlights
3. Terminal/code aesthetic for technical credibility
4. Vertical scroll storytelling with fixed navigation waypoints

**Color Philosophy**: Deep charcoal (#0D1117) as the void of a late-night lab, with electric amber (#F0A500) as the highlighter pen marking critical insights, and cool slate (#8B949E) for body text that doesn't strain tired eyes. A flash of crimson (#FF4757) for warnings and "怒" moments.

**Layout Paradigm**: Left-anchored sticky sidebar navigation (module list) with a wide content river. Content sections use a "research paper" layout — wide margins with pull-quotes and annotations floating in the gutter. Mobile collapses to a top-tab navigation.

**Signature Elements**:
1. Glowing "highlighter" effect on key terms (CSS text-shadow with amber glow)
2. Terminal-style code blocks with blinking cursor for Docker commands
3. "Lab stamp" badges for each module (circular seals with module numbers)

**Interaction Philosophy**: Hover reveals hidden annotations (like margin notes in a research paper). Clicking a tool name expands an inline card with details. Scroll-triggered fade-ins for each section.

**Animation**: Typewriter effect on section titles. Subtle parallax on hero. Code blocks "type themselves" on scroll-into-view. Smooth accordion expansions.

**Typography System**: 
- Headlines: Space Grotesk 700 (technical, geometric authority)
- Body: IBM Plex Sans 400/500 (lab-report readability)
- Code/Accents: JetBrains Mono (terminal authenticity)
</text>
<probability>0.07</probability>
</response>

<response>
<text>
## Idea 2: "Vinyl Rebellion" — Beyond 1993 Rock Poster Aesthetic

**Design Movement**: Concert poster art meets scientific infographic — the visual language of 90s Hong Kong rock culture colliding with pharmaceutical research diagrams.

**Core Principles**:
1. Bold typographic hierarchy with Chinese characters as visual anchors
2. Warm, analog texture (paper grain, ink bleed effects)
3. Horizontal section breaks using diagonal cuts and torn-paper edges
4. Each module feels like a different "track" on an album

**Color Philosophy**: Warm ivory (#F5F0E8) as aged vinyl sleeve paper, deep forest teal (#1A3636) as the ink of authority, burnt sienna (#D97757) as the rebellious accent (Beyond's energy), and charcoal (#2D2D2D) for grounding text. The palette evokes a hand-printed gig poster.

**Layout Paradigm**: Full-width horizontal bands, each module occupying a distinct "poster panel." Hero section uses an asymmetric split — giant Chinese title on left, English subtitle and metadata on right. Modules alternate between left-heavy and right-heavy layouts. A floating "track list" navigation bar at the bottom (like a music player).

**Signature Elements**:
1. Diagonal section dividers with paper-texture overlays
2. "Vinyl groove" circular progress indicators for module completion
3. Stamp/seal motifs for key takeaways (red ink chop style)

**Interaction Philosophy**: Clicking modules feels like flipping vinyl sides. Tool cards flip on hover to reveal details. The bottom navigation bar shows progress like a song timeline.

**Animation**: Sections slide in from alternating sides. Hero title has a subtle ink-bleed animation on load. Scroll progress shown as a vinyl needle moving across the bottom bar.

**Typography System**:
- Headlines: Playfair Display 900 (dramatic serif for titles) + Noto Serif SC for Chinese
- Body: Work Sans 400/500 (warm, humanist readability)
- Accents: DM Mono for code snippets and technical terms
</text>
<probability>0.05</probability>
</response>

<response>
<text>
## Idea 3: "Molecular Blueprint" — Pharmaceutical Wireframe Aesthetic

**Design Movement**: Architectural blueprint meets molecular visualization — the precision of drug design schematics rendered as a navigable web experience.

**Core Principles**:
1. Grid-obsessed layout with visible structural lines
2. Monospace typography dominance for scientific precision
3. Blueprint blue-white palette with fluorescent annotation markers
4. Every element feels measured and intentional, like a molecular diagram

**Color Philosophy**: Deep blueprint navy (#0A1628) as the drafting table, crisp white (#E8F0FE) for structural lines and text, electric cyan (#00D4FF) for interactive hotspots and links, and warning magenta (#FF2D78) for critical alerts. The palette channels the precision of CAD software meets the glow of a fluorescence microscope.

**Layout Paradigm**: CSS Grid with visible gridlines (faint dotted lines). Content blocks snap to grid intersections like molecular nodes. Navigation is a horizontal "molecular chain" at the top — each module is a node connected by bonds. Clicking a node zooms into that module's content.

**Signature Elements**:
1. Visible grid dots in the background (like graph paper)
2. "Bond lines" connecting related sections (SVG paths between elements)
3. Hexagonal badges for tool categories (molecular ring motif)

**Interaction Philosophy**: Hovering over elements shows "measurement lines" (distance indicators). Tool comparisons use side-by-side blueprint overlays. Interactive checkboxes for "practice completed" states.

**Animation**: Elements draw themselves on scroll (SVG path animation). Grid dots pulse subtly in the background. Section transitions use a "zoom into node" effect.

**Typography System**:
- Headlines: Space Mono 700 (blueprint precision)
- Body: Inter 400/500 (clean technical readability)
- Annotations: Fira Code for all code and technical notation
</text>
<probability>0.04</probability>
</response>

---

## Selected Approach: Idea 2 — "Vinyl Rebellion"

This approach best captures the spirit of the presentation: the Beyond 1993 tribute, the rebellious energy of "乐与怒", and the warmth of a personal, opinionated tech talk. The concert poster aesthetic creates visual memorability while the structured module layout ensures educational usability. The warm analog palette prevents the cold, generic "AI website" feel.
