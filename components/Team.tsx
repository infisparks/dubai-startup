'use client'

import React, { useRef, useState, useEffect } from 'react'
import { FiFacebook, FiTwitter, FiLinkedin, FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface TeamMember {
  name: string
  role: string
  imageUrl: string
  social: {
    facebook?: string
    twitter?: string
    linkedin?: string
  }
}

interface OurTeamProps {
  language: 'en' | 'ar'
}

const teamData: TeamMember[] = [
  {
    name: 'Kamal Preet Kaur',
    role: 'Chief Marketing Head',
    imageUrl: '/day1.png', 
    social: {
      facebook: '#',
      twitter: '#',
    },
  },
  {
    name: 'Tanvi',
    role: 'Marketing Head',
    imageUrl: '/day2.png', 
    social: {
      facebook: '#',
      twitter: '#',
    },
  },
  {
    name: 'Malik',
    role: 'UI/UX Designer',
    imageUrl: '/day1.png', 
    social: {
      facebook: '#',
      twitter: '#',
    },
  },
  {
    name: 'Paulo',
    role: 'Social Media Manager',
    imageUrl: '/day2.png', 
    social: {
      facebook: '#',
      twitter: '#',
    },
  },
]

const translations = {
  en: {
    title: 'Meet Our Team',
    subtitle: 'Experienced professionals dedicated to connecting innovation with capital',
  },
  ar: {
    title: 'فريقنا',
    subtitle: 'متخصصون ذوو خبرة مكرسون لربط الابتكار برأس المال',
  },
}

const TeamCard: React.FC<{ member: TeamMember; isRtl: boolean }> = ({ member, isRtl }) => (
  <div className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border-2 border-slate-200 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-500">
    {/* Image Container */}
    <div className="relative w-full h-56 sm:h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-grow p-5 text-center">
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 leading-tight">
        {member.name}
      </h3>
      <p className="text-sm text-blue-600 font-semibold mb-4 flex-grow flex items-center justify-center">
        {member.role}
      </p>

      {/* Social Links */}
      <div className="flex justify-center gap-3 pt-4 border-t border-slate-100">
        {member.social.facebook && (
          <a
            href={member.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <FiFacebook className="w-4 h-4" />
          </a>
        )}
        {member.social.twitter && (
          <a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-cyan-500 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <FiTwitter className="w-4 h-4" />
          </a>
        )}
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <FiLinkedin className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  </div>
)

export default function OurTeam({ language = 'en' }: OurTeamProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 5) 
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5)
    }
  }

  useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      window.addEventListener('resize', checkScrollability)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability)
        window.removeEventListener('resize', checkScrollability)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
      setTimeout(checkScrollability, 300)
    }
  }

  return (
    <section 
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(15, 23, 42, 0.1) 25%, rgba(15, 23, 42, 0.1) 26%, transparent 27%, transparent 74%, rgba(15, 23, 42, 0.1) 75%, rgba(15, 23, 42, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(15, 23, 42, 0.1) 25%, rgba(15, 23, 42, 0.1) 26%, transparent 27%, transparent 74%, rgba(15, 23, 42, 0.1) 75%, rgba(15, 23, 42, 0.1) 76%, transparent 77%, transparent)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 lg:mb-16">
          <div className={isRtl ? 'text-right' : 'text-left'}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              <span className="text-xs font-semibold tracking-widest text-slate-600 uppercase">Our Team</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
              {t.title}
            </h1>

            {/* Accent Line */}
            <div className="flex gap-3 items-start my-4">
              <div className="w-1.5 h-10 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2.5 shadow-lg border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all"
              >
                <FiArrowLeft className="w-5 h-5 text-slate-600 hover:text-blue-600" />
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide flex gap-4 px-12 pb-2"
              style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {teamData.map((member, index) => (
                <div key={index} className="flex-shrink-0 w-64 sm:w-72">
                  <TeamCard member={member} isRtl={isRtl} />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2.5 shadow-lg border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all"
              >
                <FiArrowRight className="w-5 h-5 text-slate-600 hover:text-blue-600" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <div key={index}>
              <TeamCard member={member} isRtl={isRtl} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}