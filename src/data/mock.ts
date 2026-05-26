import type { PantryItem, Recipe, BudgetMonth, SpendingEntry, QuickAction } from '@/types'
import { getPantryStatus } from '@/lib/utils'

// ─── PANTRY MOCK DATA ────────────────────────────────────────────────────────

// Helper to create a date relative to today
function relativeDate(daysFromNow: number): string {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

export const MOCK_PANTRY_ITEMS: PantryItem[] = [
  // Vegetables
  {
    id: 'pi-001',
    name: 'Baby Spinach',
    quantity: 200,
    unit: 'g',
    category: 'vegetables',
    purchaseDate: relativeDate(-3),
    expiryDate: relativeDate(1),
    status: getPantryStatus(relativeDate(1)),
    emoji: '🥬',
  },
  {
    id: 'pi-002',
    name: 'Zucchini',
    quantity: 3,
    unit: 'pcs',
    category: 'vegetables',
    purchaseDate: relativeDate(-2),
    expiryDate: relativeDate(5),
    status: getPantryStatus(relativeDate(5)),
    emoji: '🥒',
  },
  {
    id: 'pi-003',
    name: 'Cherry Tomatoes',
    quantity: 400,
    unit: 'g',
    category: 'vegetables',
    purchaseDate: relativeDate(-4),
    expiryDate: relativeDate(3),
    status: getPantryStatus(relativeDate(3)),
    emoji: '🍅',
  },
  {
    id: 'pi-004',
    name: 'Avocado',
    quantity: 2,
    unit: 'pcs',
    category: 'vegetables',
    purchaseDate: relativeDate(-1),
    expiryDate: relativeDate(2),
    status: getPantryStatus(relativeDate(2)),
    emoji: '🥑',
  },
  // Proteins
  {
    id: 'pi-005',
    name: 'Free-range Eggs',
    quantity: 6,
    unit: 'pcs',
    category: 'proteins',
    purchaseDate: relativeDate(-5),
    expiryDate: relativeDate(2),
    status: getPantryStatus(relativeDate(2)),
    emoji: '🥚',
  },
  {
    id: 'pi-006',
    name: 'Salmon Fillet',
    quantity: 300,
    unit: 'g',
    category: 'proteins',
    purchaseDate: relativeDate(-1),
    expiryDate: relativeDate(7),
    status: getPantryStatus(relativeDate(7)),
    emoji: '🐟',
  },
  {
    id: 'pi-007',
    name: 'Chickpeas (can)',
    quantity: 400,
    unit: 'g',
    category: 'canned',
    purchaseDate: relativeDate(-10),
    expiryDate: relativeDate(180),
    status: getPantryStatus(relativeDate(180)),
    emoji: '🫙',
  },
  // Grains
  {
    id: 'pi-008',
    name: 'Arborio Rice',
    quantity: 500,
    unit: 'g',
    category: 'grains',
    purchaseDate: relativeDate(-14),
    expiryDate: relativeDate(365),
    status: getPantryStatus(relativeDate(365)),
    emoji: '🍚',
  },
  {
    id: 'pi-009',
    name: 'Sourdough Bread',
    quantity: 1,
    unit: 'loaf',
    category: 'grains',
    purchaseDate: relativeDate(-1),
    expiryDate: relativeDate(4),
    status: getPantryStatus(relativeDate(4)),
    emoji: '🍞',
  },
  // Dairy alternatives
  {
    id: 'pi-010',
    name: 'Oat Milk',
    quantity: 1000,
    unit: 'ml',
    category: 'dairy-alternatives',
    purchaseDate: relativeDate(-3),
    expiryDate: relativeDate(4),
    status: getPantryStatus(relativeDate(4)),
    emoji: '🥛',
  },
  {
    id: 'pi-011',
    name: 'Cashew Yogurt',
    quantity: 400,
    unit: 'g',
    category: 'dairy-alternatives',
    purchaseDate: relativeDate(-2),
    expiryDate: relativeDate(0),
    status: getPantryStatus(relativeDate(0)),
    emoji: '🥣',
  },
  // Condiments
  {
    id: 'pi-012',
    name: 'Extra Virgin Olive Oil',
    quantity: 500,
    unit: 'ml',
    category: 'condiments',
    purchaseDate: relativeDate(-20),
    expiryDate: relativeDate(200),
    status: getPantryStatus(relativeDate(200)),
    emoji: '🫒',
  },
  {
    id: 'pi-013',
    name: 'Miso Paste',
    quantity: 300,
    unit: 'g',
    category: 'condiments',
    purchaseDate: relativeDate(-7),
    expiryDate: relativeDate(90),
    status: getPantryStatus(relativeDate(90)),
    emoji: '🧂',
  },
  // Fruits
  {
    id: 'pi-014',
    name: 'Lemon',
    quantity: 3,
    unit: 'pcs',
    category: 'fruits',
    purchaseDate: relativeDate(-2),
    expiryDate: relativeDate(10),
    status: getPantryStatus(relativeDate(10)),
    emoji: '🍋',
  },
  {
    id: 'pi-015',
    name: 'Banana',
    quantity: 4,
    unit: 'pcs',
    category: 'fruits',
    purchaseDate: relativeDate(-1),
    expiryDate: relativeDate(3),
    status: getPantryStatus(relativeDate(3)),
    emoji: '🍌',
  },
]

// ─── RECIPE MOCK DATA ────────────────────────────────────────────────────────

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 'r-001',
    title: 'Pesto Zucchini & Chickpea Bowl',
    description: 'A fresh, vibrant bowl with pan-roasted chickpeas and tender zucchini in a fragrant basil pesto.',
    mealType: 'dinner',
    cookTimeMinutes: 20,
    difficulty: 'easy',
    servings: 2,
    tags: ['mediterranean', 'gluten-free', 'high-protein'],
    imageGradient: 'from-[#b0cfa8] to-[#4a7a5a]',
    isFavorite: true,
    pantryMatchCount: 4,
    totalIngredients: 6,
  },
  {
    id: 'r-002',
    title: 'Egg & Avocado Sandwich',
    description: 'Generous layers of creamy avocado, soft-boiled egg, and fresh herbs on toasted sourdough.',
    mealType: 'lunch',
    cookTimeMinutes: 10,
    difficulty: 'easy',
    servings: 1,
    tags: ['easy', 'quick', 'high-protein'],
    imageGradient: 'from-[#e8c89a] to-[#c07040]',
    isFavorite: false,
    pantryMatchCount: 5,
    totalIngredients: 5,
  },
  {
    id: 'r-003',
    title: 'Miso Salmon Rice Bowl',
    description: 'Tender miso-glazed salmon over jasmine rice with pickled cucumber and sesame.',
    mealType: 'dinner',
    cookTimeMinutes: 30,
    difficulty: 'medium',
    servings: 2,
    tags: ['japanese', 'gluten-free', 'high-protein'],
    imageGradient: 'from-[#b8d8e8] to-[#4a80a8]',
    isFavorite: true,
    pantryMatchCount: 3,
    totalIngredients: 7,
  },
  {
    id: 'r-004',
    title: 'Turmeric Chia Breakfast Bowl',
    description: 'Creamy overnight oats with golden turmeric, chia seeds, and sliced banana.',
    mealType: 'breakfast',
    cookTimeMinutes: 5,
    difficulty: 'easy',
    servings: 1,
    tags: ['gluten-free', 'no-added-sugar', 'quick'],
    imageGradient: 'from-[#f0d4a8] to-[#c88040]',
    isFavorite: false,
    pantryMatchCount: 4,
    totalIngredients: 5,
  },
  {
    id: 'r-005',
    title: 'Caprese Ricotta Toast',
    description: 'Thick sourdough toast topped with silky ricotta, heirloom tomatoes, and fresh basil.',
    mealType: 'breakfast',
    cookTimeMinutes: 8,
    difficulty: 'easy',
    servings: 1,
    tags: ['italian', 'quick', 'easy'],
    imageGradient: 'from-[#d4c8e8] to-[#7a5a98]',
    isFavorite: true,
    pantryMatchCount: 3,
    totalIngredients: 5,
  },
  {
    id: 'r-006',
    title: 'Warm Turmeric Lentil Soup',
    description: 'A deeply nourishing soup with red lentils, ginger, and anti-inflammatory spices.',
    mealType: 'dinner',
    cookTimeMinutes: 40,
    difficulty: 'easy',
    servings: 4,
    tags: ['mediterranean', 'gluten-free', 'high-protein', 'budget-friendly'],
    imageGradient: 'from-[#e8c49a] to-[#c07848]',
    isFavorite: true,
    pantryMatchCount: 6,
    totalIngredients: 8,
  },
]

