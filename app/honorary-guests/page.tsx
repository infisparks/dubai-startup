"use client"

import { useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { Star, ShieldCheck, Award, TrendingUp, Globe, Gem, Crown, ChevronRight } from 'lucide-react'

// Language Data (Copied from HonorarySlider.tsx)
const translations = {
    en: {
        title: "Honorary Guests",
        subtitle: "Distinguished guests gracing our summit",
        guests: [
            {
                type: 'sheikha',
                badge: 'Guest of Honour',
                badgePrefix: 'The Royal Guest',
                name: 'Her Excellency Shaikha Moaza Obaid Suhail Al Maktoum',
                titlePrefix: 'Her Excellency',
                displayName: 'Shaikha Moaza Obaid Suhail Al Maktoum',
                role: 'Chairperson of a Global Conglomerate',
                image: '/shaikha_moaza.png',
                bio: [
                    "Her Excellency Shaikha Moaza Obaid Suhail Al Maktoum is a distinguished Emirati business leader and an esteemed member of the Al Maktoum Family, the ruling family of the United Arab Emirates. She is widely acclaimed for her visionary leadership, global influence, and significant contributions to entrepreneurship and economic development.",
                    "She serves as the Chairperson of a leading multinational diversified business conglomerate with operations spanning more than 40 countries, encompassing key sectors such as finance, real estate, healthcare, and technology. In recognition of her exceptional leadership and royal heritage, Her Excellency will grace the occasion as Guest of Honour from the UAE Royal Family, bringing with her unparalleled prestige, strategic insight, and a global perspective that will greatly enrich the gathering."
                ],
                stats: [
                    { label: 'Global Presence', value: '40+ Countries', icon: Globe },
                    { label: 'Sectors', value: 'Multi-Sectoral', icon: Gem },
                    { label: 'Legacy', value: 'Royal Family', icon: ShieldCheck },
                ]
            },
            {
                type: 'prince',
                badge: 'Guest of Honor & Mentor',
                badgePrefix: 'Royal Guest',
                name: 'H.R.H Prince Ebrahim Sanyang',
                titlePrefix: 'H.R.H',
                displayName: 'Prince Ebrahim Sanyang',
                role: 'Royal Africa Holdings Chairman',
                image: '/prince.png',
                bio: [
                    "H.R.H. Prince Ebrahim is a 21st-century royal and transformative Pan-African figure whose life's work spans diplomacy, heritage, and sustainable development. As a direct descendant of the legendary rulers of the Mali & Kabu Empires, he is a custodian of tradition and a pioneer of the future.",
                    "Recognised for exceptional leadership in economic development, he champions transformative entrepreneurship and pioneering investments across Africa.",
                    "As Chairman of Royal Africa Holdings, he spearheads over $8 Billion of portfolios and pipeline investments in Real Estates, Aviation, Oil and Gas, Transport and Logistics, Banking and Finance, Media etc, driving growth and prosperity in the region."
                ],
                stats: [
                    { label: 'Investment Value', value: '$8B+', icon: TrendingUp },
                    { label: 'Global Impact', value: 'Pan-African', icon: Globe },
                    { label: 'Leadership', value: 'Visionary', icon: Award },
                ]
            }
        ],
        readMore: 'Read More',
        readLess: 'Read Less'
    },
    ar: {
        title: "ضيوف الشرف",
        subtitle: "شخصيات بارزة تشرف قمتنا",
        guests: [
            {
                type: 'sheikha',
                badge: 'ضيفة الشرف',
                badgePrefix: 'The Royal Guest',
                name: 'سعادة الشيخة موزة عبيد سهيل آل مكتوم',
                titlePrefix: 'سعادة الشيخة',
                displayName: 'موزة عبيد سهيل آل مكتوم',
                role: 'رئيس مجلس إدارة تكتل أعمال عالمي',
                image: '/shaikha_moaza.png',
                bio: [
                    "تعد سعادة الشيخة موزة عبيد سهيل آل مكتوم قائدة أعمال إماراتية متميزة وعضواً مرموقاً في عائلة آل مكتوم، العائلة الحاكمة في دولة الإمارات العربية المتحدة. وهي تحظى بتقدير واسع لقيادتها الرؤوية وتأثيرها العالمي ومساهماتها الكبيرة في ريادة الأعمال والتنمية الاقتصادية.",
                    "وتشغل منصب رئيس مجلس إدارة تكتل أعمال عالمي متنوع رائد يمتد نشاطه في أكثر من 40 دولة، ويغطي قطاعات رئيسية مثل التمويل والعقارات والرعاية الصحية والتكنولوجيا. وتقديرًا لقيادتها الاستثنائية وإرثها الملكي، ستشرف سعادتها المناسبة كضيفة شرف من عائلة آل مكتوم، مما يضفي مكانة لا تضاهى وبصيرة استراتيجية ومنظوراً عالمياً يثري هذا التجمع بشكل كبير."
                ],
                stats: [
                    { label: 'تواجـد عـالمي', value: '+40 دولة', icon: Globe },
                    { label: 'قطاعات', value: 'متعددة الأنشطة', icon: Gem },
                    { label: 'الإرث', value: 'العائلة المالكة', icon: ShieldCheck },
                ]
            },
            {
                type: 'prince',
                badge: 'ضيف الشرف والمرشد',
                badgePrefix: 'Royal Guest',
                name: 'صاحب السمو الأمير إبراهيم سانيانغ',
                titlePrefix: 'صاحب السمو الأمير',
                displayName: 'إبراهيم سانيانغ',
                role: 'رئيس مجلس إدارة رويال أفريقيا القابضة',
                image: '/prince.png',
                bio: [
                    "صاحب السمو الأمير إبراهيم هو شخصية ملكية وتحويلية أفريقية من القرن الحادي والعشرين، يمتد عمله الدبلوماسي والتراثي والتنمية المستدامة. بصفته سليل مباشر لحكام إمبراطوريتي مالي وكابو الأسطوريتين، فهو وصي على التقاليد ورائد للمستقبل.",
                    "تم الاعتراف به لقيادته الاستثنائية في التنمية الاقتصادية، وهو يناصر ريادة الأعمال التحويلية والاستثمارات الرائدة في جميع أنحاء أفريقيا.",
                    "بصفته رئيس مجلس إدارة رويال أفريقيا القابضة، يقود أكثر من 8 مليارات دولار من المحافظ والاستثمارات في مجالات العقارات والطيران والنفط والغاز والنقل والخدمات اللوجستية والمصارف والتمويل والإعلام وغيرها، مما يدفع النمو والازدهار في المنطقة."
                ],
                stats: [
                    { label: 'قيمة الاستثمار', value: '+8 مليار دولار', icon: TrendingUp },
                    { label: 'التأثير العالمي', value: 'عموم أفريقيا', icon: Globe },
                    { label: 'القيادة', value: 'صاحب رؤية', icon: Award },
                ]
            }
        ],
        readMore: 'اقرأ المزيد',
        readLess: 'اقرأ أقل'
    },
}

export default function HonoraryGuestsPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const t = translations[language]
    const isRtl = language === "ar"
    const [expandedStart, setExpandedStart] = useState<Record<number, boolean>>({})

    const toggleExpand = (index: number) => {
        setExpandedStart(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <div className="min-h-screen bg-white" dir={isRtl ? "rtl" : "ltr"}>
            <Header language={language} setLanguage={setLanguage} />

            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                            {t.title}
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {t.subtitle}
                        </p>
                        <div className="w-24 h-1 bg-[#034FA3] mx-auto mt-6 rounded-full" />
                    </div>

                    <div className="space-y-12">
                        {t.guests.map((guest, index) => {
                            const isExpanded = expandedStart[index] || false
                            return (
                                <div key={index} className="relative group">
                                    {/* Decorative Elements */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white rounded-3xl -z-10 transform transition-transform group-hover:scale-[1.01]" />

                                    <div className={`relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:border-[#034FA3]/20 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

                                        {/* Image Section - 35% */}
                                        <div className="w-full lg:w-[35%] relative shrink-0">
                                            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                                <Image
                                                    src={guest.image}
                                                    alt={guest.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    priority={index === 0}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                                {/* Floating Badge on Image */}
                                                <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-20`}>
                                                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                                                        {guest.type === 'sheikha' ? (
                                                            <Star className="w-3.5 h-3.5 text-[#dbb46e] fill-current" />
                                                        ) : (
                                                            <Crown className="w-3.5 h-3.5 text-[#dbb46e] fill-current" />
                                                        )}
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800">{guest.badgePrefix}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section - 65% */}
                                        <div className={`flex flex-col justify-center w-full lg:w-[65%] ${isRtl ? 'text-right' : 'text-left'}`}>
                                            <div className="space-y-8">

                                                {/* Header & Title */}
                                                <div>
                                                    <div className={`inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#034FA3]/5 border border-[#034FA3]/10 text-[#034FA3] ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                        <Award className="w-4 h-4" />
                                                        <span className="text-xs font-bold tracking-widest uppercase">{guest.badge}</span>
                                                    </div>

                                                    <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-3 tracking-tight">
                                                        <span className="block text-xl sm:text-2xl text-[#034FA3] font-bold mb-2 opacity-90">{guest.titlePrefix}</span>
                                                        {guest.displayName}
                                                    </h2>

                                                    <p className="text-lg sm:text-xl text-[#c4925f] font-bold tracking-wide flex items-center gap-3 mt-4">
                                                        <span className="w-8 h-1 bg-[#c4925f] inline-block rounded-full"></span>
                                                        {guest.role}
                                                    </p>
                                                </div>

                                                {/* Bio */}
                                                <div className="space-y-4">
                                                    {guest.bio.slice(0, isExpanded ? guest.bio.length : 1).map((paragraph, pIndex) => (
                                                        <p key={pIndex} className="text-slate-600 text-base sm:text-lg leading-relaxed">
                                                            {paragraph}
                                                        </p>
                                                    ))}

                                                    <button
                                                        onClick={() => toggleExpand(index)}
                                                        className={`flex items-center gap-2 text-[#034FA3] font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all mt-4 group/btn ${isRtl ? 'flex-row-reverse' : ''}`}
                                                    >
                                                        {isExpanded ? t.readLess : t.readMore}
                                                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'rotate-90'} group-hover/btn:translate-x-1`} />
                                                    </button>
                                                </div>

                                                {/* Stats Grid */}
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-slate-100 pt-8 mt-4">
                                                    {guest.stats.map((stat, sIndex) => {
                                                        const Icon = stat.icon
                                                        return (
                                                            <div key={sIndex} className="group/stat">
                                                                <div className={`flex items-center gap-3 mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                                    <div className="p-2 rounded-lg bg-[#034FA3]/5 text-[#034FA3] group-hover/stat:bg-[#034FA3] group-hover/stat:text-white transition-colors duration-300">
                                                                        <Icon className="w-5 h-5" />
                                                                    </div>
                                                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                                                                </div>
                                                                <p className={`text-xl font-black text-slate-800 tracking-tight ${isRtl ? 'pr-10' : 'pl-10'}`}>{stat.value}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>

            <Footer language={language} />
            <ScrollToTop />
        </div>
    )
}
