'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
    TrendingUp,
    Globe,
    Shield,
    Zap,
    Users,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Target,
    Sparkles,
    ArrowRight
} from 'lucide-react'

interface InvestariseAdvantageProps {
    language: 'en' | 'ar'
}

const IMAGE_BASE_PATH = '/joinus'

const translations = {
    en: {
        whyJoinUsTitle: 'The Investarise Advantage',
        whySubtitle: 'Unlock unlimited possibilities and grow with the community',
        joinReasons: [
            { title: 'Access High-Growth Opportunities', desc: 'Invest early in ventures with huge potential.', icon: 'trending', image: `${IMAGE_BASE_PATH}/1.png` },
            { title: 'Proven Expertise', desc: 'Work with a team that consistently delivers results.', icon: 'target', image: `${IMAGE_BASE_PATH}/2.png` },
            { title: 'Smart Matchmaking', desc: 'Connect with the right founders and investors.', icon: 'users', image: `${IMAGE_BASE_PATH}/3.png` },
            { title: 'Exclusive Events & Summits', desc: 'Network, collaborate, and discover deals.', icon: 'sparkles', image: `${IMAGE_BASE_PATH}/4.png` },
            { title: 'Global Reach & Exposure', desc: 'Boost your brand across industries and markets.', icon: 'globe', image: `${IMAGE_BASE_PATH}/5.png` },
            { title: 'Data-Driven Insights', desc: 'Make confident, informed investment decisions.', icon: 'zap', image: `${IMAGE_BASE_PATH}/6.png` },
            { title: 'Secure & Transparent Process', desc: 'Invest with clarity and trust.', icon: 'shield', image: `${IMAGE_BASE_PATH}/7.png` },
            { title: 'Impactful Opportunities', desc: 'Grow your portfolio while making a difference.', icon: 'check', image: `${IMAGE_BASE_PATH}/8.png` },
        ],
    },
    ar: {
        whyJoinUsTitle: 'مزايا إنفسترايز',
        whySubtitle: 'افتح إمكانيات غير محدودة وانمُ مع المجتمع',
        joinReasons: [
            { title: 'الوصول إلى فرص النمو العالي', desc: 'استثمر مبكراً في مشاريع ذات إمكانيات هائلة.', icon: 'trending', image: `${IMAGE_BASE_PATH}/1.png` },
            { title: 'خبرة مثبتة', desc: 'اعمل مع فريق يقدم نتائج باستمرار.', icon: 'target', image: `${IMAGE_BASE_PATH}/2.png` },
            { title: 'مطابقة ذكية', desc: 'تواصل مع المؤسسين والمستثمرين المناسبين.', icon: 'users', image: `${IMAGE_BASE_PATH}/3.png` },
            { title: 'فعاليات وقمم حصرية', desc: 'تواصل وتعاون واكتشف الصفقات.', icon: 'sparkles', image: `${IMAGE_BASE_PATH}/4.png` },
            { title: 'انتشار عالمي وتعرض', desc: 'عزز علامتك التجارية عبر الصناعات والأسواق.', icon: 'globe', image: `${IMAGE_BASE_PATH}/5.png` },
            { title: 'رؤى مدفوعة بالبيانات', desc: 'اتخذ قرارات استثمارية واثقة ومستنيرة.', icon: 'zap', image: `${IMAGE_BASE_PATH}/6.png` },
            { title: 'عملية آمنة وشفافة', desc: 'استثمر بوضوح وثقة.', icon: 'shield', image: `${IMAGE_BASE_PATH}/7.png` },
            { title: 'فرص مؤثرة', desc: 'نمِ محفظتك مع إحداث فرق.', icon: 'check', image: `${IMAGE_BASE_PATH}/8.png` },
        ],
    },
}

const getIcon = (iconType: string) => {
    switch (iconType) {
        case 'trending': return <TrendingUp className="w-6 h-6" />
        case 'target': return <Target className="w-6 h-6" />
        case 'users': return <Users className="w-6 h-6" />
        case 'sparkles': return <Sparkles className="w-6 h-6" />
        case 'globe': return <Globe className="w-6 h-6" />
        case 'zap': return <Zap className="w-6 h-6" />
        case 'shield': return <Shield className="w-6 h-6" />
        case 'check': return <CheckCircle className="w-6 h-6" />
        default: return null
    }
}

const BenefitCard: React.FC<{ reason: (typeof translations.en.joinReasons)[0] }> = ({ reason }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="group relative h-full overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer bg-slate-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 20px 40px rgba(29, 78, 216, 0.5)' : '0 8px 16px rgba(0, 0, 0, 0.15)'
            }}
        >
            <img src={reason.image} alt={reason.title} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50" />
            <div className="relative p-6 h-full flex flex-col justify-end">
                <div className="flex flex-col mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-white group-hover:text-blue-600 border border-white/20">
                        {getIcon(reason.icon)}
                    </div>
                    <h3 className="text-xl font-extrabold text-white leading-snug">{reason.title}</h3>
                </div>
                <p className="text-sm text-white/90 leading-relaxed font-normal transition-opacity duration-300 group-hover:text-white">{reason.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500" />
            </div>
        </div>
    );
};

export default function InvestariseAdvantage({ language = 'en' }: InvestariseAdvantageProps) {
    const t = translations[language]
    const isRtl = language === 'ar'

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 5);
            const isEnd = (isRtl)
                ? (scrollLeft <= (clientWidth - scrollWidth) + 5)
                : (scrollLeft + clientWidth >= scrollWidth - 5);
            setCanScrollRight(!isEnd);
        }
    }, [isRtl]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const multiplier = (direction === 'left') ? -1 : 1;
            const scrollDirection = isRtl ? -multiplier : multiplier;
            const scrollAmount = 300 * scrollDirection;

            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
            setTimeout(checkScroll, 350);
        }
    };

    useEffect(() => {
        checkScroll();
        const scrollElement = scrollContainerRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        };
    }, [checkScroll]);

    return (
        <>
            <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] opacity-70" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-[100px] opacity-70" />
                </div>

                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(#00000010 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-flex items-center gap-2 mb-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">JOIN OUR NETWORK</span>
                            <ArrowRight className="w-4 h-4 text-blue-500" />
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
                            {t.whyJoinUsTitle}
                        </h2>

                        <p className="text-lg text-slate-600 max-w-4xl font-normal mt-3">
                            {t.whySubtitle}
                        </p>
                    </div>

                    <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
                        <button
                            onClick={() => scroll('left')}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-xl border border-slate-200 text-blue-600 hover:text-blue-800 transition-all md:hidden ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            aria-label="Scroll benefits left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div
                            ref={scrollContainerRef}
                            onScroll={checkScroll}
                            className={`flex gap-8 pb-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-0
                         md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-x-hidden
                         ${isRtl ? 'md:grid-flow-row-dense' : ''} [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
                            dir={isRtl ? 'rtl' : 'ltr'}
                        >
                            {t.joinReasons.map((reason, idx) => (
                                <div
                                    key={idx}
                                    className="flex-shrink-0 snap-start w-72 h-96 lg:w-full lg:h-96"
                                    dir="ltr"
                                >
                                    <BenefitCard reason={reason} />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => scroll('right')}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-xl border border-slate-200 text-blue-600 hover:text-blue-800 transition-all md:hidden ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            aria-label="Scroll benefits right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
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
