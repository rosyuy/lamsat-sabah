/**
 * Lamsat Sabah | لمسات صباح - Daily Skin Check-In Component
 * Allows users to record daily skin condition and receive automatic routine safety guidance.
 */

import React, { useState } from 'react';
import { Sparkles, Heart, Droplet, ShieldCheck, CheckCircle2, AlertCircle, X, ArrowRight, Save } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

interface DailySkinCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToJournal?: () => void;
}

export const DailySkinCheckInModal: React.FC<DailySkinCheckInModalProps> = ({
  isOpen,
  onClose,
  onNavigateToJournal
}) => {
  const { t } = useLanguage();
  const { addJournalEntry } = useApp();

  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [skinRating, setSkinRating] = useState<number>(4);
  const [waterLiters, setWaterLiters] = useState<number>(2.0);
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [recommendation, setRecommendation] = useState<string>('');

  if (!isOpen) return null;

  const skinStatesList = [
    { id: 'dry', label: 'جافة ومشدودة 🌵' },
    { id: 'oily', label: 'دهنية بلمعان 💧' },
    { id: 'sensitive', label: 'حساسة ومتهيجة 🌸' },
    { id: 'redness', label: 'احمرار أو احتقان 🔴' },
    { id: 'breakouts', label: 'حبوب جديدة أو بثور ⚡' },
    { id: 'dull', label: 'شاحبة وفاقدة النضارة ☁️' },
    { id: 'dehydrated', label: 'عطشى وفاقدة المرونة 💦' },
    { id: 'smooth', label: 'مرتاحة ومتوازنة ✨' }
  ];

  const toggleState = (id: string) => {
    setSelectedStates(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate smart recommendation based on states
    let rec = 'روتينكِ اليومي مناسب جداً! حافظي على غسيل الوجه بالماء الفاتر والترطيب وواقي الشمس.';
    if (selectedStates.includes('dry') || selectedStates.includes('dehydrated')) {
      rec = 'بشرتكِ تحتاج ترطيباً مضاعفاً اليوم! استخدمي سيروم حمض الهيالورونيك على بشرة رطبة واتبعيه بكريم السيراميد، وتجنبي التقشير الكيميائي.';
    } else if (selectedStates.includes('redness') || selectedStates.includes('sensitive')) {
      rec = 'بشرتكِ متهيجة قليلاً! أوقفي مقشرات الفواكه والريتينول الليلة، واستخدمي جل الصبار النقية ومرطب خالٍ من العطور لحماية الحاجز.';
    } else if (selectedStates.includes('breakouts') || selectedStates.includes('oily')) {
      rec = 'للعناية بالمسام اليوم: استخدمي غسول بحمض الساليسيليك وسيروم النياسيناميد 5% لضبط الدهون دون جفاف.';
    }

    setRecommendation(rec);

    // Save to journal
    addJournalEntry({
      userId: 'usr-default',
      date: new Date().toISOString().split('T')[0],
      title: `فحص البشرة اليومي (${new Date().toLocaleDateString('ar-EG')})`,
      notes: `الحالة: ${selectedStates.join(', ')} | الملاحظات: ${notes || 'لا توجد ملاحظات خاصة.'}`,
      skinConditionRating: skinRating,
      waterIntakeLiters: waterLiters
    });

    setSavedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-rose-100 dark:border-rose-900/40 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!savedSuccess ? (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2 text-center pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>فحص بشرتي اليومي</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                إزاي بشرتك حاسة النهارده؟ ✨
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                حددي حالة بشرتكِ الحالية للحصول على نصيحة حماية فورية وتدوينها في سجل يومياتكِ.
              </p>
            </div>

            {/* Skin States Toggle Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                كيف تصفين شعور بشرتكِ اليوم؟
              </label>
              <div className="grid grid-cols-2 gap-2">
                {skinStatesList.map(st => {
                  const active = selectedStates.includes(st.id);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => toggleState(st.id)}
                      className={`p-3 rounded-2xl text-xs font-medium border text-right transition-all cursor-pointer ${
                        active
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-rose-50/50'
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>تقييمكِ العام لنضارة البشرة اليوم:</span>
                <span className="text-rose-600 font-bold">{skinRating} / 5 ⭐</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={skinRating}
                onChange={e => setSkinRating(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Water Liters */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>كمية الماء التي شربتيها حتى الآن:</span>
                <span className="text-sky-600 font-bold">{waterLiters} ليتر 💧</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.5"
                value={waterLiters}
                onChange={e => setWaterLiters(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                إيه أكتر حاجة لاحظتيها في بشرتك النهارده؟ (اختياري)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="مثال: جفاف حول الفم، أو إشراقة بعد ماسك الشوفان..."
                rows={2}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>تسجيل فحص اليوم واحفظ في سجل اليوميات</span>
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-800">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                تم تسجيل فحص بشرتكِ بنجاح! 🌸
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تمت إضافة هذه الملاحظات إلى دفتر يوميات الجمال الخاص بكِ.
              </p>
            </div>

            {/* Custom Recommendation */}
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-slate-800 border border-rose-200 dark:border-slate-700 text-right space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>التوجيه الذكي المخصص لبشرتكِ اليوم:</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                {recommendation}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                إغلاق الفحص
              </button>
              {onNavigateToJournal && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToJournal();
                  }}
                  className="flex-1 py-3 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors cursor-pointer"
                >
                  فتح دفتر اليوميات 🔒
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
