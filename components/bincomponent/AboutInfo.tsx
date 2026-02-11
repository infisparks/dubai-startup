'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Target, Rocket, Globe, ShieldCheck } from 'lucide-react'

interface AboutInfoProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        aboutUsTitle: 'Raising the curtain..',
        investorsTitle: 'Investarise Global Investors Summit',
        aboutPartial: 'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide. Our mission is to empower innovation, dreams, and new ideas by creating a seamless bridge between ambition and capital.',
        aboutDescription: 'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide. Our mission is to empower innovation, dreams, and new ideas by creating a seamless bridge between ambition and capital.\n\nThe summit aims to empower entrepreneurs and high-potential businesses, particularly those from underrepresented or emerging markets, by providing them with direct access to investors, funding opportunities, and strategic guidance.\n\nBy cultivating an environment where ambition meets investment, the summit seeks to unlock new avenues for innovation, job creation, and economic progress on a global scale. Today, Investarise drives deal flow for over 100+ global investment networks, helping startups secure the right partnerships to scale.\n\nJoin us at the Investarise Global Summit – Dubai 2026, where ideas meet opportunity.',
        readMore: 'Read Full Story',
        readLess: 'Show Less',
        coreValues: [
            { icon: Rocket, title: 'Innovation', desc: 'Accelerating breakthrough ideas.', img: '/brand/innovation_bg.png', color: 'bg-[#0F172A]' },
            { icon: Target, title: 'Growth', desc: 'Secure the right scale partners.', img: '/brand/growth_bg.png', color: 'bg-[#7D5A2B]' },
            { icon: Globe, title: 'Impact', desc: 'Economic progress on global scale.', img: '/brand/impact_bg.png', color: 'bg-[#0A3D62]' },
            { icon: ShieldCheck, title: 'Trust', desc: 'Transparency in every deal.', img: '/brand/trust_bg.png', color: 'bg-[#2C3E50]' },
        ]
    },
    ar: {
        aboutUsTitle: 'رفع الستار..',
        investorsTitle: 'قمة إنفسترايز العالمية للمستثمرين',
        aboutPartial: 'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال.',
        aboutDescription: 'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال. تهدف القمة إلى تمكين رواد الأعمال والشركات ذات الإمكانات العالية، وخاصة تلك من الأسواق الممثلة تمثيلاً ناقصاً أو الناشئة، من خلال تزويدهم بالوصول المباشر إلى المستثمرين وفرص التمويل والتوجيه الاستراتيجي.\n\nمن خلال تنمية بيئة يلتقي فيها الطموح بالاستثمار، تسعى القمة لفتح آفاق جديدة للابتكار وخلق فرص العمل والتقدم الاقتصادي على نطاق عالمي. اليوم، تدفع إنفسترايز تدفق الصفقات لأكثر من 100 شبكة استثمار عالمية، مما يساعد الشركات الناشئة على تأمين الشراكات الصحيحة للتوسع.\n\nانضم إلينا في قمة إنفسترايز العالمية – دبي 2026، حيث تلتقي الأفكار بالفرص.',
        readMore: 'اقرأ القصة الكاملة',
        readLess: 'إظهار أقل',
        coreValues: [
            { icon: Rocket, title: 'ابتكار', desc: 'تسريع الأفكار الرائدة.', img: '/brand/innovation_bg.png', color: 'bg-[#0F172A]' },
            { icon: Target, title: 'نمو', desc: 'تأمين شركاء التوسع الصحيحين.', img: '/brand/growth_bg.png', color: 'bg-[#7D5A2B]' },
            { icon: Globe, title: 'تأثير', desc: 'التقدم الاقتصادي على نطاق عالمي.', img: '/brand/impact_bg.png', color: 'bg-[#0A3D62]' },
            { icon: ShieldCheck, title: 'ثقة', desc: 'الشفافية في كل صفقة.', img: '/brand/trust_bg.png', color: 'bg-[#2C3E50]' },
        ]
    },
}

export default function AboutInfo({ language = 'en' }: AboutInfoProps) {
    const t = translations[language]
    const isRtl = language === 'ar'
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section id="about" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Minimal Corporate decorative backgrounds */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Left/Top Content: 7 Columns */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                        <Rocket size={14} className="text-blue-600" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Global Vision 2026</span>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                            {t.aboutUsTitle}
                        </h2>
                        <h3 className="text-lg font-bold text-blue-600 sm:text-xl">
                            {t.investorsTitle}
                        </h3>
                    </div>

                    <div className="relative max-w-2xl">
                        <div className={`text-base sm:text-lg text-slate-600 leading-relaxed transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[800px]' : 'max-h-[120px]'}`}>
                            <p className="whitespace-pre-line opacity-90">
                                {isExpanded ? t.aboutDescription : t.aboutPartial}
                            </p>
                        </div>

                        {!isExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        )}
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-blue-600 transition-all border-b-2 border-slate-900 hover:border-blue-600 pb-0.5 uppercase tracking-wider"
                    >
                        {isExpanded ? t.readLess : t.readMore}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>

                {/* Right/Bottom Grid: 5 Columns - More compact */}
                <div className="lg:col-span-5">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {t.coreValues.map((val, idx) => (
                            <div
                                key={idx}
                                className="p-5 rounded-xl transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02]"
                            >
                                {/* Blurred Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={val.img}
                                        alt=""
                                        fill
                                        className="object-cover blur-[2px] opacity-40 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute inset-0 ${val.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white mb-3 group-hover:bg-white group-hover:text-blue-600 transition-all">
                                        <val.icon size={20} />
                                    </div>
                                    <h4 className="text-sm font-black text-white mb-1">
                                        {val.title}
                                    </h4>
                                    <p className="text-[11px] text-white/80 leading-snug font-medium">
                                        {val.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 py-3 px-4 bg-slate-900 rounded-xl flex items-center justify-between border-l-4 border-blue-600">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Dubai Summit</span>
                        <span className="text-[11px] text-slate-300 font-medium">Shaping Tomorrow's Economy</span>
                    </div>
                </div>
            </div>

            {/* Bottom visual separator */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100" />
        </section>
    )
}
