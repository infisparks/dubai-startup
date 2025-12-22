'use client'

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Schedule from "@/components/Schedules"

export default function AgendaPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    return (
        <div className="min-h-screen bg-white">
            <Header language={language} setLanguage={setLanguage} />
            <main className="pt-20">
                <Schedule language={language} />
            </main>
            <Footer language={language} />
        </div>
    )
}
