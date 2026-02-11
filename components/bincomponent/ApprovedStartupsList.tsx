// components/ApprovedStartupsList.tsx
"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link" 
import { supabase } from "@/lib/supabaseConfig" 
import { ArrowRight, Rocket, TrendingUp, DollarSign, AlertTriangle } from "lucide-react" 

// --- 1. Define the Type for Startup Data ---
// This should match your 'founder_profiles' table schema
interface FounderProfile {
  user_id: string; // The user_id is the ID for the startup
  company_name: string;
  stage: string | null;
  website: string | null;
  description: string | null;
  domain: string | null;
  earning_status: string | null;
  // We don't have a logo in founder_profiles, so we'll use a placeholder
}

// --- 2. Define Translations ---
type Translations = {
    title: string;
    viewDetails: string;
    stage: string;
    earnings: string;
    loading: string;
    noStartups: string;
    noStartupsDesc: string;
    error: string;
    errorDesc: string;
};

// --- 3. The Main List Component ---
interface ApprovedStartupsListProps {
    language: "en" | "ar";
}

export default function ApprovedStartupsList({ language }: ApprovedStartupsListProps) {
  const [startups, setStartups] = useState<FounderProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = useMemo((): Translations => {
    return language === 'ar' ? {
        title: "الشركات الناشئة المعتمدة",
        viewDetails: "عرض التفاصيل",
        stage: "المرحلة",
        earnings: "الإيرادات",
        loading: "جاري تحميل الشركات الناشئة...",
        noStartups: "لا توجد شركات ناشئة معتمدة",
        noStartupsDesc: "يرجى التحقق مرة أخرى لاحقًا، يتم إضافة شركات جديدة يوميًا.",
        error: "حدث خطأ",
        errorDesc: "لم نتمكن من تحميل الشركات الناشئة. يرجى تحديث الصفحة."
    } : {
        title: "Approved Startups",
        viewDetails: "View Details",
        stage: "Stage",
        earnings: "Earnings",
        loading: "Loading approved startups...",
        noStartups: "No Approved Startups Found",
        noStartupsDesc: "Please check back later, new companies are being added daily.",
        error: "An Error Occurred",
        errorDesc: "We couldn't load the startups. Please refresh the page."
    };
  }, [language]);

  useEffect(() => {
    const fetchApprovedStartups = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('founder_profiles')
        .select(`
            user_id, 
            company_name, 
            stage, 
            website, 
            description, 
            domain, 
            earning_status
        `)
        .eq('is_approved', true); // Only fetch approved startups

      if (error) {
        console.error("Error fetching startups:", error);
        setError(t.errorDesc);
      } else {
        setStartups(data as FounderProfile[]);
      }
      setLoading(false);
    };

    fetchApprovedStartups();
  }, [t.errorDesc]); // Re-fetch if language (and thus error message) changes

  // --- Render Logic ---

  if (loading) {
    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Show 3 skeleton cards while loading */}
                {[...Array(3)].map((_, i) => <StartupCardSkeleton key={i} />)}
            </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertTriangle className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">{t.error}</h3>
            <p className="text-slate-600">{error}</p>
        </div>
    );
  }

  if (startups.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-blue-50 border border-blue-200 rounded-lg">
            <Rocket className="w-12 h-12 text-[#013371] mb-4" />
            <h3 className="text-xl font-bold text-slate-900">{t.noStartups}</h3>
            <p className="text-slate-600">{t.noStartupsDesc}</p>
        </div>
    );
  }

  return (
    <div className="w-full">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
                <StartupCard key={startup.user_id} startup={startup} t={t} />
            ))}
        </div>
    </div>
  );
}

// --- 4. Single Startup Card Component ---
interface StartupCardProps {
    startup: FounderProfile;
    t: Translations;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, t }) => {
    return (
        <div className="group bg-white border border-slate-200 rounded-2xl shadow-lg h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Header with Placeholder Logo & Domain */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                        {/* Placeholder Icon as logo is not in schema */}
                        <Rocket className="w-7 h-7 text-[#013371]" />
                    </div>
                    {startup.domain && (
                        <span className="inline-block bg-blue-100 text-[#013371] rounded-full px-3 py-1 text-xs font-semibold">
                            {startup.domain}
                        </span>
                    )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 truncate mb-2" title={startup.company_name}>
                    {startup.company_name}
                </h3>
            </div>
            
            {/* Description */}
            <p className="text-sm text-slate-600 px-6 mb-5 line-clamp-3 h-[60px]">
                {startup.description || "No description provided."}
            </p>

            {/* Key Stats */}
            <div className="px-6 space-y-3">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">{t.stage}:</span>
                    <span className="text-sm font-bold text-slate-900">{startup.stage || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">{t.earnings}:</span>
                    <span className="text-sm font-bold text-slate-900">{startup.earning_status || "N/A"}</span>
                </div>
            </div>

            {/* Footer with CTA */}
            <div className="mt-auto p-6 bg-slate-50/50">
                <Link
                    // This links to a dynamic page. You'll need to create [user_id]/page.tsx
                    href={`/startups/${startup.user_id}`} 
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#013371] text-white rounded-lg font-semibold text-sm transition-all hover:bg-[#024fa3] group-hover:shadow-lg"
                >
                    {t.viewDetails}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};

// --- 5. Skeleton Loading Card ---
const StartupCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg h-full flex flex-col overflow-hidden">
            <div className="p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 bg-slate-200 rounded-xl"></div>
                    <div className="h-5 w-20 bg-slate-200 rounded-full"></div>
                </div>
                <div className="h-8 w-3/4 bg-slate-200 rounded-md mb-2"></div>
            </div>
            
            <div className="px-6 mb-5 space-y-2 animate-pulse">
                <div className="h-4 w-full bg-slate-200 rounded"></div>
                <div className="h-4 w-full bg-slate-200 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
            </div>

            <div className="px-6 space-y-3 animate-pulse">
                <div className="h-5 w-1/2 bg-slate-200 rounded"></div>
                <div className="h-5 w-1/2 bg-slate-200 rounded"></div>
            </div>

            <div className="mt-auto p-6 bg-slate-50/50 animate-pulse">
                <div className="h-11 w-full bg-slate-200 rounded-lg"></div>
            </div>
        </div>
    );
};