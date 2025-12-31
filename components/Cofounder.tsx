'use client'

import React, { useState } from 'react'

interface CoFoundersPageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'Our Co-Founders',
    readMore: 'Read More',
    readLess: 'Read Less',
    coFounders: [
      {
        name: 'Sanjay Bhambri',
        role: 'Travel Entrepreneur & Management Consultant',
        bio: 'Travel Entrepreneur, Management Consultant, Specialized In International Business Development. With a proven track record of leadership, strategy, and cross-border collaborations, Specialized in International Business Development while also contributing actively to humanitarian and non-profit sectors.',
        image: '/speaker/10.png',
      },
      {
        name: 'Farid Ahmed',
        role: 'Oil & Gas Industry Professional',
        bio: 'Mr. Farid Ahmed is a seasoned professional with extensive experience in the oil and gas industry, specializing in business development, strategic partnerships, and investment facilitation. Over the years, he has played a pivotal role in driving growth across multiple sectors by connecting investors with high-potential opportunities in energy, infrastructure, and emerging markets.',
        image: '/speaker/1.png',
      },
    ],
  },
  ar: {
    title: 'المؤسسون المشاركون',
    readMore: 'اقرأ المزيد',
    readLess: 'اقرأ أقل',
    coFounders: [
      {
        name: 'سانجاي بهامبري',
        role: 'رائد أعمال في مجال السفر ومستشار إداري',
        bio: 'رائد أعمال في مجال السفر، مستشار إداري، متخصص في تطوير الأعمال الدولية. يتمتع بسجل حافل في القيادة والاستراتيجية والتعاون عبر الحدود، ومتخصص في تطوير الأعمال الدولية ويساهم بنشاط في القطاعات الإنسانية وغير الربحية.',
        image: '/speaker/5.png',
      },
      {
        name: 'فريد أحمد',
        role: 'محترف في صناعة النفط والغاز',
        bio: 'السيد فريد أحمد محترف متمرس يتمتع بخبرة واسعة في صناعة النفط والغاز، متخصص في تطوير الأعمال، والشراكات الاستراتيجية، وتسهيل الاستثمار. على مر السنين، لعب دورًا محوريًا في دفع النمو عبر قطاعات متعددة من خلال ربط المستثمرين بفرص عالية الإمكانات في الطاقة والبنية التحتية والأسواق الناشئة.',
        image: '/speaker/6.png',
      },
    ],
  },
}

export default function CoFoundersPage({ language = 'en' }: CoFoundersPageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  const toggleExpand = (name: string) => {
    setExpandedIds((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    )
  }

  return (
    <section className="relative py-12 sm:py-16 bg-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Page Title - Compact */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <div className="mt-3 h-1 w-16 bg-blue-600 rounded-full mx-auto" />
        </div>

        {/* Co-Founders Grid - Compact Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {t.coFounders.map((founder) => {
            const isExpanded = expandedIds.includes(founder.name)

            return (
              <div
                key={founder.name}
                className="relative flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-6"
              >
                {/* Image - Centered & Moderate Size */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-3 p-1 bg-gradient-to-br from-blue-500 to-cyan-400 shadow-sm hover:scale-105 transition-transform duration-300">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>

                {/* Content - Compact Centered */}
                <div className="flex-grow flex flex-col w-full">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
                    {founder.role}
                  </p>

                  <div className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                    <p className={`${!isExpanded ? 'line-clamp-3' : ''}`}>
                      {founder.bio}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleExpand(founder.name)}
                    className="text-[10px] sm:text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full px-4 py-1.5 transition-colors mt-4 self-center"
                  >
                    {isExpanded ? t.readLess : t.readMore}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}