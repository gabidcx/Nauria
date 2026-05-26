'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Sparkles,
  Clock,
  ChefHat,
  Heart,
  Check,
  Flame,
  ShoppingCart,
} from 'lucide-react'

// ── MOCK PANTRY INGREDIENTS ───────────────────────────────────────────────────

const PANTRY_INGREDIENTS = [
  { id: 'p1',  name: 'Baby Spinach',     emoji: '🥬' },
  { id: 'p2',  name: 'Zucchini',         emoji: '🥒' },
  { id: 'p3',  name: 'Cherry Tomatoes',  emoji: '🍅' },
  { id: 'p4',  name: 'Eggs',             emoji: '🥚' },
  { id: 'p5',  name: 'Salmon Fillet',    emoji: '🐟' },
  { id: 'p6',  name: 'Chickpeas',        emoji: '🫙' },
  { id: 'p7',  name: 'Arborio Rice',     emoji: '🍚' },
  { id: 'p8',  name: 'Olive Oil',        emoji: '🫒' },
  { id: 'p9',  name: 'Lemon',            emoji: '🍋' },
  { id: 'p10', name: 'Miso Paste',       emoji: '🧂' },
  { id: 'p11', name: 'Oat Milk',         emoji: '🥛' },
  { id: 'p12', name: 'Avocado',          emoji: '🥑' },
]

// ── MOCK RECIPE RESULT ────────────────────────────────────────────────────────

const MOCK_RECIPE = {
  name: 'Salmon & Zucchini Risotto',
  description:
    'A silky, nourishing risotto with flaked salmon, tender zucchini, and a bright finish of lemon. Ready in under 40 minutes with ingredients from your pantry.',
  prepTime: 10,
  cookTime: 28,
  difficulty: 'Medium' as const,
  servings: 2,
  usedFromPantry: ['Salmon Fillet', 'Arborio Rice', 'Zucchini', 'Olive Oil', 'Lemon'],
  missingIngredients: ['Vegetable stock (750 ml)', 'Fresh parsley (small bunch)'],
  steps: [
    'Bring the vegetable stock to a gentle simmer in a small saucepan and keep warm over low heat.',
    'Warm 2 tbsp olive oil in a wide pan over medium heat. Add the diced zucchini and sauté for 4 minutes until lightly golden. Set aside.',
    'In the same pan, toast the arborio rice for 2 minutes, stirring constantly, until the edges turn translucent.',
    'Add a ladleful of warm stock to the rice. Stir steadily until absorbed. Continue adding stock one ladleful at a time, stirring, for about 18 minutes until the rice is al dente and creamy.',
    'Season the salmon fillet with salt and a squeeze of lemon. Cook in a separate pan with a little olive oil for 3 minutes per side. Flake into large pieces.',
    'Fold the zucchini and flaked salmon into the risotto. Squeeze over the remaining lemon juice and season to taste.',
    'Serve immediately, topped with fresh parsley and a drizzle of olive oil.',
  ],
  tags: ['Gluten-free', 'High protein', 'Mediterranean'],
}

