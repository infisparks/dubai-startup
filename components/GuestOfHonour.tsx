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
    // Keep expanded state but adjust styles to match PrincePage
    const [isExpanded, setIsExpanded] = React.useState(false)

    return (
        <section className="relative py-16 bg-white overflow-hidden flex items-center">
            {/* Background Decor - Keeping existing refined accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#bf1e2e]/5 rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c4925f]/10 rounded-full blur-[120px] opacity-40 translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Image Section - Unified with PrincePage style */}
                    <div className="w-[85%] sm:w-[60%] lg:w-[32%] relative group perspective-1000 mx-auto lg:mx-0">
                        {/* Decorative Border */}
                        <div className="absolute -inset-3 bg-gradient-to-tr from-[#bf1e2e]/20 via-[#c4925f]/20 to-[#bf1e2e]/20 rounded-2xl opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-700" />

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02] bg-white aspect-[3/4.5]">
                            <Image
                                src="/shaikha_moaza.png"
                                alt={t.name}
                                fill
                                className="object-cover transform transition-transform duration-[2000ms] group-hover:scale-105"
                                priority
                            />

                            {/* Floating Badge */}
                            <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-20`}>
                                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#bf1e2e]/20">
                                    <Star className="w-3.5 h-3.5 text-[#bf1e2e] fill-current" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#bf1e2e]">The Royal Guest</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className={`w-full lg:w-[68%] ${isRtl ? 'text-right' : 'text-left'} self-start`}>
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf1e2e]/5 border border-[#bf1e2e]/20 text-[#bf1e2e] ${isRtl ? 'flex-row-reverse' : ''}`}>
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">{t.guestOfHonor}</span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#bf1e2e] leading-tight tracking-tight">
                                    <span className="block mb-1 opacity-90 text-2xl sm:text-3xl lg:text-4xl">
                                        {isRtl ? 'سعادة الشيخة' : 'Her Excellency'}
                                    </span>
                                    {isRtl ? t.name.replace('سعادة الشيخة ', '') : t.name.replace('Her Excellency ', '')}
                                </h2>
                            </div>

                            {/* Bio */}
                            <div className="space-y-3 text-[#58585a] text-base leading-relaxed font-normal">
                                {t.bio.slice(0, isExpanded ? t.bio.length : 2).map((paragraph, index) => (
                                    <p key={index} className="transition-opacity hover:opacity-100 opacity-90 hover:text-black">
                                        {paragraph}
                                    </p>
                                ))}
                                {t.bio.length > 2 && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className={`mt-2 inline-flex items-center gap-2 text-[#bf1e2e] font-bold text-xs uppercase tracking-wider hover:gap-3 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}
                                    >
                                        {isExpanded ? (isRtl ? 'قراءة أقل' : 'Read Less') : (isRtl ? 'اقرأ المزيد' : 'Read More')}
                                        <TrendingUp className={`w-3.5 h-3.5 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''} ${isRtl ? '-scale-x-100' : ''}`} />
                                    </button>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                                {t.stats.map((stat, idx) => {
                                    const Icon = stat.icon
                                    return (
                                        <div key={idx} className="group relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#bf1e2e]/20 transition-all duration-300">
                                            <div className="mb-2 w-8 h-8 rounded-lg bg-[#bf1e2e]/5 flex items-center justify-center text-[#bf1e2e] group-hover:bg-[#bf1e2e] group-hover:text-white transition-colors">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <p className="text-xl font-bold text-slate-800 mb-0.5 group-hover:text-[#bf1e2e] transition-colors">
                                                {stat.value}
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider group-hover:text-gray-700">
                                                {stat.label}
                                            </p>
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
