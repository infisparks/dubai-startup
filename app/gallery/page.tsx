"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { Image as ImageIcon, Sparkles, UploadCloud, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function GalleryPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#034FA3] text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm"
                        >
                            <ImageIcon size={14} />
                            Visual Journey
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-6 lg:leading-[1.1]"
                        >
                            Event Gallery
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 text-lg sm:text-xl font-medium max-w-2xl mx-auto"
                        >
                            Capturing the memorable moments, groundbreaking innovations, and strategic connections from our summit.
                        </motion.p>
                    </div>

                    {/* Coming Soon Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="relative max-w-4xl mx-auto overflow-hidden rounded-[3rem] bg-white border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] p-12 sm:p-20 text-center"
                    >
                        {/* Background Accents */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#034FA3]/20 to-transparent" />
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />

                        <div className="relative z-10">
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, 0, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="inline-flex bg-blue-50 p-6 rounded-3xl mb-10 shadow-inner"
                            >
                                <UploadCloud size={48} className="text-[#034FA3]" />
                            </motion.div>

                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                                Photos Uploading Soon
                            </h2>
                            <p className="text-slate-500 text-lg sm:text-xl font-medium max-w-lg mx-auto mb-10">
                                We're currently curating and processing the best moments from the summit. Check back soon to see the visual highlights.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-6">
                                <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <Clock size={18} className="text-slate-400" />
                                    <span className="text-slate-600 font-semibold">Coming Soon</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100">
                                    <Sparkles size={18} className="text-[#034FA3]" />
                                    <span className="text-[#034FA3] font-semibold text-sm uppercase tracking-wider">Summit 2026</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer language={language} />
            <ScrollToTop />
        </div>
    )
}
