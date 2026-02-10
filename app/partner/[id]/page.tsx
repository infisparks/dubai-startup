'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import {
    Instagram,
    Share2,
    ChevronLeft,
    ShieldCheck,
    Globe,
    Award,
    Sparkles,
    Copy,
    CheckCircle2,
    Crown
} from 'lucide-react'

// Professional Partner Details
const partnerDetails: Record<string, { name: string; category: string; desc: string; motto: string }> = {
    '1': { name: 'Al Ghurair Group', category: 'Platinum Strategic Partner', motto: 'Legacy of Innovation', desc: 'A pillar of UAE innovation and diversified investment excellence, driving regional economic growth for decades.' },
    '2': { name: 'Emaar Properties', category: 'Grand Development Partner', motto: 'Building the Future', desc: 'Shaping the global horizon through visionary architecture and urban design that redefines modern living.' },
    '3': { name: 'Mubadala', category: 'Sovereign Investment Partner', motto: 'Global Future Focused', desc: 'Driving sustainable financial growth and managing massive portfolios for national and global prosperity.' },
    '4': { name: 'ADIA', category: 'Global Financial Custodian', motto: 'Prudence & Prosperity', desc: 'Managing capital with unparalleled global foresight and strategic long-term goals for future generations.' },
    '5': { name: 'DP World', category: 'Strategic Logistics Titan', motto: 'Smarter Trade', desc: 'Enabling smarter global trade flow through advanced maritime solutions and cutting-edge digital logistics.' },
    'default': { name: 'Global Strategic Partner', category: 'Elite Supporter', motto: 'Visionary Excellence', desc: 'A key visionary partner enabling the future of global investment, innovation, and strategic synergy.' }
}

