import { cn } from '@/lib/utils'

type ProgressVariant = 'green' | 'amber' | 'danger' | 'blue' | 'white'

const trackColors: Record<ProgressVariant, string> = {
  green:  'bg-cream-3',
  amber:  'bg-cream-3',
  danger: 'bg-cream-3',
  blue:   'bg-cream-3',
  white:  'bg-white/20',
}

const fillColors: Record<ProgressVariant, string> = {
  green:  'bg-green',
  amber:  'bg-nauria-amber',
  danger: 'bg-nauria-danger',
  blue:   'bg-nauria-blue',
  white:  'bg-white',
}

interface ProgressBarProps {
  value: number           // 0-100
  variant?: ProgressVariant
  height?: 'xs' | 'sm' | 'md'
  animated?: boolean
  className?: string
  trackClassName?: string
}

const heights = {
  xs: 'h-1.5',
  sm: 'h-2',
  md: 'h-2.5',
}

export default function ProgressBar({
  value,
  variant = 'green',
  height = 'sm',
  animated = true,
  className,
  trackClassName,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value))

  return (
    <div
      className={cn(
        'w-full rounded-pill overflow-hidden',
        heights[height],
        trackColors[variant],
        trackClassName,
      )}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          'h-full rounded-pill',
          fillColors[variant],
          animated && 'transition-[width] duration-slow ease-smooth',
          className,
        )}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  )
}
