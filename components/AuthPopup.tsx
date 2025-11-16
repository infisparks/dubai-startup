"use client"

import type React from "react"
import { useState } from "react"
import { X, Mail, Lock, User, LogIn, UserPlus } from "lucide-react" // Removed TrendingUp
import { supabase } from "@/lib/supabaseConfig" 

interface AuthPopupProps {
  onClose: () => void
  onSuccess: () => void
  language: "en" | "ar"
}

export default function AuthPopup({ onClose, onSuccess, language }: AuthPopupProps) {
  const [isLogin, setIsLogin] = useState(true) 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  // const [role, setRole] = useState<"investor" | "startup">("investor") // REMOVED role state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = {
    en: {
      loginTitle: "Login to Continue",
      signupTitle: "Create Account",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      // REMOVED Role translations
      loginBtn: "Log In",
      signupBtn: "Create Account",
      switchSignup: "Don't have an account? Sign Up",
      switchLogin: "Already have an account? Log In",
      loginSuccess: "Login successful!",
      signupSuccess: "Success! Check your email for verification.",
    },
    ar: {
      loginTitle: "تسجيل الدخول للمتابعة",
      signupTitle: "إنشاء حساب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      fullName: "الاسم الكامل",
      // REMOVED Role translations
      loginBtn: "تسجيل الدخول",
      signupBtn: "إنشاء حساب",
      switchSignup: "ليس لديك حساب؟ سجل الآن",
      switchLogin: "هل لديك حساب بالفعل؟ تسجيل الدخول",
      loginSuccess: "تم تسجيل الدخول بنجاح!",
      signupSuccess: "نجاح! تحقق من بريدك الإلكتروني للتحقق.",
    },
  }[language]

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        // --- Login Logic ---
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        alert(t.loginSuccess)
        onSuccess()
      } else {
        // --- Signup Logic (1-Step) ---
        
        // Step 1: Create the user in auth.users
        // The trigger will create the row in public.profiles
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Save full name in user metadata (to be picked up by profile trigger)
            data: { 
                full_name: fullName,
            }, 
          },
        })
        
        if (signUpError) throw signUpError
        if (!signUpData.user) throw new Error("Signup successful but no user data returned.")

        // REMOVED Step 2: We no longer update the profile with roles.
        // The RLS policy on public.profiles will allow the trigger to insert the
        // new user with the default (false) values for is_investor, is_startup, etc.
        
        alert(t.signupSuccess)
        onSuccess() 
      }
    } catch (err: any) {
      console.error("Auth Error:", err)
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

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
          {isLogin ? t.loginTitle : t.signupTitle}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
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
                  required={!isLogin}
                />
              </div>

              {/* --- REMOVED ROLE SELECTION BLOCK --- */}

            </div>
          )}

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

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              "..."
            ) : isLogin ? (
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

        <p className="mt-4 text-center text-sm text-slate-600">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#013371] hover:underline font-medium"
            type="button"
          >
            {isLogin ? t.switchSignup : t.switchLogin}
          </button>
        </p>
      </div>
    </div>
  )
}