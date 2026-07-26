/**
 * Lamsat Sabah | لمسات صباح - About Us & Brand Story Page
 */

import React from 'react';
import { Sparkles, Heart, ShieldCheck, BookOpen, Star, Award, CheckCircle2, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-rose-950 to-slate-950 text-white rounded-3xl p-8 md:p-14 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>عن لمسات صباح | Lamsat Sabah</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
          منصتكِ الفاخرة للجمال، العناية بالذات، والأناقة العصرية
        </h1>
        <p className="text-sm md:text-base text-amber-100/90 font-light leading-relaxed max-w-2xl">
          لمسات صباح ليس مجرد موقع للجمال؛ إنه مساحتكِ الخاصة للاسترخاء، اكتشاف أسرار البشرة والشعر، واستبدال العشوائية بروتين مدروس يناسب طبيعتكِ الجمالية الفريدة.
        </p>
      </div>

      {/* Brand Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>فلسفة لمسات صباح الجمالية</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-snug">
            جمالكِ الحقيقي يبدأ من العناية اللطيفة والدائمة بنفسكِ 🤍
          </h2>

          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            تأسست منصة لمسات صباح (Lamsat Sabah - @thesabahedit) بهدف تقديم دليل تحريري موثوق وعالي الجودة لكل امرأة تبحث عن التوازن بين الوصفات الطبيعية والعلوم الحديثة للعناية بالبشرة والشعر والجسم.
          </p>

          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            نحن نؤمن بأن كل بشرة لها احتياجاتها الخاصة، وأن الروتين المثالي لا يتطلب مئات المنتجات المعقدة، بل خطوات واضحة ومكونات آمنة مع اختبار الحساسية لنتائج ملموسة ودائمة.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-rose-100 dark:border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
            alt="Lamsat Sabah Aesthetic Philosophy"
            referrerPolicy="no-referrer"
            className="w-full h-80 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
            <span className="text-white font-serif text-sm font-bold">
              "خلي كل يوم بداية جديدة لنسخة أجمل منكِ" ✨
            </span>
          </div>
        </div>

      </div>

      {/* Core Pillars */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md space-y-6">
        
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
            ركائز ومبادئ لمسات صباح المحورية
          </h3>
          <p className="text-xs text-slate-500 font-light">
            التزامنا تجاه كل زائرة وعضوة تضع ثقتها في منصتنا الجمالية.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-slate-900 border border-amber-200/60 dark:border-slate-700 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">نقاء الخلطات</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              وصفات طبيعية دقيقة المقادير خالية من المكونات الكيميائية القاسية.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-slate-900 border border-rose-200/60 dark:border-slate-700 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">السلامة الطبية</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              إلزامية اختبار الحساسية والتأكيد على الاستشارة الجلدية المتخصصة.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50/60 dark:bg-slate-900 border border-sky-200/60 dark:border-slate-700 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">المعلومة الشاملة</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              موسوعات متكاملة تغطي البشرة والشعر والجسم واليدين والقدمين من A لـ Z.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-slate-900 border border-purple-200/60 dark:border-slate-700 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">الخصوصية التامة</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              حفظ صور وفحوصات دفتر يوميات الجمال بسرية تامة على جهازكِ.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
