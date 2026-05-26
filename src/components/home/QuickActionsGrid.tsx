import Link from 'next/link'
import {
  Scan,
  ShoppingCart,
  Sparkles,
  CalendarDays,
  LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── ICON MAP ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Scan,
  ShoppingCart,
  Sparkles,
  CalendarDays,
}

// ─── SINGLE QUICK ACTION ──────────────────────────────────────────────────────

interface QuickActionTileProps {
  label: string
  subtitle: string
  iconName: string
  href: string
  colorClass: string
  iconColorClass: string
  className?: string
}

function QuickActionTile({
  label,
  subtitle,
  iconName,
  href,
  colorClass,
  iconColorClass,
  className,
}: QuickActionTileProps) {
  const Icon = ICON_MAP[iconName]

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col gap-2 p-3 bg-white rounded-md',
        'border-[0.5px] border-[rgba(0,0,0,0.08)]',
        'transition-all duration-fast ease-micro',
        'hover:shadow-card-hover active:scale-[0.97]',
        className,
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          'w-9 h-9 rounded-sm flex items-center justify-center',
          colorClass,
        )}
      >
        {Icon && (
          <Icon size={18} className={iconColorClass} strokeWidth={1.75} />
        )}
      </div>

      {/* Text */}
      <div>
        <p className="text-body-sm font-medium text-text-primary leading-tight">
          {label}
        </p>
        <p className="text-caption text-text-tertiary mt-0.5">{subtitle}</p>
      </div>
    </Link>
  )
}

// ─── QUICK ACTIONS GRID ───────────────────────────────────────────────────────

interface QuickAction {
  id: string
  label: string
  subtitle: string
  icon: string
  href: string
  colorClass: string
  iconColorClass: string
}

interface QuickActionsGridProps {
  actions: QuickAction[]
  className?: string
}

export default function QuickActionsGrid({
  actions,
  className,
}: QuickActionsGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-2.5',
        className,
      )}
    >
      {actions.map((action) => (
        <QuickActionTile
          key={action.id}
          label={action.label}
          subtitle={action.subtitle}
          iconName={action.icon}
          href={action.href}
          colorClass={action.colorClass}
          iconColorClass={action.iconColorClass}
        />
      ))}
    </div>
  )
}
