"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { galleryImages } from "@/lib/gallery-data"
import { ZoomIn, Image as ImageIcon, Sparkles, X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function GalleryPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-20">
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

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                        {galleryImages.map((src, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 3) * 0.1 }}
                                className="group relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(3,79,163,0.12)] transition-all duration-500 cursor-pointer border border-slate-100"
                                onClick={() => setSelectedImage(src)}
                            >
                                <div className="relative w-full h-full overflow-hidden rounded-[2rem]">
                                    <Image
                                        src={src}
                                        alt={`Gallery Image ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white/90 p-4 rounded-full backdrop-blur-md shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-500">
                                            <ZoomIn className="w-6 h-6 text-[#034FA3]" />
                                        </div>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <Sparkles size={10} className="text-amber-300" />
                                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Summit 2026</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl w-full h-full flex items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Gallery Fullscreen"
                                width={1600}
                                height={1200}
                                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(3,79,163,0.3)]"
                                unoptimized
                            />

                            {/* Close Button */}
                            <button
                                className="absolute top-0 right-0 -mt-12 sm:-mt-16 sm:-mr-8 text-white/50 hover:text-white transition-colors p-4"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={40} strokeWidth={1.5} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer language={language} />
            <ScrollToTop />
        </div>
    )
}
