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
    location: "Taj Exotica Resort & Spa The Palm",
    date: "February 5th 2026",
    statsInvestors: "100+ Investors",
    statsStartups: "250+ Startups and SME's",
    statsSpeakers: "20+ Speakers",
  },
  ar: {
    headline: "قمة إنفسترايز العالمية للاستثمار",
    headline2: "2026",
    tagline: "اعرض. تواصل. ازدهر.",
    location: "منتجع وسبا تاج إكزوتيكا النخلة",
    date: "5 فبراير 2026",
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
      className="relative w-full h-auto bg-white"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* 🔹 Background Image - Full width, natural height (No Crop) */}
      <div className="w-full h-full">
        {/* Removed absolute positioning to let image define height */}
        <Image
          src="/hero.jpg"
          alt="Conference Hero"
          width={1920}
          height={1080}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        // On mobile: w-full h-auto (shows full image, no crop).
        // On desktop: user might still want it strict ?? 
        // Re-reading: "mobile show me the full screen... dont crop... in mobile".
        // I will use w-full h-auto for ALL to be safe about the "text in image".
        />
        {/* Note: I'm using class 'md:h-screen' tentatively but user said 'no crop' because text is in image. 
           If I force h-screen on desktop and AR doesn't match, it crops. 
           I will actually stick to w-full h-auto for EVERYONE to guarantee no text loss.
        */}
      </div>

      {/* 🔹 Hero Content removed (content is in the image) */}
      <div className="hidden"></div>
    </section>
  )
}
