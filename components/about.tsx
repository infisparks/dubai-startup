'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  TrendingUp, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  Target,
  Sparkles
} from 'lucide-react'

interface AboutProps {
  language: 'en' | 'ar'
}

const IMAGE_BASE_PATH = '/joinus'
const BRAND_BASE_PATH = '/brand'

const translations = {
  en: {
    aboutUsTitle: 'About Us',
    investorsTitle: 'Investarise Global Investors',
    aboutPartial: 'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide. Our mission is to empower innovation by creating a seamless bridge between ambition and capital. With 90% of our features free, we remain committed to accessibility, transparency, and trust.',
    aboutDescription: 'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide. Our mission is to empower innovation by creating a seamless bridge between ambition and capital. Today, Investarise drives deal flow for over 100+ global investment networks, helping startups secure the right partnerships to scale. With 90% of our features free, we remain committed to accessibility, transparency, and trust. Through Investarise Premium, we go beyond the digital — hosting exclusive global Investment summits, pitch sessions, and networking events. Join us at the Investarise Global Summit – Dubai 2026, where ideas meet opportunity.',
    readMore: 'Read Full Story',
    readLess: 'Show Less',
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
    aboutUsTitle: 'عنّا',
    investorsTitle: 'مستثمرو إنفسترايز العالميون',
    aboutPartial: 'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال. مع 90% من ميزاتنا المجانية، نبقى ملتزمين بإمكانية الوصول والشفافية والثقة.',
    aboutDescription: 'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال. اليوم، تدفع إنفسترايز تدفق الصفقات لأكثر من 100 شبكة استثمار عالمية، مما يساعد الشركات الناشئة على تأمين الشراكات الصحيحة للتوسع. مع 90% من ميزاتنا المجانية، نبقى ملتزمون بإمكانية الوصول والشفافية والثقة. من خلال إنفسترايز بريميوم، نتجاوز الرقمي – نستضيف قمم استثمار عالمية حصرية، وجلسات عرض، وفعاليات تواصل. انضم إلينا في قمة إنفسترايز العالمية – دبي 2026، حيث تلتقي الأفكار بالفرص.',
    readMore: 'اقرأ القصة الكاملة',
    readLess: 'إظهار أقل',
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

// --- Sub Components ---

const BrandTicker = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const logos = [1, 2, 3, 4, 5, 6];
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animationId: number;
    const animate = () => {
      if (!isPaused) {
        const speed = 0.8;
        if (el.scrollLeft >= (el.scrollWidth / 4)) {
           el.scrollLeft -= (el.scrollWidth / 4); 
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
       <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
       <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
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
             <div key={i} className="flex-shrink-0 group cursor-pointer">
                <img 
                  src={`${BRAND_BASE_PATH}/${num}.png`} 
                  alt={`Partner Brand ${num}`} 
                  className="h-8 sm:h-12 w-auto object-contain opacity-40 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" 
                  draggable={false}
                />
             </div>
          ))}
       </div>
    </div>
  );
};

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

// --- Main Component ---

export default function About({ language = 'en' }: AboutProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [expandedText, setExpandedText] = useState(false)
  
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
      {/* Brand Ticker */}
      <BrandTicker />

      {/* About Us Section */}
      <section id="about" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff20 1px, transparent 1px), radial-gradient(#ffffff20 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className={`mb-12 ${isRtl ? 'text-right' : 'text-left'}`}>
            <div className={`inline-flex items-center gap-2 mb-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
              <span className="text-xs font-semibold tracking-widest text-blue-300 uppercase">OUR VISION</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              {t.aboutUsTitle}
            </h2>

            <div className={`w-20 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full ${isRtl ? 'mr-auto' : 'ml-0'}`} />
          </div>

          {/* Investors Title Card */}
          <div className="mb-8">
            <div className="inline-block">
              <div className="relative group p-1 rounded-xl bg-gradient-to-r from-blue-500/50 to-cyan-500/50 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500">
                <div className="relative px-8 py-5 bg-slate-900 rounded-lg">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    {t.investorsTitle}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className="relative bg-slate-800/40 border border-slate-700/60 rounded-xl p-8 shadow-2xl hover:border-blue-500/50 transition-all duration-500 backdrop-blur-md">
            <p className="text-base lg:text-lg text-slate-200 leading-relaxed font-light">
              {expandedText ? t.aboutDescription : t.aboutPartial}
              {!expandedText && <span className="text-cyan-400 font-semibold">...</span>}
            </p>

            {!expandedText && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/90 to-transparent rounded-b-xl pointer-events-none" />
            )}
          </div>

          {/* Button */}
          <div className={`flex gap-4 pt-6 ${isRtl ? 'justify-end' : 'justify-start'}`}>
            {!expandedText ? (
              <button
                onClick={() => setExpandedText(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-blue-500/30 transform hover:-translate-y-1 text-sm border border-transparent hover:border-white/50"
              >
                <span>{t.readMore}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setExpandedText(false)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1 text-sm border border-transparent hover:border-white/50"
              >
                <span>{t.readLess}</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
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