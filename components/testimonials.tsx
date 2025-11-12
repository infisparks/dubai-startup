"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialsProps {
  language: "en" | "ar"
}

const translations = {
  en: {
    title: "Investor & Founder Voices",
    testimonials: [
      {
        name: "Ahmed Al Mansoori",
        role: "Founder, TechVenture",
        content:
          "Investarise provided the perfect platform to showcase our innovation to serious investors. The support has been invaluable.",
        avatar: "AM",
      },
      {
        name: "Sarah Johnson",
        role: "Investment Manager",
        content:
          "The transparency and quality of deals on Investarise is unmatched. We have found our best portfolio companies here.",
        avatar: "SJ",
      },
      {
        name: "Mohammed Al Balushi",
        role: "Venture Capitalist",
        content:
          "A game-changer for Dubai's startup ecosystem. Highly recommended for any serious investor looking for opportunities.",
        avatar: "MB",
      },
    ],
  },
  ar: {
    title: "أصوات المستثمرين والمؤسسين",
    testimonials: [
      {
        name: "أحمد المنصوري",
        role: "مؤسس، TechVenture",
        content: "قدمت Investarise المنصة المثالية لعرض ابتكارنا على المستثمرين الجادين.",
        avatar: "AM",
      },
      {
        name: "سارة جونسون",
        role: "مدير الاستثمار",
        content: "شفافية وجودة الصفقات على Investarise لا مثيل لها.",
        avatar: "SJ",
      },
      {
        name: "محمد البلوشي",
        role: "رأس المال الاستثماري",
        content: "غيّرت قواعد اللعبة في النظام البيئي للشركات الناشئة في دبي.",
        avatar: "MB",
      },
    ],
  },
}

export default function Testimonials({ language }: TestimonialsProps) {
  const t = translations[language]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">{t.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.testimonials.map((testimonial, idx) => (
            <div key={idx} className="animate-slideInUp" style={{ animationDelay: `${idx * 0.15}s` }}>
              <Card className="group h-full hover:shadow-2xl transition-all duration-500 border-[#013371]/10 hover:border-[#013371]/50 hover:bg-gradient-to-br hover:from-[#013371]/5 hover:to-transparent">
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400 transform group-hover:scale-110 transition-transform"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed italic">"{testimonial.content}"</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#013371] to-[#024fa3] rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
