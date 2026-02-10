'use client'

import React from 'react'
import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { Crown, Star, Award, TrendingUp, Globe, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react'

interface PrincePageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    badge: 'Guest of Honor & Mentor',
    name: 'H.R.H Prince Ebrahim Sanyang',
    role: 'Chairman, Royal Africa Holdings',
    heritage: 'Direct Descendant of Mali & Kabu Empires',
    bio: [
      "H.R.H. Prince Ebrahim is a 21st-century royal and transformative Pan-African figure whose life's work spans diplomacy, heritage, and sustainable development.",
      "As Chairman of Royal Africa Holdings, he spearheads over $8 Billion in portfolios across Real Estate, Aviation, Energy, and Finance, driving unprecedented growth in the region.",
      "Recognized globally for visionary leadership, he champions the next generation of African entrepreneurs through strategic capital and mentorship."
    ],
    stats: [
      { label: 'Portfolio Value', value: '$8B+', icon: TrendingUp, color: 'from-blue-500 to-indigo-600' },
      { label: 'Scope', value: 'Pan-African', icon: Globe, color: 'from-amber-400 to-orange-600' },
      { label: 'Strategic Vision', value: 'Global Lead', icon: Award, color: 'from-emerald-400 to-teal-600' },
    ]
  },
  ar: {
    badge: 'ضيف الشرف والمرشد',
    name: 'صاحب السمو الأمير إبراهيم سانيانغ',
    role: 'رئيس مجلس إدارة رويال أفريقيا القابضة',
    heritage: 'سليل مباشر لإمبراطوريتي مالي وكابو',
    bio: [
      "صاحب السمو الأمير إبراهيم هو شخصية ملكية وتحويلية أفريقية من القرن الحادي والعشرين، يمتد عمله في الدبلوماسية والتراث والتنمية المستدامة.",
      "بصفته رئيس مجلس إدارة رويال أفريقيا القابضة، يقود أكثر من 8 مليارات دولار من المحافظ في العقارات والطيران والطاقة والتمويل.",
      "معترف به عالميًا لقيادته الحكيمة، وهو يناصر الجيل القادم من رواد الأعمال الأفارقة من خلال رأس المال الاستراتيجي والتوجيه."
    ],
    stats: [
      { label: 'قيمة المحفظة', value: '+8 مليار دولار', icon: TrendingUp, color: 'from-blue-500 to-indigo-600' },
      { label: 'النطاق', value: 'عموم أفريقيا', icon: Globe, color: 'from-amber-400 to-orange-600' },
      { label: 'الرؤية الاستراتيجية', value: 'رائد عالمي', icon: Award, color: 'from-emerald-400 to-teal-600' },
    ]
  },
}

export default function PrincePage({ language = 'en' }: PrincePageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  const containerVariants: Variants = {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section id="honorable-guest" className="relative py-24 lg:py-32 bg-[#020617] overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>

      {/* Immersive Background Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0)_0%,#020617_100%)]" />
        {/* Animated Aurora Effect */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center"
        >

          {/* IMAGE BLOCK: Cinematic Frame (5 Cols) */}
          <div className="lg:col-span-5 relative group">
            <motion.div
              variants={itemVariants}
              className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src="/prince.png"
                alt={t.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />

              {/* Floating Status Card */}
              <div className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'} z-20`}>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Distinguished Keynote</span>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-32 h-32 bg-amber-500/10 blur-3xl pointer-events-none`} />
            </motion.div>

            {/* Background Decorative Rings */}
            <div className="absolute -z-10 -top-12 -left-12 w-64 h-64 border border-blue-500/10 rounded-full animate-spin-slow" />
            <div className="absolute -z-10 -bottom-12 -right-12 w-48 h-48 border border-white/5 rounded-full animate-reverse-spin" />
          </div>

          {/* CONTENT BLOCK: Executive Profile (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400">
                <Crown size={14} className="fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t.badge}</span>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-4xl sm:text-6xl font-black text-white leading-[1.05] tracking-tighter">
                  {t.name}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-amber-500/80">
                  <p className="text-lg font-bold tracking-tight uppercase border-b-2 border-amber-500/20 pb-1">
                    {t.role}
                  </p>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <p className="text-sm font-medium italic opacity-60">
                    {t.heritage}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* BIO: Text Reveal */}
            <div className="space-y-6">
              {t.bio.map((para, idx) => (
                <motion.p
                  key={idx}
                  variants={itemVariants}
                  className="text-lg text-slate-400 leading-relaxed font-light first-letter:text-3xl first-letter:font-bold first-letter:text-white"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* STATS: Modern Glass Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6"
            >
              {t.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-2xl font-black text-white mb-1 tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.stats[idx].label}</p>

                  {/* Subtle Interaction Arrow */}
                  <ArrowUpRight size={14} className="absolute top-4 right-4 text-white/0 group-hover:text-white/40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
      `}</style>

    </section>
  )
}