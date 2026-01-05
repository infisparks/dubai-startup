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
    phone: '+971 55 450 0978',
    website: 'www.investariseglobal.com',
  },
}

export default function Footer({ language = 'en' }: FooterProps) {
  const router = useRouter()
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <footer className="bg-[#bf1e2e] text-white relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Elements - Strong Brand Red */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Darker red accents for depth */}
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#940200] rounded-full blur-[120px] opacity-60" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-[#c4925f] rounded-full blur-[100px] opacity-30" />
      </div>

      {/* Subtle Pattern Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

      <div className="relative z-10">
        {/* Hero CTA Section - Floating Card Style */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pb-16">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl hover:border-white/30 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left Content */}
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-tight text-white drop-shadow-sm">
                  {t.tagline}
                </h2>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 font-light max-w-lg">
                  {t.description}
                </p>
                <button
                  onClick={() => router.push('/registration')}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#bf1e2e] hover:bg-[#c4925f] hover:text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="uppercase tracking-wider text-sm">{t.registerNow}</span>
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
                      className="flex items-center gap-4 p-4 rounded-xl bg-black/20 hover:bg-black/30 border border-white/10 hover:border-white/20 transition-all duration-300 group backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-[#c4925f] group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-white/60 font-medium uppercase tracking-widest mb-0.5">{item.label}</p>
                        <p className="text-sm sm:text-base text-white font-semibold truncate">{item.value}</p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10 bg-black/10 backdrop-blur-sm rounded-t-3xl mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">

            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#c4925f] to-[#bf1e2e] rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                  <span className="text-white font-extrabold text-2xl tracking-tighter">I</span>
                </div>
                <div>
                  <span className="font-extrabold text-2xl tracking-tight block leading-none">Investarise</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">Global Summit</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed font-light">
                Connecting visionary founders with global investment opportunities.
              </p>
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
                  { label: t.forInvestors, href: '/investors' },
                  { label: t.forStartups, href: '/startups' },
                  { label: t.sponsorship, href: '/#sponsorship' }
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
              <div key={idx}>
                <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest border-b border-[#c4925f]/50 pb-2 inline-block">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 text-sm font-medium inline-block">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest border-b border-[#c4925f]/50 pb-2 inline-block">
                {t.followUs}
              </h4>
              <div className="flex gap-4">
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
                      className="w-10 h-10 bg-white/10 hover:bg-[#c4925f] rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent group"
                      title={social.label}
                    >
                      <Icon className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Copyright Divider */}
          <div className="border-t border-white/10 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
              <p>{t.copyright}</p>
              <div className="flex gap-6">
                <a href="/privacy-policy" className="hover:text-white transition-colors">
                  {t.privacy}
                </a>
                <div className="w-px bg-white/20" />
                <a href="/terms-of-service" className="hover:text-white transition-colors">
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