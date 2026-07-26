/**
 * Lamsat Sabah | لمسات صباح - Private User-to-Admin Messaging Modal
 */

import React, { useState } from 'react';
import { X, Send, Lock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

interface MessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessagingModal: React.FC<MessagingModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getUserPrivateMessages, sendPrivateMessage } = useApp();

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  // Strict backend authorization filter: user only accesses their own messages
  const userMessages = getUserPrivateMessages(user?.id || 'usr-default', user?.email || 'visitor@lamsatsabah.com', false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim() && message.trim()) {
      sendPrivateMessage(
        subject, 
        message, 
        user?.id || 'usr-default',
        user?.email || 'visitor@lamsatsabah.com', 
        user?.name || 'زائرة لمسات صباح'
      );
      setSubject('');
      setMessage('');
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-rose-900/40 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Lock className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">{t('messagingTitle')}</h3>
              <p className="text-xs text-amber-200/90 font-light">استفسار سري ومباشر مع إدارة لمسات صباح</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-amber-200/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Send Message Form */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              <span>{t('sendMessageToAdmin')}</span>
            </h4>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t('subject')}</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="موضوع الاستفسار الجمالي..."
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs md:text-sm focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{t('messageContent')}</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="اكتبي تفاصيل سؤالكِ بكل خصوصية..."
                rows={3}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs md:text-sm focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t('sendBtn')}</span>
            </button>

            {sentSuccess && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم إرسال رسالتكِ الخصوصية بنجاح! ستصلكِ إجابة الإدارة قريباً.</span>
              </div>
            )}
          </form>

          {/* User Messages History */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              سجل الرسائل الخصوصية السابقة
            </h4>

            {userMessages.length === 0 ? (
              <p className="text-xs text-slate-400 font-light text-center py-4">لا توجد رسائل سابقة.</p>
            ) : (
              userMessages.map(msg => (
                <div key={msg.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{msg.subject}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      msg.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {msg.status === 'replied' ? 'تم الرد' : 'قيد المراجعة'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light">{msg.message}</p>

                  {msg.adminReply && (
                    <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-slate-900 border border-rose-100 dark:border-rose-900/40 mt-2 text-xs">
                      <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">رد الإدارة:</span>
                      <p className="text-slate-700 dark:text-slate-300 font-light">{msg.adminReply}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
