'use client'

import React from 'react'

interface EventOverviewProps {
  language: 'en' | 'ar'
}

// Reusing and streamlining Icon components for a professional look
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6.75V3zm-1.5 9A.75.75 0 003 12v4.5a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H3.75z" clipRule="evenodd" /></svg>
)

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M11.54 22.351A.75.75 0 0112 22.5c.183 0 .355-.06.45-.149L21 13.325a.75.75 0 000-1.22l-9.45-8.824a.75.75 0 00-1.06 0L3 12.105a.75.75 0 000 1.22l9.45 8.824zM12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg>
)

const HandshakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M7.834 5.378a5.23 5.23 0 011.053-.082c.758 0 1.396.34 1.761.884l.321.503a5.55 5.55 0 003.393 2.913 1.5 1.5 0 001.371-2.001c-.815-1.928.109-4.745 1.605-6.551.411-.476.96-.787 1.564-.903a.75.75 0 01.444.97c-.256.46-.57.882-.901 1.26l-.28.311c-1.615 1.776-2.455 4.303-1.96 6.368a2.5 2.5 0 01-2.545 2.569 2.5 2.5 0 01-2.4-1.636l-.304-.54a.75.75 0 00-.736-.457h-.146a.75.75 0 00-.638.307l-.37.556C9.284 18.57 9 20 9 20.25a.75.75 0 01-1.5 0c0-.188 0-.397.025-.592l.006-.051a3.011 3.011 0 00-.713-1.801 20.975 20.975 0 01-1.892-2.146l-.527-.645a.75.75 0 01.996-1.127l.796.885c.347.385.673.744.975 1.054.424.43.81.82 1.157 1.168a18.23 18.23 0 00-.81-3.665.75.75 0 01.385-.82l2.35-.959a7.5 7.5 0 00-1.677-4.187.75.75 0 01-.183-.557l-.023-.195a4.491 4.491 0 00-.745-1.528 5.23 5.23 0 01-1.171-.85l-.136-.129c-.702-.663-1.34-1.37-1.823-2.105a.75.75 0 011.086-.968zM5.313 17.5a.75.75 0 10-1.06 1.06l-.578-.577a.75.75 0 00-1.06 1.06l.578.577-1.06 1.06a.75.75 0 101.06 1.06L4.753 20.5l.578.578a.75.75 0 001.06-1.06l-.578-.578 1.06-1.06a.75.75 0 00-1.06-1.06z" /></svg>
)

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.644 1.63a.75.75 0 10-.888-1.26c-3.116 1.16-5.188 4.144-5.188 7.596 0 4.12 3.25 7.451 7.5 7.451s7.5-3.33 7.5-7.451c0-3.452-2.072-6.435-5.188-7.596zM12 17.25a.75.75 0 00-.75.75v2.25H9a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-2.25V18a.75.75 0 00-.75-.75z" /></svg>
)

const GlobeAltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>
)

