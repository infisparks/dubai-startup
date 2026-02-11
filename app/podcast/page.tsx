'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic2, Sparkles, Clock, PlayCircle } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function PodcastPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const isRtl = language === 'ar'

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
            <Header language={language} setLanguage={setLanguage} />

            <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
                <div className="text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-blue-100"
                    >
                        <Mic2 className="w-12 h-12 text-[#034FA3]" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        {language === 'en' ? 'Summit Podcast Series' : 'سلسلة بودكاست القمة'}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
                    >
                        <Clock size={16} className="text-[#034FA3]" />
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">
                            {language === 'en' ? 'Will Upload Soon' : 'سيتم الرفع قريباً'}
                        </span>
                        <PlayCircle size={16} className="text-emerald-500" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg sm:text-xl font-medium"
                    >
                        {language === 'en'
                            ? 'Get ready for exclusive conversations with top industry leaders, investors, and innovators. Our first episode is coming very soon!'
                            : 'استعد لمحادثات حصرية مع كبار قادة الصناعة والمستثمرين والمبتكرين. حلقتنا الأولى قادمة قريباً جداً!'}
                    </motion.p>
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}
