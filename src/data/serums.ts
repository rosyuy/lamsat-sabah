import type { Serum } from '../types';

export const serumsData: Serum[] = [
  {
    id: 'serum-niacinamide',
    title: 'Niacinamide Glow Serum',
    category: 'brightening',
    description: 'A gentle daily serum for clarity and balance.',
    ingredients: ['niacinamide', 'squalane', 'panthenol'],
    benefits: ['Balances oil', 'Supports glow', 'Helps with pores'],
    skinType: 'combination',
    compatibleIngredients: ['hyaluronic acid', 'vitamin C'],
    tags: ['brightening', 'daily'],
  },
  {
    id: 'serum-hyaluronic',
    title: 'Hyaluronic Dew Serum',
    category: 'hydrating',
    description: 'A lightweight hydration serum for plump skin.',
    ingredients: ['hyaluronic acid', 'glycerin', 'marula oil'],
    benefits: ['Hydrates', 'Plumps', 'Smooths texture'],
    skinType: 'dry',
    compatibleIngredients: ['niacinamide', 'ceramides'],
    tags: ['hydration', 'plumping'],
  },
];
