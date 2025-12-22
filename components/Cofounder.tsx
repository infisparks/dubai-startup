'use client'

import React, { useState } from 'react'

interface CoFoundersPageProps {
  language: 'en' | 'ar'
}

// All text content extracted and enhanced with a 'role'
const translations = {
  en: {
    title: 'Our Co-Founders',
    readMore: 'Read More',
    readLess: 'Read Less',
    coFounders: [
      {
        name: 'Sanjay Bhambri',
        // Added a 'role' for better typographic hierarchy
        role: 'Travel Entrepreneur & Management Consultant',
        bio: 'Travel Entrepreneur, Management Consultant, Specialized In International Business Development. With a proven track record of leadership, strategy, and cross-border collaborations, Specialized in International Business Development while also contributing actively to humanitarian and non-profit sectors.',
        image: '/speaker/10.png',
      },
      {
        name: 'Farid Ahmed',
        // Added a 'role' for better typographic hierarchy
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
        // Added a 'role' for better typographic hierarchy
        role: 'رائد أعمال في مجال السفر ومستشار إداري',
        bio: 'رائد أعمال في مجال السفر، مستشار إداري، متخصص في تطوير الأعمال الدولية. يتمتع بسجل حافل في القيادة والاستراتيجية والتعاون عبر الحدود، ومتخصص في تطوير الأعمال الدولية ويساهم بنشاط في القطاعات الإنسانية وغير الربحية.',
        image: '/speaker/5.png',
      },
      {
        name: 'فريد أحمد',
        // Added a 'role' for better typographic hierarchy
        role: 'محترف في صناعة النفط والغاز',
        bio: 'السيد فريد أحمد محترف متمرس يتمتع بخبرة واسعة في صناعة النفط والغاز، متخصص في تطوير الأعمال، والشراكات الاستراتيجية، وتسهيل الاستثمار. على مر السنين، لعب دورًا محوريًا في دفع النمو عبر قطاعات متعددة من خلال ربط المستثمرين بفرص عالية الإمكانات في الطاقة والبنية التحتية والأسواق الناشئة.',
        image: '/speaker/6.png',
      },
    ],
  },
}

// The JS truncateBio function is no longer needed,
// we will use Tailwind's 'line-clamp' plugin for a cleaner CSS-based solution.

export default function CoFoundersPage({ language = 'en' }: CoFoundersPageProps) {
  const t = translations[language]
  // State to track expanded bios by founder name
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  // Function to toggle expansion
  const toggleExpand = (name: string) => {
    setExpandedIds((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    )
  }

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Page Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            {t.title}
          </h1>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Meet the Team
          </h2>
          <div className="mt-6 h-1.5 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto" />
        </div>

        {/* Co-Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {t.coFounders.map((founder) => {
            const isExpanded = expandedIds.includes(founder.name)

            return (
              <div
                key={founder.name}
                // UPDATED: Centered all content and improved hover effects
                className="relative flex flex-col items-center text-center bg-white rounded-3xl border border-slate-200 shadow-xl shadow-cyan-500/10 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out p-6 sm:p-8 hover:-translate-y-2"
              >
                {/* UPDATED: Gradient Image Ring */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full mb-6 p-1 bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    // UPDATED: Added border for a clean cutout effect
                    className="w-full h-full rounded-full object-cover border-4 border-white"
                  />
                </div>

                {/* UPDATED: Name and new Role element */}
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  {founder.name}
                </h3>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                  {founder.role}
                </p>

                {/* UPDATED: Bio section now uses flex-grow to push button to bottom */}
                <div className="flex-grow flex flex-col w-full">
                  <p
                    // UPDATED: Using CSS line-clamp for modern truncation
                    className={`text-base text-slate-600 leading-relaxed flex-grow ${!isExpanded ? 'line-clamp-4' : '' // Clamps to 4 lines
                      }`}
                  >
                    {founder.bio}
                  </p>

                  {/* UPDATED: Replaced span with a modern button */}
                  <button
                    onClick={() => toggleExpand(founder.name)}
                    className="text-sm font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-full px-4 py-1.5 transition-colors mt-4 self-center"
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