/**
 * Lamsat Sabah | لمسات صباح - Active Ingredients Encyclopedia Page
 */

import React from 'react';
import { Sparkles, BookOpen, ShieldCheck, Sun, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ingredientsData } from '../data/ingredients';

export const IngredientsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-purple-300 text-xs font-semibold border border-white/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>موسوعة المواد الفعالة</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          دليل المكونات والمواد الكيميائية والتجميلية
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl">
          فهم علمي مبسط لكل عنصر ومكون تجميلي (حمض الهيالورونيك، الساليسيليك، الريتينول)، فوائده، أمانه أثناء الحمل والتعرض للشمس.
        </p>
      </div>

      {/* Ingredients Catalog */}
      <div className="space-y-8">
        {ingredientsData.map(ing => (
          <div key={ing.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 md:p-8 shadow-md space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 block mb-1">
                  الاسم العلمي: {ing.scientificName}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  {ing.name.ar}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {ing.pregnancySafe ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> آمن أثناء الحمل
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> غير آمن للحوامل
                  </span>
                )}

                {ing.sunSensitivity && (
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5" /> يزيد حساسية الشمس
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed">
              {ing.description.ar}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white">طريقة الاستخدام وتوجيهات السلامة:</h4>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-light">
                  {ing.howToUse.ar}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white">ملاحظات الحمل والرضاعة:</h4>
                <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-light">
                  {ing.pregnancyNotes.ar}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
