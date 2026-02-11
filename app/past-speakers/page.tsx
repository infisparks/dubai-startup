'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, Linkedin, Globe, Sparkles, UserCheck, Award, Mic2 } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

const translations = {
    en: {
        title: 'Distinguished Speakers',
        subtitle: 'The collective intelligence driving the 2026 Global Investor Summit.',
        footerText: "Global Investor Summit — Official Speaker Delegation",
        speakers: [
            {
                id: 'manav',
                name: 'Dr. Manav Ahuja',
                role: 'Strategic Business Consultant',
                bio: 'Driving business success with modern strategies, backed by 25+ years in business and consultancy.',
                image: '/speaker/11.png',
                badge: 'Visionary'
            },
            {
                id: 'majid',
                name: 'Abdulmajid Ansari',
                role: 'Founder ARBA Accelerator',
                bio: 'Serial Entrepreneur, Founder ARBA Accelerator LLP, Head of Business Incubation AIKTC.',
                image: '/speaker/3.png',
                badge: 'Innovation'
            },
            {
                id: 'muzaffar',
                name: 'Muzaffar Ahmad',
                role: 'Global AI Leader & CAIO',
                bio: 'Muzaffar Ahmad is a globally recognized AI leader and CAIO at Data Automation.',
                image: '/speaker/15.png',
                badge: 'AI Strategist'
            },
            {
                id: 'yasir',
                name: 'Prof. Dr. Yasir Amin',
                role: 'General & Endocrine Surgeon',
                bio: 'Internationally recognized pioneer of scar-free Transoral Endoscopic Endocrine Surgery.',
                image: '/speaker/18.png',
                badge: 'Expert'
            },
            {
                id: 'anirudh',
                name: 'Anirudh Tripathy',
                role: 'MD, KPM ASSET Group',
                bio: 'Investment Banker and Technology Specialist with 26+ years of global experience.',
                image: '/speaker/29.png',
                badge: 'Investment'
            },
        ],
    },
    ar: {
        title: 'المتحدثون المتميزون',
        subtitle: 'الذكاء الجماعي الذي يقود قمة المستثمرين العالمية 2026.',
        footerText: 'قمة المستثمرين العالمية — وفد المتحدثين الرسمي',
        speakers: [
            {
                id: 'manav',
                name: 'د. ماناف أهوجا',
                role: 'استشاري أعمال استراتيجي',
                bio: 'قيادة نجاح الأعمال باستراتيجيات حديثة، مدعومة بخبرة تزيد عن 25 عامًا.',
                image: '/speaker/11.png',
                badge: 'صاحب رؤية'
            },
            {
                id: 'majid',
                name: 'عبد المجيد أنصاري',
                role: 'رائد أعمال متسلسل',
                bio: 'رائد أعمال متسلسل، مؤسس ARBA Accelerator LLP، ورئيس حضانة الأعمال AIKTC.',
                image: '/speaker/3.png',
                badge: 'قائد الابتكار'
            },
            {
                id: 'muzaffar',
                name: 'مظفر أحمد',
                role: 'قائد عالمي في الذكاء الاصطناعي',
                bio: 'قائد عالمي في الذكاء الاصطناعي ورئيس قسم الذكاء الاصطناعي في Data Automation.',
                image: '/speaker/15.png',
                badge: 'خبير ذكاء اصطناعي'
            },
            {
                id: 'yasir',
                name: 'أ.د. ياسر أمين',
                role: 'جراح الغدد الصماء العام',
                bio: 'معترف به دوليًا لريادته في جراحة الغدد الصماء بالمنظار عبر الفم دون ندبات.',
                image: '/speaker/18.png',
                badge: 'خبير عالمي'
            },
            {
                id: 'anirudh',
                name: 'أنيروده تريباتي',
                role: 'العضو المنتدب، مجموعة KPM ASSET',
                bio: 'مصرفي استثماري وأخصائي تكنولوجيا بخبرة 26 عامًا عالميًا.',
                image: '/speaker/29.png',
                badge: 'عملاق الاستثمار'
            },
        ],
    }
}

export default function SpeakersPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const t = translations[language]
    const isRtl = language === 'ar'

    return (
        <div className="min-h-screen bg-slate-50/50" dir={isRtl ? 'rtl' : 'ltr'}>
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#034FA3] text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm"
                        >
                            <Mic2 size={14} />
                            Voice of Innovation
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-6 lg:leading-[1.1]"
                        >
                            {t.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 text-lg sm:text-xl font-medium max-w-2xl mx-auto"
                        >
                            {t.subtitle}
                        </motion.p>
                    </div>

                    {/* Speakers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {t.speakers.map((speaker, idx) => (
                            <motion.div
                                key={speaker.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (idx % 3) }}
                                className="group relative"
                            >
                                <div className="relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(3,79,163,0.12)] transition-all duration-500 h-full flex flex-col p-8">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="relative w-24 h-24 rounded-3xl overflow-hidden border-2 border-slate-50 shadow-xl bg-slate-50 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500">
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#034FA3]">{speaker.badge}</span>
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-black text-[#c4925f] uppercase tracking-[0.2em] opacity-60">Global Delegate</span>
                                            <div className="h-px w-8 bg-[#c4925f]/20" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-[#034FA3] transition-colors">
                                            {speaker.name}
                                        </h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-6">
                                            {speaker.role}
                                        </p>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                            {speaker.bio}
                                        </p>
                                    </div>

                                    <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Sparkles size={14} className="text-amber-400" />
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Summit 2026</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Linkedin size={18} className="text-slate-300 hover:text-[#0A66C2] transition-colors cursor-pointer" />
                                            <Globe size={18} className="text-slate-200 hover:text-blue-400 transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Institutional Footer */}
                    <div className="text-center mt-24">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white border border-slate-100 shadow-xl"
                        >
                            <ShieldCheck size={18} className="text-[#034FA3]" />
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                                {t.footerText}
                            </p>
                            <Sparkles size={18} className="text-amber-400" />
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}
