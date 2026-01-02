'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { galleryImages } from "@/lib/gallery-data"
import Link from 'next/link'
import { ChevronRight, ArrowRight, Camera } from 'lucide-react'

// Custom Navigation Icons
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

interface GalleryProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        title: 'Event Gallery',
        subtitle: 'Glimpses of our previous summits and networking events.',
        viewAll: 'View Full Gallery',
    },
    ar: {
        title: 'معرض الحدث',
        subtitle: 'لمحات من مؤتمرات القمة وفعاليات التواصل السابقة.',
        viewAll: 'عرض المعرض الكامل',
    },
}

export default function Gallery({ language = 'en' }: GalleryProps) {
    const t = translations[language]
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Show a preview set in the carousel
    const featuredImages = galleryImages.slice(0, 8)

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
            // Scroll amount approx consistent with card width
            const scrollAmount = 350
            el.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    return (
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden">

            {/* Dynamic Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide uppercase mb-3">
                            <Camera className="w-3 h-3" />
                            <span>Captured Moments</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                            {t.title}
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="hidden md:block pb-2">
                        <Link
                            href="/gallery"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                            {t.viewAll}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Carousel Wrapper with custom styling */}
                <div className="relative group/carousel">

                    {/* Navigation Overlay Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 
                       p-3 bg-white/90 backdrop-blur shadow-lg rounded-full border border-slate-100
                       text-slate-700 hover:text-blue-600 hover:scale-105 transition-all duration-300
                       hidden md:flex items-center justify-center -ml-5 opacity-0 group-hover/carousel:opacity-100
                       ${isScrollStart ? 'hidden' : ''}`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeftIcon />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 
                       p-3 bg-white/90 backdrop-blur shadow-lg rounded-full border border-slate-100
                       text-slate-700 hover:text-blue-600 hover:scale-105 transition-all duration-300
                       hidden md:flex items-center justify-center -mr-5 opacity-0 group-hover/carousel:opacity-100
                       ${isScrollEnd ? 'hidden' : ''}`}
                        aria-label="Scroll right"
                    >
                        <ChevronRightIcon />
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-8 pt-4 px-2 snap-x snap-mandatory 
                       scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] cursor-grab active:cursor-grabbing"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {featuredImages.map((src, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-[300px] sm:w-[360px] aspect-[4/3] snap-start relative group/card"
                            >
                                <div className="w-full h-full rounded-2xl overflow-hidden shadow-md border border-slate-100 relative">
                                    <img
                                        src={src}
                                        alt={`Event photo ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />
                                    {/* Overlay Gradient on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        ))}

                        {/* "View Gallery" End Card */}
                        <div className="flex-shrink-0 w-[200px] aspect-[4/3] snap-start flex items-center justify-center">
                            <Link
                                href="/gallery"
                                className="flex flex-col items-center justify-center w-full h-[80%] 
                           rounded-3xl border-2 border-dashed border-slate-300 
                           hover:border-blue-400 hover:bg-slate-50
                           group transition-all duration-300 cursor-pointer text-center p-4"
                            >
                                <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-blue-500">
                                    <Camera className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">
                                    {t.viewAll}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile View All Button */}
                <div className="md:hidden mt-6 text-center">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white bg-slate-900 px-8 py-3.5 rounded-full shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-1"
                    >
                        {t.viewAll}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
