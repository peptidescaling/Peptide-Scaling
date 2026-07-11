# PeptideScaling — Website

Static marketing website for PeptideScaling Growth Marketing Agency.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Google Fonts (Inter + Syne)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build (Static Export)

```bash
npm run build
```

## Project Structure

```
app/
  components/
    Navbar.tsx         # Sticky nav with mobile hamburger
    Hero.tsx           # Full-screen dark hero with stats
    Positioning.tsx    # "Built Differently" 3-column
    PainPoints.tsx     # 6-card pain grid (dark)
    Solution.tsx       # Infrastructure split layout
    PremiumAssets.tsx  # Agency accounts + supporting cards
    Services.tsx       # Meta / Google / Email / CRO
    Packages.tsx       # Scale + Launch side-by-side
    Network.tsx        # Partner network 4-card grid
    Results.tsx        # Live campaign numbers (dark)
    CTA.tsx            # Booking CTA block
    Footer.tsx         # Links + disclaimer
  page.tsx             # Main page (assembles all sections)
  layout.tsx           # Root layout + metadata
  globals.css          # CSS variables + Google Fonts
public/
  logo.png             # PeptideScaling logo (light bg)
  logo-white.png       # PeptideScaling logo (dark bg)
```

## Design System

| Token | Value |
|-------|-------|
| Brand Green | `#8DC63F` |
| Green Dark | `#6BA82E` |
| Dark BG | `#0F1A0A` |
| Charcoal | `#1A1A1A` |
| Light BG | `#F5F5F3` |
| Display Font | Syne 800 |
| Body Font | Inter |

## Notes for Dev Handoff
- Replace Calendly href in `CTA.tsx` with real booking URL
- Logo in Footer uses `filter: brightness(0) invert(1)` for dark bg — swap for a true white PNG if preferred
- All sections use inline styles (no Tailwind classes for layout) for predictability in handoff
