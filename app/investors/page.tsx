'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, Linkedin, Globe, Sparkles, UserCheck, Award } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

const translations = {
    en: {
        title: 'Institutional Investors',
        subtitle: 'The strategic capital driving global innovation and sustainable growth.',
        footerText: "Global Investor Summit — Official Investor Delegation",
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
        footerText: 'قمة المستثمرين العالمية — وفد المستثمرين الرسمي',
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
    }
}

export default function InvestorsPage() {
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
                            <ShieldCheck size={14} />
                            Strategic Capital
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

                    {/* Investors Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {t.investors.map((investor, idx) => (
                            <motion.div
                                key={investor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (idx % 3) }}
                                className="group relative"
                            >
                                <div className="relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(3,79,163,0.12)] transition-all duration-500 h-full flex flex-col p-8">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="relative w-24 h-24 rounded-3xl overflow-hidden border-2 border-slate-50 shadow-xl bg-slate-50 group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
                                            <Image
                                                src={investor.image}
                                                alt={investor.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#034FA3]">{investor.badge}</span>
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-black text-[#c4925f] uppercase tracking-[0.2em] opacity-60">Global Portfolio</span>
                                            <div className="h-px w-8 bg-[#c4925f]/20" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-[#034FA3] transition-colors">
                                            {investor.name}
                                        </h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-6">
                                            {investor.role}
                                        </p>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                            {investor.bio}
                                        </p>
                                    </div>

                                    <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Sparkles size={14} className="text-[#c4925f]" />
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Titan Network</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Linkedin size={18} className="text-slate-300 hover:text-[#034FA3] transition-colors cursor-pointer" />
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
                            <UserCheck size={18} className="text-emerald-500" />
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                                {t.footerText}
                            </p>
                            <Award size={18} className="text-amber-400" />
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}
