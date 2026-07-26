/**
 * Lamsat Sabah | لمسات صباح - Daily Messages & 100+ Beauty Tips Archive Page
 */

import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, Search, Filter, Lightbulb, Share2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { beautyTipsData, BeautyTipItem } from '../data/tips';

export const DailyTipsPage: React.FC = () => {
  const { t } = useLanguage();
  const { dailyMessages } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'الكل (200+ نصيحة)' },
    { id: 'skincare', label: 'العناية بالبشرة' },
    { id: 'haircare', label: 'العناية بالشعر' },
    { id: 'body-care', label: 'العناية بالجسم' },
    { id: 'hand-care', label: 'العناية باليدين' },
    { id: 'foot-care', label: 'العناية بالقدمين' },
    { id: 'natural-beauty', label: 'الجمال الطبيعي' },
    { id: 'morning', label: 'إشراقة الصباح' },
    { id: 'night', label: 'عناية المساء' },
    { id: 'summer', label: 'العناية الصيفية' },
    { id: 'winter', label: 'العناية الشتوية' },
    { id: 'self-care', label: 'العناية الذاتية' },
    { id: 'beauty-routine', label: 'الروتين الجمالي' },
    { id: 'ingredients', label: 'المكونات الفعالة' },
    { id: 'serums', label: 'السيرومات والزيوت' },
    { id: 'masks', label: 'الماسكات المغذية' },
    { id: 'sun-protection', label: 'الحماية من الشمس' },
    { id: 'hydration', label: 'الترطيب العميق' },
    { id: 'sensitive-skin', label: 'البشرة الحساسة' },
    { id: 'dry-skin', label: 'البشرة الجافة' },
    { id: 'oily-skin', label: 'البشرة الدهنية' },
    { id: 'combination-skin', label: 'البشرة المختلطة' },
    { id: 'acne-prone', label: 'البشرة المعرضة للحبوب' },
    { id: 'hair-growth', label: 'إنبات الشَعر' },
    { id: 'damaged-hair', label: 'الشعر التالف' },
    { id: 'curly-hair', label: 'الشعر الكيرلي' },
    { id: 'scalp-care', label: 'صحة الفروة' },
    { id: 'nail-care', label: 'العناية بالأظافر' }
  ];

  const filteredTips = beautyTipsData.filter(tip => {
    const matchesSearch = tip.title.ar.includes(search) || tip.content.ar.includes(search) || (tip.shortDescription?.ar && tip.shortDescription.ar.includes(search));
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory || (selectedCategory === 'skincare' && tip.category === 'skin');
    return matchesSearch && matchesCategory;
  });

  const handleShare = (tip: BeautyTipItem) => {
    const text = `💡 نصيحة لمسات صباح:\n${tip.title.ar}\n${tip.content.ar}\n\nتابعوا لمسات صباح: @thesabahedit`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(tip.id);
      setTimeout(() => setCopiedId(null), 3000);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-amber-950 to-rose-900 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
          <span>مكتبة نصائح لمسات صباح</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          أرشيف الرسائل والنصائح اليومية (100+ نصيحة)
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl">
          أسرار النضارة، خطوات العناية الذاتية، نصائح البشرة والشعر والتوجيهات اليومية لمرافقتكِ طوال اليوم.
        </p>
      </div>

      {/* Admin Broadcast Messages Feed */}
      {dailyMessages.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>رسائل إدارة لمسات صباح الأخيرة</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyMessages.map(msg => (
              <div
                key={msg.id}
                className="bg-amber-50/80 dark:bg-slate-800/90 rounded-3xl border border-amber-200/80 dark:border-amber-900/40 p-6 shadow-sm space-y-3 relative"
              >
                {msg.isPinned && (
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
                    مثبتة اليوم ✨
                  </span>
                )}

                <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-bold font-mono">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(msg.createdAt).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                  {msg.title.ar}
                </h3>

                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                  {msg.content.ar}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 100+ Beauty Tips Archive Search & Filters */}
      <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-rose-500" />
              <span>مكتبة الأسرار والحلول الجمالية السريعة</span>
            </h2>
            <p className="text-xs text-slate-500 font-light">
              تلميحات قصيرة ومجربة للبشرة، الشعر، الجسم، اليدين والقدمين.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute top-3.5 right-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحثي عن نصيحة للشفاه، السيروم، الشعر..."
              className="w-full pr-11 pl-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:border-rose-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map(tip => (
            <div
              key={tip.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-[10px] font-bold">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>نصيحة {tip.category}</span>
                </div>

                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {tip.title.ar}
                </h3>

                {tip.shortDescription?.ar && (
                  <p className="text-xs text-rose-700 dark:text-rose-300 font-semibold italic">
                    {tip.shortDescription.ar}
                  </p>
                )}

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {tip.content.ar}
                </p>

                {tip.professionalTip?.ar && (
                  <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200 space-y-0.5">
                    <span className="font-bold text-amber-700 dark:text-amber-400 block">💡 سر الخبراء:</span>
                    <p className="font-light">{tip.professionalTip.ar}</p>
                  </div>
                )}

                {tip.warning?.ar && (
                  <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-[11px] text-rose-900 dark:text-rose-200 space-y-0.5">
                    <span className="font-bold text-rose-700 dark:text-rose-400 block">⚠️ تنبيه السلامة:</span>
                    <p className="font-light">{tip.warning.ar}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => handleShare(tip)}
                  className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedId === tip.id ? 'تم نسخ النصيحة! ✨' : 'مشاركة النصيحة'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
