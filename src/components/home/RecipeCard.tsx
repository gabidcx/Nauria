'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Clock, Flame } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tag } from '@/components/ui/Chip'
import type { Recipe, MealType, DietaryTag } from '@/types'

// ─── FOOD IMAGE PLACEHOLDER ───────────────────────────────────────────────────

function FoodImagePlaceholder({
  gradient,
  cookTime,
  mealType,
  height = 'h-[120px]',
}: {
  gradient: string
  cookTime: number
  mealType: MealType
  height?: string
}) {
  const mealLabels: Record<MealType, string> = {
    breakfast: 'Breakfast',
    lunch:     'Lunch',
    dinner:    'Dinner',
    snack:     'Snack',
  }

  return (
    <div className={cn('relative overflow-hidden', height)}>
      {/* Gradient food visual */}
      <div className={cn('absolute inset-0 bg-gradient-to-br', gradient)} />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Cook time badge */}
      <div className="absolute top-2 right-2 bg-white/90 rounded-pill px-2 py-0.5">
        <span className="text-[10px] font-semibold text-text-primary">
          {cookTime} min
        </span>
      </div>

      {/* Meal type label */}
      <p className="absolute bottom-2 left-3 text-[12px] font-medium text-white">
        {mealLabels[mealType]}
      </p>
    </div>
  )
}

// ─── TAG LABEL MAP ────────────────────────────────────────────────────────────

const TAG_LABELS: Partial<Record<DietaryTag, string>> = {
  'gluten-free':    'GF',
  'lactose-free':   'LF',
  'mediterranean':  'Med',
  'italian':        'Italian',
  'japanese':       'Japanese',
  'high-protein':   'High protein',
  'easy':           'Easy',
  'quick':          'Quick',
  'budget-friendly': 'Budget',
  'no-added-sugar': 'No sugar',
}

// ─── RECIPE CARD (grid variant) ───────────────────────────────────────────────

interface RecipeCardProps {
  recipe: Recipe
  className?: string
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite ?? false)

  const displayTags = recipe.tags.slice(0, 2)

  return (
    <div
      className={cn(
        'group bg-white rounded-lg overflow-hidden',
        'border-[0.5px] border-[rgba(0,0,0,0.08)]',
        'transition-all duration-fast ease-micro',
        'hover:shadow-card-hover',
        'active:scale-[0.98]',
        className,
      )}
    >
      <Link href={`/recipes/${recipe.id}`} className="block">
        <FoodImagePlaceholder
          gradient={recipe.imageGradient ?? 'from-green-mid to-green'}
          cookTime={recipe.cookTimeMinutes}
          mealType={recipe.mealType}
        />
      </Link>

      <div className="p-2.5">
        <Link href={`/recipes/${recipe.id}`}>
          <p className="text-[13px] font-medium text-text-primary leading-snug mb-1 line-clamp-2 hover:text-green transition-colors">
            {recipe.title}
          </p>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {displayTags.map((tag) => (
              <Tag key={tag} variant="green">
                {TAG_LABELS[tag] ?? tag}
              </Tag>
            ))}
          </div>

          {/* Favorite button */}
          <button
            onClick={() => setIsFavorite((p) => !p)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="flex-shrink-0 p-0.5 -mr-0.5 rounded-sm transition-all duration-fast active:scale-90"
          >
            <Heart
              size={16}
              strokeWidth={isFavorite ? 0 : 1.75}
              className={cn(
                'transition-all duration-fast ease-spring',
                isFavorite ? 'fill-green text-green' : 'text-text-tertiary',
              )}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── RECIPE ROW (list / favorites variant) ────────────────────────────────────

interface RecipeRowProps {
  recipe: Recipe
  className?: string
}

export function RecipeRow({ recipe, className }: RecipeRowProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite ?? false)

  return (
    <div
      className={cn(
        'flex gap-3 items-center p-3 bg-white rounded-md',
        'border-[0.5px] border-[rgba(0,0,0,0.08)]',
        'transition-all duration-fast',
        'hover:shadow-card',
        className,
      )}
    >
      {/* Thumbnail */}
      <Link href={`/recipes/${recipe.id}`} className="flex-shrink-0">
        <div
          className={cn(
            'w-14 h-14 rounded-sm overflow-hidden',
            `bg-gradient-to-br ${recipe.imageGradient ?? 'from-green-mid to-green'}`,
          )}
        />
      </Link>

      {/* Content */}
      <Link href={`/recipes/${recipe.id}`} className="flex-1 min-w-0">
        <p className="text-body-md font-medium text-text-primary truncate">
          {recipe.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-caption text-text-tertiary capitalize">
            {recipe.mealType}
          </span>
          <span className="text-text-disabled text-caption">·</span>
          <div className="flex items-center gap-1 text-caption text-text-tertiary">
            <Clock size={11} strokeWidth={1.75} />
            {recipe.cookTimeMinutes} min
          </div>
        </div>
      </Link>

      {/* Favorite */}
      <button
        onClick={() => setIsFavorite((p) => !p)}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className="flex-shrink-0 p-1.5 -mr-1 transition-all duration-fast active:scale-90"
      >
        <Heart
          size={18}
          strokeWidth={isFavorite ? 0 : 1.75}
          className={cn(
            'transition-all duration-fast ease-spring',
            isFavorite ? 'fill-green text-green' : 'text-text-tertiary',
          )}
        />
      </button>
    </div>
  )
}

// ─── SUGGESTED RECIPES ROW (horizontal scroll) ────────────────────────────────

interface SuggestedRecipesRowProps {
  recipes: Recipe[]
  className?: string
}

export function SuggestedRecipesRow({ recipes, className }: SuggestedRecipesRowProps) {
  return (
    <div
      className={cn(
        'flex gap-3 overflow-x-auto pb-1',
        'scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]',
        '[&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {recipes.map((recipe) => (
        <div key={recipe.id} className="flex-shrink-0 w-[175px]">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  )
}
