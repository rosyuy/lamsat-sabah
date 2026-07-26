/**
 * Lamsat Sabah | لمسات صباح - Interactive Beauty Quiz Modal
 */

import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, BookmarkPlus, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Routine } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const { t, language, isRTL } = useLanguage();
  const { toggleFavorite, isFavorite } = useApp();

  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('combination');
  const [hairType, setHairType] = useState('wavy');
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [concerns, setConcerns] = useState<string[]>(['pigmentation', 'dehydration']);
  const [climate, setClimate] = useState('hot_dry');
  const [lifestyle, setLifestyle] = useState('office');
  const [generatedRoutines, setGeneratedRoutines] = useState<Routine[] | null>(null);

  if (!isOpen) return null;

  const toggleConcern = (item: string) => {
    setConcerns(prev => 
      prev.includes(item) ? prev.filter(c => c !== item) : [...prev, item]
    );
  };

  const handleGenerate = () => {
    const routines: Routine[] = [
      {
        id: 'rtn-gen-morg',
        title: {
          ar: `روتين الصباح المخصص للبشرة الـ ${skinType}`,
          en: `Customized Morning Routine for ${skinType} skin`
        },
        type: 'morning',
        skinType,
        hairType,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
        steps: [
          { stepNumber: 1, title: { ar: 'التنظيف اللطيف', en: 'Gentle Cleansing' }, description: { ar: 'استخدمي غسولاً متوازناً خافض للرغوة بماء فاتر.', en: 'Cleanse with a pH balanced foam.' } },
          { stepNumber: 2, title: { ar: 'السيروم المرطب', en: 'Hydrating Serum' }, description: { ar: 'ضعي سيروم الهيالورونيك أو النياسيناميد على بشرة ندية.', en: 'Apply Hyaluronic acid serum on damp skin.' } },
          { stepNumber: 3, title: { ar: 'المرطب وحماية الشمس', en: 'Moisturizer & SPF 50' }, description: { ar: 'أقفلي الرطوبة بكريم خفيف ثم واقي الشمس واسع الطيف.', en: 'Seal with lightweight moisturizer and broad-spectrum SPF 50.' } }
        ]
      },
      {
        id: 'rtn-gen-night',
        title: {
          ar: `روتين المساء المكثف لإنعاش البشرة الـ ${skinType}`,
          en: `Night Renewal Routine for ${skinType} skin`
        },
        type: 'night',
        skinType,
        hairType,
        imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
        steps: [
          { stepNumber: 1, title: { ar: 'التنظيف المزدوج', en: 'Double Cleansing' }, description: { ar: 'استخدمي زيت تنظيف ثم غسول مائي لإزالة الأتربة كلياً.', en: 'Oil cleanser followed by gel cleanser.' } },
          { stepNumber: 2, title: { ar: 'العلاج الموجه (الريتينول أو الببتيدات)', en: 'Active Treatment' }, description: { ar: 'ضعي السيروم المعالج لمقاومة التجاعيد والبقع.', en: 'Targeted serum for elasticity and dark spots.' } },
          { stepNumber: 3, title: { ar: 'الكريم المغذي العميق', en: 'Nourishing Night Cream' }, description: { ar: 'دلكي كريم السيراميد لمنع فقدان الرطوبة أثناء النوم.', en: 'Ceramide cream to lock barrier moisture.' } }
        ]
      },
      {
        id: 'rtn-gen-week',
        title: {
          ar: `الروتين الأسبوعي والعناية بالشعر الـ ${hairType}`,
          en: `Weekly Care & Hair Therapy for ${hairType} hair`
        },
        type: 'weekly',
        skinType,
        hairType,
        imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        steps: [
          { stepNumber: 1, title: { ar: 'ماسك الشوفان والعسل أو ماسك الشعر', en: 'Oat Mask & Hair Treatment' }, description: { ar: 'طبقي ماسك طبيعي مناسب مرتين أسبوعياً لـ 20 دقيقة.', en: 'Apply natural mask twice weekly for 20 minutes.' } },
          { stepNumber: 2, title: { ar: 'التقشير الكيميائي اللطيف BHA/AHA', en: 'Gentle Exfoliation' }, description: { ar: 'استخدمي حمض الساليسيليك أو الجليكوليك لإزالة الخلايا الميتة.', en: 'Gently exfoliate dead cells once or twice a week.' } }
        ]
      }
    ];

    setGeneratedRoutines(routines);
    setStep(7); // Result View
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-rose-900/40 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-300" />
            <div>
              <h3 className="font-serif font-bold text-lg">{t('beautyQuiz')}</h3>
              <p className="text-xs text-amber-200/90">اختبار لمسات صباح لتصميم روتينكِ الشخصي</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-amber-200/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-rose-100">1. ما هو نوع بشرتكِ الحالي؟</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'normal', title: 'عادية (Normal)', desc: 'متوازنة لا تشعرين بالشد أو اللمعان الزائد' },
                  { id: 'dry', title: 'جافة (Dry)', desc: 'مشدودة وقد تتقشر وتفتقر للزيوت' },
                  { id: 'oily', title: 'دهنية (Oily)', desc: 'لماعية مستمرة مع مسام متسعة' },
                  { id: 'combination', title: 'مختلطة (Combination)', desc: 'دهنية في منطقة T وجافة/عادية بالخدين' },
                  { id: 'sensitive', title: 'حساسة (Sensitive)', desc: 'سريعة الاحمرار والتهيج من المنتجات' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSkinType(item.id)}
                    className={`p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                      skinType === item.id 
                        ? 'border-rose-600 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold shadow-xs' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-300'
                    }`}
                  >
                    <div className="text-sm">{item.title}</div>
                    <div className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-rose-100">2. ما هو نوع ونمط شعركِ؟</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'straight', title: 'ناعم مستقيم (Straight)' },
                  { id: 'wavy', title: 'مموج (Wavy)' },
                  { id: 'curly', title: 'كيرلي مجعد (Curly)' },
                  { id: 'dry_damaged', title: 'متقصف وتالف (Damaged)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setHairType(item.id)}
                    className={`p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                      hairType === item.id 
                        ? 'border-rose-600 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-sm">{item.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-rose-100">3. ما هي الفئة العمرية؟</h4>
              <div className="grid grid-cols-2 gap-3">
                {['أقل من 20 سنة', '20 - 29 سنة', '30 - 39 سنة', '40 سنة فأكثر'].map((ag, i) => (
                  <button
                    key={i}
                    onClick={() => setAgeGroup(ag)}
                    className={`p-4 rounded-2xl border text-center text-sm font-semibold transition-all cursor-pointer ${
                      ageGroup === ag 
                        ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {ag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-rose-100">4. ما هي اهتماماتكِ الجمالية الرئيسية؟ (يمكنكِ اختيار أكثر من خيار)</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'pigmentation', title: 'التصبغات والبقع' },
                  { id: 'acne', title: 'حب الشباب والمسام' },
                  { id: 'wrinkles', title: 'التجاعيد والخطوط' },
                  { id: 'dehydration', title: 'الجفاف وفقدان النضارة' },
                  { id: 'hairloss', title: 'تساقط وفراغات الشعر' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleConcern(item.id)}
                    className={`p-4 rounded-2xl border text-start text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      concerns.includes(item.id)
                        ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{item.title}</span>
                    {concerns.includes(item.id) && <Check className="w-4 h-4 text-rose-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-rose-100">5. ما هو المناخ والطقس في منطقتكِ؟</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'hot_dry', title: 'حار وجاف' },
                  { id: 'hot_humid', title: 'حار ورطب' },
                  { id: 'moderate', title: 'معتدل' },
                  { id: 'cold_winter', title: 'بارد وقارس' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setClimate(item.id)}
                    className={`p-4 rounded-2xl border text-center text-xs font-semibold cursor-pointer ${
                      climate === item.id 
                        ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200' 
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 animate-bounce" />
              </div>
              <h4 className="text-xl font-serif font-bold text-slate-900 dark:text-rose-50">
                جاهزة لاكتشاف روتينكِ الفاخر المخصص؟
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                يقوم محرك لمسات صباح بتحليل خصائص بشرتكِ وشعركِ لتصاميم الروتينات الموصى بها مع الخلطات والسيرومات المناسبة.
              </p>
              <button
                onClick={handleGenerate}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
              >
                توليد الروتينات الخاصة بي ✨
              </button>
            </div>
          )}

          {/* Result View */}
          {step === 7 && generatedRoutines && (
            <div className="space-y-6">
              <div className="text-center bg-rose-50/80 dark:bg-slate-800 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/40">
                <h4 className="text-lg font-serif font-bold text-rose-900 dark:text-rose-100">
                  الروتينات الموصى بها لكِ من لمسات صباح
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  نوع البشرة: {skinType} | نوع الشعر: {hairType}
                </p>
              </div>

              <div className="space-y-4">
                {generatedRoutines.map(rtn => (
                  <div key={rtn.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                        {rtn.title.ar}
                      </h5>
                      <button
                        onClick={() => toggleFavorite('routineIds', rtn.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${isFavorite('routineIds', rtn.id) ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {rtn.steps.map(s => (
                        <div key={s.stepNumber} className="flex items-start gap-3 text-xs">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0">
                            {s.stepNumber}
                          </span>
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{s.title.ar}: </span>
                            <span className="text-slate-600 dark:text-slate-400">{s.description.ar}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Controls */}
        {step < 6 && (
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              disabled={step === 1}
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold disabled:opacity-30 cursor-pointer"
            >
              السابق
            </button>

            <span className="text-xs text-slate-500 font-mono">
              الخطوة {step} من 6
            </span>

            <button
              onClick={() => setStep(prev => Math.min(6, prev + 1))}
              className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-rose-600 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              التالي
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
