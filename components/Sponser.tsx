'use client'

import React, { useState } from 'react'
import {
  Check,
  Award,
  Shield,
  Pocket,
  Zap,
  ChevronRight,
  Trophy,
  Gem,
  ExternalLink
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Feature {
  level: string;
  price: string;
  icon: React.ElementType;
  color: 'platinum' | 'gold' | 'silver' | 'bronze';
  features: string[];
  highlight?: string;
  description: string;
}

interface SponsorshipPackageData {
  title: string;
  mainTitle: string;
  subtitle: string;
  tiers: Feature[];
}

interface SponsorshipPackageProps {
  language: 'en' | 'ar'
}

const translations: { [key: string]: SponsorshipPackageData } = {
  en: {
    title: 'Sponsorship Packages',
    mainTitle: 'Partner With Us',
    subtitle: 'Choose the perfect sponsorship level to elevate your brand presence and connect with industry leaders.',
    tiers: [
      {
        level: 'Platinum Sponsor',
        price: '500,000 AED',
        icon: Trophy,
        color: 'platinum',
        description: 'Elite partnership with maximum brand exposure and high-level engagement opportunities.',
        features: [
          'Exclusive branding as Platinum sponsor',
          '8 full conference passes',
          '1 speaker slot - in a panel discussion',
          'Logo presence in cross-media campaigns',
          'Logo on full display on Backdrop Side Panels',
          '3 display standees at strategic locations',
          'Company brochure (4 pages) in delegate kit',
          'Consistent Branding Across Social Media'
        ],
        highlight: 'MOST PRESTIGIOUS'
      },
      {
        level: 'Gold Sponsor',
        price: '300,000 AED',
        icon: Gem,
        color: 'gold',
        description: 'Premium visibility and significant representation throughout the event.',
        features: [
          '6 full conference passes',
          'Logo on full display on Backdrop Side Panels',
          '2 display standees at strategic locations',
          'Company brochure (2 pages) in delegate kit',
          'Consistent Branding Across Social Media',
          'Logo presence in cross-media campaigns'
        ],
        highlight: 'BEST VALUE'
      },
      {
        level: 'Silver Sponsor',
        price: '200,000 AED',
        icon: Shield,
        color: 'silver',
        description: 'Strong brand presence with essential networking and marketing benefits.',
        features: [
          '4 full conference passes',
          'Logo on display on Backdrop Side Panels',
          '1 display standee at strategic locations',
          'Company brochure (1 page) in delegate kit',
          'Consistent Branding Across Social Media',
          'Logo presence in cross-media campaigns'
        ]
      },
      {
        level: 'Bronze Sponsor',
        price: '100,000 AED',
        icon: Pocket,
        color: 'bronze',
        description: 'Quality representation and basic awareness among event attendees.',
        features: [
          '2 full conference passes',
          'Your Brand Identity/ Logo on Backdrop Side Panels',
          'Consistent Branding Across Social Media',
          'Logo presence in cross-media campaigns'
        ]
      }
    ],
  },
  ar: {
    title: 'باقات الرعاية',
    mainTitle: 'شاركنا النجاح',
    subtitle: 'اختر مستوى الرعاية المثالي لتعزيز حضور علامتك التجارية والتواصل مع قادة الصناعة.',
    tiers: [
      {
        level: 'الراعي البلاتيني',
        price: '500,000 درهم',
        icon: Trophy,
        color: 'platinum',
        description: 'شراكة نخبوية مع أقصى قدر من التعرض للعلامة التجارية وفرص المشاركة رفيعة المستوى.',
        features: [
          'علامة تجارية حصرية كراعي بلاتيني',
          '8 تصاريح كاملة للمؤتمر',
          'فرصة تحدث واحدة - في حلقة نقاش',
          'تواجد الشعار في حملات تسويقية عبر الوسائط',
          'عرض الشعار بالكامل على لوحات الخلفية الجانبية',
          '3 منصات عرض (Standees) في مواقع استراتيجية',
          'كتيب الشركة (4 صفحات بحد أقصى) في ملف الوفود',
          'علامة تجارية متسقة عبر قنوات التواصل الاجتماعي'
        ],
        highlight: 'الأكثر تميزاً'
      },
      {
        level: 'الراعي الذهبي',
        price: '300,000 درهم',
        icon: Gem,
        color: 'gold',
        description: 'رؤية متميزة وتمثيل كبير في جميع أنحاء الحدث.',
        features: [
          '6 تصاريح كاملة للمؤتمر',
          'عرض الشعار بالكامل على لوحات الخلفية الجانبية',
          '2 منصة عرض (Standees) في مواقع استراتيجية',
          'كتيب الشركة (صفحتان بحد أقصى) في ملف الوفود',
          'علامة تجارية متسقة عبر قنوات التواصل الاجتماعي',
          'تواجد الشعار في حملات تسويقية عبر الوسائط'
        ],
        highlight: 'أفضل قيمة'
      },
      {
        level: 'الراعي الفضي',
        price: '200,000 درهم',
        icon: Shield,
        color: 'silver',
        description: 'حضور قوي للعلامة التجارية مع مزايا التواصل والتسويق الأساسية.',
        features: [
          '4 تصاريح كاملة للمؤتمر',
          'عرض الشعار على لوحات الخلفية الجانبية',
          '1 منصة عرض (Standee) في مواقع استراتيجية',
          'كتيب الشركة (صفحة واحدة) في ملف الوفود',
          'علامة تجارية متسقة عبر قنوات التواصل الاجتماعي',
          'تواجد الشعار في حملات تسويقية عبر الوسائط'
        ]
      },
      {
        level: 'الراعي البرونزي',
        price: '100,000 درهم',
        icon: Pocket,
        color: 'bronze',
        description: 'تمثيل عالي الجودة ووعي أساسي بين حاضري الحدث.',
        features: [
          '2 تصريح كامل للمؤتمر',
          'هوية علامتك التجارية / شعارك على لوحات الخلفية الجانبية',
          'علامة تجارية متسقة عبر قنوات التواصل الاجتماعي',
          'تواجد الشعار في حملات تسويقية عبر الوسائط'
        ]
      }
    ],
  },
}

const colorConfigs = {
  platinum: {
    bg: 'bg-slate-900',
    text: 'text-white',
    icon: 'text-slate-300',
    border: 'border-slate-700',
    accent: 'bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400',
    button: 'bg-white text-slate-900 hover:bg-slate-100',
    check: 'text-slate-400',
    glow: 'shadow-[0_0_30px_rgba(203,213,225,0.2)]'
  },
  gold: {
    bg: 'bg-white',
    text: 'text-slate-900',
    icon: 'text-amber-500',
    border: 'border-amber-200',
    accent: 'bg-gradient-to-r from-amber-400 to-yellow-600',
    button: 'bg-slate-900 text-white hover:bg-slate-800',
    check: 'text-amber-500',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.15)]'
  },
  silver: {
    bg: 'bg-white',
    text: 'text-slate-900',
    icon: 'text-slate-500',
    border: 'border-slate-200',
    accent: 'bg-gradient-to-r from-slate-400 to-slate-600',
    button: 'bg-slate-900 text-white hover:bg-slate-800',
    check: 'text-slate-500',
    glow: 'shadow-[0_0_30px_rgba(148,163,184,0.1)]'
  },
  bronze: {
    bg: 'bg-white',
    text: 'text-slate-900',
    icon: 'text-orange-700',
    border: 'border-orange-100',
    accent: 'bg-gradient-to-r from-orange-400 to-orange-700',
    button: 'bg-slate-900 text-white hover:bg-slate-800',
    check: 'text-orange-700',
    glow: 'shadow-[0_0_30px_rgba(194,65,12,0.1)]'
  }
}

