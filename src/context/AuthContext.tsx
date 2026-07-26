/**
 * Lamsat Sabah | لمسات صباح - Authentication Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role?: Role) => Promise<boolean>;
  adminLogin: (email: string, pass: string, otpCode?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  sessionToken: string | null;
  is2FAEnabled: boolean;
  toggle2FA: (enable: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Allowed internal admin email constant
const INTERNAL_ADMIN_EMAIL = 'sue.aymen2@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(() => localStorage.getItem('lamsat_admin_session'));
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(() => localStorage.getItem('lamsat_2fa_enabled') === 'true');

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lamsat_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return {
      id: 'usr-default',
      name: 'زائرة لمسات صباح',
      email: 'visitor@lamsatsabah.com',
      role: 'user',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      skinType: 'combination',
      hairType: 'wavy',
      createdAt: new Date().toISOString()
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('lamsat_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lamsat_user');
    }
  }, [user]);

  const toggle2FA = (enable: boolean) => {
    setIs2FAEnabled(enable);
    localStorage.setItem('lamsat_2fa_enabled', enable ? 'true' : 'false');
  };

  const adminLogin = async (email: string, pass: string, otpCode?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Internal Email Verification
    if (cleanEmail !== INTERNAL_ADMIN_EMAIL) {
      return { success: false, error: 'البريد الإلكتروني غير مصرح له بالوصول للوحة التحكم السرية.' };
    }

    if (pass.length < 6) {
      return { success: false, error: 'كلمة المرور غير صحيحة.' };
    }

    if (is2FAEnabled && (!otpCode || otpCode.trim().length !== 6)) {
      return { success: false, error: 'رمز التحقق الثنائي (2FA) المكون من 6 أرقام مطلوب.' };
    }

    const token = `sess_adm_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    const adminUser: User = {
      id: 'usr-admin-owner',
      name: 'مالكة لمسات صباح - الإدارة الرئيسية',
      email: cleanEmail,
      role: 'admin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    };

    setUser(adminUser);
    setSessionToken(token);
    localStorage.setItem('lamsat_admin_session', token);
    return { success: true };
  };

  const login = async (email: string, role: Role = 'user'): Promise<boolean> => {
    const isAdminUser = role === 'admin';
    const newUser: User = {
      id: isAdminUser ? 'usr-admin-01' : `usr-${Date.now()}`,
      name: isAdminUser ? 'مديرة لمسات صباح' : 'زائرة لمسات صباح',
      email,
      role: isAdminUser ? 'admin' : 'user',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      skinType: 'sensitive',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return true;
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'user',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setSessionToken(null);
    localStorage.removeItem('lamsat_admin_session');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...updatedData } : null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      adminLogin,
      register,
      logout,
      updateProfile,
      sessionToken,
      is2FAEnabled,
      toggle2FA
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
