// components/header.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation" 
import { Menu, X, LogOut, User as UserIcon } from "lucide-react"
import { supabase } from "@/lib/supabaseConfig" // Assuming you use /lib/supabaseConfig

interface HeaderProps {
  language: "en" | "ar" // Made required for translations
  setLanguage: (lang: "en" | "ar") => void // Made required
  userEmail?: string | null; 
}

// ⭐ FIX: Updated translations
const translations = {
  en: {
    home: "Home",
    about: "About",
    investors: "For Investors",
    startups: "For Startups",
    contact: "Contact",
    register: "Register", // ADDED
    logout: "Logout",
  },
  ar: {
    home: "الرئيسية",
    about: "حول",
    investors: "ل للمستثمرين",
    startups: "للشركات الناشئة",
    contact: "تواصل",
    register: "التسجيل", // ADDED
    logout: "تسجيل الخروج",
  },
}

export default function Header({ language = "en", setLanguage, userEmail }: HeaderProps) {
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = translations[language]

  const effectiveScrolled = scrolled || !isHomepage

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout Error:", error)
      alert("Error logging out. Please try again.")
    }
  }

  // Detect scroll position to change header background
  useEffect(() => {
    if (!isHomepage) {
      setScrolled(true) 
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
  }, [isHomepage]) 

  const baseStyle = effectiveScrolled
    ? "text-slate-700 hover:text-[#013371] hover:bg-slate-50"
    : "text-white hover:text-blue-200"
  
  const iconColor = effectiveScrolled 
    ? "text-slate-700 hover:bg-slate-100" 
    : "text-white hover:bg-white/10"

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        effectiveScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-52 h-10">
              <Image
                src={effectiveScrolled ? "/logo.png" : "/logo-white.png"}
                alt="Investarise Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {["home", "about", "contact"].map((key) => (
              <a
                key={key}
                href={`/#${key}`}
                className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${baseStyle}`}
              >
                {t[key as keyof typeof t]}
              </a>
            ))}
          </nav>

          {/* CTA + Language + Auth/Mobile Menu */}
          <div className="flex items-center gap-3">
            
            {/* User Info & Logout */}
            {userEmail && (
              <div className="hidden md:flex items-center space-x-3 border-r border-slate-200 pr-3">
                <span className={`text-sm font-medium flex items-center gap-1 ${effectiveScrolled ? 'text-slate-600' : 'text-white'}`}>
                  <UserIcon className="w-4 h-4" /> {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.logout}</span>
                </button>
              </div>
            )}
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${baseStyle}`}
            >
              {language === "en" ? "العربية" : "EN"}
            </button>
            
            {/* ⭐ FIX: Combined Registration Button */}
            <Link
              href="/registration"
              className={`hidden sm:flex px-4 py-2 rounded-lg font-medium text-sm shadow-md transition-colors ${
                effectiveScrolled
                  ? "bg-[#013371] text-white hover:bg-[#024fa3]"
                  : "bg-white text-[#013371] hover:bg-[#013371] hover:text-white"
              }`}
            >
              {t.register}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${iconColor}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            className={`lg:hidden pb-4 space-y-2 animate-slideInDown ${
              effectiveScrolled
                ? "bg-white/95 border-t border-slate-200"
                : "bg-black/50 backdrop-blur-md"
            } rounded-b-xl`}
          >
            {["home", "about", "contact"].map((key) => (
              <a
                key={key}
                href={`/#${key}`}
                className={`block px-4 py-2 rounded-lg font-medium text-sm ${baseStyle}`}
              >
                {t[key as keyof typeof t]}
              </a>
            ))}

            <div className="pt-2 border-t border-slate-200 space-y-2">
              {userEmail && (
                <div className="flex justify-between items-center px-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-700">
                    <span className="flex items-center gap-1 font-medium">
                        <UserIcon className="w-4 h-4" /> {userEmail}
                    </span>
                    <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-semibold">
                        {t.logout}
                    </button>
                </div>
              )}
              
              {/* ⭐ FIX: Combined Registration Button for Mobile */}
              <Link
                href="/registration"
                className={`block px-4 py-2 rounded-lg text-center font-medium text-sm ${
                  effectiveScrolled
                    ? "bg-[#013371] text-white hover:bg-[#024fa3]"
                    : "bg-white text-[#013371] hover:bg-[#013371] hover:text-white"
                }`}
              >
                {t.register}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}