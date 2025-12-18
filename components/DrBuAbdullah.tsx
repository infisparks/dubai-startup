'use client'

import Image from 'next/image'
import React from 'react'
import { Award, Briefcase, Globe } from 'lucide-react'

interface DrBuAbdullahProps {
    language: 'en' | 'ar'
}

const translations = {
    en: {
        sectionTitle: 'Distinguished Guest',
        name: 'Dr. Bu Abdullah',
        role: 'Chairman, Bu Abdullah Group of Companies',
        description: [
            "Dr. Bu Abdullah (Yaqoub Mousa) is a visionary Emirati businessman and philanthropist, standing as a pillar of leadership in the UAE's corporate landscape. As the Chairman of the Bu Abdullah Group of Companies, he oversees a diverse portfolio spanning over 270 companies globally, ranging from legal consultancy and real estate to business solutions.",
            "A Guinness World Record holder and recipient of the 'Young Emirati Entrepreneur of the Year' award, Dr. Bu Abdullah is celebrated for his strategic acumen and humanitarian efforts. His work not only drives economic growth but also fosters strong cultural and business ties between nations, particularly strengthening the UAE-India relationship.",
            "His journey from a dedicated public servant to a global business tycoon serves as an inspiration, embodying the spirit of innovation and excellence that defines the Emirates."
        ],
        stats: [
            { label: 'Companies', value: '270+' },
            { label: 'Global Awards', value: '15+' },
            { label: 'Years Experience', value: '18+' },
        ]
    },
    ar: {
        sectionTitle: 'ضيف متميز',
        name: 'د. بو عبد الله',
        role: 'رئيس مجلس إدارة مجموعة شركات بو عبد الله',
        description: [
            "الدكتور بو عبد الله (يعقوب موسى) هو رجل أعمال إماراتي صاحب رؤية ومحسن، يقف كركيزة للقيادة في المشهد المؤسسي لدولة الإمارات العربية المتحدة. بصفته رئيس مجلس إدارة مجموعة شركات بو عبد الله، يشرف على محفظة متنوعة تضم أكثر من 270 شركة عالميًا، تتراوح من الاستشارات القانونية والعقارات إلى حلول الأعمال.",
            "بصفته حامل لقب غينيس للأرقام القياسية وحاصل على جائزة 'رائد الأعمال الإماراتي الشاب لهذا العام'، يُحتفى بالدكتور بو عبد الله لفطنته الاستراتيجية وجهوده الإنسانية. لا يقتصر عمله على دفع النمو الاقتصادي فحسب، بل يعزز أيضًا الروابط الثقافية والتجارية القوية بين الدول، وخاصة تعزيز العلاقات بين الإمارات والهند.",
            "تعتبر رحلته من موظف عام متفاني إلى قطب أعمال عالمي مصدر إلهام، حيث يجسد روح الابتكار والتميز التي تعرف بها الإمارات."
        ],
        stats: [
            { label: 'الشركات', value: '+270' },
            { label: 'الجوائز العالمية', value: '+15' },
            { label: 'سنوات الخبرة', value: '+18' },
        ]
    },
}

export default function DrBuAbdullah({ language = 'en' }: DrBuAbdullahProps) {
    const t = translations[language]
    const isRtl = language === 'ar'

    return (
        <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Image Column */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                            {/* Image Placeholder - User needs to add the actual image */}
                            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                            <Image
                                src="/abdullah.png" // Ensure this image exists in public folder
                                alt={t.name}
                                layout="fill"
                                objectFit="cover"
                                className="hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    // Fallback if image is missing
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('bg-slate-300');
                                }}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                            {/* Floating Badge */}
                            <div className={`absolute bottom-6 ${isRtl ? 'right-6' : 'left-6'} bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50`}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Award Winner</p>
                                        <p className="text-sm font-bold text-slate-900">Young Entrepreneur of the Year</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Pattern */}
                        <div className={`absolute -z-10 top-10 ${isRtl ? '-left-10' : '-right-10'} w-2/3 h-2/3 bg-slate-100 rounded-3xl -rotate-6`} />
                    </div>

                    {/* Content Column */}
                    <div className={`w-full lg:w-1/2 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">
                                {t.sectionTitle}
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                            {t.name}
                        </h2>
                        <p className="text-xl text-amber-600 font-medium mb-8">
                            {t.role}
                        </p>

                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            {t.description.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Stats Grid */}
                        <div className={`grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-slate-100 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {t.stats.map((stat, idx) => (
                                <div key={idx}>
                                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
