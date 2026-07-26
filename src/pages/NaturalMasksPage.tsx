/**
 * Lamsat Sabah | لمسات صباح - Natural Masks Catalog Page (125+ Recipes)
 */

import React, { useState } from 'react';
import { Sparkles, Search, Filter, Clock, Heart, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { naturalMasksData } from '../data/masks';

interface NaturalMasksPageProps {
  onSelectMask: (maskId: string) => void;
}

export const NaturalMasksPage: React.FC<NaturalMasksPageProps> = ({ onSelectMask }) => {
  const { t } = useLanguage();
  const { toggleFavorite, isFavorite } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');

  const filteredMasks = naturalMasksData.filter(mask => {
    const descText = mask.benefits[0]?.ar || mask.preparation.ar || '';
    const matchesSearch = mask.title.ar.includes(search) || descText.includes(search);
    const matchesCategory = selectedCategory === 'all' || mask.category === selectedCategory;
    const matchesSkin = selectedSkinType === 'all' || (mask.skinType && mask.skinType.includes(selectedSkinType)) || !mask.skinType;
    return matchesSearch && matchesCategory && matchesSkin;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Page Title Header */}
      <div className="bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>موسوعة الخلطات الطبيعية</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
            مكتبة الخلطات الطبيعية والوصفات المنزلية
          </h1>
          <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed">
            استكشفي أكثر من 120+ وصفة طبيعية مجربة وموثوقة للعناية بالوجه، الشعر، الجسم، اليدين والقدمين مع مقادير دقيقة وتوجيهات السلامة.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute top-3.5 right-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحثي عن وصفة برمز الشوفان، العسل، الأرز، الزبادي..."
              className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs md:text-sm focus:outline-hidden focus:border-rose-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedSkinType}
              onChange={e => setSelectedSkinType(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="all">جميع أنواع البشرة</option>
              <option value="normal">العادية</option>
              <option value="dry">الجافة</option>
              <option value="oily">الدهنية</option>
              <option value="combination">المختلطة</option>
              <option value="sensitive">الحساسة</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {[
            { id: 'all', label: 'الكل (120+)' },
            { id: 'face', label: 'ماسكات الوجه' },
            { id: 'hair', label: 'وصفات الشعر' },
            { id: 'body', label: 'تقشير الجسم' },
            { id: 'hands', label: 'عناية الأيدي' },
            { id: 'feet', label: 'بديكير القدمين' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id 
                  ? 'bg-rose-600 text-white shadow-xs' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-rose-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Natural Masks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMasks.map(mask => (
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
                className="absolute top-3 left-3 p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-rose-500 cursor-pointer hover:scale-105 transition-transform"
              >
                <Heart className={`w-4 h-4 ${isFavorite('maskIds', mask.id) ? 'fill-rose-500' : ''}`} />
              </button>
              <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 text-white text-[10px] font-bold uppercase tracking-wider">
                {mask.category}
              </span>
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
                  تفاصيل الخلطة والمقادير
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
