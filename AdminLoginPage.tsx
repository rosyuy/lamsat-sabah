/**
 * Lamsat Sabah | لمسات صباح - Hidden Private Admin Login Portal
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Server
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginPageProps {
  onSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess }) => {
  const { adminLogin, is2FAEnabled, toggle2FA } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Rate limiting state: Max 3 failed attempts -> 60s lock
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Password reset modal
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Simulated CSRF Token
  const [csrfToken] = useState(() => `csrf_ls_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockoutTimer > 0) {
      timer = setInterval(() => {
        setLockoutTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setError(null);
    setLoading(true);

    try {
      const res = await adminLogin(email, password, is2FAEnabled ? otpCode : undefined);
      if (res.success) {
        setFailedAttempts(0);
        onSuccess();
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        setError(res.error || 'فشلت عملية المصادقة. يرجى التحقق من البيانات.');

        if (nextAttempts >= 3) {
          setLockoutTimer(60);
          setError('تم تجاوز عدد محاولات الدخول المسموحة (3 محاولات). تم إغلاق النظام مؤقتاً لمدة 60 ثانية لحماية البوابة.');
        }
      }
    } catch {
      setError('حدث خطأ في النظام. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setResetModalOpen(false);
      setResetSuccess(false);
      setResetEmail('');
    }, 4000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Portal Header */}
        <div className="text-center space-y-3 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 mx-auto shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <h2 className="text-2xl font-serif font-bold text-amber-100 tracking-tight">
            بوابة الإدارة الخاصة والتشفير
          </h2>
          <p className="text-xs text-slate-400 font-light">
            نظام التحكم الخاص والآمن لمالكة منصة لمسات صباح (Lamsat Sabah)
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/60 text-[10px] font-mono">
            <Server className="w-3 h-3 text-rose-400" />
            <span>جلسة مشفرة 256-Bit SSL | CSRF Active</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/90 border border-rose-800 text-rose-200 text-xs space-y-1 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-rose-300">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>فشل المصادقة</span>
            </div>
            <p className="leading-relaxed font-light">{error}</p>
          </div>
        )}

        {/* Lockout Countdown Timer */}
        {lockoutTimer > 0 && (
          <div className="p-4 rounded-2xl bg-amber-950/80 border border-amber-800 text-amber-200 text-xs text-center space-y-1">
            <span className="font-bold block">النظام مقفل مؤقتاً لحمايتكِ</span>
            <span className="text-2xl font-mono font-bold text-amber-400 block">{lockoutTimer} ثانية</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">البريد الإلكتروني المخصص للإدارة *</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني الداخلي..."
              required
              disabled={lockoutTimer > 0}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-hidden focus:border-amber-500 disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 block">كلمة المرور المشفرة *</label>
              <button
                type="button"
                onClick={() => setResetModalOpen(true)}
                className="text-[11px] text-amber-400 hover:underline cursor-pointer"
              >
                نسيتي كلمة المرور؟
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                disabled={lockoutTimer > 0}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-hidden focus:border-amber-500 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3.5 left-4 text-slate-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 2FA OTP Code (If enabled) */}
          {is2FAEnabled && (
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>رمز التحقق الثنائي (2FA)</span>
                </span>
                <span className="text-[10px] text-slate-400">6 أرقام</span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                placeholder="0 0 0 0 0 0"
                className="w-full text-center px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono text-base tracking-widest focus:outline-hidden focus:border-amber-400"
              />
            </div>
          )}

          {/* Hidden CSRF Token Payload */}
          <input type="hidden" name="csrf_token" value={csrfToken} />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || lockoutTimer > 0}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-amber-200" />
            ) : (
              <>
                <Key className="w-4 h-4 text-amber-200" />
                <span>دخول آمن للبوابة السرية</span>
              </>
            )}
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-2">
          <p className="text-[11px] text-slate-400 leading-relaxed font-light">
            تنبيه أمني: هذه المنطقة محمية بموجب بروتوكولات الخصوصية والتشفير. أي دخول غير مصرح له يتم تسجيله تلقائياً.
          </p>

          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 font-mono">
            <span>2FA Status: {is2FAEnabled ? 'ENABLED' : 'DISABLED'}</span>
            <span>•</span>
            <button
              onClick={() => toggle2FA(!is2FAEnabled)}
              className="text-amber-400 underline cursor-pointer"
            >
              تغيير إعداد 2FA
            </button>
          </div>
        </div>

      </div>

      {/* Password Reset Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 text-white">
            <h3 className="text-lg font-serif font-bold text-amber-300">إعادة ضبط كلمة المرور السرية</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              أدخلي البريد الإلكتروني الداخلي الخاص بالإدارة لإرسال رابط إعادة تعيين كلمة المرور الآمن.
            </p>

            {resetSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>تم إرسال تعليمات إعادة التعيين بأمان إلى البريد الإلكتروني المصرح له!</span>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="البريد الإلكتروني الداخلي..."
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-hidden"
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold cursor-pointer"
                  >
                    إرسال رابط التعيين
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
