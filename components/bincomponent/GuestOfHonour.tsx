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
        role: 'Chairperson of a Global Conglomerate',
        bio: [
            "Her Excellency Shaikha Moaza Obaid Suhail Al Maktoum is a distinguished Emirati business leader and an esteemed member of the Al Maktoum Family, the ruling family of the United Arab Emirates. She is widely acclaimed for her visionary leadership, global influence, and significant contributions to entrepreneurship and economic development.",
            "She serves as the Chairperson of a leading multinational diversified business conglomerate with operations spanning more than 40 countries, encompassing key sectors such as finance, real estate, healthcare, and technology. In recognition of her exceptional leadership and royal heritage, Her Excellency will grace the occasion as Guest of Honour from the UAE Royal Family, bringing with her unparalleled prestige, strategic insight, and a global perspective that will greatly enrich the gathering."
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
        role: 'رئيس مجلس إدارة تكتل أعمال عالمي',
        bio: [
            "تعد سعادة الشيخة موزة عبيد سهيل آل مكتوم قائدة أعمال إماراتية متميزة وعضواً مرموقاً في عائلة آل مكتوم، العائلة الحاكمة في دولة الإمارات العربية المتحدة. وهي تحظى بتقدير واسع لقيادتها الرؤوية وتأثيرها العالمي ومساهماتها الكبيرة في ريادة الأعمال والتنمية الاقتصادية.",
            "وتشغل منصب رئيس مجلس إدارة تكتل أعمال عالمي متنوع رائد يمتد نشاطه في أكثر من 40 دولة، ويغطي قطاعات رئيسية مثل التمويل والعقارات والرعاية الصحية والتكنولوجيا. وتقديرًا لقيادتها الاستثنائية وإرثها الملكي، ستشرف سعادتها المناسبة كضيفة شرف من عائلة آل مكتوم، مما يضفي مكانة لا تضاهى وبصيرة استراتيجية ومنظوراً عالمياً يثري هذا التجمع بشكل كبير."
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
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#034FA3]/5 rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c4925f]/10 rounded-full blur-[120px] opacity-40 translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Image Section - Unified with PrincePage style */}
                    <div className="w-[85%] sm:w-[60%] lg:w-[32%] relative group perspective-1000 mx-auto lg:mx-0">
                        {/* Decorative Border */}
                        <div className="absolute -inset-3 bg-gradient-to-tr from-[#034FA3]/20 via-[#c4925f]/20 to-[#034FA3]/20 rounded-2xl opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-700" />

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
                                <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#034FA3]/20">
                                    <Star className="w-3.5 h-3.5 text-[#034FA3] fill-current" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#034FA3]">The Royal Guest</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className={`w-full lg:w-[68%] ${isRtl ? 'text-right' : 'text-left'} self-start`}>
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#034FA3]/5 border border-[#034FA3]/20 text-[#034FA3] ${isRtl ? 'flex-row-reverse' : ''}`}>
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">{t.guestOfHonor}</span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#034FA3] leading-tight tracking-tight">
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
                                        className={`mt-2 inline-flex items-center gap-2 text-[#034FA3] font-bold text-xs uppercase tracking-wider hover:gap-3 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}
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
                                        <div key={idx} className="group relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#034FA3]/20 transition-all duration-300">
                                            <div className="mb-2 w-8 h-8 rounded-lg bg-[#034FA3]/5 flex items-center justify-center text-[#034FA3] group-hover:bg-[#034FA3] group-hover:text-white transition-colors">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <p className="text-xl font-bold text-slate-800 mb-0.5 group-hover:text-[#034FA3] transition-colors">
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
