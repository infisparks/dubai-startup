'use client'

import React from 'react'
import Image from 'next/image'
import { FiStar, FiSun, FiUsers } from 'react-icons/fi'

interface VenueSectionProps {
  language: 'en' | 'ar'
  venueImageSrc: string      // URL for the Taj Exotica resort image
}

// Data structure for text content
const translations = {
  en: {
    title: 'The Venue',
    mainDescription: `Investarise Global Investors Summit details will be updated for upcoming events.`,
    imageCaption: 'Event Venue',
    highlightsTitle: 'Venue Highlights',
    highlights: [
      {
        iconKey: 'Luxury',
        title: 'Unparalleled Luxury',
        description: 'Iconic landmark with world-class amenities and service',
      },
      {
        iconKey: 'Backdrop',
        title: 'Sophisticated Backdrop',
        description: 'Elegant setting for high-level networking and investment discussions',
      },
      {
        iconKey: 'Atmosphere',
        title: 'Atmosphere',
        description: 'Fosters an environment of exclusivity and opportunity',
      },
    ],
  },
  ar: {
    title: 'المكان',
    mainDescription: `سيتم تحديث تفاصيل قمة إنفستارايز العالمية للاستثمار للفعاليات القادمة.`,
    imageCaption: 'مكان الحدث',
    highlightsTitle: 'أبرز مميزات المكان',
    highlights: [
      {
        iconKey: 'Luxury',
        title: 'فخامة لا مثيل لها',
        description: 'معلم أيقوني يضم وسائل راحة وخدمات عالمية المستوى',
      },
      {
        iconKey: 'Backdrop',
        title: 'خلفية راقية',
        description: 'إعداد أنيق للمناقشات الشبكية والاستثمارية رفيعة المستوى',
      },
      {
        iconKey: 'Atmosphere',
        title: 'أجواء فريدة',
        description: 'يعزز بيئة من التفرد والفرص',
      },
    ],
  },
}

const IconMap: { [key: string]: React.ElementType } = {
  Luxury: FiStar,
  Backdrop: FiSun,
  Atmosphere: FiUsers,
}

export default function VenueSection({
  language = 'en',
  venueImageSrc,
}: VenueSectionProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  // NOTE: Hardcoded the path to '/tag.png' as requested.
  const backgroundImageSrc = '/taj.jpg';

  return (
    <section
      id="venue"
      // ADJUSTMENT 1: Minimized vertical padding
      className="relative w-full min-h-screen flex items-center justify-center py-8 lg:py-16 overflow-hidden"
    >
      {/* Background Image using Next/Image for optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageSrc}
          alt="Venue Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
        />
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[1]"></div>

      {/* Content Container (Slightly narrower maximum width) */}
      <div
        className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 
                   grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Left Side: Venue Image & Caption (Minimized spacing) */}
        <div className="flex flex-col items-center lg:items-start space-y-3">
          <Image
            src={venueImageSrc}
            alt="Venue"
            width={600}
            height={400}
            className="w-full max-w-lg lg:max-w-none h-auto rounded-lg shadow-2xl transition-transform duration-500 hover:scale-[1.01] hover:shadow-cyan-400/30"
          />
          <p className="text-white text-xs opacity-80 italic max-w-lg text-center lg:text-left">
            {t.imageCaption}
          </p>
        </div>

        {/* Right Side: Text Content - Frosted Glass Card (Minimized padding and spacing) */}
        <div
          // ADJUSTMENT 2: Minimized padding on the card
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-5 md:p-6 lg:p-7
                     shadow-2xl shadow-cyan-500/20 transform hover:scale-[1.005] transition-transform duration-300
                     flex flex-col space-y-4"
        >
          {/* Main Title and Description (Reduced size) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* ADJUSTMENT 3: Smaller Title Font */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                {t.title}
              </h2>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-4 animate-pulse-slow"></div>

            <p className="text-white text-sm opacity-90 leading-snug">
              {t.mainDescription}
            </p>
          </div>

          {/* Venue Highlights (Reduced spacing) */}
          <div className="space-y-4 pt-3 border-t border-white/20">
            {/* ADJUSTMENT 4: Smaller Highlight Title */}
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-blue-400">
                <FiStar className="w-5 h-5" />
              </span>
              {t.highlightsTitle}
            </h3>
            <ul className="space-y-3">
              {t.highlights.map((highlight, index) => {
                const HighlightIcon = IconMap[highlight.iconKey]
                return (
                  // ADJUSTMENT 5: Tighter list items
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md">
                      {HighlightIcon ? <HighlightIcon className="w-4 h-4" /> : <FiStar className="w-4 h-4" />}
                    </div>
                    <div>
                      {/* ADJUSTMENT 6: Smallest descriptive text */}
                      <h4 className="text-white text-sm font-semibold mb-0">
                        {highlight.title}
                      </h4>
                      <p className="text-white text-xs opacity-80 leading-tight">
                        {highlight.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}