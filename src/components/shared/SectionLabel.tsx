import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ReactNode } from 'react'

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'text-label font-semibold uppercase tracking-widest text-text-tertiary',
        className,
      )}
    >
      {children}
    </p>
  )
}

// ─── SECTION HEADER (label + see all link) ────────────────────────────────────

interface SectionHeaderProps {
  label: string
  seeAllHref?: string
  seeAllLabel?: string
  className?: string
}

export function SectionHeader({
  label,
  seeAllHref,
  seeAllLabel = 'See all',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <SectionLabel>{label}</SectionLabel>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="text-caption text-green font-medium hover:opacity-70 transition-opacity duration-fast"
        >
          {seeAllLabel}
        </Link>
      )}
    </div>
  )
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────

export function Divider({ className }: { className?: string }) {
  return (
    <hr className={cn('border-none border-t-[0.5px] border-[rgba(0,0,0,0.08)]', className)} />
  )
}

// ─── CALLOUT ─────────────────────────────────────────────────────────────────

type CalloutVariant = 'green' | 'amber' | 'blue' | 'danger'

const calloutStyles: Record<CalloutVariant, string> = {
  green:  'bg-green-light border-green-mid text-green-dark',
  amber:  'bg-nauria-amber-light border-[#f0c060] text-nauria-amber',
  blue:   'bg-nauria-blue-light border-[#aacce4] text-[#1a3a58]',
  danger: 'bg-nauria-danger-light border-[rgba(179,58,58,0.2)] text-nauria-danger',
}

interface CalloutProps {
  variant?: CalloutVariant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function Callout({ variant = 'green', icon, children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 px-4 py-3.5 rounded-md border-[0.5px]',
        calloutStyles[variant],
        className,
      )}
    >
      {icon && <span className="flex-shrink-0 mt-0.5">{icon}</span>}
      <div className="text-body-sm leading-relaxed">{children}</div>
    </div>
  )
}