export default function SponsorshipPackages({ language = 'en' }: SponsorshipPackageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
    <section id="sponsorship" className="py-24 bg-slate-50 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-[#013371] uppercase bg-blue-50 rounded-full border border-blue-100"
          >
            {t.title}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight"
          >
            {t.mainTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed font-medium"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {t.tiers.map((tier, index) => {
            const config = colorConfigs[tier.color]
            const Icon = tier.icon
            const isExpanded = expandedCard === tier.level

            return (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative flex flex-col h-full rounded-2xl border-2 ${config.border} ${config.bg} ${config.text} ${config.glow} transition-all duration-500 hover:-translate-y-2`}
              >
                {/* Accent Bar at Top */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-xl ${config.accent}`} />

                {/* Highlight Badge */}
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-lg ${config.accent} text-white`}>
                      {tier.highlight}
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-slate-100 group-hover:scale-110 transition-transform duration-500 ${tier.color === 'platinum' ? 'bg-slate-800' : ''}`}>
                        <Icon className={`w-8 h-8 ${config.icon}`} />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-60">Investment</span>
                        <div className="text-2xl font-black">{tier.price}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">{tier.level}</h3>
                    <p className="text-sm opacity-80 leading-relaxed font-medium">
                      {tier.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full mb-8 opacity-10 ${tier.color === 'platinum' ? 'bg-white' : 'bg-slate-900'}`} />

                  {/* Features */}
                  <div className="flex-grow space-y-4 mb-10">
                    {tier.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.check}`} />
                        <span className="text-sm font-semibold opacity-90">{feature}</span>
                      </div>
                    ))}

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-4"
                        >
                          {tier.features.slice(4).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.check}`} />
                              <span className="text-sm font-semibold opacity-90">{feature}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto space-y-4">
                    {tier.features.length > 4 && (
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : tier.level)}
                        className="w-full flex items-center justify-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity"
                      >
                        {isExpanded ? (isRtl ? 'عرض أقل' : 'Read Less') : (isRtl ? 'إقرأ المزيد' : 'Read More')}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 font-medium italic">
            {isRtl
              ? '* تتوفر باقات مخصصة عند الطلب لتناسب أهدافك التسويقية المحددة.'
              : '* Custom packages are available upon request to suit your specific marketing goals.'}
          </p>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-100/40 rounded-full blur-[120px] pointer-events-none" />
    </section>
  )
}