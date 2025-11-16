'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
// Importing Lucide icons
import { ChevronDown, ChevronUp, ArrowRight, Sparkles, Target, TrendingUp, Globe, Shield, Zap, Users, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'

interface AboutProps {
  language: 'en' | 'ar'
}

// Define the base path for images
const IMAGE_BASE_PATH = '/joinus'

const translations = {
  en: {
    aboutUsTitle: 'About Us',
    investorsTitle: 'Investarise Global Investors',
    aboutPartial:
      'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide. Our mission is to empower innovation by creating a seamless bridge between ambition and capital. With 90% of our features free, we remain committed to accessibility, transparency, and trust.',
    aboutDescription:
      'Investarise Global Investors Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide. Our mission is to empower innovation by creating a seamless bridge between ambition and capital. Today, Investarise drives deal flow for over 100+ global investment networks, helping startups secure the right partnerships to scale. With 90% of our features free, we remain committed to accessibility, transparency, and trust. Through Investarise Premium, we go beyond the digital — hosting exclusive global Investment summits, pitch sessions, and networking events. Join us at the Investarise Global Summit – Dubai 2026, where ideas meet opportunity.',
    readMore: 'Read Full Story',
    readLess: 'Show Less',
    whyJoinUsTitle: 'The Investarise Advantage', // More professional title
    whySubtitle: 'Unlock unlimited possibilities and grow with the community',
    joinReasons: [
      {
        title: 'Access High-Growth Opportunities',
        desc: 'Invest early in ventures with huge potential.',
        icon: 'trending',
        image: `${IMAGE_BASE_PATH}/1.png`, // Image for card 1
      },
      {
        title: 'Proven Expertise',
        desc: 'Work with a team that consistently delivers results.',
        icon: 'target',
        image: `${IMAGE_BASE_PATH}/2.png`, // Image for card 2
      },
      {
        title: 'Smart Matchmaking',
        desc: 'Connect with the right founders and investors.',
        icon: 'users',
        image: `${IMAGE_BASE_PATH}/3.png`, // Image for card 3
      },
      {
        title: 'Exclusive Events & Summits',
        desc: 'Network, collaborate, and discover deals.',
        icon: 'sparkles',
        image: `${IMAGE_BASE_PATH}/4.png`, // Image for card 4
      },
      {
        title: 'Global Reach & Exposure',
        desc: 'Boost your brand across industries and markets.',
        icon: 'globe',
        image: `${IMAGE_BASE_PATH}/5.png`, // Image for card 5
      },
      {
        title: 'Data-Driven Insights',
        desc: 'Make confident, informed investment decisions.',
        icon: 'zap',
        image: `${IMAGE_BASE_PATH}/6.png`, // Image for card 6
      },
      {
        title: 'Secure & Transparent Process',
        desc: 'Invest with clarity and trust.',
        icon: 'shield',
        image: `${IMAGE_BASE_PATH}/7.png`, // Image for card 7
      },
      {
        title: 'Impactful Opportunities',
        desc: 'Grow your portfolio while making a difference.',
        icon: 'check',
        image: `${IMAGE_BASE_PATH}/8.png`, // Image for card 8
      },
    ],
  },
  ar: {
    aboutUsTitle: 'عنّا',
    investorsTitle: 'مستثمرو إنفسترايز العالميون',
    aboutPartial:
      'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال. مع 90% من ميزاتنا المجانية، نبقى ملتزمين بإمكانية الوصول والشفافية والثقة.',
    aboutDescription:
      'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال. اليوم، تدفع إنفسترايز تدفق الصفقات لأكثر من 100 شبكة استثمار عالمية، مما يساعد الشركات الناشئة على تأمين الشراكات الصحيحة للتوسع. مع 90% من ميزاتنا المجانية، نبقى ملتزمون بإمكانية الوصول والشفافية والثقة. من خلال إنفسترايز بريميوم، نتجاوز الرقمي – نستضيف قمم استثمار عالمية حصرية، وجلسات عرض، وفعاليات تواصل. انضم إلينا في قمة إنفسترايز العالمية – دبي 2026، حيث تلتقي الأفكار بالفرص.',
    readMore: 'اقرأ القصة الكاملة',
    readLess: 'إظهار أقل',
    whyJoinUsTitle: 'مزايا إنفسترايز', // More professional title
    whySubtitle: 'افتح إمكانيات غير محدودة وانمُ مع المجتمع',
    joinReasons: [
      {
        title: 'الوصول إلى فرص النمو العالي',
        desc: 'استثمر مبكراً في مشاريع ذات إمكانيات هائلة.',
        icon: 'trending',
        image: `${IMAGE_BASE_PATH}/1.png`,
      },
      {
        title: 'خبرة مثبتة',
        desc: 'اعمل مع فريق يقدم نتائج باستمرار.',
        icon: 'target',
        image: `${IMAGE_BASE_PATH}/2.png`,
      },
      {
        title: 'مطابقة ذكية',
        desc: 'تواصل مع المؤسسين والمستثمرين المناسبين.',
        icon: 'users',
        image: `${IMAGE_BASE_PATH}/3.png`,
      },
      {
        title: 'فعاليات وقمم حصرية',
        desc: 'تواصل وتعاون واكتشف الصفقات.',
        icon: 'sparkles',
        image: `${IMAGE_BASE_PATH}/4.png`,
      },
      {
        title: 'انتشار عالمي وتعرض',
        desc: 'عزز علامتك التجارية عبر الصناعات والأسواق.',
        icon: 'globe',
        image: `${IMAGE_BASE_PATH}/5.png`,
      },
      {
        title: 'رؤى مدفوعة بالبيانات',
        desc: 'اتخذ قرارات استثمارية واثقة ومستنيرة.',
        icon: 'zap',
        image: `${IMAGE_BASE_PATH}/6.png`,
      },
      {
        title: 'عملية آمنة وشفافة',
        desc: 'استثمر بوضوح وثقة.',
        icon: 'shield',
        image: `${IMAGE_BASE_PATH}/7.png`,
      },
      {
        title: 'فرص مؤثرة',
        desc: 'نمِ محفظتك مع إحداث فرق.',
        icon: 'check',
        image: `${IMAGE_BASE_PATH}/8.png`,
      },
    ],
  },
}

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'trending':
      return <TrendingUp className="w-6 h-6" /> // Increased icon size slightly
    case 'target':
      return <Target className="w-6 h-6" />
    case 'users':
      return <Users className="w-6 h-6" />
    case 'sparkles':
      return <Sparkles className="w-6 h-6" />
    case 'globe':
      return <Globe className="w-6 h-6" />
    case 'zap':
      return <Zap className="w-6 h-6" />
    case 'shield':
      return <Shield className="w-6 h-6" />
    case 'check':
      return <CheckCircle className="w-6 h-6" />
    default:
      return null
  }
}

