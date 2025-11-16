// components/EmailVerificationNotice.tsx
import { MailOpen } from "lucide-react"
import type React from "react"

interface NoticeProps {
  language: "en" | "ar"
}

export default function EmailVerificationNotice({ language }: NoticeProps) {
  const t = {
    en: {
      title: "Action Required: Verify Your Email",
      description: "A verification link has been sent to your email address. Please click the link in the email to complete your registration and unlock the investor form.",
      tip: "Check your spam folder if you don't see it within a few minutes.",
    },
    ar: {
      title: "مطلوب إجراء: التحقق من بريدك الإلكتروني",
      description: "تم إرسال رابط تحقق إلى عنوان بريدك الإلكتروني. يرجى النقر على الرابط في البريد الإلكتروني لإكمال التسجيل وفتح نموذج المستثمر.",
      tip: "تحقق من مجلد البريد العشوائي إذا لم تره في غضون بضع دقائق.",
    },
  }[language]

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-amber-50 border-2 border-amber-300 rounded-xl shadow-lg flex items-start gap-4 animate-fadeIn">
      <MailOpen className="w-8 h-8 text-amber-600 flex-shrink-0" />
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{t.title}</h2>
        <p className="text-slate-700 mb-3">{t.description}</p>
        <p className="text-sm text-amber-700 font-medium">{t.tip}</p>
      </div>
    </div>
  )
}