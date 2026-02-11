'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface FeaturesTickerProps {
    features: { title: string; desc: string }[]
    isRtl: boolean
}

export default function FeaturesTicker({ features, isRtl }: FeaturesTickerProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const repeatedFeatures = [...features, ...features, ...features, ...features]

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        let animationId: number

        const animate = () => {
            if (!isPaused && el) {
                const speed = 0.6
                // For RTL, scrollLeft is usually negative or moves towards negative
                if (isRtl) {
                    if (Math.abs(el.scrollLeft) >= el.scrollWidth / 2) {
                        el.scrollLeft = 0
                    } else {
                        el.scrollLeft -= speed
                    }
                } else {
                    if (el.scrollLeft >= el.scrollWidth / 2) {
                        el.scrollLeft = 0
                    } else {
                        el.scrollLeft += speed
                    }
                }
            }
            animationId = requestAnimationFrame(animate)
        }
        animationId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationId)
    }, [isPaused, isRtl])

    // High-End Premium Corporate Palette
    const cardAssets = [
        { gradient: 'from-[#0F172A]/90 to-[#1E293B]/95', img: '/brand/innovation_bg.png' },
        { gradient: 'from-[#7D5A2B]/90 to-[#5C4018]/95', img: '/brand/growth_bg.png' },
        { gradient: 'from-[#0A3D62]/90 to-[#0D2137]/95', img: '/brand/impact_bg.png' },
        { gradient: 'from-[#2C3E50]/90 to-[#1a1a1a]/95', img: '/brand/trust_bg.png' },
    ];

    return (
        <div className="w-full py-6 overflow-hidden relative z-20 bg-white border-y border-slate-100">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div
                ref={scrollRef}
                className="flex flex-nowrap items-stretch overflow-x-auto gap-4 no-scrollbar select-none"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {repeatedFeatures.map((feature, i) => {
                    const asset = cardAssets[i % cardAssets.length];
                    return (
                        <div
                            key={i}
                            className={`flex-shrink-0 w-72 p-6 rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.03] group ${isRtl ? 'text-right' : 'text-left'} relative overflow-hidden`}
                        >
                            {/* Background Image with Blur */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={asset.img}
                                    alt=""
                                    fill
                                    className="object-cover blur-[2px] scale-110 group-hover:scale-125 transition-transform duration-700 opacity-50"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${asset.gradient} z-10`} />
                            </div>

                            {/* Content */}
                            <div className="relative z-20">
                                <h4 className="text-base font-black text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                                    {feature.title}
                                </h4>
                                <div className="w-8 h-1 bg-white/30 rounded-full mb-3 group-hover:w-12 transition-all duration-300"></div>
                                <p className="text-xs text-white leading-relaxed font-semibold drop-shadow-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
