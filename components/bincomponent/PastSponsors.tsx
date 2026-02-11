"use client"

import Link from "next/link"
import { Star, ArrowUpRight } from "lucide-react"

// Assuming the logos are available in public/brand/
// Based on the user request, we need a "Past Sponsors" component.
// We will use 7placeholder logos or the ones found in brand/ for now.
const sponsors = [
    { id: "3", name: "Sponsor 3", logo: "/Sponsors/3.png" },
    { id: "4", name: "Sponsor 4", logo: "/Sponsors/4.png" },
    { id: "5", name: "Sponsor 5", logo: "/Sponsors/5.png" },
    { id: "6", name: "Sponsor 6", logo: "/Sponsors/6.png" },
    { id: "7", name: "Sponsor 7", logo: "/Sponsors/7.png" },
    { id: "8", name: "Sponsor 8", logo: "/Sponsors/8.png" },
    { id: "9", name: "Sponsor 9", logo: "/Sponsors/9.png" },
    { id: "10", name: "Sponsor 10", logo: "/Sponsors/10.png" },
]

export default function PastSponsors() {
    return (
        <section className="py-16 bg-slate-50 border-t border-slate-100 overflow-hidden flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#034FA3] text-xs font-semibold tracking-wide uppercase mb-3">
                    <Star className="w-3 h-3 fill-[#034FA3]" />
                    <span>Our Legacy Partners</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    OUR PAST SPONSORS
                </h2>
            </div>

            <div className="relative w-full overflow-hidden pause-on-hover px-4 mb-12">
                {/* Gradients to fade out edges */}
                <div className="absolute top-0 left-0 z-10 h-full w-20 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 z-10 h-full w-20 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

                <div className="flex w-max animate-marquee items-center text-center">
                    {/* First set of logos */}
                    <div className="flex items-center gap-12 sm:gap-20 px-6 sm:px-10">
                        {sponsors.map((sponsor, index) => (
                            <Link
                                key={`sponsor-1-${index}`}
                                href={`/partner/${sponsor.id}`}
                                className="relative group flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="h-12 sm:h-16 w-auto object-contain max-w-[150px] transition-all duration-300"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Duplicate set for infinite scroll */}
                    <div className="flex items-center gap-12 sm:gap-20 px-6 sm:px-10">
                        {sponsors.map((sponsor, index) => (
                            <Link
                                key={`sponsor-2-${index}`}
                                href={`/partner/${sponsor.id}`}
                                className="relative group flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="h-12 sm:h-16 w-auto object-contain max-w-[150px] transition-all duration-300"
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Third set to ensure no gaps on very large screens */}
                    <div className="flex items-center gap-12 sm:gap-20 px-6 sm:px-10">
                        {sponsors.map((sponsor, index) => (
                            <Link
                                key={`sponsor-3-${index}`}
                                href={`/partner/${sponsor.id}`}
                                className="relative group flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="h-12 sm:h-16 w-auto object-contain max-w-[150px] transition-all duration-300"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* View All Partners Action */}
            <Link
                href="/brands"
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-[#034FA3] hover:text-white hover:border-[#034FA3] transition-all duration-500 shadow-sm"
            >
                <span>View All Partnerships</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
        </section>
    )
}
