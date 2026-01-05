'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { pastSpeakersData } from "@/lib/past-speakers-data"
import Link from 'next/link'
import { ChevronRight, ArrowRight, Star } from 'lucide-react'

function ChevronLeftIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
    )
}

function ChevronRightIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
    )
}

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

    // Show more speakers in the carousel
    const featuredSpeakers = pastSpeakersData.slice(0, 10)

    const [isScrollStart, setIsScrollStart] = useState(true)
    const [isScrollEnd, setIsScrollEnd] = useState(false)

    const checkScrollPosition = useCallback(() => {
        const el = scrollContainerRef.current
        if (el) {
            const atStart = el.scrollLeft < 10
            const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10
            setIsScrollStart(atStart)
            setIsScrollEnd(atEnd)
        }
    }, [])

    useEffect(() => {
        const el = scrollContainerRef.current
        if (el) {
            el.addEventListener('scroll', checkScrollPosition)
            window.addEventListener('resize', checkScrollPosition)
            checkScrollPosition()
            return () => {
                el.removeEventListener('scroll', checkScrollPosition)
                window.removeEventListener('resize', checkScrollPosition)
            }
        }
    }, [checkScrollPosition])

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current
        if (el) {
            const scrollAmount = 340
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    return (
        <section className="py-12 sm:py-16 relative overflow-hidden bg-slate-50">

            {/* Abstract Modern Background */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#bf1e2e]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c4925f]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none mix-blend-multiply" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#bf1e2e] text-xs font-semibold tracking-wide uppercase mb-3">
                            <Star className="w-3 h-3 fill-[#bf1e2e]" />
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
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#bf1e2e] hover:text-[#940200] transition-colors"
                        >
                            {t.viewAll}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative group/carousel">

                    {/* Navigation Buttons (Floating) */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={() => scroll('left')}
                            className={`p-3.5 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 text-slate-700 hover:text-[#bf1e2e] hover:scale-110 transition-all duration-300
                         ${isScrollStart ? 'opacity-50 cursor-not-allowed hidden' : 'opacity-100'}`}
                            disabled={isScrollStart}
                        >
                            <ChevronLeftIcon />
                        </button>
                    </div>

                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={() => scroll('right')}
                            className={`p-3.5 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 text-slate-700 hover:text-[#bf1e2e] hover:scale-110 transition-all duration-300
                         ${isScrollEnd ? 'opacity-50 cursor-not-allowed hidden' : 'opacity-100'}`}
                            disabled={isScrollEnd}
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>

                    {/* Cards Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-4 pb-8 pt-4 px-2 snap-x snap-mandatory 
                       scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] cursor-grab active:cursor-grabbing"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {featuredSpeakers.map((speaker, idx) => (
                            <div
                                key={`${speaker.name}-${idx}`}
                                className="flex-shrink-0 w-[240px] sm:w-[260px] snap-start group relative"
                            >
                                <div className="bg-white rounded-[1.5rem] p-5 h-full border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] 
                              transition-all duration-300 group-hover:shadow-[0_20px_40px_rgb(191,30,46,0.08)] group-hover:-translate-y-1.5 flex flex-col items-center text-center relative overflow-hidden z-10">

                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#bf1e2e] to-[#c4925f] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                                    {/* Image */}
                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-white shadow-sm transition-colors duration-300 mx-auto">
                                            <img
                                                src={speaker.image}
                                                alt={speaker.name}
                                                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 group-hover:text-[#bf1e2e] transition-colors line-clamp-1">
                                        {speaker.name}
                                    </h3>

                                    <div className="w-full h-px bg-slate-50 my-2" />

                                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                                        {speaker.bio}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* "View More" Slide */}
                        <div className="flex-shrink-0 w-[180px] snap-start flex items-center justify-center">
                            <Link
                                href="/past-speakers"
                                className="flex flex-col items-center justify-center w-full h-[80%] 
                            rounded-3xl border-2 border-dashed border-slate-200 
                            hover:border-[#bf1e2e]/50 hover:bg-red-50/50
                            group transition-all duration-300 cursor-pointer text-center p-4"
                            >
                                <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-[#bf1e2e]">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold text-slate-600 group-hover:text-[#bf1e2e] transition-colors">
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
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#bf1e2e] bg-red-50 px-6 py-3 rounded-full hover:bg-red-100 transition-colors"
                    >
                        {t.viewAll}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
