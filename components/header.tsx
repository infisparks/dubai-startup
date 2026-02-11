"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu, X, LogOut, User as UserIcon, MapPin, Mail,
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  ChevronDown, LogIn, UserPlus, Globe, Sparkles
} from "lucide-react"
import { supabase } from "@/lib/supabaseConfig"
import { motion, AnimatePresence } from "framer-motion"

interface HeaderProps {
  language: "en" | "ar"
  setLanguage: (lang: "en" | "ar") => void
  userEmail?: string | null;
}

const translations = {
  en: {
    address: "Dubai, United Arab Emirates",
    email: "info@investariseglobal.com",
    home: "Home",
    about: "About",
    pastSpeakers: "Past Speakers",
    gallery: "Gallery",
    events: "Events",
    dubaiFeb2026: "Dubai Feb 2026",
    investors: "Investors",
    awards: "Awards",
    podcast: "Podcast",
    speakers: "Speakers",
    register: "Register",
    login: "Login",
    logout: "Logout",
    cta: "Join Summit 2026",
  },
  ar: {
    address: "دبي، الإمارات العربية المتحدة",
    email: "info@investariseglobal.com",
    home: "الرئيسية",
    about: "حول",
    pastSpeakers: "المتحدثون السابقون",
    gallery: "المعرض",
    events: "الفعاليات",
    dubaiFeb2026: "دبي فبراير 2026",
    investors: "المستثمرون",
    awards: "الجوائز",
    podcast: "البودكاست",
    speakers: "المتحدثون",
    register: "التسجيل",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    cta: "انضم للقمة 2026",
  },
}

