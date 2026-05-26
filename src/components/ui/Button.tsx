import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ─── VARIANTS ────────────────────────────────────────────────────────────────

const variants = {
  primary: [
    'bg-green text-white border-transparent',
    'hover:bg-green-dark',
    'active:scale-[0.97] active:opacity-90',
    'shadow-none',
  ].join(' '),

  secondary: [
    'bg-cream-2 text-text-primary border-[rgba(0,0,0,0.12)]',
    'hover:bg-cream-3',
    'active:scale-[0.97]',
  ].join(' '),

  ghost: [
    'bg-transparent text-text-secondary border-[rgba(0,0,0,0.12)]',
    'hover:bg-cream-2',
    'active:scale-[0.97]',
  ].join(' '),

  danger: [
    'bg-nauria-danger-light text-nauria-danger border-[rgba(179,58,58,0.2)]',
    'hover:bg-[#f8d8d6]',
    'active:scale-[0.97]',
  ].join(' '),
}

const sizes = {
  lg: 'h-14 px-6 text-[15px] font-medium rounded-md',
  md: 'h-12 px-5 text-[14px] font-medium rounded-md',
  sm: 'h-9 px-4 text-[12px] font-medium rounded-sm',
  icon: 'h-10 w-10 rounded-sm flex-shrink-0',
}

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base
          'inline-flex items-center justify-center gap-2',
          'border-[0.5px] outline-none',
          'transition-all duration-fast ease-micro',
          'select-none cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          // Variant
          variants[variant],
          // Size
          sizes[size],
          // Full width
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
