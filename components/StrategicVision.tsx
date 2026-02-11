'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, Lightbulb, Network, Zap } from 'lucide-react'
import Image from 'next/image'

const features = [
    {
        title: 'Capital Deployment',
        desc: 'Strategic allocation of high-impact venture capital.',
        icon: BarChart3,
        color: 'bg-blue-600'
    },
    {
        title: 'Strategic Synergy',
        desc: 'Bridging elite global investors with visionary founders.',
        icon: Users,
        color: 'bg-slate-800'
    },
    {
        title: 'Discovery Hub',
        desc: 'Establishing the UAE as a premier center for innovation.',
        icon: Zap,
        color: 'bg-blue-900/40'
    },
    {
        title: 'Venture Network',
        desc: 'Cultivating sustainable growth for future industry leaders.',
        icon: Network,
        color: 'bg-indigo-900/40'
    }
]

export default function StrategicVision() {
    return (
        <section className="bg-[#030719] py-24 relative overflow-hidden border-t border-white/5">
            {/* Background radial glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Strategic Vision</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                                Shaping the Future of <br />
                                <span className="text-blue-500">Global Investment</span>
                            </h2>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl font-medium border-l-2 border-blue-500/20 pl-6">
                                We provide a high-caliber platform designed to accelerate innovation and strategic capital deployment within the UAE's evolving business landscape.
                            </p>
                        </motion.div>

                        {/* Members Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:border-blue-500/30 transition-all duration-500"
                        >
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030719] bg-slate-800 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                                        <Image
                                            src={`/brand/${i}.png`}
                                            alt="network"
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Professional Investment Network</span>
                                <span className="text-xl font-black text-white tracking-tighter">100+ Global Members</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Grid - Scrollable on Mobile */}
                    <div className="flex overflow-x-auto lg:grid lg:grid-cols-2 gap-4 no-scrollbar pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth">
                        {features.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-blue-500/20 transition-all duration-500 group snap-center"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-black text-white mb-2 tracking-tight">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
