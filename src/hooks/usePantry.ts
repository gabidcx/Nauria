'use client'

import { useState, useMemo, useCallback } from 'react'
import type { PantryItem, PantryCategory } from '@/types'
import { groupBy } from '@/lib/utils'

type CategoryFilter = PantryCategory | 'all'

interface UsePantryOptions {
  initialItems: PantryItem[]
}

export function usePantry({ initialItems }: UsePantryOptions) {
  const [items, setItems] = useState<PantryItem[]>(initialItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')

  // ── Filtered items ─────────────────────────────────────────────────────────

  const filteredItems = useMemo(() => {
    let result = items

    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter((item) => item.category === activeCategory)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
      )
    }

    return result
  }, [items, searchQuery, activeCategory])

  // ── Grouped by category ────────────────────────────────────────────────────

  const groupedItems = useMemo(
    () => groupBy(filteredItems, 'category'),
    [filteredItems],
  )

  // ── Category counts ────────────────────────────────────────────────────────

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<CategoryFilter, number>> = {
      all: items.length,
    }
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] ?? 0) + 1
    })
    return counts
  }, [items])

  // ── Expiring items ─────────────────────────────────────────────────────────

  const expiringItems = useMemo(
    () => items.filter((item) => item.status === 'expiring' || item.status === 'use-soon'),
    [items],
  )

  // ── Actions ───────────────────────────────────────────────────────────────

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addItem = useCallback((item: PantryItem) => {
    setItems((prev) => [item, ...prev])
  }, [])

  const updateItem = useCallback((id: string, updates: Partial<PantryItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    )
  }, [])

  return {
    // State
    items,
    filteredItems,
    groupedItems,
    categoryCounts,
    expiringItems,
    searchQuery,
    activeCategory,

    // Setters
    setSearchQuery,
    setActiveCategory,

    // Actions
    deleteItem,
    addItem,
    updateItem,
  }
}
