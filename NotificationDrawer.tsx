/**
 * Lamsat Sabah | لمسات صباح - Full Private Notification Center Component
 */

import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Trash2, 
  Settings, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  Sun, 
  Moon, 
  BookOpen, 
  Leaf, 
  Droplet, 
  Calendar, 
  Bot, 
  ShieldCheck,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { NotificationCategory } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    getUserNotifications, 
    notificationPreferences, 
    updateNotificationPreferences,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    clearAllNotifications
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'admin_reply' | 'daily' | 'routines' | 'content'>('all');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  if (!isOpen) return null;

  const currentUserId = user?.id || 'usr-default';
  const userNotifications = getUserNotifications(currentUserId);

  // Filter logic
  const filteredNotifications = userNotifications.filter(n => {
    if (activeFilter === 'admin_reply') return n.category === 'admin_reply';
    if (activeFilter === 'daily') return ['beauty_tips', 'daily_messages', 'morning_messages', 'evening_messages'].includes(n.category);
    if (activeFilter === 'routines') return ['routines', 'routine_reminder', 'skin_checkin'].includes(n.category);
    if (activeFilter === 'content') return ['articles', 'masks', 'serums', 'encyclopedia', 'ai_features'].includes(n.category);
    return true;
  });

  const unreadCount = userNotifications.filter(n => !n.isRead).length;

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'admin_reply': return <MessageSquare className="w-3.5 h-3.5 text-rose-500" />;
      case 'morning_messages': return <Sun className="w-3.5 h-3.5 text-amber-500" />;
      case 'evening_messages': return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
      case 'beauty_tips':
      case 'daily_messages': return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
      case 'masks': return <Leaf className="w-3.5 h-3.5 text-emerald-500" />;
      case 'serums': return <Droplet className="w-3.5 h-3.5 text-sky-500" />;
      case 'articles':
      case 'encyclopedia': return <BookOpen className="w-3.5 h-3.5 text-purple-500" />;
      case 'routines':
      case 'routine_reminder': return <Clock className="w-3.5 h-3.5 text-rose-400" />;
      case 'ai_features': return <Bot className="w-3.5 h-3.5 text-cyan-500" />;
      default: return <Bell className="w-3.5 h-3.5 text-rose-500" />;
    }
  };

  const categoryLabels: { key: NotificationCategory; label: string }[] = [
    { key: 'admin_reply', label: 'ردود الإدارة الخصوصية' },
    { key: 'beauty_tips', label: 'النصائح الجمالية' },
    { key: 'daily_messages', label: 'الرسائل اليومية العامة' },
    { key: 'morning_messages', label: 'إشراقات الصباح ✨' },
    { key: 'evening_messages', label: 'تأملات المساء 🌙' },
    { key: 'articles', label: 'المقالات الجديدة' },
    { key: 'masks', label: 'الماسكات الطبيعية' },
    { key: 'serums', label: 'موسوعة السيرومات' },
    { key: 'routines', label: 'جداول الروتين' },
    { key: 'encyclopedia', label: 'الموسوعة الطبية' },
    { key: 'ai_features', label: 'ميزات المساعدة الذكية AI' },
    { key: 'routine_reminder', label: 'تذكير الروتين اليومي' },
    { key: 'skin_checkin', label: 'فحص وتتبع البشرة' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col p-6 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-rose-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              مركز الإشعارات الخصوصي
            </h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-[10px] font-bold font-mono">
                {unreadCount} جديد
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSettingsModal(true)}
              title="تخصيص فئات الإشعارات"
              className="p-2 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Notifications Toggle Warning (if disabled) */}
        {!notificationPreferences.enabled && (
          <div className="my-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between">
            <span>الإشعارات معطلة حالياً بناءً على إعداداتكِ.</span>
            <button
              onClick={() => updateNotificationPreferences({ enabled: true })}
              className="font-bold underline text-amber-900 dark:text-amber-100 cursor-pointer"
            >
              تفعيل الآن
            </button>
          </div>
        )}

        {/* Quick Action Bar (Mark All Read / Clear All) */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => markAllNotificationsRead(currentUserId)}
            className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer font-medium"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>قراءة الكل</span>
          </button>

          <button
            onClick={() => clearAllNotifications(currentUserId)}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-500 cursor-pointer font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>مسح السجل</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-slate-800 text-[11px]">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'admin_reply', label: 'ردود الإدارة' },
            { id: 'daily', label: 'الرسائل والنصائح' },
            { id: 'routines', label: 'الروتين والتذكير' },
            { id: 'content', label: 'المقالات والماسكات' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <Sparkles className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-slate-400 text-xs font-light">لا توجد إشعارات في الفئة المحددة ✨</p>
            </div>
          ) : (
            filteredNotifications.map(n => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all relative group ${
                  n.isRead
                    ? 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-slate-900 dark:text-slate-100 font-medium shadow-xs'
                }`}
              >
                <div 
                  onClick={() => markNotificationRead(n.id)}
                  className="cursor-pointer space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      {getCategoryIcon(n.category)}
                      <span>{n.title}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(n.id);
                        }}
                        title="حذف الإشعار"
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-opacity p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {n.message}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                    <span className="px-2 py-0.5 rounded-full bg-slate-200/50 dark:bg-slate-800">
                      {n.category.replace('_', ' ')}
                    </span>
                    <span>
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Category Preferences Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  إعدادات وتفضيلات الإشعارات
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Global Enable Switch */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900">
              <div>
                <span className="text-xs font-bold block text-slate-900 dark:text-white">تفعيل نظام الإشعارات الشامل</span>
                <span className="text-[10px] text-slate-500 font-light">تلقي التنبيهات والردود بشكل آمن وخصوصي.</span>
              </div>
              <input
                type="checkbox"
                checked={notificationPreferences.enabled}
                onChange={e => updateNotificationPreferences({ enabled: e.target.checked })}
                className="w-5 h-5 rounded-md accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Individual Categories List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                تخصيص الفئات والمواضيع
              </span>

              {categoryLabels.map(cat => (
                <div key={cat.key} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{cat.label}</span>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.categories[cat.key] ?? true}
                    onChange={e => {
                      updateNotificationPreferences({
                        categories: {
                          ...notificationPreferences.categories,
                          [cat.key]: e.target.checked
                        }
                      });
                    }}
                    className="w-4 h-4 rounded-md accent-rose-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              حفظ التفضيلات
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
