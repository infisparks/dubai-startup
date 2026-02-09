'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Linkedin, Twitter, ChevronDown, ChevronUp, Quote } from 'lucide-react'

interface FounderPageProps {
  language: 'en' | 'ar'
}

const content = {
  en: {
    sectionTitle: 'Our Visionary Leaders',
    founders: [
      {
        name: 'Kishan Kumar Verma',
        role: 'Chief Executive Officer, Investarise Global',
        image: '/speaker/4.png',
        bio: [
          "An accomplished retail & business banking leader with over 25 years of diversified experience across the UAE and India, specializing in Sales & Distribution Management, Payroll Acquisition, Credit Cards, Personal Finance, Mortgage, SME, and Strategic Business Growth.",
          "A fiercely driven start-up catalyst, he excels in launching new business lines, leading digital transformation, and building high-performing, cross-functional teams. With a proven track record in driving bank-wide digital strategy, he has played a pivotal role in shaping organizational roadmaps, strengthening revenue models, and accelerating digital adoption.",
          "Recognized for consistently delivering double- and triple-digit growth, he blends strategic foresight with hands-on execution to penetrate new markets, enhance profitability, and achieve sustainable revenue expansion.",
        ]
      },
      {
        name: 'Sushil Sharma',
        role: 'Founder & CEO, Marwari Catalysts',
        image: '/speaker/14.png',
        bio: [
          "Founder and CEO of Marwari Catalysts, fueling the startup ecosystem in Tier 2 & 3 cities. A visionary leader committed to empowering entrepreneurs and driving innovation across emerging markets.",
          "Angel investor in 100+ startups, with a strong focus on gender diversity and inclusive growth. His deep expertise in venture capital and startup acceleration has helped numerous early-stage companies scale and succeed.",
          "He believes in the power of community and mentorship, actively working to bridge the gap between talent and opportunity in the startup landscape."
        ]
      }
    ],
    readMore: 'Read Biography',
    readLess: 'Close Biography',
    connect: 'Connect'
  },
  ar: {
    sectionTitle: 'قادتنا أصحاب الرؤية',
    founders: [
      {
        name: 'كيشان كومار فيرما',
        role: 'الرئيس التنفيذي',
        image: '/speaker/4.png',
        bio: [
          "قائد بارز في الخدمات المصرفية للأفراد والأعمال يتمتع بخبرة متنوعة تزيد عن 25 عامًا في الإمارات العربية المتحدة والهند، ومتخصص في إدارة المبيعات والتوزيع، واكتساب كشوف المرتبات، وبطاقات الائتمان، والتمويل الشخصي.",
          "بصفته محفزًا قويًا للشركات الناشئة، فهو يتفوق في إطلاق خطوط أعمال جديدة، وقيادة التحول الرقمي، وبناء فرق عالية الأداء ومتعددة الوظائف.",
          "يشتهر بتقديم نمو مزدوج وثلاثي الأرقام باستمرار، ويمزج بين البصيرة الاستراتيجية والتنفيذ العملي لاختراق أسواق جديدة، وتعزيز الربحية."
        ]
      },
      {
        name: 'سوشيل شارما',
        role: 'المؤسس والرئيس التنفيذي، Marwari Catalysts',
        image: '/speaker/14.png',
        bio: [
          "المؤسس والرئيس التنفيذي لشركة Marwari Catalysts، التي تغذي نظام الشركات الناشئة في مدن المستوى 2 و 3. قائد صاحب رؤية ملتزم بتمكين رواد الأعمال ودفع الابتكار عبر الأسواق الناشئة.",
          "مستثمر ملاك في أكثر من 100 شركة ناشئة، مع تركيز قوي على التنوع بين الجنسين والنمو الشامل. ساعدت خبرته العميقة في رأس المال الاستثماري وتسريع الشركات الناشئة العديد من الشركات في مرحلة مبكرة على التوسع والنجاح.",
          "إنه يؤمن بقوة المجتمع والإرشاد، ويعمل بنشاط لسد الفجوة بين الموهبة والفرصة في مشهد الشركات الناشئة."
        ]
      }
    ],
    readMore: 'اقرأ السيرة الذاتية',
    readLess: 'إغلاق السيرة الذاتية',
    connect: 'تواصل'
  }
}

export default function FounderPage({ language = 'en' }: FounderPageProps) {
  const t = content[language]
  const isRtl = language === 'ar'
  // Use independent state for each founder expansion
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50 to-white -z-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#034FA3]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {t.sectionTitle}
          </h2>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-[#034FA3] to-[#023c7a] rounded-full mx-auto" />
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {t.founders.map((founder, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col items-start"
            >
              {/* Image & Header */}
              <div className="flex flex-col sm:flex-row gap-6 items-start mb-6 w-full">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#034FA3]/20 to-[#c4925f]/20 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover rounded-full border-4 border-white shadow-md relative z-10"
                  />
                  {/* Decorative badge icon */}
                  <div className="absolute -bottom-1 -right-1 z-20 bg-white p-1.5 rounded-full shadow-sm border border-slate-100 text-[#034FA3]">
                    <Quote size={14} fill="currentColor" className="text-[#034FA3]" />
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#034FA3] transition-colors duration-300">
                    {founder.name}
                  </h3>
                  <div className="h-0.5 w-12 bg-[#c4925f]/30 mt-2 mb-3" />
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    {founder.role}
                  </p>

                  {/* Social Links Placeholder */}
                  <div className="flex gap-3 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-slate-400 hover:text-[#034FA3] transition-colors"><Linkedin size={18} /></button>
                    <button className="text-slate-400 hover:text-[#034FA3] transition-colors"><Twitter size={18} /></button>
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="relative w-full">
                <div className={`prose prose-sm max-w-none text-slate-600 leading-relaxed text-justify transition-all duration-500 overflow-hidden ${expandedIndex === index ? 'max-h-[1000px]' : 'max-h-[120px] mask-gradient-bottom'}`}>
                  {founder.bio.map((paragraph, i) => (
                    <p key={i} className={i === 0 ? "mb-4" : "mb-4"}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Gradient Overlay when collapsed */}
                {expandedIndex !== index && (
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </div>

              {/* Read More Trigger */}
              <button
                onClick={() => toggleExpand(index)}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#034FA3] hover:text-[#023c7a] transition-colors group/btn"
              >
                {expandedIndex === index ? t.readLess : t.readMore}
                {expandedIndex === index ? (
                  <ChevronUp size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                ) : (
                  <ChevronDown size={14} className="group-hover/btn:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}