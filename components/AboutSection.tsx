'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Image from 'next/image'

interface AboutSectionProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        badge: 'Global Vision 2026',
        subtitle: 'Raising the curtain..',
        title: 'Investarise Global Investors Summit',
        description: 'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide. Our mission is to empower innovation, dreams, and new ideas by creating a seamless bridge between ambition and capital.',
        moreText1: 'The summit aims to empower entrepreneurs and high-potential businesses, particularly those from underrepresented or emerging markets, by providing them with direct access to investors, funding opportunities, and strategic guidance.',
        moreText2: 'By cultivating an environment where ambition meets investment, the summit seeks to unlock new avenues for innovation, job creation, and economic progress on a global scale. Today, Investarise drives deal flow for over 100+ global investment networks, helping startups secure the right partnerships to scale.',
        joinUs: 'Join us at the Investarise Global Summit – Dubai 2026, where ideas meet opportunity.',
        showMore: 'Show More',
        showLess: 'Show Less',
        stats: '15+',
        statsLabel: 'Years of Global Impact',
    },
    ar: {
        badge: 'رؤية عالمية 2026',
        subtitle: 'رفع الستار..',
        title: 'قمة إنفسترايز العالمية للمستثمرين',
        description: 'تربط قمة إنفسترايز العالمية للمستثمرين المؤسسين الرؤيويين مع نخبة المستثمرين وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار والأحلام والأفكار الجديدة من خلال خلق جسر سلس بين الطموح ورأس المال.',
        moreText1: 'تهدف القمة إلى تمكين رواد الأعمال والشركات ذات الإمكانات العالية، وخاصة أولئك الذين ينتمون إلى الأسواق الناشئة، من خلال توفير وصول مباشر للمستثمرين، وفرص التمويل، والتوجيه الاستراتيجي.',
        moreText2: 'من خلال رعاية بيئة يلتقي فيها الطموح مع الاستثمار، تسعى القمة لفتح آفاق جديدة للابتكار، وخلق فرص العمل، والتقدم الاقتصادي على نطاق عالمي. اليوم، تقود إنفسترايز تدفق الصفقات لأكثر من 100+ شبكة استثمار عالمية.',
        joinUs: 'انضم إلينا في قمة إنفسترايز العالمية – دبي 2026، حيث تلتقي الأفكار بالفرص.',
        showMore: 'عرض المزيد',
        showLess: 'عرض أقل',
        stats: '15+',
        statsLabel: 'عاماً من الأثر العالمي',
    }
}

export default function AboutSection({ language }: AboutSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const t = translations[language]
    const isRtl = language === 'ar'

    return (
        <section id="about" className="py-16 bg-white overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>


            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Visuals Layout */}
                    <div className="relative">
                        <div className="relative z-10 grid grid-cols-12 gap-4">
                            {/* Top Image (Speaker) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="col-span-12 lg:col-span-8 lg:col-start-3 relative z-10"
                            >
                                <div className="rounded-tr-[100px] rounded-bl-[100px] rounded-tl-[30px] rounded-br-[30px] overflow-hidden aspect-[4/5] relative border-[8px] lg:border-[12px] border-white">
                                    <Image
                                        src="/event/event1.jpg"
                                        alt="Global Summit Vision"
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                </div>

                                {/* Floating Stat Card - Hidden on Mobile */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="hidden lg:flex absolute -top-12 -right-16 w-44 h-56 bg-[#034FA3] rounded-[2.5rem] p-6 flex-col items-center justify-center text-center text-white shadow-2xl border-[10px] border-white z-40"
                                >
                                    <span className="text-5xl font-black mb-1">{t.stats}</span>
                                    <p className="text-[10px] font-black leading-tight uppercase tracking-[0.2em] opacity-90">{t.statsLabel}</p>
                                </motion.div>
                            </motion.div>

                            {/* Bottom Image (Audience) - Hidden on Mobile */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="hidden lg:flex col-span-12 -mt-56 relative z-30 justify-center"
                            >
                                <div className="w-[90%] rounded-tl-[100px] rounded-br-[100px] rounded-tr-[30px] rounded-bl-[30px] overflow-hidden aspect-[4/3] relative border-[12px] border-white">
                                    <Image
                                        src="/event/event2.jpg"
                                        alt="Investarise Audience"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/40 transition-all border border-white/30">
                                            <Play className="text-white fill-white ml-1" size={24} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-sm bg-[#034FA3] rotate-45 flex-shrink-0 shadow-[0_0_15px_rgba(3,79,163,0.3)]" />
                                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">{t.badge}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                                {t.title}
                            </h2>
                            <p className="text-blue-600/60 font-bold text-base italic">{t.subtitle}</p>
                        </motion.div>

                        <div className="space-y-6">
                            <p className="text-slate-600 text-base leading-relaxed font-medium border-l-4 border-blue-100 pl-6">
                                {t.description}
                            </p>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="space-y-6 overflow-hidden"
                                    >
                                        <p className="text-slate-500 text-base leading-relaxed font-medium pl-6">
                                            {t.moreText1}
                                        </p>
                                        <p className="text-slate-500 text-base leading-relaxed font-medium pl-6">
                                            {t.moreText2}
                                        </p>
                                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 italic font-bold text-blue-800 shadow-[inset_0_0_20px_rgba(59,130,246,0.03)]">
                                            "{t.joinUs}"
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-400 font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-4 transition-all mb-4 group"
                            >
                                <span className="underline underline-offset-8 decoration-2 decoration-blue-500/30 group-hover:decoration-blue-500 transition-all">
                                    {isExpanded ? t.showLess : t.showMore}
                                </span>
                                <ArrowRight size={16} className={`${isRtl ? 'rotate-180' : ''} transition-transform group-hover:translate-x-1`} />
                            </button>

                            {/* Embedded Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100"
                            >
                                <Image
                                    src="/event/event1.jpg"
                                    alt="Global Networking"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    )
}
