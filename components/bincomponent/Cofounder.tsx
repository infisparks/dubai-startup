'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Quote, Globe, UserCheck, Sparkles, ArrowUpRight, ShieldCheck } from 'lucide-react'

interface CoFoundersPageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'Strategic Co-Founders',
    tagline: 'Driving Global Alliances',
    readMore: 'Credentials',
    readLess: 'Close',
    coFounders: [
      {
        id: 'farid',
        name: 'Farid Ahmed',
        role: 'Oil & Gas Industry Expert',
        bio: 'Farid Ahmed is a seasoned professional with extensive experience in the oil and gas industry, specializing in business development and strategic partnerships.',
        image: '/speaker/1.png',
        imgClass: 'scale-[1.25] -translate-y-1',
        color: 'from-emerald-500 to-teal-600',
        badge: 'Co-Founder'
      },
      {
        id: 'kishan',
        name: 'Kishan Kumar Verma',
        role: 'Founder & CEO, Investarise Global',
        bio: 'An accomplished retail & business banking leader with over 25 years of diversified experience across the UAE and India, specializing in Strategic Business Growth. A fiercely driven start-up catalyst, he excels in launching new business lines and leading digital transformation. Recognized for consistently delivering double- and triple-digit growth, he blends strategic foresight with hands-on execution to enhance profitability.',
        image: '/speaker/4.png',
        color: 'from-blue-600 to-indigo-700',
        badge: 'Founder'
      },
      {
        id: 'sanjay',
        name: 'Sanjay Bhambri',
        role: 'Strategy Lead',
        bio: 'Specialized in international business development, global strategy, and management consulting. Experienced in building cross-border partnerships, market expansion, and investor engagement.',
        image: '/speaker/10.png',
        color: 'from-blue-500 to-cyan-500',
        badge: 'Co-Founder'
      },
    ],
  },
  ar: {
    title: 'المؤسسون والمؤسسون المشاركون',
    tagline: 'قيادة التحالفات العالمية',
    readMore: 'السيرة الذاتية',
    readLess: 'إغلاق',
    coFounders: [
      {
        id: 'farid',
        name: 'فريد أحمد',
        role: 'خبير صناعة النفط والغاز',
        bio: 'فريد أحمد محترف متمرس يتمتع بخبرة واسعة في صناعة النفط والغاز، متخصص في تطوير الأعمال والشراكات.',
        image: '/speaker/6.png',
        imgClass: 'scale-[1.25] -translate-y-1',
        color: 'from-emerald-500 to-teal-600',
        badge: 'مؤسس مشارك'
      },
      {
        id: 'kishan',
        name: 'كيشان كومار فيرما',
        role: 'المؤسس والرئيس التنفيذي، Investarise Global',
        bio: 'قائد بارز في الخدمات المصرفية يتمتع بخبرة تزيد عن 25 عامًا في الإمارات والهند، متخصص في النمو الاستراتيجي. محفز قوي للشركات الناشئة، يتفوق في قيادة التحول الرقمي وبناء فرق عالية الأداء. معروف بتحقيق نمو مزدوج وثلاثي الأرقام باستمرار، يمزج بين البصيرة الاستراتيجية والتنفيذ العملي.',
        image: '/speaker/4.png',
        color: 'from-blue-600 to-indigo-700',
        badge: 'المؤسس'
      },
      {
        id: 'sanjay',
        name: 'سانجاي بهامبري',
        role: 'رئيس الاستراتيجية',
        bio: 'متخصص في تطوير الأعمال الدولية والاستراتيجية العالمية. خبير في بناء الشراكات عبر الحدود وتوسيع الأسواق.',
        image: '/speaker/5.png',
        color: 'from-blue-500 to-cyan-500',
        badge: 'مؤسس مشارك'
      },
    ],
  },
}

