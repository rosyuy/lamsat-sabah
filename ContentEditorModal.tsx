/**
 * Lamsat Sabah | لمسات صباح - Full Mobile-Responsive Admin Content Editor Modal
 * Allows Creating, Editing, Publishing, Scheduling, Unpublishing, Pinning, Translating Content.
 */

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Save, 
  Send, 
  Clock, 
  Trash2, 
  Globe, 
  Bell, 
  Image as ImageIcon, 
  Tag, 
  Languages, 
  CheckCircle2, 
  Pin, 
  Eye, 
  AlertTriangle,
  Sliders,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Language, NotificationCategory } from '../types';

export type ContentType = 
  | 'beauty_tips'
  | 'morning_messages'
  | 'evening_messages'
  | 'daily_messages'
  | 'beauty_advice'
  | 'skincare'
  | 'haircare'
  | 'body_care'
  | 'hand_care'
  | 'foot_care'
  | 'articles'
  | 'masks'
  | 'serums'
  | 'routines';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: any;
  onSave?: (savedItem: any) => void;
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({ 
  isOpen, 
  onClose, 
  initialContent,
  onSave 
}) => {
  const { t } = useLanguage();
  const { addNotificationForUser } = useApp();

  const [contentType, setContentType] = useState<ContentType>(initialContent?.contentType || 'beauty_tips');
  
  // Multilingual State (ar, en, fr, tr, ko)
  const [titles, setTitles] = useState<Record<Language, string>>({
    ar: initialContent?.title?.ar || initialContent?.title || '',
    en: initialContent?.title?.en || '',
    fr: initialContent?.title?.fr || '',
    tr: initialContent?.title?.tr || '',
    ko: initialContent?.title?.ko || '',
  });

  const [shortDescriptions, setShortDescriptions] = useState<Record<Language, string>>({
    ar: initialContent?.shortDescription?.ar || initialContent?.summary?.ar || '',
    en: initialContent?.shortDescription?.en || initialContent?.summary?.en || '',
    fr: initialContent?.shortDescription?.fr || '',
    tr: initialContent?.shortDescription?.tr || '',
    ko: initialContent?.shortDescription?.ko || '',
  });

  const [fullContents, setFullContents] = useState<Record<Language, string>>({
    ar: initialContent?.content?.ar || initialContent?.content || initialContent?.definition?.ar || '',
    en: initialContent?.content?.en || initialContent?.definition?.en || '',
    fr: initialContent?.content?.fr || '',
    tr: initialContent?.content?.tr || '',
    ko: initialContent?.content?.ko || '',
  });

  const [professionalTips, setProfessionalTips] = useState<Record<Language, string>>({
    ar: initialContent?.professionalTip?.ar || '',
    en: initialContent?.professionalTip?.en || '',
    fr: '', tr: '', ko: ''
  });

  const [warnings, setWarnings] = useState<Record<Language, string>>({
    ar: initialContent?.warning?.ar || '',
    en: initialContent?.warning?.en || '',
    fr: '', tr: '', ko: ''
  });

  const [category, setCategory] = useState<string>(initialContent?.category || 'skincare');
  const [coverImage, setCoverImage] = useState<string>(initialContent?.imageUrl || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800');
  const [tags, setTags] = useState<string>(initialContent?.tags ? initialContent.tags.join(', ') : 'بشرة, نضارة, سيروم');
  const [activeLangTab, setActiveLangTab] = useState<Language>('ar');
  
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled' | 'unpublished'>(initialContent?.status || 'published');
  const [isPinned, setIsPinned] = useState<boolean>(Boolean(initialContent?.isPinned));
  const [publishDate, setPublishDate] = useState<string>(initialContent?.publishDate || new Date().toISOString().split('T')[0]);
  const [scheduleDate, setScheduleDate] = useState<string>(initialContent?.scheduledFor || '');
  const [sendNotification, setSendNotification] = useState<boolean>(true);

  const [isTranslating, setIsTranslating] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const categoriesList = [
    { id: 'skincare', label: 'العناية بالبشرة (Skincare)' },
    { id: 'haircare', label: 'العناية بالشعر (Haircare)' },
    { id: 'body-care', label: 'العناية بالجسم (Body Care)' },
    { id: 'hand-care', label: 'العناية باليدين (Hand Care)' },
    { id: 'foot-care', label: 'العناية بالقدمين (Foot Care)' },
    { id: 'natural-beauty', label: 'جمال طبيعي (Natural Beauty)' },
    { id: 'morning', label: 'إشراقات الصباح (Morning)' },
    { id: 'night', label: 'تأملات المساء (Night)' },
    { id: 'summer', label: 'عناية الصيف (Summer)' },
    { id: 'winter', label: 'عناية الشتاء (Winter)' },
    { id: 'self-care', label: 'العناية الذاتية (Self Care)' },
    { id: 'beauty-routine', label: 'الروتين الجمالي (Routine)' },
    { id: 'ingredients', label: 'المكونات الفعالة (Ingredients)' },
    { id: 'serums', label: 'السيرومات والزيوت (Serums)' },
    { id: 'masks', label: 'الماسكات المغذية (Masks)' },
    { id: 'sun-protection', label: 'الحماية من الشمس (Sun Protection)' },
    { id: 'hydration', label: 'الترطيب العميق (Hydration)' },
    { id: 'sensitive-skin', label: 'البشرة الحساسة (Sensitive)' },
    { id: 'dry-skin', label: 'البشرة الجافة (Dry Skin)' },
    { id: 'oily-skin', label: 'البشرة الدهنية (Oily Skin)' },
    { id: 'combination-skin', label: 'البشرة المختلطة (Combination)' },
    { id: 'acne-prone', label: 'البشرة المعرضة للحبوب (Acne-Prone)' },
    { id: 'hair-growth', label: 'إنبات الشعر (Hair Growth)' },
    { id: 'damaged-hair', label: 'الشعر التالف (Damaged Hair)' },
    { id: 'curly-hair', label: 'الشعر الكيرلي (Curly Hair)' },
    { id: 'scalp-care', label: 'صحة الفروة (Scalp Care)' },
    { id: 'nail-care', label: 'العناية بالأظافر (Nail Care)' }
  ];

  // Simulated Auto Translation across languages
  const handleAutoTranslate = () => {
    setIsTranslating(true);

    const baseTitle = titles.ar || 'نصيحة جمالية من لمسات صباح';
    const baseDesc = shortDescriptions.ar || 'إرشادات خبيرة لنضارة وصحة البشرة والشعر.';
    const baseContent = fullContents.ar || 'تأكدي دائماً من ترطيب بشرتكِ بانتظام وتطبيق واقي الشمس لحمايتها من العوامل الخارجية.';

    setTimeout(() => {
      setTitles(prev => ({
        ...prev,
        en: prev.en || `Lamsat Sabah Beauty Guide: ${baseTitle}`,
        fr: prev.fr || `Guide de Beauté Lamsat Sabah: ${baseTitle}`,
        tr: prev.tr || `Lamsat Sabah Güzellik Rehberi: ${baseTitle}`,
        ko: prev.ko || `람삿 صباح 뷰티 가이드: ${baseTitle}`
      }));

      setShortDescriptions(prev => ({
        ...prev,
        en: prev.en || baseDesc,
        fr: prev.fr || `Conseils d'experts pour une peau et des cheveux éclatants.`,
        tr: prev.tr || `Işıltılı cilt ve saçlar için uzman tavsiyeleri.`,
        ko: prev.ko || `빛나는 피부와 모발을 위한 전문가 팁.`
      }));

      setFullContents(prev => ({
        ...prev,
        en: prev.en || baseContent,
        fr: prev.fr || `Assurez-vous toujours d'hydrater votre peau régulièrement et d'appliquer de la crème solaire.`,
        tr: prev.tr || `Cildinizi her zaman düzenli olarak nemlendirdiğinizden ve güneş kremi sürdüğünüzden emin olun.`,
        ko: prev.ko || `항상 피부에 수분을 충분히 공급하고 자외선 차단제를 바르세요.`
      }));

      setIsTranslating(false);
    }, 1000);
  };

  const handleAction = (actionStatus: 'draft' | 'published' | 'scheduled' | 'unpublished') => {
    if (!titles.ar.trim()) {
      alert('يرجى إدخال عنوان محتوى باللغة العربية كحد أدنى.');
      return;
    }

    const compiledItem = {
      id: initialContent?.id || `content-${Date.now()}`,
      contentType,
      title: titles,
      shortDescription: shortDescriptions,
      content: fullContents,
      professionalTip: professionalTips,
      warning: warnings,
      category,
      imageUrl: coverImage,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      status: actionStatus,
      isPinned,
      publishedAt: actionStatus === 'published' ? new Date().toISOString() : publishDate,
      scheduledFor: actionStatus === 'scheduled' ? scheduleDate : undefined,
      createdAt: initialContent?.createdAt || new Date().toISOString()
    };

    if (onSave) {
      onSave(compiledItem);
    }

    // Trigger Notification if Published & Notification Toggle is ON
    if (actionStatus === 'published' && sendNotification) {
      let notifCategory: NotificationCategory = 'beauty_tips';
      if (contentType === 'morning_messages') notifCategory = 'morning_messages';
      else if (contentType === 'evening_messages') notifCategory = 'evening_messages';
      else if (contentType === 'daily_messages') notifCategory = 'daily_messages';
      else if (contentType === 'articles') notifCategory = 'articles';
      else if (contentType === 'masks') notifCategory = 'masks';
      else if (contentType === 'serums') notifCategory = 'serums';
      else if (contentType === 'routines') notifCategory = 'routines';

      addNotificationForUser(
        'all',
        `محتوى جديد: ${titles.ar}`,
        shortDescriptions.ar || 'تم نشر محتوى جديد ومميز في لمسات صباح. اضغطي للاطلاع عليه ✨',
        'content_update',
        notifCategory
      );
    }

    setSaveSuccessMsg(`تم ${actionStatus === 'published' ? 'نشر' : actionStatus === 'scheduled' ? 'جدولة' : actionStatus === 'draft' ? 'حفظ مسودة' : 'تحديث'} المحتوى بنجاح! ✨`);
    setTimeout(() => {
      setSaveSuccessMsg(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white border-b border-rose-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300 border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg">
                {initialContent ? 'تعديل المحتوى التحريري' : 'محرر نشر المحتوى الذكي (Mobile Friendly)'}
              </h3>
              <span className="text-[10px] text-rose-200/80 block">نظام إدارة النشر، الترجمات والتنبيهات المباشرة</span>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-rose-200 hover:text-white rounded-xl hover:bg-white/10 cursor-pointer transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast Banner */}
        {saveSuccessMsg && (
          <div className="p-3 bg-emerald-500 text-white text-xs font-bold text-center animate-in slide-in-from-top">
            {saveSuccessMsg}
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Row 1: Content Type & Category Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-rose-500" />
                <span>نوع المحتوى والنشاط *</span>
              </label>
              <select
                value={contentType}
                onChange={e => setContentType(e.target.value as ContentType)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="beauty_tips">نصيحة جمالية (Beauty Tip)</option>
                <option value="morning_messages">رسائل الصباح ✨ (Morning Message)</option>
                <option value="evening_messages">رسائل المساء 🌙 (Evening Message)</option>
                <option value="daily_messages">رسائل يومية (Daily Message)</option>
                <option value="beauty_advice">إرشادات الجمال (Beauty Advice)</option>
                <option value="skincare">مقالة العناية بالبشرة (Skincare Article)</option>
                <option value="haircare">مقالة العناية بالشعر (Haircare Article)</option>
                <option value="body_care">العناية بالجسم (Body Care)</option>
                <option value="hand_care">العناية باليدين (Hand Care)</option>
                <option value="foot_care">العناية بالقدمين (Foot Care)</option>
                <option value="articles">مقالة تحريرية (Article)</option>
                <option value="masks">ماسك طبيعي (Natural Mask)</option>
                <option value="serums">سيروم وزيوت (Serum)</option>
                <option value="routines">جدول روتين (Routine)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-amber-500" />
                <span>الفئة المحددة (27+ فئة) *</span>
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white cursor-pointer"
              >
                {categoriesList.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Multilingual Translation Tabs Header */}
          <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">لغات الترجمة المعتمدة</span>
              </div>

              <button
                type="button"
                onClick={handleAutoTranslate}
                disabled={isTranslating}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[11px] font-bold shadow-xs hover:opacity-90 cursor-pointer flex items-center gap-1"
              >
                <Globe className={`w-3.5 h-3.5 ${isTranslating ? 'animate-spin' : ''}`} />
                <span>{isTranslating ? 'جاري الترجمة...' : 'ترجمة تلقائية للغات الأخرى 🌐'}</span>
              </button>
            </div>

            {/* Language Selector Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'ar', label: 'العربية (AR)' },
                { id: 'en', label: 'English (EN)' },
                { id: 'fr', label: 'Français (FR)' },
                { id: 'tr', label: 'Türkçe (TR)' },
                { id: 'ko', label: '한국어 (KO)' },
              ].map(lang => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setActiveLangTab(lang.id as Language)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    activeLangTab === lang.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Dynamic Text Inputs for Active Language */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  عنوان المحتوى ({activeLangTab.toUpperCase()}) *
                </label>
                <input
                  type="text"
                  value={titles[activeLangTab] || ''}
                  onChange={e => setTitles({ ...titles, [activeLangTab]: e.target.value })}
                  placeholder={`أدخلي العنوان بـ ${activeLangTab}...`}
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  الوصف القصير / الملخص ({activeLangTab.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={shortDescriptions[activeLangTab] || ''}
                  onChange={e => setShortDescriptions({ ...shortDescriptions, [activeLangTab]: e.target.value })}
                  placeholder="ملخص موجز يظهر في القوائم والإشعارات..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  المحتوى والشرح التفصيلي الكامل ({activeLangTab.toUpperCase()}) *
                </label>
                <textarea
                  value={fullContents[activeLangTab] || ''}
                  onChange={e => setFullContents({ ...fullContents, [activeLangTab]: e.target.value })}
                  placeholder="اكتبي نص المحتوى والتعليمات خطوة بخطوة..."
                  rows={4}
                  className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-rose-500 leading-relaxed"
                />
              </div>

              {/* Professional Tip & Warning Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                    سر الخبراء / Professional Tip
                  </label>
                  <input
                    type="text"
                    value={professionalTips[activeLangTab] || ''}
                    onChange={e => setProfessionalTips({ ...professionalTips, [activeLangTab]: e.target.value })}
                    placeholder="نصيحة خبيرة إضافية..."
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-rose-600 dark:text-rose-400 block">
                    تنبيه السلامة / Safety Warning
                  </label>
                  <input
                    type="text"
                    value={warnings[activeLangTab] || ''}
                    onChange={e => setWarnings({ ...warnings, [activeLangTab]: e.target.value })}
                    placeholder="تنبيه أو اختبار حساس..."
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Media & Metadata Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span>رابط صوة الغلاف (Cover Image)</span>
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={e => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-purple-500" />
                <span>الوسوم والتصنيفات (تفصل بفاصلة)</span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="بشرة, سيروم, نضارة..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
              />
            </div>
          </div>

          {/* Publishing, Scheduling & Notification Options */}
          <div className="p-4 rounded-3xl bg-amber-50/60 dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>إعدادات جدولة النشر والإشعارات المباشرة</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">تاريخ النشر المباشر</label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={e => setPublishDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">تاريخ الجدولة المستقبلية</label>
                <input
                  type="datetime-local"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 my-auto">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">تثبيت بالقمة 📌</span>
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={e => setIsPinned(e.target.checked)}
                  className="w-4 h-4 rounded-md accent-rose-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Notification Toggle Switch */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-rose-500 animate-bounce" />
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">إرسال إشعار فوري للعضوات المشتركات</span>
                  <span className="text-[10px] text-slate-500">يصل التنبيه تلقائياً إلى مركز إشعارات الفئة المحددة.</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={sendNotification}
                onChange={e => setSendNotification(e.target.checked)}
                className="w-5 h-5 rounded-md accent-rose-600 cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Modal Action Footer Buttons */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleAction('draft')}
              className="px-4 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>حفظ كمسودة (Save Draft)</span>
            </button>

            {initialContent && (
              <button
                type="button"
                onClick={() => handleAction('unpublished')}
                className="px-3 py-2.5 rounded-2xl bg-amber-100 text-amber-900 text-xs font-bold cursor-pointer hover:bg-amber-200"
              >
                إلغاء النشر
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {scheduleDate && (
              <button
                type="button"
                onClick={() => handleAction('scheduled')}
                className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <Clock className="w-4 h-4" />
                <span>جدولة النشر (Schedule)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handleAction('published')}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>نشر الآن (Publish)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
