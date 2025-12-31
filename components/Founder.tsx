'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Linkedin, Twitter, Facebook, ChevronDown, ChevronUp } from 'lucide-react'

interface FounderPageProps {
  language: 'en' | 'ar'
}

const content = {
  en: {
    title: 'Founder',
    name: 'Kishan Kumar Verma',
    role: 'Chief Executive Officer',
    shortTagline: '',
    bio: [
      "An accomplished retail & business banking leader with over 25 years of diversified experience across the UAE and India, specializing in Sales & Distribution Management, Payroll Acquisition, Credit Cards, Personal Finance, Mortgage, SME, and Strategic Business Growth.",
      "A fiercely driven start-up catalyst, he excels in launching new business lines, leading digital transformation, and building high-performing, cross-functional teams. With a proven track record in driving bank-wide digital strategy, he has played a pivotal role in shaping organizational roadmaps, strengthening revenue models, and accelerating digital adoption.",
      "Recognized for consistently delivering double- and triple-digit growth, he blends strategic foresight with hands-on execution to penetrate new markets, enhance profitability, and achieve sustainable revenue expansion. His leadership style is anchored in cultivating strong client relationships, aligning with business vision, and designing value-driven, customized solutions.",
      "Throughout his career, he has delivered top-quartile performance, transforming underperforming teams by instilling ownership, implementing robust performance frameworks, and driving cultural renewal. He is known for crafting long-term business strategies, automating processes, optimizing talent, and executing with precision to deliver consistent, measurable, and win-win outcomes."
    ],
    readMore: 'Read More',
    readLess: 'Read Less'
  },
  ar: {
    title: 'المؤسس',
    name: 'كيشان كومار فيرما',
    role: 'الرئيس التنفيذي',
    shortTagline: 'محترف مصرفي يتمتع بخبرة تزيد عن 25 عامًا',
    bio: [
      "قائد بارز في الخدمات المصرفية للأفراد والأعمال يتمتع بخبرة متنوعة تزيد عن 25 عامًا في الإمارات العربية المتحدة والهند، ومتخصص في إدارة المبيعات والتوزيع، واكتساب كشوف المرتبات، وبطاقات الائتمان، والتمويل الشخصي، والرهن العقاري، والشركات الصغيرة والمتوسطة، ونمو الأعمال الاستراتيجي.",
      "بصفته محفزًا قويًا للشركات الناشئة، فهو يتفوق في إطلاق خطوط أعمال جديدة، وقيادة التحول الرقمي، وبناء فرق عالية الأداء ومتعددة الوظائف. بفضل سجله الحافل في قيادة الاستراتيجية الرقمية على مستوى البنك، لعب دورًا محوريًا في تشكيل خرائط الطريق التنظيمية، وتعزيز نماذج الإيرادات، وتسريع التبني الرقمي.",
      "يشتهر بتقديم نمو مزدوج وثلاثي الأرقام باستمرار، ويمزج بين البصيرة الاستراتيجية والتنفيذ العملي لاختراق أسواق جديدة، وتعزيز الربحية، وتحقيق توسع مستدام في الإيرادات. يرتكز أسلوب قيادته على تنمية علاقات قوية مع العملاء، والمواءمة مع رؤية العمل، وتصميم حلول مخصصة وقائمة على القيمة.",
      "طوال حياته المهنية، قدم أداءً في الربع الأعلى، وحول الفرق ذات الأداء الضعيف من خلال غرس الملكية، وتنفيذ أطر أداء قوية، وقيادة التجديد الثقافي. وهو معروف بصياغة استراتيجيات عمل طويلة الأجل، وأتمتة العمليات، وتحسين المواهب، والتنفيذ بدقة لتقديم نتائج متسقة وقابلة للقياس ومربحة للجانبين."
    ],
    readMore: 'اقرأ المزيد',
    readLess: 'اقرأ أقل'
  }
}

export default function FounderPage({ language = 'en' }: FounderPageProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const t = content[language]
  const isRtl = language === 'ar'

  return (
    <section className="w-full bg-white border-b border-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-20">

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-8 items-start">

          {/* Left Column: Image & Socials */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-50">
              <Image
                src="/speaker/4.png"
                alt={t.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Socials - Compact Row */}
            <div className="flex gap-2 justify-center md:justify-start w-full">
              <a href="#" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 rounded transition-all">
                <Facebook size={14} />
              </a>
              <a href="#" className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-50/50 rounded transition-all">
                <Twitter size={14} />
              </a>
              <a href="#" className="p-1.5 text-slate-400 hover:text-blue-700 hover:bg-blue-50/50 rounded transition-all">
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Header & Bio */}
          <div className="flex flex-col min-w-0">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-slate-100 pb-3 mb-3 gap-3">
              <div>
                <h4 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase mb-1">{t.title}</h4>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-none mb-1">{t.name}</h2>
                <p className="text-xs font-medium text-slate-500">{t.role}</p>
              </div>
              <div className="hidden sm:block opacity-100">
                <Image src="/logo-white.png" width={80} height={30} alt="Logo" className="object-contain filter invert opacity-80" />
              </div>
            </div>

            {/* Bio Content */}
            <div className="text-[13px] text-slate-600 leading-relaxed text-justify font-light tracking-wide">
              <p className="mb-2">
                <span className="font-semibold text-slate-900">{t.bio[0].split(' ').slice(0, 5).join(' ')}</span>
                {' ' + t.bio[0].split(' ').slice(5).join(' ')}
              </p>

              {/* Expandable Section */}
              <div className={`space-y-2 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'max-h-[800px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                {t.bio.slice(1).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Toggle Action */}
            <div className="mt-2 flex justify-start">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider flex items-center gap-1.5 py-1"
              >
                {isExpanded ? t.readLess : t.readMore}
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}