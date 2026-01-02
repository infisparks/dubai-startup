"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { galleryImages } from "@/lib/gallery-data"
import { ZoomIn } from "lucide-react"

export default function GalleryPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-white">
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                            Event Gallery
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Capturing the memorable moments from our summit.
                        </p>
                        <div className="mt-8 h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryImages.map((src, index) => (
                            <div
                                key={index}
                                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-lg cursor-pointer"
                                onClick={() => setSelectedImage(src)}
                            >
                                <img
                                    src={src}
                                    alt={`Gallery Image ${index + 1}`}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="bg-white/90 p-3 rounded-full backdrop-blur-sm shadow-xl transform scale-50 group-hover:scale-100 transition-all duration-300">
                                        <ZoomIn className="w-6 h-6 text-slate-900" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 transition-opacity duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt="Gallery Fullscreen"
                            className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                        />
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <Footer language={language} />
            <ScrollToTop />
        </div>
    )
}
