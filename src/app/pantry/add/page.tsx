'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'

// ── TYPES ──────────────────────────────────────────────────────────────────

type Category =
  | 'vegetables'
  | 'fruits'
  | 'proteins'
  | 'grains'
  | 'dairy-alternatives'
  | 'canned'
  | 'condiments'
  | 'snacks'
  | 'baking'
  | 'other'

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'vegetables',         label: 'Vegetables',        emoji: '🥬' },
  { value: 'fruits',             label: 'Fruits',            emoji: '🍎' },
  { value: 'proteins',           label: 'Proteins',          emoji: '🥩' },
  { value: 'grains',             label: 'Grains',            emoji: '🌾' },
  { value: 'dairy-alternatives', label: 'Dairy alternatives',emoji: '🥛' },
  { value: 'canned',             label: 'Canned goods',      emoji: '🫙' },
  { value: 'condiments',         label: 'Condiments',        emoji: '🫒' },
  { value: 'snacks',             label: 'Snacks',            emoji: '🍿' },
  { value: 'baking',             label: 'Baking',            emoji: '🧁' },
  { value: 'other',              label: 'Other',             emoji: '📦' },
]

const UNITS = ['g', 'kg', 'ml', 'l', 'pcs', 'loaf', 'can', 'tbsp', 'tsp', 'cup']

// ── HELPERS ────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0]
}

function inDays(n: number) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

// ── SHARED INPUT STYLES ────────────────────────────────────────────────────

const inputClass =
  'w-full bg-white border border-[rgba(0,0,0,0.12)] rounded-xl px-4 py-3 text-[15px] text-[#1a1a18] placeholder-[#9a9a8c] outline-none transition-colors focus:border-[#3a6b47]'

const labelClass =
  'block text-[11px] font-semibold uppercase tracking-widest text-[#9a9a8c] mb-1.5'

// ── PAGE ───────────────────────────────────────────────────────────────────

export default function AddPantryItemPage() {
  const router = useRouter()

  // Form state
  const [name, setName]           = useState('')
  const [category, setCategory]   = useState<Category>('vegetables')
  const [quantity, setQuantity]   = useState('')
  const [unit, setUnit]           = useState('g')
  const [purchaseDate, setPurchase] = useState(today())
  const [expiryDate, setExpiry]   = useState(inDays(7))
  const [notes, setNotes]         = useState('')

  // UI state
  const [errors, setErrors]       = useState<Record<string, string>>({})
  const [saved, setSaved]         = useState(false)
  const [saving, setSaving]       = useState(false)

  // ── Validation ────────────────────────────────────────────────────────

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim())         e.name     = 'Item name is required'
    if (!quantity.trim())     e.quantity = 'Quantity is required'
    if (isNaN(Number(quantity)) || Number(quantity) <= 0)
                              e.quantity = 'Enter a valid number'
    if (!expiryDate)          e.expiry   = 'Expiry date is required'
    if (expiryDate < purchaseDate)
                              e.expiry   = 'Expiry must be after purchase date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Submit ────────────────────────────────────────────────────────────

  function handleSave() {
    if (!validate()) return
    setSaving(true)

    // Mock: wait 600ms then show success
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      // Redirect back to pantry after 1.2s
      setTimeout(() => router.push('/pantry'), 1200)
    }, 600)
  }

  // ── Success screen ────────────────────────────────────────────────────

  if (saved) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-16 h-16 rounded-full bg-[#e8f0ea] flex items-center justify-center">
          <Check size={28} className="text-[#3a6b47]" strokeWidth={2} />
        </div>
        <p
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-2xl font-medium text-[#1a1a18]"
        >
          Item added
        </p>
        <p className="text-sm text-[#9a9a8c]">Returning to pantry…</p>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#faf9f6]">

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center gap-3 h-14 px-6 bg-[#faf9f6] border-b border-[rgba(0,0,0,0.06)]">
        <button
          onClick={() => router.push('/pantry')}
          className="w-9 h-9 rounded-xl bg-[#f5f2ec] flex items-center justify-center text-[#1a1a18] transition-all active:scale-90"
          aria-label="Go back"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>
        <p
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-xl font-medium text-[#1a1a18]"
        >
          Add pantry item
        </p>
      </header>

      {/* Form body */}
      <main className="px-6 pt-6 pb-32 max-w-lg mx-auto">

        {/* Item name */}
        <div className="mb-5">
          <label className={labelClass}>Item name</label>
          <input
            className={inputClass}
            placeholder="e.g. Baby Spinach"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-xs text-[#b33a3a] mt-1">{errors.name}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-5">
          <label className={labelClass}>Category</label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all active:scale-95 ${
                  category === c.value
                    ? 'bg-[#3a6b47] text-white border-transparent'
                    : 'bg-white text-[#5a5a52] border-[rgba(0,0,0,0.10)] hover:border-[#3a6b47]'
                }`}
              >
                <span>{c.emoji}</span>
                <span className="truncate">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Unit */}
        <div className="mb-5">
          <label className={labelClass}>Quantity</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                className={inputClass}
                placeholder="200"
                type="number"
                min="0"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
            <select
              value={unit}
              onChange={e => setUnit(e.target.value)}
              className="bg-white border border-[rgba(0,0,0,0.12)] rounded-xl px-3 py-3 text-[15px] text-[#1a1a18] outline-none focus:border-[#3a6b47]"
            >
              {UNITS.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          {errors.quantity && (
            <p className="text-xs text-[#b33a3a] mt-1">{errors.quantity}</p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div>
            <label className={labelClass}>Purchase date</label>
            <input
              type="date"
              className={inputClass}
              value={purchaseDate}
              onChange={e => setPurchase(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Expiry date</label>
            <input
              type="date"
              className={inputClass}
              value={expiryDate}
              onChange={e => setExpiry(e.target.value)}
            />
            {errors.expiry && (
              <p className="text-xs text-[#b33a3a] mt-1">{errors.expiry}</p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <label className={labelClass}>Notes <span className="normal-case text-[10px]">(optional)</span></label>
          <textarea
            className={`${inputClass} resize-none`}
            placeholder="e.g. organic, from the farmers market…"
            rows={3}
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

      </main>

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-[#faf9f6] border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={() => router.push('/pantry')}
            className="flex-1 h-12 rounded-xl border border-[rgba(0,0,0,0.12)] bg-white text-[#5a5a52] text-[15px] font-medium transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-12 rounded-xl bg-[#3a6b47] text-white text-[15px] font-medium transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              'Save item'
            )}
          </button>
        </div>
      </div>

    </div>
  )
}