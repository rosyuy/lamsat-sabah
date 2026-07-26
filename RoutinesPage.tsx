/**
 * Lamsat Sabah | لمسات صباح - Beauty Routines Collection Page
 */

import React, { useState } from 'react';
import { Layers, Sun, Moon, Calendar, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

export const RoutinesPage: React.FC = () => {
  const { t } = useLanguage();
  const { toggleFavorite, isFavorite } = useApp();
  const [activeTab, setActiveTab] = useState<'morning' | 'night' | 'weekly' | 'seasonal'>('morning');

  const routinesList = [
    {
      id: 'rtn-morg-glass',
      type: 'morning',
      title: 'الروتين الصباحي للبشرة الزجاجية المتألقة',
      skinType: 'جميع أنواع البشرة',
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      steps: [
        { num: 1, name: 'الغسول اللطيف بماء فاتر', detail: 'تنظيف الزيوت المتراكمة ليلاً دون سلب الرطوبة الطبيعية.' },
        { num: 2, name: 'تونر مهدئ بماء الورد أو النياسيناميد', detail: 'موازنة حموضة الجلد وإعداده لاستقبال السيروم.' },
        { num: 3, name: 'سيروم فيتامين C أو الهيالورونيك', detail: 'حماية من الأكسدة وتفتيح نضر على بشرة ندية.' },
        { num: 4, name: 'المرطب الخفيف وقفل الرطوبة', detail: 'تثبيت السيروم للحفاظ على مرونة الجلد.' },
        { num: 5, name: 'واقي الشمس واسع الطيف SPF 50', detail: 'الخطوة الأهم لمنع التصبغات والشيخوخة المبكرة.' }
      ]
    },
    {
      id: 'rtn-night-repair',
      type: 'night',
      title: 'الروتين المسائي للترميم وإصلاح الحاجز',
      skinType: 'البشرة الجافة والمجهدة',
      imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      steps: [
        { num: 1, name: 'التنظيف المزدوج (بلسم زيتي ثم غسول رغوي)', detail: 'إزالة المكياج وواقي الشمس والأتربة كلياً.' },
        { num: 2, name: 'سيروم الريتينول أو الببتيدات', detail: 'تحفيز الكولاجين وتجديد الخلايا أثناء النوم.' },
        { num: 3, name: 'كريم الليل بالسيراميد وحمض الهيالورونيك', detail: 'ترميم الحاجز المائي وتغذيته بعمق.' }
      ]
    },
    {
      id: 'rtn-week-spa',
      type: 'weekly',
      title: 'الروتين الأسبوعي للسبا المنزلي والتقشير',
      skinType: 'جميع أنواع البشرة',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      steps: [
        { num: 1, name: 'حمام البخار بالأعشاب الطبيعية (5 دقائق)', detail: 'فتح المسام وتنشيط الدورة الدموية.' },
        { num: 2, name: 'ماسك الشوفان والعسل أو مقشر BHA', detail: 'إزالة الخلايا الميتة والتنظيف العميق.' },
        { num: 3, name: 'ماسك ترطيب مكثف وكريم مغذي', detail: 'استعادة الانتعاش والمرونة.' }
      ]
    }
  ];

  const filtered = routinesList.filter(r => r.type === activeTab || (activeTab === 'seasonal' && (r.type === 'weekly' || r.type === 'morning')));

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Layers className="w-3.5 h-3.5" />
          <span>كتالوج الروتينات الجمالية</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          أنظمة العناية الصباحية والمسائية والموسمية
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl">
          خطوات مرتبة علمياً تضمن لكِ الحصول على أقصى استفادة من كل منتج أو خلطة طبيعية دون تضارب أو إرهاق للبشرة.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'morning', label: 'الروتين الصباحي ☀️', icon: Sun },
          { id: 'night', label: 'الروتين المسائي 🌙', icon: Moon },
          { id: 'weekly', label: 'الروتين الأسبوعي 💆‍♀️', icon: Calendar },
          { id: 'seasonal', label: 'روتين الصيف والشتاء ❄️☀️', icon: Sparkles }
        ].map(tab => {
          const IconC = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
              }`}
            >
              <IconC className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Routines Grid */}
      <div className="space-y-8">
        {filtered.map(rtn => (
          <div key={rtn.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-md p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">
                  يناسب: {rtn.skinType}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  {rtn.title}
                </h3>
              </div>

              <button
                onClick={() => toggleFavorite('routineIds', rtn.id)}
                className="p-2.5 rounded-2xl bg-rose-50 dark:bg-slate-700 text-rose-500 cursor-pointer"
              >
                <Heart className={`w-5 h-5 ${isFavorite('routineIds', rtn.id) ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <div className="space-y-3">
              {rtn.steps.map(s => (
                <div key={s.num} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-start gap-4 text-xs">
                  <span className="w-7 h-7 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    {s.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{s.name}</h4>
                    <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
