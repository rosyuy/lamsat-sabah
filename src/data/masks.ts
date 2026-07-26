import type { NaturalMask } from '../types';

export const naturalMasksData: NaturalMask[] = [
  {
    id: 'mask-rose-honey',
    title: 'Rose Honey Glow Mask',
    category: 'hydrating',
    description: 'A calming mask for soft and radiant skin.',
    ingredients: ['rose water', 'honey', 'oat milk'],
    steps: ['Mix ingredients', 'Apply for 15 minutes', 'Rinse gently'],
    benefits: ['Hydrates', 'Soothes', 'Brightens'],
    skinType: 'sensitive',
    routineStep: 'night',
    tags: ['glow', 'natural'],
  },
  {
    id: 'mask-yoğurt-oat',
    title: 'Yogurt Oat Repair Mask',
    category: 'repair',
    description: 'A nourishing mask to comfort dry skin.',
    ingredients: ['plain yogurt', 'oats', 'almond oil'],
    steps: ['Blend into a paste', 'Leave on for 10 minutes', 'Rinse with lukewarm water'],
    benefits: ['Calms', 'Softens', 'Supports barrier health'],
    skinType: 'dry',
    routineStep: 'weekend',
    tags: ['repair', 'comfort'],
  },
];
