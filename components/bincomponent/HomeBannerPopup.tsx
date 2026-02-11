"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { X, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

// Module-level variable to track if popup has been shown in the current page session.
// This persists across client-side navigations (e.g. Home -> Register -> Back to Home)
// BUT resets when the page is hard-reloaded (F5), satisfying the user's requirement.
let hasShownSessionPopup = false

export default function HomeBannerPopup() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // If already shown in this SPA session, do not show again
        if (hasShownSessionPopup) return

        const timer = setTimeout(() => {
            setIsVisible(true)
            hasShownSessionPopup = true
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const closePopup = () => {
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn transition-all">
            <div
                className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn flex flex-col max-h-[90vh]"
                role="dialog"
                aria-modal="true"
            >
                {/* Close Button - Floats above image */}
                <button
                    onClick={closePopup}
                    className="absolute top-3 right-3 z-20 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-800 hover:text-black transition-all duration-200 border border-white/30 shadow-sm"
                    aria-label="Close popup"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image Section - Flexible height but respects aspect ratio */}
                <div className="relative w-full bg-slate-50 flex-grow overflow-hidden flex items-center justify-center min-h-[300px]">
                    <Image
                        src="/hero.jpg"
                        alt="Investarise Global Investors Summit 2026"
                        width={800}
                        height={600}
                        className="w-full h-auto max-h-[60vh] object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>

                {/* Footer / CTA Section */}
                <div className="bg-white p-5 sm:p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-5 shrink-0">

                    <div className="flex flex-col gap-2 text-center sm:text-left w-full sm:w-auto">
                        {/* Event details removed as it is completed */}
                    </div>

                    <Link
                        href="/registration"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transform hover:-translate-y-0.5 active:scale-95 transition-all duration-200 whitespace-nowrap text-sm sm:text-base"
                        onClick={closePopup}
                    >
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    )
}
