"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, CheckCircle2, ChevronLeft, AlertCircle, Clock, QrCode } from "lucide-react"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function EventTicketPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const params = useParams()
    const eventId = params.id as string

    const event = {
        id: "dubai-summit-2026",
        title: "Investarise Dubai Global Summit",
        year: "2026",
        date: "20",
        month: "FEB",
        location: "Taj Exotica Resort & Spa",
        time: "07:00 AM - 11:00 PM",
        description: "Join 100+ global investors and 250+ elite startups (Registration Closed).",
        image: "/day11.jpg",
        status: "Registration Closed"
    }

    const ticketTypes = [
        {
            id: "investor",
            title: "INVESTOR PASS",
            price: "$500",
            features: ["Investor Lounge Access", "Deal Flow Preview", "VIP Gala Dinner"],
            admit: "VIP ACCESS",
            color: "bg-[#034FA3]", // Brand Blue
            textColor: "text-[#034FA3]"
        },
        {
            id: "startup",
            title: "STARTUP DELEGATE",
            price: "$500",
            features: ["Full Summit Access", "Pitch Entry", "Gala Dinner Included"],
            admit: "DELEGATE",
            color: "bg-emerald-600",
            textColor: "text-emerald-600"
        },
        {
            id: "exhibitor",
            title: "EXHIBITOR PACKAGE",
            price: "$1000",
            features: ["Premium Booth 3x3m", "2 VIP Passes", "Logo on Main Stage"],
            admit: "EXHIBITOR",
            color: "bg-purple-600",
            textColor: "text-purple-600"
        }
    ]

    return (
        <div className="min-h-screen bg-slate-100 selection:bg-[#034FA3] selection:text-white pb-20">
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-28 pb-12">
                <div className="max-w-5xl mx-auto px-4 md:px-6">
                    {/* Back Link */}
                    <div className="mb-8">
                        <Link href="/tickets" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#034FA3] transition-colors uppercase tracking-widest">
                            <ChevronLeft size={16} />
                            Back to Schedule
                        </Link>
                    </div>

                    {/* Page Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 uppercase">
                            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#034FA3] to-blue-400">Summit Tickets</span>
                        </h1>
                        <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm">
                            Registration for this event is currently marked as closed.
                        </p>
                    </div>

                    {/* Ticket Stack */}
                    <div className="space-y-8">
                        {ticketTypes.map((ticket, idx) => (
                            <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                                className="relative w-full max-w-4xl mx-auto filter drop-shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-300"
                            >
                                {/* Ticket Container */}
                                <div className="flex flex-col md:flex-row bg-[#FDFBF7] rounded-[20px] overflow-hidden min-h-[220px]">

                                    {/* MAIN LEFT SECTION */}
                                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative border-r-2 border-dashed border-slate-300">

                                        {/* Ticket Header */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-1">
                                                    Investarise Summit
                                                </div>
                                                <h2 className={`text-3xl md:text-4xl font-black ${ticket.textColor} leading-none tracking-tight uppercase`}>
                                                    {ticket.title}
                                                </h2>
                                            </div>
                                            <div className="hidden sm:block text-right">
                                                <div className="text-2xl font-black text-slate-900 line-through opacity-40">{ticket.price}</div>
                                                <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest border border-red-200 bg-red-50 px-2 py-0.5 rounded">
                                                    Sold Out
                                                </div>
                                            </div>
                                        </div>

                                        {/* Show Date on Left for Mobile */}
                                        <div className="md:hidden mb-4 flex gap-4 text-xs font-bold text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} className="text-[#034FA3]" />
                                                {event.date} {event.month} {event.year}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} className="text-[#034FA3]" />
                                                07:00 AM
                                            </div>
                                        </div>

                                        {/* Features & Barcode Row */}
                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                            <div className="space-y-1.5">
                                                {ticket.features.map((feat, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <CheckCircle2 size={14} className="text-slate-300" />
                                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{feat}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Barcode Visual */}
                                            <div className="space-y-1 opacity-40 grayscale">
                                                <div className="h-8 flex items-end gap-[2px]">
                                                    {Array.from({ length: 40 }).map((_, i) => (
                                                        <div key={i} className="bg-slate-900 w-[2px]" style={{ height: `${Math.random() * 100}%` }} />
                                                    ))}
                                                </div>
                                                <div className="text-[9px] font-mono tracking-[0.3em] text-slate-400 text-center">
                                                    0923-9213-421
                                                </div>
                                            </div>
                                        </div>

                                        {/* Decoration Circles (Perforation effect) */}
                                        <div className="absolute -right-3 top-0 bottom-0 flex flex-col justify-between py-2 pointer-events-none">
                                            {/* Top Cutout */}
                                            <div className="w-6 h-6 rounded-full bg-slate-100 absolute -top-3 right-0 translate-x-1/2" />
                                            {/* Bottom Cutout */}
                                            <div className="w-6 h-6 rounded-full bg-slate-100 absolute -bottom-3 right-0 translate-x-1/2" />
                                        </div>
                                    </div>

                                    {/* STUB RIGHT SECTION */}
                                    <div className={`${ticket.color} w-full md:w-48 p-6 relative text-white flex flex-row md:flex-col justify-between items-center md:items-start`}>
                                        {/* Left Perforation Dots on Stub */}
                                        <div className="absolute left-0 top-2 bottom-2 w-[2px] flex flex-col gap-1 -translate-x-1/2">
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <div key={i} className="w-[4px] h-[4px] bg-slate-100 rounded-full" />
                                            ))}
                                        </div>

                                        <div className="flex flex-col items-center md:items-start">
                                            <div className="text-6xl font-black leading-none tracking-tighter opacity-90">
                                                {event.date}
                                            </div>
                                            <div className="text-xl font-bold uppercase tracking-[0.2em] opacity-80">
                                                {event.month}
                                            </div>
                                            <div className="text-xs font-medium opacity-60 mt-1">
                                                {event.year}
                                            </div>
                                        </div>

                                        <div className="hidden md:block h-full w-[1px] bg-white/20 mx-auto my-4" />

                                        <div className="flex flex-col items-end md:items-start">
                                            <div className="rotate-0 md:-rotate-90 md:origin-bottom-left md:translate-x-full md:whitespace-nowrap md:mb-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                                                {ticket.admit}
                                            </div>

                                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm mt-auto">
                                                <QrCode className="w-8 h-8 opacity-80" />
                                            </div>
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
