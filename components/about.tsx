import { CheckCircle2, Eye, Globe2, Zap } from 'lucide-react'

interface AboutProps {
  language: "en" | "ar"
}

const translations = {
  en: {
    title: "About Investarise",
    description:
      "Investarise bridges visionary investors with groundbreaking startups, accelerating innovation across Dubai and beyond.",
    features: [
      { 
        title: "Verified Startups", 
        desc: "Rigorous due diligence on every opportunity",
        icon: CheckCircle2
      },
      { 
        title: "Transparency", 
        desc: "Full visibility into deal metrics and performance",
        icon: Eye
      },
      { 
        title: "Global Investors", 
        desc: "Network of international investment experts",
        icon: Globe2
      },
      { 
        title: "Smart Funding", 
        desc: "Intelligent matching and transparent returns",
        icon: Zap
      },
    ],
  },
  ar: {
    title: "عن Investarise",
    description:
      "يربط Investarise المستثمرين ذوي الرؤية بالشركات الناشئة الرائدة، مما يسرع الابتكار في دبي وما وراءها.",
    features: [
      { 
        title: "شركات موثقة", 
        desc: "فحص شامل لكل فرصة",
        icon: CheckCircle2
      },
      { 
        title: "شفافية", 
        desc: "رؤية كاملة لمقاييس الصفقات",
        icon: Eye
      },
      { 
        title: "مستثمرون عالميون", 
        desc: "شبكة من خبراء الاستثمار الدوليين",
        icon: Globe2
      },
      { 
        title: "تمويل ذكي", 
        desc: "مطابقة ذكية وعوائد شفافة",
        icon: Zap
      },
    ],
  },
}

export default function About({ language }: AboutProps) {
  const t = translations[language]

  return (
    <section id="about" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-sm font-semibold border border-blue-500/30">
              {language === "en" ? "Our Platform" : "منصتنا"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            {t.title}
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="group relative h-full"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl -z-10" />
                
                {/* Card */}
                <div className="relative h-full p-6 sm:p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300 backdrop-blur-xl hover:shadow-2xl hover:shadow-blue-500/10">
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all duration-300 border border-blue-500/30 group-hover:border-blue-400/50">
                      <Icon className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.desc}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-4 h-1 w-0 group-hover:w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}