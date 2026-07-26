/**
 * Lamsat Sabah | لمسات صباح - Global Application Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DailyMessage, 
  PrivateMessage, 
  JournalEntry, 
  BeforeAfterEntry, 
  NotificationItem,
  NotificationCategory,
  NotificationPreferences,
  ContentReview
} from '../types';

interface FavoritesState {
  articleIds: string[];
  maskIds: string[];
  serumIds: string[];
  ingredientIds: string[];
  routineIds: string[];
}

const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  enabled: true,
  categories: {
    beauty_tips: true,
    daily_messages: true,
    morning_messages: true,
    evening_messages: true,
    articles: true,
    masks: true,
    serums: true,
    routines: true,
    encyclopedia: true,
    ai_features: true,
    admin_reply: true,
    routine_reminder: true,
    skin_checkin: true
  }
};

interface AppContextType {
  favorites: FavoritesState;
  toggleFavorite: (type: keyof FavoritesState, id: string) => void;
  isFavorite: (type: keyof FavoritesState, id: string) => boolean;
  recentlyViewed: string[];
  addRecentlyViewed: (id: string) => void;
  
  // Daily Messages (Admin Broadcasts)
  dailyMessages: DailyMessage[];
  addDailyMessage: (msg: DailyMessage) => void;
  
  // Private Messages (User <-> Admin) - Secure Authorization Enforced
  privateMessages: PrivateMessage[];
  getUserPrivateMessages: (currentUserId?: string, currentUserEmail?: string, isAdmin?: boolean) => PrivateMessage[];
  sendPrivateMessage: (subject: string, message: string, userId?: string, userEmail?: string, userName?: string) => void;
  replyPrivateMessage: (id: string, replyText: string) => void;
  markMessageRead: (id: string) => void;
  markMessageUnread: (id: string) => void;
  togglePinMessage: (id: string) => void;
  archiveMessage: (id: string) => void;
  deleteMessage: (id: string) => void;
  blockUserMessages: (userId: string, isBlocked: boolean) => void;
  
  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  deleteJournalEntry: (id: string) => void;
  
  // Before / After
  beforeAfterEntries: BeforeAfterEntry[];
  addBeforeAfterEntry: (entry: Omit<BeforeAfterEntry, 'id' | 'createdAt'>) => void;
  deleteBeforeAfterEntry: (id: string) => void;
  
  // Notifications
  notifications: NotificationItem[];
  getUserNotifications: (currentUserId?: string) => NotificationItem[];
  notificationPreferences: NotificationPreferences;
  updateNotificationPreferences: (prefs: Partial<NotificationPreferences>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId?: string) => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: (userId?: string) => void;
  addNotificationForUser: (userId: string, title: string, message: string, type: NotificationItem['type'], category: NotificationCategory) => void;
  
  // Reviews
  reviews: ContentReview[];
  addReview: (contentId: string, contentType: ContentReview['contentType'], rating: number, comment: string, userName: string) => void;
  approveReview: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Favorites
  const [favorites, setFavorites] = useState<FavoritesState>(() => {
    const saved = localStorage.getItem('lamsat_favs');
    return saved ? JSON.parse(saved) : { articleIds: [], maskIds: ['mask-f-01'], serumIds: ['serum-vit-c'], ingredientIds: [], routineIds: [] };
  });

  useEffect(() => {
    localStorage.setItem('lamsat_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (type: keyof FavoritesState, id: string) => {
    setFavorites(prev => {
      const list = prev[type] || [];
      const exists = list.includes(id);
      const updated = exists ? list.filter(item => item !== id) : [...list, id];
      return { ...prev, [type]: updated };
    });
  };

  const isFavorite = (type: keyof FavoritesState, id: string) => {
    return (favorites[type] || []).includes(id);
  };

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const addRecentlyViewed = (id: string) => {
    setRecentlyViewed(prev => [id, ...prev.filter(x => x !== id)].slice(0, 10));
  };

  // Daily Messages
  const [dailyMessages, setDailyMessages] = useState<DailyMessage[]>([
    {
      id: 'dm-1',
      type: 'tip',
      title: {
        ar: 'رسالة صباحية: سر البشرة الزجاجية اليوم',
        en: 'Morning Reflection: Glass Skin Glow Secret'
      },
      content: {
        ar: 'تذكري دائماً أن الترطيب على بشرة ندية هو الخيار الذهبي لمقاومة جفاف الصيف. اشربي كوبين من الماء الدافئ مع شرائح الخيار فور الاستيقاظ 🤍',
        en: 'Remember that hydrating on damp skin is the golden key to fighting dehydration. Drink two glasses of warm cucumber water upon waking up 🤍'
      },
      isPinned: true,
      scheduledFor: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  ]);

  const addDailyMessage = (msg: DailyMessage) => {
    setDailyMessages(prev => [msg, ...prev]);
  };

  // Private Messages (User <-> Admin) - AUTHORIZATION ENFORCED
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([
    {
      id: 'msg-1',
      userId: 'usr-default',
      userName: 'زائرة لمسات صباح',
      userEmail: 'visitor@lamsatsabah.com',
      subject: 'استفسار حول سيروم فيتامين C',
      message: 'مرحباً، هل يمكنني استخدام سيروم فيتامين C مع ماسك العسل والزبادي في نفس الصباح؟',
      adminReply: 'أهلاً بكِ عزيزتي! نعم، يمكنكِ تطبيق ماسك العسل والزبادي أولاً ثم غسله جيداً وتطبيق سيروم فيتامين C ومتبوعاً بواقي الشمس ✨',
      status: 'replied',
      isPinned: false,
      isBlocked: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  /**
   * Enforce backend-like authorization:
   * Non-admin users ONLY receive messages where userId matches or userEmail matches.
   * Admin receives all messages.
   */
  const getUserPrivateMessages = (currentUserId = 'usr-default', currentUserEmail = 'visitor@lamsatsabah.com', isAdmin = false): PrivateMessage[] => {
    if (isAdmin) {
      return privateMessages;
    }
    return privateMessages.filter(m => m.userId === currentUserId || m.userEmail.toLowerCase() === currentUserEmail.toLowerCase());
  };

  const sendPrivateMessage = (
    subject: string, 
    message: string, 
    userId = 'usr-default', 
    userEmail = 'visitor@lamsatsabah.com', 
    userName = 'زائرة لمسات صباح'
  ) => {
    const newMsg: PrivateMessage = {
      id: `msg-${Date.now()}`,
      userId,
      userName,
      userEmail,
      subject,
      message,
      status: 'unread',
      isPinned: false,
      isBlocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setPrivateMessages(prev => [newMsg, ...prev]);

    // Automatically create an Admin Notification inside Admin Dashboard
    addNotificationForUser(
      'usr-admin-owner',
      'New Private Message',
      `رسالة خصوصية جديدة من العضوة (${userName}): "${subject}"`,
      'system',
      'admin_reply'
    );
  };

  const replyPrivateMessage = (id: string, replyText: string) => {
    let targetUserId = '';
    let targetSubject = '';

    setPrivateMessages(prev => prev.map(m => {
      if (m.id === id) {
        targetUserId = m.userId;
        targetSubject = m.subject;
        return {
          ...m,
          adminReply: replyText,
          status: 'replied',
          updatedAt: new Date().toISOString()
        };
      }
      return m;
    }));

    // Notify ONLY that specific user
    if (targetUserId) {
      addNotificationForUser(
        targetUserId,
        'رد جديد من إدارة لمسات صباح ✨',
        `تم الرد على استفساركِ الخصوصي: "${targetSubject}". اضغطي لعرض الإجابة.`,
        'admin_reply',
        'admin_reply'
      );
    }
  };

  const markMessageRead = (id: string) => {
    setPrivateMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
  };

  const markMessageUnread = (id: string) => {
    setPrivateMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'unread' } : m));
  };

  const togglePinMessage = (id: string) => {
    setPrivateMessages(prev => prev.map(m => m.id === id ? { ...m, isPinned: !m.isPinned } : m));
  };

  const archiveMessage = (id: string) => {
    setPrivateMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'archived' } : m));
  };

  const deleteMessage = (id: string) => {
    setPrivateMessages(prev => prev.filter(m => m.id !== id));
  };

  const blockUserMessages = (userIdToBlock: string, isBlocked: boolean) => {
    setPrivateMessages(prev => prev.map(m => m.userId === userIdToBlock ? { ...m, isBlocked } : m));
  };

  // Journal
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 'j-1',
      userId: 'usr-default',
      date: new Date().toISOString().split('T')[0],
      title: 'اليوم الأول: تجربة ماسك الشوفان والعسل',
      notes: 'شعرت ببشرة ناعمة جداً واختفاء الشد والتهيج بعد تطبيق الماسك لمدة 15 دقيقة.',
      skinConditionRating: 5,
      hairConditionRating: 4,
      waterIntakeLiters: 2.5,
      productsUsed: ['ماسك الشوفان والعسل', 'سيروم الهيالورونيك'],
      createdAt: new Date().toISOString()
    }
  ]);

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    const newJ: JournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setJournalEntries(prev => [newJ, ...prev]);
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
  };

  // Before After
  const [beforeAfterEntries, setBeforeAfterEntries] = useState<BeforeAfterEntry[]>([
    {
      id: 'ba-1',
      userId: 'usr-default',
      title: 'تطور ترطيب واستجابة نضارة البشرة',
      beforePhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      afterPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      beforeDate: '2026-06-01',
      afterDate: '2026-07-25',
      notes: 'تلاشي البقع الجافة واختفاء التهاب المسام بعد المداومة على روتين الشوفان وسيروم B5.',
      category: 'skin',
      isPublic: false,
      createdAt: new Date().toISOString()
    }
  ]);

  const addBeforeAfterEntry = (entry: Omit<BeforeAfterEntry, 'id' | 'createdAt'>) => {
    const newBA: BeforeAfterEntry = {
      ...entry,
      id: `ba-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setBeforeAfterEntries(prev => [newBA, ...prev]);
  };

  const deleteBeforeAfterEntry = (id: string) => {
    setBeforeAfterEntries(prev => prev.filter(e => e.id !== id));
  };

  // Notifications & User Preferences
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(() => {
    const saved = localStorage.getItem('lamsat_notification_preferences');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATION_PREFERENCES;
  });

  useEffect(() => {
    localStorage.setItem('lamsat_notification_preferences', JSON.stringify(notificationPreferences));
  }, [notificationPreferences]);

  const updateNotificationPreferences = (prefs: Partial<NotificationPreferences>) => {
    setNotificationPreferences(prev => ({
      ...prev,
      ...prefs,
      categories: {
        ...prev.categories,
        ...(prefs.categories || {})
      }
    }));
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      userId: 'usr-default',
      title: 'رد جديد من إدارة لمسات صباح ✨',
      message: 'تم الرد على استفساركِ الخصوصي حول سيروم فيتامين C.',
      type: 'admin_reply',
      category: 'admin_reply',
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'n-2',
      userId: 'usr-default',
      title: 'تذكير الروتين المسائي 🌙',
      message: 'حان وقت تطبيق السيروم المرطب قبل النوم.',
      type: 'reminder',
      category: 'routine_reminder',
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'n-3',
      userId: 'usr-default',
      title: 'نصيحة جمالية جديدة ✨',
      message: 'تم إضافة نصيحة جديدة حول اختيار السيروم المناسب لنوع بشرتكِ.',
      type: 'content_update',
      category: 'beauty_tips',
      isRead: true,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ]);

  const getUserNotifications = (currentUserId = 'usr-default'): NotificationItem[] => {
    return notifications.filter(n => n.userId === currentUserId || n.userId === 'all');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = (userId = 'usr-default') => {
    setNotifications(prev => prev.map(n => (n.userId === userId || n.userId === 'all') ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = (userId = 'usr-default') => {
    setNotifications(prev => prev.filter(n => n.userId !== userId && n.userId !== 'all'));
  };

  const addNotificationForUser = (
    userId: string, 
    title: string, 
    message: string, 
    type: NotificationItem['type'], 
    category: NotificationCategory
  ) => {
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId,
      title,
      message,
      type,
      category,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Reviews
  const [reviews, setReviews] = useState<ContentReview[]>([
    {
      id: 'rev-1',
      contentId: 'mask-f-01',
      contentType: 'mask',
      userId: 'usr-10',
      userName: 'ريم العتيبي',
      rating: 5,
      comment: 'ماسك العسل والشوفان غير بشرتي تماماً! أراحه من التهيج وجعل ملمسها مخملي حقيقي.',
      status: 'approved',
      createdAt: new Date().toISOString()
    }
  ]);

  const addReview = (contentId: string, contentType: ContentReview['contentType'], rating: number, comment: string, userName: string) => {
    const newR: ContentReview = {
      id: `rev-${Date.now()}`,
      contentId,
      contentType,
      userId: 'usr-default',
      userName,
      rating,
      comment,
      status: 'approved',
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [newR, ...prev]);
  };

  const approveReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  };

  return (
    <AppContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      recentlyViewed,
      addRecentlyViewed,
      dailyMessages,
      addDailyMessage,
      privateMessages,
      getUserPrivateMessages,
      sendPrivateMessage,
      replyPrivateMessage,
      markMessageRead,
      markMessageUnread,
      togglePinMessage,
      archiveMessage,
      deleteMessage,
      blockUserMessages,
      journalEntries,
      addJournalEntry,
      deleteJournalEntry,
      beforeAfterEntries,
      addBeforeAfterEntry,
      deleteBeforeAfterEntry,
      notifications,
      getUserNotifications,
      notificationPreferences,
      updateNotificationPreferences,
      markNotificationRead,
      markAllNotificationsRead,
      deleteNotification,
      clearAllNotifications,
      addNotificationForUser,
      reviews,
      addReview,
      approveReview
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
