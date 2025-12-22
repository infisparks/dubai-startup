'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

interface FooterProps {
  language?: 'en' | 'ar'
}

const translations = {
  en: {
    tagline: 'Where innovation meets capital',
    description: 'Join the Investors Global Investment Summit 2026 — a premier event for connecting visionary founders with high-net-worth investors and venture capital networks.',
    registerNow: 'Register Now',
    company: 'Company',
    platform: 'Platform',
    support: 'Support',
    followUs: 'Follow Us',
    getInTouch: 'Get In Touch',
    about: 'About',
    careers: 'Careers',
    blog: 'Blog',
    press: 'Press',
    forInvestors: 'For Investors',
    forStartups: 'For Startups',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© 2025 Investarise. All Rights Reserved.',
    email: 'Email Us',
    call: 'Call Us',
    visit: 'Visit Us',
    emailAddr: 'info@investariseglobal.com',
    phone: '+971 55 450 0978',
    website: 'www.investariseglobal.com',
  },
  ar: {
    tagline: 'حيث يلتقي الابتكار برأس المال',
    description: 'انضم إلى قمة إنفستارايز العالمية للاستثمار 2026 — حدث عالي المستوى لربط المؤسسين الرؤيويين مع المستثمرين ذوي الثروة العالية وشبكات رأس المال الاستثماري.',
    registerNow: 'سجل الآن',
    company: 'الشركة',
    platform: 'المنصة',
    support: 'الدعم',
    followUs: 'تابعنا',
    getInTouch: 'تواصل معنا',
    about: 'حول',
    careers: 'الوظائف',
    blog: 'مدونة',
    press: 'صحافة',
    forInvestors: 'للمستثمرين',
    forStartups: 'للشركات الناشئة',
    contact: 'تواصل',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    copyright: '© 2025 Investarise. جميع الحقوق محفوظة.',
    email: 'البريد الإلكتروني',
    call: 'اتصل بنا',
    visit: 'زيارة',
    emailAddr: 'info@investariseglobal.com',
    phone: '+971 55 450 0978',
    website: 'www.investariseglobal.com',
  },
}

export default function Footer({ language = 'en' }: FooterProps) {
  const router = useRouter()
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10">
        {/* Hero CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 lg:p-12 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {t.tagline}
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6 font-light">
                  {t.description}
                </p>
                <button
                  onClick={() => router.push('/registration')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>{t.registerNow}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right Contact Info */}
              <div className={`space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {[
                  { icon: Mail, label: t.email, value: t.emailAddr, href: `mailto:${t.emailAddr}` },
                  { icon: Phone, label: t.call, value: t.phone, href: `tel:${t.phone}` },
                  { icon: MapPin, label: t.visit, value: t.website, href: `https://${t.website}` },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group"
                    >
                      <Icon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1 group-hover:text-cyan-400 transition-colors" />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{item.label}</p>
                        <p className="text-sm text-white font-medium truncate group-hover:text-cyan-400 transition-colors">{item.value}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <span className="font-bold text-xl">Investarise</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Connecting visionary founders with global investment opportunities.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{t.company}</h4>
              <ul className="space-y-3">
                {[t.about, t.careers, t.blog, t.press].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{t.platform}</h4>
              <ul className="space-y-3">
                {[t.forInvestors, t.forStartups, t.contact].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{t.support}</h4>
              <ul className="space-y-3">
                {[t.contact, t.privacy, t.terms].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">{t.followUs}</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61585203620830&sk=about' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/investariseglobal/' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/investarise-global/?viewAsMember=true' },
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-slate-800/60 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 rounded-lg flex items-center justify-center transition-all duration-300 border border-slate-700/50 hover:border-transparent"
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800/50 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
              <p>{t.copyright}</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.privacy}
                </a>
                <div className="w-px bg-slate-800" />
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {t.terms}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}