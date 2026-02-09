'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
    ChevronDown,
    ChevronUp,
} from 'lucide-react'

interface AboutProps {
    language: 'en' | 'ar'
}

const BRAND_BASE_PATH = '/brand'

const translations = {
    en: {
        aboutUsTitle: 'Raising the curtain..',
        investorsTitle: 'Investarise Global Investors Summit',
        aboutPartial: 'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide.Our mission is to empower innovation/ dreams / new ideas by creating a seamless bridge between ambition and capital.',
        aboutDescription: 'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide.Our mission is to empower innovation/ dreams / new ideas by creating a seamless bridge between ambition and capital.The summit aims to empower entrepreneurs and high-potential businesses, particularly those from underrepresented or emerging markets, by providing them with direct access to investors, funding opportunities, and strategic guidance.By cultivating an environment where ambition meets investment, the summit seeks to unlock new avenues for innovation, job creation, and economic progress on a global scale.Today, Investarise drives deal flow for over 100 + global investment networks, helping startups secure the right partnerships to scale.Through Investarise service platform, we remain committed to accessibility, transparency, and trust and go beyond the digital - hosting exclusive global investment summits, pitch sessions, and networking events.\n\nJoin us at the Investarise Global Summit – Dubai 2026, where ideas meet opportunity and the below mentioned follows.',
        readMore: 'Read Full Story',
        readLess: 'Show Less',
        features: [
            { title: 'Access High-Growth Opportunities', desc: 'Invest early in ventures with huge potential.' },
            { title: 'Smart Matchmaking', desc: 'Connect with the right founders and investors.' },
            { title: 'Global Reach & Exposure', desc: 'Boost your brand across industries and markets.' },
            { title: 'Proven Expertise', desc: 'Work with a team that consistently delivers results.' },
            { title: 'Exclusive Events & Summits', desc: 'Network, collaborate, and discover deals.' },
            { title: 'Data-Driven Insights', desc: 'Make confident, informed investment decisions.' },
            { title: 'Secure & Transparent Process', desc: 'Invest with clarity and trust.' },
            { title: 'Impactful Opportunities', desc: 'Grow your portfolio while making a difference.' },
        ]
    },
    ar: {
        aboutUsTitle: 'رفع الستار..',
        investorsTitle: 'قمة إنفسترايز العالمية للمستثمرين',
        aboutPartial: 'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال.',
        aboutDescription: 'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال. تهدف القمة إلى تمكين رواد الأعمال والشركات ذات الإمكانات العالية، وخاصة تلك من الأسواق الممثلة تمثيلاً ناقصاً أو الناشئة، من خلال تزويدهم بالوصول المباشر إلى المستثمرين وفرص التمويل والتوجيه الاستراتيجي. من خلال تنمية بيئة يلتقي فيها الطموح بالاستثمار، تسعى القمة لفتح آفاق جديدة للابتكار وخلق فرص العمل والتقدم الاقتصادي على نطاق عالمي. اليوم، تدفع إنفسترايز تدفق الصفقات لأكثر من 100 شبكة استثمار عالمية، مما يساعد الشركات الناشئة على تأمين الشراكات الصحيحة للتوسع. من خلال منصة خدمات إنفسترايز، نبقى ملتزمين بإمكانية الوصول والشفافية والثقة ونتجاوز الرقمي – نستضيف قمم استثمار عالمية حصرية، وجلسات عرض، وفعاليات تواصل.\n\nانضم إلينا في قمة إنفسترايز العالمية – دبي 2026، حيث تلتقي الأفكار بالفرص وما يلي مذكور أدناه.',
        readMore: 'اقرأ القصة الكاملة',
        readLess: 'إظهار أقل',
        features: [
            { title: 'الوصول إلى فرص عالية النمو', desc: 'استثمر مبكراً في مشاريع ذات إمكانات هائلة.' },
            { title: 'التوفيق الذكي', desc: 'تواصل مع المؤسسين والمستثمرين المناسبين.' },
            { title: 'الوصول العالمي والتعرض', desc: 'عزز علامتك التجارية عبر الصناعات والأسواق.' },
            { title: 'خبرة مثبتة', desc: 'اعمل مع فريق يقدم نتائج باستمرار.' },
            { title: 'فعاليات وقمم حصرية', desc: 'تواصل، تعاون، واكتشف الصفقات.' },
            { title: 'رؤى مدعومة بالبيانات', desc: 'اتخذ قرارات استثمارية واثقة ومستنيرة.' },
            { title: 'عملية آمنة وشفافة', desc: 'استثمر بوضوح وثقة.' },
            { title: 'فرص مؤثرة', desc: 'نمِّ محفظتك بينما تحدث فرقاً.' },
        ]
    },
}

// --- Sub Components ---

