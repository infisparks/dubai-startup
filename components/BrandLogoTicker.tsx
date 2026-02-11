'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const BRAND_BASE_PATH = '/brand'
const logos = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 33, 34, 35, 36, 37, 38]

export default function BrandLogoTicker() {
    // Duplicate logos for seamless infinite scrolling
    const tickerLogos = [...logos, ...logos, ...logos]

    return (
        <div className="w-full bg-white py-12 relative overflow-hidden flex flex-col items-center">
            {/* Subtle top/bottom borders */}
            <div className="absolute top-0 left-0 w-full h-px bg-slate-100" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-slate-100" />

            {/* Side Masks for fading effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="relative flex whitespace-nowrap overflow-hidden mb-10 w-full">
                <motion.div
                    className="flex gap-16 md:gap-24 items-center"
                    animate={{
                        x: [0, -1035], // Adjust based on content width for exact seamlessness
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Adjust speed
                            ease: "linear",
                        },
                    }}
                >
                    {tickerLogos.map((num, i) => (
                        <Link
                            key={i}
                            href={`/partner/${num}`}
                            className="flex-shrink-0 transition-all duration-500 hover:scale-110 group cursor-pointer"
                        >
                            <Image
                                src={`${BRAND_BASE_PATH}/${num}.png`}
                                alt={`Partner Brand ${num}`}
                                width={160}
                                height={60}
                                className="h-8 md:h-12 w-auto object-contain transition-all duration-300"
                                draggable={false}
                            />
                        </Link>
                    ))}
                </motion.div>
            </div>

            {/* View All Brands Action */}
            <Link
                href="/brands"
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#034FA3] hover:bg-[#034FA3] hover:text-white transition-all duration-500 shadow-sm"
            >
                <span>View All Brands</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
        </div>
    )
}
