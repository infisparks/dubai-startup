'use client'

import React, { useState, useRef, useEffect } from 'react' // Added useEffect
import { FiCheck, FiPocket, FiShield, FiAward, FiArrowRight, FiZap, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Feature {
  level: string;
  price: string;
  icon: React.ElementType;
  color: 'gold' | 'cyan' | 'blue';
  features: string[];
  subtitle?: string;
}

interface SponsorshipPackageData {
    title: string;
    mainTitle: string;
    tiers: Feature[];
}

interface SponsorshipPackageProps {
  language: 'en' | 'ar'
}

const translations: { [key: string]: SponsorshipPackageData } = {
  en: {
    title: 'Sponsorship Packages',
    mainTitle: 'Partnership Tiers',
    tiers: [
      {
        level: 'Platinum Sponsor',
        price: '500,000 AED',
        icon: FiAward,
        color: 'gold',
        subtitle: 'Premium Partnership',
        features: [
          'Premium 6m² exhibition booth',
          '10 exclusive VIP passes',
          'Keynote speaking slot',
          'Logo on all event materials',
          'Full attendee database access',
        ],
      },
      {
        level: 'Gold Sponsor',
        price: '300,000 AED',
        icon: FiShield,
        color: 'cyan',
        subtitle: 'Standard Partnership',
        features: [
          'Standard 4m² exhibition booth',
          '6 VIP passes',
          'Panel participation',
          'Logo on website & materials',
          'Attendee database access',
        ],
      },
      {
        level: 'Silver Sponsor',
        price: '200,000 AED',
        icon: FiPocket,
        color: 'blue',
        subtitle: 'Essential Partnership',
        features: [
          'Compact exhibition booth',
          '4 VIP passes',
          'Brand visibility on screens',
          'Social media mentions',
          'Logo on event website',
        ],
      },
    ],
  },
  ar: {
    title: 'باقات الرعاية',
    mainTitle: 'مستويات الشراكة',
    tiers: [
      {
        level: 'راعي بلاتيني',
        price: '500,000 درهم إماراتي',
        icon: FiAward,
        color: 'gold',
        subtitle: 'الشراكة المتميزة',
        features: [
          'منصة عرض ممتازة 6 م²',
          '10 تصاريح VIP حصرية',
          'خانة متحدث رئيسي',
          'شعار على جميع المواد',
          'الوصول الكامل لقاعدة البيانات',
        ],
      },
      {
        level: 'راعي ذهبي',
        price: '300,000 درهم إماراتي',
        icon: FiShield,
        color: 'cyan',
        subtitle: 'الشراكة القياسية',
        features: [
          'منصة عرض قياسية 4 م²',
          '6 تصاريح VIP',
          'المشاركة في لجنة',
          'الشعار على الموقع والمواد',
          'الوصول لقاعدة البيانات',
        ],
      },
      {
        level: 'راعي فضي',
        price: '200,000 درهم إماراتي',
        icon: FiPocket,
        color: 'blue',
        subtitle: 'الشراكة الأساسية',
        features: [
          'منصة عرض مدمجة',
          '4 تصاريح VIP',
          'ظهور على الشاشات الرقمية',
          'إشارات على التواصل الاجتماعي',
          'شعار على الموقع',
        ],
      },
    ],
  },
}

const getColorClasses = (color: string) => {
  switch (color) {
    case 'gold':
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: 'bg-yellow-100 text-yellow-600',
        text: 'text-yellow-600',
        gradient: 'from-yellow-500 to-amber-500',
        badge: 'bg-yellow-100 text-yellow-700',
        hoverBg: 'hover:border-yellow-300 hover:shadow-yellow-100',
      }
    case 'cyan':
      return {
        bg: 'bg-cyan-50',
        border: 'border-cyan-200',
        icon: 'bg-cyan-100 text-cyan-600',
        text: 'text-cyan-600',
        gradient: 'from-cyan-500 to-teal-500',
        badge: 'bg-cyan-100 text-cyan-700',
        hoverBg: 'hover:border-cyan-300 hover:shadow-cyan-100',
      }
    case 'blue':
    default:
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-blue-100 text-blue-600',
        text: 'text-blue-600',
        gradient: 'from-blue-500 to-indigo-600',
        badge: 'bg-blue-100 text-blue-700',
        hoverBg: 'hover:border-blue-300 hover:shadow-blue-100',
      }
  }
}

