/**
 * Lamsat Sabah | لمسات صباح - Comprehensive Legal, Privacy & Copyright Pages
 */

import React from 'react';
import { ShieldCheck, Lock, FileText, AlertTriangle, Mail, CheckCircle2, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  section: 'privacy' | 'terms' | 'cookie' | 'disclaimer' | 'copyright' | 'contact';
}

export const LegalPage: React.FC<LegalPageProps> = ({ section }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto text-slate-800 dark:text-slate-200">
      
      {section === 'privacy' && (
        <div className="space-y-6 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <Lock className="w-8 h-8 text-rose-500" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              سياسة الخصوصية وأمان البيانات (Privacy Policy)
            </h1>
          </div>

          <div className="space-y-4 text-xs md:text-sm leading-relaxed font-light text-slate-700 dark:text-slate-300">
            <p>
              نحن في موقع لمسات صباح (Lamsat Sabah - @thesabahedit) نولي أهمية قصوى لخصوصية وأمان بيانات الزائرات والعضوات. توضح هذه السياسة كيفية جمع واستخدام وتأمين البيانات المتعلقة باستخدامكِ لخدماتنا.
            </p>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">1. جمع البيانات واستخدامها</h3>
            <p>
              نحن نجمع فقط المعلومات الضرورية لتخصيص تجربة العناية بالجمال، مثل تفضيلات نوع البشرة والشعر المدخلة في الاختبار الجمالي، والبريد الإلكتروني للراغبات في الانضمام للنشرة البريدية أو تسجيل الحسابات.
            </p>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">2. الخصوصية السرية لليوميات والصور</h3>
            <p>
              جميع الصور والبيانات المدخلة في دفتر يوميات الجمال ومعرض صور التطورات (قبل وبعد) يتم حفظها وتخزينها بخصوصية تامة واستخدام محلي أو مشفر، ولا يتم مشاركتها إطلاقاً مع أي طرف ثالث أو استخدامها للأغراض الترويجية دون موافقتكِ الكتابية المسبقة.
            </p>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">3. حماية البيانات وأمن النقل</h3>
            <p>
              نستخدم بروتوكولات التشفير القياسية العالية (SSL/TLS) لحماية حركة نقل البيانات بين متصفحكِ وسيرفرات الموقع لمنع أي وصول غير مصرح به.
            </p>
          </div>
        </div>
      )}

      {section === 'terms' && (
        <div className="space-y-6 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <FileText className="w-8 h-8 text-amber-500" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              شروط وأحكام الاستخدام (Terms of Service)
            </h1>
          </div>

          <div className="space-y-4 text-xs md:text-sm leading-relaxed font-light text-slate-700 dark:text-slate-300">
            <p>
              أهلاً بكِ في لمسات صباح. باكتشافكِ وتصفحكِ لخدماتنا، فإنكِ توافقين على الالتزام الكامل بشروط وأحكام الاستخدام المبينة أدناه.
            </p>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">1. الملكية الفكرية وحقوق النشر</h3>
            <p>
              جميع المواد المنشورة على هذا الموقع، بما في ذلك النصوص، المقالات الموسوعية، الوصفات الطبيعية، التصميمات، الشعارات، والعلامات التجارية لـ لمسات صباح و Lamsat Sabah و @thesabahedit هي ملكية حصرية وحقوق طبع محفوظة. يُحظر تماماً نسخ أو إعادة نشر أي جزء دون إذن كتابي رسمي.
            </p>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">2. الاستخدام المسموح</h3>
            <p>
              يُسمح بالاستخدام الشخصي التحريري غير التجاري. أي استخدام تجاري لأي خلطة أو محتوى بدون ترخيص رسمي يعرض صاحبه للمسائلة القانونية بموجب قوانين حقوق الملكية الفكرية.
            </p>
          </div>
        </div>
      )}

      {section === 'cookie' && (
        <div className="space-y-6 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <Lock className="w-8 h-8 text-amber-500" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              سياسة ملفات تعريف الارتباط (Cookie Policy)
            </h1>
          </div>

          <div className="space-y-4 text-xs md:text-sm leading-relaxed font-light text-slate-700 dark:text-slate-300">
            <p>
              تستخدم منصة لمسات صباح (Lamsat Sabah) ملفات تعريف الارتباط وتقنيات التخزين المحلي الآمنة لتحسين وتخصيص تجربة التصفح للعضوات والزائرات.
            </p>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">1. ملفات التفضيلات والمظهر</h3>
            <p>
              نستخدم التخزين المحلي لحفظ خياراتكِ المفضلة مثل اللغات المختارة (العربية، الإنجليزية وغيرها) والمظهر البصري (الوضع الليلي / النهاري) لضمان تصفح سلس بدون الحاجة لإعادة ضبط الخيارات مع كل زيارة.
            </p>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">2. حماية الخصوصية</h3>
            <p>
              ملفات تعريف الارتباط المستخدمة لا تقوم بجمع أو تتبع بياناتكِ الشخصية الحساسة خارج نطاق التطبيق، ولا يتم بيع أو تتبع أي بيانات لأغراض إعلانية خارجية.
            </p>
          </div>
        </div>
      )}

      {section === 'disclaimer' && (
        <div className="space-y-6 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <AlertTriangle className="w-8 h-8 text-rose-600" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              إخلاء المسؤولية الطبية والجذرية (Medical Disclaimer)
            </h1>
          </div>

          <div className="space-y-4 text-xs md:text-sm leading-relaxed font-light text-slate-700 dark:text-slate-300">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 font-medium">
              تنبيه هام: المحتوى والمعلومات المتاحة في لمسات صباح مخصصة لأغراض التثقيف الجمالي والتوجيه العام فقط، ولا تعتبر بديلاً عن الاستشارة أو التشخيص أو العلاج الطبي المتخصص من قبل طبيب أمراض جلدية مرخص.
            </div>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">1. اختبار الحساسية (Patch Test)</h3>
            <p>
              تُلزم لمسات صباح جميع الزائرات بضرورة إجراء اختبار الحساسية على جزء صغير من الجلد (الساعد أو خلف الأذن) لمدة 24 إلى 48 ساعة قبل تطبيق أي خلطة طبيعية أو سيروم جديد لتفادي الحساسية الفردية للمكونات النباتية.
            </p>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pt-2">2. للحوامل والمرضعات والظروف الخاصة</h3>
            <p>
              يجب على الحوامل والمرضعات أو اللاتي يعانين من حالات جلدية مزمنة (مثل الإكزيما الحادة، الصدفية، أو حب الشباب الالتهابي الشديد) استشارة الطبيب المختص قبل البدء بأي روتين جديد يحتوي على مكونات نشطة مثل الريتينول أو الأحماض المركزة.
            </p>
          </div>
        </div>
      )}

      {section === 'copyright' && (
        <div className="space-y-6 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              إشعار حقوق الملكية وحماية DMCA
            </h1>
          </div>

          <div className="space-y-4 text-xs md:text-sm leading-relaxed font-light text-slate-700 dark:text-slate-300">
            <p>
              جميع الحقوق محفوظة لـ لمسات صباح | Lamsat Sabah © {new Date().getFullYear()}.
            </p>
            <p>
              العلامة التجارية @thesabahedit والهوية البصرية والشعارات والنصوص التحريرية محمية بموجب الاتفاقيات الدولية لحقوق الملكية الفكرية وحماية المبدعين.
            </p>
          </div>
        </div>
      )}

      {section === 'contact' && (
        <div className="space-y-6 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <Mail className="w-8 h-8 text-rose-500" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
              تواصل معنا ومع المنصات الرسمية
            </h1>
          </div>

          <div className="space-y-4 text-xs md:text-sm leading-relaxed font-light text-slate-700 dark:text-slate-300">
            <p>
              يسعدنا دائماً التواصل والتفاعل معكِ عبر منصات لمسات صباح الرسمية:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <a href="https://www.instagram.com/thesabahedit?igsh=dGNmeGJqaXkwcjc5" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-rose-50 dark:bg-slate-900 border border-rose-100 dark:border-slate-700 flex items-center gap-3 hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6 text-pink-600" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">الانستغرام الرسمي</span>
                  <span className="text-xs text-rose-600 font-mono">@thesabahedit</span>
                </div>
              </a>

              <a href="https://www.whatsapp.com/channel/0029VbCL3nP1noz1mQPDyl42" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-900 border border-emerald-100 dark:border-slate-700 flex items-center gap-3 hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">قناة الواتساب الرسمية</span>
                  <span className="text-xs text-emerald-600 font-mono">Lamsat Sabah Channel</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
