/**
 * Lamsat Sabah | لمسات صباح - AI Beauty Assistant Modal
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  User, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MessageItem {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose }) => {
  const { t, language, isRTL } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'welcome-ai',
      sender: 'ai',
      text: language === 'ar' 
        ? 'أهلاً بكِ في خبيرة لمسات صباح الذكية للجمال ✨ أنا متخصصة حصرياً في الاستشارات الجمالية، العناية بالبشرة، الشعر، الجسم، السيرومات والماسكات الطبيعية. كيف أستطيع مساعدتكِ اليوم؟'
        : 'Welcome to Lamsat Sabah AI Beauty Assistant ✨ I specialize strictly in skincare, haircare, body care, serums, and natural remedies. How can I assist your beauty routine today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    language === 'ar' ? 'ما أفضل روتين صباحي للبشرة المختلطة؟' : 'Best morning routine for combination skin?',
    language === 'ar' ? 'كيف أستخدم سيروم فيتامين C ومزاياه؟' : 'How to use Vitamin C serum correctly?',
    language === 'ar' ? 'ماسك طبيعي سريع لتفتيح ونضارة البشرة؟' : 'Quick natural mask for glowing skin?',
    language === 'ar' ? 'كيف أعالج تساقط الشعر وتقوية الجذور؟' : 'Natural remedy for hair loss and density?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || loading) return;

    const userMsg: MessageItem = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          language,
          conversationHistory: messages
        })
      });

      const data = await response.json();
      const aiReplyText = data.text || (language === 'ar' 
        ? 'أعتذر، حدث خلل بسيط في الاتصال. يرجى إعادة المحاولة ✨' 
        : 'Apologies, a slight connection error occurred. Please try again ✨');

      const aiMsg: MessageItem = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: MessageItem = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: language === 'ar'
          ? 'نعتذر عن الانقطاع المؤقت. تأكدي من الاتصال بالإنترنت أو أعيلي إرسال السؤال ✨'
          : 'Network error. Please check your connection and try again ✨',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-rose-900/40 flex flex-col h-[85vh] max-h-[700px] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-rose-900 via-amber-900 to-rose-950 text-white flex items-center justify-between border-b border-rose-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Bot className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white tracking-wide">
                {t('aiModalTitle')}
              </h3>
              <p className="text-[11px] text-amber-200/90 font-light">
                استشارات تجميلية ذكية وآمنة لـ لمسات صباح
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-amber-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scope Disclaimer Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200/60 dark:border-amber-900/40 px-4 py-2.5 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-2 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t('aiScopeNotice')}</span>
        </div>

        {/* Messages Thread Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? (isRTL ? 'flex-row' : 'flex-row-reverse') : (isRTL ? 'flex-row-reverse' : 'flex-row')}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-slate-900 dark:bg-rose-600 text-white' 
                  : 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white dark:bg-rose-600 rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/80 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-[9px] opacity-60 text-end mt-2 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl text-xs text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
                جاري صياغة الاستشارة الجمالية الفاخرة...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-2">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-3 py-1.5 rounded-full bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-slate-700 text-rose-800 dark:text-rose-200 text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer border border-rose-100 dark:border-rose-900/40"
            >
              ✨ {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder={t('aiPlaceholder')}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs md:text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500/50"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 disabled:opacity-50 text-white transition-all shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
