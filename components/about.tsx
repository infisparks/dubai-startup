'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp, ArrowRight, Sparkles, Target, TrendingUp, Globe, Shield, Zap, Users, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'

interface AboutProps {
  language: 'en' | 'ar'
}

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
    whyJoinUsTitle: 'Why Join With Us?',
    whySubtitle: 'Unlock unlimited possibilities and grow with the community',
    joinReasons: [
      {
        title: 'Access High-Growth Opportunities',
        desc: 'Invest early in ventures with huge potential.',
        icon: 'trending'
      },
      {
        title: 'Proven Expertise',
        desc: 'Work with a team that consistently delivers results.',
        icon: 'target'
      },
      {
        title: 'Smart Matchmaking',
        desc: 'Connect with the right founders and investors.',
        icon: 'users'
      },
      {
        title: 'Exclusive Events & Summits',
        desc: 'Network, collaborate, and discover deals.',
        icon: 'sparkles'
      },
      {
        title: 'Global Reach & Exposure',
        desc: 'Boost your brand across industries and markets.',
        icon: 'globe'
      },
      {
        title: 'Data-Driven Insights',
        desc: 'Make confident, informed investment decisions.',
        icon: 'zap'
      },
      {
        title: 'Secure & Transparent Process',
        desc: 'Invest with clarity and trust.',
        icon: 'shield'
      },
      {
        title: 'Impactful Opportunities',
        desc: 'Grow your portfolio while making a difference.',
        icon: 'check'
      },
    ],
  },
  ar: {
    aboutUsTitle: 'عنّا',
    investorsTitle: 'مستثمرو إنفسترايز العالميون',
    aboutPartial:
      'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال. مع 90% من ميزاتنا المجانية، نبقى ملتزمين بإمكانية الوصول والشفافية والثقة.',
    aboutDescription:
      'تجمع قمة إنفسترايز العالمية للمستثمرين المؤسسين ذوي الرؤى مع المستثمرين النخبة وشركات رأس المال الاستثماري والمكاتب العائلية في جميع أنحاء العالم. مهمتنا هي تمكين الابتكار من خلال إنشاء جسر سلس بين الطموح ورأس المال. اليوم، تدفع إنفسترايز تدفق الصفقات لأكثر من 100 شبكة استثمار عالمية، مما يساعد الشركات الناشئة على تأمين الشراكات الصحيحة للتوسع. مع 90% من ميزاتنا المجانية، نبقى ملتزمين بإمكانية الوصول والشفافية والثقة. من خلال إنفسترايز بريميوم، نتجاوز الرقمي – نستضيف قمم استثمار عالمية حصرية، وجلسات عرض، وفعاليات تواصل. انضم إلينا في قمة إنفسترايز العالمية – دبي 2026، حيث تلتقي الأفكار بالفرص.',
    readMore: 'اقرأ القصة الكاملة',
    readLess: 'إظهار أقل',
    whyJoinUsTitle: 'لماذا تنضم إلينا؟',
    whySubtitle: 'افتح إمكانيات غير محدودة وانمُ مع المجتمع',
    joinReasons: [
      {
        title: 'الوصول إلى فرص النمو العالي',
        desc: 'استثمر مبكراً في مشاريع ذات إمكانيات هائلة.',
        icon: 'trending'
      },
      {
        title: 'خبرة مثبتة',
        desc: 'اعمل مع فريق يقدم نتائج باستمرار.',
        icon: 'target'
      },
      {
        title: 'مطابقة ذكية',
        desc: 'تواصل مع المؤسسين والمستثمرين المناسبين.',
        icon: 'users'
      },
      {
        title: 'فعاليات وقمم حصرية',
        desc: 'تواصل وتعاون واكتشف الصفقات.',
        icon: 'sparkles'
      },
      {
        title: 'انتشار عالمي وتعرض',
        desc: 'عزز علامتك التجارية عبر الصناعات والأسواق.',
        icon: 'globe'
      },
      {
        title: 'رؤى مدفوعة بالبيانات',
        desc: 'اتخذ قرارات استثمارية واثقة ومستنيرة.',
        icon: 'zap'
      },
      {
        title: 'عملية آمنة وشفافة',
        desc: 'استثمر بوضوح وثقة.',
        icon: 'shield'
      },
      {
        title: 'فرص مؤثرة',
        desc: 'نمِ محفظتك مع إحداث فرق.',
        icon: 'check'
      },
    ],
  },
}

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'trending':
      return <TrendingUp className="w-5 h-5" />
    case 'target':
      return <Target className="w-5 h-5" />
    case 'users':
      return <Users className="w-5 h-5" />
    case 'sparkles':
      return <Sparkles className="w-5 h-5" />
    case 'globe':
      return <Globe className="w-5 h-5" />
    case 'zap':
      return <Zap className="w-5 h-5" />
    case 'shield':
      return <Shield className="w-5 h-5" />
    case 'check':
      return <CheckCircle className="w-5 h-5" />
    default:
      return null
  }
}

