import { cn, getStatusConfig } from '@/lib/utils'
import type { PantryItemStatus } from '@/types'

interface StatusBadgeProps {
  status: PantryItemStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = getStatusConfig(status)
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-pill',
        'text-label font-semibold uppercase tracking-wide',
        config.bg,
        config.text,
        className,
      )}
    >
      {config.label}
    </span>
  )
}

// ─── GENERIC BADGE ───────────────────────────────────────────────────────────

type BadgeVariant = 'green' | 'blue' | 'amber' | 'purple' | 'red' | 'neutral'

const badgeVariants: Record<BadgeVariant, string> = {
  green:   'bg-green-light text-green',
  blue:    'bg-nauria-blue-light text-nauria-blue',
  amber:   'bg-nauria-amber-light text-nauria-amber',
  purple:  'bg-nauria-purple-light text-nauria-purple',
  red:     'bg-nauria-danger-light text-nauria-danger',
  neutral: 'bg-cream-2 text-text-secondary',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-pill',
        'text-[11px] font-medium',
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
