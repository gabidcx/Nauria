import ProgressBar from '@/components/ui/ProgressBar'
import { formatCurrency, getBudgetPercentage } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BudgetHeroCardProps {
  totalBudget: number
  spent: number
  currency?: 'EUR' | 'USD'
  month?: string
  daysRemaining?: number
  className?: string
}

export default function BudgetHeroCard({
  totalBudget,
  spent,
  currency = 'EUR',
  month = 'May',
  daysRemaining = 21,
  className,
}: BudgetHeroCardProps) {
  const remaining = totalBudget - spent
  const percentage = getBudgetPercentage(spent, totalBudget)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-green p-5',
        className,
      )}
    >
      {/* Decorative circles */}
      <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full bg-white/[0.06] pointer-events-none" />
      <div className="absolute -bottom-8 right-5 w-20 h-20 rounded-full bg-white/[0.04] pointer-events-none" />

      {/* Top row */}
      <div className="relative flex items-start justify-between mb-4">
        <div>
          <p className="text-label uppercase tracking-widest text-white/60 mb-1">
            {month} Budget
          </p>
          <p className="font-display text-[2.375rem] font-light text-white leading-none">
            {formatCurrency(totalBudget, currency)}
          </p>
        </div>

        {/* Remaining pill */}
        <div className="bg-white/[0.15] backdrop-blur-sm rounded-md px-3.5 py-2.5 text-right border border-white/10">
          <p className="text-[10px] text-white/65 mb-0.5">Remaining</p>
          <p className="font-display text-[1.375rem] font-normal text-white leading-none">
            {formatCurrency(remaining, currency)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative mb-1.5">
        <ProgressBar
          value={percentage}
          variant="white"
          height="sm"
          animated
        />
      </div>

      {/* Footer */}
      <div className="relative flex justify-between">
        <p className="text-caption text-white/65">
          {formatCurrency(spent, currency)} spent ({percentage}%)
        </p>
        <p className="text-caption text-white/65">
          {daysRemaining} days left
        </p>
      </div>
    </div>
  )
}
