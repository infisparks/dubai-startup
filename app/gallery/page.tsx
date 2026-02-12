"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { motion } from "framer-motion"
import { ImageIcon, Clock } from "lucide-react"

export default function GalleryPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col">
            <Header language={language} setLanguage={setLanguage} />

            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-50 text-[#034FA3] mb-8 shadow-lg shadow-blue-900/5"
                    >
                        <ImageIcon size={48} strokeWidth={1.5} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-6 lg:leading-[1.1]"
                    >
                        Gallery Coming Soon
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg sm:text-xl font-medium max-w-2xl mx-auto mb-10"
                    >
                        We are currently curating the best moments from our events.
                        Please check back soon for the visual journey.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold"
                    >
                        <Clock size={16} />
                        <span>Uploading in progress...</span>
                    </motion.div>
                </div>
            </main>

            <Footer language={language} />
            <ScrollToTop />
        </div>
    )
}
