'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star, ShieldCheck, Award, TrendingUp, Globe, Gem, Crown, ChevronLeft, ChevronRight } from 'lucide-react'

interface HonorarySliderProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
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

export default function HonorarySlider({ language = 'en' }: HonorarySliderProps) {
    const t = translations[language]
    const isRtl = language === 'ar'
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            direction: isRtl ? 'rtl' : 'ltr',
            align: 'center',
            skipSnaps: false
        },
        [Autoplay({ delay: 5000, stopOnInteraction: false }) as any]
    )

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const [isExpanded, setIsExpanded] = useState(false)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setIsExpanded(false) // Reset expansion when sliding
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    return (
        <section className="relative py-12 bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#034FA3]/5 rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c4925f]/10 rounded-full blur-[120px] opacity-40 translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="relative group">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {t.guests.map((guest, index) => (
                                <div key={index} className="flex-[0_0_100%] min-w-0 relative px-4">
                                    <div className={`relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100/80 transition-all duration-500 hover:shadow-2xl hover:border-[#034FA3]/20 group ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

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
                                            <div className="space-y-6">

                                                {/* Header & Title */}
                                                <div>
                                                    <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#034FA3]/5 border border-[#034FA3]/10 text-[#034FA3] ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                        <Award className="w-4 h-4" />
                                                        <span className="text-xs font-bold tracking-widest uppercase">{guest.badge}</span>
                                                    </div>

                                                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-2">
                                                        <span className="block text-xl sm:text-2xl text-[#034FA3] font-medium mb-1 opacity-90">{guest.titlePrefix}</span>
                                                        {guest.displayName}
                                                    </h2>

                                                    <p className="text-lg text-[#c4925f] font-semibold tracking-wide flex items-center gap-2">
                                                        <span className="w-8 h-0.5 bg-[#c4925f] inline-block rounded-full"></span>
                                                        {guest.role}
                                                    </p>
                                                </div>

                                                {/* Bio */}
                                                <div className="space-y-4">
                                                    {guest.bio.slice(0, isExpanded ? guest.bio.length : 1).map((paragraph, pIndex) => (
                                                        <p key={pIndex} className="text-slate-600 text-base leading-relaxed">
                                                            {paragraph}
                                                        </p>
                                                    ))}

                                                    <button
                                                        onClick={() => setIsExpanded(!isExpanded)}
                                                        className={`flex items-center gap-2 text-[#034FA3] font-bold text-xs uppercase tracking-wider hover:gap-3 transition-all mt-2 group/btn ${isRtl ? 'flex-row-reverse' : ''}`}
                                                    >
                                                        {isExpanded ? t.readLess : t.readMore}
                                                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '-rotate-90' : 'rotate-90'} group-hover/btn:translate-x-1`} />
                                                    </button>
                                                </div>

                                                {/* Stats Grid */}
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-6 mt-2">
                                                    {guest.stats.map((stat, sIndex) => {
                                                        const Icon = stat.icon
                                                        return (
                                                            <div key={sIndex} className="group/stat">
                                                                <div className={`flex items-center gap-3 mb-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                                    <div className="p-1.5 rounded-lg bg-[#034FA3]/5 text-[#034FA3] group-hover/stat:bg-[#034FA3] group-hover/stat:text-white transition-colors duration-300">
                                                                        <Icon className="w-4 h-4" />
                                                                    </div>
                                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                                                                </div>
                                                                <p className={`text-lg font-bold text-slate-800 ${isRtl ? 'pr-9' : 'pl-9'}`}>{stat.value}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg text-[#034FA3] hover:bg-[#034FA3] hover:text-white transition-all transform hover:scale-110 active:scale-95 lg:block hidden"
                        onClick={scrollPrev}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg text-[#034FA3] hover:bg-[#034FA3] hover:text-white transition-all transform hover:scale-110 active:scale-95 lg:block hidden"
                        onClick={scrollNext}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? 'w-8 bg-[#034FA3]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
