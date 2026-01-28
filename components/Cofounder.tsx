'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Quote } from 'lucide-react'

interface CoFoundersPageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'Our Co-Founders',
    readMore: 'Read Full Bio',
    readLess: 'Show Less',
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
        bio: 'Farid Ahmed is a seasoned professional with extensive experience in the oil and gas industry, specializing in business development, strategic partnerships, and investment facilitation. Over the years, he has played a pivotal role in driving growth across multiple sectors by connecting investors with high-potential opportunities in energy, infrastructure, and emerging markets.',
        image: '/speaker/1.png',
        imgClass: 'scale-[1.25] -translate-y-1 object-center', // Zoomed to fix cut-off
      },
    ],
  },
  ar: {
    title: 'المؤسسون المشاركون',
    readMore: 'اقرأ السيرة الذاتية الكاملة',
    readLess: 'عرض أقل',
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
        bio: 'فريد أحمد محترف متمرس يتمتع بخبرة واسعة في صناعة النفط والغاز، متخصص في تطوير الأعمال، والشراكات الاستراتيجية، وتسهيل الاستثمار. على مر السنين، لعب دورًا محوريًا في دفع النمو عبر قطاعات متعددة من خلال ربط المستثمرين بفرص عالية الإمكانات في الطاقة والبنية التحتية والأسواق الناشئة.',
        image: '/speaker/6.png',
        imgClass: 'scale-[1.25] -translate-y-1 object-center', // Zoomed to fix cut-off
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
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-[#bf1e2e] to-[#940200] rounded-full mx-auto" />
        </div>

        {/* Co-Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {t.coFounders.map((founder, index) => {
            const isExpanded = expandedIds.includes(founder.name)
            // @ts-ignore
            const customImgClass = founder.imgClass || ''

            return (
              <div
                key={founder.name}
                className="group relative bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Image Section */}
                <div className="relative shrink-0 mx-auto md:mx-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-br from-[#bf1e2e]/10 to-[#c4925f]/10 shadow-inner overflow-hidden">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={112}
                      height={112}
                      className={`w-full h-full rounded-full object-cover shadow-sm transition-transform duration-500 origin-center ${customImgClass ? `scale-[1.25] group-hover:scale-[1.35] ${customImgClass}` : 'group-hover:scale-105'
                        }`}
                    />
                  </div>
                  {/* Decorative Quote Icon */}
                  <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm border border-slate-100 text-[#bf1e2e]">
                    <Quote size={12} fill="currentColor" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow text-center md:text-start w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#bf1e2e] transition-colors duration-300 mb-1">
                    {founder.name}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-3 group-hover:border-[#c4925f]/30 transition-colors">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide group-hover:text-[#c4925f] transition-colors">
                      {founder.role}
                    </p>
                  </div>

                  <div className="relative">
                    <p className={`text-sm text-slate-600 leading-relaxed text-justify md:text-left ${!isExpanded ? 'line-clamp-3' : ''}`}>
                      {founder.bio}
                    </p>
                    {/* Gradient Fade for Collapsed State */}
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent md:hidden" />
                    )}
                  </div>

                  <button
                    onClick={() => toggleExpand(founder.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#bf1e2e] hover:text-[#940200] uppercase tracking-wider mt-4 group/btn transition-colors"
                  >
                    {isExpanded ? t.readLess : t.readMore}
                    {isExpanded ? (
                      <ChevronUp size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                    ) : (
                      <ChevronDown size={14} className="group-hover/btn:translate-y-0.5 transition-transform" />
                    )}
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