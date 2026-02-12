"use client"

import { FaWhatsapp } from "react-icons/fa"

import { useState, useEffect } from "react"

export default function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(true)
    const phoneNumber = "971586285983"
    const message = "Hi, I'm interested in Investarise. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting)
            },
            { threshold: 0.1 } // Hide when footer is 10% visible
        )

        const footer = document.getElementById("main-footer")
        if (footer) {
            observer.observe(footer)
        }

        return () => {
            if (footer) observer.unobserve(footer)
        }
    }, [])

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed bottom-8 left-6 md:bottom-24 md:left-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            aria-label="Chat on WhatsApp"
        >
            <div className="absolute -top-12 left-0 bg-white text-black text-xs font-bold py-1 px-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat with us!
                <div className="absolute top-full left-4 border-4 border-transparent border-t-white"></div>
            </div>
            <FaWhatsapp className="w-8 h-8" />
        </a>
    )
}
