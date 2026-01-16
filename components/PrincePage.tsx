'use client'

import Image from 'next/image'
import React from 'react'
import { Crown, Star, Award, TrendingUp, Globe } from 'lucide-react'

interface PrincePageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    guestOfHonor: 'Guest of Honor & Mentor',
    princeName: 'H.R.H Prince Ebrahim Sanyang',
    role: 'Royal Africa Holdings Chairman',
    bio: [
      "H.R.H. Prince Ebrahim is a 21st-century royal and transformative Pan-African figure whose life's work spans diplomacy, heritage, and sustainable development. As a direct descendant of the legendary rulers of the Mali & Kabu Empires, he is a custodian of tradition and a pioneer of the future.",
      "Recognised for exceptional leadership in economic development, he champions transformative entrepreneurship and pioneering investments across Africa.",
      "As Chairman of Royal Africa Holdings, he spearheads over $8 Billion of portfolios and pipeline investments in Real Estates, Aviation, Oil and Gas, Transport and Logistics, Banking and Finance, Media etc, driving growth and prosperity in the region."
    ],
    stats: [
      { label: 'Investment Value', value: '$8B+', icon: TrendingUp },
      { label: 'Global Impact', value: 'Pan-African', icon: Globe },
      { label: 'Leadership', value: 'Visionary', icon: Award },
    ]
  },
  ar: {
    guestOfHonor: 'ضيف الشرف والمرشد',
    princeName: 'صاحب السمو الأمير إبراهيم سانيانغ',
    role: 'رئيس مجلس إدارة رويال أفريقيا القابضة',
    bio: [
      "صاحب السمو الأمير إبراهيم هو شخصية ملكية وتحويلية أفريقية من القرن الحادي والعشرين، يمتد عمله الدبلوماسي والتراثي والتنمية المستدامة. بصفته سليل مباشر لحكام إمبراطوريتي مالي وكابو الأسطوريتين، فهو وصي على التقاليد ورائد للمستقبل.",
      "تم الاعتراف به لقيادته الاستثنائية في التنمية الاقتصادية، وهو يناصر ريادة الأعمال التحويلية والاستثمارات الرائدة في جميع أنحاء أفريقيا.",
      "بصفته رئيس مجلس إدارة رويال أفريقيا القابضة، يقود أكثر من 8 مليارات دولار من المحافظ والاستثمارات في مجالات العقارات والطيران والنفط والغاز والنقل والخدمات اللوجستية والمصارف والتمويل والإعلام وغيرها، مما يدفع النمو والازدهار في المنطقة."
    ],
    stats: [
      { label: 'قيمة الاستثمار', value: '+8 مليار دولار', icon: TrendingUp },
      { label: 'التأثير العالمي', value: 'عموم أفريقيا', icon: Globe },
      { label: 'القيادة', value: 'صاحب رؤية', icon: Award },
    ]
  },
}

export default function PrincePage({ language = 'en' }: PrincePageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <section className="relative py-16 bg-white overflow-hidden flex items-center">
      {/* Background - Clean White with subtle Red accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Red/Gold Blobs for Depth */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#bf1e2e]/5 rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c4925f]/10 rounded-full blur-[120px] opacity-40 translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

          {/* Image Section */}
          <div className="w-[85%] sm:w-[60%] lg:w-[32%] relative group perspective-1000 mx-auto lg:mx-0">
            {/* Decorative Border */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#bf1e2e]/20 via-[#c4925f]/20 to-[#bf1e2e]/20 rounded-2xl opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-700" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02] bg-white aspect-[3/4.5]">
              <Image
                src="/prince.png"
                alt={t.princeName}
                fill
                className="object-cover transform transition-transform duration-1000 group-hover:scale-105"
                priority
              />

              {/* Floating Badge */}
              <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-20`}>
                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#bf1e2e]/20">
                  <Crown className="w-3.5 h-3.5 text-[#bf1e2e] fill-current" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#bf1e2e]">Royal Guest</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`w-full lg:w-[68%] ${isRtl ? 'text-right' : 'text-left'} self-start`}>
            <div className="space-y-6">

              {/* Header */}
              <div className="space-y-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf1e2e]/5 border border-[#bf1e2e]/20 text-[#bf1e2e] ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">{t.guestOfHonor}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#bf1e2e] leading-tight tracking-tight">
                  {t.princeName}
                </h2>

                <p className={`text-lg sm:text-xl text-[#58585a] font-medium ${isRtl ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-[#c4925f]`}>
                  {t.role}
                </p>
              </div>

              {/* Bio - Dark text for readability on white */}
              <div className="space-y-3 text-[#58585a] text-base leading-relaxed font-normal">
                {t.bio.map((paragraph, index) => (
                  <p key={index} className="transition-opacity hover:opacity-100 opacity-90 hover:text-black">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Stats - White Cards with Red Text */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                {t.stats.map((stat, idx) => {
                  const Icon = stat.icon
                  return (
                    <div key={idx} className="group relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#bf1e2e]/20 transition-all duration-300">

                      <div className="mb-2 w-8 h-8 rounded-lg bg-[#bf1e2e]/5 flex items-center justify-center text-[#bf1e2e] group-hover:bg-[#bf1e2e] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>

                      <p className="text-xl font-bold text-slate-800 mb-0.5 group-hover:text-[#bf1e2e] transition-colors">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider group-hover:text-gray-700">
                        {stat.label}
                      </p>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}