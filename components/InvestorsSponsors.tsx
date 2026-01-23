'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface InvestorsSponsorsProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        title: 'Our Investors',
        subtitle:
            'Investarise Global Investors Summit 2026 welcome our prestigious Investors to the Event',
        footer: "Investarise Global Investor Summit - 2026: Shaping Tomorrow's Economy",
        readMore: 'Read More',
        readLess: 'Read Less',
        investors: [
            {
                name: 'Sultan Ali Rashed Lootah',
                bio: 'Managing Director \n\nSultan Ali Rashed Lootah is a distinguished Emirati strategist and entrepreneur with senior leadership experience across government and private sectors. He has played a pivotal role in Dubai’s economic and tourism development through key positions at The Executive Office and the Dubai Department of Economy and Tourism, strengthening policy frameworks, competitiveness, and global positioning.\n\nHe has also led high-impact regional initiatives as CEO of the Mohammed bin Rashid Al Maktoum Foundation, advancing entrepreneurship and employment across the Arab world. In the private sector, he leads a diversified business group spanning investment, consultancy, real estate, and FMCG, with a strong focus on sustainable growth and long-term value creation.',
                image: '/speaker/21.png',
            },
            {
                name: 'Mr. Sushil Sharma',
                bio: 'Founder and CEO of Marwari Catalysts, fueling the startup ecosystem in Tier 2 & 3 cities. Angel investor in 100+ startups, with a focus on gender diversity and innovation.',
                image: '/speaker/14.png',
            },
            {
                name: 'Mr. Bhimkanta Bhandari',
                bio: 'Bhimkanta Bhandari is a global entrepreneur, Chairman & Managing Director, with an estimated net worth exceeding USD 100 million, built through diversified operating businesses and long-term strategic investments. He has over 7 years of international experience across trade, IT & FinTech, digital assets, insurance, mining, and mobility-related sectors, with operations spanning Asia, the GCC, and North America. Known for a compliance-first, governance-driven approach, he focuses on building scalable, technology-enabled businesses with long-term institutional value.',
                image: '/speaker/22.png',
            },
            {
                name: 'Dr. M.F.G. Thierry Catherine',
                bio: 'Dr. Thierry Catherine has 25 years of experience in the oil and gas industry and innovative technologies. His legacy is marked by innovation, collaboration, and environmental stewardship. His visionary leadership and dedication to advancing sustainable solutions in the energy, decarbonisation and water sectors have positioned him as a respected figure in the market. As a CEO, Board Member and advisor for not less than 7 companies in the Energy Industry, Dr. Thierry continues to drive positive change and inspire others in various industries.',
                image: '/speaker/17.png',
            },
            {
                name: 'Mr. Ariz',
                bio: 'CEO of Everest DG and Co-founder at EIT Global. 13+ years in engineering and tech. Investor with 3M+ $ in startups, specializing in scaling businesses globally.',
                image: '/speaker/13.png',
            },
            {
                name: 'Mr. Navneet Agarwal',
                bio: 'A seasoned entrepreneur with a diversified portfolio spanning engineering, real estate, hospitality, and international trading. An IIT Roorkee and IIM Kolkata alumnus, he founded Navneet International FZE and Navneet Accounting in UAE, leading ventures across India and the UAE.',
                image: '/speaker/16.png',
            },
            {
                name: 'Mr. Nitin Aggarwal',
                bio: 'Managing Partner at Gopinath Group with experience in Retail and SME Banking, new business setup, and strong skills in handling multiple tasks efficiently under pressure and tight deadlines.',
                image: '/speaker/2.png',
            },
            {
                name: 'Mr. Randeep Singh Nanda',
                bio: 'Managing Director at Bonn Metals Const Industries LLC, overseeing operations of companies worth USD 100 million with strong expertise in finance and strategic leadership.',
                image: '/speaker/6.png',
            },
            {
                name: 'Mr. Manzar Khan',
                bio: "Reham Group's founder has led the company for over 18 years, serving more than 1500 clients across the UAE, India, and APAC. The group is recognized for its quality service, growth, and stability.",
                image: '/speaker/7.png',
            },
            {
                name: 'Mr. Puneet Sakhuja',
                bio: 'Chartered Accountant, Insolvency Professional, Strategic Advisor, Founder of Arthah Group, and Director of International Tax & Compliance with over 18 years of experience and investments in more than 20 companies.',
                image: '/speaker/5.png',
            },
            /* {
                name: 'Ashwin Kumar',
                bio: 'Investor | 2x Entrepreneur | Technology Leader\n\nAshwin Kumar is a seasoned technology leader, 2x entrepreneur, and active investor with a proven track record of building and scaling startups. As CTO & Business Head at Ideabaaz and CEO of Startup Builder, he partners with early- and growth-stage ventures to drive innovation, product strategy, and sustainable growth.\n\nWith deep expertise in technology architecture and venture building, Ashwin mentors founders, evaluates high-potential investment opportunities, and contributes actively to the startup ecosystem.',
                image: '/speaker/27.png',
            }, */
            {
                name: 'Ankit Anand',
                bio: 'Founding Partner, Riceberg Ventures\n\nEarly-stage deep-tech investor and ETH Zürich–trained physicist with cross-border, cross-domain experience, focused on backing driven founders building globally impactful companies. Started his entrepreneurial journey at 17 and has worked across MedTech, EdTech, research, education, and creative industries.\n\nContributed to the Advanced VIRGO gravitational-wave project and helped scale Zurich-based Sleepiz across three continents. Former early team member at Embibe, which exited for USD 180M. Believes in interdisciplinary thinking as a catalyst for solving complex problems and driving meaningful innovation.',
                image: '/speaker/26.png',
            },
            {
                name: 'Sandesh Sharda',
                bio: 'Serial Entrepreneur | Global Investor | Philanthropist\n\nSandesh Sharda is a serial entrepreneur, global investor, and philanthropist with extensive experience across the USA, UK, and India. After earning his Master’s degree from Richmond University, London, he built a successful career at Oracle Corporation before founding Miracle Systems in 2003. Under his leadership, the company scaled into a leading IT services firm and was acquired by a private equity group in 2023.\n\nPost-exit, Mr. Sharda actively invests across technology, real estate, healthcare, hospitality, and senior living sectors. He is a Judge on Zee TV’s Ideabaaz, Founder of the Indian American Business Impact Group, and The Sharda Family Foundation. A highly decorated leader, he is a multiple-time SMARTCEO of the Year awardee, recipient of US federal business honors, and a recognized Silicon Valley technology entrepreneur featured in leading US publications.',
                image: '/speaker/25.png',
            },
            {
                name: 'Mudit Sharma',
                bio: 'Co-Founder, Ideabaaz | Entrepreneur | Strategic Advisor & Mentor | Angel Investor\n\nMudit Sharma is a startup ecosystem leader and Co-Founder of Ideabaaz, enabling early-stage startups through investor access, mentorship, and strategic guidance. With hands-on experience in startup operations and ecosystem building, he helps founders transform ideas into scalable ventures.\n\nPassionate about innovation and collaboration, Mudit actively strengthens connections between startups, investors, and industry leaders, driving India’s startup and innovation story forward.',
                image: '/speaker/23.png',
            },
            {
                name: 'Jeet Wagh',
                bio: 'Founder, Ideabaaz | CEO & Co-Founder, Kuberans Tech Ventures Pvt. Ltd.\n\nJeet Wagh is a startup ecosystem builder and founder of Ideabaaz, dedicated to supporting early-stage startups through strategic guidance, investor engagement, and community building. As CEO & Co-Founder of Kuberans Tech Ventures, he is building one of the world’s largest startup media platforms.\n\nPassionate about innovation, Jeet helps founders refine their vision, validate ideas, and scale effectively while fostering meaningful connections across entrepreneurs, investors, and industry leaders.',
                image: '/speaker/24.png',
            },
            {
                name: 'Anirudh Tripathy',
                bio: 'Anirudh Tripathy is an Investment Banker and Technology Specialist with over 26 years of global experience in Strategic Asset Management, Investment Banking, and Cross-Border Transactions. He is the Founder, Managing Director & CEO of KPM ASSET Group, a USA-based multi-disciplinary investment banking firm established in 1999. With deep expertise in capital structuring, global investments, and transaction advisory, he specializes across sectors including AI, Blockchain, IT, Pharmaceuticals, Real Estate & Infrastructure, and Defense Technology. He also serves on multiple global advisory boards and is the Global President of CFTIF, supporting international trade and investment ecosystems.',
                image: '/speaker/29.png',
            },
        ],
    },
    ar: {
        title: 'المستثمرون لدينا',
        subtitle:
            'ترحب قمة إنفستارايز العالمية للاستثمار 2026 بمتحدثينا المتميزين في هذا الحدث',
        footer: 'قمة إنفستارايز العالمية للمستثمرين - 2026: تشكيل اقتصاد الغد',
        readMore: 'اقرأ المزيد',
        readLess: 'اقرأ أقل',
        investors: [
            {
                name: 'سلطان علي راشد لوتاه',
                bio: 'Managing Director \n\nSultan Ali Rashed Lootah is a distinguished Emirati strategist and entrepreneur with senior leadership experience across government and private sectors. He has played a pivotal role in Dubai’s economic and tourism development through key positions at The Executive Office and the Dubai Department of Economy and Tourism, strengthening policy frameworks, competitiveness, and global positioning.\n\nHe has also led high-impact regional initiatives as CEO of the Mohammed bin Rashid Al Maktoum Foundation, advancing entrepreneurship and employment across the Arab world. In the private sector, he leads a diversified business group spanning investment, consultancy, real estate, and FMCG, with a strong focus on sustainable growth and long-term value creation.',
                image: '/speaker/21.png',
            },
            {
                name: 'السيد سوشيل شارما',
                bio: 'المؤسس والرئيس التنفيذي لشركة Marwari Catalysts، التي تغذي نظام الشركات الناشئة في مدن المستوى 2 و 3. مستثمر ملاك في أكثر من 100 شركة ناشئة، مع التركيز على التنوع بين الجنسين والابتكار.',
                image: '/speaker/14.png',
            },
            {
                name: 'السيد بهيمكانتا بهانداري',
                bio: 'Bhimkanta Bhandari is a global entrepreneur, Chairman & Managing Director, with an estimated net worth exceeding USD 100 million, built through diversified operating businesses and long-term strategic investments. He has over 7 years of international experience across trade, IT & FinTech, digital assets, insurance, mining, and mobility-related sectors, with operations spanning Asia, the GCC, and North America. Known for a compliance-first, governance-driven approach, he focuses on building scalable, technology-enabled businesses with long-term institutional value.',
                image: '/speaker/22.png',
            },
            {
                name: 'Dr. M.F.G. Thierry Catherine',
                bio: 'Dr. Thierry Catherine has 25 years of experience in the oil and gas industry and innovative technologies. His legacy is marked by innovation, collaboration, and environmental stewardship. His visionary leadership and dedication to advancing sustainable solutions in the energy, decarbonisation and water sectors have positioned him as a respected figure in the market. As a CEO, Board Member and advisor for not less than 7 companies in the Energy Industry, Dr. Thierry continues to drive positive change and inspire others in various industries.',
                image: '/speaker/17.png',
            },
            {
                name: 'السيد أريز',
                bio: 'الرئيس التنفيذي لشركة Everest DG والمؤسس المشارك في EIT Global. أكثر من 13 عامًا في الهندسة والتكنولوجيا. مستثمر بأكثر من 3 ملايين درهم في الشركات الناشئة، متخصص في توسيع نطاق الأعمال عالميًا.',
                image: '/speaker/13.png',
            },
            {
                name: 'Mr. Navneet Agarwal',
                bio: 'A seasoned entrepreneur with a diversified portfolio spanning engineering, real estate, hospitality, and international trading. An IIT Roorkee and IIM Kolkata alumnus, he founded Navneet International FZE and Navneet Accounting in UAE, leading ventures across India and the UAE.',
                image: '/speaker/16.png',
            },
            {
                name: 'السيد نيتين أغاروال',
                bio: 'الشريك الإداري في مجموعة شركات جوبيناث. استباقي وموجه نحو النتائج ولديه خبرة جيدة في الخدمات المصرفية للأفراد والخدمات المصرفية للمشاريع الصغيرة والمتوسطة وتأسيس الأعمال الجديدة. منضبط جيدًا ولديه قدرة مثبتة على إدارة مهام متعددة بكفاءة تحت ضغط شديد مع الالتزام بجداول زمنية ضيقة.',
                image: '/speaker/2.png',
            },
            {
                name: 'السيد رانديب سينغ ناندا',
                bio: 'المدير العام لشركة بون ميتالز كونست اندستريز ذ.م.م | قائد أعمال بارع يتمتع بخلفية قوية في التمويل والإدارة الاستراتيجية. بصفته المدير العام لشركة بون ميتالز كونست اندستريز ذ.م.م، يشرف على عمليات الشركات التي تبلغ قيمتها 100 مليون دولار أمريكي.',
                image: '/speaker/6.png',
            },
            {
                name: 'السيد منذر خان',
                bio: 'مؤسس مجموعة رهام. تعمل في مجال الأعمال منذ أكثر من 18 عامًا. في رحلتنا المثيرة للغاية، نجحنا في التسليم لأكثر من 1500 شركة ونفتخر بقاعدة عملاء كبيرة عبر الإمارات العربية المتحدة والهند ومناطق آسيا والمحيط الهادئ الأخرى. لقد تم تكريمنا من قبل العديد من المنظمات الرئيسية لخدمتنا عالية الجودة ونمونا واستقرارنا.',
                image: '/speaker/7.png',
            },
            {
                name: 'السيد بونيت ساخوجا',
                bio: 'محاسب قانوني | محترف إعسار | مستشار استراتيجي | مؤسس - مجموعة أرثاه | مدير - الضرائب الدولية والامتثال مع أكثر من 18 عامًا من الخبرة، استثمر في أكثر من 20 شركة حتى الآن.',
                image: '/speaker/5.png',
            },
            /* {
                name: 'Ashwin Kumar',
                bio: 'Investor | 2x Entrepreneur | Technology Leader\n\nAshwin Kumar is a seasoned technology leader, 2x entrepreneur, and active investor with a proven track record of building and scaling startups. As CTO & Business Head at Ideabaaz and CEO of Startup Builder, he partners with early- and growth-stage ventures to drive innovation, product strategy, and sustainable growth.\n\nWith deep expertise in technology architecture and venture building, Ashwin mentors founders, evaluates high-potential investment opportunities, and contributes actively to the startup ecosystem.',
                image: '/speaker/27.png',
            }, */
            {
                name: 'Ankit Anand',
                bio: 'Founding Partner, Riceberg Ventures\n\nEarly-stage deep-tech investor and ETH Zürich–trained physicist with cross-border, cross-domain experience, focused on backing driven founders building globally impactful companies. Started his entrepreneurial journey at 17 and has worked across MedTech, EdTech, research, education, and creative industries.\n\nContributed to the Advanced VIRGO gravitational-wave project and helped scale Zurich-based Sleepiz across three continents. Former early team member at Embibe, which exited for USD 180M. Believes in interdisciplinary thinking as a catalyst for solving complex problems and driving meaningful innovation.',
                image: '/speaker/26.png',
            },
            {
                name: 'Sandesh Sharda',
                bio: 'Serial Entrepreneur | Global Investor | Philanthropist\n\nSandesh Sharda is a serial entrepreneur, global investor, and philanthropist with extensive experience across the USA, UK, and India. After earning his Master’s degree from Richmond University, London, he built a successful career at Oracle Corporation before founding Miracle Systems in 2003. Under his leadership, the company scaled into a leading IT services firm and was acquired by a private equity group in 2023.\n\nPost-exit, Mr. Sharda actively invests across technology, real estate, healthcare, hospitality, and senior living sectors. He is a Judge on Zee TV’s Ideabaaz, Founder of the Indian American Business Impact Group, and The Sharda Family Foundation. A highly decorated leader, he is a multiple-time SMARTCEO of the Year awardee, recipient of US federal business honors, and a recognized Silicon Valley technology entrepreneur featured in leading US publications.',
                image: '/speaker/25.png',
            },
            {
                name: 'Mudit Sharma',
                bio: 'Co-Founder, Ideabaaz | Entrepreneur | Strategic Advisor & Mentor | Angel Investor\n\nMudit Sharma is a startup ecosystem leader and Co-Founder of Ideabaaz, enabling early-stage startups through investor access, mentorship, and strategic guidance. With hands-on experience in startup operations and ecosystem building, he helps founders transform ideas into scalable ventures.\n\nPassionate about innovation and collaboration, Mudit actively strengthens connections between startups, investors, and industry leaders, driving India’s startup and innovation story forward.',
                image: '/speaker/23.png',
            },
            {
                name: 'Jeet Wagh',
                bio: 'Founder, Ideabaaz | CEO & Co-Founder, Kuberans Tech Ventures Pvt. Ltd.\n\nJeet Wagh is a startup ecosystem builder and founder of Ideabaaz, dedicated to supporting early-stage startups through strategic guidance, investor engagement, and community building. As CEO & Co-Founder of Kuberans Tech Ventures, he is building one of the world’s largest startup media platforms.\n\nPassionate about innovation, Jeet helps founders refine their vision, validate ideas, and scale effectively while fostering meaningful connections across entrepreneurs, investors, and industry leaders.',
                image: '/speaker/24.png',
            },
            {
                name: 'أنيروده تريباتي',
                bio: 'أنيروده تريباتي هو مصرفي استثماري وأخصائي تكنولوجيا يتمتع بخبرة عالمية تزيد عن 26 عامًا في إدارة الأصول الإستراتيجية والخدمات المصرفية الاستثمارية والمعاملات عبر الحدود. وهو المؤسس والعضو المنتدب والرئيس التنفيذي لمجموعة KPM ASSET Group، وهي شركة مصرفية استثمارية متعددة التخصصات مقرها الولايات المتحدة الأمريكية وتأسست في عام 1999. بفضل خبرته العميقة في هيكلة رأس المال والاستثمارات العالمية والمعاملات الاستشارية، فإنه متخصص في قطاعات تشمل الذكاء الاصطناعي، بلوكتشين، تكنولوجيا المعلومات، الأدوية، العقارات والبنية التحتية، وتكنولوجيا الدفاع. كما يشغل عضوية العديد من المجالس الاستشارية العالمية وهو الرئيس العالمي لـ CFTIF، حيث يدعم أنظمة التجارة والاستثمار الدولية.',
                image: '/speaker/29.png',
            },
        ],
    },
}

