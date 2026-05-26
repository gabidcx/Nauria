// ─── PANTRY TYPES ───────────────────────────────────────────────────────────

export type PantryCategory =
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

export type PantryItemStatus = 'fresh' | 'use-soon' | 'expiring' | 'expired'

export interface PantryItem {
  id: string
  name: string
  quantity: number
  unit: string
  category: PantryCategory
  purchaseDate: string    // ISO date string
  expiryDate: string      // ISO date string
  status: PantryItemStatus
  emoji?: string
}

// ─── RECIPE TYPES ────────────────────────────────────────────────────────────

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'
export type Difficulty = 'easy' | 'medium' | 'hard'

export type DietaryTag =
  | 'gluten-free'
  | 'lactose-free'
  | 'no-added-sugar'
  | 'mediterranean'
  | 'italian'
  | 'japanese'
  | 'high-protein'
  | 'hypothyroidism-friendly'
  | 'quick'
  | 'easy'
  | 'budget-friendly'

export interface Recipe {
  id: string
  title: string
  description: string
  mealType: MealType
  cookTimeMinutes: number
  difficulty: Difficulty
  servings: number
  tags: DietaryTag[]
  imageGradient?: string   // Tailwind gradient class for placeholder
  isFavorite?: boolean
  isAiGenerated?: boolean
  pantryMatchCount?: number
  totalIngredients?: number
}

// ─── BUDGET TYPES ────────────────────────────────────────────────────────────

export type SpendingCategory =
  | 'vegetables-fruits'
  | 'proteins'
  | 'grains-pantry'
  | 'dairy-alternatives'
  | 'other'

export interface BudgetMonth {
  id: string
  month: string           // 'YYYY-MM'
  totalBudget: number
  currency: 'EUR' | 'USD'
}

export interface SpendingEntry {
  id: string
  amount: number
  storeName: string
  date: string            // ISO date string
  category: SpendingCategory
  budgetMonthId: string
}

// ─── PLANNER TYPES ───────────────────────────────────────────────────────────

export interface PlannerEntry {
  id: string
  recipeId: string
  date: string            // ISO date string 'YYYY-MM-DD'
  mealType: MealType
}

// ─── USER TYPES ──────────────────────────────────────────────────────────────

export interface UserPreferences {
  id: string
  dietaryFilters: DietaryTag[]
  language: 'en' | 'es'
  currency: 'EUR' | 'USD'
  notificationsEnabled: boolean
  darkMode: boolean
}

// ─── NAVIGATION TYPES ────────────────────────────────────────────────────────

export interface NavItem {
  href: string
  label: string
  icon: string            // lucide icon name
}

// ─── QUICK ACTION TYPES ──────────────────────────────────────────────────────

export interface QuickAction {
  id: string
  label: string
  subtitle: string
  icon: string
  href: string
  colorClass: string      // Tailwind bg class
  iconColorClass: string  // Tailwind text class
}

// ─── UTILITY TYPES ───────────────────────────────────────────────────────────

export type ClassValue = string | undefined | null | false | ClassValue[]
