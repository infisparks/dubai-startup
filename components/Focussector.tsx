'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
// IMPORT ICONS DIRECTLY HERE from react-icons/fi
import { FiCpu, FiCreditCard, FiHeart, FiHome, FiFeather, FiUsers } from 'react-icons/fi'

interface FocusSectorsProps {
  language: 'en' | 'ar'
}

// --- Internal Arrow Components (Reused for brevity) ---
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

// --- Icon Mapping Utility ---
const IconMap: { [key: string]: React.ElementType } = {
  Robot: FiCpu,          
  Wallet: FiCreditCard,  
  Heart: FiHeart,        
  Building: FiHome,      
  Leaf: FiFeather,       
  User: FiUsers,         
};


// --- Data Structure (Omitted for brevity, assumed stable) ---
const translations = {
  en: {
    title: 'Focus Sectors',
    subtitle:
      'Investarise Global Investment Summit 2026 will spotlight critical industries poised for significant growth and innovation.',
    footer:
      'These sectors represent areas where technological advancements and strategic investments can yield substantial returns and societal impact.',
    sectors: [
      { iconKey: 'Robot', name: 'AI & Robotics', desc: 'Cutting-edge artificial intelligence and robotic solutions transforming industries.', },
      { iconKey: 'Wallet', name: 'Fintech & Blockchain', desc: 'Digital financial innovations and blockchain technologies revolutionizing commerce.', },
      { iconKey: 'Heart', name: 'Healthcare & Biotech', desc: 'Breakthrough medical technologies and biotech innovations improving lives.', },
      { iconKey: 'Building', name: 'Real Estate & PropTech', desc: 'Smart property solutions and real estate innovations transforming urban development.', },
      { iconKey: 'Leaf', name: 'Clean Energy & Sustainability', desc: 'Renewable energy solutions and sustainable practices driving environmental progress.', },
      { iconKey: 'User', name: 'Women Empowerment', desc: 'Drive by innovation & equality, we are building a platform that supports women founders through mentorship, funding & community-enabling them rise, lead & succeed.', },
    ],
  },
  ar: {
    title: 'القطاعات الرئيسية',
    subtitle:
      'ستسلط قمة إنفستارايز العالمية للاستثمار 2026 الضوء على الصناعات الحيوية المهيأة لتحقيق نمو وابتكار كبيرين.',
    footer:
      'تمثل هذه القطاعات مجالات يمكن أن تحقق فيها التطورات التكنولوجية والاستثمارات الاستراتيجية عوائد كبيرة وتأثيراً مجتمعياً.',
    sectors: [
      { iconKey: 'Robot', name: 'الذكاء الاصطناعي والروبوتات', desc: 'حلول الذكاء الاصطناعي والروبوتات المتطورة التي تحول الصناعات.', },
      { iconKey: 'Wallet', name: 'التكنولوجيا المالية والبلوكشين', desc: 'الابتكارات المالية الرقمية وتقنيات البلوكشين التي تحدث ثورة في التجارة.', },
      { iconKey: 'Heart', name: 'الرعاية الصحية والتكنولوجيا الحيوية', desc: 'تقنيات طبية رائدة وابتكارات في التكنولوجيا الحيوية تعمل على تحسين الحياة.', },
      { iconKey: 'Building', name: 'العقارات والتكنولوجيا العقارية', desc: 'حلول الممتلكات الذكية وابتكارات العقارات التي تحول التنمية الحضرية.', },
      { iconKey: 'Leaf', name: 'الطاقة النظيفة والاستدامة', desc: 'حلول الطاقة المتجددة والممارسات المستدامة التي تدفع التقدم البيئي.', },
      { iconKey: 'User', name: 'تمكين المرأة', desc: 'مدعومين بالابتكار والمساواة، نقوم ببناء منصة تدعم المؤسسات من النساء من خلال الإرشاد والتمويل والمجتمع - لتمكينهن من الصعود والقيادة والنجاح.', },
    ],
  },
}

export default function FocusSectors({
  language = 'en',
}: FocusSectorsProps) {
  const t = translations[language]

  // --- Carousel Hooks and Logic (Unchanged) ---
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
  // --- End Carousel Logic ---

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Main Title and Subtitle */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-6 h-1.5 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto" />
        </div>

        {/* --- Mobile Carousel Wrapper --- */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-blue-600 border border-slate-200 hover:bg-slate-100 transition-opacity
                       md:hidden ${isScrollStart ? 'opacity-0' : 'opacity-100'}`}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon />
          </button>
          
          {/* Sectors Scroll Track */}
          <div
            ref={scrollContainerRef}
            // UPDATED: Changed lg:grid-cols-6 to lg:grid-cols-3 for 3x2 layout
            className="flex flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 px-2 py-4
                       md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:p-0 md:overflow-visible
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {t.sectors.map((sector, index) => {
              const IconComponent = IconMap[sector.iconKey]
              const isBlue = index % 2 === 0

              return (
                <div
                  key={sector.name}
                  className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 
                             w-[85vw] flex-shrink-0 snap-start
                             md:w-auto md:flex-shrink-1 
                             transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    {/* Icon with Gradient Circle */}
                    <div
                      className={`flex-shrink-0 p-4 rounded-full mb-4 ${
                        isBlue
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white'
                          : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                      }`}
                    >
                      {IconComponent ? (
                        <IconComponent className="w-8 h-8" />
                      ) : (
                        <span className="text-sm">?</span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {sector.name}
                    </h4>
                    <p className="text-xs text-slate-600 font-light leading-tight flex-grow">
                      {sector.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-blue-600 border border-slate-200 hover:bg-slate-100 transition-opacity
                       md:hidden ${isScrollEnd ? 'opacity-0' : 'opacity-100'}`}
            aria-label="Scroll right"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      
      {/* Footer Text */}
      <div className="text-center mt-12 lg:mt-16">
        <p className="text-xs font-medium text-slate-500 max-w-4xl mx-auto">
          {t.footer}
        </p>
      </div>
    </section>
  )
}