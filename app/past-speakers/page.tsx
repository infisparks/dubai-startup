"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { pastSpeakersData } from "@/lib/past-speakers-data"

export default function PastSpeakersPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    return (
        <div className="min-h-screen bg-slate-50">
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                            Our Past Speakers
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            We are proud to have hosted these distinguished leaders and visionaries in our journey.
                        </p>
                        <div className="mt-8 h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {pastSpeakersData.map((speaker, index) => (
                            <div
                                key={`${speaker.name}-${index}`}
                                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group border border-slate-100"
                            >
                                <div className="relative w-40 h-40 rounded-full mb-6 overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 ring-4 ring-slate-50">
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                                    {speaker.name}
                                </h3>

                                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full my-4 opacity-80" />

                                <p className="text-slate-600 font-medium leading-relaxed">
                                    {speaker.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer language={language} />
            <ScrollToTop />
        </div>
    )
}
