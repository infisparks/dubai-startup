"use client"

import Link from "next/link"
import { Facebook, Linkedin, Twitter } from "lucide-react"

interface FooterProps {
  language?: "en" | "ar"
}

const translations = {
  en: {
    company: "Company",
    platform: "Platform",
    support: "Support",
    followUs: "Follow Us",
    about: "About",
    careers: "Careers",
    blog: "Blog",
    forInvestors: "For Investors",
    forStartups: "For Startups",
    press: "Press",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "© 2025 Investarise. All Rights Reserved.",
  },
  ar: {
    company: "الشركة",
    platform: "المنصة",
    support: "الدعم",
    followUs: "تابعنا",
    about: "حول",
    careers: "الوظائف",
    blog: "مدونة",
    forInvestors: "للمستثمرين",
    forStartups: "للشركات الناشئة",
    press: "صحافة",
    contact: "تواصل",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    copyright: "© 2025 Investarise. جميع الحقوق محفوظة.",
  },
}

export default function Footer({ language = "en" }: FooterProps) {
  const t = translations[language]

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="animate-slideInUp" style={{ animationDelay: "0ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#013371] to-[#024fa3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">I</span>
              </div>
              <span className="font-bold text-lg">Investarise</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering innovation by connecting visionary investors with transformative startups across the UAE.
            </p>
          </div>

          {/* Company Links */}
          <div className="animate-slideInUp" style={{ animationDelay: "100ms" }}>
            <h4 className="font-semibold text-white mb-4">{t.company}</h4>
            <ul className="space-y-2">
              {[
                { label: t.about, href: "#" },
                { label: t.careers, href: "#" },
                { label: t.blog, href: "#" },
                { label: t.press, href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#4A9FFF] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div className="animate-slideInUp" style={{ animationDelay: "200ms" }}>
            <h4 className="font-semibold text-white mb-4">{t.platform}</h4>
            <ul className="space-y-2">
              {[
                { label: t.forInvestors, href: "/investor-form" },
                { label: t.forStartups, href: "/founder-form" },
                { label: t.contact, href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 hover:text-[#4A9FFF] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="animate-slideInUp" style={{ animationDelay: "300ms" }}>
            <h4 className="font-semibold text-white mb-4">{t.followUs}</h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800 hover:bg-[#013371] rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>{t.copyright}</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-[#4A9FFF] transition-colors">
                {t.privacy}
              </Link>
              <Link href="#" className="hover:text-[#4A9FFF] transition-colors">
                {t.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
