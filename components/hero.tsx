"use client"

import { ArrowRight, ChevronDown, MapPin } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeroProps {
  language: "en" | "ar"
}

const translations = {
  en: {
    headline: "Investarise Global",
    headline2: "2026",
    tagline: "Where Visionary Capital Builds Global Enterprises.",
    statsInvestors: "100+ Investors",
    statsStartups: "250+ Startups & SME's",
    statsSpeakers: "20+ Speakers",
    ctaPrimary: "Register Now",
    ctaSecondary: "Learn More",
    scrollHint: "Scroll to discover",
  },
  ar: {
    headline: "إنفسترايز العالمية",
    headline2: "2026",
    tagline: "حيث يبني رأس المال الرؤيوي مشاريع عالمية.",
    statsInvestors: "100+ مستثمر",
    statsStartups: "250+ شركة ناشئة",
    statsSpeakers: "20+ متحدثين",
    ctaPrimary: "سجل الآن",
    ctaSecondary: "اكتشف المزيد",
    scrollHint: "اكتشف المزيد",
  },
}

export default function Hero({ language }: HeroProps) {
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)
  const isRtl = language === "ar"
  const router = useRouter()

  // Countdown Logic for February 25, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date("2026-02-25T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Video with Enhanced Readability Overlay */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://infisparks.github.io/images/invest.webm"
            type="video/webm"
          />
        </video>
        {/* Balanced Dark Overlay for White Text Pop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </motion.div>

      {/* Hero Content - Clean & Proportional */}
      <div className="relative z-10 w-full h-full flex flex-col items-center px-6 lg:px-8">

        {/* Main Content: Headline, Stats, CTAs (Centered in the remaining space) */}
        <motion.div
          style={{ opacity }}
          className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl"
        >
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-4 lg:mb-6"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
              {t.headline}
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 lg:mb-8"
          >
            <span
              className="text-white/90 text-[12px] lg:text-[18px] font-medium tracking-wide italic leading-relaxed"
              style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
            >
              “{t.tagline}”
            </span>
          </motion.div>

          {/* Stats - Further Reduced Font Sizes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 lg:mb-10"
          >
            {[
              { text: t.statsInvestors },
              { text: t.statsStartups },
              { text: t.statsSpeakers }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-center group">
                  <div className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-0.5 transition-transform group-hover:scale-110 duration-300">
                    {stat.text.split(' ')[0]}
                  </div>
                  <div className="text-[8px] lg:text-[9px] font-black text-[#5da3d5] uppercase tracking-widest">
                    {stat.text.split(' ').slice(1).join(' ')}
                  </div>
                </div>
                {i < 2 && <div className="hidden sm:block w-[1px] h-6 bg-white/10 ml-3 lg:ml-6" />}
              </div>
            ))}
          </motion.div>

          {/* Action CTAs - Slightly Tighter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-row items-center justify-center gap-3 px-2"
          >
            <Link
              href="/tickets"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center px-8 lg:px-7 py-2.5 lg:py-3 bg-[#034FA3] bg-gradient-to-br from-[#034FA3] to-[#023c7a] text-white font-black text-[11px] lg:text-[12px] uppercase tracking-widest rounded-lg transition-all border border-white/20 hover:shadow-[0_0_30px_rgba(3,79,163,0.6)] hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="flex items-center gap-2 relative z-20">
                {t.ctaPrimary}
                <ArrowRight size={14} className="hidden sm:block group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            <a
              href="#about"
              onClick={(e) => e.stopPropagation()}
              className="px-5 py-2.5 lg:px-7 lg:py-3 bg-white/10 backdrop-blur-md text-white font-black text-[11px] lg:text-[12px] uppercase tracking-widest rounded-lg border border-white/20 hover:bg-white/20 transition-all whitespace-nowrap"
            >
              {t.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>

        {/* Refined Glassy Registration Bar - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block w-full max-w-5xl mx-auto mb-10 mt-auto overflow-hidden rounded-3xl border border-white/20 relative group shadow-2xl"
        >
          {/* Enhanced Ultra-Glass Effect */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[40px] transition-colors duration-500 group-hover:bg-white/10" />

          {/* Brand-colored Glows */}
          <div className="absolute -top-1/2 left-1/4 w-64 h-32 bg-[#034FA3]/20 blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-1/2 right-1/4 w-64 h-32 bg-blue-400/10 blur-[60px] pointer-events-none" />

          <div className="relative z-10 px-6 sm:px-12 py-3 sm:py-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-12 text-center md:text-left">
            {/* Left: Text */}
            <div className="flex-shrink-0">
              <h3 className="text-lg sm:text-3xl font-black text-white tracking-tighter leading-none mb-1 sm:mb-2 text-center md:text-left">
                {language === 'en' ? 'Stay Tuned!' : 'ترقبوا!'}
              </h3>
              <p className="text-blue-300 text-[7px] sm:text-[10px] font-black uppercase tracking-[0.2em] opacity-90 text-center md:text-left">
                {language === 'en' ? 'Registration Opening Soon' : 'يفتح باب التسجيل قريباً'}
              </p>
            </div>

            {/* Center: Real-time Countdown */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 min-w-[200px]">
              {[
                { val: timeLeft.days, label: language === 'en' ? 'DAYS' : 'أيام' },
                { val: timeLeft.hours, label: language === 'en' ? 'HOURS' : 'ساعات' },
                { val: timeLeft.minutes, label: language === 'en' ? 'MINS' : 'دقائق' },
                { val: timeLeft.seconds, label: language === 'en' ? 'SECS' : 'ثوانٍ' }
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  <div className="relative h-6 sm:h-9 overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={item.val}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-lg sm:text-3xl font-black text-white tabular-nums tracking-tighter"
                      >
                        {String(item.val).padStart(2, '0')}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="text-[6px] sm:text-[8px] font-extrabold text-white/50 uppercase tracking-[0.1em] mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Location */}
            <div className="flex items-center justify-center gap-3 bg-white/5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/10 backdrop-blur-md">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-md sm:rounded-lg bg-[#034FA3] flex items-center justify-center flex-shrink-0">
                <MapPin className="text-white w-3.5 h-3.5 sm:w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <div className="text-white text-[10px] sm:text-sm font-black tracking-tight leading-tight">
                  {language === 'en' ? 'Dubai, UAE' : 'دبي، الإمارات'}
                </div>
                <div className="hidden sm:block text-white/50 text-[7px] font-bold uppercase tracking-widest mt-0.5">
                  {language === 'en' ? 'Global Investors' : 'المستثمرين العالمية'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
