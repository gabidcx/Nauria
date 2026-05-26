import Link from 'next/link'
import { AlertTriangle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PantryItem } from '@/types'

interface ExpiringSoonCardProps {
  items: PantryItem[]
  href?: string
  className?: string
}

export default function ExpiringSoonCard({
  items,
  href = '/expiring',
  className,
}: ExpiringSoonCardProps) {
  if (items.length === 0) return null

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 p-3.5 rounded-md',
        'bg-nauria-amber-light border-[0.5px] border-[#f0c060]',
        'transition-all duration-fast',
        'hover:shadow-card active:scale-[0.98]',
        className,
      )}
    >
      <AlertTriangle
        size={20}
        className="text-nauria-amber flex-shrink-0"
        strokeWidth={1.75}
      />

      <div className="flex-1 min-w-0">
        <p className="text-body-sm font-medium text-nauria-amber leading-tight">
          {items.length} item{items.length !== 1 ? 's' : ''} expiring soon
        </p>
        <p className="text-caption text-text-secondary mt-0.5">
          {items
            .slice(0, 3)
            .map((i) => i.name)
            .join(', ')}
          {items.length > 3 ? ` +${items.length - 3} more` : ''}
        </p>
      </div>

      {/* AI badge */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <Sparkles size={14} className="text-nauria-amber" strokeWidth={1.75} />
        <span className="text-caption text-nauria-amber font-medium">AI tips</span>
      </div>
    </Link>
  )
}
