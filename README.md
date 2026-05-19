# 🧬 Ribosome Rush

A 3D amino acid puzzle game inspired by real molecular biology.

**[▶ Play it live](https://mrfeixiang.github.io/ribosome-rush/)**

## How to play

1. A codon appears at the bottom-left (e.g. `AUG`)
2. Nine 3D ball-and-stick amino acid molecules are shown in a 3×3 grid
3. Click the one that matches the codon to add it to your peptide chain
4. Build all 10 amino acids as fast as you can
5. Your speed (aa/s) is compared to real ribosome rates

## Biology

- **Prokaryotic ribosomes** (e.g. *E. coli*) incorporate ~20 amino acids per second
- **Eukaryotic ribosomes** (e.g. human) run at ~5–8 aa/s
- Amino acids are displayed as CPK-coloured heavy-atom ball-and-stick models
  - ⚫ Carbon · 🔵 Nitrogen · 🔴 Oxygen · 🟡 Sulfur

## Amino acid colour coding

| Type | Colour | Examples |
|---|---|---|
| Nonpolar | Gray | GLY ALA VAL LEU ILE PRO PHE TRP MET |
| Polar | Green | SER THR CYS TYR ASN GLN |
| Positive (+) | Blue | LYS ARG HIS |
| Negative (−) | Red | ASP GLU |

## Tech stack

Single-file static HTML — no build step required.  
Uses [Three.js](https://threejs.org) (via CDN) for all 3D rendering.

## Deploy to GitHub Pages

1. Fork or push to any GitHub repo
2. Go to **Settings → Pages → Source → GitHub Actions**
3. The included workflow auto-deploys on every push to `main`
