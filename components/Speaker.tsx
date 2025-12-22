'use client'

// ADDED: Import new hooks
import React, { useState, useRef, useEffect, useCallback } from 'react'

// ADDED: SVG icons for the arrows
function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  )
}

interface SpeakersPageProps {
  language: 'en' | 'ar'
}

// All text content (no changes)
const translations = {
  en: {
    title: 'Our Speakers',
    subtitle:
      'Investors Global Investment Summit 2026 welcome our prestigious speakers.',
    footer: "Investarise Global Investor Summit - 2026: Shaping Tomorrow's Economy",
    readMore: 'Read More',
    readLess: 'Read Less',
    speakers: [
      {
        name: 'Mr. Sushil Sharma',
        bio: 'Founder and CEO of Marwari Catalysts, fueling the startup ecosystem in Tier 2 & 3 cities. Angel investor in 100+ startups, with a focus on gender diversity and innovation.',
        image: '/speaker/14.png',
      },
      {
        name: 'Dr. Manav Ahuja',
        bio: 'Driving business success with modern strategies, backed by 25+ years in business and consultancy, and a doctorate in Human Psychology. Supported 100 entrepreneurs and trained 1,000 sales professionals.',
        image: '/speaker/11.png',
      },
      {
        name: 'Dr. Alexandru Nedelcu',
        bio: 'Dr. Alexandru Nedelcu is known for excellent patient care, innovative treatments, and a compassionate dedication to helping cancer patients.',
        image: '/speaker/8.png',
      },
      {
        name: 'Mr. Abdulmajid Ansari',
        bio: 'Serial Entrepreneur, Founder ARBA Accelerator LLP, Head of Business Incubation AIKTC',
        image: '/speaker/3.png',
      },
      {
        name: 'Mr. Jatin Bajaj',
        bio: 'Certified trainer for AML & Fraud, Banking Products and Policies, have achieved 23% increase in the productivity and the retention with the last organization',
        image: '/speaker/12.png',
      },
    ],
  },
  ar: {
    title: 'المتحدثون لدينا',
    subtitle:
      'ترحب قمة إنفستارايز العالمية للاستثمار 2026 بمتحدثينا المتميزين في هذا الحدث',
    footer: 'قمة إنفستارايز العالمية للمستثمرين - 2026: تشكيل اقتصاد الغد',
    readMore: 'اقرأ المزيد',
    readLess: 'اقرأ أقل',
    speakers: [
      {
        name: 'السيد سوشيل شارما',
        bio: 'المؤسس والرئيس التنفيذي لشركة Marwari Catalysts، التي تغذي نظام الشركات الناشئة في مدن المستوى 2 و 3. مستثمر ملاك في أكثر من 100 شركة ناشئة، مع التركيز على التنوع بين الجنسين والابتكار.',
        image: '/speaker/14.png',
      },
      {
        name: 'د. ماناف أهوجا',
        bio: 'تحويل نجاح الأعمال بنهج حديث. 25+ عامًا من الخبرة الغنية في الأعمال والاستشارات، حاصل على درجة الدكتوراه في علم النفس البشري. قام برعاية أعمال 100 رائد أعمال، ودرب 1000 مرشح على أعمال المبيعات.',
        image: '/speaker/11.png',
      },
      {
        name: 'د. ألكسندرو نيديلكو',
        bio: 'أسس الدكتور ألكسندرو نيديلكو سمعة للتميز في رعاية المرضى، والنهج العلاجية المبتكرة، والالتزام الرحيم بتحسين حياة المتأثرين بالسرطان.',
        image: '/speaker/8.png',
      },
      {
        name: 'السيد عبد المجيد أنصاري',
        bio: 'رئيس مجلس الإدارة واستراتيجي الاستثمار العالمي، قائد ذو رؤية يعيد تعريف مشهد التمويل العالمي، وأكثر من عقدين من الخبرة في الاستثمارات عبر الحدود ورأس المال الاستثماري. بصفته المهندس وراء بعض أكثر الصفقات تحولًا في المنطقة.',
        image: '/speaker/3.png',
      },
      {
        name: 'السيد جاتين باجاج',
        bio: 'مدرب معتمد في مكافحة غسيل الأموال والاحتيال، والمنتجات والسياسات المصرفية، حقق زيادة بنسبة 23٪ في الإنتاجية والاحتفاظ بالموظفين في المنظمة السابقة.',
        image: '/speaker/12.png',
      },
    ],
  },
}

