// app/startups/[id]/page.tsx
"use client"

import type React from "react"
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { useParams } from "next/navigation" 
import { Session } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { supabase } from "@/lib/supabaseConfig" 
import { 
    ArrowLeft, Rocket, TrendingUp, DollarSign, AlertTriangle, 
    Globe, User, Phone, Linkedin, Download, FileText, Briefcase,
    ArrowRight, Check, Heart, Star, X // ⭐ ADDED Star, X
} from "lucide-react" 

// --- 1. Define the FULL Type for a single Startup Profile ---
interface FounderProfile {
  user_id: string;
  company_name: string;
  stage: string | null;
  pitch_deck_url: string | null; 
  website: string | null;
  description: string | null;
  founder_name: string | null; 
  founder_phone: string | null; 
  company_linkedin: string | null; 
  domain: string | null;
  domain_other_spec: string | null; 
  problem_description: string | null; 
  earning_status: string | null;
}

// --- 2. Define Translations ---
type Translations = {
    back: string;
    loading: string;
    notFound: string;
    notFoundDesc: string;
    error: string;
    errorDesc: string;
    visitWebsite: string;
    companyDetails: string;
    atAGlance: string;
    stage: string;
    earnings: string;
    founderName: string;
    phone: string;
    problemSolution: string;
    linksPitchDeck: string;
    companyLinkedIn: string;
    downloadPitchDeck: string;
    rateThis: string; // ⭐ ADDED
    changeRating: string; // ⭐ ADDED
};

