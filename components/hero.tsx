import { MapPin, Calendar } from "lucide-react" // Optional: using icons

// 🔹 NOTE: If you don't use icons, you can delete the import above
// and the <MapPin> / <Calendar> components below.

interface HeroProps {
  language: "en" | "ar"
}

const translations = {
  en: {
    headline: "Investarise Global Investment",
    headline2: "Summit 2026",
    tagline: "PITCH. CONNECT. PROSPER.",
    location: "Taj Exotica Resort & Spa The Palm",
    date: "February 5th and 6th, 2026",
    statsInvestors: "100+ Investors",
    statsStartups: "200+ Startups",
    statsSpeakers: "10+ Speakers",
  },
  ar: {
    headline: "قمة إنفسترايز العالمية للاستثمار",
    headline2: "2026",
    tagline: "اعرض. تواصل. ازدهر.",
    location: "منتجع وسبا تاج إكزوتيكا النخلة",
    date: "5 و 6 فبراير 2026",
    statsInvestors: "100+ مستثمر",
    statsStartups: "200+ شركة ناشئة",
    statsSpeakers: "10+ متحدثين",
  },
}

export default function Hero({ language }: HeroProps) {
  const t = translations[language]

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-black"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* 🔹 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.jpg" // Optional: A poster image matching the video
      >
        {/* 🔹 Mobile video (shows on screens up to 767px wide) */}
        <source src="/hero1.mp4" type="video/mp4" media="(max-width: 767px)" />
        {/* 🔹 Desktop video (shows on screens 768px and wider) */}
        <source src="/hero1.mp4" type="video/mp4" media="(min-width: 768px)" />
        {/* 🔹 Fallback text */}
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/20"></div>

      {/* 🔹 Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto text-white px-2">
        {/* Headline */}
        <h1 className="text-xl sm:text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
          {t.headline}
          <br />
          {t.headline2}
        </h1>

        {/* Tagline Badge */}
        <div className="my-8 inline-block">
          <div className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#013371] to-[#024fa3] rounded-full shadow-lg">
            <span className="text-white text-sm sm:text-lg md:text-xl font-bold tracking-widest">
              {t.tagline}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm sm:text-base text-gray-200 my-10">
          <div className="flex items-center gap-2">
            {/* <MapPin size={18} className="text-gray-300" /> */}
            <span>📍</span>
            {/* Using emoji as a simple icon */}
            <span>{t.location}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* <Calendar size={18} className="text-gray-300" /> */}
            <span>🗓️</span>
            {/* Using emoji as a simple icon */}
            <span>{t.date}</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 text-sm sm:text-lg font-medium text-gray-100 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2">
          <span>{t.statsInvestors}</span>
          <span className="text-gray-500">•</span>
          <span>{t.statsStartups}</span>
          <span className="text-gray-500">•</span>
          <span>{t.statsSpeakers}</span>
        </div>
      </div>

      {/* 🔹 Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-[#013371]/30 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-[#024fa3]/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
    </section>
  )
}