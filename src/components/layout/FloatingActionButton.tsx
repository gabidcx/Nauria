'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Plus,
  X,
  ShoppingBasket,
  Scan,
  Sparkles,
  CalendarDays,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── FAB ITEMS CONFIG ─────────────────────────────────────────────────────────

const FAB_ITEMS = [
  {
    id: 'pantry',
    label: 'Add pantry item',
    Icon: ShoppingBasket,
    href: '/pantry/add',
  },
  {
    id: 'scan',
    label: 'Scan receipt',
    Icon: Scan,
    href: '/scan',
  },
  {
    id: 'ai',
    label: 'Generate recipe',
    Icon: Sparkles,
    href: '/ai-recipe',
  },
  {
    id: 'planner',
    label: 'Add to planner',
    Icon: CalendarDays,
    href: '/planner',
  },
] as const

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const fabRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      ref={fabRef}
      className="fixed bottom-[100px] right-5 z-50 flex flex-col items-end gap-2.5"
    >
      {/* Action items — stagger reveal */}
      <div
        className={cn(
          'flex flex-col gap-2 items-end',
          'transition-all duration-base ease-smooth',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        {FAB_ITEMS.map(({ id, label, Icon, href }, index) => (
          <Link
            key={id}
            href={href}
            onClick={() => setIsOpen(false)}
            className={cn(
              'flex items-center gap-2.5',
              'transition-all duration-base ease-smooth',
              isOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2',
            )}
            style={{
              transitionDelay: isOpen
                ? `${index * 50}ms`
                : `${(FAB_ITEMS.length - 1 - index) * 30}ms`,
            }}
          >
            {/* Label pill */}
            <span className="bg-white text-text-primary text-[13px] font-medium px-3.5 py-1.5 rounded-md shadow-card border-[0.5px] border-[rgba(0,0,0,0.08)] whitespace-nowrap">
              {label}
            </span>

            {/* Icon circle */}
            <div className="w-10 h-10 rounded-full bg-green-light border-[0.5px] border-green-mid flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-green" strokeWidth={1.75} />
            </div>
          </Link>
        ))}
      </div>

      {/* Main FAB button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open quick actions'}
        aria-expanded={isOpen}
        className={cn(
          'w-[52px] h-[52px] rounded-full bg-green',
          'flex items-center justify-center',
          'shadow-fab',
          'border-none outline-none',
          'transition-all duration-base ease-spring',
          'active:scale-90',
          'hover:bg-green-dark',
        )}
      >
        <div
          className={cn(
            'transition-transform duration-base ease-spring',
            isOpen && 'rotate-45',
          )}
        >
          <Plus size={22} className="text-white" strokeWidth={2} />
        </div>
      </button>
    </div>
  )
}
