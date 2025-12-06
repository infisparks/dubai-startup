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
        subtitle: '"Fundraiser & Pitch Battle"',
        intro: 'Showcasing innovation and facilitating investment.',
        events: [
            { iconKey: 'Pitch', title: 'Startup Pitch Competition', description: 'Over 50 startups present their ventures to investors and judges.', },
            { iconKey: 'Lounge', title: 'Investor Connect Lounge', description: 'Dedicated space for one-on-one meetings and private networking.', },
            { iconKey: 'Exhibition', title: 'Exhibition Zone', description: 'Booths for startups to showcase innovations and engage with attendees.', },
            { iconKey: 'Awards', title: 'Awards Ceremony', description: 'Recognizing outstanding startups and contributions to the ecosystem.', },
            { iconKey: 'Media', title: 'Media & PR Coverage', description: 'Ensuring widespread visibility for the event and its participants.', },
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
        subtitle: '"جمع التبرعات ومعركة العروض"',
        intro: 'عرض الابتكار وتسهيل الاستثمار.',
        events: [
            { iconKey: 'Pitch', title: 'مسابقة عرض الشركات الناشئة', description: 'أكثر من 50 شركة ناشئة تقدم مشاريعها للمستثمرين والمحكمين.', },
            { iconKey: 'Lounge', title: 'صالة تواصل المستثمرين', description: 'مساحة مخصصة للاجتماعات الفردية والتواصل الخاص.', },
            { iconKey: 'Exhibition', title: 'منطقة المعرض', description: 'أكشاك للشركات الناشئة لعرض الابتكارات والتفاعل مع الحضور.', },
            { iconKey: 'Awards', title: 'حفل توزيع الجوائز', description: 'تكريم الشركات الناشئة والمساهمات البارزة في النظام البيئي.', },
            { iconKey: 'Media', title: 'تغطية إعلامية وعلاقات عامة', description: 'ضمان انتشار واسع للحدث والمشاركين فيه.', },
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