export default function SpeakersPage({ language = 'en' }: SpeakersPageProps) {
  const t = translations[language]
  const [expandedIds, setExpandedIds] = useState<string[]>([])

  // ADDED: Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // ADDED: State to manage arrow visibility
  const [isScrollStart, setIsScrollStart] = useState(true)
  const [isScrollEnd, setIsScrollEnd] = useState(false)

  const toggleExpand = (name: string) => {
    setExpandedIds((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    )
  }

  // ADDED: Function to check scroll position
  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current
    if (el) {
      const atStart = el.scrollLeft < 10
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10
      setIsScrollStart(atStart)
      setIsScrollEnd(atEnd)
    }
  }, [])

  // ADDED: Effect to add/remove event listeners
  useEffect(() => {
    const el = scrollContainerRef.current
    if (el) {
      el.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', checkScrollPosition)

      // Run once on mount to set initial state
      checkScrollPosition()

      return () => {
        el.removeEventListener('scroll', checkScrollPosition)
        window.removeEventListener('resize', checkScrollPosition)
      }
    }
  }, [checkScrollPosition])

  // ADDED: Re-check scroll on language or data change
  useEffect(() => {
    const timer = setTimeout(checkScrollPosition, 100); // Small delay for DOM to update
    return () => clearTimeout(timer);
  }, [t.speakers, language, checkScrollPosition]);

  // ADDED: Function to handle arrow clicks
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (el) {
      // Scroll by 85% of the container width
      const scrollAmount = el.clientWidth * 0.85
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Page Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="mt-6 h-1.5 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto" />
        </div>

        {/* ADDED: Wrapper div for arrows and scroll container.
          - 'relative' to position arrows
          - 'sm:px-0' to remove padding only on mobile
        */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">

          {/* ADDED: Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-white rounded-full shadow-lg text-blue-600 hover:bg-slate-100 transition-all
                       sm:hidden ${isScrollStart ? 'opacity-0' : 'opacity-100'}`} // Hides on mobile if at start
            aria-label="Scroll left"
          >
            <ChevronLeftIcon />
          </button>

          {/* UPDATED: Speakers Grid
            - Becomes a flex container on mobile
            - 'overflow-x-auto' enables horizontal scrolling
            - 'scroll-smooth' for smooth arrow clicks
            - 'snap-x snap-mandatory' for swipe-snapping
            - 'scrollbar-none' hides the scrollbar (requires tailwind-scrollbar-hide plugin or CSS)
            - 'sm:grid' brings back the grid on larger screens
          */}
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 px-2 py-4
                       sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-8 sm:p-0 sm:overflow-visible
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" // Hides scrollbar
          >
            {t.speakers.map((speaker) => {
              const isExpanded = expandedIds.includes(speaker.name)

              return (
                <div
                  key={speaker.name}
                  // UPDATED: Card sizing for mobile scroll
                  className="flex flex-col items-center text-center bg-slate-50 rounded-3xl p-6 shadow-lg
                             w-[85vw] flex-shrink-0 snap-start
                             sm:w-auto sm:flex-shrink-1" // Restores auto-width on grid
                >
                  <div className="relative w-40 h-40 rounded-full mb-6 overflow-hidden shadow-md flex-shrink-0">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {speaker.name}
                  </h3>

                  <div className="flex-grow flex flex-col w-full">
                    <p
                      className={`text-sm text-slate-600 leading-relaxed flex-grow ${!isExpanded ? 'line-clamp-2' : ''
                        }`}
                    >
                      {speaker.bio}
                    </p>

                    <button
                      onClick={() => toggleExpand(speaker.name)}
                      className="text-sm font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-full px-4 py-1.5 transition-colors mt-4 self-center flex-shrink-0"
                    >
                      {isExpanded ? t.readLess : t.readMore}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ADDED: Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-white rounded-full shadow-lg text-blue-600 hover:bg-slate-100 transition-all
                       sm:hidden ${isScrollEnd ? 'opacity-0' : 'opacity-100'}`} // Hides on mobile if at end
            aria-label="Scroll right"
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Footer Text (no change) */}
        <div className="text-center mt-16">
          <p className="text-sm font-semibold text-slate-500 tracking-wide">
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  )
}