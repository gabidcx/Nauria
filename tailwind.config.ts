import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ── COLORS ──────────────────────────────────────────────
      colors: {
        // Brand greens
        green: {
          DEFAULT: '#3a6b47',
          dark: '#2a4e38',
          mid: '#b8d4be',
          light: '#e8f0ea',
          sage: '#7aab85',
        },
        // Cream surfaces
        cream: {
          DEFAULT: '#faf9f6',
          '2': '#f5f2ec',
          '3': '#ede9e0',
        },
        // Text hierarchy
        text: {
          primary: '#1a1a18',
          secondary: '#5a5a52',
          tertiary: '#9a9a8c',
          disabled: '#c4c4b8',
        },
        // Semantic
        nauria: {
          blue: '#4a7fa8',
          'blue-light': '#e8f2f8',
          amber: '#a06a10',
          'amber-light': '#fff4e3',
          danger: '#b33a3a',
          'danger-light': '#fdecea',
          purple: '#7a4aaa',
          'purple-light': '#f0e8f8',
        },
        // Dark mode surfaces
        dark: {
          bg: '#1c1c1a',
          '2': '#252520',
          '3': '#2e2e28',
          card: '#252520',
        },
      },

      // ── TYPOGRAPHY ───────────────────────────────────────────
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['2.375rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['1.375rem', { lineHeight: '1.2' }],
        'body-lg': ['1rem', { lineHeight: '1.7' }],
        'body-md': ['0.875rem', { lineHeight: '1.6' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.55' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
        'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'nav': ['0.625rem', { lineHeight: '1.2', letterSpacing: '0.02em' }],
      },

      // ── BORDER RADIUS ────────────────────────────────────────
      borderRadius: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '20px',
        xl: '28px',
        pill: '100px',
      },

      // ── SPACING ──────────────────────────────────────────────
      spacing: {
        'screen-x': '24px',
        'nav-h': '82px',
        'header-h': '44px',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },

      // ── SHADOWS ──────────────────────────────────────────────
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.05), 0 0 0 0.5px rgba(0,0,0,0.07)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.07)',
        'fab': '0 4px 20px rgba(58,107,71,0.35)',
        'modal': '0 16px 48px rgba(0,0,0,0.14)',
        'nav': '0 -0.5px 0 rgba(0,0,0,0.08)',
      },

      // ── ANIMATION ────────────────────────────────────────────
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'micro': 'cubic-bezier(0.2, 0, 0, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'shimmer': 'shimmer 1.5s linear infinite',
        'fade-up': 'fade-up 0.3s cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in': 'fade-in 0.2s ease both',
        'slide-up': 'slide-up 0.35s cubic-bezier(0.4, 0, 0.2, 1) both',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
