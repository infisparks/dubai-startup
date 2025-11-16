'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'

interface VisionAndGoalsProps {
  language: 'en' | 'ar'
}

// --- Icon Components ---
const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" /><path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 6A.75.75 0 019 6.75h.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75V6zm-.75 6.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zm6-6A.75.75 0 0115 6.75h.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75V6zm-.75 6.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
)

const HandshakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M7.834 5.378a5.23 5.23 0 011.053-.082c.758 0 1.396.34 1.761.884l.321.503a5.55 5.55 0 003.393 2.913 1.5 1.5 0 001.371-2.001c-.815-1.928.109-4.745 1.605-6.551.411-.476.96-.787 1.564-.903a.75.75 0 01.444.97c-.256.46-.57.882-.901 1.26l-.28.311c-1.615 1.776-2.455 4.303-1.96 6.368a2.5 2.5 0 01-2.545 2.569 2.5 2.5 0 01-2.4-1.636l-.304-.54a.75.75 0 00-.736-.457h-.146a.75.75 0 00-.638.307l-.37.556C9.284 18.57 9 20 9 20.25a.75.75 0 01-1.5 0c0-.188 0-.397.025-.592l.006-.051a3.011 3.011 0 00-.713-1.801 20.975 20.975 0 01-1.892-2.146l-.527-.645a.75.75 0 01.996-1.127l.796.885c.347.385.673.744.975 1.054.424.43.81.82 1.157 1.168a18.23 18.23 0 00-.81-3.665.75.75 0 01.385-.82l2.35-.959a7.5 7.5 0 00-1.677-4.187.75.75 0 01-.183-.557l-.023-.195a4.491 4.491 0 00-.745-1.528 5.23 5.23 0 01-1.171-.85l-.136-.129c-.702-.663-1.34-1.37-1.823-2.105a.75.75 0 011.086-.968zM5.313 17.5a.75.75 0 10-1.06 1.06l-.578-.577a.75.75 0 00-1.06 1.06l.578.577-1.06 1.06a.75.75 0 101.06 1.06L4.753 20.5l.578.578a.75.75 0 001.06-1.06l-.578-.578 1.06-1.06a.75.75 0 00-1.06-1.06z" /></svg>
)

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" /></svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM15.75 16.5c-2.485 0-4.5-2.146-4.5-4.787 0-.398.026-.791.077-1.176C12.128 12.793 14.82 13.5 18 13.5c1.237 0 2.4-.187 3.46-.513-.01.011-.02.022-.03.033.407.447.886.993 1.397 1.61.341.419.648.878.914 1.365C21.617 21.042 18.2 21.75 14.25 21.75c-2.583 0-4.819-.697-6.529-1.897-.034.025-.067.049-.101.073-.77 1.84-2.485 3.109-4.5 3.109-2.206 0-4.008-1.78-4.11-4.0H.375a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75z" /></svg>
)

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" /></svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
  )
}

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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrollStart, setIsScrollStart] = useState(true)
  const [isScrollEnd, setIsScrollEnd] = useState(false)

  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current
    if (el) {
      const atStart = el.scrollLeft < 10
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10
      setIsScrollStart(atStart)
      setIsScrollEnd(atEnd)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (el) {
      const scrollAmount = el.clientWidth * 0.85
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const el = scrollContainerRef.current
    if (el) {
      el.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', checkScrollPosition)
      checkScrollPosition()

      return () => {
        el.removeEventListener('scroll', checkScrollPosition)
        window.removeEventListener('resize', checkScrollPosition)
      }
    }
  }, [checkScrollPosition])

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden">
      {/* Sophisticated Background Effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-1/3 -left-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-cyan-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header with Minimalist Design */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.title}
          </h2>
          <div className="mt-3 h-0.75 w-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto" />
        </div>

        {/* Vision Statement - Refined */}
        <div className="max-w-3xl mx-auto mb-14 p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-lg shadow-blue-500/5 hover:border-slate-700 transition-colors duration-300">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-cyan-400"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.287 3.75 12 3.75c4.71 0 9.185 3.223 10.675 7.697a1.75 1.75 0 010 1.056c-1.487 4.47-5.965 7.697-10.675 7.697-4.71 0-9.185-3.223-10.675-7.697a1.75 1.75 0 010-1.056zM12 17.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              {t.visionTitle}
            </h3>
          </div>
          <p className="text-sm text-slate-300 text-center leading-relaxed font-light">
            {t.visionDesc}
          </p>
        </div>

        {/* Goals Section Title */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white text-center tracking-tight">
            {t.goalsTitle}
          </h3>
        </div>

        {/* Goals Carousel Container */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-md text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200
                       md:hidden ${isScrollStart ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon />
          </button>

          {/* Goals Track */}
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 px-1 py-3
                       md:grid md:grid-cols-2 md:gap-4 md:p-0 md:overflow-visible
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {t.goals.map((goal, index) => {
              const IconComponent = goal.icon
              const isBlue = index % 2 === 0

              return (
                <div
                  key={goal.title}
                  className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg border border-slate-800 shadow-md
                             w-[78vw] flex-shrink-0 snap-start
                             md:w-auto md:flex-shrink-1
                             transition-all duration-300 hover:bg-slate-900/80 hover:border-slate-700 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon Container */}
                    <div
                      className={`flex-shrink-0 p-2.5 rounded-lg shadow-md ${
                        isBlue
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-500'
                          : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                      } text-white`}
                    >
                      <IconComponent />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white leading-tight mb-1">
                        {goal.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-snug font-light">
                        {goal.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-md text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200
                       md:hidden ${isScrollEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Scroll right"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Subtle Footer */}
      <div className="absolute bottom-3 right-4 text-xs text-slate-600 font-light">
        Investarise Global Summit 2026
      </div>
    </section>
  )
}