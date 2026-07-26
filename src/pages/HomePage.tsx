/**
 * Lamsat Sabah | لمسات صباح - Editorial Home Page
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Bot, 
  HelpCircle, 
  Clock, 
  Calendar, 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Star,
  Zap,
  CheckCircle2,
  Droplet,
  Scissors,
  Feather,
  Footprints,
  Activity,
  Lightbulb,
  Sparkle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { WelcomeBanner } from '../components/WelcomeBanner';
import { DailySkinCheckInModal } from '../components/DailySkinCheckInModal';
import { naturalMasksData } from '../data/masks';
import { serumsData } from '../data/serums';
import { skincareEncyclopediaData } from '../data/skincare';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenAI: () => void;
  onOpenQuiz: () => void;
  onSelectMask: (maskId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAI,
  onOpenQuiz,
  onSelectMask
}) => {
  const { t, isRTL } = useLanguage();
  const { dailyMessages, toggleFavorite, isFavorite } = useApp();

  const [checkInOpen, setCheckInOpen] = useState(false);

  const featuredMasks = naturalMasksData.slice(0, 6);
  const featuredSerums = serumsData.slice(0, 4);
  const featuredArticles = skincareEncyclopediaData.slice(0, 3);
  const pinnedDailyMessage = dailyMessages.find(m => m.isPinned) || dailyMessages[0];

  // The 12 requested beauty journey choices
  const journeyChoices = [
    {
      id: 'skin-care',
      title: 'البشرة والعناية بالوجه',
      desc: 'دليل البشرة العادية، الجافة، الدهنية، الحساسة والمختلطة وسيرومات النضارة.',
      action: () => onNavigate('skin-care'),
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      tag: 'الموسوعة الشاملة'
    },
    {
      id: 'hair-care',
      title: 'الشعر والعناية به',
      desc: 'الروتين والزيوت والماسكات لتكثيف الشعر، منع التساقط وعلاج التقصف.',
      action: () => onNavigate('hair-care'),
      img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      tag: 'كثافة ونعومة'
    },
    {
      id: 'body-care',
      title: 'الجسم والعناية به',
      desc: 'تقشير الجسم، الترطيب المزدوج، وعلاج الحبوب والتصرفات تحت الإبط والركب.',
      action: () => onNavigate('body-care'),
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      tag: 'ترطيب مخملي'
    },
    {
      id: 'hand-care',
      title: 'اليدين والأظافر',
      desc: 'حماية الكفين من التراكمات الجافة، العناية بجلد الأظافر وتقويتها.',
      action: () => onNavigate('hand-care'),
      img: 'https://images.unsplash.com/photo-1608248597261-1e967a9bc245?auto=format&fit=crop&w=600&q=80',
      tag: 'أيدي ناعمة'
    },
    {
      id: 'foot-care',
      title: 'القدمين والعناية بها',
      desc: 'البديكير المنزلي، علاج الكعوب المتشققة ونقع القدمين بالزيوت العطرية.',
      action: () => onNavigate('foot-care'),
      img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=600&q=80',
      tag: 'علاج التشققات'
    },
    {
      id: 'routines',
      title: 'اكتشفي روتينك المثالي',
      desc: 'جدول العناية الصباحية والمسائية المنظم ومتابعة المهام اليومية.',
      action: () => onNavigate('routines'),
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      tag: 'جدول منسق'
    },
    {
      id: 'quiz',
      title: 'اختبار بشرتي وشعري',
      desc: 'تحليل مكون من 5 أسئلة لبناء ملفكِ الجمالي المخصص فوراً.',
      action: onOpenQuiz,
      img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
      tag: 'اختبار سريع'
    },
    {
      id: 'skin-checkin',
      title: 'فحص بشرتي اليوم',
      desc: 'سجلي شعور بشرتكِ وحصولكِ على نصيحة ترطيب وسلامة فورية.',
      action: () => setCheckInOpen(true),
      img: 'https://images.unsplash.com/photo-1512290900676-26c2a423442d?auto=format&fit=crop&w=600&q=80',
      tag: 'فحص يومي'
    },
    {
      id: 'natural-masks',
      title: 'الماسكات الطبيعية',
      desc: 'أكثر من 200+ خلطة مجربة وموثوقة بالمقادير وتوجيهات السلامة.',
      action: () => onNavigate('natural-masks'),
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
      tag: '200+ خلطة'
    },
    {
      id: 'serums',
      title: 'السيرومات والمكونات',
      desc: 'موسوعة الهيالورونيك، فيتامين C، النياسيناميد والأحماض الفعالة.',
      action: () => onNavigate('serums'),
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      tag: 'مكونات نشطة'
    },
    {
      id: 'daily-tips',
      title: 'نصائح لمسات صباح',
      desc: 'مجموعة من أسرار الجمال، العناية بالذات، وتوجيهات الصيف والشتاء.',
      action: () => onNavigate('daily-tips'),
      img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
      tag: 'أسرار الجمال'
    },
    {
      id: 'ai-assistant',
      title: 'اسألي لمسات صباح (AI)',
      desc: 'استشارتكِ الذكية الفورية للإجابة على جميع تساؤلاتك الجمالية.',
      action: onOpenAI,
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      tag: 'مساعدة ذكية'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Universal Welcome Banner */}
      <WelcomeBanner 
        onNavigate={onNavigate}
        onOpenAI={onOpenAI}
        onOpenQuiz={onOpenQuiz}
        onDiscoverClick={() => {
          const element = document.getElementById('beauty-journey-section');
          element?.scrollIntoView({ behavior: 'smooth' });
        }} 
      />

      {/* Pinned Daily Reflection */}
      {pinnedDailyMessage && (
        <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-amber-100/50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-900 rounded-3xl p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-200/70 text-amber-950 dark:bg-amber-900/60 dark:text-amber-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-amber-300" />
                <span>رسالة الصباح اليومية من لمسات صباح 🤍</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-rose-100">
                {pinnedDailyMessage.title.ar}
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                {pinnedDailyMessage.content.ar}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCheckInOpen(true)}
                className="px-5 py-3 rounded-2xl bg-rose-600 text-white font-bold text-xs shadow-md hover:bg-rose-500 transition-colors cursor-pointer whitespace-nowrap"
              >
                فحص بشرتكِ اليوم ✨
              </button>
              <button
                onClick={() => onNavigate('daily-tips')}
                className="px-5 py-3 rounded-2xl bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs shadow-sm hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                أرشيف النصائح
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Choose Your Beauty Journey Grid (12 Items: 2 col mobile, 3 tablet, 4 desktop) */}
      <div id="beauty-journey-section" className="space-y-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-bold border border-rose-200/60 dark:border-rose-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خياراتك الجمالية الرئيسية</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            اختاري رحلتك الجمالية اليوم ✨
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
            استكشفي أقسام وموسوعات وأدوات لمسات صباح المصممة بعناية لمرافقتكِ في كل خطوة من خطوات العناية.
          </p>
        </div>

        {/* Responsive Grid: 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {journeyChoices.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
            >
              <div className="h-36 md:h-44 relative overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-slate-900 dark:text-white border border-white/20">
                  {item.tag}
                </span>
              </div>

              <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-sm md:text-base text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:underline flex items-center gap-1">
                    <span>اكتشفي الآن</span>
                    {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Featured Natural Masks Showcase */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white">
              وصفات طبيعية مختارة من موسوعة لمسات صباح
            </h3>
            <p className="text-xs text-slate-500 font-light">
              خلطات آمنة ومجربة بمكونات منزلية متوفرة ومقادير مضبوطة.
            </p>
          </div>

          <button
            onClick={() => onNavigate('natural-masks')}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>عرض كل الوصفات (200+)</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMasks.slice(0, 3).map(mask => (
            <div
              key={mask.id}
              onClick={() => onSelectMask(mask.id)}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col group"
            >
              <div className="h-44 relative overflow-hidden">
                <img
                  src={mask.imageUrl}
                  alt={mask.title.ar}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-rose-600">
                    {mask.title.ar}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light line-clamp-2 mt-1">
                    {mask.benefits[0]?.ar}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-amber-600 font-bold">⭐ {mask.rating}</span>
                  <span className="text-rose-600 font-semibold">عرض المقادير والطريقة</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Skin Check-In Modal */}
      <DailySkinCheckInModal
        isOpen={checkInOpen}
        onClose={() => setCheckInOpen(false)}
        onNavigateToJournal={() => onNavigate('beauty-journal')}
      />

    </div>
  );
};
