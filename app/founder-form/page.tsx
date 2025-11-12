"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, Upload, CheckCircle2 } from "lucide-react"

export default function FounderFormPage() {
  const [step, setStep] = useState(1)
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [formData, setFormData] = useState({
    companyName: "",
    stage: "",
    pitchDeck: null as File | null,
    linkedin: "",
    website: "",
    description: "",
    founderName: "",
    founderEmail: "",
    founderPhone: "",
  })

  const translations = {
    en: {
      title: "Startup Registration",
      subtitle: "Get funding for your innovative startup",
      startupInfo: "Startup Information",
      founderDetails: "Founder Details",
      companyName: "Company Name",
      stage: "Funding Stage",
      pitchDeck: "Pitch Deck (PDF/PPT)",
      website: "Company Website",
      description: "Company Description",
      founderName: "Founder Name",
      email: "Email Address",
      phone: "Phone Number",
      linkedin: "Company LinkedIn",
      back: "Back",
      next: "Next",
      submit: "Submit Application",
      required: "Required",
      uploadFile: "Upload your pitch deck",
      fileHint: "PDF or PowerPoint, max 25MB",
      descHint: "Describe in 200-250 words",
      placeholder: {
        company: "Enter company name",
        website: "https://yourcompany.com",
        description: "Describe your startup...",
        name: "Enter your full name",
        email: "Enter your email",
        phone: "Enter your phone number",
        linkedin: "https://linkedin.com/company/yourcompany",
      },
      stages: ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"],
      ready: "Ready to launch?",
      readyDesc:
        "Our team reviews applications daily. If your startup is a good fit, we'll schedule a call to discuss funding opportunities.",
    },
    ar: {
      title: "تسجيل الشركة الناشئة",
      subtitle: "احصل على تمويل لشركتك الناشئة المبتكرة",
      startupInfo: "معلومات الشركة الناشئة",
      founderDetails: "تفاصيل المؤسس",
      companyName: "اسم الشركة",
      stage: "مرحلة التمويل",
      pitchDeck: "عرض الملعب (PDF/PPT)",
      website: "موقع الويب للشركة",
      description: "وصف الشركة",
      founderName: "اسم المؤسس",
      email: "عنوان البريد الإلكتروني",
      phone: "رقم الهاتف",
      linkedin: "LinkedIn للشركة",
      back: "رجوع",
      next: "التالي",
      submit: "إرسال الطلب",
      required: "مطلوب",
      uploadFile: "قم بتحميل عرض الملعب الخاص بك",
      fileHint: "PDF أو PowerPoint، بحد أقصى 25 ميجابايت",
      descHint: "اكتب وصفًا بـ 200-250 كلمة",
      placeholder: {
        company: "أدخل اسم الشركة",
        website: "https://yourcompany.com",
        description: "وصف شركتك الناشئة...",
        name: "أدخل اسمك الكامل",
        email: "أدخل بريدك الإلكتروني",
        phone: "أدخل رقم هاتفك",
        linkedin: "https://linkedin.com/company/yourcompany",
      },
      stages: ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"],
      ready: "هل أنت مستعد للإطلاق؟",
      readyDesc: "يراجع فريقنا الطلبات يوميًا. إذا كانت شركتك الناشئة مناسبة، سنجدول مكالمة لمناقشة فرص التمويل.",
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        pitchDeck: file,
      }))
    }
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
    alert("Thank you for your submission! Our team will review your startup and get back to you soon.")
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.startupInfo}</h2>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {t.companyName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder={t.placeholder.company}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {t.stage} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="stage"
                      value={formData.stage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors"
                      required
                    >
                      <option value="">Select funding stage</option>
                      {t.stages.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {t.pitchDeck} <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#013371] hover:bg-blue-50 transition-all cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.ppt,.pptx"
                        className="hidden"
                        id="pitch-upload"
                        required
                      />
                      <label htmlFor="pitch-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-[#013371] mx-auto mb-2" />
                        {formData.pitchDeck ? (
                          <p className="text-sm font-semibold text-slate-900">{formData.pitchDeck.name}</p>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-slate-900 mb-1">{t.uploadFile}</p>
                            <p className="text-xs text-slate-500">{t.fileHint}</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {t.website} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder={t.placeholder.website}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors"
                      required
                    />
                  </div>

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
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.founderDetails}</h2>

                  {[
                    { label: t.founderName, name: "founderName", type: "text", placeholder: t.placeholder.name },
                    { label: t.email, name: "founderEmail", type: "email", placeholder: t.placeholder.email },
                    { label: t.phone, name: "founderPhone", type: "tel", placeholder: t.placeholder.phone },
                    { label: t.linkedin, name: "linkedin", type: "url", placeholder: t.placeholder.linkedin },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {field.label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] || ""}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors"
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {t.description} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder={t.placeholder.description}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors resize-none"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      {formData.description.length}/250 {t.descHint}
                    </p>
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
            <p className="font-semibold text-slate-900 mb-2">{t.ready}</p>
            <p className="text-slate-600">{t.readyDesc}</p>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}
