'use client'

import Image from 'next/image'
import React from 'react'
import { Star, ShieldCheck, Award, TrendingUp, Globe, Gem } from 'lucide-react'

interface GuestOfHonourProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        guestOfHonor: 'Guest of Honour',
        name: 'Her Excellency Shaikha Moaza Obaid Suhail Al Maktoum',
        role: 'Chairperson of the Pride Group',
        bio: [
            "Her Excellency Shaikha Moaza Obaid Suhail Al Maktoum is a distinguished Emirati business leader and an esteemed member of the Al Maktoum Family, the ruling family of the United Arab Emirates. She is widely recognized for her visionary leadership, global influence, and outstanding contributions to entrepreneurship and economic development.",
            "She serves as the Chairperson of the Pride Group, a Dubai-headquartered, multinational diversified business conglomerate with operations across more than 40 countries, spanning key sectors including finance, real estate, healthcare, and technology.",
            "In recognition of her exceptional leadership and royal lineage, Her Excellency will grace the occasion as a Guest of Honour from the UAE Royal Family, lending prestige, insight, and strategic perspective to the gathering."
        ],
        stats: [
            { label: 'Global Presence', value: '40+ Countries', icon: Globe },
            { label: 'Sectors', value: 'Multi-Sectoral', icon: Gem },
            { label: 'Legacy', value: 'Royal Family', icon: ShieldCheck },
        ]
    },
    ar: {
        guestOfHonor: 'ضيفة الشرف',
        name: 'سعادة الشيخة موزة عبيد سهيل آل مكتوم',
        role: 'رئيس مجلس إدارة مجموعة برايد',
        bio: [
            "تعد سعادة الشيخة موزة عبيد سهيل آل مكتوم قائدة أعمال إماراتية متميزة وعضواً مرموقاً في عائلة آل مكتوم، العائلة الحاكمة في دولة الإمارات العربية المتحدة. وهي معروفة على نطاق واسع بقيادتها الرؤوية وتأثيرها العالمي ومساهماتها البارزة في ريادة الأعمال والتنمية الاقتصادية.",
            "تشغل منصب رئيس مجلس إدارة مجموعة برايد، وهي تكتل أعمال عالمي متنوع مقره دبي وله عمليات في أكثر من 40 دولة، وتغطي قطاعات رئيسية تشمل التمويل والعقارات والرعاية الصحية والتكنولوجيا.",
            "تقديراً لقيادتها الاستثنائية ونسبها الملكي، ستشرف سعادتها المناسبة كضيفة شرف من عائلة آل مكتوم، مما يضفي المكانة والبصيرة والمنظور الاستراتيجي على التجمع."
        ],
        stats: [
            { label: 'تواجـد عـالمي', value: '+40 دولة', icon: Globe },
            { label: 'قطاعات', value: 'متعددة الأنشطة', icon: Gem },
            { label: 'الإرث', value: 'العائلة المالكة', icon: ShieldCheck },
        ]
    },
}