// Data structure (minimal change, primarily for readability)
const translations = {
  en: {
    title: 'Event Overview',
    intro:
      "Investarise Global Investment Summit 2026 is a premier international platform designed to unite over 50 investors, 250 startups and SME's, and 10 speakers, alongside global partners.",
    dateLabel: 'Summit Dates',
    date: 'February 5th 2026',
    venueLabel: 'Location',
    venue: 'Taj Exotica Resort and Spa Palm Jumeirah Dubai',
    keyStakeholders: 'Key Stakeholders',
    stakeholders: [
      { count: '50+', label: 'Investors' },
      { count: '250+', label: "Startups and SME's" },
      { count: '10+', label: 'Speakers' },
    ],
    summitTheme: 'Summit Theme',
    themePhrase: '"Pitch. Connect. Prosper."',
    coreObjectives: 'Core Objectives',
    objectives: [
      { icon: HandshakeIcon, title: 'Enable Fundraising', desc: 'Helping startups secure investment opportunities and achieve scale.' },
      { icon: LightbulbIcon, title: 'Drive Innovation', desc: 'Encouraging breakthrough ideas and facilitating technology adoption.' },
      { icon: GlobeAltIcon, title: 'Cross-Border Investment', desc: 'Connecting global investors with high-growth emerging markets.' },
    ],
  },
  ar: {
    title: 'نظرة عامة على الحدث',
    intro:
      'قمة إنفستارايز العالمية للاستثمار 2026 هي منصة دولية رائدة تهدف إلى جمع أكثر من 50 مستثمر و 250 شركة ناشئة وشركات صغيرة ومتوسطة و 10 متحدثين، بالإضافة إلى الشركاء العالميين.',
    dateLabel: 'تواريخ القمة',
    date: '5 فبراير 2026',
    venueLabel: 'الموقع',
    venue: 'منتجع وسبا تاج إكزوتيكا، نخلة جميرا، دبي',
    keyStakeholders: 'أصحاب المصلحة الرئيسيون',
    stakeholders: [
      { count: '50+', label: 'مستثمر' },
      { count: '250+', label: 'شركة ناشئة وشركات صغيرة ومتوسطة' },
      { count: '10+', label: 'متحدث' },
    ],
    summitTheme: 'شعار القمة',
    themePhrase: '"اطرح. اتصل. ازدهر."',
    coreObjectives: 'الأهداف الأساسية',
    objectives: [
      { icon: HandshakeIcon, title: 'تمكين جمع التبرعات', desc: 'مساعدة الشركات الناشئة على تأمين فرص الاستثمار وتحقيق التوسع.' },
      { icon: LightbulbIcon, title: 'دفع الابتكار', desc: 'تشجيع الأفكار الرائدة وتسهيل تبني التكنولوجيا.' },
      { icon: GlobeAltIcon, title: 'الاستثمار عبر الحدود', desc: 'ربط المستثمرين العالميين بالأسواق الناشئة عالية النمو.' },
    ],
  },
}

export default function EventOverview({ language = 'en' }: EventOverviewProps) {
  const t = translations[language]

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Main Title, Intro, and Theme */}
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t.intro}
          </p>
          {/* Theme Highlight */}
          <div className="mt-8">
            <h3 className="text-base font-semibold text-slate-800 uppercase tracking-wider mb-2">
              {t.summitTheme}
            </h3>
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 italic">
              {t.themePhrase}
            </p>
          </div>
        </div>

        {/* 1. KEY STAKEHOLDERS (High-Contrast Stat Block) */}
        <div className="bg-slate-900 text-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 mb-16 lg:mb-20">
          <div className="grid grid-cols-3 gap-6 text-center">
            {t.stakeholders.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center border-r border-slate-700 last:border-r-0"
              >
                <p className="text-4xl sm:text-5xl font-extrabold text-cyan-400">
                  {stat.count}
                </p>
                <p className="mt-1 text-xs sm:text-sm uppercase tracking-widest font-medium text-slate-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. DATE, VENUE, AND OBJECTIVES (Dual-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Date & Venue (Sleek Information Block) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-fit">
            <h4 className="text-lg font-bold text-blue-600 uppercase tracking-wider mb-4">
              {t.venueLabel} & {t.dateLabel}
            </h4>

            <div className="space-y-6">
              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                  <CalendarIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {t.dateLabel}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {t.date}
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 bg-cyan-500/10 text-cyan-600 rounded-lg">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {t.venueLabel}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {t.venue}
                  </p>
                </div>
              </div>
            </div>

            {/* Small divider */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">Palm Jumeirah, Dubai</p>
            </div>
          </div>

          {/* Column 2: Core Objectives (Icon-Rich List) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            <h4 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3">
              {t.coreObjectives}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              {t.objectives.map((obj, index) => {
                const IconComponent = obj.icon
                const isBlue = index % 2 === 0; // Alternate icon color for visual separation

                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 p-3 rounded-xl ${isBlue ? 'bg-blue-500/10 text-blue-600' : 'bg-cyan-500/10 text-cyan-600'}`}>
                      <IconComponent />
                    </div>
                    <div>
                      <h5 className="text-base font-semibold text-slate-900">
                        {obj.title}
                      </h5>
                      <p className="mt-1 text-xs text-slate-600">
                        {obj.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}