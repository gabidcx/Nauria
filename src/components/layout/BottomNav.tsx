'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  ShoppingBasket,
  BookOpen,
  CalendarDays,
  PieChart,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── NAV ITEMS CONFIG ─────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: '/',        label: 'Home',     Icon: Home           },
  { href: '/pantry',  label: 'Pantry',   Icon: ShoppingBasket },
  { href: '/recipes', label: 'Recipes',  Icon: BookOpen       },
  { href: '/planner', label: 'Planner',  Icon: CalendarDays   },
  { href: '/budget',  label: 'Budget',   Icon: PieChart       },
] as const

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'h-[82px] bg-cream',
        'border-t-[0.5px] border-[rgba(0,0,0,0.08)]',
        // Safe area for iPhones
        'pb-safe-bottom',
      )}
      aria-label="Main navigation"
    >
      <div className="flex items-start pt-2.5 h-full">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center gap-1',
                'py-1 outline-none',
                // Minimum touch target
                'min-h-[44px] justify-center',
                'transition-colors duration-fast ease-micro',
                isActive ? 'text-green' : 'text-text-tertiary',
                !isActive && 'hover:text-text-secondary',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2 : 1.75}
                className="transition-all duration-fast"
              />
              <span className="text-nav font-medium tracking-wide">
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
