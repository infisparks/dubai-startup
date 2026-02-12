'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Phone, ArrowRight, Calendar, Users, Target, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

interface EventOverviewProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    tag: ' institutional Overview',
    title: 'Architecting the Future of Global Investment',
    description: 'We are dedicated to creating seamless, high-impact investment corridors. With a passion for innovation and attention to detail, our platform bridges the gap between visionary startups and institutional capital.',
    features: [
      {
        title: 'Seamless Capital Mobilization',
        desc: 'Discover the vision that drives this event—a commitment to bringing together innovators, leaders & changemakers to share knowledge.',
        icon: Calendar
      },
      {
        title: 'Strategic Innovation Governance',
        desc: 'Establishing the standards for technological excellence and optimizing international market entry.',
        icon: Target
      }
    ],
    buttons: {
      learnMore: 'Learn More About',
      call: 'Call Now!',
      phone: '+971 55 472 1421'
    },
    stats: {
      count: '100+',
      label: 'Global Investors'
    }
  },
  ar: {
    tag: 'نظرة عامة مؤسسية',
    title: 'هندسة مستقبل الاستثمار العالمي',
    description: 'نحن مكرسون لإنشاء ممرات استثمارية سلسة وعالية التأثير. بشغف للابتكار واهتمام بالتفاصيل، تغلق منصتنا الفجوة بين الشركات الناشئة الرؤيوية ورأس المال المؤسسي.',
    features: [
      {
        title: 'تعبئة رأس المال بسلاسة',
        desc: 'اكتشف الرؤية التي تقود هذا الحدث — التزام بجمع المبتكرين والقادة وصناع التغيير لتبادل المعرفة.',
        icon: Calendar
      },
      {
        title: 'حكمة الابتكار الاستراتيجي',
        desc: 'وضع معايير التميز التكنولوجي وتحسين الدخول إلى الأسواق الدولية.',
        icon: Target
      }
    ],
    buttons: {
      learnMore: 'المزيد عنا',
      call: 'اتصل الآن!',
      phone: '+971 55 472 1421'
    },
    stats: {
      count: '100+',
      label: 'مستثمر عالمي'
    }
  }
}

export default function EventOverview({ language = 'en' }: EventOverviewProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Dot Pattern Background */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[radial-gradient(#034FA3_2px,transparent_2px)] [background-size:24px_24px] opacity-20" />

            {/* Main Image */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl w-[90%] aspect-[4/5] lg:aspect-[3.5/4]">
              <img
                src="/day11.jpg"
                alt="Investarise Event"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Secondary Floating Image */}
            <div className="absolute bottom-12 -right-4 lg:-right-12 w-[60%] aspect-square rounded-[2rem] border-8 border-white shadow-2xl z-20 overflow-hidden bg-white">
              <img
                src="/day2.jpg"
                alt="Networking"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Circular Badge */}
            <div className="absolute top-[30%] -right-8 w-32 h-32 bg-white rounded-full flex items-center justify-center p-2 shadow-xl z-30 animate-spin-slow">
              <div className="w-full h-full rounded-full border-2 border-dashed border-[#034FA3] flex items-center justify-center relative">
                <svg className="w-full h-full absolute inset-0 text-[#034FA3]" viewBox="0 0 100 100">
                  <path
                    id="curve"
                    d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
                    fill="transparent"
                  />
                  <text className="text-[10px] font-bold uppercase tracking-widest text-[#034FA3]">
                    <textPath href="#curve" startOffset="0%">
                      • View Schedule • View Schedule •
                    </textPath>
                  </text>
                </svg>
                <div className="w-12 h-12 bg-[#034FA3] rounded-full flex items-center justify-center text-white font-bold">
                  <Calendar size={20} />
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute bottom-24 -left-6 bg-[#1a1a2e] text-white p-5 rounded-2xl shadow-xl z-30 flex items-center gap-4 max-w-[200px]">
              <div className="w-12 h-12 rounded-xl bg-[#034FA3] flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black">{t.stats.count}</div>
                <div className="text-xs text-gray-400 capitalize">{t.stats.label}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#034FA3]" />
              <span className="text-sm font-bold text-[#034FA3] uppercase tracking-wider">{t.tag}</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight">
              {t.title}
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              {t.description}
            </p>

            <div className="space-y-6 mb-10">
              {t.features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div key={idx} className="flex gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#034FA3]/10 flex items-center justify-center text-[#034FA3]">
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="/#vision"
                className="px-8 py-4 bg-[#034FA3] text-white rounded-full font-bold shadow-lg shadow-[#034FA3]/30 hover:shadow-xl hover:bg-[#023e8a] hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <span>{t.buttons.learnMore}</span>
                <ArrowRight size={18} />
              </Link>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#034FA3]/10 flex items-center justify-center text-[#034FA3]">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.buttons.call}</span>
                  <a href={`tel:${t.buttons.phone}`} className="text-lg font-black text-slate-900 hover:text-[#034FA3] transition-colors">
                    {t.buttons.phone}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  )
}