'use client'

import React from 'react'
import BrandTicker from './BrandTicker'
import AboutInfo from './AboutInfo'
import FeaturesTicker from './FeaturesTicker'

interface AboutProps {
    language: 'en' | 'ar'
}

const featuresTranslations = {
    en: [
        { title: 'Access High-Growth Opportunities', desc: 'Invest early in ventures with huge potential.' },
        { title: 'Smart Matchmaking', desc: 'Connect with the right founders and investors.' },
        { title: 'Global Reach & Exposure', desc: 'Boost your brand across industries and markets.' },
        { title: 'Proven Expertise', desc: 'Work with a team that consistently delivers results.' },
        { title: 'Exclusive Events & Summits', desc: 'Network, collaborate, and discover deals.' },
        { title: 'Data-Driven Insights', desc: 'Make confident, informed investment decisions.' },
        { title: 'Secure & Transparent Process', desc: 'Invest with clarity and trust.' },
        { title: 'Impactful Opportunities', desc: 'Grow your portfolio while making a difference.' },
    ],
    ar: [
        { title: 'الوصول إلى فرص عالية النمو', desc: 'استثمر مبكراً في مشاريع ذات إمكانات هائلة.' },
        { title: 'التوفيق الذكي', desc: 'تواصل مع المؤسسين والمستثمرين المناسبين.' },
        { title: 'الوصول العالمي والتعرض', desc: 'عزز علامتك التجارية عبر الصناعات والأسواق.' },
        { title: 'خبرة مثبتة', desc: 'اعمل مع فريق يقدم نتائج باستمرار.' },
        { title: 'فعاليات وقمم حصرية', desc: 'تواصل، تعاون، واكتشف الصفقات.' },
        { title: 'رؤى مدعومة بالبيانات', desc: 'اتخذ قرارات استثمارية واثقة ومستنيرة.' },
        { title: 'عملية آمنة وشفافة', desc: 'استثمر بوضوح وثقة.' },
        { title: 'فرص مؤثرة', desc: 'نمِّ محفظتك بينما تحدث فرقاً.' },
    ],
}

export default function About({ language = 'en' }: AboutProps) {
    const isRtl = language === 'ar'
    const features = featuresTranslations[language]

    return (
        <div className="flex flex-col">
            {/* Supporting Partners Logo Ticker */}
            <BrandTicker />

            {/* Main About Content with improved UX/UI */}
            <AboutInfo language={language} />

            {/* Features/Objectives Horizontal Ticker */}
            <FeaturesTicker features={features} isRtl={isRtl} />
        </div>
    )
}