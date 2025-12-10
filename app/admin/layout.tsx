"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseConfig"
import { Loader2 } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()

                if (!session) {
                    router.push("/")
                    return
                }

                const { data: adminData, error } = await supabase
                    .from("admins")
                    .select("user_id")
                    .eq("user_id", session.user.id)
                    .single()

                if (error || !adminData) {
                    router.push("/")
                    return
                }

                setIsAuthorized(true)
            } catch (error) {
                console.error("Admin check failed", error)
                router.push("/")
            } finally {
                setIsLoading(false)
            }
        }

        checkAdminStatus()
    }, [router])

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-[#013371]" />
                    <p className="text-sm text-slate-500">Verifying access...</p>
                </div>
            </div>
        )
    }

    if (!isAuthorized) {
        return null
    }

    return <>{children}</>
}
