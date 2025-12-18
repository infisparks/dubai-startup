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
    <section className="w-full flex flex-col lg:flex-row bg-[#0b1120] overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Left Panel (Profile) */}
      <div className="w-full lg:w-[35%] bg-[#4a4a4a] text-white p-10 flex flex-col items-center justify-center text-center relative z-10">

        {/* Decorative Arrow for Desktop */}
        <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent ${isRtl ? 'left-0 border-l-[20px] border-l-[#4a4a4a] translate-x-full' : 'right-0 border-r-[20px] border-r-[#4a4a4a] translate-x-1/2'} z-20`}></div>

        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-white shadow-2xl mb-6 overflow-hidden transform hover:scale-105 transition-transform duration-500">
          <Image
            src="/speaker/4.png"
            alt={t.name}
            layout="fill"
            objectFit="cover"
            className="hover:scale-110 transition-transform duration-700"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.name}</h2>
        <div className="h-1 w-16 bg-yellow-500 mb-4 rounded-full"></div>
        <p className="text-gray-300 font-medium mb-6 text-lg">{t.role}</p>

        <p className="text-sm text-gray-200 max-w-xs mx-auto mb-10 italic opacity-80">
          {t.shortTagline}
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-auto">
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-[#1877F2] p-2 rounded-full group-hover:scale-110 transition-transform">
              <Facebook size={18} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">Facebook</span>
          </a>
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-[#1DA1F2] p-2 rounded-full group-hover:scale-110 transition-transform">
              <Twitter size={18} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">Twitter</span>
          </a>
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-[#0A66C2] p-2 rounded-full group-hover:scale-110 transition-transform">
              <Linkedin size={18} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Right Panel (Content) */}
      <div className="w-full lg:w-[65%] bg-[#0b1120] text-white p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">{t.title}</h1>
            <div className="h-1.5 w-12 bg-yellow-500 mt-3 rounded-full"></div>
          </div>
          <div className="w-28 sm:w-36 opacity-90">
            {/* Using a placeholder if logo-white.png exists, otherwise text */}
            <Image src="/logo-white.png" width={150} height={50} alt="Investarise" className="object-contain" />
          </div>
        </div>

        <div className="space-y-5 text-sm sm:text-base leading-7 sm:leading-8 text-gray-300 text-justify font-light tracking-wide">
          <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-yellow-500 first-letter:mr-1 first-letter:float-left">
            {t.bio[0]}
          </p>

          <div className={`space-y-5 overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {t.bio.slice(1).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-8 text-yellow-500 text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all group w-fit"
        >
          {isExpanded ? t.readLess : t.readMore}
          {isExpanded ?
            <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" /> :
            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
          }
        </button>
      </div>
    </section>
  )
}