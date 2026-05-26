# Nauria — Frontend Foundation

> Your calm kitchen companion. Premium mobile-first web app built with Next.js 14.

---

## Getting started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

The app will be available at `http://localhost:3000`. For best results, use Chrome DevTools in mobile mode (iPhone 14 Pro, 390px width).

---

## Project structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (fonts, metadata, PWA)
│   ├── globals.css              # Tailwind + global styles
│   ├── page.tsx                 # Root redirect → /app-home
│   ├── app-home/
│   │   └── page.tsx             # ✅ Home screen (complete)
│   ├── pantry/
│   │   ├── layout.tsx
│   │   └── page.tsx             # ✅ Pantry screen (complete)
│   ├── recipes/
│   │   └── page.tsx             # 🔜 Phase 1 next
│   ├── planner/
│   │   └── page.tsx             # 🔜 Phase 1 next
│   └── budget/
│       └── page.tsx             # 🔜 Phase 1 next
│
├── components/
│   ├── ui/                      # Primitive components
│   │   ├── Button.tsx           # ✅ All variants
│   │   ├── Badge.tsx            # ✅ Status + semantic badges
│   │   ├── Chip.tsx             # ✅ Filter chips, tags
│   │   ├── SearchBar.tsx        # ✅ With clear button
│   │   ├── ProgressBar.tsx      # ✅ All variants
│   │   ├── EmptyState.tsx       # ✅ Emotional empty states
│   │   └── Skeleton.tsx         # ✅ Loading placeholders
│   │
│   ├── layout/                  # Structural layout components
│   │   ├── BottomNav.tsx        # ✅ 5-tab navigation with active states
│   │   ├── Header.tsx           # ✅ TabHeader, BackHeader, HomeHeader
│   │   └── FloatingActionButton.tsx  # ✅ Animated FAB with 4 actions
│   │
│   ├── home/                    # Home screen components
│   │   ├── BudgetHeroCard.tsx   # ✅ Monthly budget with progress
│   │   ├── QuickActionsGrid.tsx # ✅ 2-column quick action grid
│   │   └── RecipeCard.tsx       # ✅ Grid + row + horizontal scroll variants
│   │
│   ├── pantry/                  # Pantry screen components
│   │   ├── PantryItemRow.tsx    # ✅ Swipeable row + category group
│   │   ├── PantryFilterBar.tsx  # ✅ Category chip filter
│   │   └── ExpiringSoonCard.tsx # ✅ Alert card with AI hint
│   │
│   └── shared/                  # Shared layout utilities
│       └── SectionLabel.tsx     # ✅ Labels, headers, dividers, callouts
│
├── data/
│   └── mock.ts                  # ✅ Realistic mock data (15 pantry items, 6 recipes)
│
├── hooks/
│   └── usePantry.ts             # ✅ Pantry state management hook
│
├── lib/
│   └── utils.ts                 # ✅ cn(), status logic, formatters
│
└── types/
    └── index.ts                 # ✅ Full TypeScript type system
```

---

## Design tokens

All design tokens are defined in `tailwind.config.ts` and available as Tailwind utility classes:

| Token | Tailwind class | Value |
|-------|---------------|-------|
| Brand green | `bg-green`, `text-green` | `#3a6b47` |
| Green light | `bg-green-light` | `#e8f0ea` |
| App background | `bg-cream` | `#faf9f6` |
| Display font | `font-display` | Cormorant Garamond |
| Body font | `font-body` | DM Sans |
| Danger | `text-nauria-danger` | `#b33a3a` |
| Amber | `text-nauria-amber` | `#a06a10` |
| Blue | `text-nauria-blue` | `#4a7fa8` |

---

## Component usage

### Button
```tsx
import Button from '@/components/ui/Button'

<Button variant="primary" size="md" fullWidth>Save item</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="ghost" loading>Generating...</Button>
<Button variant="danger">Delete</Button>
```

