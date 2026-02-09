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
    description: 'Join the Investarise Global Investors Summit 2026 — a premier event for connecting visionary founders with high-net-worth investors and venture capital networks.',
    registerNow: 'Register Now',
    company: 'Company',
    platform: 'Platform',
    support: 'Support',
    followUs: 'Follow Us',
    getInTouch: 'Get In Touch',
    about: 'About',
    vision: 'Vision',
    speakers: 'Speakers',
    sponsorship: 'Sponsorship',
    venue: 'Venue',
    forInvestors: 'For Investors',
    forStartups: 'For Startups',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© 2025 InfiSpark Technologies.  All Rights Reserved.',
    email: 'Email Us',
    call: 'Call Us',
    visit: 'Visit Us',
    emailAddr: 'info@investariseglobal.com',
    phone: '+971 55 472 1421 / +971 50 304 0901',
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
    vision: 'الرؤية',
    speakers: 'المتحدثون',
    sponsorship: 'الرعاية',
    venue: 'المكان',
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
    phone: '+971 55 472 1421 / +971 50 304 0901',
    website: 'www.investariseglobal.com',
  },
}

export default function Footer({ language = 'en' }: FooterProps) {
  const router = useRouter()
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <footer className="relative bg-[#034FA3] text-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Elements - Premium Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#034FA3] to-[#012a5c]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Orbs */}
        <div className="absolute -top-[400px] -right-[200px] w-[800px] h-[800px] bg-[#023c7a] rounded-full blur-[120px] opacity-60 mix-blend-multiply" />
        <div className="absolute -bottom-[400px] -left-[200px] w-[800px] h-[800px] bg-[#c4925f] rounded-full blur-[120px] opacity-20" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10">
        {/* Hero CTA Section - Glassmorphism */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] group hover:border-white/20 transition-all duration-500">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left Content */}
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#c4925f] animate-pulse" />
                  IGIS 2026
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-white">
                  {t.tagline}
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg font-light">
                  {t.description}
                </p>

                <button
                  onClick={() => router.push('/registration')}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#034FA3] hover:bg-[#c4925f] hover:text-white rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(196,146,95,0.5)] overflow-hidden"
                >
                  <span className="relative z-10 uppercase tracking-wider text-sm">{t.registerNow}</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right Contact Info */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: Mail, label: t.email, value: t.emailAddr, href: `mailto:${t.emailAddr}` },
                  { icon: Phone, label: t.call, value: t.phone, href: 'tel:+971554721421' },
                  { icon: MapPin, label: t.visit, value: t.website, href: `https://${t.website}` },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-5 p-5 rounded-2xl bg-black/20 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 group/item backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover/item:scale-110 group-hover/item:bg-[#c4925f] transition-all duration-300 shadow-inner">
                        <Icon className="w-6 h-6 text-[#c4925f] group-hover/item:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-1 opacity-70">{item.label}</p>
                        <p className="text-white text-lg font-semibold tracking-tight group-hover/item:text-[#c4925f] transition-colors">{item.value}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16 border-t border-white/10 pt-16">

            {/* Brand Section */}
            <div className="lg:col-span-2 pr-8">
              <div className="mb-8">
                <div className="relative w-48 h-16">
                  <img src="/logo-white.png" alt="Investarise" className="w-auto h-12 object-contain" />
                </div>
              </div>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-8 max-w-sm">
                Connecting the world's most ambitious founders with the strategic capital they need to build the future.
              </p>

              {/* Social Links */}
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
                      className="w-10 h-10 bg-white/5 hover:bg-[#c4925f] rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Links Sections */}
            {[
              {
                title: t.company, links: [
                  { label: t.about, href: '/#about' },
                  { label: t.vision, href: '/#vision' },
                  { label: t.venue, href: '/#venue' },
                  { label: t.speakers, href: '/#speakers' }
                ]
              },
              {
                title: t.platform, links: [
                  { label: t.sponsorship, href: '/#sponsorship' },
                  { label: "Invest", href: "/#invest" },
                  { label: "Partner", href: "/#partner" }
                ]
              },
              {
                title: t.support, links: [
                  { label: t.contact, href: '/contact' },
                  { label: t.privacy, href: '/privacy-policy' },
                  { label: t.terms, href: '/terms-of-service' }
                ]
              }
            ].map((section, idx) => (
              <div key={idx} className="lg:pl-8">
                <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#c4925f] rounded-full"></span>
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-blue-100/60 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm font-medium block">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright Divider */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-blue-100/40">
            <p>{t.copyright}</p>
            <div className="flex gap-8">
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                {t.privacy}
              </a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">
                {t.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}