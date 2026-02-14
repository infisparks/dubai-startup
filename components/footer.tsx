'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Sparkles, Youtube, Twitter } from 'lucide-react'

interface FooterProps {
  language?: 'en' | 'ar'
}

const translations = {
  en: {
    tagline: 'Where Innovation Meets Global Capital',
    description: 'Join Investarise Global 2026 — an elite stage connecting visionary game-changers with high-net-worth powerhouses and institutional venture networks.',
    registerNow: 'Register Now',
    company: 'Company',
    platform: 'Platform',
    support: 'Support',
    followUs: 'Connect With Us',
    getInTouch: 'Strategic Inquiries',
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
    copyright: `© ${new Date().getFullYear()} Infispark Technologies. All Rights Reserved.`,
    email: 'Email Disclosure',
    call: 'Direct Contact',
    visit: 'Global Access',
    emailAddr: 'info@investariseglobal.com',
    phone: '+971 55 472 1421',
    website: 'investariseglobal.com',
  },
  ar: {
    tagline: 'حيث يلتقي الابتكار برأس المال العالمي',
    description: 'انضم إلى إنفسترايز العالمية 2026 — منصة النخبة لربط رواد الأعمال الرؤيويين مع كبار المستثمرين والمؤسسات الاستثمارية.',
    registerNow: 'سجل الآن',
    company: 'الشركة',
    platform: 'المنصة',
    support: 'الدعم',
    followUs: 'تواصل معنا',
    getInTouch: 'استفسارات استراتيجية',
    about: 'حول القمة',
    vision: 'الرؤية',
    speakers: 'المتحدثون',
    sponsorship: 'الرعاية',
    venue: 'المكان',
    forInvestors: 'للمستثمرين',
    forStartups: 'للشركات الناشئة',
    contact: 'تواصل',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    copyright: `© ${new Date().getFullYear()} إنفسترايز. جميع الحقوق محفوظة.`,
    email: 'البريد الإلكتروني',
    call: 'اتصال مباشر',
    visit: 'وصول عالمي',
    emailAddr: 'info@investariseglobal.com',
    phone: '+971 55 472 1421',
    website: 'investariseglobal.com',
  },
}

export default function Footer({ language = 'en' }: FooterProps) {
  const router = useRouter()
  const t = translations[language]
  const isRtl = language === 'ar'

  return (
    <footer id="main-footer" className="relative bg-[#020617] text-white pt-24 pb-12 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Cinematic Background Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#034FA3]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.pattern')] opacity-[0.03] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">


        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-10 group">
              <img src="/logo-white.png" alt="Investarise" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-10 font-medium">
              Architecting the nexus where the world's most ambitious founders meet strategic global capital.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61585203620830&mibextid=ZbWKwL" },
                { Icon: Instagram, href: "https://www.instagram.com/investariseglobal?igsh=dTFzdTY5cXlrN3hi" },
                { Icon: Youtube, href: "https://www.youtube.com/@InvestariseGlobal" }
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-[#034FA3] hover:border-[#034FA3] hover:-translate-y-1 transition-all duration-500 group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

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
                { label: "Investors", href: "#" },
                { label: "Startups", href: "#" },
                { label: t.sponsorship, href: '/#sponsorship' },
                { label: "Partners", href: "#" }
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
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#034FA3]" />
                {section.title}
              </h4>
              <ul className="space-y-5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-500 hover:text-[#4fa3f7] font-bold text-sm tracking-tight transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
            {language === 'en' ? (
              <>© {new Date().getFullYear()} <a href="https://infispark.in" target="_blank" rel="noopener noreferrer" className="text-[#4fa3f7] hover:text-white transition-colors">Infispark Technologies</a>. All Rights Reserved.</>
            ) : (
              t.copyright
            )}
          </p>
          <div className="flex gap-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">{t.privacy}</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">{t.terms}</Link>
            <a href="https://infispark.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Infispark</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Globe({ size = 24, className }: { size?: number, className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20" />
      <path d="M2 12h20" />
    </svg>
  )
}