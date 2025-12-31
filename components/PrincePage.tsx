'use client'

import Image from 'next/image'
import React from 'react'
import { Crown, Star, Globe } from 'lucide-react'

interface PrincePageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    guestOfHonor: 'Guest of Honor & Mentor',
    welcomeMessage: 'A visionary leader inspiring excellence and innovation across continents.',
    princeName: 'H.R.H Prince Ebrahim Sanyang',
    role: 'Royal Africa Holdings Chairman',
    bio: [
      "H.R.H. Prince Ebrahim Sanyang is a 21st-century royal and transformative Pan-African figure whose life's work spans diplomacy, heritage, and sustainable development. As a direct descendant of the legendary rulers of the Mali & Kabu Empires, he is a custodian of tradition and a pioneer of the future.",
      "Recognized for exceptional leadership in economic development, he champions transformative entrepreneurship and pioneering investments across Africa.",
      "As Chairman of Royal Africa Holdings, he spearheads the $5 billion Mansa Sansang City Project in The Gambia, driving growth and prosperity in the region."
    ],
    stats: [
      { label: 'Investment Value', value: '$5B+' },
      { label: 'Global Impact', value: 'Pan-African' },
      { label: 'Leadership', value: 'Visionary' },
    ]
  },
  ar: {
    guestOfHonor: 'ضيف الشرف والمرشد',
    welcomeMessage: 'قائد صاحب رؤية يلهم التميز والابتكار عبر القارات.',
    princeName: 'صاحب السمو الأمير إبراهيم سانيانغ',
    role: 'رئيس مجلس إدارة رويال أفريقيا القابضة',
    bio: [
      "صاحب السمو الأمير إبراهيم سانيانغ هو شخصية ملكية وتحويلية أفريقية من القرن الحادي والعشرين، يمتد عمله الدبلوماسي والتراثي والتنمية المستدامة. بصفته سليل مباشر لحكام إمبراطوريتي مالي وكابو الأسطوريتين، فهو وصي على التقاليد ورائد للمستقبل.",
      "تم الاعتراف به لقيادته الاستثنائية في التنمية الاقتصادية، وهو يناصر ريادة الأعمال التحويلية والاستثمارات الرائدة في جميع أنحاء أفريقيا.",
      "بصفته رئيس مجلس إدارة رويال أفريقيا القابضة، يقود مشروع مدينة مانسا سانسانغ بقيمة 5 مليارات دولار في غامبيا، مما يدفع النمو والازدهار في المنطقة."
    ],
    stats: [
      { label: 'قيمة الاستثمار', value: '+5 مليار دولار' },
      { label: 'التأثير العالمي', value: 'عموم أفريقيا' },
      { label: 'القيادة', value: 'صاحب رؤية' },
    ]
  },
}

export default function PrincePage({ language = 'en' }: PrincePageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <section className="relative py-12 lg:py-16 bg-slate-950 overflow-hidden flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

          {/* Image Section - Smaller & Optimized */}
          <div className="w-full lg:w-[35%] relative group perspective-1000">
            <div className="relative z-10 transform transition-transform duration-700 group-hover:rotate-y-6 group-hover:scale-105">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-900/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                <Image
                  src="/prince.png"
                  alt={t.princeName}
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                  priority
                />

                {/* Floating Tags - Smaller */}
                <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} z-30`}>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-500 rounded-lg text-white">
                        <Crown className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[9px] text-amber-200 font-medium uppercase tracking-wider">Royal Lineage</p>
                        <p className="text-[11px] font-bold text-white">Mali & Kabu Empires</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements - Scaled */}
            <div className={`absolute -top-4 ${isRtl ? '-right-4' : '-left-4'} w-full h-full border-2 border-amber-500/20 rounded-2xl -z-10 transform rotate-2 transition-transform duration-700 group-hover:rotate-4`} />
            <div className={`absolute -bottom-4 ${isRtl ? '-left-4' : '-right-4'} w-full h-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl -z-20 transform -rotate-2 transition-transform duration-700 group-hover:-rotate-4 blur-lg`} />
          </div>

          {/* Content Section - Compact & Elegant */}
          <div className={`w-full lg:w-[65%] ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className="space-y-5">
              <div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">{t.guestOfHonor}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2 tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">
                    {t.princeName}
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-blue-200 font-light border-l-2 border-blue-500 pl-3">
                  {t.role}
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-light">
                {t.bio.map((paragraph, index) => (
                  <p key={index} className="hover:text-white transition-colors duration-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats Row - Compact */}
              <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10">
                {t.stats.map((stat, idx) => (
                  <div key={idx} className="group cursor-default">
                    <p className="text-base sm:text-lg font-bold text-white mb-0.5 group-hover:text-amber-400 transition-colors whitespace-nowrap">
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}