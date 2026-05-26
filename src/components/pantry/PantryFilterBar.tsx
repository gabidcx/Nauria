'use client'

import { cn } from '@/lib/utils'
import { FilterChip, ChipsRow } from '@/components/ui/Chip'
import type { PantryCategory } from '@/types'

// ─── CATEGORY CONFIG ──────────────────────────────────────────────────────────

const CATEGORY_FILTERS: Array<{
  value: PantryCategory | 'all'
  label: string
}> = [
  { value: 'all',              label: 'All'          },
  { value: 'vegetables',       label: 'Vegetables'   },
  { value: 'fruits',           label: 'Fruits'       },
  { value: 'proteins',         label: 'Proteins'     },
  { value: 'grains',           label: 'Grains'       },
  { value: 'dairy-alternatives', label: 'Dairy alt.' },
  { value: 'canned',           label: 'Canned'       },
  { value: 'condiments',       label: 'Condiments'   },
  { value: 'snacks',           label: 'Snacks'       },
  { value: 'baking',           label: 'Baking'       },
]

// ─── PROPS ────────────────────────────────────────────────────────────────────

interface PantryFilterBarProps {
  activeCategory: PantryCategory | 'all'
  onCategoryChange: (category: PantryCategory | 'all') => void
  categoryCounts: Partial<Record<PantryCategory | 'all', number>>
  className?: string
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function PantryFilterBar({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  className,
}: PantryFilterBarProps) {
  return (
    <ChipsRow className={cn(className)}>
      {CATEGORY_FILTERS.map(({ value, label }) => {
        const count = categoryCounts[value]
        const hasItems = count !== undefined && count > 0

        return (
          <FilterChip
            key={value}
            label={label}
            count={count}
            active={activeCategory === value}
            onClick={() => onCategoryChange(value)}
          />
        )
      })}
    </ChipsRow>
  )
}
