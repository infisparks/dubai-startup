'use client'

import React from 'react'
import { FiCheck, FiMail, FiGlobe, FiUsers, FiPackage, FiBriefcase, FiArrowRight } from 'react-icons/fi'

interface MarketingStrategyProps {
  language: 'en' | 'ar'
}

const StrategyIconMap: { [key: string]: React.ElementType } = {
  Press: FiMail,
  Digital: FiGlobe,
  Partnerships: FiBriefcase,
  Influencer: FiUsers,
  PostEvent: FiPackage,
};

const translations = {
  en: {
    title: "Marketing & Promotion Strategy",
    subtitle: "A comprehensive promotional framework designed to maximize market penetration and stakeholder engagement for the Investarise Global Investment Summit 2026.",
    strategies: [
      {
        iconKey: 'Press',
        title: 'Press & Media',
        type: 'list',
        items: ['Gulf News', 'Khaleej Times', 'Forbes Middle East', 'Nabd'],
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
        description: 'Collaborations with industry thought leaders to enhance visibility and credibility.',
      },
      {
        iconKey: 'PostEvent',
        title: 'Post-Event Impact',
        type: 'description',
        description: 'Production of a highlight film to extend the event\'s impact and reach.',
      },
    ],
  },
  ar: {
    title: "استراتيجية التسويق والترويج",
    subtitle: "إطار عمل ترويجي شامل مصمم لتعظيم اختراق السوق ومشاركة أصحاب المصلحة لقمة إنفستارايز العالمية للاستثمار 2026.",
    strategies: [
      {
        iconKey: 'Press',
        title: 'الصحافة والإعلام',
        type: 'list',
        items: ['جلف نيوز', 'الخليج تايمز', 'فوربس الشرق الأوسط', 'نبض'],
      },
      {
        iconKey: 'Digital',
        title: 'التسويق الرقمي',
        type: 'list',
        items: ['إعلانات LinkedIn', 'حملات Meta', 'استهداف وسائل التواصل الاجتماعي'],
      },
      {
        iconKey: 'Partnerships',
        title: 'الشراكات الاستراتيجية',
        type: 'list',
        items: ['مسرعات الشركات الناشئة', 'حاضنات الأعمال', 'شركات رأس المال المغامر'],
      },
      {
        iconKey: 'Influencer',
        title: 'التعاون مع المؤثرين',
        type: 'description',
        description: 'التعاون مع قادة الفكر في الصناعة لتعزيز الرؤية والمصداقية.',
      },
      {
        iconKey: 'PostEvent',
        title: 'تأثير ما بعد الحدث',
        type: 'description',
        description: 'إنتاج فيلم تسليطي لزيادة تأثير الحدث ووصوله.',
      },
    ],
  },
}

export default function MarketingStrategy({ language }: MarketingStrategyProps) {
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <section 
      // ADJUSTMENT 1: Reduced Section Vertical Padding (py-20/24/32 -> py-16/24/24)
      className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Decorative Grid (Kept for style) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(15, 23, 42, 0.05) 25%, rgba(15, 23, 42, 0.05) 26%, transparent 27%, transparent 74%, rgba(15, 23, 42, 0.05) 75%, rgba(15, 23, 42, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(15, 23, 42, 0.05) 25%, rgba(15, 23, 42, 0.05) 26%, transparent 27%, transparent 74%, rgba(15, 23, 42, 0.05) 75%, rgba(15, 23, 42, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Header Section (Reduced vertical spacing) */}
        <div className="mb-10 lg:mb-12">
          
          {/* Pre-title Badge (Reduced margin) */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            <span className="text-xs font-semibold tracking-widest text-slate-600 uppercase">Strategic Framework</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-2 tracking-tight leading-tight max-w-4xl">
            {t.title}
          </h1>

          {/* Accent Line and Subtitle (Reduced margin/padding) */}
          <div className="flex gap-3 my-4">
            <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-snug font-light">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Strategy Grid with Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"> {/* Reduced gap */}
          {t.strategies.map((strategy, index) => {
            const IconComponent = StrategyIconMap[strategy.iconKey] || FiBriefcase;
            const isWideCard = index >= 3;
            const isLastGroup = index >= 3;

            return (
              <div 
                key={strategy.title}
                className={`
                  group relative overflow-hidden rounded-xl transition-all duration-500 ease-out
                  ${isWideCard ? 'lg:col-span-3' : 'lg:col-span-1'}
                  ${isLastGroup ? 'lg:flex lg:gap-6' : ''} {/* Reduced gap */}
                `}
              >
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-white border border-slate-200 rounded-xl transition-all duration-500 group-hover:border-slate-300 group-hover:shadow-xl" />
                
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)'
                  }}
                />

                {/* Card Content */}
                <div 
                  // ADJUSTMENT 3: Reduced internal card padding
                  className={`relative p-6 sm:p-7 ${isWideCard ? 'lg:flex-1' : ''}`}
                >
                  
                  {/* Icon Container with Elevated Design */}
                  <div className="flex items-start gap-3 mb-4"> {/* Reduced margin */}
                    <div className="relative flex-shrink-0">
                      {/* Icon Background Circle */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-14 h-14 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center border border-blue-100 group-hover:border-blue-200 transition-colors duration-500"> {/* Reduced icon size/padding */}
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className={`pt-1 ${isRtl ? 'text-right' : ''}`}>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                        {strategy.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={isWideCard ? 'lg:flex-1' : ''}>
                    {strategy.type === 'list' && strategy.items ? (
                      <div className={`grid gap-2 ${isWideCard ? 'sm:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1'}`}> {/* Reduced gap */}
                        {strategy.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2 group/item">
                            <div className="relative flex-shrink-0 mt-0.5"> {/* Tighter margin */}
                              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center border border-blue-200 group-hover/item:border-blue-300 transition-colors duration-300">
                                <FiCheck className="w-3 h-3 text-blue-600 font-bold" />
                              </div>
                            </div>
                            <span className="text-xs text-slate-700 leading-tight font-medium"> {/* Tighter leading */}
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-slate-700 leading-snug font-light text-sm"> {/* Tighter leading */}
                          {strategy.description}
                        </p>
                        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Learn More
                          <FiArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA Section (Reduced vertical spacing) */}
        <div className="mt-12 lg:mt-16 p-6 sm:p-8 rounded-xl border border-slate-200 bg-gradient-to-r from-white via-blue-50/30 to-white backdrop-blur-sm hover:border-slate-300 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"> {/* Reduced gap */}
            <div className={isRtl ? 'text-right' : ''}>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Ready to amplify your event presence?</h4>
              <p className="text-sm text-slate-600">Let's create an impactful marketing strategy tailored to your goals.</p>
            </div>
            <button className="flex-shrink-0 px-6 sm:px-8 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}