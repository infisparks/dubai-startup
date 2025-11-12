"use client"

import { useState, useEffect } from "react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (typeof window !== "undefined") {
      setIsVisible(window.scrollY > 300)
    }
  }

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisibility)
      return () => window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all hover:shadow-xl"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      {/* Floating Invest Button */}
      <button className="fixed bottom-8 left-8 z-40 px-6 py-3 bg-amber-400 text-slate-900 rounded-full font-semibold shadow-lg hover:bg-amber-300 transition-all hover:shadow-xl hidden md:block">
        {typeof window !== "undefined" && window.location.pathname === "/" ? "Invest Now" : "Invest Now"}
      </button>
    </>
  )
}
