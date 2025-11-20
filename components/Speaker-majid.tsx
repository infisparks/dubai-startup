'use client'

import React from 'react'
import { Sparkles, Quote, Linkedin, Twitter } from 'lucide-react'

interface SpeakerProps {
  language: 'en' | 'ar'
}

const SPEAKER_IMAGE = '/majidsir.png' // Ensure this path is correct in your public folder

const translations = {
  en: {
    speakerTitle: "Keynote Speaker",
    speakerName: "Abdulmajid Ansari",
    speakerRole: "Chairman & Global Investment Strategist",
    speakerBio: "A visionary leader redefining the landscape of global finance, Abdulmajid Ansari brings over two decades of expertise in cross-border investments and venture capital. As the architect behind some of the region's most transformative deals, his insights into emerging markets and sustainable wealth creation have guided investors and founders alike toward unparalleled growth.",
    speakerQuote: "True investment isn't just about capital; it's about recognizing the potential of human ingenuity to reshape our future.",
  },
  ar: {
    speakerTitle: "المتحدث الرئيسي",
    speakerName: "عبد المجيد الأنصاري",
    speakerRole: "رئيس مجلس الإدارة واستراتيجي الاستثمار العالمي",
    speakerBio: "قائد صاحب رؤية يعيد تعريف مشهد التمويل العالمي، يجلب عبد المجيد الأنصاري أكثر من عقدين من الخبرة في الاستثمارات العابرة للحدود ورأس المال الاستثماري. بصفته المهندس وراء بعض أكثر الصفقات تحولاً في المنطقة، أرشدت رؤيته في الأسواق الناشئة وخلق الثروة المستدامة المستثمرين والمؤسسين على حد سواء نحو نمو لا مثيل له.",
    speakerQuote: "الاستثمار الحقيقي لا يتعلق فقط برأس المال؛ بل يتعلق بإدراك إمكانات الإبداع البشري لإعادة تشكيل مستقبلنا.",
  }
}

export default function SpeakerSection({ language }: SpeakerProps) {
  const t = translations[language];
  const isRtl = language === 'ar';

  return (
    <section className="relative py-20 bg-slate-950 overflow-hidden border-b border-slate-900">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isRtl ? 'lg:flex-row-reverse text-right' : 'text-left'}`}>
          
          {/* Image Side */}
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-800 shadow-2xl">
               <img 
                 src={SPEAKER_IMAGE} 
                 alt={t.speakerName}
                 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 bg-slate-800"
                 onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop";
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
               
               {/* Social Links Overlay */}
               <div className="absolute bottom-6 left-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                 <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-blue-600 hover:text-white transition-colors text-white">
                   <Linkedin className="w-5 h-5" />
                 </button>
                 <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-sky-500 hover:text-white transition-colors text-white">
                   <Twitter className="w-5 h-5" />
                 </button>
               </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12">
            <div className={`inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-800/30 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold tracking-wide text-blue-300 uppercase">
                {t.speakerTitle}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
              {t.speakerName}
            </h2>
            <p className="text-xl text-blue-400 font-medium mb-8">{t.speakerRole}</p>

            <div className="space-y-8">
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                {t.speakerBio}
              </p>

              <div className={`relative p-6 rounded-xl bg-slate-900/50 border border-slate-800 ${isRtl ? 'pr-12' : 'pl-12'}`}>
                <Quote className={`absolute top-6 ${isRtl ? 'right-4 rotate-180' : 'left-4'} w-6 h-6 text-blue-500/40`} />
                <p className="text-slate-200 italic text-lg">
                  "{t.speakerQuote}"
                </p>
              </div>
            </div>

            {/* Signature / Decoration */}
            <div className={`mt-10 h-px w-32 bg-gradient-to-r from-blue-500/50 to-transparent ${isRtl ? 'mr-0 ml-auto bg-gradient-to-l' : ''}`} />
          </div>

        </div>
      </div>
    </section>
  );
}