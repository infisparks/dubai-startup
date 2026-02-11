'use client'

import React, { useState } from 'react'
import {
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Feature {
  level: string;
  price: string;
  color: 'platinum' | 'gold' | 'silver' | 'bronze';
  features: string[];
}

interface SponsorshipPackageData {
  title: string;
  mainTitle: string;
  subtitle: string;
  packageIntro: string;
  tiers: Feature[];
}

interface SponsorshipPackageProps {
  language: 'en' | 'ar'
}

const translations: { [key: string]: SponsorshipPackageData } = {
  en: {
    title: 'Sponsorship Packages',
    mainTitle: 'Sponsorship Packages',
    subtitle: 'Choose the level that best fits your brand goals.',
    packageIntro: 'What your chosen sponsorship package gets you:',
    tiers: [
      {
        level: 'PLATINUM SPONSOR',
        price: '500,000 AED',
        color: 'platinum',
        features: [
          'Exclusive branding as Platinum sponsor.',
          '8 full conference passes.',
          '1 speaker slot - in a panel discussion',
          'Logo presence in cross-media campaigns promoting the event.',
          'Your Brand Identity/ Logo on full display on Backdrop Side Panels.',
          '3 display standees at strategic locations at venue.',
          'Company brochure (Not more than 4 pages) to be provided by sponsor, will be placed in the delegate kit.',
          'Consistent Branding Across Our Social Media Channels.'
        ]
      },
      {
        level: 'GOLD SPONSOR',
        price: '300,000 AED',
        color: 'gold',
        features: [
          '6 full conference passes.',
          'Your Brand Identity/ Logo on full display on Backdrop Side Panels.',
          '2 display standees at strategic locations at venue.',
          'Company brochure (Not more than 2 pages) to be provided by sponsor, will be placed in the delegate kit.',
          'Consistent Branding Across Our Social Media Channels.',
          'Logo presence in cross-media campaigns promoting the event.'
        ]
      },
      {
        level: 'SILVER SPONSOR',
        price: '200,000 AED',
        color: 'silver',
        features: [
          '4 full conference passes.',
          'Your Brand Identity/ Logo on display on Backdrop Side Panels.',
          '1 display standee at strategic locations at venue.',
          'Company brochure (Not more than 1 page) to be provided by sponsor, will be placed in the delegate kit.',
          'Consistent Branding Across Our Social Media Channels.',
          'Logo presence in cross-media campaigns promoting the event.'
        ]
      },
      {
        level: 'BRONZE SPONSOR',
        price: '100,000 AED',
        color: 'bronze',
        features: [
          '2 full conference passes.',
          'Your Brand Identity/ Logo on Backdrop Side Panels.',
          'Consistent Branding Across Our Social Media Channels.',
          'Logo presence in cross-media campaigns promoting the event.'
        ]
      }
    ],
  },
  ar: {
    title: 'باقات الرعاية',
    mainTitle: 'باقات الرعاية',
    subtitle: 'اختر المستوى الذي يناسب أهداف علامتك التجارية بشكل أفضل.',
    packageIntro: 'ما تحصل عليه باقة الرعاية المختارة:',
    tiers: [
      {
        level: 'راعي بلاتيني',
        price: '500,000 درهم',
        color: 'platinum',
        features: [
          'هوية تجارية حصرية كراعي بلاتيني.',
          '8 تصاريح كاملة للمؤتمر.',
          'فرصة تحدث واحدة - في حلقة نقاشية.',
          'تواجد الشعار في حملات تسويقية عبر الوسائط للترويج للحدث.',
          'هوية علامتك التجارية / شعارك معروض بالكامل على لوحات الخلفية الجانبية.',
          '3 منصات عرض (Standees) في مواقع استراتيجية في الموقع.',
          'كتيب الشركة (بحد أقصى 4 صفحات) يقدمه الراعي، يوضع في ملف الوفود.',
          'هوية تجارية متسقة عبر قنوات التواصل الاجتماعي الخاصة بنا.'
        ]
      },
      {
        level: 'راعي ذهبي',
        price: '300,000 درهم',
        color: 'gold',
        features: [
          '6 تصاريح كاملة للمؤتمر.',
          'هوية علامتك التجارية / شعارك معروض بالكامل على لوحات الخلفية الجانبية.',
          'منصتا عرض (Standees) في مواقع استراتيجية في الموقع.',
          'كتيب الشركة (بحد أقصى صفحتان) يقدمه الراعي، يوضع في ملف الوفود.',
          'هوية تجارية متسقة عبر قنوات التواصل الاجتماعي الخاصة بنا.',
          'تواجد الشعار في حملات تسويقية عبر الوسائط للترويج للحدث.'
        ]
      },
      {
        level: 'راعي فضي',
        price: '200,000 درهم',
        color: 'silver',
        features: [
          '4 تصاريح كاملة للمؤتمر.',
          'هوية علامتك التجارية / شعارك على لوحات الخلفية الجانبية.',
          'منصة عرض واحدة (Standee) في مواقع استراتيجية في الموقع.',
          'كتيب الشركة (بحد أقصى صفحة واحدة) يقدمه الراعي، يوضع في ملف الوفود.',
          'هوية تجارية متسقة عبر قنوات التواصل الاجتماعي الخاصة بنا.',
          'تواجد الشعار في حملات تسويقية عبر الوسائط للترويج للحدث.'
        ]
      },
      {
        level: 'راعي برونزي',
        price: '100,000 درهم',
        color: 'bronze',
        features: [
          '2 تصريح كامل للمؤتمر.',
          'هوية علامتك التجارية / شعارك على لوحات الخلفية الجانبية.',
          'هوية تجارية متسقة عبر قنوات التواصل الاجتماعي الخاصة بنا.',
          'تواجد الشعار في حملات تسويقية عبر الوسائط للترويج للحدث.'
        ]
      }
    ],
  },
}

const colorConfigs = {
  platinum: {
    headerBg: 'bg-white',
    bodyBg: 'bg-[#B21F24]',
    levelText: 'text-[#4A4A4A]',
    priceText: 'text-[#8B0000]',
    featureText: 'text-white'
  },
  gold: {
    headerBg: 'bg-white',
    bodyBg: 'bg-[#B21F24]',
    levelText: 'text-[#4A4A4A]',
    priceText: 'text-[#8B0000]',
    featureText: 'text-white'
  },
  silver: {
    headerBg: 'bg-white',
    bodyBg: 'bg-[#2D2D2D]',
    levelText: 'text-[#4A4A4A]',
    priceText: 'text-[#8B0000]',
    featureText: 'text-white'
  },
  bronze: {
    headerBg: 'bg-white',
    bodyBg: 'bg-[#555555]',
    levelText: 'text-[#4A4A4A]',
    priceText: 'text-[#8B0000]',
    featureText: 'text-white'
  }
}

export default function SponsorshipPackages({ language = 'en' }: SponsorshipPackageProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
    <section id="sponsorship" className="py-24 bg-[#F5F5F5] overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#333] mb-4"
          >
            {t.mainTitle}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            className="h-1.5 bg-[#B21F24] mx-auto mb-6"
          />
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.tiers.map((tier, index) => {
            const config = colorConfigs[tier.color]
            const isExpanded = expandedCard === tier.level

            return (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col h-full rounded-sm overflow-hidden shadow-xl"
              >
                {/* Image-Style Header */}
                <div className={`${config.headerBg} p-8 flex flex-col justify-center border-b border-gray-100`}>
                  <h3 className={`text-xl md:text-2xl font-bold ${config.levelText} mb-2 leading-tight`}>
                    {tier.level} — <span className={`${config.priceText}`}>{tier.price}</span>
                  </h3>
                  <p className="text-sm font-medium text-gray-600 mt-2">
                    {t.packageIntro}
                  </p>
                </div>

                {/* Image-Style Body */}
                <div className={`${config.bodyBg} p-8 flex-grow flex flex-col`}>
                  <ul className="space-y-4 flex-grow mb-6">
                    {tier.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                        <span className={`text-sm font-medium ${config.featureText} leading-relaxed`}>
                          {feature}
                        </span>
                      </li>
                    ))}

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
                              <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                              <span className={`text-sm font-medium ${config.featureText} leading-relaxed`}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </ul>

                  {tier.features.length > 4 && (
                    <button
                      onClick={() => setExpandedCard(isExpanded ? null : tier.level)}
                      className={`mt-auto flex items-center justify-center gap-2 text-xs font-bold ${config.featureText} opacity-80 hover:opacity-100 transition-opacity uppercase tracking-wider`}
                    >
                      {isExpanded ? (isRtl ? 'عرض أقل' : 'Read Less') : (isRtl ? 'إقرأ المزيد' : 'Read More')}
                      <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  )}
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
          <p className="text-gray-500 font-medium italic">
            {isRtl
              ? '* تتوفر باقات مخصصة عند الطلب لتناسب أهدافك التسويقية المحددة.'
              : '* Custom packages are available upon request to suit your specific marketing goals.'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}