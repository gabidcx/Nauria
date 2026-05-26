'use client'

import { useState } from 'react'
import { Plus, AlertTriangle, SlidersHorizontal } from 'lucide-react'
import { TabHeader } from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'
import SearchBar from '@/components/ui/SearchBar'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { PantryCategoryGroup } from '@/components/pantry/PantryItemRow'
import PantryFilterBar from '@/components/pantry/PantryFilterBar'
import ExpiringSoonCard from '@/components/pantry/ExpiringSoonCard'
import { usePantry } from '@/hooks/usePantry'
import { MOCK_PANTRY_ITEMS } from '@/data/mock'
import type { PantryCategory } from '@/types'

export default function PantryPage() {
  const {
    filteredItems,
    groupedItems,
    categoryCounts,
    expiringItems,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
    deleteItem,
  } = usePantry({ initialItems: MOCK_PANTRY_ITEMS })

  const hasItems = filteredItems.length > 0
  const isFiltered = searchQuery.trim() !== '' || activeCategory !== 'all'

  return (
    <>
      {/* Header */}
      <TabHeader
        title="My Pantry"
        right={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={14} strokeWidth={2.5} />}
            className="gap-1"
          >
            Add
          </Button>
        }
      />

      <main className="screen-content px-screen">

        {/* ── Search bar ── */}
        <div className="pt-4 mb-3">
          <SearchBar
            placeholder="Search pantry items..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* ── Category filters ── */}
        <div className="mb-4">
          <PantryFilterBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* ── Expiring alert (only when not filtered) ── */}
        {!isFiltered && expiringItems.length > 0 && (
          <div className="mb-5">
            <ExpiringSoonCard items={expiringItems} />
          </div>
        )}

        {/* ── Items by category ── */}
        {hasItems ? (
          <div>
            {Object.entries(groupedItems).map(([category, items]) => (
              <PantryCategoryGroup
                key={category}
                categoryKey={category}
                items={items}
                onDeleteItem={deleteItem}
              />
            ))}
          </div>
        ) : (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            {isFiltered ? (
              <EmptyState
                emoji="🔍"
                title="No items found"
                description={
                  searchQuery
                    ? `No pantry items match "${searchQuery}"`
                    : `No items in this category yet`
                }
                action={{
                  label: 'Clear filters',
                  onClick: () => {
                    setSearchQuery('')
                    setActiveCategory('all')
                  },
                }}
              />
            ) : (
              <EmptyState
                emoji="🧺"
                title="Your pantry is empty"
                description="Start adding ingredients to track what you have and reduce food waste."
                action={{
                  label: '+ Add first item',
                  onClick: () => {},
                }}
              />
            )}
          </div>
        )}

        {/* ── Stats footer ── */}
        {hasItems && !isFiltered && (
          <div className="mt-4 pt-4 border-t-[0.5px] border-[rgba(0,0,0,0.08)] text-center">
            <p className="text-caption text-text-tertiary">
              {filteredItems.length} items in your pantry
              {expiringItems.length > 0 && (
                <> · <span className="text-nauria-amber">{expiringItems.length} expiring soon</span></>
              )}
            </p>
          </div>
        )}

      </main>

      {/* Bottom nav */}
      <BottomNav />
    </>
  )
}
