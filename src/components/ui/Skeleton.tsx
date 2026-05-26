import { cn } from '@/lib/utils'

// ─── BASE SKELETON ────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'full'
}

export function Skeleton({ className, rounded = 'xs' }: SkeletonProps) {
  const roundedMap = {
    none: '',
    xs:   'rounded-xs',
    sm:   'rounded-sm',
    md:   'rounded-md',
    lg:   'rounded-lg',
    full: 'rounded-full',
  }

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-cream-3 via-cream-2 to-cream-3',
        'bg-[length:200%_100%]',
        'animate-shimmer',
        roundedMap[rounded],
        className,
      )}
      aria-hidden="true"
    />
  )
}

// ─── PANTRY ROW SKELETON ──────────────────────────────────────────────────────

export function PantryRowSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-md border-[0.5px] border-[rgba(0,0,0,0.08)]">
      <Skeleton className="w-10 h-10 flex-shrink-0" rounded="sm" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-16" rounded="full" />
    </div>
  )
}

// ─── RECIPE CARD SKELETON ─────────────────────────────────────────────────────

export function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border-[0.5px] border-[rgba(0,0,0,0.08)] overflow-hidden">
      <Skeleton className="h-28 w-full" rounded="none" />
      <div className="p-2.5 space-y-2">
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-24" rounded="full" />
      </div>
    </div>
  )
}

// ─── BUDGET CARD SKELETON ─────────────────────────────────────────────────────

export function BudgetCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border-[0.5px] border-[rgba(0,0,0,0.08)] p-4">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-9 w-32 mb-4" />
      <Skeleton className="h-2 w-full mb-2" rounded="full" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}
