import Link from "next/link"

interface HeroProps {
  language: "en" | "ar"
}

const translations = {
  en: {
    headline: "Invest in Tomorrow's Dubai — Today.",
    subheading:
      "Investarise connects investors with the most promising startups shaping the future of Dubai.",
    exploreStartups: "Explore Startups",
    becomeInvestor: "Become an Investor",
  },
  ar: {
    headline: "استثمر في غد دبي — اليوم.",
    subheading:
      "يربط Investarise المستثمرين بأواعد أكثر الشركات الناشئة التي تشكل مستقبل دبي.",
    exploreStartups: "استكشف الشركات",
    becomeInvestor: "كن مستثمراً",
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
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🔹 Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/20"></div>

      {/* 🔹 Hero Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto text-white px-2">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6 backdrop-blur-md">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs sm:text-sm font-medium">
            {language === "en"
              ? "Now accepting Series A startups"
              : "نقبل الآن شركات السلسلة أ"}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          {t.headline}
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
          {t.subheading}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10">
          <Link
            href="/founder-form"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-[#013371] text-white rounded-full font-medium sm:font-semibold hover:bg-[#024fa3] transition-all hover:shadow-lg text-base sm:text-lg text-center"
          >
            {t.exploreStartups}
          </Link>
          <Link
            href="/investor-form"
            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full font-medium sm:font-semibold hover:bg-white/10 transition-all text-base sm:text-lg text-center"
          >
            {t.becomeInvestor}
          </Link>
        </div>

        {/* Decorative line */}
        <div className="h-0.5 sm:h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-[#013371] via-[#024fa3] to-[#013371] rounded-full opacity-80"></div>
      </div>

      {/* 🔹 Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-[#013371]/30 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-[#024fa3]/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
    </section>
  )
}
