'use client'

import { Search, X } from 'lucide-react'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  className?: string
  autoFocus?: boolean
}

export default function SearchBar({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onClear,
  className,
  autoFocus = false,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const hasValue = value.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (controlledValue === undefined) setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    if (controlledValue === undefined) setInternalValue('')
    onChange?.('')
    onClear?.()
    inputRef.current?.focus()
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3',
        'bg-white border-[0.5px] border-[rgba(0,0,0,0.12)] rounded-md',
        'px-4 py-[11px]',
        'transition-colors duration-fast',
        'focus-within:border-green',
        className,
      )}
    >
      <Search
        size={18}
        className="flex-shrink-0 text-text-tertiary"
        strokeWidth={1.75}
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          'flex-1 bg-transparent outline-none',
          'text-[15px] text-text-primary placeholder:text-text-tertiary',
          'font-body',
          // Remove default search input styling
          '[&::-webkit-search-cancel-button]:hidden',
          '[&::-webkit-search-decoration]:hidden',
        )}
      />
      {hasValue && (
        <button
          onClick={handleClear}
          className={cn(
            'flex-shrink-0 h-5 w-5 rounded-full',
            'bg-text-tertiary/20 text-text-tertiary',
            'flex items-center justify-center',
            'transition-opacity duration-fast hover:opacity-70',
            'active:scale-90',
          )}
          aria-label="Clear search"
        >
          <X size={11} strokeWidth={2.5} />
        </button>
      )}
    </div>
  )
}
