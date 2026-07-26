import type { Ingredient } from '../types';

export const ingredientsData: Ingredient[] = [
  {
    id: 'ingredient-niacinamide',
    name: 'Niacinamide',
    category: 'barrier',
    benefits: ['Balances oil', 'Supports glow', 'Helps pores'],
    description: 'A multitasking ingredient that supports a smoother-looking complexion.',
    tags: ['daily', 'sensitive-friendly'],
  },
  {
    id: 'ingredient-hyaluronic-acid',
    name: 'Hyaluronic Acid',
    category: 'hydrating',
    benefits: ['Hydrates', 'Plumps', 'Improves comfort'],
    description: 'A lightweight humectant that draws in moisture.',
    tags: ['hydration', 'plumping'],
  },
];