### FilterChip
```tsx
import { FilterChip, ChipsRow } from '@/components/ui/Chip'

<ChipsRow>
  <FilterChip label="All" count={38} active onClick={() => {}} />
  <FilterChip label="Vegetables" count={6} onClick={() => {}} />
</ChipsRow>
```

### ProgressBar
```tsx
import ProgressBar from '@/components/ui/ProgressBar'

<ProgressBar value={37} variant="green" height="sm" animated />
<ProgressBar value={85} variant="white" height="sm" />  // For dark bg
```

### StatusBadge
```tsx
import { StatusBadge } from '@/components/ui/Badge'

<StatusBadge status="fresh" />
<StatusBadge status="use-soon" />
<StatusBadge status="expiring" />
```

### EmptyState
```tsx
import EmptyState from '@/components/ui/EmptyState'

<EmptyState
  emoji="🧺"
  title="Your pantry is empty"
  description="Add ingredients to start tracking."
  action={{ label: '+ Add first item', onClick: handleAdd }}
/>
```

### usePantry hook
```tsx
import { usePantry } from '@/hooks/usePantry'

const {
  filteredItems,
  groupedItems,
  categoryCounts,
  expiringItems,
  searchQuery,
  activeCategory,
  setSearchQuery,
  setActiveCategory,
  deleteItem,
  addItem,
} = usePantry({ initialItems: pantryData })
```

---

## PWA setup

The app is PWA-ready. To test:
1. Build: `npm run build && npm start`
2. Open Chrome → DevTools → Application → Manifest
3. Click "Add to Home Screen" in Chrome mobile

Manifest is at `/public/manifest.json`.  
Add real icon files at `/public/icons/icon-192.png` and `/public/icons/icon-512.png`.

---

## What's built (Phase 1 start)

| Feature | Status |
|---------|--------|
| Design system (Tailwind tokens) | ✅ Complete |
| TypeScript types | ✅ Complete |
| Utility functions | ✅ Complete |
| Mock data | ✅ Complete |
| Button component (all variants) | ✅ Complete |
| Badge / StatusBadge | ✅ Complete |
| Chip / FilterChip / Tag | ✅ Complete |
| SearchBar | ✅ Complete |
| ProgressBar | ✅ Complete |
| EmptyState | ✅ Complete |
| Skeleton loaders | ✅ Complete |
| BottomNav | ✅ Complete |
| Header variants | ✅ Complete |
| FloatingActionButton | ✅ Complete |
| BudgetHeroCard | ✅ Complete |
| QuickActionsGrid | ✅ Complete |
| RecipeCard (grid + row + scroll) | ✅ Complete |
| PantryItemRow + swipe hint | ✅ Complete |
| PantryFilterBar | ✅ Complete |
| ExpiringSoonCard | ✅ Complete |
| usePantry hook | ✅ Complete |
| Home screen | ✅ Complete |
| Pantry screen | ✅ Complete |
| Recipes screen | 🔜 Next |
| Planner screen | 🔜 Next |
| Budget screen | 🔜 Next |
| Supabase integration | 🔜 Phase 1 later |
| Authentication | 🔜 Phase 1 later |

---

## Next steps

1. Build Recipes screen with grid layout and filter system
2. Build Planner screen with day selector and meal slots  
3. Build Budget screen with spending breakdown
4. Add Supabase client (`src/lib/supabase.ts`)
5. Replace mock data with real Supabase queries
6. Add authentication (Supabase Auth with Google/Apple)
7. Deploy to Vercel

---

## Stack

- **Next.js 14** — App Router, Server + Client components
- **TypeScript** — Strict mode, full type coverage
- **Tailwind CSS** — Full design system in config
- **Lucide React** — Icon library
- **next/font** — Optimized Google Fonts (Cormorant Garamond, DM Sans, DM Mono)
- **PWA** — Manifest + viewport config ready
