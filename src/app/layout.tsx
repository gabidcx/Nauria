import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

// ─── FONTS ────────────────────────────────────────────────────────────────────

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap'
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'Nauria',
    template: '%s · Nauria',
  },
  description: 'Your calm kitchen companion. Track pantry, manage budgets, plan meals.',
  keywords: ['pantry', 'recipes', 'meal planning', 'grocery', 'budget', 'food'],
  authors: [{ name: 'Nauria' }],
  creator: 'Nauria',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nauria',
  },
  openGraph: {
    type: 'website',
    title: 'Nauria',
    description: 'Your calm kitchen companion',
    siteName: 'Nauria',
  },
  icons: {
  icon: '/icons/icon.svg',
  apple: '/icons/icon.svg',
},
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3a6b47',
  viewportFit: 'cover',
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
       <link rel="apple-touch-icon" href="/icons/icon.svg" />
      </head>
      <body className="font-body bg-cream text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
