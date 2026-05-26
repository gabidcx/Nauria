import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { PantryItemStatus, PantryCategory } from '@/types'

// ─── CLASSNAME UTILITY ───────────────────────────────────────────────────────

/**
 * Merges Tailwind classes safely, resolving conflicts.
 * Use this for all conditional class building.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── PANTRY UTILITIES ────────────────────────────────────────────────────────

/**
 * Computes pantry item status from expiry date.
 * Fresh: >5 days | Use Soon: 2–5 days | Expiring: ≤1 day | Expired: past
 */
export function getPantryStatus(expiryDate: string): PantryItemStatus {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(expiryDate)
  expiry.setHours(0, 0, 0, 0)
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'expired'
  if (diffDays <= 1) return 'expiring'
  if (diffDays <= 5) return 'use-soon'
  return 'fresh'
}

/**
 * Returns days until expiry as a readable string.
 */
export function getExpiryLabel(expiryDate: string): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiry = new Date(expiryDate)
  expiry.setHours(0, 0, 0, 0)
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'Expired'
  if (diffDays === 0) return 'Expires today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays <= 7) return `${diffDays} days`
  return formatDate(expiryDate)
}

/**
 * Status badge config — returns label, bg, and text classes.
 */
export function getStatusConfig(status: PantryItemStatus) {
  const configs = {
    fresh:     { label: 'Fresh',    bg: 'bg-[#e8f5ee]', text: 'text-[#2d7a50]' },
    'use-soon': { label: 'Use Soon', bg: 'bg-nauria-amber-light', text: 'text-nauria-amber' },
    expiring:  { label: 'Expiring', bg: 'bg-nauria-danger-light', text: 'text-nauria-danger' },
    expired:   { label: 'Expired',  bg: 'bg-nauria-danger-light', text: 'text-nauria-danger' },
  }
  return configs[status]
}

// ─── CATEGORY UTILITIES ──────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<PantryCategory, { label: string; emoji: string; bg: string }> = {
  vegetables:          { label: 'Vegetables',        emoji: '🥬', bg: 'bg-green-light' },
  fruits:              { label: 'Fruits',            emoji: '🍎', bg: 'bg-[#fce8f0]' },
  proteins:            { label: 'Proteins',          emoji: '🥩', bg: 'bg-nauria-amber-light' },
  grains:              { label: 'Grains',            emoji: '🌾', bg: 'bg-cream-2' },
  'dairy-alternatives': { label: 'Dairy alt.',      emoji: '🥛', bg: 'bg-nauria-blue-light' },
  canned:              { label: 'Canned',            emoji: '🫙', bg: 'bg-cream-2' },
  condiments:          { label: 'Condiments',        emoji: '🧂', bg: 'bg-cream-2' },
  snacks:              { label: 'Snacks',            emoji: '🍿', bg: 'bg-[#fff4e3]' },
  baking:              { label: 'Baking',            emoji: '🧁', bg: 'bg-[#fce8f0]' },
  other:               { label: 'Other',             emoji: '📦', bg: 'bg-cream-2' },
}

export function getCategoryConfig(category: PantryCategory) {
  return CATEGORY_CONFIG[category]
}

export function getAllCategories() {
  return Object.entries(CATEGORY_CONFIG).map(([key, config]) => ({
    value: key as PantryCategory,
    ...config,
  }))
}

// ─── DATE UTILITIES ──────────────────────────────────────────────────────────

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function formatCurrency(amount: number, currency: 'EUR' | 'USD' = 'EUR'): string {
  const symbol = currency === 'EUR' ? '€' : '$'
  return `${symbol}${amount.toFixed(0)}`
}

export function formatCurrencyDecimal(amount: number, currency: 'EUR' | 'USD' = 'EUR'): string {
  const symbol = currency === 'EUR' ? '€' : '$'
  return `${symbol}${amount.toFixed(2)}`
}

// ─── BUDGET UTILITIES ────────────────────────────────────────────────────────

export function getBudgetPercentage(spent: number, total: number): number {
  if (total === 0) return 0
  return Math.min(Math.round((spent / total) * 100), 100)
}

export function getBudgetStatus(percentage: number): 'safe' | 'caution' | 'danger' {
  if (percentage >= 90) return 'danger'
  if (percentage >= 70) return 'caution'
  return 'safe'
}

// ─── ARRAY UTILITIES ─────────────────────────────────────────────────────────

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key])
    if (!acc[groupKey]) acc[groupKey] = []
    acc[groupKey].push(item)
    return acc
  }, {} as Record<string, T[]>)
}
