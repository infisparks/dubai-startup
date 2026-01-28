'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface SpeakersPageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'Our Speakers',
    subtitle:
      'Investarise Global Investors Summit 2026 welcome our prestigious speakers.',
    footer: "Investarise Global Investor Summit - 2026: Shaping Tomorrow's Economy",
    readMore: 'Read More',
    readLess: 'Read Less',
    speakers: [
      {
        name: 'Sushil Sharma',
        bio: 'Founder and CEO of Marwari Catalysts, fueling the startup ecosystem in Tier 2 & 3 cities. Angel investor in 100+ startups, with a focus on gender diversity and innovation.',
        image: '/speaker/14.png',
      },
      {
        name: 'Dr. Manav Ahuja',
        bio: 'Driving business success with modern strategies, backed by 25+ years in business and consultancy, and a doctorate in Human Psychology. Supported 100 entrepreneurs and trained 1,000 sales professionals.',
        image: '/speaker/11.png',
      },
      {
        name: 'Dr. Alexandru Nedelcu',
        bio: 'Dr. Alexandru Nedelcu is known for excellent patient care, innovative treatments, and a compassionate dedication to helping cancer patients.',
        image: '/speaker/8.png',
      },
      {
        name: 'Abdulmajid Ansari',
        bio: 'Serial Entrepreneur, Founder ARBA Accelerator LLP, Head of Business Incubation AIKTC',
        image: '/speaker/3.png',
      },
      {
        name: 'Jatin Bajaj',
        bio: 'Certified trainer for AML & Fraud, Banking Products and Policies, have achieved 23% increase in the productivity and the retention with the last organization',
        image: '/speaker/12.png',
      },
      {
        name: 'Muzaffar Ahmad',
        bio: 'Muzaffar Ahmad is a globally recognized AI leader, author, and advocate for Responsible AI. Founder of RAGN and Chairman of Kazma Technology, he drives AI-led innovation and secure digital transformation. As CAIO at Data Automation and Founder of ChatWeft, he leads scalable AI solutions. A sought-after speaker and author, he advises global organizations on Responsible GenAI strategy, aligning innovation with regulation and human values.',
        image: '/speaker/15.png',
      },
      {
        name: 'Prof Dr Yasir Amin A.Latif',
        bio: 'Highly accomplished General and Endocrine Surgeon with over 26 years of clinical experience. Internationally recognized for pioneering scar-free Transoral Endoscopic Endocrine Surgery and introducing the globally cited "Dubai Triangle" and "Amin’s Triangle" anatomical landmarks.',
        image: '/speaker/18.png',
      },
      {
        name: 'Anirudh Tripathy',
        bio: 'Anirudh Tripathy is an Investment Banker and Technology Specialist with over 26 years of global experience in Strategic Asset Management, Investment Banking, and Cross-Border Transactions. He is the Founder, Managing Director & CEO of KPM ASSET Group, a USA-based multi-disciplinary investment banking firm established in 1999. With deep expertise in capital structuring, global investments, and transaction advisory, he specializes across sectors including AI, Blockchain, IT, Pharmaceuticals, Real Estate & Infrastructure, and Defense Technology. He also serves on multiple global advisory boards and is the Global President of CFTIF, supporting international trade and investment ecosystems.',
        image: '/speaker/29.png',
      },
    ],
  },
  ar: {
    title: 'المتحدثون لدينا',
    subtitle:
      'ترحب قمة إنفستارايز العالمية للاستثمار 2026 بمتحدثينا المتميزين في هذا الحدث',
    footer: 'قمة إنفستارايز العالمية للمستثمرين - 2026: تشكيل اقتصاد الغد',
    readMore: 'اقرأ المزيد',
    readLess: 'اقرأ أقل',
    speakers: [
      {
        name: 'سوشيل شارما',
        bio: 'المؤسس والرئيس التنفيذي لشركة Marwari Catalysts، التي تغذي نظام الشركات الناشئة في مدن المستوى 2 و 3. مستثمر ملاك في أكثر من 100 شركة ناشئة، مع التركيز على التنوع بين الجنسين والابتكار.',
        image: '/speaker/14.png',
      },
      {
        name: 'د. ماناف أهوجا',
        bio: 'تحويل نجاح الأعمال بنهج حديث. 25+ عامًا من الخبرة الغنية في الأعمال والاستشارات، حاصل على درجة الدكتوراه في علم النفس البشري. قام برعاية أعمال 100 رائد أعمال، ودرب 1000 مرشح على أعمال المبيعات.',
        image: '/speaker/11.png',
      },
      {
        name: 'د. ألكسندرو نيديلكو',
        bio: 'أسس الدكتور ألكسندرو نيديلكو سمعة للتميز في رعاية المرضى، والنهج العلاجية المبتكرة، والالتزام الرحيم بتحسين حياة المتأثرين بالسرطان.',
        image: '/speaker/8.png',
      },
      {
        name: 'عبد المجيد أنصاري',
        bio: 'رئيس مجلس الإدارة واستراتيجي الاستثمار العالمي، قائد ذو رؤية يعيد تعريف مشهد التمويل العالمي، وأكثر من عقدين من الخبرة في الاستثمارات عبر الحدود ورأس المال الاستثماري. بصفته المهندس وراء بعض أكثر الصفقات تحولًا في المنطقة.',
        image: '/speaker/3.png',
      },
      {
        name: 'جاتين باجاج',
        bio: 'مدرب معتمد في مكافحة غسيل الأموال والاحتيال، والمنتجات والسياسات المصرفية، حقق زيادة بنسبة 23٪ في الإنتاجية والاحتفاظ بالموظفين في المنظمة السابقة.',
        image: '/speaker/12.png',
      },
      {
        name: 'مظفر أحمد',
        bio: 'مظفر أحمد هو قائد عالمي في مجال الذكاء الاصطناعي، ومؤلف، ومدافع عن الذكاء الاصطناعي المسؤول. مؤسس شبكة حوكمة الذكاء الاصطناعي المسؤول (RAGN) ورئيس مجلس إدارة Kazma Technology، يقود الابتكار القائم على الذكاء الاصطناعي. بصفته الرئيس التنفيذي للذكاء الاصطناعي في Data Automation ومؤسس ChatWeft، يقود حلول الذكاء الاصطناعي القابلة للتطوير. كمتحدث ومؤلف مطلوب، يقدم المشورة للمؤسسات العالمية حول استراتيجية الذكاء الاصطناعي التوليدي المسؤول.',
        image: '/speaker/15.png',
      },
      {
        name: 'Prof Dr Yasir Amin A.Latif',
        bio: 'Highly accomplished General and Endocrine Surgeon with over 26 years of clinical experience. Internationally recognized for pioneering scar-free Transoral Endoscopic Endocrine Surgery and introducing the globally cited "Dubai Triangle" and "Amin’s Triangle" anatomical landmarks.',
        image: '/speaker/18.png',
      },
      {
        name: 'أنيروده تريباتي',
        bio: 'أنيروده تريباتي هو مصرفي استثماري وأخصائي تكنولوجيا يتمتع بخبرة عالمية تزيد عن 26 عامًا في إدارة الأصول الإستراتيجية والخدمات المصرفية الاستثمارية والمعاملات عبر الحدود. وهو المؤسس والعضو المنتدب والرئيس التنفيذي لمجموعة KPM ASSET Group، وهي شركة مصرفية استثمارية متعددة التخصصات مقرها الولايات المتحدة الأمريكية وتأسست في عام 1999. بفضل خبرته العميقة في هيكلة رأس المال والاستثمارات العالمية والمعاملات استشارية، فإنه متخصص في قطاعات تشمل الذكاء الاصطناعي، بلوكتشين، تكنولوجيا المعلومات، الأدوية، العقارات والبنية التحتية، وتكنولوجيا الدفاع. كما يشغل عضوية العديد من المجالس الاستشارية العالمية وهو الرئيس العالمي لـ CFTIF، حيث يدعم أنظمة التجارة والاستثمار الدولية.',
        image: '/speaker/29.png',
      },
    ],
  },
}

