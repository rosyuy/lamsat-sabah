export type Language = 'ar' | 'en' | 'fr' | 'tr' | 'ko';
export type Role = 'user' | 'admin';
export type NotificationCategory =
  | 'beauty_tips'
  | 'masks'
  | 'serums'
  | 'daily_messages'
  | 'morning_messages'
  | 'evening_messages'
  | 'articles'
  | 'encyclopedia'
  | 'ai_features'
  | 'skincare'
  | 'ingredients'
  | 'routine';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  skinType?: string;
  hairType?: string;
  createdAt: string;
}

export interface NaturalMask {
  id: string;
  title: string;
  category: string;
  description: string;
  ingredients: string[];
  steps: string[];
  benefits: string[];
  skinType?: string;
  routineStep?: string;
  imageUrl?: string;
  difficulty?: string;
  duration?: string;
  caution?: string;
  tags?: string[];
}

export interface Serum {
  id: string;
  title: string;
  category?: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  skinType?: string;
  compatibleIngredients?: string[];
  imageUrl?: string;
  tags?: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  benefits: string[];
  description: string;
  imageUrl?: string;
  tags?: string[];
}

export interface BeautyTipItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  emoji?: string;
  author?: string;
}

export interface EncyclopediaArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  tags?: string[];
}