// ─── BUDGET MOCK DATA ────────────────────────────────────────────────────────

export const MOCK_BUDGET_MONTH: BudgetMonth = {
  id: 'bm-2025-05',
  month: '2025-05',
  totalBudget: 900,
  currency: 'EUR',
}

export const MOCK_SPENDING_ENTRIES: SpendingEntry[] = [
  {
    id: 'se-001',
    amount: 47.8,
    storeName: 'Albert Heijn',
    date: relativeDate(-1),
    category: 'vegetables-fruits',
    budgetMonthId: 'bm-2025-05',
  },
  {
    id: 'se-002',
    amount: 36.2,
    storeName: 'Lidl',
    date: relativeDate(-4),
    category: 'proteins',
    budgetMonthId: 'bm-2025-05',
  },
  {
    id: 'se-003',
    amount: 89.4,
    storeName: 'Jumbo',
    date: relativeDate(-7),
    category: 'grains-pantry',
    budgetMonthId: 'bm-2025-05',
  },
  {
    id: 'se-004',
    amount: 28.6,
    storeName: 'Albert Heijn',
    date: relativeDate(-10),
    category: 'dairy-alternatives',
    budgetMonthId: 'bm-2025-05',
  },
  {
    id: 'se-005',
    amount: 138.0,
    storeName: 'Lidl',
    date: relativeDate(-14),
    category: 'proteins',
    budgetMonthId: 'bm-2025-05',
  },
]