export default function GuestOfHonour({ language = 'en' }: GuestOfHonourProps) {
    const t = translations[language]
    const isRtl = language === 'ar'
    const [isExpanded, setIsExpanded] = React.useState(false)

    return (
        <section className="relative min-h-screen lg:h-screen bg-white overflow-hidden flex items-center py-12 lg:py-0">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#bf1e2e]/5 to-transparent" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#bf1e2e]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c4925f]/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Image Section - Enhanced with Artistic Shapes */}
                    <div className="w-full lg:w-[40%] relative group">
                        {/* Decorative Premium Shapes */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#bf1e2e]/10 rounded-full blur-3xl opacity-60 group-hover:scale-150 transition-transform duration-1000" />

                        {/* The Large Curved Accent Shape (as seen in screenshot) */}
                        <div className="absolute -top-12 -left-12 w-72 h-72 border-t-[1.5px] border-l-[1.5px] border-[#bf1e2e]/20 rounded-[4.5rem] pointer-events-none group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 border-b-[1.5px] border-r-[1.5px] border-[#c4925f]/20 rounded-[3rem] pointer-events-none group-hover:scale-105 transition-transform duration-700" />

                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_45px_100px_-20px_rgba(191,30,46,0.35)] border-[1px] border-gray-100 bg-white transition-all duration-700">
                            <div className="aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5] relative">
                                <Image
                                    src="/shaikha_moaza.png"
                                    alt={t.name}
                                    fill
                                    className="object-cover transform transition-transform duration-[2000ms] group-hover:scale-110"
                                    priority
                                />

                                {/* Bottom Gradient for Text Legibility */}
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

                                {/* Status Badge - Glassmorphism at bottom */}
                                <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center">
                                    <div className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-xl border border-white/20 flex items-center gap-2 shadow-2xl">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#bf1e2e] animate-pulse shadow-[0_0_8px_#bf1e2e]" />
                                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-white">The Royal Guest</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subtle Floating Blobs */}
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#c4925f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                        <div className="absolute -left-8 bottom-1/4 w-32 h-32 bg-[#bf1e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
                    </div>

                    {/* Content Section */}
                    <div className={`w-full lg:w-[62%] ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className="space-y-6 lg:space-y-8">
                            <div className="space-y-3 lg:space-y-4">
                                <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#bf1e2e]/5 border border-[#bf1e2e]/10 text-[#bf1e2e] uppercase font-black text-[9px] sm:text-[10px] tracking-[0.2em] ${isRtl ? 'flex-row-reverse' : ''}`}>
                                    <Star className="w-3 h-3 sm:w-3.5 h-3.5 fill-current" />
                                    {t.guestOfHonor}
                                </div>

                                <h2 className="text-xl sm:text-3xl lg:text-[2.25rem] font-[1000] text-[#1a1a1a] leading-tight tracking-tight">
                                    <span className="text-[#bf1e2e] block mb-1 opacity-90 text-lg sm:text-xl lg:text-2xl">{isRtl ? 'صاحبة السعادة' : 'Her Excellency'}</span>
                                    {isRtl ? t.name.replace('سعادة ', '') : t.name.replace('Her Excellency ', '')}
                                </h2>
                            </div>

                            {/* Bio with Toggle */}
                            <div className="relative">
                                <div className="space-y-4 text-[#58585a] text-sm sm:text-base lg:text-lg leading-relaxed font-medium transition-all duration-700 ease-in-out">
                                    {t.bio.slice(0, isExpanded ? t.bio.length : 2).map((paragraph, index) => (
                                        <p key={index} className="opacity-90 hover:opacity-100 transition-opacity">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className={`mt-6 inline-flex items-center gap-3 text-[#bf1e2e] font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:gap-5 transition-all group ${isRtl ? 'flex-row-reverse' : ''}`}
                                >
                                    {isExpanded ? (isRtl ? 'قراءة أقل' : 'Read Less') : (isRtl ? 'اقرأ المزيد' : 'Read More')}
                                    <TrendingUp className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''} ${isRtl ? '-scale-x-100' : ''}`} />
                                </button>
                            </div>

                            {/* Stats - Highly Professional Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                                {t.stats.map((stat, idx) => {
                                    const Icon = stat.icon
                                    return (
                                        <div key={idx} className="group flex flex-col items-start gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#bf1e2e]/5 to-[#bf1e2e]/10 flex items-center justify-center text-[#bf1e2e] shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                <Icon className="w-5 h-5 sm:w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-lg sm:text-xl font-[1000] text-[#1a1a1a] tracking-tight group-hover:text-[#bf1e2e] transition-colors">
                                                    {stat.value}
                                                </p>
                                                <p className="text-[9px] sm:text-[10px] text-gray-400 font-black uppercase tracking-[0.15em] mt-0.5 group-hover:text-gray-600">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
