"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import BrandLogoTicker from "@/components/BrandLogoTicker"
import AboutSection from "@/components/AboutSection"

import CoFoundersPage from "@/components/bincomponent/Cofounder"
import SpeakersPage from "@/components/bincomponent/Speaker"
import InstitutionalInvestors from "@/components/bincomponent/InvestorsSponsors"
import VisionSection from "@/components/bincomponent/Vision"
import EventShowcase from "@/components/EventShowcase"
import FocusSectors from "@/components/bincomponent/Focussector"
import EventOverview from "@/components/bincomponent/Eventoverview"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />

      <main>
        {/* Hero Section */}
        <Hero language={language} />

        {/* Brand Logo Ticker */}
        <BrandLogoTicker />

        {/* About Section */}
        <AboutSection language={language} />



        {/* Strategic Co-Founders Section */}
        <CoFoundersPage language={language} />

        {/* Distinguished Speakers Section */}
        <SpeakersPage language={language} />

        {/* Institutional Investors Section */}
        <InstitutionalInvestors language={language} />

        {/* Strategic Vision Section */}
        <VisionSection language={language} />

        {/* Event Overview Section */}
        <EventOverview language={language} />

        {/* Event Showcase / Gallery Section */}
        <EventShowcase language={language} />

        {/* Focus Sectors Section */}
        <FocusSectors language={language} />
      </main>

      <Footer language={language} />
      <ScrollToTop />
    </div>
  )
}
