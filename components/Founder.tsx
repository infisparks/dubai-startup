'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Twitter, ChevronDown, ChevronUp, Quote, Award, ShieldCheck, Sparkles } from 'lucide-react'

interface FounderPageProps {
  language: 'en' | 'ar'
}

const content = {
  en: {
    sectionTitle: 'Visionary Founders',
    tagline: 'Architects of Strategic Growth',
    founders: [
      {
        id: 'kishan',
        name: 'Kishan Kumar Verma',
        role: 'CEO, Investarise Global',
        image: '/speaker/4.png',
        color: 'from-blue-600 to-indigo-700',
        bio: [
          "An accomplished retail & business banking leader with over 25 years of diversified experience across the UAE and India, specializing in Strategic Business Growth.",
          "A fiercely driven start-up catalyst, he excels in launching new business lines and leading digital transformation.",
          "Recognized for consistently delivering double- and triple-digit growth, he blends strategic foresight with hands-on execution to enhance profitability."
        ]
      },
      {
        id: 'sushil',
        name: 'Sushil Sharma',
        role: 'Founder & CEO, Marwari Catalysts',
        image: '/speaker/14.png',
        color: 'from-amber-500 to-orange-600',
        bio: [
          "Founder and CEO of Marwari Catalysts, fueling the startup ecosystem in Tier 2 & 3 cities. A visionary leader committed to empowering entrepreneurs.",
          "Angel investor in 100+ startups, with a strong focus on inclusive growth. His expertise has helped numerous early-stage companies scale.",
          "He believes in the power of community and mentorship, bridging the gap between talent and opportunity."
        ]
      }
    ],
    readMore: 'Biography',
    readLess: 'Close',
  },
  ar: {
    sectionTitle: 'المؤسسون أصحاب الرؤية',
    tagline: 'مهندسو النمو الاستراتيجي',
    founders: [
      {
        id: 'kishan',
        name: 'كيشان كومار فيرما',
        role: 'الرئيس التنفيذي، Investarise Global',
        image: '/speaker/4.png',
        color: 'from-blue-600 to-indigo-700',
        bio: [
          "قائد بارز في الخدمات المصرفية يتمتع بخبرة تزيد عن 25 عامًا في الإمارات والهند، متخصص في النمو الاستراتيجي.",
          "محفز قوي للشركات الناشئة، يتفوق في قيادة التحول الرقمي وبناء فرق عالية الأداء.",
          "معروف بتحقيق نمو مزدوج وثلاثي الأرقام باستمرار، يمزج بين البصيرة الاستراتيجية والتنفيذ العملي."
        ]
      },
      {
        id: 'sushil',
        name: 'سوشيل شارما',
        role: 'المؤسس والرئيس التنفيذي، Marwari Catalysts',
        image: '/speaker/14.png',
        color: 'from-amber-500 to-orange-600',
        bio: [
          "المؤسس والرئيس التنفيذي لـ Marwari Catalysts، يغذي نظام الشركات الناشئة ويهتم بتمكين رواد الأعمال.",
          "مستثمر ملاك في أكثر من 100 شركة ناشئة، ساعدت خبرته العديد من الشركات على النجاح.",
          "يؤمن بقوة المجتمع والإرشاد، ويعمل بنشاط لسد الفجوة بين الموهبة والفرصة."
        ]
      }
    ],
    readMore: 'السيرة الذاتية',
    readLess: 'إغلاق',
  }
}

export default function FounderPage({ language = 'en' }: FounderPageProps) {
  const t = content[language]
  const isRtl = language === 'ar'
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="py-20 bg-white relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,79,163,0.02)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#034FA3] text-[9px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <ShieldCheck size={12} />
            Lead Governance
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4"
          >
            {t.sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-sm sm:text-base font-medium max-w-xl mx-auto"
          >
            {t.tagline}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {t.founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative"
            >
              <div className="relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] transition-all duration-500">
                <div className={`h-1.5 w-full bg-gradient-to-r ${founder.color}`} />

                <div className="p-6 sm:p-10">
                  <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
                    <div className="relative shrink-0">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-100 shadow-xl group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 bg-gradient-to-br ${founder.color} p-2 rounded-lg shadow-lg text-white`}>
                        <Award size={14} />
                      </div>
                    </div>

                    <div className="pt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#034FA3]/60">Executive Board</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-[#034FA3] transition-colors">
                        {founder.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                        {founder.role}
                      </p>

                      <div className="flex items-center gap-3 mt-4">
                        <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:text-white transition-all">
                          <Linkedin size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all">
                          <Twitter size={14} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className={`space-y-3 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium transition-all duration-500 overflow-hidden ${expandedId === founder.id ? 'max-h-[800px]' : 'max-h-[100px]'}`}>
                      {founder.bio.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    {!expandedId && <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <button
                      onClick={() => setExpandedId(expandedId === founder.id ? null : founder.id)}
                      className="group/btn flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#034FA3]"
                    >
                      <span>{expandedId === founder.id ? t.readLess : t.readMore}</span>
                      <ChevronDown size={12} className={`transition-transform ${expandedId === founder.id ? 'rotate-180' : ''}`} />
                    </button>
                    <Sparkles size={12} className="text-amber-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-slate-50/50 rounded-t-[1.5rem] -z-10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}