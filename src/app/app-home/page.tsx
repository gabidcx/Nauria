import type { Metadata } from 'next'
import Link from 'next/link'
import { Bell, User, ChevronRight, Sparkles } from 'lucide-react'
import { HomeHeader } from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'
import FloatingActionButton from '@/components/layout/FloatingActionButton'
import BudgetHeroCard from '@/components/home/BudgetHeroCard'
import QuickActionsGrid from '@/components/home/QuickActionsGrid'
import { SuggestedRecipesRow, RecipeRow } from '@/components/home/RecipeCard'
import ExpiringSoonCard from '@/components/pantry/ExpiringSoonCard'
import { SectionHeader } from '@/components/shared/SectionLabel'
import {
  MOCK_BUDGET_MONTH,
  MOCK_TOTAL_SPENT,
  MOCK_RECIPES,
  MOCK_EXPIRING_ITEMS,
  MOCK_FAVORITE_RECIPES,
  MOCK_QUICK_ACTIONS,
  MOCK_PANTRY_ITEMS,
} from '@/data/mock'

export const metadata: Metadata = {
  title: 'Home',
}

// ─── PANTRY SUMMARY CARD ──────────────────────────────────────────────────────

function PantrySummaryCard() {
  const total = MOCK_PANTRY_ITEMS.length
  const expiring = MOCK_EXPIRING_ITEMS.length

  return (
    <Link
      href="/pantry"
      className="flex items-center gap-3.5 p-4 bg-white rounded-lg border-[0.5px] border-[rgba(0,0,0,0.08)] transition-all duration-fast hover:shadow-card-hover active:scale-[0.98]"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-sm bg-green-light flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">🧺</span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-body-md font-medium text-text-primary">My Pantry</p>
        <p className="text-body-sm text-text-tertiary mt-0.5">
          {total} items
          {expiring > 0 && (
            <span className="text-nauria-danger"> · {expiring} expiring soon</span>
          )}
        </p>
      </div>

      <ChevronRight size={18} className="text-text-tertiary flex-shrink-0" strokeWidth={1.75} />
    </Link>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const suggested = MOCK_RECIPES.slice(0, 4)
  const favorites = MOCK_FAVORITE_RECIPES.slice(0, 3)

  return (
    <>
      {/* Header */}
      <HomeHeader
        right={
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <Link
              href="/notifications"
              className="relative w-9 h-9 flex items-center justify-center rounded-sm text-text-secondary hover:bg-cream-2 transition-colors duration-fast"
              aria-label="Notifications"
            >
              <Bell size={22} strokeWidth={1.75} />
              {/* Unread dot */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e05050] border-2 border-cream" />
            </Link>

            {/* Avatar */}
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full bg-green-light border-[0.5px] border-green-mid flex items-center justify-center"
              aria-label="Profile"
            >
              <User size={16} className="text-green" strokeWidth={1.75} />
            </Link>
          </div>
        }
      />

      {/* Main scrollable content */}
      <main className="screen-content px-screen">

        {/* ── Welcome ── */}
        <div className="pt-5 mb-5">
          <p className="text-caption text-text-tertiary mb-0.5">Good morning,</p>
          <h1 className="font-display text-[2rem] font-medium text-text-primary leading-none">
            Giulia{' '}
            <span className="text-green italic font-light">✦</span>
          </h1>
        </div>

        {/* ── Budget hero ── */}
        <section className="mb-4">
          <BudgetHeroCard
            totalBudget={MOCK_BUDGET_MONTH.totalBudget}
            spent={MOCK_TOTAL_SPENT}
            currency={MOCK_BUDGET_MONTH.currency}
            month="May"
            daysRemaining={21}
          />
        </section>

        {/* ── Expiring soon alert ── */}
        {MOCK_EXPIRING_ITEMS.length > 0 && (
          <section className="mb-4">
            <ExpiringSoonCard items={MOCK_EXPIRING_ITEMS} />
          </section>
        )}

        {/* ── Pantry overview ── */}
        <section className="mb-5">
          <PantrySummaryCard />
        </section>

        {/* ── Quick actions ── */}
        <section className="mb-6">
          <SectionHeader label="Quick actions" className="mb-3" />
          <QuickActionsGrid actions={MOCK_QUICK_ACTIONS} />
        </section>

        {/* ── Suggested recipes ── */}
        <section className="mb-6">
          <SectionHeader
            label="Suggested for you"
            seeAllHref="/recipes"
            className="mb-3"
          />
          <SuggestedRecipesRow recipes={suggested} />
        </section>

        {/* ── Favorites ── */}
        {favorites.length > 0 && (
          <section className="mb-6">
            <SectionHeader
              label="Your favorites"
              seeAllHref="/favorites"
              className="mb-3"
            />
            <div className="flex flex-col gap-2">
              {favorites.map((recipe) => (
                <RecipeRow key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* ── AI banner ── */}
        <section className="mb-6">
          <Link
            href="/ai-recipe"
            className="flex items-center gap-3.5 p-4 bg-green rounded-lg transition-all duration-fast hover:bg-green-dark active:scale-[0.98]"
          >
            <div className="w-11 h-11 rounded-sm bg-white/15 flex items-center justify-center flex-shrink-0">
              <Sparkles size={22} className="text-white" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-md font-medium text-white">AI Recipe Ideas</p>
              <p className="text-caption text-white/70 mt-0.5">
                Generate recipes from your pantry
              </p>
            </div>
            <ChevronRight size={18} className="text-white/60 flex-shrink-0" strokeWidth={1.75} />
          </Link>
        </section>

      </main>

      {/* Bottom nav */}
      <BottomNav />

      {/* FAB */}
      <FloatingActionButton />
    </>
  )
}
