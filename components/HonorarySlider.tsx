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
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
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
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#bf1e2e]/5 rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c4925f]/10 rounded-full blur-[120px] opacity-40 translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="relative group">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {t.guests.map((guest, index) => (
                                <div key={index} className="flex-[0_0_100%] min-w-0 relative px-4">
                                    <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

                                        {/* Image Section */}
                                        <div className="w-[85%] sm:w-[60%] lg:w-[32%] relative group/img perspective-1000 mx-auto lg:mx-0">
                                            <div className="absolute -inset-3 bg-gradient-to-tr from-[#bf1e2e]/20 via-[#c4925f]/20 to-[#bf1e2e]/20 rounded-2xl opacity-60 blur-md group-hover/img:opacity-80 transition-opacity duration-700" />
                                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 group-hover/img:scale-[1.02] bg-white aspect-[3/4.5]">
                                                <Image
                                                    src={guest.image}
                                                    alt={guest.name}
                                                    fill
                                                    className="object-cover transform transition-transform duration-[2000ms] group-hover/img:scale-105"
                                                    priority
                                                />
                                                {/* Floating Badge */}
                                                <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-20`}>
                                                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#bf1e2e]/20">
                                                        {guest.type === 'sheikha' ? (
                                                            <Star className="w-3.5 h-3.5 text-[#bf1e2e] fill-current" />
                                                        ) : (
                                                            <Crown className="w-3.5 h-3.5 text-[#bf1e2e] fill-current" />
                                                        )}
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#bf1e2e]">{guest.badgePrefix}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className={`w-full lg:w-[68%] ${isRtl ? 'text-right' : 'text-left'} self-start`}>
                                            <div className="space-y-6">
                                                {/* Header */}
                                                <div className="space-y-4">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bf1e2e]/5 border border-[#bf1e2e]/20 text-[#bf1e2e] ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                        <Star className="w-3.5 h-3.5 fill-current" />
                                                        <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">{guest.badge}</span>
                                                    </div>

                                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#bf1e2e] leading-tight tracking-tight">
                                                        <span className="block mb-1 opacity-90 text-2xl sm:text-3xl lg:text-4xl font-bold">
                                                            {guest.titlePrefix}
                                                        </span>
                                                        {guest.displayName}
                                                    </h2>

                                                    <p className={`text-lg sm:text-xl text-[#58585a] font-medium ${isRtl ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-[#c4925f]`}>
                                                        {guest.role}
                                                    </p>
                                                </div>

                                                {/* Bio */}
                                                <div className="space-y-3 text-[#58585a] text-base leading-relaxed font-normal">
                                                    {guest.bio.slice(0, isExpanded ? guest.bio.length : 2).map((paragraph, pIndex) => (
                                                        <p key={pIndex} className="transition-opacity hover:opacity-100 opacity-90 hover:text-black">
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                    {guest.bio.length > 2 && (
                                                        <button
                                                            onClick={() => setIsExpanded(!isExpanded)}
                                                            className={`mt-2 inline-flex items-center gap-2 text-[#bf1e2e] font-bold text-xs uppercase tracking-wider hover:gap-3 transition-all ${isRtl ? 'flex-row-reverse' : ''}`}
                                                        >
                                                            {isExpanded ? t.readLess : t.readMore}
                                                            <TrendingUp className={`w-3.5 h-3.5 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''} ${isRtl ? '-scale-x-100' : ''}`} />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Stats */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                                                    {guest.stats.map((stat, sIndex) => {
                                                        const Icon = stat.icon
                                                        return (
                                                            <div key={sIndex} className="group/stat relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#bf1e2e]/20 transition-all duration-300">
                                                                <div className="mb-2 w-8 h-8 rounded-lg bg-[#bf1e2e]/5 flex items-center justify-center text-[#bf1e2e] group-hover/stat:bg-[#bf1e2e] group-hover/stat:text-white transition-colors">
                                                                    <Icon className="w-4 h-4" />
                                                                </div>
                                                                <p className="text-xl font-bold text-slate-800 mb-0.5 group-hover/stat:text-[#bf1e2e] transition-colors">
                                                                    {stat.value}
                                                                </p>
                                                                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider group-hover/stat:text-gray-700">
                                                                    {stat.label}
                                                                </p>
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
                        className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg text-[#bf1e2e] hover:bg-[#bf1e2e] hover:text-white transition-all transform hover:scale-110 active:scale-95 lg:block hidden"
                        onClick={scrollPrev}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg text-[#bf1e2e] hover:bg-[#bf1e2e] hover:text-white transition-all transform hover:scale-110 active:scale-95 lg:block hidden"
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
                                className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? 'w-8 bg-[#bf1e2e]' : 'w-2 bg-gray-300 hover:bg-gray-400'
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
