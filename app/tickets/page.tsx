"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TicketsPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

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

                {/* Compact Events List */}
                <div className="max-w-5xl mx-auto px-6">
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
