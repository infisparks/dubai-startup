"use client"

import { CheckCircle2, TrendingUp, Lock, BarChart3, ArrowRight } from "lucide-react"
import { useState } from "react"

interface InvestorBenefitsProps {
  language: "en" | "ar"
}

const PRIMARY_COLOR = "#2a3486"

const translations = {
  en: {
    title: "Investor Benefits",
    subtitle: "Why investors trust Investarise for their financial growth",
    benefits: [
      { 
        icon: CheckCircle2, 
        title: "Verified Deals", 
        desc: "Every startup undergoes rigorous verification process",
        color: "#10b981",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
      },
      { 
        icon: Lock, 
        title: "Transparent Returns", 
        desc: "Clear insights into portfolio performance metrics",
        color: "#f59e0b",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop"
      },
      { 
        icon: BarChart3, 
        title: "Smart Analytics", 
        desc: "Advanced tools to track and analyze investments",
        color: "#3b82f6",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop"
      },
    ],
    portfolio: "Build Your Investment Portfolio",
    portfolioDesc: "Access exclusive investment opportunities in Dubai's fastest-growing startups. Our platform connects you with vetted founders and promising ventures.",
    cta: "Get Started Today",
    partnership: "Strategic Partnership & Trust"
  },
  ar: {
    title: "فوائد المستثمر",
    subtitle: "لماذا يثق المستثمرون في Investarise لنموهم المالي",
    benefits: [
      { 
        icon: CheckCircle2, 
        title: "صفقات موثوقة", 
        desc: "تخضع كل شركة ناشئة لعملية تحقق صارمة",
        color: "#10b981",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
      },
      { 
        icon: Lock, 
        title: "عوائد شفافة", 
        desc: "رؤى واضحة لمقاييس أداء المحفظة",
        color: "#f59e0b",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop"
      },
      { 
        icon: BarChart3, 
        title: "تحليلات ذكية", 
        desc: "أدوات متقدمة لتتبع وتحليل الاستثمارات",
        color: "#3b82f6",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop"
      },
    ],
    portfolio: "بناء محفظة الاستثمار الخاصة بك",
    portfolioDesc: "الوصول إلى فرص استثمارية حصرية في أسرع الشركات الناشئة نمواً في دبي",
    cta: "ابدأ اليوم",
    partnership: "الشراكة الاستراتيجية والثقة"
  },
}

export default function InvestorBenefits({ language }: InvestorBenefitsProps) {
  const t = translations[language]
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)

  return (
    <section id="investors" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/30 to-white">
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
              {language === "en" ? "Why Investarise" : "لماذا Investarise"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {t.benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            const isHovered = hoveredBenefit === idx

            return (
              <div
                key={idx}
                className="group"
                onMouseEnter={() => setHoveredBenefit(idx)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div
                  className="relative h-full bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-slate-200 transition-all duration-500 overflow-hidden"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    borderColor: isHovered ? `${PRIMARY_COLOR}30` : '#e2e8f0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 16px 32px ${PRIMARY_COLOR}15`
                    e.currentTarget.style.transform = 'translateY(-6px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Background Image */}
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay Gradient */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)), linear-gradient(135deg, ${benefit.color}15, transparent)`,
                    }}
                  />

                  {/* Background Accent */}
                  <div 
                    className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: benefit.color }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Icon */}
                    <div className="inline-flex w-fit">
                      <div 
                        className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          backgroundColor: `${benefit.color}15`,
                          border: `2px solid ${benefit.color}30`
                        }}
                      >
                        <Icon 
                          className="w-6 sm:w-7 h-6 sm:h-7"
                          style={{ color: benefit.color }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-slate-900 transition-colors">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed group-hover:text-slate-700 transition-colors">
                      {benefit.desc}
                    </p>

                    {/* Bottom Accent */}
                    <div 
                      className="mt-2 h-0.5 w-0 group-hover:w-10 transition-all duration-500 rounded-full"
                      style={{ backgroundColor: benefit.color }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Portfolio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Visual Card */}
          <div className="order-2 lg:order-1">
            <div 
              className="group relative rounded-2xl overflow-hidden h-72 sm:h-80 lg:h-96 bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-10 flex items-center justify-center border border-slate-700/50 hover:border-slate-600 transition-all duration-500"
              style={{
                boxShadow: `0 20px 40px ${PRIMARY_COLOR}15`
              }}
            >
              {/* Background Image for Strategic Partnership */}
              <img 
                src="/h.png" 
                alt={t.partnership}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" // Removed opacity-70 and added hover scale
              />

              {/* Removed Overlay Gradient div */}

              {/* Gradient Orb */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: PRIMARY_COLOR }}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  🚀
                </div>
                <p className="text-white/90 font-semibold text-lg sm:text-xl">
                  {t.partnership}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              {t.portfolio}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
              {t.portfolioDesc}
            </p>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4 mb-8">
              {[
                language === "en" ? "Curated investment opportunities" : "فرص استثمارية مختارة",
                language === "en" ? "Expert due diligence support" : "دعم العناية الواجبة من الخبراء",
                language === "en" ? "Real-time portfolio tracking" : "تتبع المحفظة في الوقت الفعلي"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-slate-700 text-sm sm:text-base font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              className="group/btn inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_COLOR}dd)`,
                boxShadow: `0 8px 24px ${PRIMARY_COLOR}25`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 32px ${PRIMARY_COLOR}35`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 24px ${PRIMARY_COLOR}25`
              }}
            >
              {t.cta}
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}