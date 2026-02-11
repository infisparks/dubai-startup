"use client"

import React, { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import Contact from "@/components/bincomponent/contact"

export default function ContactPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    return (
        <div className="min-h-screen bg-white">
            <Header language={language} setLanguage={setLanguage} />
            <main className="pt-20">
                <Contact language={language} />
            </main>
            <Footer language={language} />
        </div>
    )
}
