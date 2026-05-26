import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Pantry',
  description: 'Manage your pantry items, track expiry dates, and reduce food waste.',
}

export default function PantryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
