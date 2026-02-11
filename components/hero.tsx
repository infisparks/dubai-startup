"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

interface HeroProps {
  language: "en" | "ar"
}

const translations = {
  en: {
    headline: "Investarise Global Investors",
    headline2: "Summit 2026",
    tagline: "PITCH • CONNECT • PROSPER",
    statsInvestors: "100+ Investors",
    statsStartups: "250+ Startups & SME's",
    statsSpeakers: "20+ Speakers",
    ctaPrimary: "Register Now",
    ctaSecondary: "Learn More",
    scrollHint: "Scroll to discover",
  },
  ar: {
    headline: "قمة إنفسترايز العالمية للاستثمار",
    headline2: "2026",
    tagline: "اعرض • تواصل • ازدهر",
    statsInvestors: "100+ مستثمر",
    statsStartups: "250+ شركة ناشئة",
    statsSpeakers: "20+ متحدثين",
    ctaPrimary: "سجل الآن",
    ctaSecondary: "اكتشف القمة",
    scrollHint: "اكتشف المزيد",
  },
}

export default function Hero({ language }: HeroProps) {
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)
  const isRtl = language === "ar"

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
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6 lg:px-8">
        <motion.div
          style={{ opacity }}
          className="container mx-auto text-center max-w-5xl"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 lg:mb-6"
          >
            <span className="text-white/80 text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.3em]">
              {t.tagline}
            </span>
          </motion.div>

          {/* Headline - Reverted Font Sizes */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-8 lg:mb-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              {t.headline}
            </h1>
          </motion.div>

          {/* Stats - Reverted to Clean Inline Style (No Borders/Cards) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10 lg:mb-12"
          >
            {[
              { text: t.statsInvestors },
              { text: t.statsStartups },
              { text: t.statsSpeakers }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center group">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 transition-transform group-hover:scale-110 duration-300">
                    {stat.text.split(' ')[0]}
                  </div>
                  <div className="text-[10px] lg:text-[11px] font-black text-[#5da3d5] uppercase tracking-widest">
                    {stat.text.split(' ').slice(1).join(' ')}
                  </div>
                </div>
                {i < 2 && <div className="hidden sm:block w-[1px] h-10 bg-white/20 ml-4 lg:ml-8" />}
              </div>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-row items-center justify-center gap-4 px-2"
          >
            <Link
              href="/registration"
              className="inline-flex items-center justify-center px-12 lg:px-10 py-3 lg:py-4 bg-[#034FA3] bg-gradient-to-br from-[#034FA3] to-[#023c7a] text-white font-black text-[12px] lg:text-[13px] uppercase tracking-widest rounded-lg transition-all border border-white/20 hover:shadow-[0_0_30px_rgba(3,79,163,0.6)] hover:-translate-y-0.5 active:scale-95 group relative overflow-hidden whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="flex items-center gap-2 relative z-20">
                {t.ctaPrimary}
                <ArrowRight size={16} className="hidden sm:block group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>

              {/* Subtle outer glow pulse */}
              <div className="absolute -inset-1 bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </Link>
            <a
              href="#about"
              className="px-6 py-3 lg:px-10 lg:py-4 bg-white/10 backdrop-blur-md text-white font-black text-[12px] lg:text-[13px] uppercase tracking-widest rounded-lg border border-white/20 hover:bg-white/20 transition-all whitespace-nowrap"
            >
              {t.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
