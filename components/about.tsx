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
    investorsTitle: 'Investarise Global Investment Summit',
    aboutPartial: 'Investarise Global Investment Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide.Our mission is to empower innovation/ dreams / new ideas by creating a seamless bridge between ambition and capital.',
    aboutDescription: 'Investarise Global Investment Summit connects visionary founders with elite investors, venture capital firms, and family offices worldwide.Our mission is to empower innovation/ dreams / new ideas by creating a seamless bridge between ambition and capital.The summit aims to empower entrepreneurs and high-potential businesses, particularly those from underrepresented or emerging markets, by providing them with direct access to investors, funding opportunities, and strategic guidance.By cultivating an environment where ambition meets investment, the summit seeks to unlock new avenues for innovation, job creation, and economic progress on a global scale.Today, Investarise drives deal flow for over 100 + global investment networks, helping startups secure the right partnerships to scale.Through Investarise service platform, we remain committed to accessibility, transparency, and trust and go beyond the digital - hosting exclusive global investment summits, pitch sessions, and networking events.\n\nJoin us at the Investarise Global Summit – Dubai 2026, where ideas meet opportunity and the below mentioned follows.',
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
    <div className="w-full bg-slate-950 border-b border-slate-800/50 py-10 sm:py-12 overflow-hidden relative z-20">
      {/* Enhanced Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none"></div>

      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto gap-16 sm:gap-32 px-4 no-scrollbar select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {repeatedLogos.map((num, i) => (
          <div key={i} className="flex-shrink-0 group cursor-pointer relative">
            <div className="absolute -inset-4 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-xl transition-colors duration-500" />
            <img
              src={`${BRAND_BASE_PATH}/${num}.png`}
              alt={`Partner Brand ${num}`}
              className="h-12 sm:h-16 w-auto max-w-none object-contain transition-all duration-500 transform group-hover:scale-110"
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
    <div className="w-full py-8 overflow-hidden relative z-20 mt-8">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

      <div
        ref={scrollRef}
        className="flex items-stretch overflow-x-auto gap-6 no-scrollbar select-none"
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
            className={`flex-shrink-0 w-72 sm:w-80 p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all duration-300 hover:border-blue-500/30 group ${isRtl ? 'text-right' : 'text-left'
              }`}
          >
            <h4 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              {feature.title}
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
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
            <p className="text-base lg:text-lg text-slate-200 leading-relaxed font-light whitespace-pre-line">
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

        {/* Features Ticker */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <FeaturesTicker features={t.features} isRtl={isRtl} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">Investarise Global Investor Summit – 2026: Shaping Tomorrow's Economy</p>
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