import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

// ─── TAB HEADER (main tab screens) ───────────────────────────────────────────

interface TabHeaderProps {
  title: string
  right?: ReactNode
  className?: string
}

export function TabHeader({ title, right, className }: TabHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between',
        'h-[56px] px-screen-x bg-cream',
        'border-b-[0.5px] border-[rgba(0,0,0,0.06)]',
        className,
      )}
    >
      <h1 className="font-display text-[1.5rem] font-medium text-text-primary leading-none">
        {title}
      </h1>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </header>
  )
}

// ─── BACK HEADER (detail/sub screens) ────────────────────────────────────────

interface BackHeaderProps {
  title?: string
  subtitle?: string
  backHref?: string
  onBack?: () => void
  right?: ReactNode
  className?: string
}

export function BackHeader({
  title,
  subtitle,
  backHref,
  onBack,
  right,
  className,
}: BackHeaderProps) {
  const BackButton = () => {
    const buttonClass = cn(
      'w-9 h-9 rounded-sm bg-cream-2 flex items-center justify-center',
      'border-[0.5px] border-[rgba(0,0,0,0.08)]',
      'text-text-primary transition-all duration-fast',
      'hover:bg-cream-3 active:scale-90',
    )

    if (backHref) {
      return (
        <Link href={backHref} className={buttonClass} aria-label="Go back">
          <ArrowLeft size={18} strokeWidth={1.75} />
        </Link>
      )
    }

    return (
      <button onClick={onBack} className={buttonClass} aria-label="Go back">
        <ArrowLeft size={18} strokeWidth={1.75} />
      </button>
    )
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center gap-3',
        'h-[56px] px-screen-x bg-cream',
        'border-b-[0.5px] border-[rgba(0,0,0,0.06)]',
        className,
      )}
    >
      <BackButton />
      {(title || subtitle) && (
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-display text-[1.25rem] font-medium text-text-primary leading-tight truncate">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="text-caption text-text-tertiary">{subtitle}</p>
          )}
        </div>
      )}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </header>
  )
}

// ─── HOME HEADER (special brand header) ──────────────────────────────────────

interface HomeHeaderProps {
  right?: ReactNode
  className?: string
}

export function HomeHeader({ right, className }: HomeHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between',
        'h-[56px] px-screen-x bg-cream',
        'border-b-[0.5px] border-[rgba(0,0,0,0.06)]',
        className,
      )}
    >
      {/* Brand wordmark */}
      <span className="font-display text-[1.6rem] font-normal italic text-green leading-none">
        nauria
      </span>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </header>
  )
}
