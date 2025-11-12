"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import FeaturedStartups from "@/components/featured-startups"
import HowItWorks from "@/components/how-it-works"
import InvestorBenefits from "@/components/investor-benefits"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <About language={language} />
      <FeaturedStartups language={language} />
      <HowItWorks language={language} />
      <InvestorBenefits language={language} />
      <Testimonials language={language} />
      <Newsletter language={language} />
      <Contact language={language} />
      <Footer language={language} />
      <ScrollToTop />
    </div>
  )
}