// ── SMALL COMPONENTS ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9a9a8c] mb-3">
      {children}
    </p>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#e8f0ea] text-[#3a6b47] text-[11px] font-medium">
      {children}
    </span>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function AIRecipePage() {
  const router = useRouter()

  const [selectedIds, setSelectedIds]   = useState<string[]>(['p1', 'p2', 'p5', 'p6', 'p7', 'p8', 'p9'])
  const [generating, setGenerating]     = useState(false)
  const [showResult, setShowResult]     = useState(false)
  const [saved, setSaved]               = useState(false)
  const [progress, setProgress]         = useState(0)

  // ── Toggle ingredient selection ──────────────────────────────────────────

  function toggleIngredient(id: string) {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
    // Reset result if they change ingredients after generating
    if (showResult) {
      setShowResult(false)
      setSaved(false)
    }
  }

  // ── Mock generation with animated progress ───────────────────────────────

  function handleGenerate() {
    if (selectedIds.length === 0) return
    setGenerating(true)
    setShowResult(false)
    setSaved(false)
    setProgress(0)

    // Animate progress bar across 2.4 seconds
    const steps = [15, 35, 55, 72, 88, 100]
    steps.forEach((target, i) => {
      setTimeout(() => setProgress(target), i * 400)
    })

    setTimeout(() => {
      setGenerating(false)
      setShowResult(true)
      setProgress(0)
    }, 2600)
  }

  // ── Save recipe mock ─────────────────────────────────────────────────────

  function handleSave() {
    setSaved(true)
  }

  // ── How many selected ────────────────────────────────────────────────────

  const selectedCount = selectedIds.length

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#faf9f6]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 flex items-center gap-3 h-14 px-6 bg-[#faf9f6] border-b border-[rgba(0,0,0,0.06)]">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-[#f5f2ec] flex items-center justify-center text-[#1a1a18] transition-all active:scale-90"
          aria-label="Go back"
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>

        <div className="flex-1">
          <p
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-xl font-medium text-[#1a1a18] leading-tight"
          >
            AI Recipe Ideas
          </p>
          <p className="text-[11px] text-[#9a9a8c]">Powered by your pantry</p>
        </div>

        <div className="w-8 h-8 rounded-full bg-[#f0e8f8] flex items-center justify-center">
          <Sparkles size={16} className="text-[#7a4aaa]" strokeWidth={1.75} />
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="px-6 pt-5 pb-10 max-w-lg mx-auto">

        {/* ── Intro card ── */}
        <div className="bg-gradient-to-br from-[#3a6b47] to-[#2a4e38] rounded-2xl p-5 mb-6">
          <p
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-2xl font-light text-white leading-snug mb-1"
          >
            What's in your kitchen?
          </p>
          <p className="text-[13px] text-white/65 leading-relaxed">
            Select the ingredients you have and Nauria will generate a beautiful recipe
            just for you — using only what you already own.
          </p>
        </div>

        {/* ── Ingredient selector ── */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Your pantry ingredients</SectionLabel>
            <span className="text-[12px] text-[#3a6b47] font-medium">
              {selectedCount} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {PANTRY_INGREDIENTS.map(ing => {
              const active = selectedIds.includes(ing.id)
              return (
                <button
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-medium border transition-all active:scale-95 ${
                    active
                      ? 'bg-[#3a6b47] text-white border-transparent'
                      : 'bg-white text-[#5a5a52] border-[rgba(0,0,0,0.10)] hover:border-[#3a6b47]'
                  }`}
                >
                  <span>{ing.emoji}</span>
                  {ing.name}
                </button>
              )
            })}
          </div>

          {selectedCount === 0 && (
            <p className="text-[13px] text-[#b33a3a] mt-3">
              Select at least one ingredient to generate a recipe.
            </p>
          )}
        </div>

        {/* ── Generate button ── */}
        {!generating && (
          <button
            onClick={handleGenerate}
            disabled={selectedCount === 0}
            className="w-full h-13 py-3.5 rounded-xl bg-gradient-to-r from-[#3a6b47] to-[#2a4e38] text-white text-[15px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed mb-6"
          >
            <Sparkles size={18} strokeWidth={1.75} />
            {showResult ? 'Generate another recipe' : 'Generate recipe'}
          </button>
        )}

        {/* ── Generating state ── */}
        {generating && (
          <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#f0e8f8] flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} className="text-[#7a4aaa]" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#1a1a18]">
                  Creating your recipe…
                </p>
                <p className="text-[12px] text-[#9a9a8c]">
                  Analysing {selectedCount} ingredients
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full bg-[#ede9e0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3a6b47] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-[11px] text-[#9a9a8c]">Thinking…</span>
              <span className="text-[11px] text-[#9a9a8c] font-medium">{progress}%</span>
            </div>
          </div>
        )}

        {/* ── Recipe result ── */}
        {showResult && (
          <div className="animate-[fadeUp_0.35s_cubic-bezier(0.4,0,0.2,1)_both]">

            {/* Result header card */}
            <div className="bg-gradient-to-br from-[#4a7a5a] to-[#2a4e38] rounded-2xl p-5 mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/55 mb-1.5">
                Generated for you
              </p>
              <p
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-[1.6rem] font-medium text-white leading-tight mb-2"
              >
                {MOCK_RECIPE.name}
              </p>
              <p className="text-[13px] text-white/70 leading-relaxed mb-4">
                {MOCK_RECIPE.description}
              </p>

              {/* Stats row */}
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-white/80">
                  <Clock size={14} strokeWidth={1.75} />
                  <span className="text-[12px]">Prep {MOCK_RECIPE.prepTime} min</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80">
                  <Flame size={14} strokeWidth={1.75} />
                  <span className="text-[12px]">Cook {MOCK_RECIPE.cookTime} min</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80">
                  <ChefHat size={14} strokeWidth={1.75} />
                  <span className="text-[12px]">{MOCK_RECIPE.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-5">
              {MOCK_RECIPE.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#f0e8f8] text-[#7a4aaa] text-[11px] font-medium">
                ✨ AI Generated
              </span>
            </div>

            {/* Pantry match card */}
            <div className="bg-[#e8f0ea] border border-[#b8d4be] rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat size={16} className="text-[#3a6b47]" strokeWidth={1.75} />
                <p className="text-[13px] font-semibold text-[#3a6b47]">
                  Pantry match — {MOCK_RECIPE.usedFromPantry.length} of{' '}
                  {MOCK_RECIPE.usedFromPantry.length + MOCK_RECIPE.missingIngredients.length} ingredients
                </p>
              </div>
              <p className="text-[13px] text-[#5a5a52] leading-relaxed">
                {MOCK_RECIPE.usedFromPantry.join(', ')}
              </p>
            </div>

            {/* Missing ingredients */}
            {MOCK_RECIPE.missingIngredients.length > 0 && (
              <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-4 mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingCart size={16} className="text-[#a06a10]" strokeWidth={1.75} />
                  <p className="text-[13px] font-semibold text-[#a06a10]">
                    You'll need to buy
                  </p>
                </div>
                <ul className="space-y-1">
                  {MOCK_RECIPE.missingIngredients.map(item => (
                    <li key={item} className="text-[13px] text-[#5a5a52] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#a06a10] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step-by-step instructions */}
            <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-5 mb-5">
              <SectionLabel>Instructions</SectionLabel>
              <ol className="space-y-5">
                {MOCK_RECIPE.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    {/* Step number */}
                    <div className="w-7 h-7 rounded-full bg-[#3a6b47] text-white text-[13px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    {/* Step text */}
                    <p className="text-[14px] text-[#5a5a52] leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Servings note */}
            <p className="text-center text-[12px] text-[#9a9a8c] mb-6">
              Recipe serves {MOCK_RECIPE.servings} · Scale as needed
            </p>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saved}
              className={`w-full h-13 py-3.5 rounded-xl text-[15px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.97] mb-3 ${
                saved
                  ? 'bg-[#e8f0ea] text-[#3a6b47] cursor-default'
                  : 'bg-[#3a6b47] text-white'
              }`}
            >
              {saved ? (
                <>
                  <Check size={18} strokeWidth={2} />
                  Saved to your recipes
                </>
              ) : (
                <>
                  <Heart size={18} strokeWidth={1.75} />
                  Save this recipe
                </>
              )}
            </button>

            {/* Generate another */}
            <button
              onClick={handleGenerate}
              className="w-full h-12 rounded-xl border border-[rgba(0,0,0,0.10)] bg-white text-[#5a5a52] text-[14px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
            >
              <Sparkles size={16} className="text-[#7a4aaa]" strokeWidth={1.75} />
              Generate a different recipe
            </button>

          </div>
        )}

        {/* ── Empty prompt (before first generation) ── */}
        {!showResult && !generating && (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#f0e8f8] flex items-center justify-center mb-4">
              <Sparkles size={28} className="text-[#7a4aaa]" strokeWidth={1.5} />
            </div>
            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-xl font-medium text-[#1a1a18] mb-2"
            >
              Ready when you are
            </p>
            <p className="text-[13px] text-[#9a9a8c] max-w-[240px] leading-relaxed">
              Select your ingredients above and press Generate to see a personalised recipe.
            </p>
          </div>
        )}

      </main>

      {/* Fade-up animation */}
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}