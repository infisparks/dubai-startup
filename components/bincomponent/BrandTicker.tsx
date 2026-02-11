'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BRAND_BASE_PATH = '/brand'

export default function BrandTicker() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const logos = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 33, 34, 35, 36, 37, 38];
    // Duplicate logos for seamless infinite scrolling
    const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos];

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        let animationId: number
        const animate = () => {
            if (!isPaused) {
                const speed = 0.8 // Adjust speed as necessary
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0 // Reset to start for seamless loop
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
        <div className="w-full bg-white border-b border-gray-100 py-4 px-0 relative z-20 overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-[21] pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-[21] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={scrollRef}
                    className="flex items-center overflow-x-auto no-scrollbar select-none py-1"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="flex gap-12 sm:gap-16 md:gap-20 px-4">
                        {repeatedLogos.map((num, i) => (
                            <Link
                                key={i}
                                href={`/partner/${num}`}
                                className="flex-shrink-0 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                            >
                                <Image
                                    src={`${BRAND_BASE_PATH}/${num}.png`}
                                    alt={`Partner Brand ${num}`}
                                    width={200}
                                    height={100}
                                    quality={100}
                                    priority={i < 10}
                                    className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300"
                                    draggable={false}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
