'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, type Variants, AnimatePresence } from 'framer-motion'
import { TrendingUp, Users, Lightbulb, Network, ArrowUpRight } from 'lucide-react'

interface VisionAndGoalsProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    badge: 'Strategic Vision',
    title: 'Shaping the Future of',
    titleAccent: 'Global Investment',
    desc: "We provide a high-caliber platform designed to accelerate innovation and strategic capital deployment within the UAE's evolving business landscape.",
    goalsTitle: 'Strategic Objectives',
    memberText: 'Professional Investment Network',
    memberCount: '100+ Global Members',
    goals: [
      {
        icon: TrendingUp,
        title: 'Capital Deployment',
        desc: 'Strategic allocation of high-impact venture capital.',
        color: 'from-blue-600 to-blue-800'
      },
      {
        icon: Network,
        title: 'Strategic Synergy',
        desc: 'Bridging elite global investors with visionary founders.',
        color: 'from-slate-700 to-slate-900'
      },
      {
        icon: Lightbulb,
        title: 'Discovery Hub',
        desc: 'Establishing the UAE as a premier center for innovation.',
        color: 'from-blue-900 to-slate-900'
      },
      {
        icon: Users,
        title: 'Venture Network',
        desc: 'Cultivating sustainable growth for future industry leaders.',
        color: 'from-indigo-900 to-blue-900'
      },
    ],
  },
  ar: {
    badge: 'الرؤية الاستراتيجية',
    title: 'تشكيل مستقبل',
    titleAccent: 'الاستثمار العالمي',
    desc: 'نحن نوفر منصة عالية المستوى مصممة لتسريع الابتكار ونشر رأس المال الاستراتيجي ضمن مشهد الأعمال المتطور في دولة الإمارات العربية المتحدة.',
    goalsTitle: 'الأهداف الاستراتيجية',
    memberText: 'شبكة الاستثمار المهنية',
    memberCount: 'أكثر من 100 عضو عالمي',
    goals: [
      {
        icon: TrendingUp,
        title: 'نشر رأس المال',
        desc: 'التخصيص الاستراتيجي لرأس المال الاستثماري عالي التأثير.',
        color: 'from-blue-600 to-blue-800'
      },
      {
        icon: Network,
        title: 'التآزر الاستراتيجي',
        desc: 'الربط بين نخبة المستثمرين العالميين والمؤسسين ذوي الرؤى.',
        color: 'from-slate-700 to-slate-900'
      },
      {
        icon: Lightbulb,
        title: 'مركز الاكتشاف',
        desc: 'ترسيخ مكانة الإمارات كمركز رائد للابتكار والاكتشاف.',
        color: 'from-blue-900 to-slate-900'
      },
      {
        icon: Users,
        title: 'شبكة المشاريع',
        desc: 'رعاية النمو المستدام لقادة الصناعة في المستقبل.',
        color: 'from-indigo-900 to-blue-900'
      },
    ],
  },
}

export default function VisionAndGoals({ language = 'en' }: VisionAndGoalsProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-scroll logic for mobile
  useEffect(() => {
    const el = scrollRef.current
    if (!el || window.innerWidth >= 1024) return

    let animationId: number
    const animate = () => {
      if (!isPaused && el) {
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        } else {
          el.scrollLeft += 0.8
        }
      }
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  const goalsToRender = [...t.goals, ...t.goals] // For mobile looping

  return (
    <section id="vision" className="relative w-full py-12 lg:py-16 bg-[#020617] overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Texture & Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/vision_bg.png"
          alt="Dubai Horizon"
          fill
          className="object-cover opacity-10 grayscale brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/95 to-[#020617]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          {/* Left: The Visionary Board */}
          <div className="lg:col-span-6 space-y-4">
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight">
                {t.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{t.titleAccent}</span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal max-w-xl border-l-[2px] border-slate-800 pl-5">
              {t.desc}
            </motion.p>

            <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center gap-5 w-fit">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center overflow-hidden">
                    <Image src={`/brand/${i}.png`} alt="Member" width={40} height={40} className="object-contain p-1.5 grayscale" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{t.memberText}</p>
                <p className="text-md font-black text-white">{t.memberCount}</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Goals - Responsive Ticker for Mobile, Grid for Desktop */}
          <div className="lg:col-span-6 w-full">
            {/* Desktop View: Interactive Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4 relative">
              {t.goals.map((goal, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group relative p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-800/60 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-white shadow-lg`}>
                      <goal.icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                          {goal.title}
                        </h4>
                        <ArrowUpRight size={12} className="text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        {goal.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile View: Auto-Scrolling Ticker */}
            <div className="lg:hidden w-full overflow-hidden relative pb-10">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {goalsToRender.map((goal, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[85vw] p-8 bg-slate-900/60 border border-white/10 rounded-[2rem] backdrop-blur-xl shadow-2xl"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-white mb-6`}>
                      <goal.icon size={24} />
                    </div>
                    <h4 className="text-lg font-black text-white mb-2">{goal.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{goal.desc}</p>
                  </div>
                ))}
              </div>
              {/* Mobile Scroll Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {t.goals.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grain & Grid Texture */}
      <div className="absolute inset-0 z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
    </section>
  )
}