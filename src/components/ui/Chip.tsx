'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ─── FILTER CHIP ─────────────────────────────────────────────────────────────

interface FilterChipProps {
  label: string
  count?: number
  active?: boolean
  onClick?: () => void
  icon?: ReactNode
  className?: string
}

export function FilterChip({
  label,
  count,
  active = false,
  onClick,
  icon,
  className,
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-[7px] rounded-pill',
        'text-[12px] font-medium whitespace-nowrap',
        'border-[0.5px] outline-none',
        'transition-all duration-fast ease-micro',
        'active:scale-[0.96]',
        // Active state
        active
          ? 'bg-green text-white border-transparent'
          : 'bg-cream-2 text-text-secondary border-[rgba(0,0,0,0.08)] hover:bg-cream-3',
        className,
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label}
      {count !== undefined && (
        <span
          className={cn(
            'text-[11px] font-semibold',
            active ? 'text-white/70' : 'text-text-tertiary',
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}

// ─── CHIPS ROW ───────────────────────────────────────────────────────────────

interface ChipsRowProps {
  children: ReactNode
  className?: string
}

export function ChipsRow({ children, className }: ChipsRowProps) {
  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto pb-0.5',
        'scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]',
        '[&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}

// ─── TAG (non-interactive) ───────────────────────────────────────────────────

type TagVariant = 'green' | 'blue' | 'amber'

const tagVariants: Record<TagVariant, string> = {
  green: 'bg-green-light text-green',
  blue:  'bg-nauria-blue-light text-nauria-blue',
  amber: 'bg-nauria-amber-light text-nauria-amber',
}

interface TagProps {
  children: ReactNode
  variant?: TagVariant
  className?: string
}

export function Tag({ children, variant = 'green', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-pill',
        'text-[11px] font-medium',
        tagVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