export default function CoFoundersPage({ language = 'en' }: CoFoundersPageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Duplicating coFounders for smooth infinite scroll
  const repeatedCoFounders = [...t.coFounders, ...t.coFounders, ...t.coFounders]

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
    <section className="relative py-20 bg-slate-50 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm"
          >
            <UserCheck size={12} className="text-emerald-500" />
            Operational Governance
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
            className="text-slate-500 text-sm sm:text-base font-medium max-w-lg mx-auto"
          >
            {t.tagline}
          </motion.p>
        </div>

        {/* Desktop View: Static Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-10">
          {t.coFounders.map((founder, index) => (
            <div
              key={`${founder.id}-${index}`}
              className="group relative"
            >
              <div className="absolute -top-3 -right-3 w-full h-full bg-slate-100/50 rounded-[2rem] -z-10 group-hover:-top-4 group-hover:-right-4 transition-all duration-500 border border-slate-200" />

              <div className="relative bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-lg overflow-hidden transition-all duration-500 h-[450px] flex flex-col">
                <div className="flex flex-col gap-6 items-center text-center relative z-10 h-full">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-2xl p-1 bg-slate-50 border border-slate-100 overflow-hidden group-hover:border-slate-300 transition-colors">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        width={96}
                        height={96}
                        className={`w-full h-full rounded-xl object-cover transition-all duration-700 ${founder.imgClass || 'scale-110'}`}
                      />
                    </div>
                    <div className={`absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-md bg-gradient-to-br ${founder.color} text-white text-[7px] font-black uppercase tracking-widest shadow-md`}>
                      {founder.badge}
                    </div>
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex flex-col items-center justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-[#034FA3] transition-colors leading-tight">
                          {founder.name}
                        </h3>
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mt-0.5">
                          Executive Board
                        </p>
                      </div>
                    </div>

                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-4">
                      {founder.role}
                    </p>

                    <div className="relative">
                      <Quote size={14} className="text-slate-100 absolute -top-2 -left-1 -z-10" />
                      <div className="text-[12px] text-slate-500 leading-relaxed text-center font-medium line-clamp-6">
                        {founder.bio}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={12} className="text-emerald-500/30 group-hover:text-emerald-500 transition-colors" />
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Global Lead</span>
                    </div>
                    <Sparkles size={14} className="text-slate-100 group-hover:text-amber-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Auto-Scrolling Ticker */}
        <div className="md:hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-slate-50/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-slate-50/40 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex flex-nowrap overflow-x-auto no-scrollbar gap-6 py-10 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {repeatedCoFounders.map((founder, index) => (
              <div
                key={`${founder.id}-${index}`}
                className="group relative flex-shrink-0 w-[280px]"
              >
                <div className="absolute -top-3 -right-3 w-full h-full bg-slate-100/50 rounded-[2rem] -z-10 group-hover:-top-4 group-hover:-right-4 transition-all duration-500 border border-slate-200" />

                <div className="relative bg-white rounded-[2rem] p-6 border border-slate-200 shadow-lg overflow-hidden transition-all duration-500 h-[420px] flex flex-col">
                  <div className="flex flex-col gap-6 items-center text-center relative z-10 h-full">
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 rounded-2xl p-1 bg-slate-50 border border-slate-100 overflow-hidden group-hover:border-slate-300 transition-colors">
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          width={96}
                          height={96}
                          className={`w-full h-full rounded-xl object-cover transition-all duration-700 ${founder.imgClass || 'scale-110'}`}
                        />
                      </div>
                      <div className={`absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-md bg-gradient-to-br ${founder.color} text-white text-[7px] font-black uppercase tracking-widest shadow-md`}>
                        {founder.badge}
                      </div>
                    </div>

                    <div className="flex-grow w-full">
                      <div className="flex flex-col items-center justify-between gap-2 mb-1">
                        <div>
                          <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#034FA3] transition-colors leading-tight">
                            {founder.name}
                          </h3>
                          <p className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.2em] mt-0.5">
                            Executive Board
                          </p>
                        </div>
                      </div>

                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-4">
                        {founder.role}
                      </p>

                      <div className="relative">
                        <Quote size={14} className="text-slate-100 absolute -top-2 -left-1 -z-10" />
                        <div className="text-[11px] text-slate-500 leading-relaxed text-center font-medium line-clamp-4">
                          {founder.bio}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={12} className="text-emerald-500/30 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Global Lead</span>
                      </div>
                      <Sparkles size={14} className="text-slate-100 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}