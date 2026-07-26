/**
 * Lamsat Sabah | لمسات صباح - Serums Encyclopedia & Layering Guide
 */

import React, { useState } from 'react';
import { Sparkles, Droplet, AlertTriangle, CheckCircle2, ShieldAlert, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { serumsData } from '../data/serums';

export const SerumsPage: React.FC = () => {
  const { t } = useLanguage();
  const { toggleFavorite, isFavorite } = useApp();
  const [selectedTime, setSelectedTime] = useState<'all' | 'morning' | 'night'>('all');

  const filteredSerums = serumsData.filter(s => 
    selectedTime === 'all' || s.timeOfDay === selectedTime || s.timeOfDay === 'both'
  );

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Droplet className="w-3.5 h-3.5 text-rose-400" />
          <span>موسوعة السيرومات المركزة</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          دليل السيرومات وطرق الدمج الصحيحة
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl">
          تعرفي على قواعد السيرومات المركزة (فيتامين C، النياسيناميد، الريتينول، الهيالورونيك)، التركيزات الموصى بها، والمواد القابلة للدمج أو التي يجب تفادي خلطها بآن واحد.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: 'all', label: 'جميع السيرومات' },
          { id: 'morning', label: 'روتين الصباح ☀️' },
          { id: 'night', label: 'روتين المساء 🌙' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTime(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTime === tab.id
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Serums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSerums.map(serum => (
          <div
            key={serum.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-md space-y-4 p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 font-mono block mb-1">
                    المادة الفعالة: {serum.activeIngredient}
                  </span>
                  <h3 className="font-serif font-bold text-lg md:text-xl text-slate-900 dark:text-white">
                    {serum.name.ar}
                  </h3>
                </div>

                <button
                  onClick={() => toggleFavorite('serumIds', serum.id)}
                  className="p-2.5 rounded-2xl bg-rose-50 dark:bg-slate-700 text-rose-500 cursor-pointer"
                >
                  <Heart className={`w-5 h-5 ${isFavorite('serumIds', serum.id) ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Benefits */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">الفوائد والنتائج:</h4>
                <div className="space-y-1.5">
                  {serum.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{b.ar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How to use */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <span className="font-bold text-rose-700 dark:text-rose-300 block">طريقة التطبيق والجرعة:</span>
                <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">{serum.howToUse.ar}</p>
                <span className="text-[10px] text-amber-600 font-bold block pt-1 font-mono">الكمية: {serum.dropsCount}</span>
              </div>

              {/* Compatible vs Avoid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">يُدمج بأمان مع:</span>
                  <ul className="text-emerald-900 dark:text-emerald-200 list-disc list-inside font-light">
                    {serum.compatibleIngredients.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">تجنبي خلطه مع:</span>
                  <ul className="text-rose-900 dark:text-rose-200 list-disc list-inside font-light">
                    {serum.doNotMixWith.map((nm, idx) => (
                      <li key={idx}>{nm}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Professional Advice */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{serum.professionalAdvice.ar}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
