/**
 * Lamsat Sabah | لمسات صباح - Editorial Luxury Footer
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Share2, 
  Send, 
  ShieldCheck, 
  Heart, 
  BookOpen, 
  Info, 
  Mail,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenMessaging?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenMessaging }) => {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const socialLinks = [
    { name: 'Instagram', handle: '@thesabahedit', url: 'https://www.instagram.com/thesabahedit?igsh=dGNmeGJqaXkwcjc5', icon: Instagram, color: 'hover:text-pink-500' },
    { name: 'Facebook Profile', handle: 'Lamsat Sabah Profile', url: 'https://www.facebook.com/share/1FAtj8k8db/', icon: Facebook, color: 'hover:text-blue-500' },
    { name: 'Facebook Page', handle: 'Lamsat Sabah Page', url: 'https://www.facebook.com/share/1T4Q7qiBER/', icon: Facebook, color: 'hover:text-blue-600' },
    { name: 'WhatsApp Channel', handle: 'WhatsApp Channel', url: 'https://www.whatsapp.com/channel/0029VbCL3nP1noz1mQPDyl42', icon: MessageCircle, color: 'hover:text-emerald-500' },
    { name: 'Snapchat', handle: '@thesabahedit', url: 'https://www.snapchat.com/@thesabahedit?share_id=nN-olLQ37T4&locale=en-GB', icon: Share2, color: 'hover:text-yellow-400' },
    { name: 'TikTok', handle: '@thesabahedit', url: 'https://www.tiktok.com/@thesabahedit?_r=1&_t=ZS-98KcmSKV7oG', icon: Send, color: 'hover:text-cyan-400' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-rose-950 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/60 border border-rose-900/40 rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-900/60 text-rose-200 text-xs font-semibold border border-rose-800/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('newsletterTitle')}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              {t('newsletterTitle')}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {t('newsletterSubtitle')}
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="اسمك البريدي... / enter your email"
                className="w-full px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:border-amber-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                {t('subscribe')}
              </button>
            </form>

            {subscribed && (
              <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-4 py-2 rounded-lg animate-in fade-in duration-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>شكرًا لانضمامكِ لـ لمسات صباح! تم تسجيل بريدكِ بنجاح ✨</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white tracking-tight">لمسات صباح</span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-amber-400 font-semibold">Lamsat Sabah</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
              {t('heroSubtitle')}
            </p>

            {/* Social Icons Animated */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-3">
                تابعونا عبر منصاتنا الرسمية
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.name}
                      className={`p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 ${item.color} transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <IconComp className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Categories Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
              الأقسام الرئيسية
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('skin-care')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('skinCare')}</button></li>
              <li><button onClick={() => onNavigate('hair-care')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('hairCare')}</button></li>
              <li><button onClick={() => onNavigate('body-care')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('bodyCare')}</button></li>
              <li><button onClick={() => onNavigate('hand-care')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('handCare')}</button></li>
              <li><button onClick={() => onNavigate('foot-care')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('footCare')}</button></li>
              <li><button onClick={() => onNavigate('natural-masks')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('naturalMasks')}</button></li>
            </ul>
          </div>

          {/* Encyclopedias & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
              الموسوعات والأدوات
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('serums')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('serums')}</button></li>
              <li><button onClick={() => onNavigate('ingredients')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('ingredients')}</button></li>
              <li><button onClick={() => onNavigate('daily-tips')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('dailyTips')}</button></li>
              <li><button onClick={() => onNavigate('encyclopedia')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('beautyEncyclopedia')}</button></li>
              <li><button onClick={() => onNavigate('routines')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('routines')}</button></li>
              <li><button onClick={() => onNavigate('beauty-journal')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('beautyJournal')}</button></li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
              عن المنصة والشروط
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('about')} className="hover:text-rose-300 transition-colors cursor-pointer">عن لمسات صباح</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-rose-300 transition-colors cursor-pointer">تواصل الشراكات والتعاونات</button></li>
              <li><button onClick={() => onNavigate('privacy-policy')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('privacyPolicy')}</button></li>
              <li><button onClick={() => onNavigate('terms-of-service')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('termsOfService')}</button></li>
              <li><button onClick={() => onNavigate('cookie-policy')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('cookiePolicy')}</button></li>
              <li><button onClick={() => onNavigate('disclaimer')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('disclaimer')}</button></li>
              <li><button onClick={() => onNavigate('copyright-notice')} className="hover:text-rose-300 transition-colors cursor-pointer">{t('copyrightNotice')}</button></li>
            </ul>

            <div className="pt-2 border-t border-slate-900">
              <span className="text-[10px] text-slate-500 block">للتواصل والتعاونات الرسمية:</span>
              <button 
                onClick={() => {
                  if (onOpenMessaging) {
                    onOpenMessaging();
                  } else {
                    onNavigate('contact');
                  }
                }}
                className="text-xs text-rose-300 hover:text-rose-200 font-medium cursor-pointer transition-colors block mt-1 hover:underline text-start"
              >
                تواصل عبر نموذج التعاونات المباشر ✉️
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal Attribution Line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-start">
            © {new Date().getFullYear()} {t('allRightsReserved')} | <span className="text-rose-400 font-mono">@thesabahedit</span>
          </p>

          <p className="text-slate-500 text-[11px] max-w-md text-center md:text-end leading-relaxed">
            جميع المقالات، الخلطات الطبيعية، الروتينات والتصميمات محمية بموجب قوانين الملكية الفكرية وحقوق النشر الرسمية لـ لمسات صباح.
          </p>
        </div>

      </div>
    </footer>
  );
};
