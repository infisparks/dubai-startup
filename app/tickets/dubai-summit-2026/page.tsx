"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, CheckCircle2, ChevronLeft, AlertCircle, Clock, QrCode } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function StartUpAndInvestorEventPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    // Event Details
    const event = {
        title: "DUBAI GLOBAL SUMMIT",
        subtitle: "INVESTMENT EVENT",
        year: "2026",
        date: "20",
        month: "FEB",
        location: "TAJ EXOTICA RESORT",
        time: "07:00 AM",
        end_time: "11:00 PM"
    }

    // Static Ticket Data
    const ticketTypes = [
        {
            id: "investor",
            title: "INVESTOR PASS",
            price: "$500",
            features: ["Investor Lounge", "Deal Flow", "Gala Dinner"],
            admit: "VIP ACCESS",
            // Red Theme like reference
            bgGradient: "bg-gradient-to-br from-red-600 to-red-900",
            textColor: "text-white",
            accentColor: "text-yellow-400",
            borderColor: "border-red-800",
            stubBg: "bg-red-950",
            soldOut: true
        },
        {
            id: "startup",
            title: "STARTUP DELEGATE",
            price: "$500",
            features: ["Full Access", "Pitch Entry", "Gala Dinner"],
            admit: "DELEGATE",
            // Blue Theme (Brand)
            bgGradient: "bg-gradient-to-br from-[#034FA3] to-[#012a5e]",
            textColor: "text-white",
            accentColor: "text-blue-300",
            borderColor: "border-blue-900",
            stubBg: "bg-[#011e4d]",
            soldOut: true
        },
        {
            id: "exhibitor",
            title: "EXHIBITOR PACKAGE",
            price: "$1000",
            features: ["Premium Booth", "2 VIP Passes", "Logo on Stage"],
            admit: "EXHIBITOR",
            // Purple Theme
            bgGradient: "bg-gradient-to-br from-purple-600 to-purple-900",
            textColor: "text-white",
            accentColor: "text-purple-300",
            borderColor: "border-purple-800",
            stubBg: "bg-purple-950",
            soldOut: true
        }
    ]

    return (
        <div className="min-h-screen bg-slate-900 selection:bg-red-500 selection:text-white pb-20 relative overflow-hidden">
            <Header language={language} setLanguage={setLanguage} />

            {/* Background Image - Styled to look like a high-end event backdrop */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-slate-900/80 z-10" />
                <img
                    src="/day11.jpg" // Using this as the event background placeholder
                    alt="Burj Khalifa Dubai Background"
                    className="w-full h-full object-cover opacity-50 blur-sm"
                />
            </div>

            <main className="pt-32 pb-20 relative z-10">
                <div className="max-w-6xl mx-auto px-4 md:px-6">

                    {/* Back Link */}
                    <div className="mb-12 flex justify-center md:justify-start">
                        <Link href="/tickets" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-[0.2em] group">
                            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Events
                        </Link>
                    </div>

                    {/* Page Title */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase drop-shadow-xl">
                            Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">Pass</span>
                        </h1>
                        <p className="text-slate-400 font-medium max-w-xl mx-auto text-sm tracking-wide">
                            Secure your spot at the most prestigious investment summit of 2026.
                        </p>
                    </div>

                    {/* Ticket Stack */}
                    <div className="flex flex-col items-center gap-12">
                        {ticketTypes.map((ticket, idx) => (
                            <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                                className="w-full max-w-5xl group"
                            >
                                <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] bg-transparent transform transition-transform duration-300 hover:scale-[1.01]">

                                    {/* --- MAIN TICKET LEFT --- */}
                                    <div className={`flex-1 p-6 md:p-8 relative ${ticket.bgGradient} text-white overflow-hidden flex flex-col justify-between min-h-[280px]`}>

                                        {/* Grunge Texture Overlay */}
                                        <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]" />
                                        {/* Speckles */}
                                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                                        {/* SOLD OUT STAMP OVERLAY */}
                                        {ticket.soldOut && (
                                            <div className="absolute top-1/2 left-1/2 md:left-auto md:right-16 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 z-30 pointer-events-none">
                                                <div className="border-[6px] border-red-500/70 text-red-500/70 text-4xl md:text-6xl font-black uppercase tracking-widest px-6 py-2 -rotate-12 rounded-xl mix-blend-color-dodge opacity-80 shadow-sm backdrop-blur-[1px]">
                                                    Sold Out
                                                </div>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="relative z-10 flex flex-col flex-1 justify-between gap-6">

                                            {/* Header */}
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-1">
                                                        Investarise Presents
                                                    </h4>
                                                    {/* "After Show" Badge */}
                                                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border-2 border-dashed border-white/30 p-1 rotate-12 bg-black/20 backdrop-blur-sm shadow-xl">
                                                        <div className="text-center">
                                                            <div className="text-[7px] font-bold uppercase tracking-widest text-white/70">Includes</div>
                                                            <div className="text-[8px] font-black uppercase text-white leading-tight">Gala<br />Dinner</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-[0.85] tracking-tighter mb-2 drop-shadow-lg">
                                                    {event.title}
                                                </h2>
                                                <h3 className={`text-lg md:text-xl font-black ${ticket.accentColor} uppercase tracking-widest bg-black/20 inline-block px-2 transform -skew-x-12`}>
                                                    {ticket.title}
                                                </h3>
                                            </div>

                                            {/* Access / Features List - Compact */}
                                            <div className="mt-2 mb-2">
                                                <div className="text-[9px] font-bold text-white/60 uppercase tracking-widest mb-2 border-b border-white/20 pb-1 inline-block">
                                                    Access & Inclusions
                                                </div>
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                                                    {ticket.features.map((feat, i) => (
                                                        <div key={i} className="flex items-center gap-2">
                                                            <CheckCircle2 size={10} className={`shrink-0 ${ticket.accentColor.replace('text-', 'text-')}`} />
                                                            <span className="text-[9px] md:text-[10px] font-bold text-white/90 uppercase tracking-wide leading-tight">
                                                                {feat}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Info Row - Compact */}
                                            <div className="flex flex-wrap items-center gap-6 md:gap-12 border-t border-white/20 pt-4 mt-auto">
                                                <div>
                                                    <span className="block text-[8px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Date</span>
                                                    <span className="text-lg md:text-xl font-black leading-none">{event.date} {event.month}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-[8px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Time</span>
                                                    <span className="text-lg md:text-xl font-black leading-none">{event.time}</span>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <span className="block text-[8px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Year</span>
                                                    <span className="text-lg md:text-xl font-black leading-none">{event.year}</span>
                                                </div>
                                            </div>

                                            {/* Barcode - Compact */}
                                            <div className="mt-2 text-center opacity-80">
                                                <div className="h-6 md:h-8 w-full flex items-end justify-center gap-[2px] md:justify-start">
                                                    {Array.from({ length: 50 }).map((_, i) => (
                                                        <div key={i} className="bg-white" style={{ width: Math.random() > 0.5 ? '2px' : '4px', height: '100%' }} />
                                                    ))}
                                                </div>
                                                <div className="text-[7px] font-mono tracking-[0.5em] mt-1 text-white/60 text-left">
                                                    NO: 4015 5620 00{idx + 1}
                                                </div>
                                            </div>

                                        </div>

                                        {/* Perforation Circles */}
                                        <div className="absolute top-0 bottom-0 -right-3 z-20 flex flex-col justify-between py-4">
                                            <div className="w-6 h-6 rounded-full bg-slate-900 absolute -top-3 right-0 translate-x-1/2" />
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <div key={i} className="w-1 h-1 rounded-full bg-slate-900/50 my-auto mx-auto" />
                                            ))}
                                            <div className="w-6 h-6 rounded-full bg-slate-900 absolute -bottom-3 right-0 translate-x-1/2" />
                                        </div>
                                    </div>


                                    {/* --- STUB RIGHT --- */}
                                    <div className={`w-full md:w-56 p-6 relative ${ticket.stubBg} text-white flex flex-row md:flex-col justify-between items-center md:items-start border-l-2 border-dashed border-white/10`}>

                                        {/* Vertical Text */}
                                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-[35%] origin-center rotate-90 whitespace-nowrap pointer-events-none">
                                            <span className="text-4xl font-black text-white/10 tracking-tighter uppercase select-none">
                                                {event.title}
                                            </span>
                                        </div>

                                        <div className="relative z-10">
                                            <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Admit One</div>
                                            <div className="text-xl font-black uppercase tracking-tight text-white mb-2 leading-none">
                                                {ticket.admit}
                                            </div>
                                            <div className="text-[9px] uppercase font-bold text-white/40 tracking-widest">
                                                {event.location}
                                            </div>
                                        </div>

                                        <div className="relative z-10 mt-auto flex flex-col items-end md:items-start">
                                            <div className="text-2xl font-black mb-2 opacity-50 line-through decoration-white/50">{ticket.price}</div>

                                            <div className="bg-white p-1.5 rounded-lg inline-block">
                                                <QrCode size={32} className="text-black" />
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
