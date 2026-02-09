'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { pastSpeakersData } from "@/lib/past-speakers-data"
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

interface PastSpeakersProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        title: 'Past Speakers',
        subtitle: 'Visionaries who have shaped our journey.',
        viewAll: 'View All Speakers',
    },
    ar: {
        title: 'المتحدثون السابقون',
        subtitle: 'أصحاب الرؤى الذين شكلوا رحلتنا.',
        viewAll: 'عرض جميع المتحدثين',
    },
}

export default function PastSpeakers({ language = 'en' }: PastSpeakersProps) {
    const t = translations[language]
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)

    // Repeat speakers for seamless loop
    const repeatedSpeakers = [...pastSpeakersData.slice(0, 10), ...pastSpeakersData.slice(0, 10), ...pastSpeakersData.slice(0, 10), ...pastSpeakersData.slice(0, 10)]

    useEffect(() => {
        const el = scrollContainerRef.current
        if (!el) return

        let animationId: number
        const animate = () => {
            if (!isPaused) {
                const speed = 0.5 // Adjust speed for smoothness
                if (el.scrollLeft >= el.scrollWidth / 2) {
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
        <section className="py-12 sm:py-16 relative overflow-hidden bg-slate-50">

            {/* Abstract Modern Background */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#034FA3]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c4925f]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none mix-blend-multiply" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#034FA3] text-xs font-semibold tracking-wide uppercase mb-3">
                            <Star className="w-3 h-3 fill-[#034FA3]" />
                            <span>Legacy of Excellence</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                            {t.title}
                        </h2>
                        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="hidden md:block pb-1">
                        <Link
                            href="/past-speakers"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#034FA3] hover:text-[#023c7a] transition-colors"
                        >
                            {t.viewAll}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative group/carousel">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        className="flex overflow-x-auto gap-4 pb-8 pt-4 px-2 no-scrollbar
                       scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
                    >
                        {repeatedSpeakers.map((speaker, idx) => (
                            <div
                                key={`${speaker.name}-${idx}`}
                                className="flex-shrink-0 w-[240px] sm:w-[260px] group relative"
                            >
                                <div className="bg-white rounded-[1.5rem] p-5 h-full border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] 
                              transition-all duration-300 group-hover:shadow-[0_20px_40px_rgb(191,30,46,0.08)] group-hover:-translate-y-1.5 flex flex-col items-center text-center relative overflow-hidden z-10">

                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#034FA3] to-[#c4925f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                                    {/* Image */}
                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-white shadow-sm transition-colors duration-300 mx-auto">
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                width={112}
                                                height={112}
                                                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 group-hover:text-[#034FA3] transition-colors line-clamp-1">
                                        {speaker.name}
                                    </h3>

                                    <div className="w-full h-px bg-slate-50 my-2" />

                                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                                        {speaker.bio}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* "View More" Slide at the end of the data loop (it will repeat) */}
                        <div className="flex-shrink-0 w-[180px] flex items-center justify-center">
                            <Link
                                href="/past-speakers"
                                className="flex flex-col items-center justify-center w-full h-[80%] 
                            rounded-3xl border-2 border-dashed border-slate-200 
                            hover:border-[#034FA3]/50 hover:bg-blue-50/50
                            group transition-all duration-300 cursor-pointer text-center p-4"
                            >
                                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-[#034FA3]">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold text-slate-600 group-hover:text-[#034FA3] transition-colors">
                                    {t.viewAll}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile View All Button */}
                <div className="md:hidden mt-2 text-center">
                    <Link
                        href="/past-speakers"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#034FA3] bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-colors"
                    >
                        {t.viewAll}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
