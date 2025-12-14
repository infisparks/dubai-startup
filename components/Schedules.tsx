'use client'

import React from 'react'
import {
    FiMic, FiUsers, FiCoffee, FiMessageCircle, FiAward,
    FiFlag, FiTrendingUp, FiLayout, FiCamera, FiStar, FiMonitor
} from 'react-icons/fi'

interface SummitAgendaProps {
    language: 'en' | 'ar'
}

// Icon mapping
const AgendaIconMap: { [key: string]: React.ElementType } = {
    Flag: FiFlag,
    Mic: FiMic,
    Users: FiUsers,
    Coffee: FiCoffee,
    Message: FiMessageCircle,
    Award: FiAward,
    TrendingUp: FiTrendingUp,
    Layout: FiLayout,
    Camera: FiCamera,
    Star: FiStar,
    Monitor: FiMonitor,
}

const agendaData = {
    en: {
        title: 'Summit Agenda',
        section1: {
            title: 'The Summit',
            description: 'Provides a comprehensive platform for knowledge exchange and strategic engagement.',
            image: '/day2.png',
            cards: [
                { iconKey: 'Flag', title: 'Opening Ceremony', description: 'Kicking off the event with official welcomes and setting the tone for the summit.' },
                { iconKey: 'Mic', title: 'Keynote Addresses', description: 'Insights from prominent figures across various industries.' },
                { iconKey: 'Users', title: 'Industry Panels', description: 'Focused discussions on AI, Real Estate, Fintech, Crypto, and Healthcare.' },
                { iconKey: 'Coffee', title: 'Networking Lunch', description: 'An opportunity for informal connections and discussions among participants.' },
                { iconKey: 'Message', title: 'Investor-Startup Roundtables', description: 'Structured sessions facilitating direct interaction between investors and startups.' },
                { iconKey: 'Award', title: 'Gala Dinner', description: 'A formal evening event designed for high-level networking and relationship building.' },
            ]
        },
        section2: {
            title: '"Fundraiser & Pitch Battle"',
            description: 'Showcasing innovation and facilitating investment',
            image: '/day1.png',
            list: [
                { title: 'Startup Pitch Competition', description: 'Over 50 startups present their ventures to investors and judges' },
                { title: 'Investor Connect Lounge', description: 'Dedicated space for one-on-one meetings and private networking' },
                { title: 'Exhibition Zone', description: 'Booths for startups to showcase innovations and engage with attendees' },
                { title: 'Awards Ceremony', description: 'Recognizing outstanding startups and contributions to the ecosystem' },
                { title: 'Media & PR Coverage', description: 'Ensuring widespread visibility for the event and its participants' },
            ],
            highlightsTitle: 'Key Highlights',
            highlights: [
                { iconKey: 'Award', title: 'Startup awards' },
                { iconKey: 'Users', title: 'Investor meetings' },
                { iconKey: 'Star', title: 'Innovation showcase' },
                { iconKey: 'Camera', title: 'Media coverage' },
            ]
        }
    },
    ar: {
        title: 'جدول أعمال القمة',
        section1: {
            title: 'القمة',
            description: 'توفر منصة شاملة لتبادل المعرفة والمشاركة الاستراتيجية.',
            image: '/day2.png',
            cards: [
                { iconKey: 'Flag', title: 'حفل الافتتاح', description: 'انطلاق الحدث بترحيب رسمي وتحديد نغمة القمة.' },
                { iconKey: 'Mic', title: 'الخطابات الرئيسية', description: 'رؤى من شخصيات بارزة في مختلف الصناعات.' },
                { iconKey: 'Users', title: 'حلقات نقاش صناعية', description: 'مناقشات مركزة حول الذكاء الاصطناعي والعقارات والتكنولوجيا المالية والعملات المشفرة والرعاية الصحية.' },
                { iconKey: 'Coffee', title: 'غداء التواصل', description: 'فرصة للتواصل غير الرسمي والمناقشات بين المشاركين.' },
                { iconKey: 'Message', title: 'طاولات مستديرة', description: 'جلسات منظمة تسهل التفاعل المباشر بين المستثمرين والشركات الناشئة.' },
                { iconKey: 'Award', title: 'حفل العشاء', description: 'حدث مسائي رسمي مصمم للتواصل رفيع المستوى وبناء العلاقات.' },
            ]
        },
        section2: {
            title: '"جمع التبرعات ومعركة العرض"',
            description: 'عرض الابتكار وتسهيل الاستثمار',
            image: '/day1.png',
            list: [
                { title: 'مسابقة عرض الشركات الناشئة', description: 'أكثر من 50 شركة ناشئة تقدم مشاريعها للمستثمرين والحكام' },
                { title: 'صالة تواصل المستثمرين', description: 'مساحة مخصصة للاجتماعات الفردية والتواصل الخاص' },
                { title: 'منطقة المعرض', description: 'أكشاك للشركات الناشئة لعرض الابتكارات والتفاعل مع الحضور' },
                { title: 'حفل توزيع الجوائز', description: 'تكريم الشركات الناشئة المتميزة والمساهمات في النظام البيئي' },
                { title: 'التغطية الإعلامية', description: 'ضمان رؤية واسعة النطاق للحدث والمشاركين فيه' },
            ],
            highlightsTitle: 'أبرز النقاط',
            highlights: [
                { iconKey: 'Award', title: 'جوائز الشركات الناشئة' },
                { iconKey: 'Users', title: 'اجتماعات المستثمرين' },
                { iconKey: 'Star', title: 'عرض الابتكار' },
                { iconKey: 'Camera', title: 'التغطية الإعلامية' },
            ]
        }
    },
}

export default function SummitAgenda({ language = 'en' }: SummitAgendaProps) {
    const t = agendaData[language]
    const isRtl = language === 'ar'

    return (
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white text-slate-900" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto space-y-20">

                {/* --- Main Title --- */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                        {t.title}
                    </h1>
                    <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                </div>

                {/* --- Section 1: The Summit --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-4 flex flex-col">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">
                                {t.section1.title}
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {t.section1.description}
                            </p>
                        </div>
                        <div className="mt-auto rounded-xl overflow-hidden shadow-lg border border-slate-100">
                            <img
                                src={t.section1.image}
                                alt={t.section1.title}
                                className="w-full h-48 lg:h-64 object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Right Column: Cards Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {t.section1.cards.map((card, idx) => {
                            const Icon = AgendaIconMap[card.iconKey] || FiStar
                            return (
                                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300 group">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <Icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                            {card.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* --- Section 2: Fundraiser & Pitch Battle --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Content & List */}
                    <div className="lg:col-span-6">
                        <div className="mb-8 p-6 rounded-xl bg-slate-50 border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                {t.section2.title}
                            </h2>
                            <p className="text-sm text-slate-600">
                                {t.section2.description}
                            </p>
                        </div>

                        <div className="space-y-6 pl-2">
                            {t.section2.list.map((item, idx) => (
                                <div key={idx} className="group">
                                    <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Image & Highlights */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-100">
                            <img
                                src={t.section2.image}
                                alt={t.section2.title}
                                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="p-6 rounded-xl bg-slate-900 text-white shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-4 text-center">
                                {t.section2.highlightsTitle}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {t.section2.highlights.map((highlight, idx) => {
                                    const Icon = AgendaIconMap[highlight.iconKey] || FiStar
                                    return (
                                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-xs font-medium text-slate-200">
                                                {highlight.title}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}