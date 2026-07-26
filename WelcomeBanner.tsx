/**
 * Lamsat Sabah | لمسات صباح - Dynamic Welcome Banner Component
 * Universal & Time-Aware Welcome Section with Morning/Evening Messages & Quick Actions.
 */

import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Bot, 
  Droplet, 
  BookOpen, 
  Mail, 
  ArrowLeft, 
  ArrowRight,
  Flower2,
  ChevronLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface WelcomeBannerProps {
  onNavigate?: (page: string) => void;
  onOpenAI?: () => void;
  onOpenQuiz?: () => void;
  onDiscoverClick?: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ 
  onNavigate,
  onOpenAI,
  onOpenQuiz,
  onDiscoverClick
}) => {
  const { isRTL } = useLanguage();
  const { user } = useAuth();

  // Dynamic Time-of-Day Detection (Morning: 5 AM - 6 PM, Evening: 6 PM - 5 AM)
  const [isMorning, setIsMorning] = useState<boolean>(() => {
    const hour = new Date().getHours();
    return hour >= 5 && hour < 18;
  });

  // Re-check hour periodically
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsMorning(hour >= 5 && hour < 18);
    };
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const userName = user?.name ? ` يا ${user.name}` : '';

  const quickActions = [
    {
      id: 'quiz',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: '🌸 اكتشفي روتينك المثالي',
      desc: 'اعملي اختبار الجمال واكتشفي روتين مناسب ليكي.',
      action: () => onOpenQuiz?.()
    },
    {
      id: 'ai',
      icon: <Bot className="w-5 h-5 text-rose-500" />,
      title: '✨ اسألي مساعد لمسات صباح',
      desc: 'اسألي مساعد الذكاء الاصطناعي عن بشرتك، شعرك، السيرومات والماسكات.',
      action: () => onOpenAI?.()
    },
    {
      id: 'serums',
      icon: <Droplet className="w-5 h-5 text-teal-500" />,
      title: '🧴 اكتشفي السيروم المناسب',
      desc: 'تصفحي دليل السيرومات واكتشفي الأنسب لاحتياجات بشرتك.',
      action: () => onNavigate?.('serums')
    },
    {
      id: 'masks',
      icon: <Flower2 className="w-5 h-5 text-emerald-500" />,
      title: '🍯 جربي ماسك طبيعي',
      desc: 'اكتشفي مكتبة الماسكات الطبيعية للعناية بالوجه والشعر والجسم واليدين والقدمين.',
      action: () => onNavigate?.('natural-masks')
    },
    {
      id: 'encyclopedia',
      icon: <BookOpen className="w-5 h-5 text-purple-500" />,
      title: '📖 تصفحي موسوعة الجمال',
      desc: 'اكتشفي كل المعلومات والنصائح اللي تحتاجيها عن البشرة والشعر والعناية بالجسم.',
      action: () => onNavigate?.('encyclopedia')
    },
    {
      id: 'daily-tips',
      icon: <Mail className="w-5 h-5 text-pink-500" />,
      title: '💌 رسالة اليوم',
      desc: 'نصيحة صغيرة من لمسات صباح تخلي يومك أجمل.',
      action: () => onNavigate?.('daily-tips')
    }
  ];

  return (
    <div className="space-y-8 my-6">
      {/* Hero Welcome Card */}
      <div 
        className={`relative overflow-hidden rounded-3xl transition-all duration-700 p-8 md:p-12 shadow-xl border ${
          isMorning
            ? 'bg-gradient-to-br from-amber-500/10 via-rose-500/15 to-purple-500/10 dark:from-slate-900 dark:via-rose-950/40 dark:to-slate-900 border-rose-200/60 dark:border-rose-900/40 text-slate-900 dark:text-rose-50'
            : 'bg-gradient-to-br from-purple-950 via-slate-900 to-rose-950 border-purple-800/40 text-white shadow-2xl'
        }`}
      >
        {/* Ambient Glow Effects */}
        <div 
          className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isMorning ? 'bg-amber-300/30 dark:bg-amber-900/20' : 'bg-purple-600/20'
          }`} 
        />
        <div 
          className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isMorning ? 'bg-rose-300/30 dark:bg-rose-900/20' : 'bg-rose-600/20'
          }`} 
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Header Controls / Eyebrow Badge & Toggle */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Greeting Eyebrow Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md border text-sm font-semibold transition-all duration-300 shadow-xs ${
                isMorning
                  ? 'bg-white/80 dark:bg-slate-800/80 border-amber-200/80 dark:border-rose-800/60 text-amber-900 dark:text-amber-200'
                  : 'bg-white/10 border-white/20 text-amber-200'
              }`}
            >
              {isMorning ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>☀️ صباحك لمسات جميلة 🤍</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-300" />
                  <span>🌙 مساءك هدوء وجمال 🤍</span>
                </>
              )}
            </div>

            {/* Time Mode Switcher */}
            <button
              onClick={() => setIsMorning(!isMorning)}
              title="تبديل وضع الصباح / المساء"
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300 cursor-pointer border ${
                isMorning
                  ? 'bg-amber-100/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-amber-200 dark:border-slate-700 hover:bg-amber-200/80'
                  : 'bg-white/10 text-rose-200 border-white/20 hover:bg-white/20'
              }`}
            >
              {isMorning ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
                  <span>معاينة وضع المساء 🌙</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>معاينة وضع الصباح ☀️</span>
                </>
              )}
            </button>
          </div>

          {/* Main Title */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight ${
            isMorning ? 'text-slate-900 dark:text-rose-50' : 'text-rose-50'
          }`}>
            أهلاً بيكي{userName} في لمسات صباح ✨
          </h1>

          {/* Dynamic Message Content */}
          {isMorning ? (
            <div className={`space-y-3 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto ${
              isMorning ? 'text-slate-700 dark:text-rose-100/90' : 'text-rose-100/90'
            }`}>
              <p className="font-medium text-rose-800 dark:text-amber-200">
                مساحتك الخاصة للجمال والعناية بنفسك 🤍
              </p>
              <p>
                هنا كل تفصيلة معمولة عشان تساعدك تكتشفي جمالك بطريقتك… من روتين بشرة مناسب ليكي، لحد أسرار العناية بشعرك وجسمك، وماسكات طبيعية، سيرومات، ونصائح جمال موثوقة.
              </p>
              <p className="font-serif italic text-rose-700 dark:text-rose-300 pt-1">
                خدي وقتك… دلّلي نفسك… وخلي كل يوم بداية جديدة لنسخة أجمل منكِ. 🌸
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-base sm:text-lg md:text-xl text-rose-100/90 font-light leading-relaxed max-w-3xl mx-auto">
              <p className="font-medium text-amber-200">
                خدي لحظة لنفسك… وسيبي يومك وراه، وابدئي وقتك الخاص بالعناية والاهتمام بنفسك.
              </p>
              <p>
                دلّلي بشرتك، اهتمي بشعرك، واختاري روتينك اللي يخليكي تحسي بالراحة والجمال والثقة.
              </p>
              <p className="font-serif italic text-amber-300 pt-1">
                لأن أجمل وقت ممكن تقضيه… هو الوقت اللي بتختاري فيه نفسك. 🌸
              </p>
            </div>
          )}

          {/* Primary CTA Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={onOpenQuiz || onDiscoverClick}
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                isMorning
                  ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white shadow-rose-500/20'
                  : 'bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 hover:from-amber-500 hover:to-rose-500 text-slate-950 font-bold shadow-amber-400/20'
              }`}
            >
              <span>{isMorning ? 'اكتشفي عالمك الجمالي ✨' : 'ابدئي لحظتك الجميلة ✨'}</span>
              {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-rose-100 px-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-serif font-bold">وصول سريع لخدماتك الجمالية</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {quickActions.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-rose-500 group-hover:-translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
