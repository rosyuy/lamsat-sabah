/**
 * Lamsat Sabah | لمسات صباح - Authentication Modal (Login / Register / Recover)
 */

import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User as UserIcon, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { user, login, register, logout, isAdmin } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminDemo, setIsAdminDemo] = useState(false);
  const [msg, setMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      const selectedRole = isAdminDemo ? 'admin' : 'user';
      await login(email || 'visitor@lamsatsabah.com', selectedRole);
      setMsg('تم تسجيل الدخول بنجاح ✨');
      setTimeout(() => { setMsg(''); onClose(); }, 1200);
    } else if (mode === 'register') {
      await register(name || 'زائرة لمسات صباح', email || 'visitor@lamsatsabah.com');
      setMsg('تم إنشاء حسابكِ بنجاح! أهلاً بكِ في عائلة لمسات صباح ✨');
      setTimeout(() => { setMsg(''); onClose(); }, 1200);
    } else {
      setMsg('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدكِ الإلكتروني ✨');
      setTimeout(() => { setMsg(''); setMode('login'); }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-rose-900/40 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif font-bold text-lg">
              {user ? 'حسابكِ الشخصي' : mode === 'login' ? t('login') : mode === 'register' ? t('register') : t('forgotPassword')}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-amber-200/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {user ? (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-rose-100 dark:bg-slate-800 p-1 mx-auto shadow-md">
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">{user.name}</h4>
                <p className="text-xs text-slate-500 font-mono">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 dark:bg-slate-800 dark:text-rose-300 text-xs font-bold">
                  {user.role === 'admin' ? 'مديرة الموقع (Admin)' : 'عضوة مميزة'}
                </span>
              </div>

              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('fullName')}</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute top-3.5 left-3 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="اسمكِ الكريمة..."
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('email')}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute top-3.5 left-3 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{t('password')}</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute top-3.5 left-3 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                </div>
              )}

              {/* Demo Role Switcher */}
              {mode === 'login' && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/40 flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    تسجيل كـ مديرة الموقع (Admin)?
                  </span>
                  <input
                    type="checkbox"
                    checked={isAdminDemo}
                    onChange={e => setIsAdminDemo(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                  />
                </div>
              )}

              {msg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{msg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs shadow-md cursor-pointer transition-all"
              >
                {mode === 'login' ? t('login') : mode === 'register' ? t('register') : 'إرسال رابط الاستعادة'}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                {mode === 'login' ? (
                  <>
                    <button type="button" onClick={() => setMode('register')} className="hover:text-rose-600 font-semibold cursor-pointer">
                      إنشاء حساب جديد
                    </button>
                    <button type="button" onClick={() => setMode('forgot')} className="hover:text-rose-600 cursor-pointer">
                      نسيت كلمة المرور؟
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => setMode('login')} className="hover:text-rose-600 font-semibold mx-auto cursor-pointer">
                    العودة لتسجيل الدخول
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
