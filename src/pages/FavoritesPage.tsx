/**
 * Lamsat Sabah | لمسات صباح - Saved Favorites Collection Page
 */

import React from 'react';
import { Heart, Sparkles, Trash2, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { naturalMasksData } from '../data/masks';
import { serumsData } from '../data/serums';

interface FavoritesPageProps {
  onSelectMask: (maskId: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onSelectMask }) => {
  const { t } = useLanguage();
  const { favorites, toggleFavorite } = useApp();

  const favMasks = naturalMasksData.filter(m => favorites.maskIds.includes(m.id));
  const favSerums = serumsData.filter(s => favorites.serumIds.includes(s.id));

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>المفضلات المحفوظة</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          قائمة الخلطات والسيرومات المحفوظة
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl">
          الوصول السريع لوصفاتكِ المفضلة لتبسيط تنفيذ روتينكِ اليومي والأسبوعي.
        </p>
      </div>

      {/* Saved Natural Masks */}
      <div className="space-y-6">
        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-rose-50">
          الماسكات والخلطات المحفوظة ({favMasks.length})
        </h2>

        {favMasks.length === 0 ? (
          <p className="text-xs text-slate-400 font-light p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            لم تقومي بإضافة أي ماسك طبيعي للمفضلة بعد ✨
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favMasks.map(mask => (
              <div key={mask.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-md p-5 space-y-3">
                <div className="h-40 relative rounded-2xl overflow-hidden">
                  <img src={mask.imageUrl} alt={mask.title.ar} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleFavorite('maskIds', mask.id)}
                    className="absolute top-2 left-2 p-2 rounded-xl bg-white/80 text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white line-clamp-1">{mask.title.ar}</h3>
                <button
                  onClick={() => onSelectMask(mask.id)}
                  className="w-full py-2 rounded-xl bg-rose-50 dark:bg-slate-700 text-rose-700 dark:text-rose-200 text-xs font-bold cursor-pointer"
                >
                  عرض الخلطة والمقادير
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Serums */}
      <div className="space-y-6">
        <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-rose-50">
          السيرومات المحفوظة ({favSerums.length})
        </h2>

        {favSerums.length === 0 ? (
          <p className="text-xs text-slate-400 font-light p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            لم تقومي بإضافة أي سيروم للمفضلة بعد ✨
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favSerums.map(serum => (
              <div key={serum.id} className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-3 relative">
                <button
                  onClick={() => toggleFavorite('serumIds', serum.id)}
                  className="absolute top-4 left-4 text-slate-400 hover:text-rose-500 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-bold text-amber-600 font-mono block">{serum.activeIngredient}</span>
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">{serum.name.ar}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-light">{serum.howToUse.ar}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
