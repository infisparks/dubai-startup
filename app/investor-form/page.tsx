"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function InvestorFormPage() {
  const [step, setStep] = useState(1)
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    linkedin: "",
    investmentAmount: "",
    investmentType: "",
    experience: "",
    interests: [] as string[],
  })

  const translations = {
    en: {
      title: "Investor Registration",
      subtitle: "Join our network of visionary investors",
      personalInfo: "Personal Information",
      investmentDetails: "Investment Details",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      linkedin: "LinkedIn Profile",
      investmentAmount: "Investment Amount",
      investorType: "Investor Type",
      experience: "Investment Experience",
      areas: "Areas of Interest",
      back: "Back",
      next: "Next",
      submit: "Submit Application",
      required: "Required",
      placeholder: {
        name: "Enter your full name",
        phone: "Enter your phone number",
        email: "Enter your email",
        linkedin: "https://linkedin.com/in/yourprofile",
      },
      interests: ["Technology", "Healthcare", "FinTech", "E-commerce", "SaaS", "EdTech"],
      ranges: [
        "AED 50,000 - 100,000",
        "AED 100,000 - 500,000",
        "AED 500,000 - 1,000,000",
        "AED 1,000,000 - 5,000,000",
        "AED 5,000,000+",
      ],
      types: ["Angel Investor", "Venture Capital", "Institutional", "Family Office"],
      levels: ["Beginner (0-2 years)", "Intermediate (2-5 years)", "Experienced (5-10 years)", "Expert (10+ years)"],
      whatNext: "What happens next?",
      nextDesc: "Our investment team will review your application and contact you within 48 hours.",
    },
    ar: {
      title: "تسجيل المستثمر",
      subtitle: "انضم إلى شبكتنا من المستثمرين الرائدين",
      personalInfo: "المعلومات الشخصية",
      investmentDetails: "تفاصيل الاستثمار",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "عنوان البريد الإلكتروني",
      linkedin: "ملف LinkedIn",
      investmentAmount: "مبلغ الاستثمار",
      investorType: "نوع المستثمر",
      experience: "خبرة الاستثمار",
      areas: "مجالات الاهتمام",
      back: "رجوع",
      next: "التالي",
      submit: "إرسال الطلب",
      required: "مطلوب",
      placeholder: {
        name: "أدخل اسمك الكامل",
        phone: "أدخل رقم هاتفك",
        email: "أدخل بريدك الإلكتروني",
        linkedin: "https://linkedin.com/in/yourprofile",
      },
      interests: ["التكنولوجيا", "الصحة", "التكنولوجيا المالية", "التجارة الإلكترونية", "SaaS", "التعليم"],
      ranges: [
        "50,000 - 100,000 درهم",
        "100,000 - 500,000 درهم",
        "500,000 - 1,000,000 درهم",
        "1,000,000 - 5,000,000 درهم",
        "5,000,000 درهم وأكثر",
      ],
      types: ["ملاك/مستثمرون ملائكة", "رأس مال استثماري", "مؤسسي", "مكتب عائلي"],
      levels: ["مبتدئ (0-2 سنة)", "متوسط (2-5 سنوات)", "ذو خبرة (5-10 سنوات)", "خبير (10+ سنوات)"],
      whatNext: "ماذا بعد ذلك؟",
      nextDesc: "سيراجع فريق الاستثمار لدينا طلبك والاتصال بك في غضون 48 ساعة.",
    },
  }

  const t = translations[language]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = () => {
    if (step < 2) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your submission! We will review your profile and get back to you soon.")
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header language={language} setLanguage={setLanguage} />

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{t.title}</h1>
            <p className="text-lg text-slate-600">{t.subtitle}</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-6 md:gap-8 mb-12 animate-slideInDown">
            {[1, 2].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    step >= stepNum ? "bg-[#013371] text-white shadow-lg" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step > stepNum ? <CheckCircle2 className="w-6 h-6" /> : stepNum}
                </div>
                {stepNum < 2 && (
                  <div className={`h-1 w-12 md:w-20 transition-all ${step >= 2 ? "bg-[#013371]" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-10 animate-slideInUp">
            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-slideInUp">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.personalInfo}</h2>

                  {[
                    { label: t.fullName, name: "fullName", type: "text", placeholder: t.placeholder.name },
                    { label: t.phone, name: "phone", type: "tel", placeholder: t.placeholder.phone },
                    { label: t.email, name: "email", type: "email", placeholder: t.placeholder.email },
                    { label: t.linkedin, name: "linkedin", type: "url", placeholder: t.placeholder.linkedin },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {field.label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors"
                        required
                      />
                    </div>
                  ))}

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      disabled
                      className="flex-1 px-6 py-3 bg-slate-100 text-slate-400 rounded-lg font-semibold cursor-not-allowed"
                    >
                      {t.back}
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 px-6 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {t.next} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-slideInUp">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.investmentDetails}</h2>

                  {[
                    { label: t.investmentAmount, name: "investmentAmount", options: t.ranges },
                    { label: t.investorType, name: "investmentType", options: t.types },
                    { label: t.experience, name: "experience", options: t.levels },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {field.label} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors"
                        required
                      >
                        <option value="">Select option</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      {t.areas} <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {t.interests.map((interest) => (
                        <label
                          key={interest}
                          className="flex items-center gap-2 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData((prev) => ({
                                  ...prev,
                                  interests: [...prev.interests, interest],
                                }))
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  interests: prev.interests.filter((i) => i !== interest),
                                }))
                              }
                            }}
                            className="w-4 h-4 accent-[#013371] cursor-pointer"
                          />
                          <span className="text-sm text-slate-900 font-medium">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-6 py-3 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" /> {t.back}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all shadow-lg hover:shadow-xl"
                    >
                      {t.submit}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Info Box */}
          <div
            className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 animate-slideInUp"
            style={{ animationDelay: "200ms" }}
          >
            <p className="font-semibold text-slate-900 mb-2">{t.whatNext}</p>
            <p className="text-slate-600">{t.nextDesc}</p>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}
