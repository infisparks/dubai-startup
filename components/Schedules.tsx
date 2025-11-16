'use client'

import React, { useState } from 'react'
import { FiCalendar, FiMapPin, FiAward, FiUsers, FiMic, FiShare2, FiStar, FiCamera } from 'react-icons/fi'

interface SummitAgendaProps {
  language: 'en' | 'ar'
}

// Icon mapping (retained for functionality)
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
  // Day 2 Highlights
  StartupAwards: FiAward,
  InvestorMeetings: FiUsers,
  InnovationShowcase: FiStar,
  MediaCoverage: FiCamera,
}

const agendaData = {
  en: {
    day1Title: 'Summit Agenda - Day 1',
    day1Subtitle: 'The Summit',
    day1Intro: 'Day 1 provides a comprehensive platform for knowledge exchange and strategic engagement.',
    day1Events: [
      { iconKey: 'Keynote', title: 'Opening Ceremony', description: 'Kicking off the event with official welcomes and setting the tone for the summit.', },
      { iconKey: 'Keynote', title: 'Keynote Addresses', description: 'Insights from prominent figures across various industries.', },
      { iconKey: 'Panel', title: 'Industry Panels', description: 'Focused discussions on AI, Real Estate, Fintech, Crypto, and Healthcare.', },
      { iconKey: 'Lunch', title: 'Networking Lunch', description: 'An opportunity for informal connections and discussions among participants.', },
      { iconKey: 'Roundtables', title: 'Investor-Startup Roundtables', description: 'Structured sessions facilitating direct interaction between investors and startups.', },
      { iconKey: 'Dinner', title: 'Gala Dinner', description: 'A formal evening designed for high-level networking and relationship building.', },
    ],
    day2Title: 'Summit Agenda - Day 2',
    day2Subtitle: '"Fundraiser & Pitch Battle"',
    day2Intro: 'Showcasing innovation and facilitating investment.',
    day2Events: [
      { iconKey: 'Pitch', title: 'Startup Pitch Competition', description: 'Over 50 startups present their ventures to investors and judges.', },
      { iconKey: 'Lounge', title: 'Investor Connect Lounge', description: 'Dedicated space for one-on-one meetings and private networking.', },
      { iconKey: 'Exhibition', title: 'Exhibition Zone', description: 'Booths for startups to showcase innovations and engage with attendees.', },
      { iconKey: 'Awards', title: 'Awards Ceremony', description: 'Recognizing outstanding startups and contributions to the ecosystem.', },
      { iconKey: 'Media', title: 'Media & PR Coverage', description: 'Ensuring widespread visibility for the event and its participants.', },
    ],
    day2Highlights: [
        { iconKey: 'StartupAwards', title: 'Startup awards' },
        { iconKey: 'InvestorMeetings', title: 'Investor meetings' },
        { iconKey: 'InnovationShowcase', title: 'Innovation showcase' },
        { iconKey: 'MediaCoverage', title: 'Media coverage' },
    ],
    tab1: 'Day 1',
    tab2: 'Day 2',
  },
  ar: {
    day1Title: 'جدول أعمال القمة - اليوم الأول',
    day1Subtitle: 'القمة',
    day1Intro: 'يوفر اليوم الأول منصة شاملة لتبادل المعرفة والمشاركة الاستراتيجية.',
    day1Events: [
      { iconKey: 'Keynote', title: 'حفل الافتتاح', description: 'انطلاق الفعالية بترحيب رسمي وتحديد نغمة القمة.', },
      { iconKey: 'Keynote', title: 'الخطابات الرئيسية', description: 'رؤى من شخصيات بارزة في مختلف الصناعات.', },
      { iconKey: 'Panel', title: 'لجان الصناعة', description: 'مناقشات مركزة حول الذكاء الاصطناعي، العقارات، التكنولوجيا المالية، العملات المشفرة، والرعاية الصحية.', },
      { iconKey: 'Lunch', title: 'غداء للتواصل', description: 'فرصة للتواصل غير الرسمي والمناقشات بين المشاركين.', },
      { iconKey: 'Roundtables', title: 'موائد مستديرة للمستثمرين والشركات الناشئة', description: 'جلسات منظمة لتسهيل التفاعل المباشر بين المستثمرين والشركات الناشئة.', },
      { iconKey: 'Dinner', title: 'حفل عشاء فخم', description: 'أمسية رسمية مصممة للتواصل رفيع المستوى وبناء العلاقات.', },
    ],
    day2Title: 'جدول أعمال القمة - اليوم الثاني',
    day2Subtitle: '"جمع التبرعات ومعركة العروض"',
    day2Intro: 'عرض الابتكار وتسهيل الاستثمار.',
    day2Events: [
      { iconKey: 'Pitch', title: 'مسابقة عرض الشركات الناشئة', description: 'أكثر من 50 شركة ناشئة تقدم مشاريعها للمستثمرين والمحكمين.', },
      { iconKey: 'Lounge', title: 'صالة تواصل المستثمرين', description: 'مساحة مخصصة للاجتماعات الفردية والتواصل الخاص.', },
      { iconKey: 'Exhibition', title: 'منطقة المعرض', description: 'أكشاك للشركات الناشئة لعرض الابتكارات والتفاعل مع الحضور.', },
      { iconKey: 'Awards', title: 'حفل توزيع الجوائز', description: 'تكريم الشركات الناشئة والمساهمات البارزة في النظام البيئي.', },
      { iconKey: 'Media', title: 'تغطية إعلامية وعلاقات عامة', description: 'ضمان انتشار واسع للحدث والمشاركين فيه.', },
    ],
    day2Highlights: [
        { iconKey: 'StartupAwards', title: 'جوائز الشركات الناشئة' },
        { iconKey: 'InvestorMeetings', title: 'اجتماعات المستثمرين' },
        { iconKey: 'InnovationShowcase', title: 'عرض الابتكار' },
        { iconKey: 'MediaCoverage', title: 'التغطية الإعلامية' },
    ],
    tab1: 'اليوم الأول',
    tab2: 'اليوم الثاني',
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
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1')
  const t = agendaData[language]
  const isRtl = language === 'ar'

  // Data based on active day
  const currentData = activeDay === 'day1' ? t.day1Events : t.day2Events;
  const currentTitle = activeDay === 'day1' ? t.day1Title : t.day2Title;
  const currentSubtitle = activeDay === 'day1' ? t.day1Subtitle : t.day2Subtitle;
  const currentIntro = activeDay === 'day1' ? t.day1Intro : t.day2Intro;
  
  // LOGIC UPDATE: Determine the image source based on the active day
  const currentImageSrc = activeDay === 'day1' ? '/day1.png' : '/day2.png';

  // Day 2 specific elements
  const currentHighlights = activeDay === 'day2' ? t.day2Highlights : [];
  const highlightsTitle = "Key Highlights";


  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Day Selector (Mobile & Desktop) --- */}
        <div className="mb-12 lg:mb-16">
            {/* Mobile Tabs: Always visible at the top */}
            <div className="flex justify-center md:hidden w-full mb-8">
                 <div className="flex p-1 bg-slate-100 rounded-full shadow-inner">
                    <button
                        onClick={() => setActiveDay('day1')}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                            activeDay === 'day1'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-600 hover:text-blue-600'
                        }`}
                    >
                        {t.tab1}
                    </button>
                    <button
                        onClick={() => setActiveDay('day2')}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                            activeDay === 'day2'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-600 hover:text-blue-600'
                        }`}
                    >
                        {t.tab2}
                    </button>
                </div>
            </div>

            {/* Title Block */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 text-center md:text-left">
                {currentTitle}
            </h1>
            
            {/* Desktop Tabs: Below title on large screens */}
            <div className="hidden md:flex space-x-6 border-b border-slate-200 pb-2">
                <button
                    onClick={() => setActiveDay('day1')}
                    className={`text-xl font-semibold transition-colors duration-200 ${
                        activeDay === 'day1'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    {t.tab1}
                </button>
                <button
                    onClick={() => setActiveDay('day2')}
                    className={`text-xl font-semibold transition-colors duration-200 ${
                        activeDay === 'day2'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                    {t.tab2}
                </button>
            </div>
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
                        // IMAGE SOURCE UPDATE: Uses the user's specific path
                        src={currentImageSrc}
                        alt={currentSubtitle}
                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>

                {/* Day 2 Specific Highlights (Integrated below image) */}
                {activeDay === 'day2' && (
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
                )}
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