import type { Metadata } from 'next'
import Link from 'next/link'
import { PieChart } from 'lucide-react'
import { TabHeader } from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'

export const metadata: Metadata = { title: 'Budget' }

export default function BudgetPage() {
  return (
    <>
      <TabHeader title="Budget" />
      <main className="screen-content px-screen flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-lg bg-green-light flex items-center justify-center mb-4">
          <PieChart size={32} className="text-green" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-display-sm font-medium text-text-primary mb-2">
          Budget coming next
        </h2>
        <p className="text-body-sm text-text-tertiary text-center max-w-[240px]">
          Full budget tracking screen is part of Phase 1 build.
        </p>
        <Link href="/app-home" className="mt-6 text-body-sm text-green font-medium hover:opacity-70 transition-opacity">
          ← Back to home
        </Link>
      </main>
      <BottomNav />
    </>
  )
}
