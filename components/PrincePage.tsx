'use client'

import Image from 'next/image'
import React from 'react'

interface PrincePageProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    guestOfHonor: 'Our Guest of Honor & Mentor',
    welcomeMessage:
      'We are privileged to welcome our esteemed Guest of Honor and guiding Mentor, whose vision and leadership continue to inspire excellence and innovation.',
    princeName: 'H.R.H Prince Ebrahim Sanyang',
    princeBioParagraph1:
      "H.R.H. Prince Ebrahim Sanyang is a 21st-century royal and transformative Pan-African figure whose life's work spans diplomacy, heritage, and sustainable development. As a direct descendant of the legendary rulers of the Mali & Kabu Empires, including Mansa Koto and Sankulay, he is both a traditional custodian and a leading advocate for Africa's economic and cultural renaissance.",
    princeBioParagraph2:
      'HRH Prince Ebrahim has been recognized for his exceptional leadership in economic development, transformative entrepreneurship, and pioneering investments across Africa.',
    princeBioParagraph3:
      "As a traditional custodian and leading advocate for Africa's economic and cultural renaissance, Prince Ebrahim has been involved in various initiatives. He is the Chairman of Royal Africa Holdings and has been instrumental in developing the Mansa Sansang City Project in The Gambia, a $5 billion investment aimed at driving growth and prosperity in the region.",
  },
  ar: {
    guestOfHonor: 'ضيف الشرف والمرشد لدينا',
    welcomeMessage:
      'يشرفنا أن نرحب بضيف الشرف والمرشد الموقر، الذي تستمر رؤيته وقيادته في إلهام التميز والابتكار.',
    princeName: 'صاحب السمو الأمير إبراهيم سانيانغ',
    princeBioParagraph1:
      'صاحب السمو الأمير إبراهيم سانيانغ هو شخصية ملكية وتحويلية أفريقية من القرن الحادي والعشرين، يمتد عمله الدبلوماسي والتراثي والتنمية المستدامة. بصفته سليل مباشر لحكام إمبراطوريتي مالي وكابو الأسطوريتين، بما في ذلك مانسا كوتو وسانكولاي، فهو وصي تقليدي ومدافع رائد عن النهضة الاقتصادية والثقافية لأفريقيا.',
    princeBioParagraph2:
      'وقد تم الاعتراف بصاحب السمو الملكي الأمير إبراهيم لقيادته الاستثنائية في التنمية الاقتصادية، وريادة الأعمال التحويلية، والاستثمارات الرائدة في جميع أنحاء أفريقيا.',
    princeBioParagraph3:
      'بصفته وصيًا تقليديًا ومدافعًا رائدًا عن النهضة الاقتصادية والثقافية لأفريقيا، شارك الأمير إبراهيم في مبادرات مختلفة. وهو رئيس مجلس إدارة شركة رويال أفريقيا القابضة ولعب دورًا أساسيًا في تطوير مشروع مدينة مانسا سانسانغ في غامبIA، وهو استثمار بقيمة 5 مليارات دولار يهدف إلى دفع النمو والازدهار في المنطقة.',
  },
}

export default function PrincePage({ language = 'en' }: PrincePageProps) {
  const t = translations[language]

  return (
    // UPDATED: Main background is now 'bg-slate-50'
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Orbs (these still look great on a light background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8 lg:mb-10">
              {/* UPDATED: Changed style to a professional blue sub-heading */}
              <h1 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
                {t.guestOfHonor}
              </h1>
              {/* UPDATED: Changed text to dark 'slate-900' */}
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {t.princeName}
              </h2>
              {/* UPDATED: Changed text to 'slate-600' for body copy */}
              <p className="mt-6 text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.welcomeMessage}
              </p>
            </div>

            {/* Branded underline accent */}
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto lg:mx-0 mb-8 lg:mb-10" />

            {/* UPDATED: Changed text to 'slate-600' */}
            <div className="space-y-6 text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <p>{t.princeBioParagraph1}</p>
              <p>{t.princeBioParagraph2}</p>
              <p>{t.princeBioParagraph3}</p>
            </div>
          </div>

          {/* Right Column: Image Card */}
          <div className="flex flex-col items-center justify-center order-1 lg:order-2">
            {/* UPDATED: Card is now 'bg-white' with 'border-slate-200'. Removed backdrop-blur */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl aspect-square rounded-3xl overflow-hidden p-6 sm:p-8 bg-white border border-slate-200 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-shadow duration-500">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-cyan-500/30 transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="/prince.png"
                  alt={t.princeName}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}