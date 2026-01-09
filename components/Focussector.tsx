'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
// Importing Lucide icons for a modern look
import { Zap, Leaf, CreditCard, Stethoscope, Home, Users, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

interface FocusSectorsProps {
  language: 'en' | 'ar'
}

const PRIMARY_COLOR = "#bf1e2e"

// --- Data Structure (Updated to use optimized .jpg images) ---
const translations = {
  en: {
    title: 'Focus Sectors',
    subtitle: 'Discover critical industries poised for significant growth and innovation.',
    footer:
      'These sectors represent areas where technological advancements and strategic investments can yield substantial returns and societal impact.',
    sectors: [
      { icon: Zap, name: 'AI & Robotics', desc: 'Cutting-edge artificial intelligence and robotic solutions transforming industries.', image: '/Startup/1.jpg' },
      { icon: CreditCard, name: 'Fintech & Blockchain', desc: 'Digital financial innovations and blockchain technologies revolutionizing commerce.', image: '/Startup/2.jpg' },
      { icon: Stethoscope, name: 'Healthcare & Biotech', desc: 'Breakthrough medical technologies and biotech innovations improving lives.', image: '/Startup/3.jpg' },
      { icon: Home, name: 'Real Estate & PropTech', desc: 'Smart property solutions and real estate innovations transforming urban development.', image: '/Startup/4.jpg' },
      { icon: Leaf, name: 'Clean Energy & Sustainability', desc: 'Renewable energy solutions and sustainable practices driving environmental progress.', image: '/Startup/5.jpg' },
      { icon: Users, name: 'Women Empowerment', desc: 'Platform supporting women founders through mentorship, funding, and community.', image: '/Startup/6.jpg' },
    ],
  },
  ar: {
    title: 'القطاعات الرئيسية',
    subtitle: 'اكتشف الصناعات الحيوية المهيأة لتحقيق نمو وابتكار كبيرين.',
    footer:
      'تمثل هذه القطاعات مجالات يمكن أن تحقق فيها التطورات التكنولوجية والاستثمارات الاستراتيجية عوائد كبيرة وتأثيراً مجتمعياً.',
    sectors: [
      { icon: Zap, name: 'الذكاء الاصطناعي والروبوتات', desc: 'حلول الذكاء الاصطناعي والروبوتات المتطورة التي تحول الصناعات.', image: '/Startup/1.jpg' },
      { icon: CreditCard, name: 'التكنولوجيا المالية والبلوكشين', desc: 'الابتكارات المالية الرقمية وتقنيات البلوكشين التي تحدث ثورة في التجارة.', image: '/Startup/2.jpg' },
      { icon: Stethoscope, name: 'الرعاية الصحية والتكنولوجيا الحيوية', desc: 'تقنيات طبية رائدة وابتكارات في التكنولوجيا الحيوية تعمل على تحسين الحياة.', image: '/Startup/3.jpg' },
      { icon: Home, name: 'العقارات والتكنولوجيا العقارية', desc: 'حلول الممتلكات الذكية وابتكارات العقارات التي تحول التنمية الحضرية.', image: '/Startup/4.jpg' },
      { icon: Leaf, name: 'الطاقة النظيفة والاستدامة', desc: 'حلول الطاقة المتجددة والممارسات المستدامة التي تدفع التقدم البيئي.', image: '/Startup/5.jpg' },
      { icon: Users, name: 'تمكين المرأة', desc: 'منصة تدعم المؤسسات من النساء من خلال الإرشاد والتمويل والمجتمع.', image: '/Startup/6.jpg' },
    ],
  },
}

// Helper component for the Image Card (Redefined based on FeaturedStartups style)
const SectorCard: React.FC<{ sector: (typeof translations.en.sectors)[0]; isRtl: boolean }> = ({ sector }) => {
  const Icon = sector.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 snap-start w-72 h-72 lg:w-full lg:h-auto
                       transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="group relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                           transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
        style={{
          boxShadow: isHovered
            ? `0 25px 50px ${PRIMARY_COLOR}20`
            : "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Background Image */}
        <Image
          src={sector.image}
          alt={sector.name}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#940200]/80 via-[#940200]/30 to-black/10 group-hover:from-[#940200]/90 transition-all duration-500"
        />

        {/* Icon Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-md group-hover:scale-110 transition-transform duration-300"
            style={{ boxShadow: `0 4px 16px ${PRIMARY_COLOR}30` }}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: PRIMARY_COLOR }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <div className="mb-2">
            <span
              className="inline-block px-3 py-1 rounded-lg text-sm font-semibold backdrop-blur-sm border border-white/30 text-white bg-white/15"
            >
              {sector.name}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-y-0.5 transition-all">
            {sector.name}
          </h3>

          <p className="text-white/90 text-sm leading-relaxed line-clamp-2 transition-colors">
            {sector.desc}
          </p>
        </div>
      </div>
    </div>
  );
};


export default function FocusSectors({
  language = 'en',
}: FocusSectorsProps) {
  const t = translations[language]

  // --- Carousel Hooks and Logic (Unchanged) ---
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrollStart, setIsScrollStart] = useState(true)
  const [isScrollEnd, setIsScrollEnd] = useState(false)

  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setIsScrollStart(scrollLeft < 10)
      setIsScrollEnd(scrollLeft + clientWidth >= scrollWidth - 10)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 // Adjusted scroll amount for card width
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    checkScrollPosition()
    const scrollElement = scrollContainerRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', checkScrollPosition)
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollPosition)
        window.removeEventListener('resize', checkScrollPosition)
      }
    }
  }, [checkScrollPosition])
  // --- End Carousel Logic ---

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Main Title and Subtitle */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-6 h-1.5 w-20 bg-gradient-to-r from-[#bf1e2e] to-[#940200] rounded-full mx-auto" />
        </div>

        {/* --- Mobile Carousel Wrapper --- */}
        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">

          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-[#bf1e2e] border border-slate-200 hover:bg-slate-100 transition-opacity
                       md:hidden ${isScrollStart ? 'opacity-0' : 'opacity-100'}`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Sectors Scroll Track */}
          <div
            ref={scrollContainerRef}
            // Using gap-6 for mobile sizing
            className="flex flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 px-4 py-4
                       md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:p-0 md:overflow-visible
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {t.sectors.map((sector, index) => (
              // W-72 h-72 is necessary for uniformity on mobile
              <div key={index} className="flex-shrink-0 snap-start w-72 h-72 lg:w-full lg:h-auto">
                <SectorCard sector={sector} isRtl={language === 'ar'} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-[#bf1e2e] border border-slate-200 hover:bg-slate-100 transition-opacity
                       md:hidden ${isScrollEnd ? 'opacity-0' : 'opacity-100'}`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
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