"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseConfig"
import { Lock, CheckCircle, XCircle } from "lucide-react"

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isTokenValid, setIsTokenValid] = useState(false)

  // 1. Check if the URL contains success parameters
  useEffect(() => {
    // Supabase redirects with session info in the URL fragment (after '#')
    const fragment = window.location.hash.substring(1)
    const params = new URLSearchParams(fragment)

    const type = params.get("type")
    const errorCode = params.get("error_code")

    if (errorCode === "otp_expired") {
      setError("The password reset link is invalid or has expired. Please request a new one.")
    } else if (type === "recovery") {
      // Success case: The user clicked the reset link and a session has been set
      setIsTokenValid(true)
      setError(null)
      // The session is automatically established by the URL redirect,
      // now we just need the user to update the password.
    } else if (errorCode) {
      // General error handling (e.g., access_denied)
      setError(params.get("error_description") || "An unknown error occurred with the link.")
    }
  }, [router])


  // 2. Handle the password update
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      // supabase.auth.updateUser will use the current session (set by the recovery link)
      // to change the password.
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        throw error
      }

      setSuccess("Your password has been updated successfully! You will be redirected to the login page shortly.")
      setPassword("")
      setConfirmPassword("")
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push("/") // Redirect to your home/login page
      }, 3000)

    } catch (err: any) {
      console.error("Password Update Error:", err)
      setError(err.message || "Failed to update password. Please try requesting a new link.")
    } finally {
      setLoading(false)
    }
  }

  // --- Render based on state ---

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center">
          <XCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
             onClick={() => router.push("/")}
             className="text-[#013371] hover:underline font-medium"
          >
            Go back to Home
          </button>
        </div>
      )
    }

    if (success) {
      return (
        <div className="text-center">
          <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Success!</h3>
          <p className="text-green-600 mb-4">{success}</p>
        </div>
      )
    }

    if (isTokenValid) {
      return (
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 text-center">Set New Password</h3>
          
          <div>
            <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
              <Lock className="w-4 h-4 mr-2" /> New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-[#013371] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
              <Lock className="w-4 h-4 mr-2" /> Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-[#013371] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password || !confirmPassword}
            className="w-full px-6 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )
    }

    // Default loading state while checking the URL
    return (
      <div className="text-center p-6">
        <p className="text-slate-600">Checking link validity...</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        {renderContent()}
      </div>
    </div>
  )
}