// Helper component for the Benefit Card
const BenefitCard: React.FC<{ reason: (typeof translations.en.joinReasons)[0] }> = ({ reason }) => (
  <div
    className="relative h-full overflow-hidden rounded-xl transition-all duration-500"
  >
    {/* Background Card */}
    <div className="absolute inset-0 bg-white border-2 border-slate-200 group-hover:border-blue-400 rounded-xl transition-all duration-500" />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)'
      }}
    />

    {/* Content */}
    <div className="relative p-5 h-full flex flex-col">
      {/* Icon */}
      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
        {getIcon(reason.icon)}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
        {reason.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 flex-grow">
        {reason.desc}
      </p>

      {/* Bottom Line */}
      <div className="mt-4 h-0.5 w-0 group-hover:w-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300" />
    </div>
  </div>
);


export default function About({ language = 'en' }: AboutProps) {
  const t = translations[language]
  const isRtl = language === 'ar'
  const [expandedText, setExpandedText] = useState(false)
  
  // ADDED: Carousel State and Ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ADDED: Scroll Check Logic
  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      // Fixed width cards mean we check if the end is within a small buffer
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5); 
    }
  }, []);

  // ADDED: Scroll Function
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Scroll by a fixed amount (approx card width)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  // ADDED: useEffect for scroll listeners
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
      {/* About Us Section - Dark Background (No major changes here) */}
      <section id="about" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent)`,
            backgroundSize: '80px 80px'
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className={`mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
              <span className="text-xs font-semibold tracking-widest text-blue-300 uppercase">About Our Company</span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              {t.aboutUsTitle}
            </h2>

            {/* Accent Line */}
            <div className="flex gap-3 items-start">
              <div className="w-1.5 h-10 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full" />
            </div>
          </div>

          {/* Investors Title Card */}
          <div className="mb-8">
            <div className="inline-block">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="relative px-6 py-4 bg-slate-800/40 border border-slate-700/50 group-hover:border-cyan-500/50 rounded-xl transition-all duration-500 backdrop-blur-sm">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    {t.investorsTitle}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-6 sm:p-8 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-500">
            <p className="text-sm sm:text-base lg:text-base text-slate-300 leading-relaxed font-light">
              {expandedText ? t.aboutDescription : t.aboutPartial}
              {!expandedText && <span className="text-cyan-400 font-semibold">...</span>}
            </p>

            {!expandedText && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-800/30 to-transparent rounded-b-xl pointer-events-none" />
            )}
          </div>

          {/* Button */}
          <div className="flex gap-4 pt-6">
            {!expandedText ? (
              <button
                onClick={() => setExpandedText(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 text-sm"
              >
                <span>{t.readMore}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setExpandedText(false)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
              >
                <span>{t.readLess}</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Why Join Section - White Background */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-20" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(15, 23, 42, 0.1) 25%, rgba(15, 23, 42, 0.1) 26%, transparent 27%, transparent 74%, rgba(15, 23, 42, 0.1) 75%, rgba(15, 23, 42, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(15, 23, 42, 0.1) 25%, rgba(15, 23, 42, 0.1) 26%, transparent 27%, transparent 74%, rgba(15, 23, 42, 0.1) 75%, rgba(15, 23, 42, 0.1) 76%, transparent 77%, transparent)`,
            backgroundSize: '80px 80px'
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className={`mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              <span className="text-xs font-semibold tracking-widest text-slate-600 uppercase">Partnership Benefits</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 tracking-tight leading-tight">
              {t.whyJoinUsTitle}
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-light mt-3">
              {t.whySubtitle}
            </p>
          </div>

          {/* Benefits Grid (Mobile Scrollable) */}
          <div className="relative -mx-4 px-4 md:mx-0 md:px-0"> {/* Added relative container for arrows */}
            
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg border border-slate-200 hover:shadow-xl transition-all md:hidden"
                aria-label="Scroll benefits left"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
            )}

            {/* Cards Container (Scrollable on small screens, Grid on md+) */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              // UPDATED: Added px-4 offset for better visual framing on mobile
              className="flex gap-6 pb-2 overflow-x-auto snap-x snap-mandatory px-4 md:px-0
                         md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-x-hidden"
              style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {t.joinReasons.map((reason, idx) => (
                // UPDATED: Added fixed width/height for uniform alignment on mobile
                <div 
                    key={idx} 
                    className="flex-shrink-0 snap-start w-64 h-72 sm:w-72 md:w-full md:h-auto md:flex-shrink-0"
                >
                    <BenefitCard reason={reason} />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg border border-slate-200 hover:shadow-xl transition-all md:hidden"
                aria-label="Scroll benefits right"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}