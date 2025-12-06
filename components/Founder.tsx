'use client'

import React from 'react'
import Image from 'next/image' // <-- ADDED THIS FIX HERE TOO
import { Linkedin, Twitter, CheckCircle } from 'lucide-react'

interface FounderPageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'Founder',
    name: 'Kishan Kumar Verma',
    subtitle: 'Chief Executive Officer',
    description:
      'Founder & M.D. - Finarise Commercial Brokers Est. An accomplished retail banking professional armed with over 21 years of versatile experience in Sales & distribution Management, Payroll acquisition, Asset Products - Credit cards, Personal finance, Mortgage & Business development in UAE & INDIA Market.',
    achievements: [
      'Fiercely driven start-Up Agent for New Business & Revenue Lines',
      'Driving Double & Triple-Digit Growth',
      'Yielded steady top-quartile performance',
    ],
  },
  ar: {
    title: 'المؤسس',
    name: 'كيشان كومار فيرما',
    subtitle: 'الرئيس التنفيذي',
    description:
      'مؤسس ومدير عام - Finarise Commercial Brokers Est. محترف مصرفي تجزئة بارع يتمتع بخبرة تزيد عن 21 عامًا في إدارة المبيعات والتوزيع، واكتساب كشوف المرتبات، ومنتجات الأصول - بطاقات الائتمan، والتمويل الشخصي، والرهن العقاري، وتطوير الأعمال في أسواق الإمارات العربية المتحدة والهند.',
    achievements: [
      'وكيل شركة ناشئة متحمس بشدة للأعمال الجديدة وخطوط الإيرادات',
      'قيادة نمو مزدوج وثلاثي الأرقام',
      'تحقيق أداء ثابت في الربع الأعلى',
    ],
  },
}

export default function FounderPage({ language = 'en' }: FounderPageProps) {
  const t = translations[language]

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8 lg:mb-10">
              <h1 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
                {t.title}
              </h1>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {t.name}
              </h2>
              <h3 className="mt-2 text-xl sm:text-2xl font-medium text-slate-500">
                {t.subtitle}
              </h3>
            </div>

            {/* Branded underline accent */}
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto lg:mx-0 mb-8 lg:mb-10" />

            <p className="text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.description}
            </p>

            {/* Modern Checklist */}
            <ul className="mt-8 space-y-4 text-left max-w-2xl mx-auto lg:mx-0">
              {t.achievements.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-base text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Image Card & Socials */}
          <div className="flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-shadow duration-500">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-cyan-500/30 transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/speaker/4.png"
                  alt={t.name}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 flex justify-center gap-8">
              <a
                href="#"
                title="LinkedIn"
                className="text-slate-400 hover:text-blue-600 transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                title="Twitter"
                className="text-slate-400 hover:text-sky-500 transition-colors duration-300"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}