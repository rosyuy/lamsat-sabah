/**
 * Lamsat Sabah | لمسات صباح - Generic Beauty Category Page
 */

import React, { useState } from 'react';
import { Sparkles, Filter, Clock, Heart, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { naturalMasksData } from '../data/masks';
import { skincareEncyclopediaData } from '../data/skincare';

interface CategoryPageProps {
  categoryId: string;
  onSelectMask: (maskId: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId, onSelectMask }) => {
  const { t } = useLanguage();
  const { toggleFavorite, isFavorite } = useApp();

  const getCategoryTitle = () => {
    switch (categoryId) {
      case 'skin-care': return t('skinCare');
      case 'hair-care': return t('hairCare');
      case 'body-care': return t('bodyCare');
      case 'hand-care': return t('handCare');
      case 'foot-care': return t('footCare');
      default: return 'قسم العناية بالجمال';
    }
  };

  const getCategoryDesc = () => {
    switch (categoryId) {
      case 'skin-care': return 'دليلكِ الكامل لحلول البشرة، مقاومة الحبوب والتنعيم والتفتيح النقي.';
      case 'hair-care': return 'خلطات الزيوت والأعشاب للتقوية والكثافة ولمعان أطراف الشعر.';
      case 'body-care': return 'تقشير الجسم، الترطيب العميق، وتصفية المناطق الجافة والمجهدة.';
      case 'hand-care': return 'نعومة الأيدي المخملية وتقوية الأظافر الهشة.';
      case 'foot-care': return 'علاج التشققات وبديكير منزلي لملمس حريري.';
      default: return 'محتوى تجميلي موثوق وخلطات طبيعية مجربة.';
    }
  };

  const mapMaskCategory = () => {
    if (categoryId === 'skin-care') return 'face';
    if (categoryId === 'hair-care') return 'hair';
    if (categoryId === 'body-care') return 'body';
    if (categoryId === 'hand-care') return 'hands';
    if (categoryId === 'foot-care') return 'feet';
    return 'face';
  };

  const categoryMasks = naturalMasksData.filter(m => m.category === mapMaskCategory());

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>قسم تجميلي متخصص</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          {getCategoryTitle()}
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl">
          {getCategoryDesc()}
        </p>
      </div>

      {/* Category Masks Catalog */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-rose-50">
          وصفات طبيعية مجربة لـ {getCategoryTitle()} ({categoryMasks.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryMasks.map(mask => (
            <div
              key={mask.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={mask.imageUrl}
                  alt={mask.title.ar}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite('maskIds', mask.id)}
                  className="absolute top-3 left-3 p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-rose-500 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isFavorite('maskIds', mask.id) ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white line-clamp-1 mb-2">
                    {mask.title.ar}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light line-clamp-2 leading-relaxed">
                    {mask.benefits[0]?.ar || mask.preparation.ar}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> {mask.weeklyFrequency}
                  </span>
                  <button
                    onClick={() => onSelectMask(mask.id)}
                    className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-slate-700 text-rose-700 dark:text-rose-200 text-xs font-bold hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                  >
                    تفاصيل الوصفة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
