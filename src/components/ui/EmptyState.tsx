import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import Button from './Button'

interface EmptyStateProps {
  emoji: string
  title: string
  description: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
  children?: ReactNode
}

export default function EmptyState({
  emoji,
  title,
  description,
  action,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center',
        'py-10 px-6',
        className,
      )}
    >
      {/* Emoji icon in a soft circle */}
      <div className="w-20 h-20 rounded-full bg-cream-2 flex items-center justify-center mb-4 text-4xl">
        {emoji}
      </div>

      {/* Title — uses display font for elegance */}
      <h3 className="font-display text-display-sm font-medium text-text-primary mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-text-tertiary leading-relaxed max-w-[240px] mb-5">
        {description}
      </p>

      {/* Optional action button */}
      {action && (
        <Button
          variant="secondary"
          size="sm"
          className="gap-1.5"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}

      {/* Optional custom children */}
      {children}
    </div>
  )
}