export default function Header({ language = "en", setLanguage, userEmail }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)

  const t = translations[language]
  const isRtl = language === "ar"

  // Brand Color
  const brandBlue = "#034FA3"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout Error:", error)
    }
  }

  const navItems = [
    { key: "home", href: "/#home" },
    { key: "about", href: "/#about" },
    {
      key: "events",
      dropdown: {
        title: "dubaiFeb2026",
        items: [
          { key: "investors", href: "/investors" },
          { key: "awards", href: "/awards" },
          { key: "podcast", href: "/podcast" },
          { key: "speakers", href: "/past-speakers" },
          { key: "gallery", href: "/gallery" },
        ]
      }
    },
  ]

  const isHomePage = pathname === "/"

  return (
    <header
      className="w-full fixed top-0 z-50 pointer-events-none"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="pointer-events-auto">
        {/* Top Info Bar - Animated Hide on Scroll */}
        <AnimatePresence mode="wait">
          {((isHomePage && !scrolled) || (!isHomePage)) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`hidden lg:block border-b overflow-hidden ${isHomePage && !scrolled ? 'bg-black text-white/90 border-white/10' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
            >
              <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-[12px] font-medium">
                <div className="flex items-center gap-6">
                  <div className={`flex items-center gap-2 group cursor-pointer transition-colors ${isHomePage && !scrolled ? 'hover:text-white' : 'hover:text-[#034FA3]'}`}>
                    <MapPin size={12} className="text-[#034FA3]" />
                    <span className="tracking-tight">{t.address}</span>
                  </div>
                  <div className={`w-px h-3 ${isHomePage && !scrolled ? 'bg-white/10' : 'bg-slate-200'}`} />
                  <div className={`flex items-center gap-2 group cursor-pointer transition-colors ${isHomePage && !scrolled ? 'hover:text-white' : 'hover:text-[#034FA3]'}`}>
                    <Mail size={12} className="text-[#034FA3]" />
                    <span className="tracking-tight">{t.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className={`flex items-center gap-4 border-r pr-6 mr-1 ${isHomePage && !scrolled ? 'border-white/10' : 'border-slate-200'}`}>
                    {[
                      { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61585203620830&mibextid=ZbWKwL" },
                      { Icon: Instagram, href: "https://www.instagram.com/investariseglobal?igsh=dTFzdTY5cXlrN3hi" },
                      { Icon: Youtube, href: "https://www.youtube.com/@InvestariseGlobal" }
                    ].map(({ Icon, href }, idx) => (
                      <Link key={idx} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[#034FA3] transition-all hover:scale-110">
                        <Icon size={13} />
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                    className="flex items-center gap-1.5 hover:text-[#034FA3] transition-colors"
                  >
                    <Globe size={13} />
                    <span>{language === "en" ? "العربية" : "English"}</span>
                  </button>
                  <div className="flex items-center gap-4 ml-2">
                    {userEmail ? (
                      <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
                        <LogOut size={13} />
                        <span>{t.logout}</span>
                      </button>
                    ) : (
                      <>
                        <Link href="/login" className={`transition-colors ${isHomePage && !scrolled ? 'hover:text-white' : 'hover:text-slate-900'}`}>{t.login}</Link>
                        <Link href="/registration" className="bg-[#034FA3]/20 text-[#034FA3] hover:bg-[#034FA3] hover:text-white px-3 py-1 rounded-md transition-all font-bold">
                          {t.register}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Header Container */}
        <motion.div
          animate={{
            marginTop: (scrolled || !isHomePage) ? "0px" : "8px"
          }}
          className={`transition-all duration-500 w-full relative flex justify-center px-4 sm:px-6`}
        >
          <div
            className={`w-full max-w-7xl flex items-center justify-between transition-all duration-500 overflow-visible ${(scrolled || !isHomePage)
              ? 'bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-b-2xl border border-white/20 border-t-0'
              : 'bg-transparent rounded-2xl lg:rounded-[2.5rem]'
              }`}
          >

            {/* Logo Section */}
            <Link
              href="/"
              className={`flex items-center justify-center group relative transition-all duration-500 ${(scrolled || !isHomePage) ? 'px-4 py-2 lg:px-6' : 'px-6 py-4 lg:px-8'
                }`}
            >
              <Image
                src={(scrolled || !isHomePage) ? "/logo.png" : "/logo-white.png"}
                alt="Investarise"
                width={200}
                height={60}
                className={`w-auto object-contain drop-shadow-lg transition-all duration-500 relative z-10 ${(scrolled || !isHomePage) ? 'h-6 lg:h-7' : 'h-10 lg:h-12'
                  }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10 px-8">
              {navItems.map((item, idx) => (
                <div
                  key={item.key}
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative group"
                >
                  {item.dropdown ? (
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className={`px-2 py-1.5 text-[14px] font-bold transition-all relative flex items-center gap-2 ${(scrolled || !isHomePage) ? (item.key === 'events' ? 'text-[#034FA3]' : 'text-[#021024] hover:text-[#034FA3]') : 'text-white hover:text-white/80'
                        }`}>
                        {t[item.key as keyof typeof t]}
                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.key ? 'rotate-180' : ''}`} />
                        {item.key === 'events' && (scrolled || !isHomePage) && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-2 h-2 bg-[#034FA3] rounded-full border-2 border-white shadow-sm"
                          />
                        )}
                      </span>
                      <AnimatePresence>
                        {activeDropdown === item.key && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            className="absolute top-full left-0 w-64 pt-2 z-50 text-slate-900"
                          >
                            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                              <div className="p-4 bg-slate-50 border-b border-slate-100">
                                <span className="text-[11px] font-black uppercase tracking-widest text-[#034FA3] opacity-60">
                                  {t[item.dropdown.title as keyof typeof t]}
                                </span>
                              </div>
                              <div className="p-2">
                                {item.dropdown.items.map((subItem) => (
                                  <Link
                                    key={subItem.key}
                                    href={subItem.href}
                                    className="flex items-center gap-3 p-3 text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-[#034FA3] rounded-xl transition-all"
                                  >
                                    {t[subItem.key as keyof typeof t]}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className={`px-2 py-1.5 text-[14px] font-bold transition-all relative flex items-center gap-2 ${(scrolled || !isHomePage) ? 'text-[#021024] hover:text-[#034FA3]' : 'text-white hover:text-white/80'
                        }`}
                    >
                      <span className="relative z-10">{t[item.key as keyof typeof t]}</span>
                      <span className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${(scrolled || !isHomePage) ? 'bg-[#034FA3]' : 'bg-white'
                        }`} />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className={`flex items-center transition-all duration-500 ${scrolled ? 'gap-4 px-3' : 'gap-8 px-5'
              }`}>
              {/* Desktop Language Switcher */}
              <button
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className={`hidden md:flex items-center gap-2 text-[13px] font-bold transition-colors ${scrolled ? 'text-slate-600 hover:text-[#034FA3]' : 'text-white hover:text-white/80'
                  }`}
              >
                <Globe size={14} />
                <span>{language === "en" ? "العربية" : "English"}</span>
              </button>
              <Link
                href="/registration"
                className={`hidden md:flex items-center gap-2 font-black rounded-lg transition-all transform hover:-translate-y-0.5 active:scale-95 group shadow-sm ${scrolled
                  ? 'bg-[#034FA3] text-white px-3 py-1.5 text-[11px] hover:shadow-[0_0_20px_rgba(3,79,163,0.5)]'
                  : 'bg-white text-[#034FA3] px-5 py-2 text-[12px] hover:bg-white/90 shadow-lg shadow-white/10'
                  }`}
              >
                <span>{t.register}</span>
                <ChevronDown size={11} className="-rotate-90 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className={`lg:hidden rounded-lg bg-slate-50 text-slate-800 hover:bg-slate-100 shadow-sm border border-slate-200 transition-all ${scrolled ? 'p-1.5' : 'p-2'
                  }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Slide-out Menu - Modern & High Impact */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] pointer-events-auto"
            />
            <motion.div
              initial={{ x: isRtl ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed top-0 bottom-0 ${isRtl ? "left-0" : "right-0"} w-full max-w-[340px] bg-slate-50 z-[70] shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto border-l border-white/20`}
            >
              {/* Sidebar Header */}
              <div className="p-8 flex justify-between items-center border-b border-slate-200 bg-white">
                <div className="bg-[#034FA3] p-2.5 rounded-xl shadow-lg">
                  <Image src="/logo-white.png" alt="Investarise" width={110} height={32} className="h-6 w-auto" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all border border-slate-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links - Refined Font Size */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-1">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.key ? null : item.key)}
                            className="flex items-center justify-between w-full p-4 px-5 text-sm font-bold text-slate-600 hover:bg-white hover:text-[#034FA3] hover:shadow-sm rounded-xl transition-all group"
                          >
                            <span className="tracking-tight">{t[item.key as keyof typeof t]}</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${mobileDropdownOpen === item.key ? 'rotate-180' : '-rotate-90'}`} />
                          </button>
                          <AnimatePresence>
                            {mobileDropdownOpen === item.key && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-white/50 rounded-xl mt-1 mb-2 border border-slate-100"
                              >
                                <div className="p-3 px-5 bg-slate-50 border-b border-slate-100">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-[#034FA3] opacity-60">
                                    {t[item.dropdown.title as keyof typeof t]}
                                  </span>
                                </div>
                                <div className="p-2 space-y-1">
                                  {item.dropdown.items.map((subItem) => (
                                    <Link
                                      key={subItem.key}
                                      href={subItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block p-3 px-4 text-xs font-bold text-slate-500 hover:text-[#034FA3] transition-all"
                                    >
                                      {t[subItem.key as keyof typeof t]}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href || '#'}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-4 px-5 text-sm font-bold text-slate-600 hover:bg-white hover:text-[#034FA3] hover:shadow-sm rounded-xl transition-all group"
                        >
                          <span className="tracking-tight">{t[item.key as keyof typeof t]}</span>
                          <ChevronDown size={14} className="-rotate-90 text-slate-300 group-hover:text-[#034FA3] transition-transform" />
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-8 bg-white border-t border-slate-200 space-y-4">
                <Link
                  href="/registration"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-[#034FA3] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/10 active:scale-95 transition-all hover:bg-black"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  <span>{t.cta}</span>
                </Link>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <Link href="/login" className="py-3.5 text-[11px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">{t.login}</Link>
                  <button
                    onClick={() => {
                      setLanguage(language === "en" ? "ar" : "en")
                      setMobileMenuOpen(false)
                    }}
                    className="py-3.5 text-[11px] font-black uppercase tracking-wider border border-blue-100 text-[#034FA3] bg-blue-50/50 rounded-xl"
                  >
                    {language === "en" ? "العربية" : "English"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
