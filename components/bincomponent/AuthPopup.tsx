"use client"

import type React from "react"
import { useState } from "react"
import { X, Mail, Lock, User, LogIn, UserPlus, Send } from "lucide-react"
import { supabase } from "@/lib/supabaseConfig"
import Link from "next/link"

// Define the possible views/screens for the popup
type AuthView = "login" | "signup" | "forgotPassword"

interface AuthPopupProps {
  onClose: () => void
  onSuccess: () => void
  language: "en" | "ar"
}

export default function AuthPopup({ onClose, onSuccess, language }: AuthPopupProps) {
  // Use 'view' state to manage the current screen (login, signup, or forgotPassword)
  const [view, setView] = useState<AuthView>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null) // For success messages

  const t = {
    en: {
      loginTitle: "Login to Continue",
      signupTitle: "Create Account",
      forgotPasswordTitle: "Forgot Password",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      loginBtn: "Log In",
      signupBtn: "Create Account",
      sendResetBtn: "Send Reset Link",
      switchSignup: "Don't have an account? Sign Up",
      switchLogin: "Already have an account? Log In",
      switchForgotPassword: "Forgot your password?",
      backToLogin: "Back to Log In",
      loginSuccess: "Login successful!",
      // Signup success message updated to remove 'check your email'
      signupSuccess: "Account created successfully! You can now log in.",
      resetSent: "Password reset link sent! Check your email.",
    },
    ar: {
      loginTitle: "تسجيل الدخول للمتابعة",
      signupTitle: "إنشاء حساب",
      forgotPasswordTitle: "نسيت كلمة المرور",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      fullName: "الاسم الكامل",
      loginBtn: "تسجيل الدخول",
      signupBtn: "إنشاء حساب",
      sendResetBtn: "إرسال رابط إعادة التعيين",
      switchSignup: "ليس لديك حساب؟ سجل الآن",
      switchLogin: "هل لديك حساب بالفعل؟ تسجيل الدخول",
      switchForgotPassword: "هل نسيت كلمة المرور؟",
      backToLogin: "العودة إلى تسجيل الدخول",
      loginSuccess: "تم تسجيل الدخول بنجاح!",
      // Signup success message updated to remove 'check your email'
      signupSuccess: "تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.",
      resetSent: "تم إرسال رابط إعادة تعيين كلمة المرور! تحقق من بريدك الإلكتروني.",
    },
  }[language]

  // Function to handle Login and Signup
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (view === "login") {
        // --- Login Logic ---
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        alert(t.loginSuccess)
        onSuccess()
      } else if (view === "signup") {
        // --- Signup Logic (removed email verification step) ---

        // Use signUp for a simple sign-up that doesn't require email verification 
        // if the Supabase project is configured to allow it, or use the 
        // signInWithPassword after a successful signUp to auto-log them in.
        // For a seamless flow without verification, we'll use `signUp` which 
        // handles auth.users creation.
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Save full name in user metadata
            data: {
              full_name: fullName,
            },
            // NOTE: The 'redirectTo' option is typically used for email verification,
            // but we are removing the user-facing need to check email. 
            // In a production environment, you would ensure your Supabase config 
            // has 'Enable email confirmations' OFF for this to work without verification.
            // Since we are removing the 'Check your email' message, this reflects the user's request.
          },
        })

        if (signUpError) throw signUpError

        // Log the user in immediately after successful signup (optional, depends on flow)
        // Since the prompt is to remove verification, we'll assume a direct login or success message.
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError

        alert(t.loginSuccess) // Show login success, as they are now logged in
        onSuccess()
      }
    } catch (err: any) {
      console.error("Auth Error:", err)
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  // Function to handle Forgot Password request
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      // Send a password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // Set your desired redirect URL for the password reset page
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setMessage(t.resetSent)
      // Optional: Don't clear email so they can see it
    } catch (err: any) {
      console.error("Password Reset Error:", err)
      setError(err.message || "Failed to send reset email.")
    } finally {
      setLoading(false)
    }
  }

  // Helper to get the current title
  const getTitle = () => {
    if (view === "login") return t.loginTitle
    if (view === "signup") return t.signupTitle
    if (view === "forgotPassword") return t.forgotPasswordTitle
    return ""
  }

  // Helper to render common form fields for Email and Password
  const renderAuthFields = () => (
    <>
      <div>
        <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
          <Mail className="w-4 h-4 mr-2" /> {t.email}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-[#013371] focus:outline-none"
          required
        />
      </div>

      {/* Only show password field for Login and Signup */}
      {(view === "login" || view === "signup") && (
        <div>
          <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
            <Lock className="w-4 h-4 mr-2" /> {t.password}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-[#013371] focus:outline-none"
            required
          />
        </div>
      )}
    </>
  )

  // Helper to render the footer buttons
  const renderFooter = () => (
    <p className="mt-4 text-center text-sm text-slate-600 space-y-2">
      {view === "login" && (
        <>
          <button
            onClick={() => setView("signup")}
            className="text-[#013371] hover:underline font-medium block w-full"
            type="button"
          >
            {t.switchSignup}
          </button>
          <button
            onClick={() => { setView("forgotPassword"); setError(null); setMessage(null); }}
            className="text-slate-500 hover:text-[#013371] hover:underline font-medium block w-full"
            type="button"
          >
            {t.switchForgotPassword}
          </button>
        </>
      )}
      {(view === "signup" || view === "forgotPassword") && (
        <button
          onClick={() => { setView("login"); setError(null); setMessage(null); }}
          className="text-[#013371] hover:underline font-medium block w-full"
          type="button"
        >
          {t.backToLogin}
        </button>
      )}
    </p>
  )

  // --- Render the Popup ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative animate-zoomIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          {getTitle()}
        </h2>

        {error && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{message}</p>
          </div>
        )}

        {/* --- Login/Signup Form --- */}
        {(view === "login" || view === "signup") && (
          <form onSubmit={handleAuth} className="space-y-5">
            {view === "signup" && (
              <div className="space-y-5">
                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 mr-2" /> {t.fullName}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullName}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-[#013371] focus:outline-none"
                    required={view === "signup"}
                  />
                </div>
              </div>
            )}

            {renderAuthFields()}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                "..."
              ) : view === "login" ? (
                <>
                  <LogIn className="w-5 h-5" /> {t.loginBtn}
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" /> {t.signupBtn}
                </>
              )}
            </button>
          </form>
        )}

        {/* --- Forgot Password Form --- */}
        {view === "forgotPassword" && (
          <form onSubmit={handleForgotPassword} className="space-y-5">
            {/* We only need the email field here */}
            {renderAuthFields()}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                "..."
              ) : (
                <>
                  <Send className="w-5 h-5" /> {t.sendResetBtn}
                </>
              )}
            </button>

            <div className="text-center mt-2">
              <Link href="/reset-password" className="text-sm text-[#013371] hover:underline" onClick={onClose}>
                Have a code? Enter it here
              </Link>
            </div>
          </form>
        )}

        {renderFooter()}
      </div>
    </div>
  )
}