export default function SpeakersPage({ language = 'en' }: SpeakersPageProps) {
  const t = translations[language]
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Repeat speakers for seamless loop
  const repeatedSpeakers = [...t.speakers, ...t.speakers, ...t.speakers, ...t.speakers]

  const toggleExpand = (name: string) => {
    setExpandedIds((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    )
  }

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    let animationId: number
    const animate = () => {
      if (!isPaused) {
        const speed = 0.5 // Adjust speed for smoothness
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
    <section id="speakers" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="mt-6 h-1.5 w-24 bg-gradient-to-r from-[#bf1e2e] to-[#940200] rounded-full mx-auto" />
        </div>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex flex-nowrap overflow-x-auto no-scrollbar gap-4 px-2 py-4
                       sm:gap-8 sm:py-8
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {repeatedSpeakers.map((speaker, idx) => {
              const isExpanded = expandedIds.includes(speaker.name)

              return (
                <div
                  key={`${speaker.name}-${idx}`}
                  className="flex flex-col items-center text-center bg-slate-50 rounded-3xl p-6 shadow-lg hover:shadow-xl hover:border-[#bf1e2e]/10 transition-all duration-300
                             w-[85vw] flex-shrink-0
                             sm:w-80"
                >
                  <div className="relative w-40 h-40 rounded-full mb-6 overflow-hidden shadow-md flex-shrink-0 border-4 border-white">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-[#bf1e2e] transition-colors">
                    {speaker.name}
                  </h3>

                  <div className="flex-grow flex flex-col w-full">
                    <p
                      className={`text-sm text-slate-600 leading-relaxed flex-grow whitespace-pre-wrap ${!isExpanded ? 'line-clamp-2' : ''
                        }`}
                    >
                      {speaker.bio}
                    </p>

                    <button
                      onClick={() => toggleExpand(speaker.name)}
                      className="text-sm font-semibold text-[#bf1e2e] bg-red-50 hover:bg-red-100 rounded-full px-4 py-1.5 transition-colors mt-4 self-center flex-shrink-0"
                    >
                      {isExpanded ? t.readLess : t.readMore}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-sm font-semibold text-slate-500 tracking-wide">
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  )
}