// --- 3. The Main Page Component ---
export default function StartupDetailPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  
  const [startup, setStartup] = useState<FounderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for likes, ratings, and investor status
  const [isInvestor, setIsInvestor] = useState(false);
  const [likeData, setLikeData] = useState({ count: 0, userLiked: false });
  // ⭐ ADDED: State for ratings
  const [ratingData, setRatingData] = useState({ 
    average: 0, 
    count: 0, 
    userRating: null as number | null 
  });
  // ⭐ MERGED: Loading state for all engagement data
  const [engagementLoading, setEngagementLoading] = useState(true);

  const params = useParams(); 
  const id = params.id as string; 

  const t = useMemo((): Translations => {
    return language === 'ar' ? {
        back: "العودة إلى القائمة",
        loading: "جاري تحميل تفاصيل الشركة الناشئة...",
        notFound: "لم يتم العثور على الشركة الناشئة",
        notFoundDesc: "لم نتمكن من العثور على ملف تعريف لهذه الشركة. ربما تم إزالته.",
        error: "حدث خطأ",
        errorDesc: "لم نتمكن من تحميل الملف الشخصي. يرجى تحديث الصفحة.",
        visitWebsite: "زيارة الموقع",
        companyDetails: "تفاصيل الشركة",
        atAGlance: "نظرة سريعة",
        stage: "المرحلة",
        earnings: "الإيرادات",
        founderName: "اسم المؤسس",
        phone: "الهاتف",
        problemSolution: "المشكلة والحل",
        linksPitchDeck: "الروابط وعرض التقديم",
        companyLinkedIn: "ملف الشركة على LinkedIn",
        downloadPitchDeck: "تحميل العرض التقديمي",
        rateThis: "قيّم هذا", // ⭐ ADDED
        changeRating: "غيّر تقييمك", // ⭐ ADDED
    } : {
        back: "Back to List",
        loading: "Loading startup details...",
        notFound: "Startup Not Found",
        notFoundDesc: "We couldn't find a profile for this startup. It may have been removed.",
        error: "An Error Occurred",
        errorDesc: "We couldn't load the profile. Please refresh the page.",
        visitWebsite: "Visit Website",
        companyDetails: "Company Details",
        atAGlance: "At a Glance",
        stage: "Stage",
        earnings: "Earnings",
        founderName: "Founder Name",
        phone: "Phone",
        problemSolution: "Problem & Solution",
        linksPitchDeck: "Links & Pitch Deck",
        companyLinkedIn: "Company LinkedIn",
        downloadPitchDeck: "Download Pitch Deck",
        rateThis: "Rate This", // ⭐ ADDED
        changeRating: "Change your rating", // ⭐ ADDED
    };
  }, [language]);

  // --- Data Fetching (Session) ---
  useEffect(() => {
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
    };
    getSession();
  }, []);

  // --- Data Fetching (Startup Profile) ---
  useEffect(() => {
    const fetchStartup = async () => {
      if (!id) {
          setLoading(false);
          setError(t.notFound);
          return;
      }

      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('founder_profiles')
        .select('*') 
        .eq('user_id', id)
        .eq('is_approved', true) 
        .single(); 

      if (error || !data) {
        console.error("Error fetching startup:", error);
        setError(t.notFoundDesc);
      } else {
        setStartup(data as FounderProfile);
      }
      setLoading(false);
    };

    fetchStartup();
  }, [id, t.notFound, t.notFoundDesc]);

  // --- ⭐ UPDATED: Data Fetching (Investor Status, Likes & Ratings) ---
  useEffect(() => {
    if (!id || !session) {
      setIsInvestor(false);
      setEngagementLoading(false);
      return;
    }

    const fetchEngagementData = async () => {
      setEngagementLoading(true);
      const currentUserId = session.user.id;

      try {
        // 1. Fetch investor status
        const { data: profileData } = await supabase
          .from('profiles')
          .select('is_investor')
          .eq('id', currentUserId)
          .single();
        const investorStatus = profileData?.is_investor || false;
        setIsInvestor(investorStatus);

        // 2. Fetch all likes
        const { data: likesData, count: totalLikes, error: likesError } = await supabase
          .from('startup_likes')
          .select('user_id', { count: 'exact' })
          .eq('startup_id', id);
        
        if (likesError) throw likesError;
        
        // 3. Fetch all ratings
        const { data: ratingsData, error: ratingsError } = await supabase
          .from('startup_ratings')
          .select('user_id, rating')
          .eq('startup_id', id);
          
        if (ratingsError) throw ratingsError;

        // 4. Process Like Data
        const userHasLiked = likesData ? likesData.some(l => l.user_id === currentUserId) : false;
        setLikeData({
          count: totalLikes || 0,
          userLiked: userHasLiked,
        });

        // 5. Process Rating Data
        let average = 0;
        let count = 0;
        let userRating: number | null = null;
        
        if (ratingsData && ratingsData.length > 0) {
          count = ratingsData.length;
          const sum = ratingsData.reduce((acc, r) => acc + r.rating, 0);
          average = parseFloat((sum / count).toFixed(1));
          const userRatingObj = ratingsData.find(r => r.user_id === currentUserId);
          userRating = userRatingObj ? userRatingObj.rating : null;
        }
        
        setRatingData({
          average: average,
          count: count,
          userRating: userRating,
        });

      } catch (error) {
        console.error("Error fetching engagement data:", error);
      } finally {
        setEngagementLoading(false);
      }
    };

    fetchEngagementData();
  }, [id, session]);


  // --- Toggle Like Function ---
  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInvestor || !session?.user || !id) return;

    const currentLikedState = likeData.userLiked;
    const currentLikeCount = likeData.count;
    const newLikedState = !currentLikedState;
    const currentUserId = session.user.id;

    // Optimistic Update
    setLikeData({
      count: newLikedState ? currentLikeCount + 1 : currentLikeCount - 1,
      userLiked: newLikedState,
    });

    // Database Update
    if (newLikedState) {
      const { error } = await supabase
        .from('startup_likes')
        .insert({ user_id: currentUserId, startup_id: id });
      if (error) {
        setLikeData({ count: currentLikeCount, userLiked: currentLikedState }); // Revert
      }
    } else {
      const { error } = await supabase
        .from('startup_likes')
        .delete()
        .eq('user_id', currentUserId)
        .eq('startup_id', id);
      if (error) {
        setLikeData({ count: currentLikeCount, userLiked: currentLikedState }); // Revert
      }
    }
  };

  // --- ⭐ ADDED: Submit Rating Function ---
  const submitRating = async (ratingValue: number) => {
    if (!isInvestor || !session?.user || !id) return;

    setEngagementLoading(true); // Use master loading state
    const currentUserId = session.user.id;

    // Upsert the rating
    const { error } = await supabase
      .from('startup_ratings')
      .upsert({ 
        user_id: currentUserId, 
        startup_id: id, 
        rating: ratingValue 
      }, { 
        onConflict: 'user_id, startup_id'
      });
    
    if (error) {
      console.error("Error submitting rating:", error);
      setEngagementLoading(false);
      return; // Don't update state if DB failed
    }

    // Refetch all ratings to calculate new average
    const { data: ratingsData, error: ratingsError } = await supabase
      .from('startup_ratings')
      .select('rating')
      .eq('startup_id', id);

    let newAverage = 0;
    let newCount = 0;
    if (ratingsData && ratingsData.length > 0) {
      newCount = ratingsData.length;
      const sum = ratingsData.reduce((acc, r) => acc + r.rating, 0);
      newAverage = parseFloat((sum / newCount).toFixed(1));
    }

    // Update local state with new correct average
    setRatingData({
      average: newAverage,
      count: newCount,
      userRating: ratingValue,
    });
    setEngagementLoading(false);
  };


  // --- Render Function for Content ---
  const renderContent = () => {
    if (loading) {
        return <StartupDetailSkeleton />;
    }

    if (error) {
        return <FeedbackCard message={t.error} description={error} icon={AlertTriangle} iconColor="text-blue-500" />;
    }

    if (!startup) {
        return <FeedbackCard message={t.notFound} description={t.notFoundDesc} icon={AlertTriangle} iconColor="text-yellow-500" />;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
            {/* --- Left Column (Sticky) --- */}
            <div className="lg:col-span-1 lg:sticky lg:top-[120px] h-fit">
                {/* ⭐ UPDATED: Passing new props */}
                <LeftColumn 
                  startup={startup} 
                  t={t} 
                  isInvestor={isInvestor}
                  likeData={likeData}
                  ratingData={ratingData} // Pass rating data
                  engagementLoading={engagementLoading}
                  onToggleLike={toggleLike}
                  onSubmitRating={submitRating} // Pass submit handler
                />
            </div>
            
            {/* --- Right Column (Scrollable) --- */}
            <div className="lg:col-span-2">
                <RightColumn startup={startup} t={t} />
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        language={language} 
        setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>}
        userEmail={session?.user?.email} 
      />

      <main className="flex-1 pt-20 pb-12 sm:pt-24 sm:pb-16 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Link 
                href="/startups" 
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#013371] transition-colors mb-4 sm:mb-6"
            >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {t.back}
            </Link>
            
            {/* --- Main Content --- */}
            {renderContent()}
        </div>
      </main>

      <Footer language={language} />
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
    </div>
  );
}

