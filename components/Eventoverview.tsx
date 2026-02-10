'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Handshake, Lightbulb, Globe, Award, Users, ShieldCheck, Sparkles, TrendingUp, Target } from 'lucide-react'

interface EventOverviewProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'Institutional Overview',
    tagline: 'Global Capital Strategy',
    intro: "The premier platform uniting over 100 investors, 250+ startups, and 20 visionary speakers.",
    mandate: 'Strategic Mandate',
    themePhrase: 'Pitch • Connect • Prosper',
    stats: [
      { id: 1, count: '100+', label: 'Investors', icon: Award },
      { id: 2, count: '250+', label: "Startups", icon: TrendingUp },
      { id: 3, count: '20+', label: 'Speakers', icon: Users },
    ],
    objectives: [
      {
        id: 1,
        icon: Handshake,
        title: 'Capital Mobilization',
        desc: 'Accelerating growth through sophisticated institutional capital.'
      },
      {
        id: 2,
        icon: Lightbulb,
        title: 'Innovation Governance',
        desc: 'Establishing the standards for technological excellence.'
      },
      {
        id: 3,
        icon: Globe,
        title: 'Cross-Border Synergy',
        desc: 'Optimizing international investment corridors and market entry.'
      },
    ],
  },
  ar: {
    title: 'نظرة عامة مؤسسية',
    tagline: 'استراتيجية رأس المال العالمي',
    intro: 'المنصة الرائدة التي تجمع أكثر من 100 مستثمر و 250 شركة ناشئة و 20 متحدثاً متميزاً.',
    mandate: 'التفويض الاستراتيجي',
    themePhrase: 'اطرح • اتصل • ازدهر',
    stats: [
      { id: 1, count: '100+', label: 'مستثمر', icon: Award },
      { id: 2, count: '250+', label: 'شركة ناشئة', icon: TrendingUp },
      { id: 3, count: '20+', label: 'متحدث', icon: Users },
    ],
    objectives: [
      {
        id: 1,
        icon: Handshake,
        title: 'حشد رأس المال',
        desc: 'تسريع النمو من خلال رأس المال المؤسسي المتطور.'
      },
      {
        id: 2,
        icon: Lightbulb,
        title: 'حوكمة الابتكار',
        desc: 'وضع معايير التميز التكنولوجي والأفكار الرائدة.'
      },
      {
        id: 3,
        icon: Globe,
        title: 'التآزر عبر الحدود',
        desc: 'تحسين ممرات الاستثمار الدولية وتسهيل الدخول إلى الأسواق.'
      },
    ],
  },
}

export default function EventOverview({ language = 'en' }: EventOverviewProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <section className="relative py-16 sm:py-20 bg-[#FBFBFC] overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Precision Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#034FA3 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Institutional Portfolio Card (Left) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              {/* Technical Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">Institutional Protocol</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
                {t.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-8 opacity-80">
                {t.intro}
              </p>

              {/* Stat Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {t.stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.id} className="text-center p-3 rounded-2xl bg-slate-50/50 border border-slate-50 hover:bg-white hover:border-slate-100 hover:shadow-sm transition-all">
                      <Icon size={14} className="mx-auto mb-2 text-[#034FA3] opacity-60" />
                      <div className="text-xl font-black text-slate-900">{stat.count}</div>
                      <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Mandate Footer */}
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target size={12} className="text-[#034FA3]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#034FA3]">{t.mandate}</span>
                </div>
                <div className="text-[10px] font-black text-slate-900 italic opacity-40">{t.themePhrase}</div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#034FA3]/5 to-transparent rounded-bl-[4rem]" />
            </motion.div>
          </div>

          {/* Mission Objectives (Right) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {t.objectives.map((obj, index) => {
                const Icon = obj.icon
                return (
                  <motion.div
                    key={obj.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-100 flex items-center gap-6 transition-all duration-300 hover:shadow-lg hover:bg-white group-hover:-translate-y-1">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#034FA3] group-hover:bg-[#034FA3] group-hover:text-white transition-all duration-500 border border-slate-50">
                        <Icon size={20} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                            {obj.title}
                          </h5>
                          <div className="h-px flex-grow bg-slate-50" />
                          <Sparkles size={12} className="text-amber-500 opacity-0 group-hover:opacity-40 transition-opacity" />
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed opacity-80">
                          {obj.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Legend Component */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-8 flex items-center justify-end gap-3 px-2"
            >
              <div className="flex -space-x-1.5 opacity-40">
                {[1, 2, 3].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full border border-white bg-slate-200" />)}
              </div>
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Global Partnership Synergy Matrix</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}