const BrandTicker = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const logos = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 33, 34, 35, 36, 37, 38];
    // Duplicate logos for seamless infinite scrolling
    const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos];

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        let animationId: number
        const animate = () => {
            if (!isPaused) {
                const speed = 0.8 // Adjust speed as necessary
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0 // Reset to start for seamless loop
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
        <div className="w-full bg-white border-b border-gray-100 py-10 px-0 relative z-20 overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Supporting partners</p>
                </div>

                <div
                    ref={scrollRef}
                    className="flex items-center overflow-x-auto no-scrollbar select-none py-2"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <div className="flex gap-12 sm:gap-16 md:gap-24 px-4">
                        {repeatedLogos.map((num, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 transform transition-transform duration-300 hover:scale-110"
                            >
                                <Image
                                    src={`${BRAND_BASE_PATH}/${num}.png`}
                                    alt={`Partner Brand ${num}`}
                                    width={200}
                                    height={100}
                                    quality={100}
                                    priority={i < 10}
                                    className="h-10 sm:h-12 md:h-14 w-auto object-contain hover:scale-105 transition-all duration-300"
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturesTicker = ({ features, isRtl }: { features: { title: string; desc: string }[]; isRtl: boolean }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const repeatedFeatures = [...features, ...features, ...features, ...features]

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        let animationId: number
        const animate = () => {
            if (!isPaused) {
                const speed = 0.5
                if (el.scrollLeft >= el.scrollWidth / 2) {
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
        <div className="w-full py-4 overflow-hidden relative z-20 mt-6">
            {/* Gradient Masks - Light Theme */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#f9f9f9] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#f9f9f9] to-transparent z-10 pointer-events-none"></div>

            <div
                ref={scrollRef}
                className="flex items-stretch overflow-x-auto gap-4 no-scrollbar select-none"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {repeatedFeatures.map((feature, i) => (
                    <div
                        key={i}
                        className={`flex-shrink-0 w-64 sm:w-72 p-5 bg-white border border-gray-200 shadow-sm rounded-lg hover:shadow-lg transition-all duration-300 hover:border-[#034FA3]/20 group ${isRtl ? 'text-right' : 'text-left'
                            }`}
                    >
                        <h4 className="text-sm font-bold text-[#034FA3] mb-2 group-hover:text-[#023c7a] transition-colors">
                            {feature.title}
                        </h4>
                        <p className="text-xs text-[#58585a] leading-normal group-hover:text-black transition-colors">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
};

// --- Main Component ---

export default function About({ language = 'en' }: AboutProps) {
    const t = translations[language]
    const isRtl = language === 'ar'
    const [expandedText, setExpandedText] = useState(false)

    return (
        <>
            {/* Brand Ticker (now static grid) */}
            <BrandTicker />

            {/* About Us Section */}
            <section id="about" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#f9f9f9] overflow-hidden">
                {/* Background Gradients - Light & Red/Gold */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#034FA3]/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#c4925f]/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                        {/* Header Column */}
                        <div className={`flex-1 ${isRtl ? 'lg:order-2 text-right' : 'lg:order-1 text-left'}`}>
                            <div className={`inline-flex items-center gap-2 mb-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#034FA3] animate-pulse" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-[#034FA3] uppercase">Our Vision</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#333] mb-2 tracking-tight">
                                {t.aboutUsTitle}
                            </h2>

                            <h3 className="text-lg sm:text-xl font-medium mb-6 text-[#023c7a]">
                                {t.investorsTitle}
                            </h3>

                            <div className={`hidden lg:block w-16 h-1 bg-gradient-to-r from-[#034FA3] to-[#023c7a] rounded-full ${isRtl ? 'mr-auto' : 'ml-0'}`} />
                        </div>

                        {/* Content Column */}
                        <div className={`flex-[1.5] ${isRtl ? 'lg:order-1' : 'lg:order-2'}`}>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#034FA3]/20 to-[#c4925f]/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                                <div className="relative bg-white border border-gray-100 shadow-md rounded-xl p-6 sm:p-8 transition-all duration-300">
                                    <p className="text-sm sm:text-base text-[#58585a] leading-relaxed font-normal whitespace-pre-line tracking-wide">
                                        {expandedText ? t.aboutDescription : t.aboutPartial}
                                        {!expandedText && <span className="text-[#034FA3] font-medium ml-1">...</span>}
                                    </p>

                                    {!expandedText && (
                                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent rounded-b-xl pointer-events-none" />
                                    )}

                                    {/* Action Button */}
                                    <div className={`mt-6 flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
                                        <button
                                            onClick={() => setExpandedText(!expandedText)}
                                            className="group/btn inline-flex items-center gap-2 text-xs font-bold text-[#034FA3] hover:text-[#023c7a] transition-colors uppercase tracking-wider"
                                        >
                                            <span className="border-b border-[#034FA3]/30 group-hover/btn:border-[#023c7a] pb-0.5 transition-all">
                                                {expandedText ? t.readLess : t.readMore}
                                            </span>
                                            {expandedText ?
                                                <ChevronUp className="w-3 h-3 group-hover/btn:-translate-y-0.5 transition-transform" /> :
                                                <ChevronDown className="w-3 h-3 group-hover/btn:translate-y-0.5 transition-transform" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Ticker */}
                    <div className="mt-12 sm:mt-16 -mx-4 sm:-mx-6 lg:-mx-8 opacity-90 hover:opacity-100 transition-opacity duration-500">
                        <FeaturesTicker features={t.features} isRtl={isRtl} />
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 sm:mt-12 text-center border-t border-gray-200 pt-6 sm:pt-8 w-full max-w-2xl mx-auto">
                        <p className="text-[10px] sm:text-xs text-gray-400 font-bold tracking-wide uppercase">
                            Investarise Global Investor Summit – 2026
                            <span className="hidden sm:inline mx-2 text-[#034FA3]">|</span>
                            <span className="block sm:inline mt-1 sm:mt-0 text-gray-500">Shaping Tomorrow's Economy</span>
                        </p>
                    </div>

                </div>

            </section>
        </>
    )
}