/**
 * Lamsat Sabah | لمسات صباح - Public Contact & Collaboration Page
 * Public contact page adhering strictly to privacy guidelines:
 * 1. Admin email is never exposed in plain text.
 * 2. "تعاون مع لمسات صباح / Collaborate with Lamsat Sabah" button with Instagram and Collaboration Email options.
 * 3. Beauty questions use ONLY private messaging: "ابعتيلي رسالتك الخاصة 🤍".
 * 4. User login validation before sending, with privacy notice:
 *    "رسالتك خاصة وآمنة، ولن يتمكن من رؤيتها إلا أنتِ ولمسات صباح."
 */

import React, { useState } from 'react';
import { Mail, Instagram, MessageSquare, Send, CheckCircle2, Sparkles, Lock, ShieldCheck, Heart, LogIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/AuthModal';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { sendPrivateMessage } = useApp();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [collabModalOpen, setCollabModalOpen] = useState(false);

  // Private Message State
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [msgSentSuccess, setMsgSentSuccess] = useState(false);

  // Collaboration Form State
  const [collabName, setCollabName] = useState('');
  const [collabEmail, setCollabEmail] = useState('');
  const [collabBrand, setCollabBrand] = useState('');
  const [collabType, setCollabType] = useState('Brand Collaborations');
  const [collabText, setCollabText] = useState('');
  const [collabSuccess, setCollabSuccess] = useState(false);

  const handlePrivateMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (msgSubject.trim() && msgBody.trim()) {
      sendPrivateMessage(msgSubject, msgBody, user.email, user.name);
      setMsgSentSuccess(true);
      setMsgSubject('');
      setMsgBody('');
      setTimeout(() => setMsgSentSuccess(false), 5000);
    }
  };

  const handleCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (collabName.trim() && collabEmail.trim() && collabText.trim()) {
      const fullText = `[طلب تعاون رسمى: ${collabType}] | [العلامة/الشركة: ${collabBrand || 'غير محدد'}]\n\n${collabText}`;
      sendPrivateMessage(`طلب تعاون شراكة: ${collabType}`, fullText, collabEmail, collabName);
      setCollabSuccess(true);
      setCollabName('');
      setCollabEmail('');
      setCollabBrand('');
      setCollabText('');
      setTimeout(() => {
        setCollabSuccess(false);
        setCollabModalOpen(false);
      }, 4000);
    }
  };

  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto px-4">
      
      {/* Auth Modal Trigger */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Main Page Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-4 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>تواصل لمسات صباح الآمن</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          تواصل الشراكات والرسائل الخصوصية
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl mx-auto">
          نرحب بطلبات الشراكات والتعاونات التجارية الرسمية، ونقدم للعضوات مساحة سرية مشفرة بالكامل للاستفسارات التجميلية الخاصة.
        </p>

        {/* Primary Action Button: Collaboration */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setCollabModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-serif font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center gap-2.5"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>تعاون مع لمسات صباح | Collaborate with Lamsat Sabah</span>
          </button>
        </div>
      </div>

      {/* Section 1: Beauty Questions (Private Messaging ONLY) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-rose-100 dark:border-slate-700 shadow-lg space-y-6">
        
        <div className="border-b border-slate-100 dark:border-slate-700 pb-4 space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              <span>ابعتيلي رسالتك الخاصة 🤍</span>
            </h2>

            <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800/60 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-rose-500" />
              <span>مساحة سرية ومحمية</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            للاستفسارات التجميلية، مشاكل البشرة، أو الاستشارات الشديدة الخصوصية، يرجى كتابة رسالتكِ أدناه.
          </p>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>"رسالتك خاصة وآمنة، ولن يتمكن من رؤيتها إلا أنتِ ولمسات صباح."</span>
          </div>
        </div>

        {/* Private Messaging Form */}
        {!user ? (
          <div className="p-8 rounded-3xl bg-amber-50/60 dark:bg-slate-900/80 border border-amber-200/80 dark:border-slate-700 text-center space-y-4">
            <Lock className="w-10 h-10 text-amber-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                يرجى تسجيل الدخول أولاً لإرسال رسالتكِ الخصوصية
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                لحماية خصوصيتكِ وضمان توجيه الرد إليكِ مباشرة في صندوق رسائلكِ الخاص.
              </p>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول / إنشاء حساب</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handlePrivateMessageSubmit} className="space-y-4">
            {msgSentSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>تم إرسال رسالتكِ الخصوصية بنجاح! ستتلقين رد الإدارة في صندوق استفساراتكِ الخاص ✨</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                موضوع الاستفسار الجمالي *
              </label>
              <input
                type="text"
                value={msgSubject}
                onChange={e => setMsgSubject(e.target.value)}
                placeholder="مثال: استفسار حول سيروم الريتينول للبشرة الحساسة..."
                required
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                نص الرسالة والتفاصيل الخاصة *
              </label>
              <textarea
                value={msgBody}
                onChange={e => setMsgBody(e.target.value)}
                placeholder="اكتبي تفاصيل حالتكِ أو سؤالكِ بكل حرية وثقة..."
                rows={5}
                required
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الرسالة السرية لـ لمسات صباح</span>
            </button>
          </form>
        )}

      </div>

      {/* Collaboration Modal Dialog */}
      {collabModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative">
            
            <button
              onClick={() => setCollabModalOpen(false)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تعاون مع لمسات صباح</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                خيارات التعاون والشراكات الرسمية
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                اختر الوسيلة المناسبة للتواصل والتنسيق التجاري مع منصة لمسات صباح.
              </p>
            </div>

            {/* Option 1: Official Instagram Link */}
            <div className="p-4 rounded-2xl bg-pink-50/80 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">1. حساب الانستغرام الرسمي</span>
                  <span className="text-[11px] text-pink-700 dark:text-pink-300 font-mono">@thesabahedit</span>
                </div>
              </div>

              <a
                href="https://www.instagram.com/thesabahedit?igsh=dGNmeGJqaXkwcjc5"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold cursor-pointer whitespace-nowrap shadow-xs"
              >
                زيارة الحساب ↗
              </a>
            </div>

            {/* Option 2: Collaboration Form (Without exposing plain text email) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500" />
                <span className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                  2. نموذج البريد الإلكتروني الرسمي للتعاونات
                </span>
              </div>

              {collabSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>تم استلام طلب الشراكة والتعاون بنجاح! وسيرد عليكِ فريق الأعمال في أقرب وقت. ✨</span>
                </div>
              ) : (
                <form onSubmit={handleCollabSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={collabName}
                      onChange={e => setCollabName(e.target.value)}
                      placeholder="اسمكِ أو اسم الممثل *"
                      required
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                    <input
                      type="email"
                      value={collabEmail}
                      onChange={e => setCollabEmail(e.target.value)}
                      placeholder="البريد الإلكتروني للرد *"
                      required
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={collabBrand}
                      onChange={e => setCollabBrand(e.target.value)}
                      placeholder="اسم العلامة التجارية / الشركة"
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                    <select
                      value={collabType}
                      onChange={e => setCollabType(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                    >
                      <option value="Brand Collaborations">Brand Collaborations (تعاونات تجارية)</option>
                      <option value="Beauty Partnerships">Beauty Partnerships (شراكات جمالية)</option>
                      <option value="Sponsored Content">Sponsored Content (محتوى برعايات)</option>
                      <option value="Product Reviews">Product Reviews (مراجعات المنتجات)</option>
                    </select>
                  </div>

                  <textarea
                    value={collabText}
                    onChange={e => setCollabText(e.target.value)}
                    placeholder="اكتبي تفاصيل اقتراح التعاون..."
                    rows={4}
                    required
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال طلب التعاون بأمان</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
