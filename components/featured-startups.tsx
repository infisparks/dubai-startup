"use client"

import { useState } from "react"
import { Zap, Leaf, CreditCard, Stethoscope, ShoppingCart, Cloud } from "lucide-react"

interface FeaturedStartupsProps {
  language: "en" | "ar"
}

const PRIMARY_COLOR = "#2a3486"

const translations = {
  en: {
    title: "Featured Startups",
    subtitle: "Discover innovative companies shaping the future of investment",
    startups: [
      { 
        name: "TechVenture", 
        sector: "AI & Machine Learning", 
        desc: "Revolutionary AI solutions for enterprise automation",
        image: "/Startup/1.png",
        icon: Zap
      },
      { 
        name: "EcoFlow", 
        sector: "Green Energy", 
        desc: "Sustainable energy infrastructure solutions",
        image: "/Startup/2.png",
        icon: Leaf
      },
      { 
        name: "FinTech Pro", 
        sector: "Financial Tech", 
        desc: "Next-generation payment processing",
        image: "/Startup/3.png",
        icon: CreditCard
      },
      { 
        name: "HealthHub", 
        sector: "Healthcare", 
        desc: "Digital health platform for MENA region",
        image: "/Startup/4.png",
        icon: Stethoscope
      },
      { 
        name: "RetailAI", 
        sector: "E-Commerce", 
        desc: "Smart retail analytics platform",
        image: "/Startup/1.png",
        icon: ShoppingCart
      },
      { 
        name: "CloudSync", 
        sector: "Cloud Computing", 
        desc: "Enterprise cloud solutions",
        image: "/Startup/6.png",
        icon: Cloud
      },
    ],
  },
  ar: {
    title: "الشركات الناشئة المميزة",
    subtitle: "اكتشف الشركات المبتكرة التي تشكل مستقبل الاستثمار",
    startups: [
      { 
        name: "TechVenture", 
        sector: "الذكاء الاصطناعي", 
        desc: "حلول AI ثورية لأتمتة المؤسسات",
        image: "/Startup/1.png",
        icon: Zap
      },
      { 
        name: "EcoFlow", 
        sector: "الطاقة الخضراء", 
        desc: "حلول البنية التحتية للطاقة المستدامة",
        image: "/Startup/2.png",
        icon: Leaf
      },
      { 
        name: "FinTech Pro", 
        sector: "التكنولوجيا المالية", 
        desc: "معالجة الدفع من الجيل التالي",
        image: "/Startup/3.png",
        icon: CreditCard
      },
      { 
        name: "HealthHub", 
        sector: "الرعاية الصحية", 
        desc: "منصة الصحة الرقمية لمنطقة الشرق الأوسط",
        image: "/Startup/4.png",
        icon: Stethoscope
      },
      { 
        name: "RetailAI", 
        sector: "التجارة الإلكترونية", 
        desc: "منصة تحليلات البيع بالتجزئة الذكية",
        image: "/Startup/1.png",
        icon: ShoppingCart
      },
      { 
        name: "CloudSync", 
        sector: "الحوسبة السحابية", 
        desc: "حلول السحابة للمؤسسات",
        image: "/Startup/6.png",
        icon: Cloud
      },
    ],
  },
}

export default function FeaturedStartups({ language }: FeaturedStartupsProps) {
  const t = translations[language]
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="startups"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/50 to-white"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span
              className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all"
              style={{
                backgroundColor: `${PRIMARY_COLOR}15`,
                color: PRIMARY_COLOR,
                borderColor: `${PRIMARY_COLOR}30`,
              }}
            >
              {language === "en" ? "Our Ecosystem" : "نظامنا البيئي"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {t.startups.map((startup, idx) => {
            const Icon = startup.icon
            const isHovered = hoveredIndex === idx

            return (
              <div
                key={idx}
                className="transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="group relative h-64 sm:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                  style={{
                    boxShadow: isHovered
                      ? `0 25px 50px ${PRIMARY_COLOR}20`
                      : "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={startup.image}
                    alt={startup.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/80 transition-all duration-500"
                  />

                  {/* Icon Badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                    <div
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-white shadow-md group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: `0 4px 16px ${PRIMARY_COLOR}30` }}
                    >
                      <Icon
                        className="w-5 sm:w-6 h-5 sm:h-6"
                        style={{ color: PRIMARY_COLOR }}
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 z-20">
                    <div className="mb-2 sm:mb-3">
                      <span
                        className="inline-block px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold backdrop-blur-sm border border-white/30 text-white bg-white/15"
                      >
                        {startup.sector}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:translate-y-0.5 transition-all">
                      {startup.name}
                    </h3>

                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-2 group-hover:text-white transition-colors">
                      {startup.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
