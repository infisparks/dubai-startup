'use client'

import React from 'react'
import { FiCalendar, FiMapPin, FiAward, FiUsers, FiMic, FiShare2, FiStar, FiCamera } from 'react-icons/fi'

interface SummitAgendaProps {
    language: 'en' | 'ar'
}

// Icon mapping
const AgendaIconMap: { [key: string]: React.ElementType } = {
    Keynote: FiMic,
    Panel: FiUsers,
    Lunch: FiCalendar,
    Roundtables: FiUsers,
    Dinner: FiMapPin,
    Pitch: FiShare2,
    Lounge: FiUsers,
    Exhibition: FiMapPin,
    Awards: FiAward,
    Media: FiShare2,
    // Highlights
    StartupAwards: FiAward,
    InvestorMeetings: FiUsers,
    InnovationShowcase: FiStar,
    MediaCoverage: FiCamera,
}

const agendaData = {
    en: {
        title: 'Summit Agenda',
        subtitle: 'The Summit',
        intro: 'Provides a comprehensive platform for knowledge exchange and strategic engagement.',
        events: [
            { iconKey: 'Awards', title: 'Opening Ceremony', description: 'Kicking off the event with official welcomes and setting the tone for the summit.', },
            { iconKey: 'Keynote', title: 'Keynote Addresses', description: 'Insights from prominent figures across various industries.', },
            { iconKey: 'Panel', title: 'Industry Panels', description: 'Focused discussions on AI, Real Estate, Fintech, Crypto, and Healthcare.', },
            { iconKey: 'Lunch', title: 'Networking Lunch', description: 'An opportunity for informal connections and discussions among participants.', },
            { iconKey: 'Roundtables', title: 'Investor-Startup Roundtables', description: 'Structured sessions facilitating direct interaction between investors and startups.', },
            { iconKey: 'Dinner', title: 'Gala Dinner', description: 'A formal evening event designed for high-level networking and relationship building.', },
        ],
        highlights: [
            { iconKey: 'StartupAwards', title: 'Startup awards' },
            { iconKey: 'InvestorMeetings', title: 'Investor meetings' },
            { iconKey: 'InnovationShowcase', title: 'Innovation showcase' },
            { iconKey: 'MediaCoverage', title: 'Media coverage' },
        ],
    },
    ar: {
        title: 'جدول أعمال القمة',
        subtitle: 'القمة',
        intro: 'توفر منصة شاملة لتبادل المعرفة والمشاركة الاستراتيجية.',
        events: [
            { iconKey: 'Awards', title: 'حفل الافتتاح', description: 'انطلاق الحدث بترحيب رسمي وتحديد نغمة القمة.', },
            { iconKey: 'Keynote', title: 'الخطابات الرئيسية', description: 'رؤى من شخصيات بارزة في مختلف الصناعات.', },
            { iconKey: 'Panel', title: 'حلقات نقاش صناعية', description: 'مناقشات مركزة حول الذكاء الاصطناعي والعقارات والتكنولوجيا المالية والعملات المشفرة والرعاية الصحية.', },
            { iconKey: 'Lunch', title: 'غداء التواصل', description: 'فرصة للتواصل غير الرسمي والمناقشات بين المشاركين.', },
            { iconKey: 'Roundtables', title: 'طاولات مستديرة للمستثمرين والشركات الناشئة', description: 'جلسات منظمة تسهل التفاعل المباشر بين المستثمرين والشركات الناشئة.', },
            { iconKey: 'Dinner', title: 'حفل العشاء', description: 'حدث مسائي رسمي مصمم للتواصل رفيع المستوى وبناء العلاقات.', },
        ],
        highlights: [
            { iconKey: 'StartupAwards', title: 'جوائز الشركات الناشئة' },
            { iconKey: 'InvestorMeetings', title: 'اجتماعات المستثمرين' },
            { iconKey: 'InnovationShowcase', title: 'عرض الابتكار' },
            { iconKey: 'MediaCoverage', title: 'التغطية الإعلامية' },
        ],
    },
}

// Helper component for Agenda Items
const AgendaItem: React.FC<{ iconKey: string; title: string; description: string; isRtl: boolean }> = ({ iconKey, title, description, isRtl }) => {
    const IconComponent = AgendaIconMap[iconKey] || FiCalendar;
    return (
        <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300">
            <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 text-blue-600 shadow-sm">
                <IconComponent className="w-5 h-5" />
            </div>
            <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-1">
                    {title}
                </h4>
                <p className="text-sm text-slate-600 leading-snug">
                    {description}
                </p>
            </div>
        </div>
    );
};

// Main Component
export default function SummitAgenda({ language = 'en' }: SummitAgendaProps) {
    const t = agendaData[language]
    const isRtl = language === 'ar'

    // Data
    const currentData = t.events;
    const currentTitle = t.title;
    const currentSubtitle = t.subtitle;
    const currentIntro = t.intro;

    // Using Day 2 image as requested content copy
    const currentImageSrc = '/day2.png';

    const currentHighlights = t.highlights;
    const highlightsTitle = "Key Highlights";


    return (
        <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* --- Header --- */}
                <div className="mb-12 lg:mb-16 text-center md:text-left">
                    {/* Title Block */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6">
                        {currentTitle}
                    </h1>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto md:mx-0" />
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Image and Introduction */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-md">
                            <h3 className="text-2xl font-bold text-blue-600 mb-2">
                                {currentSubtitle}
                            </h3>
                            <p className="text-base text-slate-700 leading-relaxed">
                                {currentIntro}
                            </p>
                        </div>

                        <div className="rounded-xl overflow-hidden shadow-2xl">
                            <img
                                src={currentImageSrc}
                                alt={currentSubtitle}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Highlights (Integrated below image) */}
                        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-md space-y-3">
                            <h4 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">
                                {highlightsTitle}
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                {currentHighlights.map((highlight, index) => {
                                    const HighlightIcon = AgendaIconMap[highlight.iconKey] || FiStar;
                                    return (
                                        <div key={index} className="flex items-center gap-3">
                                            <HighlightIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                            <p className="text-sm text-slate-700">{highlight.title}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Event List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentData.map((event, index) => (
                                <AgendaItem
                                    key={index}
                                    iconKey={event.iconKey}
                                    title={event.title}
                                    description={event.description}
                                    isRtl={isRtl}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}