export default function PartnerDetail() {
    const params = useParams()
    const id = params?.id as string
    const partner = partnerDetails[id] || partnerDetails['default']
    const [copied, setCopied] = React.useState(false)

    const handleShare = async () => {
        const shareData = {
            title: `Official Partner: ${partner.name}`,
            text: `Honored to be an Official Partner of Investarise & Dubai Startup Summit! 🚀`,
            url: window.location.href,
        }
        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                copyLink()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const shareOnWhatsApp = () => {
        const text = `Honored to be an Official Partner of Investarise & Dubai Startup Summit! 🚀`
        const url = window.location.href
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { staggerChildren: 0.1, delayChildren: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <main className="min-h-screen bg-[#01040D] text-white flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-blue-600/30 overflow-hidden relative">

            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,64,175,0.2)_0%,rgba(1,4,13,1)_80%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.04] flex items-center justify-center grayscale overflow-hidden">
                    <Image src={`/brand/${id}.png`} alt="Watermark" width={1000} height={1000} className="object-contain scale-150 animate-pulse-slow" priority />
                </div>
                {/* Floating Particles Placeholder Effect */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
            </div>

            {/* Top Navigation */}
            <div className="w-full max-w-2xl flex items-center justify-between mb-8 relative z-20">
                <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Portal</span>
                </Link>
                <div className="flex items-center gap-2 bg-blue-600/10 px-4 py-2 rounded-full border border-blue-500/20 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Strategic Alliance</span>
                </div>
            </div>

            {/* THE EXECUTIVE CARD */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative w-full max-w-2xl"
            >
                {/* Outer Card Luxury Glow */}
                <div className="absolute -inset-[2px] bg-gradient-to-tr from-blue-600/40 via-blue-400/20 to-indigo-600/40 rounded-[2.5rem] blur-sm animate-border-flow" />

                {/* Main Card Surface */}
                <div className="relative bg-[#020817]/95 backdrop-blur-3xl rounded-[2.4rem] overflow-hidden shadow-[0_48px_80px_-16px_rgba(0,0,0,0.8)] border border-white/10">

                    {/* Top Aesthetic Header with Summit Logo */}
                    <div className="relative py-6 px-12 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Image src="/logo-white.png" alt="Investarise" width={140} height={40} className="h-8 w-auto object-contain" />
                        </div>
                        <Crown size={20} className="text-amber-500/40" />
                    </div>

                    <div className="p-8 sm:p-14 flex flex-col items-center">

                        {/* Partner Logo Stage - Interlocked with Summit branding */}
                        <motion.div variants={itemVariants} className="relative mb-12">
                            <div className="absolute -inset-10 bg-blue-600/20 rounded-full blur-[80px] animate-pulse" />
                            <div className="relative">
                                <div className="absolute -top-4 -right-4 z-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-2 border-[#020817] shadow-xl">
                                    <Sparkles size={14} className="text-white animate-spin-slow" />
                                </div>
                                <div className="relative w-full max-w-[320px] sm:max-w-[400px] aspect-[2/1] bg-white rounded-2xl p-6 sm:p-10 flex items-center justify-center shadow-2xl border border-white/10 transition-transform duration-700 hover:scale-[1.02]">
                                    <Image
                                        src={`/brand/${id}.png`}
                                        alt={partner.name}
                                        width={400}
                                        height={200}
                                        className="object-contain w-full h-full"
                                        priority
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Title & Badge */}
                        <motion.div variants={itemVariants} className="text-center space-y-5 mb-12 w-full">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400">
                                <Award size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Strategic Global Partner</span>
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none text-white drop-shadow-2xl">
                                {partner.name}
                            </h1>
                            <div className="h-px w-12 bg-blue-500 mx-auto opacity-50" />
                            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-[0.5em]">
                                {partner.category}
                            </p>
                        </motion.div>

                        {/* Description & Motto */}
                        <motion.div variants={itemVariants} className="text-center space-y-6 mb-12 relative">
                            {/* Decorative quotes */}
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-white/5 font-serif italic">"</span>
                            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-light max-w-lg mx-auto italic">
                                {partner.desc}
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-4 bg-slate-800" />
                                <p className="text-[11px] font-black text-blue-500 uppercase tracking-widest">
                                    {partner.motto}
                                </p>
                                <div className="h-px w-4 bg-slate-800" />
                            </div>
                        </motion.div>

                        {/* Verified Footer Block */}
                        <motion.div variants={itemVariants} className="w-full pt-10 border-t border-white/5 grid grid-cols-2 gap-8 text-center text-slate-600">
                            <div>
                                <ShieldCheck size={18} className="mx-auto mb-2 text-blue-500/40" />
                                <p className="text-[9px] font-black uppercase tracking-widest">Global Authentication</p>
                                <p className="text-[8px] opacity-60">Verified Portfolio Partner</p>
                            </div>
                            <div>
                                <Globe size={18} className="mx-auto mb-2 text-blue-500/40" />
                                <p className="text-[9px] font-black uppercase tracking-widest">Summit 2026 Presence</p>
                                <p className="text-[8px] opacity-60">Strategic Dubai Network</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements around the card */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/5 blur-3xl -z-10" />
            </motion.div>

            {/* ACTION CENTER */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="w-full max-w-2xl mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20"
            >
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-3 p-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 group shadow-lg"
                >
                    {copied ? <CheckCircle2 size={16} /> : <Share2 size={16} className="group-hover:scale-110 transition-transform" />}
                    {copied ? 'Link Secured' : 'Share Partnership'}
                </button>
                <button
                    onClick={shareOnWhatsApp}
                    className="flex items-center justify-center gap-3 p-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 hover:border-green-500 transition-all duration-300 group shadow-lg"
                >
                    <Share2 size={16} className="group-hover:scale-110 transition-transform" />
                    WhatsApp Share
                </button>
            </motion.div>

            {/* Final Branding Layer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.2 }}
                className="mt-12 flex flex-col items-center gap-4"
            >
                <Image src="/logo-white.png" alt="Investarise" width={100} height={30} className="grayscale opacity-50" />
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-600">
                    Propelled by Investarise
                </p>
            </motion.div>

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.04; transform: translate(-50%, -50%) scale(1.5); }
                    50% { opacity: 0.08; transform: translate(-50%, -50%) scale(1.6); }
                }
                @keyframes border-flow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }
                .animate-border-flow { background-size: 200% 200%; animation: border-flow 6s ease infinite; }
                .animate-spin-slow { animation: spin-slow 4s linear infinite; }
            `}</style>
        </main>
    )
}
