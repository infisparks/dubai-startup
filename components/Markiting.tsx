'use client'

import React from 'react'
import Link from 'next/link'
import { FiCheck, FiMail, FiGlobe, FiBriefcase, FiArrowRight } from 'react-icons/fi'

interface MarketingStrategyProps {
  language: 'en' | 'ar'
}

const StrategyIconMap: { [key: string]: React.ElementType } = {
  Press: FiMail,
  Digital: FiGlobe,
  Partnerships: FiBriefcase,
  Influencer: FiBriefcase,
  PostEvent: FiBriefcase,
};

const translations = {
  en: {
    title: "Marketing & Promotion Strategy",
    subtitle: "A comprehensive promotional plan designed to ensure widespread reach and engagement for the Investarise Global Investment Summit 2026.",
    strategies: [
      {
        iconKey: 'Press',
        title: 'Press & Media',
        type: 'list',
        items: ['Prominent Media Outlets', 'Leading Business Journals', 'Global News Coverage'],
      },
      {
        iconKey: 'Digital',
        title: 'Digital Marketing',
        type: 'list',
        items: ['LinkedIn Ads', 'Meta Campaigns', 'Targeted Social Media'],
      },
      {
        iconKey: 'Partnerships',
        title: 'Strategic Partnerships',
        type: 'list',
        items: ['Startup Accelerators', 'Incubators', 'Venture Capital Firms'],
      },
      {
        iconKey: 'Influencer',
        title: 'Influencer Collaborations',
        type: 'description',
        description: 'Collaborations with industry thought leaders to enhance visibility and credibility',
      },
      {
        iconKey: 'PostEvent',
        title: 'Post-Event Impact',
        type: 'description',
        description: "Production of a highlight film to extend the event's impact and reach",
      },
    ],
    cta: {
      title: "Ready to amplify your presence?",
      subtitle: "Create an impactful marketing strategy tailored to your goals.",
      button: "Get Started"
    }
  },
  ar: {
    title: "استراتيجية التسويق والترويج",
    subtitle: "خطة ترويجية شاملة مصممة لضمان الوصول الواسع والمشاركة لقمة إنفستارايز العالمية للاستثمار 2026.",
    strategies: [
      {
        iconKey: 'Press',
        title: 'الصحافة والإعلام',
        type: 'list',
        items: ['منافذ إعلامية بارزة', 'مجلات أعمال رائدة', 'تغطية إخبارية عالمية'],
      },
      {
        iconKey: 'Digital',
        title: 'التسويق الرقمي',
        type: 'list',
        items: ['إعلانات LinkedIn', 'حملات Meta', 'وسائل التواصل المستهدفة'],
      },
      {
        iconKey: 'Partnerships',
        title: 'الشراكات الاستراتيجية',
        type: 'list',
        items: ['مسرعات الشركات الناشئة', 'حاضنات الأعمال', 'شركات رأس المال الجريء'],
      },
      {
        iconKey: 'Influencer',
        title: 'تعاون المؤثرين',
        type: 'description',
        description: 'التعاون مع قادة الفكر في الصناعة لتعزيز الرؤية والمصداقية',
      },
      {
        iconKey: 'PostEvent',
        title: 'تأثير ما بعد الحدث',
        type: 'description',
        description: 'إنتاج فيلم تسليط الضوء لتوسيع تأثير الحدث ونطاقه',
      },
    ],
    cta: {
      title: "جاهز لتضخيم حضورك؟",
      subtitle: "أنشئ استراتيجية تسويق مؤثرة مصممة لأهدافك.",
      button: "ابدأ الآن"
    }
  },
}

// New component for the CTA, integrated into the grid
const GridCta = ({ language }: { language: 'en' | 'ar' }) => {
  const t = translations[language].cta;
  const isRtl = language === 'ar';

  return (
    <div className={`lg:col-span-2 md:col-span-2 group relative overflow-hidden rounded-lg transition-all duration-300`}>
      <div className="relative h-full p-4 rounded-lg border border-slate-200 overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1517245381831-f11a437e56b8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Abstract background"
          className="absolute inset-0 w-full h-full object-cover z-0 grayscale"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-[#940200] bg-opacity-80 group-hover:bg-opacity-90 transition-all duration-300 z-10" />

        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 h-full">
          <div className={isRtl ? 'text-right' : ''}>
            <h4 className="text-sm font-bold text-white mb-0.5">
              {t.title}
            </h4>
            <p className="text-xs text-white opacity-90">
              {t.subtitle}
            </p>
          </div>

          <Link
            href="/registration"
            className="flex-shrink-0 px-5 py-2 text-sm bg-white text-[#bf1e2e] font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap inline-block text-center"
          >
            {t.button}
          </Link>
        </div>
      </div>
    </div>
  );
};


export default function MarketingStrategy({ language = 'en' }: MarketingStrategyProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <section
      className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#bf1e2e]/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c4925f]/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto relative z-10">

        {/* Header - Compact */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#bf1e2e] to-[#c4925f]" />
            <span className="text-xs font-semibold tracking-widest text-[#bf1e2e] uppercase">Strategy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 tracking-tight">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {/* Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {t.strategies.map((strategy, index) => {
            const IconComponent = StrategyIconMap[strategy.iconKey] || FiBriefcase;
            const spanCol = strategy.title.includes('Post-Event') || strategy.title.includes('تأثير ما بعد الحدث') ? 'lg:col-span-2' : 'lg:col-span-1';

            return (
              <div
                key={strategy.title}
                className={`
                  group relative overflow-hidden rounded-lg transition-all duration-300
                  ${spanCol}
                `}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-white border border-slate-200 rounded-lg transition-all duration-300 group-hover:border-[#c4925f]/30 group-hover:shadow-md" />

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(191, 30, 46, 0.03) 0%, rgba(196, 146, 95, 0.03) 100%)'
                  }}
                />

                {/* Card Content - Tight Padding */}
                <div className="relative p-4">

                  {/* Icon + Title Row */}
                  <div className="flex items-start gap-2.5 mb-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#bf1e2e]/5 to-[#c4925f]/10 rounded-lg flex items-center justify-center border border-[#bf1e2e]/10 group-hover:border-[#c4925f]/30 transition-colors duration-300">
                        <IconComponent className="w-5 h-5 text-[#bf1e2e]" />
                      </div>
                    </div>

                    <div className={`${isRtl ? 'text-right' : ''}`}>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight group-hover:text-[#bf1e2e] transition-colors">
                        {strategy.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  {strategy.type === 'list' && strategy.items ? (
                    <div className="space-y-1.5">
                      {strategy.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#bf1e2e]/10 to-[#c4925f]/10 flex items-center justify-center border border-[#bf1e2e]/20 flex-shrink-0">
                              <FiCheck className="w-2 h-2 text-[#bf1e2e]" />
                            </div>
                          </div>
                          <span className="text-xs text-slate-500 leading-tight font-light">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-500 leading-tight font-light mb-2">
                        {strategy.description}
                      </p>
                      <div className="inline-flex items-center gap-1 text-[#bf1e2e] font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {language === 'en' ? 'More' : 'المزيد'}
                        <FiArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* CTA Section */}
          <GridCta language={language} />

        </div>

      </div>
    </section>
  )
}