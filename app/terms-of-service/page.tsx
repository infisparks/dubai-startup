"use client"

import React, { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Scale, FileText, AlertCircle, HelpCircle } from 'lucide-react'

export default function TermsOfService() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    return (
        <div className="min-h-screen bg-white">
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#013371]/5 text-[#013371] mb-6">
                            <Scale className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Terms of Service</h1>
                        <p className="text-lg text-slate-600">
                            Last updated: December 24, 2025
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="prose prose-lg max-w-none prose-slate prose-headings:text-slate-900 prose-a:text-[#013371] prose-strong:text-slate-900">

                        <section className="mb-12 p-8 bg-[#f8fafc] rounded-3xl border border-slate-200">
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4 mt-0">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#013371] text-white text-sm">1</span>
                                Agreement to Terms
                            </h2>
                            <p className="text-slate-600">
                                By accessing or using the Investarise platform and registering for the Investors Global Investment Summit 2026, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#013371] text-white text-sm">2</span>
                                Summit Registration & Attendance
                            </h2>
                            <ul className="space-y-3 list-none pl-0">
                                {[
                                    "Registration is subject to approval and availability.",
                                    "Tickets are non-transferable unless explicitly approved by Investarise management.",
                                    "We reserve the right to refuse entry or remove any attendee who violates our code of conduct.",
                                    "Attendees are responsible for their own travel and accommodation arrangements."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#024fa3] mt-2.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#013371] text-white text-sm">3</span>
                                Investment Disclaimer
                            </h2>
                            <div className="bg-[#fffbeb] border-l-4 border-[#b45309] p-6 rounded-r-xl my-6">
                                <div className="flex gap-4">
                                    <AlertCircle className="w-6 h-6 text-[#b45309] shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-[#92400e] m-0 mb-2">High Risk Warning</h4>
                                        <p className="text-[#92400e] m-0 text-sm">
                                            Investarise does not provide financial advice. All investment opportunities presented at the summit or on the platform are for informational purposes only. Investments in startups involve high risks.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#013371] text-white text-sm">4</span>
                                Intellectual Property
                            </h2>
                            <p className="text-slate-600">
                                The content, organization, graphics, design, compilation, and other matters related to the Site and Summit are protected under applicable copyrights, trademarks, and other proprietary rights. You may not copy, redistribute, use or publish any part of the Site without our prior written permission.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-[#013371] to-[#024fa3] text-white p-8 rounded-3xl mt-16 text-center shadow-lg">
                            <HelpCircle className="w-10 h-10 mx-auto mb-4 text-white/80" />
                            <h2 className="text-white text-2xl font-bold mb-4 mt-0">Still have questions?</h2>
                            <p className="text-white/90 mb-6">
                                If you have any questions about these Terms, please contact our legal team.
                            </p>
                            <a href="mailto:info@investariseglobal.com" className="inline-block bg-white text-[#013371] px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors no-underline shadow-md">
                                Contact Support
                            </a>
                        </section>

                    </div>
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}
