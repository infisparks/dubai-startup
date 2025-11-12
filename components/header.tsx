"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
// 🔹 1. IMPORT usePathname
import { usePathname } from "next/navigation" 
import { Menu, X } from "lucide-react"

interface HeaderProps {
  language?: "en" | "ar"
  setLanguage?: (lang: "en" | "ar") => void
}

const translations = {
  en: {
    home: "Home",
    about: "About",
    investors: "For Investors",
    startups: "For Startups",
    contact: "Contact",
    investor: "Investor",
    founder: "Founder",
  },
  ar: {
    home: "الرئيسية",
    about: "حول",
    investors: "ل للمستثمرين",
    startups: "للشركات الناشئة",
    contact: "تواصل",
    investor: "مستثمر",
    founder: "مؤسس",
  },
}

export default function Header({ language = "en", setLanguage }: HeaderProps) {
  // 🔹 2. GET PATHNAME AND CHECK IF HOMEPAGE
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = translations[language]

  // 🔹 3. CREATE EFFECTIVE STATE
  // On homepage, this will be true/false based on scroll
  // On other pages, this will ALWAYS be true
  const effectiveScrolled = scrolled || !isHomepage

  // 🔹 Detect scroll position to change header background
  useEffect(() => {
    // Only add scroll listener if we are on the homepage
    if (!isHomepage) {
      setScrolled(true) // Set scrolled true permanently for other pages
      return
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomepage]) // Re-run effect if path changes

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        // 🔹 4. USE effectiveScrolled
        effectiveScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 🔹 Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-52 h-10">
              <Image
                // 🔹 4. USE effectiveScrolled
                src={effectiveScrolled ? "/logo.png" : "/logo-white.png"}
                alt="Investarise Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* 🔹 Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {["home", "about", "contact"].map((key) => (
              <a
                key={key}
                href={`/#${key}`}
                className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                  // 🔹 4. USE effectiveScrolled
                  effectiveScrolled
                    ? "text-slate-700 hover:text-[#013371] hover:bg-slate-50"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {t[key as keyof typeof t]}
              </a>
            ))}
          </nav>

          {/* 🔹 CTA + Language + Mobile Menu */}
          <div className="flex items-center gap-3">
            {setLanguage && (
              <button
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  // 🔹 4. USE effectiveScrolled
                  effectiveScrolled
                    ? "text-slate-700 hover:text-[#013371] hover:bg-slate-50"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {language === "en" ? "العربية" : "EN"}
              </button>
            )}

            <Link
              href="/investor-form"
              className={`hidden sm:flex px-4 py-2 rounded-lg font-medium text-sm shadow-md transition-colors ${
                // 🔹 4. USE effectiveScrolled
                effectiveScrolled
                  ? "bg-[#013371] text-white hover:bg-[#024fa3]"
                  : "bg-white text-[#013371] hover:bg-[#013371] hover:text-white"
              }`}
            >
              {t.investor}
            </Link>

            <Link
              href="/founder-form"
              className={`hidden sm:flex px-4 py-2 border-2 rounded-lg font-medium text-sm transition-colors ${
                // 🔹 4. USE effectiveScrolled
                effectiveScrolled
                  ? "border-[#013371] text-[#013371] hover:bg-[#013371] hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-[#013371]"
              }`}
            >
              {t.founder}
            </Link>

            {/* 🔹 Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                // 🔹 4. USE effectiveScrolled
                effectiveScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 🔹 Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            className={`lg:hidden pb-4 space-y-2 animate-slideInDown ${
              // 🔹 4. USE effectiveScrolled
              effectiveScrolled
                ? "bg-white/95 border-t border-slate-200"
                : "bg-black/50 backdrop-blur-md"
            } rounded-b-xl`}
          >
            {["home", "about", "contact"].map((key) => (
              <a
                key={key}
                href={`/#${key}`}
                className={`block px-4 py-2 rounded-lg font-medium text-sm ${
                  // 🔹 4. USE effectiveScrolled
                  effectiveScrolled
                    ? "text-slate-700 hover:text-[#013371] hover:bg-slate-50"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {t[key as keyof typeof t]}
              </a>
            ))}

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <Link
                href="/investor-form"
                className={`block px-4 py-2 rounded-lg text-center font-medium text-sm ${
                  // 🔹 4. USE effectiveScrolled
                  effectiveScrolled
                    ? "bg-[#013371] text-white hover:bg-[#024fa3]"
                    : "bg-white text-[#013371] hover:bg-[#013371] hover:text-white"
                }`}
              >
                {t.investor}
              </Link>
              <Link
                href="/founder-form"
                className={`block px-4 py-2 border-2 rounded-lg text-center font-medium text-sm ${
                  // 🔹 4. USE effectiveScrolled
                  effectiveScrolled
                    ? "border-[#013371] text-[#013371] hover:bg-[#013371] hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-[#013371]"
                }`}
              >
                {t.founder}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}