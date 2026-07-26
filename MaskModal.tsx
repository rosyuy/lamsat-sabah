/**
 * Lamsat Sabah | لمسات صباح - Natural Mask Full Detail Modal
 */

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Clock, 
  Calendar, 
  ShieldAlert, 
  Sun, 
  Heart, 
  Share2, 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { naturalMasksData } from '../data/masks';

interface MaskModalProps {
  maskId: string | null;
  onClose: () => void;
}

export const MaskModal: React.FC<MaskModalProps> = ({ maskId, onClose }) => {
  const { t, isRTL } = useLanguage();
  const { toggleFavorite, isFavorite, reviews, addReview } = useApp();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const mask = naturalMasksData.find(m => m.id === maskId);
  if (!maskId || !mask) return null;

  const isFav = isFavorite('maskIds', mask.id);
  const maskReviews = reviews.filter(r => r.contentId === mask.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      addReview(mask.id, 'mask', rating, comment, reviewerName || 'زائرة لمسات صباح');
      setComment('');
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-rose-900/40 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Banner */}
        <div className="relative h-48 md:h-64 w-full bg-slate-950">
          <img
            src={mask.imageUrl}
            alt={mask.title.ar}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close & Fav Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={() => toggleFavorite('maskIds', mask.id)}
              className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-rose-500 shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 left-4 text-white">
            <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-bold text-[10px] uppercase tracking-wider mb-2 inline-block">
              {mask.category}
            </span>
            <h2 className="text-xl md:text-3xl font-serif font-bold text-white leading-tight">
              {mask.title.ar}
            </h2>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-rose-50/60 dark:bg-slate-800/60 rounded-2xl border border-rose-100 dark:border-rose-900/40 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">وقت التطبيق</span>
              <span className="font-bold flex items-center gap-1 mt-0.5"><Clock className="w-3.5 h-3.5 text-amber-500" /> {mask.timeOfDay}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">{t('weeklyFrequency')}</span>
              <span className="font-bold flex items-center gap-1 mt-0.5"><Calendar className="w-3.5 h-3.5 text-purple-500" /> {mask.weeklyFrequency}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">{t('suitableSkin')}</span>
              <span className="font-bold flex items-center gap-1 mt-0.5 text-emerald-600 dark:text-emerald-400">{mask.skinType ? mask.skinType.join(', ') : 'جميع أنواع البشرة'}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">النتائج المتوقعة</span>
              <span className="font-bold flex items-center gap-1 mt-0.5 text-rose-600 dark:text-rose-400">{mask.expectedResults.ar}</span>
            </div>
          </div>

          {/* Preparation & Application */}
          <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-slate-800/40 border border-rose-100 dark:border-slate-700 text-xs space-y-2">
            <span className="font-bold text-rose-800 dark:text-rose-300 block">طريقة التحضير والتطبيق:</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">
              <strong className="text-slate-900 dark:text-white">التحضير: </strong>{mask.preparation.ar}
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light">
              <strong className="text-slate-900 dark:text-white">التطبيق: </strong>{mask.application.ar}
            </p>
          </div>

          {/* Benefits Bullet List */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>فوائد الخلطة ومزاياها الجمالية</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mask.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{b.ar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Precise Ingredients & Measurements */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">المقادير والمكونات الدقيقة</h4>
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2 text-xs">
              {mask.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center justify-between font-medium">
                  <span className="text-slate-800 dark:text-slate-200">• {ing.name.ar}</span>
                  <span className="text-amber-800 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-900/60 px-2.5 py-0.5 rounded-full">
                    {ing.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Safety Patch Test Card */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{t('patchTestWarningTitle')}</span>
            </div>
            <p className="text-rose-900 dark:text-rose-200 leading-relaxed font-light">
              {mask.patchTest.ar}
            </p>
          </div>

          {/* Warnings & Expiration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold block text-slate-800 dark:text-slate-200 mb-1">صلاحية الخلطة وحفظها:</span>
              <span className="text-slate-600 dark:text-slate-400">{mask.storageInstructions.ar}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold block text-slate-800 dark:text-slate-200 mb-1">تحذيرات واحتياطات:</span>
              <ul className="text-rose-600 font-bold list-disc list-inside">
                {mask.warnings.map((w, idx) => (
                  <li key={idx}>{w.ar}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reviews & Ratings */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>تقييمات العضوات ({maskReviews.length})</span>
              <span className="flex items-center gap-1 text-amber-500 font-mono text-xs">
                <Star className="w-4 h-4 fill-amber-500" /> 4.9 / 5
              </span>
            </h4>

            <form onSubmit={handleReviewSubmit} className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">تقييمكِ للخلطة:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setRating(st)}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${st <= rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="اكتبي تجربتكِ مع هذه الخلطة بكل أمانة..."
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
              />

              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-rose-600 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                إضافة تقييم
              </button>

              {reviewSubmitted && (
                <p className="text-xs text-emerald-600 font-bold">شكراً لتقييمكِ! تم نشر رأيكِ بنجاح ✨</p>
              )}
            </form>

            <div className="space-y-2">
              {maskReviews.map(rev => (
                <div key={rev.id} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{rev.userName}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-light">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
