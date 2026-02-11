'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Sparkles, Clock } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function AwardsPage() {
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
                        className="w-24 h-24 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100"
                    >
                        <Award className="w-12 h-12 text-amber-500" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        {language === 'en' ? 'Summit Awards 2026' : 'جوائز القمة 2026'}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
                    >
                        <Clock size={16} className="text-blue-500" />
                        <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">
                            {language === 'en' ? 'Will Upload Soon' : 'سيتم الرفع قريباً'}
                        </span>
                        <Sparkles size={16} className="text-amber-400" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg sm:text-xl font-medium"
                    >
                        {language === 'en'
                            ? 'We are carefully selecting the pioneers and visionaries who will be honored at the Summit. Stay tuned for the official announcements!'
                            : 'نحن نختار بعناية الرواد والمبدعين الذين سيتم تكريمهم في القمة. ترقبوا الإعلانات الرسمية!'}
                    </motion.p>
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}
