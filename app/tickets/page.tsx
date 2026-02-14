"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, ArrowRight, Clock, AlertCircle, Sparkles, Zap, Lock } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TicketsPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    // Countdown Logic for February 25, 2026
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const targetDate = new Date("2026-02-25T00:00:00").getTime()

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const difference = targetDate - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            } else {
                clearInterval(timer)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Mock Event Data
    const events = [
        {
            id: "dubai-summit-2026",
            title: "Investarise Dubai Global Summit 2026",
            date: "Feb 20, 2026",
            location: "Taj Exotica Resort & Spa, The Palm",
            image: "/day11.jpg",
            status: "Registration Closed",
            time: "07:00 AM - 11:00 PM",
            description: "Join 100+ global investors and 250+ elite startups for a transformative day of deal-making and insights."
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50/50 selection:bg-[#034FA3] selection:text-white">
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-28 pb-20">

                {/* Compact Page Header */}
                <div className="max-w-5xl mx-auto px-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6"
                    >
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                                Event Schedule
                            </h1>
                            <p className="text-sm text-slate-500 font-medium max-w-lg">
                                Access world-class investment summits and network with industry leaders.
                            </p>
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-lg">
                            Year 2026
                        </div>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto px-6">
                    {/* Featured Upcoming Event Card - Matching Standard Design */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative mb-8 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                        <div className="flex flex-col md:flex-row min-h-[220px]">

                            {/* Left Side: Countdown Placeholder (In place of Event Image) */}
                            <div className="md:w-72 bg-[#034FA3] relative shrink-0 flex flex-col items-center justify-center p-6 overflow-hidden">
                                {/* Background Accents */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#034FA3] to-[#012a57]" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl" />

                                <div className="relative z-10 w-full">
                                    <div className="text-center mb-3">
                                        <span className="text-[9px] font-black text-blue-200 uppercase tracking-[0.2em]">Launch Reveal</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { val: timeLeft.days, label: 'D' },
                                            { val: timeLeft.hours, label: 'H' },
                                            { val: timeLeft.minutes, label: 'M' },
                                            { val: timeLeft.seconds, label: 'S' }
                                        ].map((item, i) => (
                                            <div key={i} className="text-center">
                                                <div className="h-10 flex items-center justify-center bg-white/10 rounded-lg border border-white/10 mb-1">
                                                    <span className="text-sm font-black text-white tabular-nums">
                                                        {String(item.val).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <div className="text-[7px] font-bold text-blue-200/50 uppercase">
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute top-3 left-3 bg-white/95 text-[#034FA3] px-2.5 py-1 rounded-lg flex flex-col items-center shadow-lg z-20">
                                    <span className="text-[8px] font-black uppercase tracking-tighter leading-none mb-0.5">TBA</span>
                                    <span className="text-sm font-black leading-none">2026</span>
                                </div>
                            </div>

                            {/* Right Side: Content (Matching standard design with blur) */}
                            <div className="flex-1 p-6 flex flex-col justify-center relative bg-white">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 text-[#034FA3] border border-blue-100 text-[10px] font-bold uppercase tracking-wide">
                                        <Zap size={10} className="fill-current" />
                                        <span>Registration Soon</span>
                                    </div>
                                </div>

                                <div className="relative mb-3">
                                    <h2 className="text-xl font-black text-slate-800 leading-tight blur-[5px] select-none opacity-40">
                                        Undisclosed Dubai Elite Summit 2026
                                    </h2>
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="inline-flex items-center gap-2 text-[#034FA3] font-black text-xs uppercase tracking-widest bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-100/50">
                                            <Sparkles size={12} className="text-blue-500" />
                                            <span>Revealing Soon</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-500 mb-4 opacity-30 select-none">
                                    <div className="flex items-center gap-1.5 blur-[4px]">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>Prestigious Dubai Venue</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 blur-[4px]">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>Full Event Schedule</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Stay Tuned
                                    </span>
                                    <div className="inline-flex items-center gap-2 text-xs font-black text-blue-400 cursor-not-allowed">
                                        <span>Details Locked</span>
                                        <Lock size={12} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Compact Events List */}
                    <div className="space-y-6">
                        {events.map((event, idx) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-[#034FA3]/20 transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row h-full">

                                    {/* Compact Image Section */}
                                    <div className="md:w-64 lg:w-72 relative h-48 md:h-auto shrink-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-slate-900/10 z-10 transition-colors group-hover:bg-transparent" />
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Minimal Date Badge */}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-900 px-3 py-1.5 rounded-lg flex flex-col items-center shadow-sm z-20 border border-white/50">
                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-0.5 text-slate-500">Feb</span>
                                            <span className="text-lg font-black leading-none">20</span>
                                        </div>
                                    </div>

                                    {/* Compact Content Section */}
                                    <div className="flex-1 p-6 flex flex-col justify-center relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold uppercase tracking-wide">
                                                <AlertCircle size={10} className="text-red-500" />
                                                <span>{event.status}</span>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-[#034FA3] transition-colors">
                                            {event.title}
                                        </h2>

                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-500 mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="line-clamp-1">{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                {event.time}
                                            </div>
                                        </div>

                                        <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2 max-w-2xl">
                                            {event.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                Event Completed
                                            </span>
                                            <Link
                                                href={`/tickets/dubai-summit-2026`}
                                                className="inline-flex items-center gap-2 text-xs font-black text-[#034FA3] hover:text-[#023e8a] transition-colors group/link"
                                            >
                                                <span>View Full Details</span>
                                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </main>
            <Footer language={language} />
        </div>
    )
}