export default function SponsorshipPackages({ language = 'en' }: SponsorshipPackageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      // Added a small buffer to avoid flickering near the end
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10) 
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 // Width of a card + gap for smooth scrolling
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      // Give a slight delay to allow scroll animation to finish before checking
      setTimeout(checkScroll, 300) 
    }
  }

  // Initial check and re-check on resize for scroll arrows
  useEffect(() => {
    checkScroll();
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

  return (
    <section 
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-yellow-100 to-amber-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-cyan-100 to-blue-50 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(15, 23, 42, 0.1) 25%, rgba(15, 23, 42, 0.1) 26%, transparent 27%, transparent 74%, rgba(15, 23, 42, 0.1) 75%, rgba(15, 23, 42, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(15, 23, 42, 0.1) 25%, rgba(15, 23, 42, 0.1) 26%, transparent 27%, transparent 74%, rgba(15, 23, 42, 0.1) 75%, rgba(15, 23, 42, 0.1) 76%, transparent 77%, transparent)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Premium Header Section */}
        <div className="mb-12 lg:mb-14 text-center">
          {/* Pre-title Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-cyan-500" />
            <span className="text-xs font-semibold tracking-widest text-slate-600 uppercase">Partnership Opportunities</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
            {t.mainTitle}
          </h1>

          {/* Accent Line - Badge Style */}
          <div className="inline-block px-4 py-2 rounded-full bg-yellow-100 border border-yellow-200">
            <span className="text-xs font-bold text-yellow-700">✓ MOST POPULAR</span>
          </div>
        </div>

        {/* Scroll Container for Mobile */}
        <div className="relative lg:hidden mb-8">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
            >
              <FiChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
          )}

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="overflow-x-auto scrollbar-hide flex gap-6 px-12 pb-2"
            style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {t.tiers.map((tier: Feature) => {
              const IconComponent = tier.icon
              const colors = getColorClasses(tier.color)
              const isPlatinum = tier.level.toLowerCase().includes('platinum')

              return (
                <div
                  key={tier.level}
                  className="flex-shrink-0 w-72"
                >
                  <div className={`relative flex flex-col rounded-xl overflow-hidden transition-all duration-500 group ${isPlatinum ? 'transform scale-105' : ''}`}>
                    {/* Card Background */}
                    <div className={`absolute inset-0 bg-white rounded-xl border-2 ${colors.border} transition-all duration-500 ${colors.hoverBg}`} />

                    {/* Platinum Card: Most Popular Badge - repositioned inside content */}
                    {isPlatinum && (
                      <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colors.badge} font-bold text-xs shadow-lg`}>
                          <FiZap className="w-3 h-3" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="relative p-5">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-lg ${colors.icon} flex items-center justify-center mb-3 transition-transform duration-500`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Title and Subtitle */}
                      <h3 className="text-lg font-bold text-slate-900 mb-0.5 leading-tight">
                        {tier.level}
                      </h3>
                      {tier.subtitle && (
                        <p className={`text-xs font-medium ${colors.text} mb-3`}>
                          {tier.subtitle}
                        </p>
                      )}

                      {/* Price Section */}
                      <div className="mb-4 pb-4 border-b border-slate-100">
                        <div className="text-2xl font-bold text-slate-900">
                          {tier.price}
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2">
                        {tier.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mt-0.5`}>
                              <FiCheck className={`w-3 h-3 ${colors.text} font-bold`} />
                            </div>
                            <span className="text-xs text-slate-700 leading-snug">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
            >
              <FiChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          )}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {t.tiers.map((tier: Feature) => {
            const IconComponent = tier.icon
            const colors = getColorClasses(tier.color)
            const isPlatinum = tier.level.toLowerCase().includes('platinum')

            return (
              <div
                key={tier.level}
                onMouseEnter={() => setHoveredCard(tier.level)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative flex flex-col rounded-xl overflow-hidden transition-all duration-500 transform
                           ${hoveredCard === tier.level ? 'scale-105 -translate-y-2' : 'scale-100'}
                           ${isPlatinum ? '-translate-y-4' : ''}
                `}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-white rounded-xl border-2 ${colors.border} transition-all duration-500 ${colors.hoverBg}`} />

                {/* Platinum Card: Most Popular Badge - repositioned inside content */}
                {isPlatinum && (
                  <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colors.badge} font-bold text-xs shadow-lg`}>
                      <FiZap className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="relative p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg ${colors.icon} flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-lg font-bold text-slate-900 mb-0.5">
                    {tier.level}
                  </h3>
                  {tier.subtitle && (
                    <p className={`text-xs font-medium ${colors.text} mb-3`}>
                      {tier.subtitle}
                    </p>
                  )}

                  {/* Price Section */}
                  <div className="mb-4 pb-4 border-b border-slate-100">
                    <div className="text-2xl font-bold text-slate-900">
                      {tier.price}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    {tier.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mt-0.5 transition-all duration-300`}>
                          <FiCheck className={`w-3 h-3 ${colors.text} font-bold`} />
                        </div>
                        <span className="text-xs text-slate-700 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  )
}