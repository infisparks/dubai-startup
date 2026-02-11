'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'
import { galleryImages } from "@/lib/gallery-data"

export default function EventShowcase({ language = 'en' }: { language?: 'en' | 'ar' }) {
    const isRtl = language === 'ar'

    // Select images for the grid
    const gridImages = galleryImages.slice(0, 9);

    const details = [
        { en: '5000+ Global Participants', ar: 'أكثر من 5000 مشارك عالمي' },
        { en: 'Photo-realistic scenes', ar: 'مشاهد واقعية' },
        { en: '200+ Startup Pitches', ar: 'أكثر من 200 عرض للشركات الناشئة' },
        { en: 'Graphics & Media', ar: 'الرسومات والوسائط' },
        { en: 'Exclusive VC Networking', ar: 'تواصل حصري مع المستثمرين' },
        { en: 'Isometric Vector Graphics', ar: 'رسومات فكتور أيزومترية' },
        { en: '+ And Much More', ar: '+ وأكثر من ذلك بكثير' },
    ]

    return (
        <section className="py-20 bg-[#0A0F1E] relative overflow-hidden px-4 sm:px-6">
            {/* Outer Container Border */}
            <div className="max-w-7xl mx-auto border border-white/5 rounded-[2.5rem] relative overflow-hidden bg-[#0A0F1E]">

                {/* Background Grid Lines */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 p-8 sm:p-16 items-center">

                    {/* Left Side: Dynamic Image Stage */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        {/* Browser Frame */}
                        <div className="relative bg-[#0D1117] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl z-20">
                            {/* Top Bar */}
                            <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                            </div>

                            {/* Grid Content: 3x3 layout */}
                            <div className="p-4 sm:p-6 grid grid-cols-3 gap-3">
                                {gridImages.map((src, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.05, zIndex: 10 }}
                                        className="relative aspect-square rounded-xl overflow-hidden shadow-lg border border-white/5"
                                    >
                                        <Image
                                            src={src}
                                            alt={`Grid ${idx}`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Background Decorative Frame */}
                        <div className="absolute -inset-4 border border-blue-500/20 rounded-[2.5rem] -z-10" />
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={isRtl ? 'text-right' : 'text-left'}
                    >
                        {/* Orange Label */}
                        <span className="text-[#FF7D4F] font-bold text-sm tracking-wider mb-4 block uppercase px-1">
                            {language === 'en' ? 'Summit Highlights' : 'أبرز مميزات القمة'}
                        </span>

                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                            {language === 'en' ? (
                                <>Experience Shared Vision <br />Through Our <span className="text-blue-400">Archives</span> 🖼️</>
                            ) : (
                                <>اختبر الرؤية المشتركة <br />من خلال <span className="text-blue-400">أرشيفنا</span> 🖼️</>
                            )}
                        </h2>

                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                            <span className="text-blue-500 font-bold">Investarise</span> {language === 'en'
                                ? "is more than an event; it's a global synergy platform that connects innovation with institutional capital in seconds. Finally, you'll have the perfect visibility into the startup future."
                                : "هو أكثر من مجرد حدث؛ إنه منصة تآزر عالمية تربط الابتكار برأس المال المؤسسي في ثوانٍ. في النهاية، ستكون لديك رؤية مثالية لمستقبل الشركات الناشئة."}
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                            {details.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <Check size={14} className="text-slate-500 flex-shrink-0" />
                                    <span className="text-slate-400 font-medium text-[13px]">
                                        {language === 'en' ? item.en : item.ar}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Primary Button */}
                        <Link
                            href="/gallery"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#5F7FFF] hover:bg-[#4a6dec] text-white rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">+</span>
                                {language === 'en' ? 'Explore Full Gallery' : 'استكشف المعرض الكامل'}
                            </span>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
