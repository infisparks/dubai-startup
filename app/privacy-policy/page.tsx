"use client"

import React, { useState } from 'react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react'

export default function PrivacyPolicy() {
    const [language, setLanguage] = useState<"en" | "ar">("en")

    return (
        <div className="min-h-screen bg-white">
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#013371]/5 text-[#013371] mb-6">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
                        <p className="text-lg text-slate-600">
                            Last updated: December 24, 2025
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="prose prose-lg max-w-none prose-slate prose-headings:text-slate-900 prose-a:text-[#013371] prose-strong:text-slate-900">

                        <section className="mb-12">
                            <p className="lead text-xl text-slate-600">
                                At Investarise, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or register for the Investors Global Investment Summit 2026.
                            </p>
                        </section>

                        <section className="mb-16">
                            <h2 className="text-2xl font-bold mb-8">Information We Collect</h2>
                            <div className="grid md:grid-cols-2 gap-6 not-prose">
                                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-100 transition-colors hover:border-[#013371]/20">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#013371] mb-4">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Personal Information</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        We collect information that you voluntarily provide to us when you register for the summit, such as your name, email address, phone number, and company details.
                                    </p>
                                </div>
                                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-slate-100 transition-colors hover:border-[#013371]/20">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#024fa3] mb-4">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Usage Data</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        We automatically collect certain information when you visit, use, or navigate the Site. This information does not reveal your specific identity (like your name or contact information).
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
                                How We Use Your Information
                            </h2>
                            <ul className="space-y-4 list-none pl-0">
                                {[
                                    "To facilitate your registration and attendance at the Summit.",
                                    "To connect you with relevant investors or startups based on your interests.",
                                    "To send you administrative information, updates, and event-related communications.",
                                    "To improve our website and services through analytics."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start text-slate-600">
                                        <CheckCircle2 className="w-5 h-5 text-[#013371] shrink-0 mt-1" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">
                                Data Security
                            </h2>
                            <div className="bg-[#013371]/5 p-8 rounded-3xl mb-8 flex gap-6 items-start border border-[#013371]/10">
                                <Lock className="w-8 h-8 text-[#013371] shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-[#013371] mb-2 mt-0">Your Data is Protected</h3>
                                    <p className="text-slate-700 m-0">
                                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="border-t border-slate-200 pt-12 mt-12">
                            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                            <p className="text-slate-600 mb-6">
                                If you have questions or comments about this Privacy Policy, please contact us at:
                            </p>
                            <a href="mailto:info@investariseglobal.com" className="text-xl font-bold text-slate-900 hover:text-[#013371] transition-colors no-underline">
                                info@investariseglobal.com
                            </a>
                        </section>

                    </div>
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}
