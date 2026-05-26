'use client'

import { useState } from 'react'
import { Trash2, ChevronRight } from 'lucide-react'
import { cn, getCategoryConfig, getExpiryLabel, formatDate } from '@/lib/utils'
import { StatusBadge } from '@/components/ui/Badge'
import type { PantryItem } from '@/types'

interface PantryItemRowProps {
  item: PantryItem
  onDelete?: (id: string) => void
  onClick?: (item: PantryItem) => void
  className?: string
}

export default function PantryItemRow({
  item,
  onDelete,
  onClick,
  className,
}: PantryItemRowProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const categoryConfig = getCategoryConfig(item.category)
  const expiryLabel = getExpiryLabel(item.expiryDate)
  const purchaseLabel = formatDate(item.purchaseDate)

  const handleDelete = () => {
    setIsDeleting(true)
    // Animate out before calling onDelete
    setTimeout(() => {
      onDelete?.(item.id)
    }, 250)
  }

  if (isDeleting) {
    return (
      <div
        className={cn(
          'h-0 overflow-hidden opacity-0',
          'transition-all duration-base ease-smooth',
          className,
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md',
        'animate-fade-in',
        className,
      )}
    >
      {/* Delete background (revealed on swipe) */}
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 w-20',
          'bg-nauria-danger-light flex items-center justify-center',
          'rounded-md',
          'transition-opacity duration-fast',
          isRevealed ? 'opacity-100' : 'opacity-0',
        )}
      >
        <button
          onClick={handleDelete}
          className="flex flex-col items-center gap-1 text-nauria-danger"
          aria-label={`Delete ${item.name}`}
        >
          <Trash2 size={18} strokeWidth={1.75} />
        </button>
      </div>

      {/* Main row content */}
      <div
        className={cn(
          'relative flex items-center gap-3',
          'p-3 bg-white',
          'border-[0.5px] border-[rgba(0,0,0,0.08)] rounded-md',
          'transition-transform duration-fast',
          isRevealed ? '-translate-x-16' : 'translate-x-0',
          'cursor-pointer',
        )}
        onClick={() => onClick?.(item)}
        // Swipe hint on long press for desktop; actual swipe on mobile
        onContextMenu={(e) => {
          e.preventDefault()
          setIsRevealed((prev) => !prev)
        }}
      >
        {/* Category icon */}
        <div
          className={cn(
            'w-10 h-10 rounded-sm flex items-center justify-center',
            'text-lg flex-shrink-0',
            categoryConfig.bg,
          )}
          aria-hidden="true"
        >
          {item.emoji ?? categoryConfig.emoji}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-body-md font-medium text-text-primary truncate">
            {item.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-caption text-text-tertiary">
              {item.quantity} {item.unit}
            </span>
            <span className="text-text-disabled text-caption">·</span>
            <span className="text-caption text-text-tertiary">
              Bought {purchaseLabel}
            </span>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <StatusBadge status={item.status} />
          {(item.status === 'use-soon' || item.status === 'expiring') && (
            <span className="text-[10px] text-text-tertiary">{expiryLabel}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── PANTRY CATEGORY GROUP ────────────────────────────────────────────────────

interface PantryCategoryGroupProps {
  categoryKey: string
  items: PantryItem[]
  onDeleteItem?: (id: string) => void
  onClickItem?: (item: PantryItem) => void
}

export function PantryCategoryGroup({
  categoryKey,
  items,
  onDeleteItem,
  onClickItem,
}: PantryCategoryGroupProps) {
  // Skip if no items
  if (items.length === 0) return null

  // Get category display name
  const labels: Record<string, string> = {
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    proteins: 'Proteins',
    grains: 'Grains',
    'dairy-alternatives': 'Dairy alternatives',
    canned: 'Canned goods',
    condiments: 'Condiments',
    snacks: 'Snacks',
    baking: 'Baking',
    other: 'Other',
  }

  return (
    <div className="mb-5">
      <p className="text-label font-semibold uppercase tracking-widest text-text-tertiary mb-2.5">
        {labels[categoryKey] ?? categoryKey} · {items.length}
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <PantryItemRow
            key={item.id}
            item={item}
            onDelete={onDeleteItem}
            onClick={onClickItem}
          />
        ))}
      </div>
    </div>
  )
}
