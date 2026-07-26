/**
 * Lamsat Sabah | لمسات صباح - Responsive Header Navigation Bar
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bot, 
  Bell, 
  Heart, 
  User as UserIcon, 
  Globe, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  BookOpen, 
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

interface HeaderProps {
  onNavigate: (page: string) => void;
  activePage: string;
  onOpenSearch: () => void;
  onOpenAI: () => void;
  onOpenQuiz: () => void;
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  onOpenMessaging: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activePage,
  onOpenSearch,
  onOpenAI,
  onOpenQuiz,
  onOpenAuth,
  onOpenNotifications,
  onOpenMessaging,
}) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { favorites, notifications } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const unreadNotificationsCount: number = notifications.filter(n => !n.isRead).length;
  const totalFavoritesCount: number = Number(Object.values(favorites).reduce((acc: number, curr: any) => acc + (Array.isArray(curr) ? curr.length : 0), 0));

  const languagesList: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية (RTL)', flag: '🇸🇦' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
  ];

  const mainNavItems = [
    { id: 'home', label: t('home') },
    { id: 'skin-care', label: t('skinCare') },
    { id: 'hair-care', label: t('hairCare') },
    { id: 'body-care', label: t('bodyCare') },
    { id: 'hand-care', label: t('handCare') },
    { id: 'foot-care', label: t('footCare') },
    { id: 'natural-masks', label: t('naturalMasks') },
    { id: 'serums', label: t('serums') },
    { id: 'ingredients', label: t('ingredients') },
    { id: 'daily-tips', label: t('dailyTips') },
    { id: 'encyclopedia', label: t('beautyEncyclopedia') },
    { id: 'routines', label: t('routines') },
    { id: 'beauty-journal', label: t('beautyJournal') },
    { id: 'before-after', label: t('beforeAfter') },
    { id: 'favorites', label: t('favorites') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-rose-100/60 dark:border-rose-900/30 transition-colors duration-300">
      {/* Top Announcement & Social Links Bar */}
      <div className="bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-amber-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('brandTagline')}</span>
          </div>

          <div className="flex items-center gap-4 text-amber-200/90">
            <span className="hidden sm:inline font-mono">@thesabahedit</span>
            <a
              href="https://www.instagram.com/thesabahedit?igsh=dGNmeGJqaXkwcjc5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-100 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/share/1T4Q7qiBER/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-100 transition-colors hidden md:inline"
            >
              Facebook
            </a>
            <a
              href="https://www.whatsapp.com/channel/0029VbCL3nP1noz1mQPDyl42"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-100 transition-colors hidden lg:inline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Mobile Menu on Right Side */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-rose-50 leading-none">
                  لمسات صباح
                </span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-amber-700 dark:text-amber-400 font-semibold mt-1">
                  Lamsat Sabah
                </span>
              </div>
            </div>
          </div>

          {/* Center Action Tools: Search, AI, Quiz */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium cursor-pointer"
            >
              <Search className="w-4 h-4 text-rose-500" />
              <span>{t('search')}...</span>
            </button>

            <button
              onClick={onOpenAI}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-sm text-sm font-medium transition-transform transform hover:scale-105 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>{t('aiBeautyAssistant')}</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-800/50 text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-slate-800 text-sm font-medium transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>{t('beautyQuiz')}</span>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Private Messages */}
            <button
              onClick={onOpenMessaging}
              title="الرسائل الخاصة / Private Inbox"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
            >
              <MessageSquare className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </button>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              title="الإشعارات / Notifications"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Favorites Counter */}
            <button
              onClick={() => onNavigate('favorites')}
              title={t('favorites')}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer relative hidden sm:flex"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              {totalFavoritesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalFavoritesCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-amber-600" />
                <span className="uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div className={`absolute top-12 ${isRTL ? 'left-0' : 'right-0'} w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
                  {languagesList.map(item => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        language === item.code 
                          ? 'bg-rose-50 text-rose-700 dark:bg-slate-700 dark:text-rose-300 font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-base">{item.flag}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title="تغيير المظهر / Toggle Theme"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>

            {/* User Account / Admin Dashboard Button */}
            {isAdmin ? (
              <button
                onClick={() => onNavigate('admin')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">{t('adminDashboard')}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{user ? user.name.split(' ')[0] : t('login')}</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Horizontal Main Categories Scrollbar for Desktop */}
      <nav className="hidden md:block bg-slate-50/80 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 py-2.5 px-4 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-start lg:justify-center gap-1 min-w-max">
          {mainNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activePage === item.id 
                  ? 'bg-rose-600 text-white font-bold shadow-xs' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-rose-100/50 dark:hover:bg-slate-800 hover:text-rose-700 dark:hover:text-rose-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 space-y-3 animate-in slide-in-from-top duration-300 shadow-xl max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => { onOpenAI(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium text-xs"
            >
              <Bot className="w-4 h-4" />
              <span>{t('aiBeautyAssistant')}</span>
            </button>

            <button
              onClick={() => { onOpenSearch(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs"
            >
              <Search className="w-4 h-4 text-rose-500" />
              <span>{t('search')}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {mainNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-start py-3 px-2 text-sm font-medium transition-colors ${
                  activePage === item.id ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
