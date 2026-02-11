import { Search, BarChart3, TrendingUp, Zap } from 'lucide-react'

interface HowItWorksProps {
  language: "en" | "ar"
}

const PRIMARY_COLOR = "#2a3486"

const translations = {
  en: {
    title: "How It Works",
    subtitle: "Simple, transparent, and powerful investment journey",
    steps: [
      { 
        num: "01", 
        title: "Discover", 
        desc: "Browse vetted startups in our platform",
        icon: Search
      },
      { 
        num: "02", 
        title: "Evaluate", 
        desc: "Review detailed metrics and performance",
        icon: BarChart3
      },
      { 
        num: "03", 
        title: "Invest", 
        desc: "Make informed investment decisions",
        icon: TrendingUp
      },
      { 
        num: "04", 
        title: "Grow", 
        desc: "Watch your portfolio grow with us",
        icon: Zap
      },
    ],
  },
  ar: {
    title: "كيف يعمل",
    subtitle: "رحلة استثمار بسيطة وشفافة وقوية",
    steps: [
      { 
        num: "01", 
        title: "اكتشف", 
        desc: "استعرض الشركات الناشئة المختارة",
        icon: Search
      },
      { 
        num: "02", 
        title: "قيّم", 
        desc: "راجع المقاييس المفصلة والأداء",
        icon: BarChart3
      },
      { 
        num: "03", 
        title: "استثمر", 
        desc: "اتخذ قرارات استثمارية مستنيرة",
        icon: TrendingUp
      },
      { 
        num: "04", 
        title: "نمو", 
        desc: "اراقب نمو محفظتك معنا",
        icon: Zap
      },
    ],
  },
}

export default function HowItWorks({ language }: HowItWorksProps) {
  const t = translations[language]

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block mb-3 sm:mb-4">
            <span 
              className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all"
              style={{
                backgroundColor: `${PRIMARY_COLOR}15`,
                color: PRIMARY_COLOR,
                borderColor: `${PRIMARY_COLOR}30`
              }}
            >
              {language === "en" ? "Process" : "العملية"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent" style={{
            top: '104px'
          }} />

          {/* Mobile Vertical Line */}
          <div className="lg:hidden absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.steps.map((step, idx) => {
              const Icon = step.icon
              const isEven = idx % 2 === 0
              
              return (
                <div key={idx} className="relative">
                  {/* Mobile Timeline Dot */}
                  <div className="lg:hidden absolute -left-11 sm:-left-12 top-8 w-4 h-4 rounded-full border-4 border-white"
                    style={{
                      backgroundColor: PRIMARY_COLOR,
                      boxShadow: `0 0 0 3px ${PRIMARY_COLOR}20`
                    }}
                  />

                  {/* Card Container */}
                  <div className="group h-full">
                    <div 
                      className="relative bg-white rounded-2xl p-5 sm:p-6 lg:p-7 border border-slate-200 hover:border-slate-300 transition-all duration-500 overflow-hidden flex flex-col"
                      style={{
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        transitionProperty: 'all'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 16px 32px ${PRIMARY_COLOR}12`
                        e.currentTarget.style.transform = 'translateY(-6px)'
                        e.currentTarget.style.borderColor = `${PRIMARY_COLOR}35`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.borderColor = '#e2e8f0'
                      }}
                    >
                      {/* Background Gradient Accent */}
                      <div 
                        className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-8 transition-opacity duration-500 pointer-events-none"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                      />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
                        {/* Top Row: Number + Icon */}
                        <div className="flex items-start gap-3 sm:gap-4">
                          {/* Number */}
                          <div 
                            className="inline-flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-lg text-base sm:text-lg font-bold text-white transition-all duration-500 group-hover:scale-105 flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_COLOR}dd)`,
                              boxShadow: `0 4px 12px ${PRIMARY_COLOR}25`
                            }}
                          >
                            {step.num}
                          </div>

                          {/* Icon */}
                          <div 
                            className="w-10 sm:w-11 h-10 sm:h-11 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-105 flex-shrink-0"
                            style={{
                              backgroundColor: `${PRIMARY_COLOR}10`,
                              border: `1.5px solid ${PRIMARY_COLOR}20`
                            }}
                          >
                            <Icon 
                              className="w-5 sm:w-6 h-5 sm:h-6 transition-all"
                              style={{ color: PRIMARY_COLOR }}
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 
                          className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-tight group-hover:text-slate-900 transition-colors"
                        >
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed group-hover:text-slate-700 transition-colors line-clamp-3">
                          {step.desc}
                        </p>

                        {/* Animated Bottom Border */}
                        <div 
                          className="mt-auto h-0.5 w-0 group-hover:w-8 transition-all duration-500 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${PRIMARY_COLOR}, ${PRIMARY_COLOR}00)`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Desktop Connecting Arrows */}
                  {idx < t.steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-16 items-center justify-center">
                      <div 
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{
                          backgroundColor: PRIMARY_COLOR,
                          boxShadow: `0 3px 10px ${PRIMARY_COLOR}35`
                        }}
                      >
                        →
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 text-center">
          <p className="text-slate-600 text-sm sm:text-base mb-6">
            {language === "en" 
              ? "Ready to start your investment journey?" 
              : "هل أنت مستعد لبدء رحلة استثمارك؟"}
          </p>
          <button 
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_COLOR}dd)`,
              boxShadow: `0 8px 24px ${PRIMARY_COLOR}30`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 12px 32px ${PRIMARY_COLOR}40`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 24px ${PRIMARY_COLOR}30`
            }}
          >
            {language === "en" ? "Get Started Now" : "ابدأ الآن"}
          </button>
        </div>
      </div>
    </section>
  )
}