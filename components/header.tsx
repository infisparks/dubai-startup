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

const translations = {
  en: {
    home: "Home",
    about: "About",
    investors: "Investors",
    agenda: "Agenda 2026",
    startup: "Startups",
    register: "Register",
    logout: "Logout",
  },
  ar: {
    home: "الرئيسية",
    about: "حول",
    investors: "المستثمرون",
    agenda: "أجندة 2026",
    startup: "للشركات الناشئة",
    register: "التسجيل",
    logout: "تسجيل الخروج",
  },
}

// Define the navigation items
// 'home' and 'about' will use anchor links (/#...)
// 'startup' will use a page link (/startup)
const navItems: { key: keyof typeof translations.en; href: string }[] = [
  { key: "home", href: "/#home" },
  { key: "about", href: "/#about" },
  { key: "agenda", href: "/agenda-2026" },
  { key: "investors", href: "/investors" },
  { key: "startup", href: "/startups" },
]

export default function Header({ language = "en", setLanguage, userEmail }: HeaderProps) {
  const pathname = usePathname()
  const isHomepage = pathname === "/"

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // 💡 CHANGE: Used the correct key name 'startup' in the generic type assertion
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
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${effectiveScrolled
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

          {/* Desktop Navigation - Updated */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                // 💡 FIX: Accessing the translation object with the correct key
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${baseStyle}`}
              >
                {t[item.key]}
              </Link>
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
              className={`hidden sm:flex px-4 py-2 rounded-lg font-medium text-sm shadow-md transition-colors ${effectiveScrolled
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

        {/* Mobile Dropdown Menu - Updated */}
        {mobileMenuOpen && (
          <nav
            className={`lg:hidden pb-4 space-y-2 animate-slideInDown ${effectiveScrolled
                ? "bg-white/95 border-t border-slate-200"
                : "bg-black/50 backdrop-blur-md"
              } rounded-b-xl`}
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`block px-4 py-2 rounded-lg font-medium text-sm ${baseStyle}`}
                onClick={() => setMobileMenuOpen(false)} // Close menu on click
              >
                {t[item.key]}
              </Link>
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
                className={`block px-4 py-2 rounded-lg text-center font-medium text-sm ${effectiveScrolled
                    ? "bg-[#013371] text-white hover:bg-[#024fa3]"
                    : "bg-white text-[#013371] hover:bg-[#013371] hover:text-white"
                  }`}
                onClick={() => setMobileMenuOpen(false)} // Close menu on click
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