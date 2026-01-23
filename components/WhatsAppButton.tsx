"use client"

import { FaWhatsapp } from "react-icons/fa"

export default function WhatsAppButton() {
    const phoneNumber = "971586285983"
    const message = "Hi, I'm interested in Investarise. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-6 md:bottom-24 md:left-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 group"
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
