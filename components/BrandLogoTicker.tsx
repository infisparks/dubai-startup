'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const BRAND_BASE_PATH = '/brand'
// Using the logos provided in the previous component version
const logosSet1 = [1, 2, 3, 4, 5, 7, 8, 9]
const logosSet2 = [10, 11, 33, 34, 35, 36, 37, 38]

const BrandFrame = ({ num }: { num: number }) => (
    <Link
        href={`/partner/${num}`}
        className="xb-brand-logo relative inline-flex items-center justify-center w-[180px] md:w-[248px] h-[56px] md:h-[78px] group transition-all duration-500 hover:-translate-y-1 mx-3 md:mx-4"
    >
        <div className="relative z-10 w-full h-full flex items-center justify-center p-5 md:p-8">
            <Image
                src={`${BRAND_BASE_PATH}/${num}.png`}
                alt={`Partner Brand ${num}`}
                width={160}
                height={60}
                className="h-6 md:h-10 w-auto object-contain transition-all duration-500"
                draggable={false}
            />
        </div>
        <span className="absolute inset-0 -z-10">
            <svg width="248" height="78" viewBox="0 0 248 78" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                <path
                    d="M1.06779 10.802C-1.62851 6.13533 1.73924 0.300049 7.12885 0.300049H203.829C206.319 0.300049 208.621 1.62243 209.876 3.77295L246.859 67.1729C249.581 71.8395 246.215 77.7001 240.813 77.7001H43.76C41.2599 77.7001 38.9496 76.3667 37.6989 74.202L1.06779 10.802Z"
                    className="fill-white group-hover:fill-blue-50 transition-colors duration-500 stroke-slate-100/50"
                    strokeWidth="0.5"
                />
            </svg>
        </span>
    </Link>
)

export default function BrandLogoTicker() {
    return (
        <section className="py-24 bg-[#F8F9FB] overflow-hidden relative">
            {/* Decorative Side Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8F9FB] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8F9FB] to-transparent z-10 pointer-events-none" />

            <div className="flex flex-col gap-6 md:gap-10">

                {/* Marquee Left */}
                <div className="flex whitespace-nowrap">
                    <motion.div
                        className="flex items-center"
                        animate={{
                            x: [0, -2000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 60,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...logosSet1, ...logosSet1, ...logosSet1, ...logosSet1, ...logosSet1].map((n, i) => (
                            <BrandFrame key={i} num={n} />
                        ))}
                    </motion.div>
                </div>

                {/* Marquee Right */}
                <div className="flex whitespace-nowrap">
                    <motion.div
                        className="flex items-center"
                        animate={{
                            x: [-2000, 0],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 70,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...logosSet2, ...logosSet2, ...logosSet2, ...logosSet2, ...logosSet2].map((n, i) => (
                            <BrandFrame key={i} num={n} />
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
