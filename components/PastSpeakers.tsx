'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { pastSpeakersData } from "@/lib/past-speakers-data"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Quote, Award, Sparkles, ShieldCheck, Linkedin, Globe } from 'lucide-react'

interface PastSpeakersProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        title: 'Legacy Speakers',
        subtitle: 'The visionaries and industry icons who have headlined our previous summits.',
        viewAll: 'View All Alumni',
    },
    ar: {
        title: 'المتحدثون السابقون',
        subtitle: 'أصحاب الرؤى ورموز الصناعة الذين تصدروا قمنا السابقة.',
        viewAll: 'عرض جميع الخريجين',
    },
}

export default function PastSpeakers({ language = 'en' }: PastSpeakersProps) {
    const t = translations[language]
    const isRtl = language === 'ar'
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)

    // Repeat speakers for seamless loop
    const repeatedSpeakers = [...pastSpeakersData.slice(0, 10), ...pastSpeakersData.slice(0, 10), ...pastSpeakersData.slice(0, 10)]

    useEffect(() => {
        const el = scrollContainerRef.current
        if (!el) return

        let animationId: number
        const speed = 0.5

        const animate = () => {
            if (!isPaused) {
                if (el.scrollLeft >= el.scrollWidth / 1.5) {
                    el.scrollLeft = 0
                } else {
                    el.scrollLeft += speed
                }
            }
            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationId)
    }, [isPaused])

    return (
        <section className="py-20 bg-[#F8FAFC] relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Background elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section - Modern and Tighter */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-4"
                        >
                            <ShieldCheck size={12} className="text-[#034FA3]" />
                            Institutional Legacy
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4"
                        >
                            {t.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-slate-500 text-sm sm:text-base font-medium"
                        >
                            {t.subtitle}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden md:block"
                    >
                        <Link
                            href="/past-speakers"
                            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#034FA3] hover:text-[#023757] transition-all"
                        >
                            {t.viewAll}
                            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Auto-Scrolling Ticker */}
                <div className="relative group/ticker">
                    {/* Edge Shades */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/50 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        className="flex flex-nowrap overflow-x-auto no-scrollbar gap-8 py-8 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {repeatedSpeakers.map((speaker, idx) => (
                            <div
                                key={`${speaker.name}-${idx}`}
                                className="flex-shrink-0 w-[240px] sm:w-[280px] group relative"
                            >
                                {/* Legacy Card Stack Effect */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[85%] h-5 bg-white border border-slate-100 rounded-t-[1.5rem] -z-10 transition-all duration-500 group-hover:-top-3" />

                                <div className="relative bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col h-[320px] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] group-hover:-translate-y-1">

                                    {/* Legacy Status Strip */}
                                    <div className="h-1 w-12 bg-[#034FA3]/20 rounded-full mb-6 group-hover:w-20 group-hover:bg-[#034FA3] transition-all duration-500" />

                                    {/* Portrait stage */}
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-slate-50 shadow-md group-hover:scale-110 group-hover:rotate-2 transition-all duration-500 mx-auto bg-slate-50">
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                width={96}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-md shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Award size={12} className="text-[#034FA3]" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-center flex-grow">
                                        <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 truncate group-hover:text-[#034FA3] transition-colors leading-tight">
                                            {speaker.name}
                                        </h3>

                                        <div className="h-px w-6 bg-slate-100 mx-auto mb-3" />

                                        <p className="text-[10px] sm:text-[11px] text-slate-500 font-bold leading-relaxed line-clamp-3 uppercase tracking-wider">
                                            {speaker.bio}
                                        </p>
                                    </div>

                                    {/* Subtle Interaction Row */}
                                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Linkedin size={14} className="text-slate-300 hover:text-[#0A66C2] transition-colors cursor-pointer" />
                                        <Globe size={14} className="text-slate-200 hover:text-blue-400 transition-colors cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Alumni Link */}
                <div className="md:hidden mt-8 text-center px-4">
                    <Link
                        href="/past-speakers"
                        className="inline-flex items-center justify-center w-full gap-2 text-[10px] font-black uppercase tracking-widest text-white bg-[#034FA3] px-8 py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
                    >
                        {t.viewAll}
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
