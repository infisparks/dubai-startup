import { MapPin, Calendar } from "lucide-react" // Optional: using icons
import Image from "next/image"

// 🔹 NOTE: If you don't use icons, you can delete the import above
// and the <MapPin> / <Calendar> components below.

interface HeroProps {
  language: "en" | "ar"
}

const translations = {
  en: {
    headline: "Investarise Global Investors",
    headline2: "Summit 2026",
    tagline: "PITCH. CONNECT. PROSPER.",
    statsInvestors: "100+ Investors",
    statsStartups: "250+ Startups and SME's",
    statsSpeakers: "20+ Speakers",
  },
  ar: {
    headline: "قمة إنفسترايز العالمية للاستثمار",
    headline2: "2026",
    tagline: "اعرض. تواصل. ازدهر.",
    statsInvestors: "100+ مستثمر",
    statsStartups: "250+ شركة ناشئة والشركات الصغيرة والمتوسطة",
    statsSpeakers: "20+ متحدثين",
  },
}

export default function Hero({ language }: HeroProps) {
  const t = translations[language]

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-black"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="relative w-full h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://infisparks.github.io/images/investa.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Professional Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-6xl">
            {/* Main Headline - Modern & Refined */}
            <div className="mb-6 sm:mb-8 animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-tight">
                {t.headline}
                <br />
                <span className="bg-gradient-to-r from-[#1e7fc1] to-[#5da3d5] bg-clip-text text-transparent">
                  {t.headline2}
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#7db9e8] uppercase tracking-[0.2em] mt-3">
                {t.tagline}
              </p>
            </div>

            {/* Removed Event Details as event is completed */}


            {/* Stats - Inline without cards, centered */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white">{t.statsInvestors.split(' ')[0]}</span>
                <span className="text-xs sm:text-sm text-[#7db9e8] font-medium">{t.statsInvestors.split(' ').slice(1).join(' ')}</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white">{t.statsStartups.split(' ')[0]}</span>
                <span className="text-xs sm:text-sm text-[#7db9e8] font-medium">{t.statsStartups.split(' ').slice(1).join(' ')}</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white">{t.statsSpeakers.split(' ')[0]}</span>
                <span className="text-xs sm:text-sm text-[#7db9e8] font-medium">{t.statsSpeakers.split(' ').slice(1).join(' ')}</span>
              </div>
            </div>

            {/* CTA Buttons - One row on all devices, centered */}
            <div className="flex flex-row items-center justify-center gap-3 animate-fade-in-up animation-delay-600 px-2">
              <a
                href="/registration"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-[#1e7fc1] to-[#5da3d5] text-white font-semibold rounded-lg hover:from-[#1a6fa8] hover:to-[#4a92c2] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-[13px] sm:text-base whitespace-nowrap"
              >
                Register Now
              </a>
              <a
                href="#about"
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 text-[13px] sm:text-base whitespace-nowrap"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>

      {/* Hidden content placeholder removed */}
    </section>
  )
}
