"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import InvestariseAdvantage from "@/components/investarise-advantage"
import FeaturedStartups from "@/components/featured-startups"
import HowItWorks from "@/components/how-it-works"
import InvestorBenefits from "@/components/investor-benefits"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import HonorarySlider from "@/components/HonorarySlider"
import DrBuAbdullah from "@/components/DrBuAbdullah"

import CoFoundersPage from "@/components/Cofounder"
import ApprovedStartupsList from "@/components/ApprovedStartupsList"
import Speaker from "@/components/Speaker"
import PastSpeakers from "@/components/PastSpeakers"
import Gallery from "@/components/Gallery"
import PastSponsors from "@/components/PastSponsors"
import EventOverview from "@/components/Eventoverview"
import VisionAndGoals from "@/components/Vision"
import { LandPlot } from "lucide-react"
import FocusSectors from "@/components/Focussector"
import VenueSection from "@/components/Venue"
import Schedule from "@/components/Schedules"
import MarketingStrategy from "@/components/Markiting"
import OurTeam from "@/components/Team"
import SponsorshipPackages from "@/components/Sponser"
import SpeakerMajid from "@/components/Speaker-majid"
import InvestorsSponsors from "@/components/InvestorsSponsors"
export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section - Full Screen */}
      <Hero language={language} />

      {/* Introduction & Vision - Light Gray Background */}
      <section className="bg-slate-50 relative overflow-hidden">
        <About language={language} />
        <div className="container mx-auto py-8">
          <VisionAndGoals language={language} />
        </div>
      </section>

      {/* High Profile Attendees - White Background */}
      <section className="py-16 bg-white">
        <HonorarySlider language={language} />
        {/* <DrBuAbdullah language={language} /> */}
      </section>

      {/* Core Team - Subtle Gradient */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="space-y-16 container mx-auto px-4">

          {/* <ApprovedStartupsList language={language}/> */}
          <CoFoundersPage language={language} />
        </div>
      </section>

      {/* Speakers - Premium Dark/Brand Contrast or Clean White */}
      <section className="py-20 bg-white">
        <Speaker language={language} />
        <div className="mt-12">
          <PastSpeakers language={language} />
        </div>
      </section>

      {/* Investors & Sponsors - Light Background */}
      <section className="py-20 bg-slate-50">
        <InvestorsSponsors language={language} />
      </section>

      {/* Gallery & Highlights */}
      <section className="py-20 bg-white">
        <Gallery language={language} />
      </section>

      {/* Partners */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <PastSponsors />
      </section>

      {/* Event Details & Logistics - White */}
      <section className="py-20 bg-white">
        <EventOverview language={language} />
        {/* <SpeakerMajid language={language} /> */}

        <div className="mt-16 space-y-16">
          <FocusSectors language={language} />
// <VenueSection language={language} venueImageSrc={"/taj.jpg"} />
        </div>
      </section>

      {/* Commercials - Gradient */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <MarketingStrategy language={language} />
        {/* <OurTeam language={language} /> */}
        <div className="mt-16">
          <SponsorshipPackages language={language} />
        </div>
      </section>

      {/* <FeaturedStartups language={language} />
      <HowItWorks language={language} />
      <InvestorBenefits language={language} />
      <Testimonials language={language} />
      <Newsletter language={language} />
      <Contact language={language} /> */}
      {/* <InvestariseAdvantage language={language} /> */}

      <Footer language={language} />
      <ScrollToTop />
    </div>
  )
}
