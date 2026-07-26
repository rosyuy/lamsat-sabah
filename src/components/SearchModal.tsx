/**
 * Lamsat Sabah | لمسات صباح - Global Search Modal
 */

import React, { useState } from 'react';
import { X, Search, Sparkles, Filter, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { naturalMasksData } from '../data/masks';
import { serumsData } from '../data/serums';
import { ingredientsData } from '../data/ingredients';
import { skincareEncyclopediaData } from '../data/skincare';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onSelectMask?: (maskId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate, onSelectMask }) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'masks' | 'serums' | 'ingredients' | 'articles'>('all');

  if (!isOpen) return null;

  const filteredMasks = naturalMasksData.filter(m => 
    m.title.ar.includes(query) || m.title.en.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredSerums = serumsData.filter(s => 
    s.name.ar.includes(query) || s.name.en.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredIngredients = ingredientsData.filter(i => 
    i.name.ar.includes(query) || i.name.en.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredArticles = skincareEncyclopediaData.filter(a => 
    a.title.ar.includes(query) || a.title.en.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-rose-900/40 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="ابحثي عن ماسك طبيعي، سيروم، مكون فعال، أو استشارة..."
            autoFocus
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm md:text-base focus:outline-hidden font-medium"
          />
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Categories */}
        <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'masks', label: 'الماسكات الطبيعية' },
            { id: 'serums', label: 'السيرومات' },
            { id: 'ingredients', label: 'المكونات' },
            { id: 'articles', label: 'المقالات' }
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === c.id 
                  ? 'bg-rose-600 text-white shadow-xs' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6 flex-1">
          {!query.trim() ? (
            <div className="text-center py-12 text-slate-400 text-xs font-light">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-amber-400 animate-pulse" />
              اكتبي أي كلمة للبحث في موسوعة لمسات صباح الفاخرة...
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Natural Masks Results */}
              {(activeCategory === 'all' || activeCategory === 'masks') && filteredMasks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    الماسكات الطبيعية ({filteredMasks.length})
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredMasks.map(m => (
                      <div
                        key={m.id}
                        onClick={() => {
                          if (onSelectMask) onSelectMask(m.id);
                          onClose();
                        }}
                        className="p-3 hover:bg-rose-50/50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">{m.title.ar}</span>
                          <span className="text-[11px] text-slate-500">{m.weeklyFrequency}</span>
                        </div>
                        <span className="text-[10px] px-2 py-1 bg-amber-100 text-amber-800 font-bold rounded-lg">
                          {m.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Serums Results */}
              {(activeCategory === 'all' || activeCategory === 'serums') && filteredSerums.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    السيرومات ({filteredSerums.length})
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredSerums.map(s => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onNavigate('serums');
                          onClose();
                        }}
                        className="p-3 hover:bg-rose-50/50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">{s.name.ar}</span>
                          <span className="text-[11px] text-slate-500">{s.activeIngredient}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients Results */}
              {(activeCategory === 'all' || activeCategory === 'ingredients') && filteredIngredients.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    مكونات الجمال ({filteredIngredients.length})
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredIngredients.map(ing => (
                      <div
                        key={ing.id}
                        onClick={() => {
                          onNavigate('ingredients');
                          onClose();
                        }}
                        className="p-3 hover:bg-rose-50/50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">{ing.name.ar}</span>
                          <span className="text-[11px] text-slate-500">{ing.scientificName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