// ✅ UPDATED: Benefit Card with content fully overlaid on the image, anchored to the bottom
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
      {/* 1. Background Image - Always covering the whole card */}
      <img
        src={reason.image}
        alt={reason.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* 2. Strong Gradient Overlay for Readability (Bottom Anchor) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50" />
      
      {/* 3. Content - Anchored to the bottom */}
      <div className="relative p-6 h-full flex flex-col justify-end">
        
        {/* Icon & Title */}
        <div className="flex flex-col mb-3">
           {/* Icon - White/Light Primary color */}
          <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-white group-hover:text-blue-600 border border-white/20">
            {getIcon(reason.icon)}
          </div>

          {/* Title - White Text */}
          <h3 className="text-xl font-extrabold text-white leading-snug">
            {reason.title}
          </h3>
        </div>

        {/* Description - Subtler White Text */}
        <p className="text-sm text-white/90 leading-relaxed font-normal transition-opacity duration-300 group-hover:text-white">
          {reason.desc}
        </p>

        {/* Optional: Hover accent line at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500" />
      </div>
    </div>
  );
};


export default function About({ language = 'en' }: AboutProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [expandedText, setExpandedText] = useState(false)
  
  // Carousel State and Ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll Check Logic
  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      // Adjusted scroll end check for fixed width cards and snap behavior
      const isEnd = (isRtl)
        ? (scrollLeft <= (clientWidth - scrollWidth) + 5) // RTL check
        : (scrollLeft + clientWidth >= scrollWidth - 5);  // LTR check
      setCanScrollRight(!isEnd);
    }
  }, [isRtl]);

  // Scroll Function
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Calculate scroll based on direction and RTL
      const multiplier = (direction === 'left') ? -1 : 1;
      const scrollDirection = isRtl ? -multiplier : multiplier;
      const scrollAmount = 300 * scrollDirection;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      // Delay checkScroll to ensure smooth scroll finishes before state updates
      setTimeout(checkScroll, 350); 
    }
  };

  // useEffect for scroll listeners
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
      {/* About Us Section - Dark Background (No Changes) */}
      <section id="about" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Gradients and Pattern */}
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
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 mb-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
              <span className="text-xs font-semibold tracking-widest text-blue-300 uppercase">OUR VISION</span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              {t.aboutUsTitle}
            </h2>

            {/* Accent Line */}
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

          {/* Description Text (Improved Glassmorphism) */}
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

      {/* Why Join Section - White Background (MODERNIZED OVERLAY) */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden"> 
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle gradient corners */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] opacity-70" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-[100px] opacity-70" />
        </div>

        {/* Grid Pattern (Subtler) */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00000010 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header (More Professional Styling) */}
          <div className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* Subtitle/Badge */}
            <div className={`inline-flex items-center gap-2 mb-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">JOIN OUR NETWORK</span>
              <ArrowRight className="w-4 h-4 text-blue-500" />
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              {t.whyJoinUsTitle}
            </h2>

            {/* Description */}
            <p className="text-lg text-slate-600 max-w-4xl font-normal mt-3">
              {t.whySubtitle}
            </p>
          </div>

          {/* Benefits Grid (Mobile Scrollable) */}
          <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
            
            {/* Scroll Arrows (Hidden on md+) */}
            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-xl border border-slate-200 text-blue-600 hover:text-blue-800 transition-all md:hidden ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll benefits left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Cards Container (Scrollable on small screens, Grid on md+) */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className={`flex gap-8 pb-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-0
                         md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-x-hidden
                         ${isRtl ? 'md:grid-flow-row-dense' : ''} [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
              dir={isRtl ? 'rtl' : 'ltr'} // Set direction for proper RTL scroll
            >
              {t.joinReasons.map((reason, idx) => (
                // Fixed width/height for uniform alignment on mobile
                <div 
                    key={idx} 
                    className="flex-shrink-0 snap-start w-72 h-96 lg:w-full lg:h-96" 
                    dir="ltr" // Ensure card content is LTR even in RTL container
                >
                    <BenefitCard reason={reason} />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
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
    </>
  )
}