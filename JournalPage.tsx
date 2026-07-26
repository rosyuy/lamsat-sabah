/**
 * Lamsat Sabah | لمسات صباح - Beauty Journal & Private Before/After Tracker
 */

import React, { useState } from 'react';
import { Sparkles, Calendar, Plus, Trash2, Camera, Shield, Lock, Star, Droplet, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

export const JournalPage: React.FC = () => {
  const { t } = useLanguage();
  const { 
    journalEntries, 
    addJournalEntry, 
    deleteJournalEntry,
    beforeAfterEntries,
    addBeforeAfterEntry,
    deleteBeforeAfterEntry
  } = useApp();

  const [activeTab, setActiveTab] = useState<'journal' | 'gallery'>('journal');

  // New Journal Form state
  const [jTitle, setJTitle] = useState('');
  const [jNotes, setJNotes] = useState('');
  const [skinRating, setSkinRating] = useState(5);
  const [waterLiters, setWaterLiters] = useState(2.0);

  // New Before/After Form state
  const [baTitle, setBATitle] = useState('');
  const [beforeUrl, setBeforeUrl] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80');
  const [afterUrl, setAfterUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  const [baNotes, setBANotes] = useState('');

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (jTitle.trim() && jNotes.trim()) {
      addJournalEntry({
        userId: 'usr-default',
        date: new Date().toISOString().split('T')[0],
        title: jTitle,
        notes: jNotes,
        skinConditionRating: skinRating,
        waterIntakeLiters: waterLiters
      });
      setJTitle('');
      setJNotes('');
    }
  };

  const handleAddBA = (e: React.FormEvent) => {
    e.preventDefault();
    if (baTitle.trim()) {
      addBeforeAfterEntry({
        userId: 'usr-default',
        title: baTitle,
        beforePhotoUrl: beforeUrl,
        afterPhotoUrl: afterUrl,
        beforeDate: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0],
        afterDate: new Date().toISOString().split('T')[0],
        notes: baNotes,
        category: 'skin',
        isPublic: false
      });
      setBATitle('');
      setBANotes('');
    }
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/20">
          <Lock className="w-3.5 h-3.5 text-rose-400" />
          <span>مساحتكِ السرية والشخصية</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
          دفتر يوميات الجمال ومعرض التطورات
        </h1>
        <p className="text-sm md:text-base text-rose-100/90 font-light leading-relaxed max-w-2xl">
          تتبعي استجابة بشرتكِ وشعركِ يومياً، دوّني الخلطات والسيرومات المستخدمة، واحفظي صور مقارنة التطورات (قبل وبعد) بخصوصية تامة.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('journal')}
          className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'journal'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50'
          }`}
        >
          مذكرات اليوميات
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50'
          }`}
        >
          معرض صور المقارنة (قبل وبعد) 🔒
        </button>
      </div>

      {/* Journal View */}
      {activeTab === 'journal' && (
        <div className="space-y-8">
          
          {/* Form */}
          <form onSubmit={handleAddJournal} className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-rose-500" />
              <span>إضافة يومية جديدة اليوم</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">عنوان التدوينة اليومية</label>
              <input
                type="text"
                value={jTitle}
                onChange={e => setJTitle(e.target.value)}
                placeholder="مثال: تجربة ماسك الأرز الكوري والزبادي..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">تقييم نضارة البشرة اليوم (1 إلى 5)</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSkinRating(st)}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${st <= skinRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">كمية شرب الماء اليومية (لتر)</label>
                <input
                  type="number"
                  step="0.5"
                  value={waterLiters}
                  onChange={e => setWaterLiters(parseFloat(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">ملاحظات والتغيرات الملاحظة</label>
              <textarea
                value={jNotes}
                onChange={e => setJNotes(e.target.value)}
                placeholder="اكتبي مشاعركِ، تحسن الملمس، أو ملاحظة تضارب منتج..."
                rows={3}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              حفظ اليومية السرية
            </button>
          </form>

          {/* List */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-rose-100">سجل التدوينات السابقة</h4>
            {journalEntries.map(j => (
              <div key={j.id} className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">{j.date}</span>
                  <button onClick={() => deleteJournalEntry(j.id)} className="text-slate-400 hover:text-rose-500 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">{j.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">{j.notes}</p>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span>نضارة البشرة: {j.skinConditionRating} / 5 ⭐</span>
                  <span>الماء: {j.waterIntakeLiters}L 💧</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Gallery View */}
      {activeTab === 'gallery' && (
        <div className="space-y-8">
          
          <form onSubmit={handleAddBA} className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-500" />
              <span>إضافة كارت مقارنة جديدة (قبل وبعد)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">عنوان المقارنة</label>
              <input
                type="text"
                value={baTitle}
                onChange={e => setBATitle(e.target.value)}
                placeholder="مثال: تطور النضارة بعد شهر من استخدام سيروم B5..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">ملاحظات التحسن والنتائج</label>
              <input
                type="text"
                value={baNotes}
                onChange={e => setBANotes(e.target.value)}
                placeholder="تلاشي الجفاف واختفاء البقع..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-slate-900 dark:bg-rose-600 text-white font-bold text-xs shadow-md cursor-pointer"
            >
              حفظ كارت المقارنة
            </button>
          </form>

          {/* Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beforeAfterEntries.map(ba => (
              <div key={ba.id} className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">{ba.title}</h4>
                  <button onClick={() => deleteBeforeAfterEntry(ba.id)} className="text-slate-400 hover:text-rose-500 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-600 font-mono block">قبل ({ba.beforeDate})</span>
                    <img src={ba.beforePhotoUrl} alt="Before" className="w-full h-36 object-cover rounded-2xl" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-600 font-mono block">بعد ({ba.afterDate})</span>
                    <img src={ba.afterPhotoUrl} alt="After" className="w-full h-36 object-cover rounded-2xl" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-light">{ba.notes}</p>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
