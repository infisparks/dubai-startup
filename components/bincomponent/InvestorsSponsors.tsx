'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Quote, Globe, Sparkles, ShieldCheck, Linkedin, Award, UserCheck, ArrowUpRight } from 'lucide-react'

interface InvestorsSponsorsProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        title: 'Institutional Investors',
        subtitle: 'The strategic capital driving global innovation and sustainable growth.',
        footer: "Global Investor Summit — Official Investor Delegation",
        readMore: 'Credentials',
        readLess: 'Close',
        investors: [
            {
                id: 'lootah',
                name: 'Sultan Ali Rashed Lootah',
                role: 'Managing Director & Strategist',
                bio: 'A distinguished Emirati strategist with senior leadership experience across government and private sectors. Former CEO of MBRF, he leads a diversified group spanning investment and consultancy with a focus on sustainable growth.',
                image: '/speaker/21.png',
                badge: 'Chairman'
            },
            {
                id: 'bhandari',
                name: 'Bhimkanta Bhandari',
                role: 'Chairman & Managing Director',
                bio: 'Global entrepreneur with diversified interests in FinTech, digital assets, and mining. Built a multi-million dollar portfolio across Asia, GCC, and North America with a compliance-first approach.',
                image: '/speaker/22.png',
                badge: 'Market Titan'
            },
            {
                id: 'thierry',
                name: 'Dr. M.F.G. Thierry Catherine',
                role: 'Energy Industry Expert & CEO',
                bio: '25 years of experience in oil and gas. Visionary leader in decarbonization and sustainable energy solutions. Advisor for multiple global energy firms.',
                image: '/speaker/17.png',
                badge: 'Energy Leader'
            },
            {
                id: 'ariz',
                name: 'Ariz',
                role: 'CEO, Everest DG',
                bio: 'Co-founder at EIT Global with 13+ years in tech. Active investor with a multi-million dollar startup portfolio, specializing in global expansion.',
                image: '/speaker/13.png',
                badge: 'Tech Investor'
            },
            {
                id: 'navneet',
                name: 'Navneet Agarwal',
                role: 'Founder, Navneet International',
                bio: 'Seasoned entrepreneur with a diversified portfolio in real estate and hospitality. IIT & IIM alumnus leading global ventures across India and UAE.',
                image: '/speaker/16.png',
                badge: 'Strategic Growth'
            },
            {
                id: 'nitin',
                name: 'Nitin Aggarwal',
                role: 'Managing Partner, Gopinath Group',
                bio: 'Expert in Retail and SME Banking. Leading new business setups and strategic finance initiatives under institutional governance frameworks.',
                image: '/speaker/2.png',
                badge: 'Finance Expert'
            },
            {
                id: 'randeep',
                name: 'Randeep Singh Nanda',
                role: 'MD, Bonn Metals',
                bio: 'Overseeing multi-million dollar operations with deep expertise in industrial finance and corporate strategic leadership.',
                image: '/speaker/6.png',
                badge: 'Executive Leader'
            },
            {
                id: 'puneet',
                name: 'Puneet Sakhuja',
                role: 'Founder, Arthah Group',
                bio: 'Chartered Accountant and Strategic Advisor with 18+ years of experience. Invested in 20+ scaling companies across diverse sectors.',
                image: '/speaker/5.png',
                badge: 'Strategic Advisor'
            },
            {
                id: 'ankit',
                name: 'Ankit Anand',
                role: 'Founding Partner, Riceberg Ventures',
                bio: 'Deep-tech investor and physicist. Focused on globally impactful companies, with past experience scaling MedTech and EdTech ventures.',
                image: '/speaker/26.png',
                badge: 'Deep Tech'
            },
            {
                id: 'sandesh',
                name: 'Sandesh Sharda',
                role: 'Serial Entrepreneur & Titan',
                bio: 'Global investor and philanthropist. Titan Judge on Zee TV Ideabaaz. Actively investing in healthcare, tech, and real estate.',
                image: '/speaker/25.png',
                badge: 'Global Titan'
            },
            {
                id: 'mudit',
                name: 'Mudit Kumar',
                role: 'Co-Founder, Ideabaaz',
                bio: 'Startup ecosystem leader and strategic advisor. Passionate about enabling founders through investor access and institutional mentorship.',
                image: '/speaker/23.png',
                badge: 'Ecosystem Lead'
            },
            {
                id: 'jeet',
                name: 'Jeet Wagh',
                role: 'CEO & Founder, Ideabaaz',
                bio: 'Ecosystem builder and investor. Leading one of the largest startup media platforms, fostering connections between founders and titans.',
                image: '/speaker/24.png',
                badge: 'Innovation Lead'
            },
            {
                id: 'kartavya',
                name: 'Kartavya Srivastava',
                role: 'Chairman, Apollo Energy (UK)',
                bio: 'Over 20 years of leadership in renewable energy and global markets. Expert in capital allocation and cross-border infrastructure platforms.',
                image: '/speaker/31.png',
                badge: 'Legacy Investor'
            },
            {
                id: 'danny',
                name: 'Digvijay “Danny” Gaekwad',
                role: 'Serial Entrepreneur & Investor',
                bio: 'First-generation Indian-American leader with three decades of experience in IT and hospitality. Community leader and economic driver.',
                image: '/speaker/32.png',
                badge: 'Honorary Leader'
            },
            {
                id: 'sanjay',
                name: 'Sanjay Puri',
                role: 'Founder & Chairman, AutoNebula',
                bio: 'Ecosystem builder and veteran entrepreneur. Focused on connected transportation and international corporate acceleration.',
                image: '/speaker/33.png',
                badge: 'Growth Titan'
            }
        ],
    },
    ar: {
        title: 'المستثمرون المؤسسيون',
        subtitle: 'رأس المال الاستراتيجي الذي يقود الابتكار العالمي والنمو المستدام.',
        footer: 'قمة المستثمرين العالمية — وفد المستثمرين الرسمي',
        readMore: 'السيرة الذاتية',
        readLess: 'إغلاق',
        investors: [
            {
                id: 'lootah',
                name: 'سلطان علي راشد لوتاه',
                role: 'مدير عام واستراتيجي',
                bio: 'استراتيجي إماراتي متميز يتمتع بخبرة قيادية عليا عبر القطاعين الحكومي والخاص. الرئيس التنفيذي السابق لمؤسسة محمد بن راشد آل مكتوم.',
                image: '/speaker/21.png',
                badge: 'رئيس مجلس الإدارة'
            },
            {
                id: 'bhandari',
                name: 'بهيمكانتا بهانداري',
                role: 'رئيس مجلس الإدارة والعضو المنتدب',
                bio: 'رائد أعمال عالمي يتمتع باهتمامات متنوعة في التكنولوجيا المالية والأصول الرقمية والتعدين عبر آسيا ودول مجلس التعاون الخليجي.',
                image: '/speaker/22.png',
                badge: 'عملاق السوق'
            }
        ],
    },
}

