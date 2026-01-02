"use client"

import React from "react"
import { Star } from "lucide-react"

// Assuming the logos are available in public/brand/
// Based on the user request, we need a "Past Sponsors" component.
// We will use 7placeholder logos or the ones found in brand/ for now.
const sponsors = [
    { name: "Sponsor 1", logo: "/brand/1.png" },
    { name: "Sponsor 2", logo: "/brand/2.png" },
    { name: "Sponsor 3", logo: "/brand/3.png" },
    { name: "Sponsor 4", logo: "/brand/4.png" },
    { name: "Sponsor 5", logo: "/brand/5.png" },
    { name: "Sponsor 6", logo: "/brand/6.png" },
    { name: "Sponsor 7", logo: "/brand/7.png" },
]

export default function PastSponsors() {
    return (
        <section className="py-12 bg-slate-50 border-t border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-3">
                    <Star className="w-3 h-3 fill-blue-600" />
                    <span>Our Legacy Partners</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    OUR PAST SPONSORS
                </h2>
            </div>

            <div className="relative w-full overflow-hidden pause-on-hover px-4">
                {/* Gradients to fade out edges */}
                <div className="absolute top-0 left-0 z-10 h-full w-20 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 z-10 h-full w-20 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

                <div className="flex w-max animate-marquee items-center">
                    {/* First set of logos */}
                    <div className="flex items-center gap-12 sm:gap-20 px-6 sm:px-10">
                        {sponsors.map((sponsor, index) => (
                            <div
                                key={`sponsor-1-${index}`}
                                className="relative group flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="h-12 sm:h-16 w-auto object-contain max-w-[150px]"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Duplicate set for infinite scroll */}
                    <div className="flex items-center gap-12 sm:gap-20 px-6 sm:px-10">
                        {sponsors.map((sponsor, index) => (
                            <div
                                key={`sponsor-2-${index}`}
                                className="relative group flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="h-12 sm:h-16 w-auto object-contain max-w-[150px]"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Third set to ensure no gaps on wide screens if needed, 
                 though 2 sets * usually enough if width is filled. 
                 Adding a 3rd set for safety on very large screens. */}
                    <div className="flex items-center gap-12 sm:gap-20 px-6 sm:px-10">
                        {sponsors.map((sponsor, index) => (
                            <div
                                key={`sponsor-3-${index}`}
                                className="relative group flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="h-12 sm:h-16 w-auto object-contain max-w-[150px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