// --- 4. Helper Components for this Page ---

// --- ⭐ UPDATED: Left Column ---
interface ColumnProps {
    startup: FounderProfile;
    t: Translations;
    isInvestor: boolean;
    likeData: { count: number, userLiked: boolean };
    ratingData: { average: number, count: number, userRating: number | null }; // ⭐ ADDED
    engagementLoading: boolean;
    onToggleLike: (e: React.MouseEvent) => void;
    onSubmitRating: (ratingValue: number) => Promise<void>; // ⭐ ADDED
}

const LeftColumn: React.FC<ColumnProps> = ({ 
  startup, 
  t, 
  isInvestor, 
  likeData, 
  ratingData, // ⭐ ADDED
  engagementLoading, 
  onToggleLike, 
  onSubmitRating // ⭐ ADDED
}) => {
    // ⭐ ADDED: State for rating popup
    const [showRatingMenu, setShowRatingMenu] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-5">
        <div className="flex justify-between items-start gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-50 to-slate-100 rounded-lg flex items-center justify-center border border-slate-200 flex-shrink-0">
                <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-[#013371]" />
            </div>
            {startup.domain && (
                <span className="inline-block bg-blue-50 text-[#013371] border border-blue-200 rounded-full px-2.5 py-1 text-xs font-medium">
                    {startup.domain}
                </span>
            )}
        </div>
        
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-tight">{startup.company_name}</h1>
        
        <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">{startup.description || "No description provided."}</p>
        
        {/* --- ⭐ UPDATED: Button Section --- */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isInvestor && (
            <>
              {/* Like Button */}
              <button
                onClick={onToggleLike}
                disabled={engagementLoading}
                title={likeData.userLiked ? 'Unlike' : 'Like'}
                className={`flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 border ${
                  engagementLoading
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : likeData.userLiked
                      ? 'bg-blue-50 text-blue-600 border-blue-300 hover:bg-blue-100'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${likeData.userLiked ? 'fill-current' : ''}`} />
                <span className="font-semibold">{likeData.count}</span>
              </button>

              {/* ⭐ NEW: Rate Button */}
              <div className="relative">
                <button
                  onClick={(e) => {
                      e.preventDefault(); e.stopPropagation();
                      setShowRatingMenu(!showRatingMenu);
                      setHoverRating(0);
                  }}
                  disabled={engagementLoading}
                  title={ratingData.userRating ? `You rated ${ratingData.userRating}/5` : t.rateThis}
                  className={`flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 border ${
                    engagementLoading
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : ratingData.userRating
                        ? 'bg-amber-50 text-amber-600 border-amber-300 hover:bg-amber-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${ratingData.userRating ? 'fill-current' : ''}`} />
                  <span className="font-semibold hidden sm:inline">
                    {ratingData.userRating ? `${ratingData.userRating} ★` : t.rateThis}
                  </span>
                </button>

                {/* Rating Popup Menu */}
                {showRatingMenu && (
                  <div 
                    className="absolute bottom-full left-0 sm:left-auto sm:right-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg p-2 sm:p-3 z-50 animate-scaleIn w-54"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onMouseLeave={() => { setShowRatingMenu(false); setHoverRating(0); }} 
                  >
                    <div className="flex justify-between items-center mb-2 ml-4 mr-4">
                      <p className="text-xs font-medium text-slate-600 px-1 ">
                        {ratingData.userRating ? t.changeRating : t.rateThis}
                      </p>
                      <button 
                        onClick={() => { setShowRatingMenu(false); setHoverRating(0); }}
                        className="p-1 rounded-full hover:bg-slate-100"
                        title="Close"
                      >
                        <X className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    </div>
                    <div className="flex gap-1.5 justify-center">
                      {[1, 2, 3, 4, 5].map((starValue) => {
                        const displayRating = hoverRating || ratingData.userRating || 0;
                        return (
                          <button
                            key={starValue}
                            title={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={async () => {
                                await onSubmitRating(starValue);
                                setShowRatingMenu(false);
                                setHoverRating(0);
                            }}
                            className="p-2 hover:bg-amber-50 rounded transition-colors group"
                          >
                            <Star className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto transition-all duration-150 transform group-hover:scale-110 ${
                              starValue <= displayRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 group-hover:text-amber-300'
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Visit Website Button */}
          {startup.website && (
            <a 
                href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 bg-[#013371] text-white rounded-lg font-medium text-xs sm:text-sm transition-all hover:bg-[#024fa3] active:scale-95 shadow-sm hover:shadow-md ${
                  isInvestor ? 'flex-1' : 'w-full' // Fills space if investor, full-width if not
                }`}
            >
                {t.visitWebsite}
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          )}
        </div>
    </div>
    );
};

// --- Right Column (Unchanged) ---
const RightColumn: React.FC<Pick<ColumnProps, 'startup' | 't'>> = ({ startup, t }) => (
    <div className="space-y-5 sm:space-y-6">
        {/* At a Glance */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#013371] rounded-full"></div>
                {t.atAGlance}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatItem icon={TrendingUp} label={t.stage} value={startup.stage} />
                <StatItem icon={DollarSign} label={t.earnings} value={startup.earning_status} />
                <StatItem icon={User} label={t.founderName} value={startup.founder_name} />
                <StatItem icon={Phone} label={t.phone} value={startup.founder_phone} />
            </div>
        </div>

        {/* Problem & Solution */}
        {startup.problem_description && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-5">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 bg-[#013371] rounded-full"></div>
                    {t.problemSolution}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed line-clamp-6">{startup.problem_description}</p>
            </div>
        )}

        {/* Links & Pitch Deck */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#013371] rounded-full"></div>
                {t.linksPitchDeck}
            </h2>
            <div className="space-y-2.5 sm:space-y-3">
                {startup.company_linkedin && (
                    <a 
                        href={startup.company_linkedin.startsWith('http') ? startup.company_linkedin : `https://${startup.company_linkedin}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 sm:p-3.5 bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all duration-200 group"
                    >
                        <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-700 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-slate-800 truncate flex-1">{t.companyLinkedIn}</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </a>
                )}
                {startup.pitch_deck_url && (
                    <a 
                        href={startup.pitch_deck_url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 sm:p-3.5 bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all duration-200 group"
                    >
                        <FileText className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-slate-800 truncate flex-1">{t.downloadPitchDeck}</span>
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </a>
                )}
                {!startup.company_linkedin && !startup.pitch_deck_url && (
                    <p className="text-xs sm:text-sm text-slate-500 py-3 text-center">No links available</p>
                )}
            </div>
        </div>
    </div>
);

// --- Reusable Stat Item (Unchanged) ---
interface StatItemProps {
    icon: React.ElementType;
    label: string;
    value: string | null | undefined;
}
const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 text-[#013371] border border-blue-200 rounded-md flex items-center justify-center">
            <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 font-medium">{label}</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">{value || "N/A"}</p>
        </div>
    </div>
);

// --- ⭐ UPDATED: Skeleton Loading Component ---
const StartupDetailSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 animate-pulse">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="flex justify-between items-start gap-3 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-200 rounded-lg"></div>
                    <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                </div>
                <div className="h-6 w-3/4 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 w-full bg-slate-200 rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-slate-200 rounded mb-4"></div>
                
                {/* Updated button skeleton */}
                <div className="flex gap-2 sm:gap-3">
                    <div className="h-9 w-14 bg-slate-200 rounded-lg"></div>
                    <div className="h-9 w-14 bg-slate-200 rounded-lg"></div>
* <div className="h-9 flex-1 bg-slate-200 rounded-lg"></div>
                </div>
            </div>
        </div>
        {/* Right Column Skeleton */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
                    <div className="h-5 w-1/3 bg-slate-200 rounded mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-3 w-full bg-slate-200 rounded"></div>
                        <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Feedback Card (Unchanged) ---
interface FeedbackCardProps {
    message: string;
    description: string;
    icon: React.ElementType;
    iconColor: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ message, description, icon: Icon, iconColor }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-slate-100 mb-4 ${iconColor}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{message}</h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm">{description}</p>
    </div>
);