// Computed: total spent
export const MOCK_TOTAL_SPENT = MOCK_SPENDING_ENTRIES.reduce(
  (sum, entry) => sum + entry.amount,
  0,
)

// ─── QUICK ACTIONS MOCK DATA ─────────────────────────────────────────────────

export const MOCK_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'qa-scan',
    label: 'Scan receipt',
    subtitle: 'Track spending',
    icon: 'Scan',
    href: '/scan',
    colorClass: 'bg-nauria-blue-light',
    iconColorClass: 'text-nauria-blue',
  },
  {
    id: 'qa-shopping',
    label: 'Shopping list',
    subtitle: '8 items ready',
    icon: 'ShoppingCart',
    href: '/shopping',
    colorClass: 'bg-nauria-amber-light',
    iconColorClass: 'text-nauria-amber',
  },
  {
    id: 'qa-ai',
    label: 'AI recipe',
    subtitle: 'From pantry',
    icon: 'Sparkles',
    href: '/ai-recipe',
    colorClass: 'bg-nauria-purple-light',
    iconColorClass: 'text-nauria-purple',
  },
  {
    id: 'qa-plan',
    label: 'Plan week',
    subtitle: 'Auto-fill with AI',
    icon: 'CalendarDays',
    href: '/planner',
    colorClass: 'bg-green-light',
    iconColorClass: 'text-green',
  },
]

// ─── DERIVED DATA ────────────────────────────────────────────────────────────

export const MOCK_EXPIRING_ITEMS = MOCK_PANTRY_ITEMS.filter(
  (item) => item.status === 'expiring' || item.status === 'use-soon',
)

export const MOCK_FAVORITE_RECIPES = MOCK_RECIPES.filter((r) => r.isFavorite)
