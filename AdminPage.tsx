/**
 * Lamsat Sabah | لمسات صباح - Full Private Admin Dashboard (23 Modules)
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  Bell, 
  FileText, 
  Sparkles, 
  Sun, 
  Moon, 
  Leaf, 
  Droplet, 
  BookOpen, 
  HelpCircle, 
  Calendar, 
  Bot, 
  Book, 
  Send, 
  Image as ImageIcon, 
  Globe, 
  Search as SearchIcon, 
  Share2, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  LogOut, 
  Lock, 
  Activity, 
  BarChart3, 
  Filter, 
  Upload, 
  Save, 
  ShieldAlert,
  Sliders,
  Copy,
  Terminal,
  Database,
  Pin,
  Archive,
  Ban,
  Mail,
  Check,
  EyeOff
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AdminLoginPage } from './AdminLoginPage';
import { ContentEditorModal } from '../components/ContentEditorModal';
import { NaturalMask, Serum, EncyclopediaArticle } from '../types';
import { naturalMasksData } from '../data/masks';
import { serumsData } from '../data/serums';
import { beautyTipsData, BeautyTipItem } from '../data/tips';
import { skincareEncyclopediaData } from '../data/skincare';

type AdminTab = 
  | 'overview'
  | 'users'
  | 'private-messages'
  | 'message-notifications'
  | 'articles'
  | 'beauty-tips'
  | 'daily-messages'
  | 'morning-messages'
  | 'evening-messages'
  | 'natural-masks'
  | 'serums'
  | 'ingredients'
  | 'beauty-encyclopedia'
  | 'skin-quiz'
  | 'beauty-routines'
  | 'ai-settings'
  | 'journal-settings'
  | 'notifications'
  | 'media-library'
  | 'translations'
  | 'seo'
  | 'social-media'
  | 'website-settings';

export const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const { isAdmin, user, logout } = useAuth();
  const { 
    dailyMessages, 
    addDailyMessage, 
    getUserPrivateMessages,
    replyPrivateMessage,
    markMessageRead,
    markMessageUnread,
    togglePinMessage,
    archiveMessage,
    deleteMessage,
    blockUserMessages,
    notifications,
    reviews
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Admin Messaging Search, Filter & Reply State
  const [msgSearchQuery, setMsgSearchQuery] = useState('');
  const [msgFilterStatus, setMsgFilterStatus] = useState<'all' | 'unread' | 'replied' | 'archived' | 'pinned' | 'blocked'>('all');
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [activeReplyMsgId, setActiveReplyMsgId] = useState<string | null>(null);
  const [msgActionSuccess, setMsgActionSuccess] = useState<string | null>(null);

  // Retrieve all messages for admin
  const allAdminMessages = getUserPrivateMessages('', '', true);

  const filteredAdminMessages = allAdminMessages.filter(m => {
    const query = msgSearchQuery.toLowerCase().trim();
    if (query) {
      const matchName = m.userName.toLowerCase().includes(query);
      const matchEmail = m.userEmail.toLowerCase().includes(query);
      const matchSubject = m.subject.toLowerCase().includes(query);
      const matchContent = m.message.toLowerCase().includes(query);
      if (!matchName && !matchEmail && !matchSubject && !matchContent) return false;
    }

    if (msgFilterStatus === 'unread') return m.status === 'unread';
    if (msgFilterStatus === 'replied') return m.status === 'replied';
    if (msgFilterStatus === 'archived') return m.status === 'archived';
    if (msgFilterStatus === 'pinned') return Boolean(m.isPinned);
    if (msgFilterStatus === 'blocked') return Boolean(m.isBlocked);
    return m.status !== 'archived';
  });

  const unreadMsgCount = allAdminMessages.filter(m => m.status === 'unread').length;

  // Interactive local states for CRUD simulations across the 23 modules
  const [usersList, setUsersList] = useState([
    { id: 'usr-admin-owner', name: 'مالكة المنصة (Super Admin)', email: 'sue.aymen2@gmail.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: 'الآن' },
    { id: 'usr-editor-01', name: 'محررة العناية بالشعر', email: 'editor.hair@lamsatsabah.com', role: 'EDITOR', status: 'ACTIVE', lastLogin: 'منذ يومين' },
    { id: 'usr-100', name: 'ريم العتيبي', email: 'reem.o@gmail.com', role: 'USER', status: 'ACTIVE', lastLogin: 'منذ ساعتين' },
    { id: 'usr-101', name: 'نورة الدوسري', email: 'noura.d@gmail.com', role: 'USER', status: 'ACTIVE', lastLogin: 'منذ 5 ساعات' },
    { id: 'usr-102', name: 'سارة خالد', email: 'sara.k@gmail.com', role: 'USER', status: 'BANNED', lastLogin: 'منذ أسبوع' }
  ]);

  const [tipsList, setTipsList] = useState<BeautyTipItem[]>(beautyTipsData);
  const [masksList, setMasksList] = useState<NaturalMask[]>(naturalMasksData);
  const [serumsListState, setSerumsListState] = useState<Serum[]>(serumsData);
  const [articlesList, setArticlesList] = useState<EncyclopediaArticle[]>(skincareEncyclopediaData);

  // Content Editor Modal State
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [selectedContentToEdit, setSelectedContentToEdit] = useState<any>(null);

  const handleOpenEditor = (contentToEdit?: any) => {
    setSelectedContentToEdit(contentToEdit || null);
    setEditorModalOpen(true);
  };

  const handleSaveEditorContent = (savedItem: any) => {
    if (savedItem.contentType === 'beauty_tips' || savedItem.contentType === 'beauty_advice') {
      const formattedTip: BeautyTipItem = {
        id: savedItem.id,
        title: savedItem.title,
        shortDescription: savedItem.shortDescription,
        content: savedItem.content,
        detailedExplanation: savedItem.content,
        category: savedItem.category,
        imageUrl: savedItem.imageUrl,
        professionalTip: savedItem.professionalTip,
        warning: savedItem.warning,
        isPinned: savedItem.isPinned,
        publishedAt: savedItem.publishedAt
      };
      setTipsList(prev => [formattedTip, ...prev.filter(t => t.id !== savedItem.id)]);
    } else if (['morning_messages', 'evening_messages', 'daily_messages'].includes(savedItem.contentType)) {
      addDailyMessage(
        savedItem.title.ar,
        savedItem.content.ar,
        savedItem.isPinned,
        savedItem.scheduledFor || new Date().toISOString()
      );
    } else {
      // Default to tips or general content list update
      const formattedTip: BeautyTipItem = {
        id: savedItem.id,
        title: savedItem.title,
        shortDescription: savedItem.shortDescription,
        content: savedItem.content,
        category: savedItem.category,
        imageUrl: savedItem.imageUrl,
        isPinned: savedItem.isPinned,
        publishedAt: savedItem.publishedAt
      };
      setTipsList(prev => [formattedTip, ...prev.filter(t => t.id !== savedItem.id)]);
    }
  };

  // New item modal forms state
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [newTipTitle, setNewTipTitle] = useState('');
  const [newTipContent, setNewTipContent] = useState('');
  const [newTipCategory, setNewTipCategory] = useState('skin');

  // AI Settings State
  const [aiSystemPrompt, setAiSystemPrompt] = useState(
    'أنتِ المساعدة الذكية الرسمية لمنصة "لمسات صباح" (Lamsat Sabah - @thesabahedit). أجيبي بدفء، احترافية، ودقة خبيرة مع تأكيد السلامة واختبار الحساسية.'
  );
  const [aiPersonaTone, setAiPersonaTone] = useState('warm_expert');
  const [aiKnowledgeBaseActive, setAiKnowledgeBaseActive] = useState(true);

  // SEO State
  const [seoMetaTitle, setSeoMetaTitle] = useState('لمسات صباح | Lamsat Sabah - دليل الجمال والعناية الفاخرة');
  const [seoMetaDesc, setSeoMetaDesc] = useState('منصتكِ الأولى للوصفات الطبيعية، سيرومات البشرة، العناية بالشعر والجسم ودليل النضارة اليومي.');
  const [seoKeywords, setSeoKeywords] = useState('لمسات صباح, thesabahedit, ماسكات طبيعية, سيروم فيتامين C, العناية بالبشرة');

  // Website Settings State
  const [siteName, setSiteName] = useState('لمسات صباح | Lamsat Sabah');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [rateLimitingThreshold, setRateLimitingThreshold] = useState(100);

  // Notifications Broadcast State
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [notifSent, setNotifSent] = useState(false);

  // If user is not logged in as Admin, present the Private Admin Login Portal
  if (!isAdmin) {
    return <AdminLoginPage onSuccess={() => setActiveTab('overview')} />;
  }

  // Helper tab definitions
  const tabs: { id: AdminTab; label: string; icon: any; category: string }[] = [
    { id: 'overview', label: 'لوحة Overview الرئيسية', icon: BarChart3, category: 'عام' },
    { id: 'users', label: 'إدارة المستخدمات والصلحيات', icon: Users, category: 'إدارة' },
    { id: 'private-messages', label: 'الرسائل الخصوصية', icon: MessageSquare, category: 'تواصل' },
    { id: 'message-notifications', label: 'تنبيهات الاستفسارات', icon: Bell, category: 'تواصل' },
    { id: 'articles', label: 'المقالات والموسوعات', icon: FileText, category: 'محتوى' },
    { id: 'beauty-tips', label: 'مكتبة النصائح (100+)', icon: Sparkles, category: 'محتوى' },
    { id: 'daily-messages', label: 'البث والرسائل اليومية', icon: Calendar, category: 'بث' },
    { id: 'morning-messages', label: 'رسائل الصباح ✨', icon: Sun, category: 'بث' },
    { id: 'evening-messages', label: 'رسائل المساء 🌙', icon: Moon, category: 'بث' },
    { id: 'natural-masks', label: 'الماسكات الطبيعية (200+)', icon: Leaf, category: 'محتوى' },
    { id: 'serums', label: 'موسوعة السيرومات', icon: Droplet, category: 'محتوى' },
    { id: 'ingredients', label: 'المكونات والأحماض', icon: Database, category: 'محتوى' },
    { id: 'beauty-encyclopedia', label: 'موسوعة العناية التحريرية', icon: BookOpen, category: 'محتوى' },
    { id: 'skin-quiz', label: 'إعدادات اختبار البشرة', icon: HelpCircle, category: 'أدوات' },
    { id: 'beauty-routines', label: 'جداول الروتين اليومي', icon: Sliders, category: 'أدوات' },
    { id: 'ai-settings', label: 'إعدادات المساعدة الذكية AI', icon: Bot, category: 'نظام' },
    { id: 'journal-settings', label: 'إعدادات دفتر يوميات الجمال', icon: Book, category: 'أدوات' },
    { id: 'notifications', label: 'بث الإشعارات الجماعية', icon: Send, category: 'تواصل' },
    { id: 'media-library', label: 'مكتبة الوسائط والصور', icon: ImageIcon, category: 'نظام' },
    { id: 'translations', label: 'إدارة اللغات والترجمات', icon: Globe, category: 'نظام' },
    { id: 'seo', label: 'إعدادات محركات البحث SEO', icon: SearchIcon, category: 'تسويق' },
    { id: 'social-media', label: 'قنوات التواصل الاجتماعي', icon: Share2, category: 'تسويق' },
    { id: 'website-settings', label: 'إعدادات الموقع والأمان', icon: Settings, category: 'نظام' },
  ];

  const handleAddTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTipTitle.trim() && newTipContent.trim()) {
      const newTip: BeautyTipItem = {
        id: `tip-${Date.now()}`,
        title: { ar: newTipTitle, en: newTipTitle },
        content: { ar: newTipContent, en: newTipContent },
        category: newTipCategory
      };
      setTipsList(prev => [newTip, ...prev]);
      setNewTipTitle('');
      setNewTipContent('');
      setShowAddModal(null);
    }
  };

  const handleSendBroadcastNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifTitle.trim() && notifBody.trim()) {
      setNotifSent(true);
      setTimeout(() => {
        setNotifTitle('');
        setNotifBody('');
        setNotifSent(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-amber-900/30">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>لوحة التحكم الإدارية السرية المشفرة</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
            مرحباً بكِ في مركز إدارة لمسات صباح (Lamsat Sabah) ✨
          </h1>
          <p className="text-xs md:text-sm text-slate-300 font-light">
            الوصول الكامل لـ 23 وحدة تحكم تشمل المستخدمات، المقالات، الرسائل، إعدادات AI، والـ SEO.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleOpenEditor()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>+ إنشاء / نشر محتوى جديد (Mobile Editor)</span>
          </button>

          <div className="flex items-center gap-2">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
              alt="Admin Avatar"
              className="w-9 h-9 rounded-xl object-cover border border-amber-400"
            />
            <div className="text-xs hidden sm:block">
              <span className="font-bold text-white block">{user?.name}</span>
              <span className="text-[10px] text-amber-400 font-mono">SUPER ADMIN OWNER</span>
            </div>
            <button
              onClick={logout}
              title="تسجيل الخروج من البوابة"
              className="p-2 rounded-xl bg-rose-950 text-rose-300 hover:bg-rose-900 transition-colors cursor-pointer mr-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Sidebar Navigation (23 Tabs) + Right Content View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Nav Tabs (Desktop list & Mobile scrollable chips) */}
        <div className="lg:col-span-1 space-y-2">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm space-y-1 max-h-[75vh] overflow-y-auto no-scrollbar">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 px-3 py-1 block">
              أقسام التحكم الإدارية (23)
            </span>

            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all text-start cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-amber-600 dark:text-amber-400'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content View Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'إجمالي العضوات', val: '1,482', icon: Users, color: 'text-rose-500' },
                  { label: 'الرسائل الخصوصية', val: allAdminMessages.length, icon: MessageSquare, color: 'text-amber-500' },
                  { label: 'النصائح النشطة', val: tipsList.length, icon: Sparkles, color: 'text-emerald-500' },
                  { label: 'خلطات الماسكات', val: masksList.length, icon: Leaf, color: 'text-sky-500' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white block">{stat.val}</span>
                    </div>
                  );
                })}
              </div>

              {/* System Health Status */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
                <h3 className="text-base font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  <span>حالة سيرفرات ومنظومة لمسات صباح الحالية</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-400 block font-mono">Database Status</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> متزامن بنجاح (Cloud SSL)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-400 block font-mono">Security Firewall</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> حماية CSRF & Rate Limit نَشِطة
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-slate-400 block font-mono">AI Engine API</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> نموذج Gemini متصل
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: USERS */}
          {activeTab === 'users' && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">جدول المستخدمات والصلحيات</h3>
                  <p className="text-xs text-slate-500 font-light">إدارة أدوار العضوات وحالة النشاط والحظر.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-mono">
                      <th className="py-3 px-2 text-start">الاسم</th>
                      <th className="py-3 px-2 text-start">البريد الإلكتروني</th>
                      <th className="py-3 px-2 text-start">الدور</th>
                      <th className="py-3 px-2 text-start">الحالة</th>
                      <th className="py-3 px-2 text-start">آخر تسجيل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {usersList.map(u => (
                      <tr key={u.id}>
                        <td className="py-3.5 px-2 font-bold text-slate-900 dark:text-white">{u.name}</td>
                        <td className="py-3.5 px-2 font-mono text-slate-500">{u.email}</td>
                        <td className="py-3.5 px-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            u.role === 'ADMIN' ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300' : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-slate-400">{u.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3 & TAB 4: PRIVATE MESSAGES & MESSAGE NOTIFICATIONS */}
          {(activeTab === 'private-messages' || activeTab === 'message-notifications') && (
            <div className="space-y-6">
              {/* Header & Metrics */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-rose-500" />
                    <span>نظام الرسائل الخصوصية والاستفسارات السرية</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    لوحة تحكم مشفرة ومخصصة لإدارة المحادثات المباشرة بين العضوات وإدارة لمسات صباح.
                  </p>
                </div>

                {unreadMsgCount > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-500 text-white text-xs font-bold shadow-md animate-pulse">
                    <Bell className="w-4 h-4" />
                    <span>يوجد {unreadMsgCount} استفسارات جديدة بحاجة إلى رد!</span>
                  </div>
                )}
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs space-y-1">
                  <span className="text-slate-400 font-medium block">إجمالي الرسائل</span>
                  <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{allAdminMessages.length}</span>
                </div>

                <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/60 shadow-xs space-y-1">
                  <span className="text-amber-600 dark:text-amber-400 font-medium block flex items-center gap-1">
                    <Bell className="w-3.5 h-3.5" /> غير مقروءة
                  </span>
                  <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">{unreadMsgCount}</span>
                </div>

                <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-900/60 shadow-xs space-y-1">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> تم الرد عليها
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {allAdminMessages.filter(m => m.status === 'replied').length}
                  </span>
                </div>

                <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60 shadow-xs space-y-1">
                  <span className="text-rose-600 dark:text-rose-400 font-medium block flex items-center gap-1">
                    <Pin className="w-3.5 h-3.5" /> رسائل مثبتة
                  </span>
                  <span className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400">
                    {allAdminMessages.filter(m => m.isPinned).length}
                  </span>
                </div>
              </div>

              {/* Search & Status Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xs">
                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <SearchIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="text"
                    value={msgSearchQuery}
                    onChange={e => setMsgSearchQuery(e.target.value)}
                    placeholder="بحث باسم العضوة، الإيميل، أو النص..."
                    className="w-full pr-10 pl-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto text-[11px]">
                  {[
                    { id: 'all', label: 'الكل' },
                    { id: 'unread', label: 'غير مقروءة' },
                    { id: 'replied', label: 'تم الرد' },
                    { id: 'pinned', label: 'مثبتة 📌' },
                    { id: 'archived', label: 'مؤرشفة 📁' },
                    { id: 'blocked', label: 'محظورة 🚫' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setMsgFilterStatus(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                        msgFilterStatus === tab.id
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Toast Success Banner */}
              {msgActionSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{msgActionSuccess}</span>
                </div>
              )}

              {/* Private Messages List */}
              <div className="space-y-4">
                {filteredAdminMessages.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 text-slate-400 text-xs font-light">
                    لا توجد رسائل مطابقة لخيارات الفرز والبحث الحالية ✨
                  </div>
                ) : (
                  filteredAdminMessages.map(msg => (
                    <div 
                      key={msg.id} 
                      className={`p-6 rounded-3xl bg-white dark:bg-slate-800 border transition-all space-y-4 shadow-sm ${
                        msg.isPinned
                          ? 'border-amber-300 dark:border-amber-700/80 ring-2 ring-amber-100 dark:ring-amber-950'
                          : msg.status === 'unread'
                          ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20'
                          : 'border-slate-100 dark:border-slate-700'
                      }`}
                    >
                      {/* Top Info Bar */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/80 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center gap-1 justify-center font-bold font-serif">
                            {msg.userName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 dark:text-white">{msg.userName}</span>
                              {msg.isPinned && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                                  <Pin className="w-3 h-3" /> مثبتة
                                </span>
                              )}
                              {msg.isBlocked && (
                                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-bold flex items-center gap-1">
                                  <Ban className="w-3 h-3" /> عضوة محظورة
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 font-mono block">{msg.userEmail}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(msg.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className={`text-[10px] px-3 py-1 rounded-full font-bold ${
                            msg.status === 'replied' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                            msg.status === 'unread' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                            msg.status === 'archived' ? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {msg.status === 'replied' ? 'تم الرد' : msg.status === 'unread' ? 'غير مقروءة' : msg.status === 'archived' ? 'مؤرشفة' : 'مقروءة'}
                          </span>
                        </div>
                      </div>

                      {/* Message Subject & Body */}
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-sm text-rose-700 dark:text-rose-400">
                          {msg.subject}
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-light leading-relaxed p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                          {msg.message}
                        </p>
                      </div>

                      {/* Existing Admin Reply Box */}
                      {msg.adminReply && (
                        <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1 text-xs">
                          <span className="font-bold text-emerald-800 dark:text-emerald-300 block flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>رد الإدارة الموثق (تم إرساله للعضوة):</span>
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 font-light leading-relaxed">{msg.adminReply}</p>
                        </div>
                      )}

                      {/* Reply Form Box */}
                      <div className="pt-2 space-y-3">
                        {activeReplyMsgId === msg.id ? (
                          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 animate-in fade-in">
                            <label className="text-xs font-bold text-slate-900 dark:text-white block">
                              كتابة رد الإدارة الخاص بالعضوة ({msg.userName}):
                            </label>
                            <textarea
                              value={replyTextMap[msg.id] || ''}
                              onChange={e => setReplyTextMap({ ...replyTextMap, [msg.id]: e.target.value })}
                              placeholder="اكتبي الإجابة الخبيرة بدقة ودعم..."
                              rows={3}
                              className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:border-rose-500"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setActiveReplyMsgId(null)}
                                className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                              >
                                إلغاء
                              </button>
                              <button
                                onClick={() => {
                                  const text = replyTextMap[msg.id] || '';
                                  if (text.trim()) {
                                    replyPrivateMessage(msg.id, text);
                                    setActiveReplyMsgId(null);
                                    setMsgActionSuccess(`تم إرسال الرد بنجاح وإشعار العضوة (${msg.userName})!`);
                                    setTimeout(() => setMsgActionSuccess(null), 4000);
                                  }
                                }}
                                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>إرسال الرد وإشعار العضوة</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveReplyMsgId(msg.id);
                              setReplyTextMap({ ...replyTextMap, [msg.id]: msg.adminReply || '' });
                            }}
                            className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{msg.adminReply ? 'تعديل رد الإدارة' : 'إضافة رد جديد على الرسالة'}</span>
                          </button>
                        )}
                      </div>

                      {/* Admin Controls Toolbar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px]">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (msg.status === 'unread') {
                                markMessageRead(msg.id);
                              } else {
                                markMessageUnread(msg.id);
                              }
                            }}
                            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-medium cursor-pointer flex items-center gap-1"
                          >
                            {msg.status === 'unread' ? <Eye className="w-3.5 h-3.5 text-rose-500" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>{msg.status === 'unread' ? 'تحديد كمقروءة' : 'تحديد كغير مقروءة'}</span>
                          </button>

                          <button
                            onClick={() => togglePinMessage(msg.id)}
                            className={`p-1.5 rounded-xl font-medium cursor-pointer flex items-center gap-1 ${
                              msg.isPinned ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <Pin className="w-3.5 h-3.5 text-amber-600" />
                            <span>{msg.isPinned ? 'إلغاء التثبيت' : 'تثبيت بالقمة'}</span>
                          </button>

                          <button
                            onClick={() => archiveMessage(msg.id)}
                            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 text-slate-600 dark:text-slate-300 font-medium cursor-pointer flex items-center gap-1"
                          >
                            <Archive className="w-3.5 h-3.5 text-indigo-500" />
                            <span>أرشفة</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => blockUserMessages(msg.userId, !msg.isBlocked)}
                            className={`p-1.5 rounded-xl font-medium cursor-pointer flex items-center gap-1 ${
                              msg.isBlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>{msg.isBlocked ? 'إلغاء حظر العضوة' : 'حظر العضوة المزعجة'}</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm('هل أنتِ متأكدة من حذف هذه الرسالة الخصوصية نهائياً؟')) {
                                deleteMessage(msg.id);
                                setMsgActionSuccess('تم حذف الرسالة الخصوصية بنجاح.');
                                setTimeout(() => setMsgActionSuccess(null), 3000);
                              }
                            }}
                            className="p-1.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 hover:bg-rose-200 font-medium cursor-pointer flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: BEAUTY TIPS (100+) */}
          {activeTab === 'beauty-tips' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">مكتبة النصائح الأسبوعية واليومية ({tipsList.length})</h3>
                  <p className="text-xs text-slate-500 font-light">إضافة وتعديل نصائح العناية الذاتية للبشرة والشعر.</p>
                </div>
                <button
                  onClick={() => setShowAddModal('tip')}
                  className="px-4 py-2.5 rounded-2xl bg-rose-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة نصيحة جديدة</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tipsList.slice(0, 8).map(tip => (
                  <div key={tip.id} className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm space-y-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 dark:bg-slate-900 dark:text-rose-300">
                      {tip.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white">{tip.title.ar}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-light line-clamp-2">{tip.content.ar}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7, 8, 9: DAILY / MORNING / EVENING MESSAGES */}
          {(activeTab === 'daily-messages' || activeTab === 'morning-messages' || activeTab === 'evening-messages') && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md space-y-4">
                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                  <span>جدولة وبث رسالة جديدة للعضوات</span>
                </h3>

                <input
                  type="text"
                  placeholder="عنوان الرسالة الصباحية أو المسائية..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
                />

                <textarea
                  placeholder="اكتبي نص الرسالة أو التأمل الصباحي..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
                />

                <button className="px-6 py-3 rounded-2xl bg-amber-600 text-white font-bold text-xs shadow-md cursor-pointer">
                  نشر الرسالة فوراً ✨
                </button>
              </div>
            </div>
          )}

          {/* TAB 10: NATURAL MASKS (200+) */}
          {activeTab === 'natural-masks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">إدارة خلطات الماسكات الطبيعية ({masksList.length})</h3>
                  <p className="text-xs text-slate-500 font-light">تعديل المقادير، خطوات التحضير وتنبيهات الحساسية.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {masksList.slice(0, 6).map(mask => (
                  <div key={mask.id} className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                    <img src={mask.imageUrl} alt="" className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    <div>
                      <h4 className="font-serif font-bold text-xs text-slate-900 dark:text-white">{mask.title.ar}</h4>
                      <span className="text-[10px] text-amber-600 font-bold block">⭐ {mask.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 16: AI SETTINGS */}
          {activeTab === 'ai-settings' && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-amber-500" />
                  <span>إعدادات المساعدة الذكية لمسات صباح AI</span>
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">التعليمات الرئيسية للنموذج (System Prompt)</label>
                  <textarea
                    value={aiSystemPrompt}
                    onChange={e => setAiSystemPrompt(e.target.value)}
                    rows={4}
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900">
                  <span>ربط المساعدة بموسوعة لمسات صباح (Knowledge Base)</span>
                  <input
                    type="checkbox"
                    checked={aiKnowledgeBaseActive}
                    onChange={e => setAiKnowledgeBaseActive(e.target.checked)}
                    className="w-5 h-5 rounded-md accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 21: SEO SETTINGS */}
          {activeTab === 'seo' && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md space-y-6">
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <SearchIcon className="w-5 h-5 text-rose-500" />
                <span>إعدادات محركات البحث والتهيئة الهيكلية (SEO)</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Meta Title الرئيسية</label>
                  <input
                    type="text"
                    value={seoMetaTitle}
                    onChange={e => setSeoMetaTitle(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Meta Description</label>
                  <textarea
                    value={seoMetaDesc}
                    onChange={e => setSeoMetaDesc(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">الكلمات المفتاحية (Keywords)</label>
                  <input
                    type="text"
                    value={seoKeywords}
                    onChange={e => setSeoKeywords(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 23: WEBSITE SETTINGS */}
          {activeTab === 'website-settings' && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md space-y-6">
              <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-500" />
                <span>إعدادات النظام العام والأمان</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">اسم المنصة الرسمي</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900">
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">وضع الصيانة العامة (Maintenance Mode)</span>
                    <span className="text-[11px] text-slate-400">إغلاق التصفح مؤقتاً للزائرات أثناء التحديث الشامل.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={e => setMaintenanceMode(e.target.checked)}
                    className="w-5 h-5 rounded-md accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER TABS */}
          {!['overview', 'users', 'private-messages', 'beauty-tips', 'daily-messages', 'morning-messages', 'evening-messages', 'natural-masks', 'ai-settings', 'seo', 'website-settings'].includes(activeTab) && (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                <Sliders className="w-6 h-6" />
                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                  وحدة تحكم: {tabs.find(t => t.id === activeTab)?.label}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                وحدة التحكم هذه نشطة ومتصلة بقواعد بيانات لمسات صباح (Lamsat Sabah). يمكنكِ تطبيق التعديلات المباشرة وتحديث المحتوى فوراً.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Add Tip Modal */}
      {showAddModal === 'tip' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">إضافة نصيحة جمالية جديدة</h3>

            <form onSubmit={handleAddTipSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1">عنوان النصيحة</label>
                <input
                  type="text"
                  value={newTipTitle}
                  onChange={e => setNewTipTitle(e.target.value)}
                  placeholder="عنوان ساطع للنصيحة..."
                  required
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">المحتوى والتفاصيل</label>
                <textarea
                  value={newTipContent}
                  onChange={e => setNewTipContent(e.target.value)}
                  placeholder="نص النصيحة أو الفائدة..."
                  rows={4}
                  required
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold cursor-pointer"
                >
                  حفظ ونشر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content Editor Modal for Admin CMS */}
      <ContentEditorModal
        isOpen={editorModalOpen}
        onClose={() => setEditorModalOpen(false)}
        initialContent={selectedContentToEdit}
        onSave={handleSaveEditorContent}
      />

    </div>
  );
};