export default function InvestorsSponsors({ language = 'en' }: InvestorsSponsorsProps) {
    const t = translations[language]
    const [expandedIds, setExpandedIds] = useState<string[]>([])
    const [isPaused, setIsPaused] = useState(false)

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Repeat investors for seamless loop
    const repeatedInvestors = [...t.investors, ...t.investors, ...t.investors, ...t.investors]

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
        <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
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
                    {/* Gradient Masks for seamless look */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        className="flex flex-nowrap overflow-x-auto no-scrollbar gap-4 px-2 py-4
                       sm:gap-8 sm:p-4
                       [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {repeatedInvestors.map((investor, idx) => {
                            const isExpanded = expandedIds.includes(investor.name)

                            return (
                                <div
                                    key={`${investor.name}-${idx}`}
                                    className="flex flex-col items-center text-center bg-slate-50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-100/50 hover:border-[#bf1e2e]/10
                             w-[85vw] flex-shrink-0
                             sm:w-[300px]"
                                >
                                    <div className="relative w-40 h-40 rounded-full mb-6 overflow-hidden shadow-md flex-shrink-0 border-4 border-white">
                                        <Image
                                            src={investor.image}
                                            alt={investor.name}
                                            width={160}
                                            height={160}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-[#bf1e2e] transition-colors">
                                        {investor.name}
                                    </h3>

                                    <div className="flex-grow flex flex-col w-full">
                                        <p
                                            className={`text-sm text-slate-600 leading-relaxed flex-grow whitespace-pre-wrap ${!isExpanded ? 'line-clamp-2' : ''
                                                }`}
                                        >
                                            {investor.bio}
                                        </p>

                                        <button
                                            onClick={() => toggleExpand(investor.name)}
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