export default function InvestorsSponsors({ language = 'en' }: InvestorsSponsorsProps) {
    const t = translations[language]
    const isRtl = language === 'ar'
    const [isPaused, setIsPaused] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Repeat for smooth loop
    const repeatedInvestors = [...t.investors, ...t.investors, ...t.investors]

    useEffect(() => {
        const el = scrollContainerRef.current
        if (!el) return

        let animationId: number
        const speed = 0.5

        const animate = () => {
            if (!isPaused) {
                if (el.scrollLeft >= el.scrollWidth / 1.5) {
                    el.scrollLeft = 0
                } else {
                    el.scrollLeft += speed
                }
            }
            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationId)
    }, [isPaused])

    return (
        <section id="investors" className="relative py-20 bg-slate-50/50 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(3,79,163,0.02)_0%,transparent_70%)]" />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {/* Modern Section Header */}
                <div className="text-center mb-12 sm:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#034FA3] text-[9px] font-black uppercase tracking-[0.2em] mb-4"
                    >
                        <ShieldCheck size={12} />
                        Strategic Capital
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-4"
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 text-sm sm:text-base font-medium max-w-xl mx-auto px-4"
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                {/* Investor Ticker */}
                <div className="relative">
                    {/* Interaction Edge Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/50 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        className="flex flex-nowrap overflow-x-auto no-scrollbar gap-8 py-10 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {repeatedInvestors.map((investor, idx) => (
                            <div
                                key={`${investor.id}-${idx}`}
                                className="group relative flex-shrink-0 w-[280px] sm:w-[320px]"
                            >
                                {/* Luxury Wallet Stack Effect */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-white border border-slate-100 rounded-t-[1.5rem] -z-10 group-hover:-top-4 transition-all duration-500" />

                                <div className="relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_-20px_rgba(3,79,163,0.1)] transition-all duration-500 h-[380px] flex flex-col">

                                    {/* Prestige Identity Bar */}
                                    <div className="h-1.5 w-full bg-gradient-to-r from-[#034FA3] to-[#c4925f]" />

                                    <div className="p-8 flex flex-col h-full">
                                        {/* Header Area */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                                                <div className="absolute -inset-4 bg-blue-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-50 shadow-md bg-slate-50 transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                                                    <Image
                                                        src={investor.image}
                                                        alt={investor.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg">
                                                <span className="text-[7px] font-black uppercase tracking-widest text-[#034FA3]">{investor.badge}</span>
                                            </div>
                                        </div>

                                        {/* Investor Bio */}
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[8px] font-black text-[#c4925f] uppercase tracking-[0.2em] opacity-60">Global Portfolio</span>
                                                <div className="h-px w-6 bg-[#c4925f]/20" />
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight mb-1 group-hover:text-[#034FA3] transition-colors">
                                                {investor.name}
                                            </h3>
                                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-4">
                                                {investor.role}
                                            </p>

                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">
                                                {investor.bio}
                                            </p>
                                        </div>

                                        {/* Action Bar */}
                                        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Sparkles size={12} className="text-[#c4925f]" />
                                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Titan Network</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Linkedin size={14} className="text-slate-200 hover:text-[#034FA3] transition-colors cursor-pointer" />
                                                <Globe size={14} className="text-slate-100 hover:text-blue-300 transition-colors cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Institutional Footer */}
                <div className="text-center mt-12 flex flex-col items-center gap-8">
                    <Link
                        href="/investors"
                        className="group relative inline-flex items-center gap-2 px-8 py-3 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#034FA3] hover:bg-[#034FA3] hover:text-white transition-all duration-500 shadow-sm"
                    >
                        <span>{isRtl ? 'عرض جميع المستثمرين' : 'View All Investors'}</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-100 shadow-sm"
                    >
                        <UserCheck size={14} className="text-emerald-500" />
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {t.footer}
                        </p>
                        <Award size={14} className="text-amber-400" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
