/**
 * Lamsat Sabah | لمسات صباح - Beauty Encyclopedia Articles Page
 */

import React from 'react';
import { BookOpen, Sparkles, Clock, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { skincareEncyclopediaData } from '../data/skincare';

export const EncyclopediaPage: React.FC = () => {
  const { t } = useLanguage();
  const { toggleFavorite, isFavorite } = useApp();

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>موسوعة الجمال الشاملة</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          مقالات ودراسات العناية بالبشرة والشعر
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl">
          أدلة علمية وتجميلية مفصلة تناقش آليات عمل البشرة، كيفية التغلب على التصبغات، علاج حب الشباب، وتقوية جذور الشعر.
        </p>
      </div>

      {/* Articles Feed */}
      <div className="space-y-8">
        {skincareEncyclopediaData.map(art => (
          <article
            key={art.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-md flex flex-col lg:flex-row"
          >
            <div className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden shrink-0">
              <img
                src={art.imageUrl}
                alt={art.title.ar}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8 lg:w-3/5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {art.category} • قراءة {art.readTime}
                  </span>
                  <button
                    onClick={() => toggleFavorite('articleIds', art.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite('articleIds', art.id) ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  {art.title.ar}
                </h2>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  {art.summary.ar}
                </p>

                <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-slate-900 text-xs space-y-2">
                  <strong className="text-rose-900 dark:text-rose-300 block">تعريف وتشخيص العلم الجمالي:</strong>
                  <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed">{art.definition.ar}</p>
                </div>

                {art.faqs && art.faqs.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {art.faqs.map((faq, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">س: {faq.question.ar}</span>
                        <p className="text-slate-600 dark:text-slate-400 font-light">ج: {faq.answer.ar}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400 font-mono">
                كُتب بواسطة فريق تحرير لمسات صباح • حقوق الطبع محفوظة
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
