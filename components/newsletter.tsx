import { useState } from "react"
import { Mail, CheckCircle2 } from "lucide-react"

interface NewsletterProps {
  language: "en" | "ar"
}

const PRIMARY_COLOR = "#2a3486"

const translations = {
  en: {
    title: "Join Dubai's Fastest Growing Investment Network",
    description: "Subscribe to get exclusive insights, deals, and investment opportunities delivered to your inbox.",
    placeholder: "Enter your email",
    button: "Subscribe Now",
    name: "Full Name",
    privacy: "We respect your privacy. Unsubscribe at any time.",
    benefits: [
      "Exclusive investment opportunities",
      "Early access to new deals",
      "Market insights & analysis"
    ]
  },
  ar: {
    title: "انضم إلى أسرع شبكة استثمار نمواً في دبي",
    description: "اشترك للحصول على رؤى وصفقات حصرية وفرص استثمارية يتم تسليمها إلى صندوق البريد الخاص بك.",
    placeholder: "أدخل بريدك الإلكتروني",
    button: "اشترك الآن",
    name: "الاسم الكامل",
    privacy: "نحترم خصوصيتك. ألغِ الاشتراك في أي وقت.",
    benefits: [
      "فرص استثمارية حصرية",
      "الوصول المبكر إلى الصفقات الجديدة",
      "رؤى وتحليلات السوق"
    ]
  },
}

export default function Newsletter({ language }: NewsletterProps) {
  const t = translations[language]
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!email || !name) return
    
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setEmail("")
      setName("")
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: PRIMARY_COLOR }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: PRIMARY_COLOR }}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_COLOR}dd)`,
            boxShadow: `0 24px 48px ${PRIMARY_COLOR}25`
          }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-10 sm:mb-12 lg:mb-14">
              <div className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 mb-4 sm:mb-6 mx-auto">
                <Mail className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-tight">
                {t.title}
              </h2>
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                {t.description}
              </p>
            </div>

            {/* Form */}
            {!submitted ? (
              <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <input
                    type="text"
                    placeholder={t.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none transition-all duration-300 text-xs sm:text-sm font-medium"
                    style={{
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                    }}
                    required
                  />
                  <input
                    type="email"
                    placeholder={t.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none transition-all duration-300 text-xs sm:text-sm font-medium"
                    style={{
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                    }}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-slate-900 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      {t.button}
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5" />
                      {t.button}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center mb-6 sm:mb-8 py-4 sm:py-6">
                <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-white/20 backdrop-blur-md mb-3 mx-auto">
                  <CheckCircle2 className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {language === "en" ? "Thank you!" : "شكراً لك!"}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm">
                  {language === "en" 
                    ? "Check your email for exclusive offers." 
                    : "تحقق من بريدك الإلكتروني للحصول على عروض حصرية."}
                </p>
              </div>
            )}

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {t.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-white/90 text-xs sm:text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Privacy Text */}
            <div className="text-center pt-4 sm:pt-6 border-t border-white/20">
              <p className="text-white/70 text-xs">
                {t.privacy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}