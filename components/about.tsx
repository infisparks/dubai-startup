'use client'

import React, { useState, useRef, useEffect } from 'react'
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    // Include all 7 logos found in the directory
    const logos = [1, 2, 3, 4, 5, 6, 7];
    // Create enough duplicates for smooth infinite scrolling
    const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        let animationId: number;
        const animate = () => {
            if (!isPaused) {
                const speed = 0.5; // Slightly slower for a more premium feel
                if (el.scrollLeft >= (el.scrollWidth / 2)) {
                    el.scrollLeft = 0; // Reset to start for seamless loop
                } else {
                    el.scrollLeft += speed;
                }
            }
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    return (
        <div className="w-full bg-slate-950 border-b border-slate-800/50 py-6 sm:py-8 overflow-hidden relative z-20">
            {/* Enhanced Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>

            <div
                ref={scrollRef}
                className="flex items-center overflow-x-auto gap-12 sm:gap-24 px-4 no-scrollbar select-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {repeatedLogos.map((num, i) => (
                    <div key={i} className="flex-shrink-0 group cursor-pointer relative">
                        <div className="absolute -inset-2 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-lg transition-colors duration-500" />
                        <img
                            src={`${BRAND_BASE_PATH}/${num}.png`}
                            alt={`Partner Brand ${num}`}
                            className="h-8 sm:h-10 w-auto max-w-none object-contain transition-all duration-500 transform group-hover:scale-105"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const FeaturesTicker = ({ features, isRtl }: { features: { title: string; desc: string }[]; isRtl: boolean }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    // Duplicate features for smooth infinite scrolling
    const repeatedFeatures = [...features, ...features, ...features, ...features]

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return
        let animationId: number
        const animate = () => {
            if (!isPaused) {
                const speed = 0.5 // Consistent speed
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0 // Reset to start
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
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

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
                        className={`flex-shrink-0 w-64 sm:w-72 p-5 bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800/60 rounded-lg hover:bg-slate-800/80 transition-all duration-300 hover:border-blue-500/20 group backdrop-blur-sm ${isRtl ? 'text-right' : 'text-left'
                            }`}
                    >
                        <h4 className="text-sm font-semibold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors">
                            {feature.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-normal group-hover:text-slate-300 transition-colors">
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
            {/* Brand Ticker */}
            <BrandTicker />

            {/* About Us Section */}
            <section id="about" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
                </div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`,
                        backgroundSize: '80px 80px',
                    }}
                />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                        {/* Header Column */}
                        <div className={`flex-1 ${isRtl ? 'lg:order-2 text-right' : 'lg:order-1 text-left'}`}>
                            <div className={`inline-flex items-center gap-2 mb-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase opacity-80">Our Vision</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                                {t.aboutUsTitle}
                            </h2>

                            <h3 className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 font-medium mb-6">
                                {t.investorsTitle}
                            </h3>

                            <div className={`hidden lg:block w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full ${isRtl ? 'mr-auto' : 'ml-0'}`} />
                        </div>

                        {/* Content Column */}
                        <div className={`flex-[1.5] ${isRtl ? 'lg:order-1' : 'lg:order-2'}`}>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                                <div className="relative bg-slate-900/60 border border-white/5 rounded-xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300">
                                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light whitespace-pre-line tracking-wide">
                                        {expandedText ? t.aboutDescription : t.aboutPartial}
                                        {!expandedText && <span className="text-blue-400/80 font-medium ml-1">...</span>}
                                    </p>

                                    {!expandedText && (
                                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent rounded-b-xl pointer-events-none" />
                                    )}

                                    {/* Action Button */}
                                    <div className={`mt-6 flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
                                        <button
                                            onClick={() => setExpandedText(!expandedText)}
                                            className="group/btn inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white transition-colors uppercase tracking-wider"
                                        >
                                            <span className="border-b border-blue-500/30 group-hover/btn:border-blue-400 pb-0.5 transition-all">
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
                    <div className="mt-8 sm:mt-12 text-center border-t border-white/5 pt-6 sm:pt-8 w-full max-w-2xl mx-auto">
                        <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide uppercase">
                            Investarise Global Investor Summit – 2026
                            <span className="hidden sm:inline mx-2 text-slate-700">|</span>
                            <span className="block sm:inline mt-1 sm:mt-0 text-slate-400">Shaping Tomorrow's Economy</span>
                        </p>
                    </div>

                </div>

            </section>

            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </>
    )
}