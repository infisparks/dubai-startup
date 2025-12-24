"use client"

import { Mail, Phone, MapPin, Clock, ArrowRight, MessageSquare, Globe } from "lucide-react"

interface ContactProps {
  language: "en" | "ar"
}

export default function Contact({ language }: ContactProps) {
  const isRtl = language === "ar"

  const translations = {
    en: {
      tagline: "Get in Touch",
      title: "We're Here to Help",
      description: "Connect with our team for inquiries about the summit, investment opportunities, or general support.",
      email: {
        title: "Email Us",
        value: "info@investariseglobal.com",
        action: "Send an email"
      },
      phone: {
        title: "Call Us",
        value: "+971 55 450 0978",
        action: "Call now"
      },
      office: {
        title: "Our Headquarters",
        value: "Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E",
        action: "Get directions"
      },
      support: {
        title: "Global Support",
        desc: "Our dedicated team is available to assist you during business hours.",
        hours: "09:00 AM - 06:00 PM (GST), Mon-Fri"
      }
    },
    ar: {
      tagline: "تواصل معنا",
      title: "نحن هنا للمساعدة",
      description: "تواصل مع فريقنا للاستفسارات حول القمة، فرص الاستثمار، أو الدعم العام.",
      email: {
        title: "البريد الإلكتروني",
        value: "info@investariseglobal.com",
        action: "أرسل بريداً إلكترونياً"
      },
      phone: {
        title: "اتصل بنا",
        value: "+971 55 450 0978",
        action: "اتصل الآن"
      },
      office: {
        title: "مقرنا الرئيسي",
        value: "ميدان جراند ستاند، الطابق السادس، طريق الميدان، ند الشبا، دبي، الإمارات العربية المتحدة",
        action: "احصل على الاتجاهات"
      },
      support: {
        title: "الدعم العالمي",
        desc: "فريقنا المخصص متاح لمساعدتك خلال ساعات العمل.",
        hours: "09:00 صباحاً - 06:00 مساءً (توقيت الخليج)، من الاثنين إلى الجمعة"
      }
    }
  }

  const t = translations[language]

  const contactMethods = [
    {
      icon: Mail,
      title: t.email.title,
      value: t.email.value,
      action: t.email.action,
      href: `mailto:${t.email.value}`,
      color: "blue"
    },
    {
      icon: Phone,
      title: t.phone.title,
      value: t.phone.value,
      action: t.phone.action,
      href: `tel:${t.phone.value}`,
      color: "cyan"
    },
    {
      icon: MapPin,
      title: t.office.title,
      value: t.office.value,
      action: t.office.action,
      href: "https://maps.google.com/maps?q=Meydan+Grandstand,+Dubai",
      color: "indigo"
    }
  ]

  return (
    <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-100/40 to-blue-100/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-6 shadow-sm">
            <MessageSquare className="w-4 h-4" />
            {t.tagline}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed font-light">
            {t.description}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon
            return (
              <a
                key={idx}
                href={method.href}
                className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Decorative top gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{method.title}</h3>

                <p className="text-slate-500 font-medium mb-8 leading-relaxed min-h-[3rem] text-sm lg:text-base">
                  {method.value}
                </p>

                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  {method.action}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </a>
            )
          })}
        </div>

        {/* Global Support / Footer Banner */}
        <div className="rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            <div className="flex items-start gap-6 max-w-2xl">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Globe className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.support.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t.support.desc}
                </p>
                <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-2 rounded-lg inline-flex">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-sm">{t.support.hours}</span>
                </div>
              </div>
            </div>

            {/* Optional Decorative or CTA Element - maintained simple for 'professional' look */}
            <div className="hidden lg:block w-px h-24 bg-slate-100" />

            {/* Brand Watermark or similar subtle touch */}
            <div className="text-center lg:text-right">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Investarise Global
              </p>
              <p className="text-xs text-slate-300">
                Connecting Visionaries
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}