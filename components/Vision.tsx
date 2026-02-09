'use client'

import React from 'react'

interface VisionAndGoalsProps {
  language: 'en' | 'ar'
}

// --- Icon Components ---
const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" /><path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 6A.75.75 0 019 6.75h.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75V6zm-.75 6.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm6-6A.75.75 0 0115 6.75h.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75V6zm-.75 6.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
)

const HandshakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M7.834 5.378a5.23 5.23 0 011.053-.082c.758 0 1.396.34 1.761.884l.321.503a5.55 5.55 0 003.393 2.913 1.5 1.5 0 001.371-2.001c-.815-1.928.109-4.745 1.605-6.551.411-.476.96-.787 1.564-.903a.75.75 0 01.444.97c-.256.46-.57.882-.901 1.26l-.28.311c-1.615 1.776-2.455 4.303-1.96 6.368a2.5 2.5 0 01-2.545 2.569 2.5 2.5 0 01-2.4-1.636l-.304-.54a.75.75 0 00-.736-.457h-.146a.75.75 0 00-.638.307l-.37.556C9.284 18.57 9 20 9 20.25a.75.75 0 01-1.5 0c0-.188 0-.397.025-.592l.006-.051a3.011 3.011 0 00-.713-1.801 20.975 20.975 0 01-1.892-2.146l-.527-.645a.75.75 0 01.996-1.127l.796.885c.347.385.673.744.975 1.054.424.43.81.82 1.157 1.168a18.23 18.23 0 00-.81-3.665.75.75 0 01.385-.82l2.35-.959a7.5 7.5 0 00-1.677-4.187.75.75 0 01-.183-.557l-.023-.195a4.491 4.491 0 00-.745-1.528 5.23 5.23 0 01-1.171-.85l-.136-.129c-.702-.663-1.34-1.37-1.823-2.105a.75.75 0 011.086-.968zM5.313 17.5a.75.75 0 10-1.06 1.06l-.578-.577a.75.75 0 00-1.06 1.06l.578.577-1.06 1.06a.75.75 0 101.06 1.06L4.753 20.5l.578.578a.75.75 0 001.06-1.06l-.578-.578 1.06-1.06a.75.75 0 00-1.06-1.06z" /></svg>
)

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM15.75 16.5c-2.485 0-4.5-2.146-4.5-4.787 0-.398.026-.791.077-1.176C12.128 12.793 14.82 13.5 18 13.5c1.237 0 2.4-.187 3.46-.513-.01.011-.02.022-.03.033.407.447.886.993 1.397 1.61.341.419.648.878.914 1.365C21.617 21.042 18.2 21.75 14.25 21.75c-2.583 0-4.819-.697-6.529-1.897-.034.025-.067.049-.101.073-.77 1.84-2.485 3.109-4.5 3.109-2.206 0-4.008-1.78-4.11-4.0H.375a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75z" /></svg>
)

// --- Translations ---
const translations = {
  en: {
    title: 'Vision & Strategic Goals',
    visionTitle: 'Our Vision',
    visionDesc:
      "To establish a dynamic platform for growth, fostering innovation and investment in the UAE's vibrant business ecosystem.",
    goalsTitle: 'Strategic Objectives',
    goals: [
      {
        icon: MoneyIcon,
        title: 'Enable Fundraising',
        desc: 'Provide startups with capital and visibility to scale innovations.',
      },
      {
        icon: HandshakeIcon,
        title: 'Connect Ecosystem',
        desc: 'Facilitate connections between investors and high-potential ventures.',
      },
      {
        icon: GlobeIcon,
        title: 'Innovation Hub',
        desc: 'Establish UAE as a global center for entrepreneurship.',
      },
      {
        icon: UsersIcon,
        title: 'Build Network',
        desc: 'Create a sustainable ecosystem of investors and innovators.',
      },
    ],
  },
  ar: {
    title: 'الرؤية والأهداف الاستراتيجية',
    visionTitle: 'رؤيتنا',
    visionDesc:
      'إنشاء منصة ديناميكية للنمو، وتعزيز الابتكار والاستثمار في منظومة الأعمال النابضة بالحياة في دولة الإمارات العربية المتحدة.',
    goalsTitle: 'الأهداف الاستراتيجية',
    goals: [
      {
        icon: MoneyIcon,
        title: 'تمكين جمع التمويل',
        desc: 'تزويد الشركات الناشئة برأس المال والرؤية.',
      },
      {
        icon: HandshakeIcon,
        title: 'ربط المنظومة',
        desc: 'تسهيل الاتصالات بين المستثمرين والمشاريع الواعدة.',
      },
      {
        icon: GlobeIcon,
        title: 'مركز الابتكار',
        desc: 'تأسيس الإمارات كمركز عالمي للابتكار.',
      },
      {
        icon: UsersIcon,
        title: 'بناء الشبكة',
        desc: 'إنشاء شبكة مستدامة من المستثمرين والمبتكرين.',
      },
    ],
  },
}

export default function VisionAndGoals({ language = 'en' }: VisionAndGoalsProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <section id="vision" className="w-full bg-white py-20 sm:py-28" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-[#034FA3]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-[#c4925f]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Vision */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#034FA3]/10 border border-[#034FA3]/20 text-[#034FA3] mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#034FA3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#023c7a]"></span>
                </span>
                <span className="text-xs font-bold tracking-widest uppercase">{t.title}</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
                {t.visionTitle}
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light border-l-4 border-[#034FA3] pl-6">
                {t.visionDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Strategic Goals Grid */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px bg-slate-200 flex-1"></div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t.goalsTitle}</h3>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.goals.map((goal, index) => {
                const IconComponent = goal.icon
                const isRed = index % 2 === 0

                return (
                  <div key={index} className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(3,79,163,0.08)] hover:border-[#034FA3]/10 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors duration-300 ${isRed ? 'bg-[#034FA3]/10 text-[#034FA3] group-hover:bg-[#034FA3] group-hover:text-white'
                      : 'bg-[#c4925f]/10 text-[#c4925f] group-hover:bg-[#c4925f] group-hover:text-white'
                      }`}>
                      <IconComponent />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{goal.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {goal.desc}
                    </p>
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