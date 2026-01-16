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
import PrincePage from "@/components/PrincePage"
import GuestOfHonour from "@/components/GuestOfHonour"
import DrBuAbdullah from "@/components/DrBuAbdullah"
import FounderPage from "@/components/Founder"
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
import HomeBannerPopup from "@/components/HomeBannerPopup"
export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  return (
    <div className="min-h-screen bg-white">
      <HomeBannerPopup />
      <Header language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <About language={language} />
      <GuestOfHonour language={language} />
      <PrincePage language={language} />
      {/* <DrBuAbdullah language={language} /> */}
      <FounderPage language={language} />
      {/* <ApprovedStartupsList language={language}/> */}
      <CoFoundersPage language={language} />
      <Speaker language={language} />
      <PastSpeakers language={language} />
      <InvestorsSponsors language={language} />
      <Gallery language={language} />
      <PastSponsors />
      {/* <SpeakerMajid language={language} /> */}
      <EventOverview language={language} />
      <VisionAndGoals language={language} />

      <FocusSectors language={language} />
      <VenueSection language={language} venueImageSrc={"/taj.jpg"} />
      {/* <Schedule language={language} /> */}
      <MarketingStrategy language={language} />

      {/* <OurTeam language={language} /> */}
      <SponsorshipPackages language={language} />

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
