'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Quote, Award, Sparkles, Mic2, Globe, ShieldCheck, Linkedin } from 'lucide-react'

interface SpeakersPageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'Distinguished Speakers',
    subtitle: 'The collective intelligence driving the 2026 Global Investor Summit.',
    footer: "Global Investor Summit — Official Speaker Delegation",
    readMore: 'Bio',
    readLess: 'Close',
    speakers: [
      {
        id: 'manav',
        name: 'Dr. Manav Ahuja',
        role: 'Strategic Business Consultant',
        bio: 'Driving business success with modern strategies, backed by 25+ years in business and consultancy.',
        image: '/speaker/11.png',
        badge: 'Visionary'
      },
      {
        id: 'majid',
        name: 'Abdulmajid Ansari',
        role: 'Founder ARBA Accelerator',
        bio: 'Serial Entrepreneur, Founder ARBA Accelerator LLP, Head of Business Incubation AIKTC.',
        image: '/speaker/3.png',
        badge: 'Innovation'
      },
      {
        id: 'muzaffar',
        name: 'Muzaffar Ahmad',
        role: 'Global AI Leader & CAIO',
        bio: 'Muzaffar Ahmad is a globally recognized AI leader and CAIO at Data Automation.',
        image: '/speaker/15.png',
        badge: 'AI Strategist'
      },
      {
        id: 'yasir',
        name: 'Prof. Dr. Yasir Amin',
        role: 'General & Endocrine Surgeon',
        bio: 'Internationally recognized pioneer of scar-free Transoral Endoscopic Endocrine Surgery.',
        image: '/speaker/18.png',
        badge: 'Expert'
      },
      {
        id: 'anirudh',
        name: 'Anirudh Tripathy',
        role: 'MD, KPM ASSET Group',
        bio: 'Investment Banker and Technology Specialist with 26+ years of global experience.',
        image: '/speaker/29.png',
        badge: 'Investment'
      },
    ],
  },
  ar: {
    title: 'المتحدثون المتميزون',
    subtitle: 'الذكاء الجماعي الذي يقود قمة المستثمرين العالمية 2026.',
    footer: 'قمة المستثمرين العالمية — وفد المتحدثين الرسمي',
    readMore: 'السيرة الذاتية',
    readLess: 'إغلاق',
    speakers: [
      {
        id: 'manav',
        name: 'د. ماناف أهوجا',
        role: 'استشاري أعمال استراتيجي',
        bio: 'قيادة نجاح الأعمال باستراتيجيات حديثة، مدعومة بخبرة تزيد عن 25 عامًا.',
        image: '/speaker/11.png',
        badge: 'صاحب رؤية'
      },
      {
        id: 'majid',
        name: 'عبد المجيد أنصاري',
        role: 'رائد أعمال متسلسل',
        bio: 'رائد أعمال متسلسل، مؤسس ARBA Accelerator LLP، ورئيس حضانة الأعمال AIKTC.',
        image: '/speaker/3.png',
        badge: 'قائد الابتكار'
      },
      {
        id: 'muzaffar',
        name: 'مظفر أحمد',
        role: 'قائد عالمي في الذكاء الاصطناعي',
        bio: 'قائد عالمي في الذكاء الاصطناعي ورئيس قسم الذكاء الاصطناعي في Data Automation.',
        image: '/speaker/15.png',
        badge: 'خبير ذكاء اصطناعي'
      },
      {
        id: 'yasir',
        name: 'أ.د. ياسر أمين',
        role: 'جراح الغدد الصماء العام',
        bio: 'معترف به دوليًا لريادته في جراحة الغدد الصماء بالمنظار عبر الفم دون ندبات.',
        image: '/speaker/18.png',
        badge: 'خبير عالمي'
      },
      {
        id: 'anirudh',
        name: 'أنيروده تريباتي',
        role: 'العضو المنتدب، مجموعة KPM ASSET',
        bio: 'مصرفي استثماري وأخصائي تكنولوجيا بخبرة 26 عامًا عالميًا.',
        image: '/speaker/29.png',
        badge: 'عملاق الاستثمار'
      },
    ],
  },
}

export default function SpeakersPage({ language = 'en' }: SpeakersPageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Duplicating speakers for smooth infinite scroll
  const repeatedSpeakers = [...t.speakers, ...t.speakers, ...t.speakers]

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    let animationId: number
    const speed = 0.5 // Scrolling speed

    const animate = () => {
      if (!isPaused) {
        if (el.scrollLeft >= el.scrollWidth / 1.5) {
          el.scrollLeft = 0
        } else {
          el.scrollLeft += speed
        }
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  return (
    <section id="speakers" className="relative py-20 bg-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,79,163,0.02)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Section - Compact */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#034FA3] text-[9px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <Mic2 size={12} />
            Voice of Innovation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-sm sm:text-base font-medium max-w-xl mx-auto px-4"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Auto-Scrolling Modern Ticker */}
        <div className="relative">
          {/* Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-white via-white/40 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex flex-nowrap overflow-x-auto no-scrollbar gap-6 py-10 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {repeatedSpeakers.map((speaker, idx) => (
              <div
                key={`${speaker.id}-${idx}`}
                className="group relative flex-shrink-0 w-[280px] sm:w-[320px]"
              >
                {/* Speaker Card Stack Effect */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[90%] h-6 bg-slate-50 border border-slate-100 rounded-t-[1.5rem] -z-10" />

                <div className="relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] group-hover:shadow-[0_25px_50px_-15px_rgba(3,79,163,0.1)] transition-all duration-500 h-[380px] flex flex-col">

                  {/* Identity Bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#034FA3] to-[#023757]" />

                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Portrait Row */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                        <div className="absolute -inset-4 bg-[#034FA3]/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-100 shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3 translate-z-10 bg-slate-50">
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg">
                        <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#034FA3] transition-colors">{speaker.badge}</span>
                      </div>
                    </div>

                    {/* Information */}
                    <div className="flex-grow">
                      <span className="text-[8px] font-black text-[#034FA3]/40 uppercase tracking-[0.2em] mb-1 block leading-none">Global Delegate</span>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight mb-1 transition-colors duration-300 group-hover:text-[#034FA3]">
                        {speaker.name}
                      </h3>
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-4">
                        {speaker.role}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">
                        {speaker.bio}
                      </p>
                    </div>

                    {/* Static Interaction Row */}
                    <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-amber-400/20 group-hover:text-amber-400 transition-colors" />
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Summit 2026</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Linkedin size={14} className="text-slate-200 group-hover:text-[#0A66C2] transition-colors cursor-pointer" />
                        <Globe size={14} className="text-slate-100 group-hover:text-blue-200 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Footer Insight */}
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 shadow-sm"
          >
            <ShieldCheck size={14} className="text-[#034FA3]" />
            <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              {t.footer}
            </p>
            <Sparkles size={14} className="text-amber-400" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}