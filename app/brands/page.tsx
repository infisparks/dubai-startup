'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Search, ChevronLeft, Globe, ShieldCheck, Award, Zap, ArrowUpRight } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

// Comprehensive Partner Database
const partners = [
    { id: '1', name: 'Al Ghurair Group', category: 'Platinum Partner', industry: 'Conglomerate' },
    { id: '2', name: 'Emaar Properties', category: 'Strategic Partner', industry: 'Real Estate' },
    { id: '3', name: 'Mubadala', category: 'Sovereign Partner', industry: 'Investment' },
    { id: '4', name: 'ADIA', category: 'Institutional Partner', industry: 'Finance' },
    { id: '5', name: 'DP World', category: 'Global Partner', industry: 'Logistics' },
    { id: '7', name: 'Etisalat', category: 'Tech Partner', industry: 'Telecom' },
    { id: '8', name: 'DEWA', category: 'Utility Partner', industry: 'Energy' },
    { id: '9', name: 'Emirates NBD', category: 'Banking Partner', industry: 'Finance' },
    { id: '10', name: 'FAB', category: 'Financial Partner', industry: 'Banking' },
    { id: '11', name: 'ADNOC', category: 'Energy Partner', industry: 'Oil & Gas' },
    { id: '33', name: 'Startup Hub', category: 'Ecosystem Partner', industry: 'Innovation' },
    { id: '34', name: 'Fintech Hive', category: 'Strategic Partner', industry: 'Fintech' },
    { id: '35', name: 'DIFC', category: 'Regional Partner', industry: 'Financial District' },
    { id: '36', name: 'ADGM', category: 'Regional Partner', industry: 'Jurisdiction' },
    { id: '37', name: 'Hub71', category: 'Tech Partner', industry: 'Startups' },
    { id: '38', name: 'DMCC', category: 'Trade Partner', industry: 'Commodities' },
]

export default function BrandsDirectory() {
    const [searchQuery, setSearchQuery] = useState('')
    const [language, setLanguage] = useState<'en' | 'ar'>('en')

    const filteredPartners = useMemo(() => {
        return partners.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.industry.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header language={language} setLanguage={setLanguage} />

            <main className="flex-grow py-32 sm:py-40 px-6 sm:px-8 lg:px-12 relative overflow-hidden selection:bg-[#034FA3]/10">
                {/* Subtle Geometric Background */}
                <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-slate-50 to-white -z-10" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#034FA3_1px,transparent_1px),linear-gradient(to_bottom,#034FA3_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-4">
                            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#034FA3] transition-colors mb-2">
                                <ChevronLeft size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{language === 'en' ? 'Return to Summit' : 'العودة إلى القمة'}</span>
                            </Link>
                            <h1 className="text-4xl sm:text-7xl font-black tracking-tighter leading-none text-[#023757]">
                                {language === 'en' ? 'Global' : 'التحالفات'} <span className="text-[#034FA3]">{language === 'en' ? 'Alliances' : 'العالمية'}</span>
                            </h1>
                            <p className="text-slate-500 text-sm sm:text-lg font-medium max-w-xl leading-relaxed">
                                {language === 'en'
                                    ? 'Connecting world-class institutions and visionary enterprises shaping the future of Global Investment and Innovation.'
                                    : 'ربط المؤسسات العالمية والشركات ذات الرؤية التي تشكل مستقبل الاستثمار والابتكار العالمي.'}
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder={language === 'en' ? "Search partners, industries..." : "البحث عن الشركاء، الصناعات..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-[#023757] focus:outline-none focus:ring-2 focus:ring-[#034FA3]/20 focus:border-[#034FA3] transition-all"
                            />
                        </div>
                    </div>

                    {/* Brands Grid */}
                    <AnimatePresence mode="wait">
                        {filteredPartners.length > 0 ? (
                            <motion.div
                                key="grid"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
                            >
                                {filteredPartners.map((partner) => (
                                    <motion.div key={partner.id} variants={itemVariants}>
                                        <Link
                                            href={`/partner/${partner.id}`}
                                            className="group relative flex flex-col min-h-[300px] bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 hover:border-[#034FA3]/30 hover:shadow-2xl hover:shadow-[#034FA3]/5 transition-all duration-500 shadow-sm"
                                        >
                                            <div className="flex-grow flex flex-col justify-between relative z-10">
                                                {/* Industry Badge */}
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#034FA3] bg-[#034FA3]/5 px-3 py-1 rounded-full">
                                                        {partner.industry}
                                                    </span>
                                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                        <ArrowUpRight size={16} className="text-[#034FA3]" />
                                                    </div>
                                                </div>

                                                {/* Logo Container */}
                                                <div className="flex-grow flex items-center justify-center py-6 min-h-[140px]">
                                                    <div className="relative w-full h-full flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                                                        <Image
                                                            src={`/brand/${partner.id}.png`}
                                                            alt={partner.name}
                                                            width={200}
                                                            height={100}
                                                            className="object-contain max-h-[100px] w-auto"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Partner Name Area */}
                                                <div className="pt-4 border-t border-slate-50 mt-auto">
                                                    <h3 className="text-sm sm:text-base font-bold text-[#023757] group-hover:text-[#034FA3] transition-colors truncate">
                                                        {partner.name}
                                                    </h3>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                        {partner.category}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                    <Search size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-[#023757] mb-2">{language === 'en' ? 'No partners found' : 'لم يتم العثور على شركاء'}</h2>
                                <p className="text-slate-400">{language === 'en' ? 'Try adjusting your search criteria' : 'حاول ضبط معايير البحث الخاصة بك'}</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-8 px-8 py-3 bg-[#034FA3] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#023c7a] transition-all shadow-lg shadow-[#034FA3]/20"
                                >
                                    {language === 'en' ? 'Clear Search' : 'مسح البحث'}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Quick Stats / Trust Section */}
                    <div className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 py-16 border-y border-slate-100">
                        {[
                            { icon: ShieldCheck, title: language === 'en' ? 'Verified Partners' : 'شركاء معتمدون', sub: 'Institutional Authentication' },
                            { icon: Globe, title: language === 'en' ? 'Global Reach' : 'وصول عالمي', sub: 'Strategic Hub Access' },
                            { icon: Award, title: language === 'en' ? 'Elite Alliance' : 'تحالف النخبة', sub: 'Premier Summit Network' }
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-5 group">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#034FA3] group-hover:bg-[#034FA3] group-hover:text-white transition-all duration-300">
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-[#023757] font-bold text-base">{stat.title}</h4>
                                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}
