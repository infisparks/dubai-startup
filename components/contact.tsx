import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react"

interface ContactProps {
  language: "en" | "ar"
}

const PRIMARY_COLOR = "#2a3486"

const translations = {
  en: {
    title: "Get in Touch",
    description: "Have questions? Our investment team is here to help you succeed.",
    name: "Full Name",
    email: "Email Address",
    message: "Message",
    send: "Send Message",
    address: "Dubai, United Arab Emirates",
    phone: "+971 4 XXX XXXX",
    email_contact: "contact@investarise.com",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email",
    successTitle: "Message Sent!",
    successDesc: "Thank you for reaching out. We'll get back to you soon.",
    contactSection: "Contact Information",
    responseTime: "Response within 24 hours",
  },
  ar: {
    title: "تواصل معنا",
    description: "هل لديك أسئلة؟ فريقنا الاستثماري موجود هنا لمساعدتك على النجاح.",
    name: "الاسم الكامل",
    email: "عنوان البريد الإلكتروني",
    message: "الرسالة",
    send: "إرسال الرسالة",
    address: "دبي، الإمارات العربية المتحدة",
    phone: "+971 4 XXX XXXX",
    email_contact: "contact@investarise.com",
    addressLabel: "العنوان",
    phoneLabel: "الهاتف",
    emailLabel: "البريد الإلكتروني",
    successTitle: "تم إرسال الرسالة!",
    successDesc: "شكراً لتواصلك معنا. سنعود إليك قريباً.",
    contactSection: "معلومات التواصل",
    responseTime: "الرد خلال 24 ساعة",
  },
}

export default function Contact({ language }: ContactProps) {
  const t = translations[language]
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: t.addressLabel,
      value: t.address,
      color: "#10b981",
      gradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Phone,
      label: t.phoneLabel,
      value: t.phone,
      color: "#f59e0b",
      gradient: "from-amber-50 to-yellow-50"
    },
    {
      icon: Mail,
      label: t.emailLabel,
      value: t.email_contact,
      color: "#3b82f6",
      gradient: "from-blue-50 to-cyan-50"
    }
  ]

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: PRIMARY_COLOR }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: PRIMARY_COLOR }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-block mb-4 sm:mb-5">
            <span 
              className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all backdrop-blur-sm"
              style={{
                backgroundColor: `${PRIMARY_COLOR}12`,
                color: PRIMARY_COLOR,
                borderColor: `${PRIMARY_COLOR}30`
              }}
            >
              {language === "en" ? "CONTACT US" : "اتصل بنا"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight leading-tight max-w-3xl mx-auto">
            {t.title}
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form - Spans 2 columns */}
          <div className="lg:col-span-2">
            <div 
              className="relative rounded-2xl lg:rounded-3xl overflow-hidden backdrop-blur-xl border border-slate-200/60 transition-all duration-500"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 32px rgba(42, 52, 134, 0.08)'
              }}
            >
              {/* Header Bar */}
              <div 
                className="px-6 sm:px-8 lg:px-10 py-4 sm:py-5 border-b border-slate-200/50 flex items-center gap-3"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY_COLOR}08, ${PRIMARY_COLOR}04)`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${PRIMARY_COLOR}15`,
                    border: `2px solid ${PRIMARY_COLOR}30`
                  }}
                >
                  <MessageSquare className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {language === "en" ? "Send us a Message" : "أرسل لنا رسالة"}
                </h3>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8 lg:p-10">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* Name Input */}
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-900 mb-3">
                        {t.name} <span style={{ color: PRIMARY_COLOR }}>*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t.name}
                          className="w-full px-5 sm:px-6 py-3.5 sm:py-4 border-2 border-slate-200 rounded-xl focus:outline-none bg-white/50 hover:border-slate-300 transition-all duration-300 text-sm sm:text-base font-medium"
                          onFocus={(e) => {
                            e.target.style.borderColor = PRIMARY_COLOR
                            e.target.style.boxShadow = `0 0 0 4px ${PRIMARY_COLOR}15`
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.8)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.boxShadow = 'none'
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.5)'
                          }}
                          required
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-900 mb-3">
                        {t.email} <span style={{ color: PRIMARY_COLOR }}>*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.email}
                          className="w-full px-5 sm:px-6 py-3.5 sm:py-4 border-2 border-slate-200 rounded-xl focus:outline-none bg-white/50 hover:border-slate-300 transition-all duration-300 text-sm sm:text-base font-medium"
                          onFocus={(e) => {
                            e.target.style.borderColor = PRIMARY_COLOR
                            e.target.style.boxShadow = `0 0 0 4px ${PRIMARY_COLOR}15`
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.8)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.boxShadow = 'none'
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.5)'
                          }}
                          required
                        />
                      </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-900 mb-3">
                        {t.message} <span style={{ color: PRIMARY_COLOR }}>*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.message}
                        rows={6}
                        className="w-full px-5 sm:px-6 py-3.5 sm:py-4 border-2 border-slate-200 rounded-xl focus:outline-none bg-white/50 hover:border-slate-300 transition-all duration-300 text-sm sm:text-base font-medium resize-none"
                        onFocus={(e) => {
                          e.target.style.borderColor = PRIMARY_COLOR
                          e.target.style.boxShadow = `0 0 0 4px ${PRIMARY_COLOR}15`
                          e.target.style.backgroundColor = 'rgba(255,255,255,0.8)'
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0'
                          e.target.style.boxShadow = 'none'
                          e.target.style.backgroundColor = 'rgba(255,255,255,0.5)'
                        }}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 sm:px-8 py-3.5 sm:py-4 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 group/btn"
                      style={{
                        background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_COLOR}cc)`,
                        boxShadow: `0 12px 30px ${PRIMARY_COLOR}30`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 16px 40px ${PRIMARY_COLOR}40`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 12px 30px ${PRIMARY_COLOR}30`
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t.send}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          {t.send}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-green-100 mb-5 mx-auto">
                      <CheckCircle2 className="w-8 sm:w-10 h-8 sm:h-10 text-green-600 animate-scale-in" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                      {t.successTitle}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      {t.successDesc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-5 sm:space-y-6">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                {t.contactSection}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                {t.responseTime}
              </p>
            </div>

            {/* Contact Cards */}
            {contactInfo.map((info, idx) => {
              const Icon = info.icon
              return (
                <div 
                  key={idx}
                  className={`group relative rounded-2xl p-5 sm:p-6 border border-slate-200/60 transition-all duration-500 cursor-pointer overflow-hidden bg-gradient-to-br ${info.gradient}`}
                  style={{
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 16px 32px ${info.color}20`
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.borderColor = info.color + '40'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.6)'
                  }}
                >
                  {/* Background Accent */}
                  <div 
                    className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: info.color }}
                  />

                  {/* Icon */}
                  <div className="mb-4 relative z-10">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        backgroundColor: `${info.color}20`,
                        border: `2px solid ${info.color}40`
                      }}
                    >
                      <Icon 
                        className="w-6 h-6"
                        style={{ color: info.color }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <p className="text-xs sm:text-sm font-bold text-slate-600 mb-2.5 uppercase tracking-wide">
                      {info.label}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight mb-3">
                      {info.value}
                    </p>

                    {/* Bottom Accent */}
                    <div 
                      className="h-1 w-0 group-hover:w-10 transition-all duration-500 rounded-full"
                      style={{ backgroundColor: info.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}