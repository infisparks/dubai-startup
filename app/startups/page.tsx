"use client"

import type React from "react"
// ⭐ FIX: Added useOptimistic, though we'll use a manual optimistic update for simplicity
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link" 
import { Session } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { supabase } from "@/lib/supabaseConfig" 
import { ArrowRight, Rocket, TrendingUp, DollarSign, AlertTriangle, Search, X, Heart, Star } from "lucide-react" 

// --- 1. Define the Type for Startup Data ---
interface FounderProfile {
  user_id: string; // This is the startup's ID
  company_name: string;
  stage: string | null;
  website: string | null;
  description: string | null;
  domain: string | null;
  earning_status: string | null;
}

// --- 2. Define Engagement Data ---
// This is now calculated from live data
interface StartupEngagement {
  startup_id: string;
  likes: number; // Total likes
  rating: number; // Average rating
  ratingCount: number; // Total number of ratings
  userLiked: boolean; // Has the current user liked?
  userRating: number | null; // What did the current user rate?
}

// --- 3. Define Translations ---
type Translations = {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    viewDetails: string;
    stage: string;
    earnings: string;
    loading: string;
    noStartups: string;
    noStartupsDesc: string;
    noResults: string;
    noResultsDesc: string;
    error: string;
    errorDesc: string;
    likes: string;
    rating: string;
    rateThis: string;
    alreadyRated: string;
    changeRating: string; // ⭐ ADDED for new UI
};

// --- 4. The Main Page Component ---
export default function StartupsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isInvestor, setIsInvestor] = useState(false); // ⭐ ADDED: Check for user role
  const [language, setLanguage] = useState<"en" | "ar">("en");
  
  const [allStartups, setAllStartups] = useState<FounderProfile[]>([]);
  // ⭐ CHANGED: This map is now built from live Supabase data
  const [engagementData, setEngagementData] = useState<Map<string, StartupEngagement>>(new Map());
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const t = useMemo((): Translations => {
    // ... (translations remain unchanged)
    return language === 'ar' ? {
        title: "الشركات الناشئة المعتمدة",
        subtitle: "تصفح و ابحث في نظامنا البيئي للشركات الناشئة المبتكرة.",
        searchPlaceholder: "ابحث بالاسم، المجال، أو الوصف...",
        viewDetails: "عرض التفاصيل",
        stage: "المرحلة",
        earnings: "الإيرادات",
        loading: "جاري تحميل الشركات الناشئة...",
        noStartups: "لا توجد شركات ناشئة معتمدة بعد",
        noStartupsDesc: "يرجى التحقق مرة أخرى لاحقًا، يتم إضافة شركات جديدة يوميًا.",
        noResults: "لا توجد نتائج مطابقة",
        noResultsDesc: "لم نتمكن من العثور على أي شركات ناشئة تطابق بحثك.",
        error: "حدث خطأ",
        errorDesc: "لم نتمكن من تحميل الشركات الناشئة. يرجى تحديث الصفحة.",
        likes: "إعجابات",
        rating: "التقييم",
        rateThis: "قيّم هذا",
        alreadyRated: "تم التقييم بالفعل",
        changeRating: "غيّر تقييمك", // ⭐ ADDED
    } : {
        title: "Approved Startups",
        subtitle: "Browse and search our ecosystem of innovative startups.",
        searchPlaceholder: "Search by name, domain, or description...",
        viewDetails: "View Details",
        stage: "Stage",
        earnings: "Earnings",
        loading: "Loading approved startups...",
        noStartups: "No Approved Startups Yet",
        noStartupsDesc: "Please check back later, new companies are being added daily.",
        noResults: "No Matching Results",
        noResultsDesc: "We couldn't find any startups matching your search.",
        error: "An Error Occurred",
        errorDesc: "We couldn't load the startups. Please refresh the page.",
        likes: "Likes",
        rating: "Rating",
        rateThis: "Rate This",
        alreadyRated: "Already Rated",
        changeRating: "Change your rating", // ⭐ ADDED
    };
  }, [language]);

  // --- ⭐ REBUILT: Data Fetching ---
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      // 1. Get Session
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      setSession(currentSession);
      
      let currentUserId = currentSession?.user?.id || null;
      let investorStatus = false;

      // 2. If logged in, get user profile (to check is_investor)
      if (currentUserId) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('is_investor')
          .eq('id', currentUserId)
          .single();
        if (profileData) {
          investorStatus = profileData.is_investor;
          setIsInvestor(investorStatus);
        }
      }

      // 3. Fetch all approved startups
      const { data: startupsData, error: startupsError } = await supabase
        .from('founder_profiles')
        .select('user_id, company_name, stage, website, description, domain, earning_status')
        .eq('is_approved', true);

      if (startupsError) {
        console.error("Error fetching startups:", startupsError);
        setError(t.errorDesc);
        setLoading(false);
        return;
      }
      
      if (!startupsData || startupsData.length === 0) {
        setAllStartups([]);
        setLoading(false);
        return;
      }
      
      setAllStartups(startupsData);
      const startupIds = startupsData.map(s => s.user_id);

      // 4. Fetch engagement data IN BULK
      // 4a. Fetch all likes for these startups
      const { data: likesData, error: likesError } = await supabase
        .from('startup_likes')
        .select('startup_id, user_id')
        .in('startup_id', startupIds);
        
      // 4b. Fetch all ratings for these startups
      const { data: ratingsData, error: ratingsError } = await supabase
        .from('startup_ratings')
        .select('startup_id, user_id, rating')
        .in('startup_id', startupIds);
        
      // 5. Process data into the Engagement Map
      const engagementMap = new Map<string, StartupEngagement>();
      for (const startup of startupsData) {
        const startupId = startup.user_id;
        
        // Process likes
        const allLikesForStartup = likesData ? likesData.filter(l => l.startup_id === startupId) : [];
        const userHasLiked = currentUserId ? allLikesForStartup.some(l => l.user_id === currentUserId) : false;
        
        // Process ratings
        const allRatingsForStartup = ratingsData ? ratingsData.filter(r => r.startup_id === startupId) : [];
        const userRatingObj = currentUserId ? allRatingsForStartup.find(r => r.user_id === currentUserId) : null;
        
        let averageRating = 0;
        if (allRatingsForStartup.length > 0) {
          const sum = allRatingsForStartup.reduce((acc, r) => acc + r.rating, 0);
          averageRating = parseFloat((sum / allRatingsForStartup.length).toFixed(1));
        }

        engagementMap.set(startupId, {
          startup_id: startupId,
          likes: allLikesForStartup.length,
          rating: averageRating,
          ratingCount: allRatingsForStartup.length,
          userLiked: userHasLiked,
          userRating: userRatingObj ? userRatingObj.rating : null,
        });
      }
      
      setEngagementData(engagementMap);
      setLoading(false);
    };

    fetchAllData();
  }, [t.errorDesc, t.changeRating]); // Re-run if translations change


  // --- ⭐ UPDATED: Toggle Like ---
  const toggleLike = async (startupId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only investors can like
    if (!isInvestor || !session?.user) return;

    const current = engagementData.get(startupId);
    if (!current) return;

    const newLikedState = !current.userLiked;
    const currentUserId = session.user.id;

    // Optimistic Update (for snappy UI)
    const optimisticData = {
      ...current,
      userLiked: newLikedState,
      likes: newLikedState ? current.likes + 1 : current.likes - 1,
    };
    setEngagementData(new Map(engagementData.set(startupId, optimisticData)));

    // Database Update
    if (newLikedState) {
      // Add like
      const { error } = await supabase
        .from('startup_likes')
        .insert({ user_id: currentUserId, startup_id: startupId });
      
      if (error) {
        console.error("Error liking:", error);
        // Revert optimistic update on error
        setEngagementData(new Map(engagementData.set(startupId, current)));
      }
    } else {
      // Remove like
      const { error } = await supabase
        .from('startup_likes')
        .delete()
        .eq('user_id', currentUserId)
        .eq('startup_id', startupId);
        
      if (error) {
        console.error("Error unliking:", error);
        // Revert optimistic update on error
        setEngagementData(new Map(engagementData.set(startupId, current)));
      }
    }
  };

  // --- ⭐ UPDATED: Submit Rating ---
  const submitRating = async (startupId: string, ratingValue: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only investors can rate
    if (!isInvestor || !session?.user) return;

    const current = engagementData.get(startupId);
    if (!current) return;
    
    const currentUserId = session.user.id;

    // Database Update (Upsert = Insert or Update)
    // This requires a UNIQUE constraint on (user_id, startup_id) in your table
    const { error } = await supabase
      .from('startup_ratings')
      .upsert({ 
        user_id: currentUserId, 
        startup_id: startupId, 
        rating: ratingValue 
      }, { 
        onConflict: 'user_id, startup_id'
      });

    if (error) {
      console.error("Error submitting rating:", error);
      // Show error to user?
      return;
    }

    // Success! Now, refetch the average rating for this card
    const { data: ratingsData, error: ratingsError } = await supabase
      .from('startup_ratings')
      .select('rating')
      .eq('startup_id', startupId);

    let newAverageRating = 0;
    let newRatingCount = 0;
    if (ratingsData && ratingsData.length > 0) {
      const sum = ratingsData.reduce((acc, r) => acc + r.rating, 0);
      newAverageRating = parseFloat((sum / ratingsData.length).toFixed(1));
      newRatingCount = ratingsData.length;
    }

    // Update local state with the new correct average
    const updated = {
      ...current,
      userRating: ratingValue,
      rating: newAverageRating,
      ratingCount: newRatingCount,
    };
    setEngagementData(new Map(engagementData.set(startupId, updated)));
  };

  // --- Live Search Logic ---
  const filteredStartups = useMemo(() => {
    if (!searchTerm) {
      return allStartups;
    }
    const lowerSearch = searchTerm.toLowerCase();
    return allStartups.filter(startup => 
      startup.company_name.toLowerCase().includes(lowerSearch) ||
      (startup.domain && startup.domain.toLowerCase().includes(lowerSearch)) ||
      (startup.description && startup.description.toLowerCase().includes(lowerSearch))
    );
  }, [allStartups, searchTerm]);

  // --- Render Function for Content ---
  const renderContent = () => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {[...Array(6)].map((_, i) => <StartupCardSkeleton key={i} />)}
            </div>
        );
    }

    if (error) {
        return <FeedbackCard message={t.error} description={t.errorDesc} icon={AlertTriangle} iconColor="text-red-500" />;
    }

    if (allStartups.length === 0) {
        return <FeedbackCard message={t.noStartups} description={t.noStartupsDesc} icon={Rocket} iconColor="text-[#013371]" />;
    }

    if (filteredStartups.length === 0) {
        return <FeedbackCard message={t.noResults} description={t.noResultsDesc} icon={Search} iconColor="text-slate-500" />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredStartups.map((startup) => (
                <StartupCard 
                  key={startup.user_id} 
                  startup={startup} 
                  t={t}
                  // ⭐ PASSING NEW PROPS
                  isInvestor={isInvestor} 
                  engagement={engagementData.get(startup.user_id)}
                  onToggleLike={toggleLike}
                  onSubmitRating={submitRating}
                />
            ))}
        </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Header 
        language={language} 
        setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>}
        userEmail={session?.user?.email} 
      />

      <main className="flex-1 pt-16 sm:pt-20 pb-12 sm:pb-16">
        {/* --- Sticky Header w/ Search --- */}
        <div className="sticky top-[60px] sm:top-[80px] z-30 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-xl border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-4 sm:pt-6 pb-4 sm:pb-5">
                {/* Page Title */}
                <div className="mb-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-1 sm:mb-2">
                      {t.title}
                    </h1>
                    <p className="text-xs sm:text-sm lg:text-base text-slate-600">{t.subtitle}</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#013371] focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                    </div>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-500" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 mt-6 sm:mt-8">
          {renderContent()}
        </div>
      </main>

      <Footer language={language} />

      {/* --- Styles --- */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}



// --- 5. Single Startup Card Component ---
// --- 5. Single Startup Card Component ---
interface StartupCardProps {
    startup: FounderProfile;
    t: Translations;
    isInvestor: boolean; 
    engagement?: StartupEngagement;
    onToggleLike: (startupId: string, e: React.MouseEvent) => void;
    onSubmitRating: (startupId: string, ratingValue: number, e: React.MouseEvent) => void;
}

// ⭐ UPDATED COMPONENT
const StartupCard: React.FC<StartupCardProps> = ({ 
    startup, 
    t, 
    isInvestor,
    engagement,
    onToggleLike,
    onSubmitRating
}) => {
    const [showRatingMenu, setShowRatingMenu] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    
    // Default engagement data
    const eng = engagement || {
      startup_id: startup.user_id,
      likes: 0,
      rating: 0,
      ratingCount: 0,
      userLiked: false,
      userRating: null
    };

    // This is the rating to show (either the hovered one or the saved one)
    const displayRating = hoverRating || eng.userRating || 0;

    return (
        <Link
            href={`/startups/${startup.user_id}`} 
            className="group relative bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col animate-fadeIn"
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-blue-50/30 transition-all duration-300 pointer-events-none"></div>

            {/* Main Content Area */}
            <div className="relative p-3 sm:p-4 lg:p-5 flex flex-col h-full">
                {/* Header with Logo & Domain */}
                <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-50 to-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center border border-slate-200 flex-shrink-0 group-hover:shadow-md transition-all">
                        <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[#013371]" />
                    </div>
                    {startup.domain && (
                        <span className="inline-block bg-blue-50 text-[#013371] border border-blue-200 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium truncate">
                            {startup.domain}
                        </span>
                    )}
                </div>
                
                {/* Title */}
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 truncate mb-1.5 sm:mb-2 group-hover:text-[#013371] transition-colors" title={startup.company_name}>
                    {startup.company_name}
                </h3>
            
                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {startup.description || "No description provided."}
                </p>

                {/* Key Stats */}
                <div className="space-y-2 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-xs text-slate-600 font-medium">{t.stage}:</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">{startup.stage || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-xs text-slate-600 font-medium">{t.earnings}:</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">{startup.earning_status || "N/A"}</span>
                    </div>
                </div>

                {/* Engagement Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-slate-100">
                    {/* Likes */}
                    <div className="bg-slate-50 rounded-lg p-2 sm:p-2.5 text-center group/stat hover:bg-red-50 transition-colors">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                            <span className="text-xs text-slate-600 font-medium">{t.likes}</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-slate-900">{eng.likes}</p>
                    </div>

                    {/* Rating */}
                    <div className="bg-slate-50 rounded-lg p-2 sm:p-2.5 text-center group/stat hover:bg-amber-50 transition-colors">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 fill-slate-400" />
                            <span className="text-xs text-slate-600 font-medium">{t.rating}</span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-slate-900">
                            {eng.rating.toFixed(1)} 
                            <span className="text-xs font-normal text-slate-500"> ({eng.ratingCount})</span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons (Pushed to bottom) */}
                <div className="mt-auto flex gap-2 sm:gap-2.5">
                    {isInvestor ? (
                        <>
                            {/* Like Button */}
                            <button
                                onClick={(e) => onToggleLike(startup.user_id, e)}
                                title={eng.userLiked ? 'Unlike' : 'Like'}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 border ${
                                    eng.userLiked
                                        ? 'bg-red-50 text-red-600 border-red-300 hover:bg-red-100'
                                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                }`}
                            >
                                <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${eng.userLiked ? 'fill-current' : ''}`} />
                                <span className="hidden sm:inline">{eng.userLiked ? 'Liked' : 'Like'}</span>
                            </button>

                            {/* Rating Button */}
                            <div className="relative flex-1">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowRatingMenu(!showRatingMenu);
                                        setHoverRating(0); // Reset hover when toggling
                                    }}
                                    title={eng.userRating ? `You rated ${eng.userRating}/5` : t.rateThis}
                                    className={`w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 border ${
                                        eng.userRating
                                            ? 'bg-amber-50 text-amber-600 border-amber-300 hover:bg-amber-100'
                                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                    }`}
                                >
                                    <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${eng.userRating ? 'fill-current' : ''}`} />
                                    <span className="hidden sm:inline">
                                        {eng.userRating ? `${eng.userRating} ★` : t.rateThis}
                                    </span>
                                </button>

                                {/* Rating Dropdown Menu */}
                                {showRatingMenu && (
                                    <div 
                                        className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg p-2 sm:p-3 z-50 animate-scaleIn w-48"
                                        // Prevent click from bubbling to Link
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                        // Close on mouse leave
                                        onMouseLeave={() => {
                                            setShowRatingMenu(false);
                                            setHoverRating(0); // Reset hover
                                        }} 
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-xs font-medium text-slate-600 px-1">
                                                {eng.userRating ? t.changeRating : t.rateThis}
                                            </p>
                                            {/* Explicit Close Button for Touch Devices */}
                                            <button 
                                                onClick={() => {
                                                    setShowRatingMenu(false);
                                                    setHoverRating(0);
                                                }}
                                                className="p-1 rounded-full hover:bg-slate-100"
                                                title="Close"
                                            >
                                                <X className="w-3.5 h-3.5 text-slate-500" />
                                            </button>
                                        </div>
                                        
                                        {/* ⭐ FIX: Responsive Star Buttons */}
                                        <div className="flex gap-1.5 justify-center">
                                            {[1, 2, 3, 4, 5].map((starValue) => (
                                                <button
                                                    key={starValue}
                                                    title={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                                                    onMouseEnter={() => setHoverRating(starValue)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={(e) => {
                                                        onSubmitRating(startup.user_id, starValue, e);
                                                        setShowRatingMenu(false);
                                                        setHoverRating(0);
                                                    }}
                                                    // ⭐ FIX: Removed 'flex-1'
                                                    className="p-2 hover:bg-amber-50 rounded transition-colors group"
                                                >
                                                    <Star 
                                                        className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto transition-all duration-150 transform group-hover:scale-110 ${
                                                            starValue <= displayRating
                                                            ? 'text-amber-400 fill-amber-400'
                                                            : 'text-slate-300 group-hover:text-amber-300'
                                                        }`} 
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* View Details Button (Icon only) */}
                            <button
                                onClick={(e) => e.preventDefault()} // Does nothing, card is link
                                title={t.viewDetails}
                                className="hidden sm:flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 bg-[#013371] text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#024fa3] transition-all duration-200 border border-[#013371]"
                            >
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                        </>
                    ) : (
                        <>
                            {/* View Details Button (Full Width for non-investors) */}
                            <button
                                onClick={(e) => e.preventDefault()} // Does nothing, card is link
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm bg-slate-50 text-slate-700 border-slate-200"
                            >
                                <span className="hidden sm:inline">{t.viewDetails}</span>
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};
// --- 6. Skeleton Loading Card ---
// (Skeleton component remains unchanged)
const StartupCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
            <div className="p-3 sm:p-4 lg:p-5 animate-pulse flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-slate-200 rounded-lg sm:rounded-xl"></div>
                    <div className="h-5 w-16 bg-slate-200 rounded-full"></div>
                </div>
                
                {/* Title */}
                <div className="h-5 w-3/4 bg-slate-200 rounded mb-2"></div>
            
                {/* Description */}
                <div className="space-y-2 mb-4 sm:mb-5">
                    <div className="h-3 w-full bg-slate-200 rounded"></div>
                    <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-slate-100">
                    <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                    <div className="h-4 w-1T/2 bg-slate-200 rounded"></div>
                </div>

                {/* Engagement */}
                <div className="grid grid-cols-2 gap-3 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-slate-100">
                    <div className="h-12 bg-slate-200 rounded-lg"></div>
                    <div className="h-12 bg-slate-200 rounded-lg"></div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-2.5">
                    <div className="flex-1 h-9 sm:h-10 bg-slate-200 rounded-lg sm:rounded-xl"></div>
                    <div className="flex-1 h-9 sm:h-10 bg-slate-200 rounded-lg sm:rounded-xl"></div>
                    <div className="hidden sm:block flex-1 h-9 sm:h-10 bg-slate-200 rounded-lg sm:rounded-xl"></div>
                </div>
            </div>
        </div>
    );
};


// --- 7. Feedback Card (for Errors, No Results, etc.) ---
// (FeedbackCard component remains unchanged)
interface FeedbackCardProps {
    message: string;
    description: string;
    icon: React.ElementType;
    iconColor: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ message, description, icon: Icon, iconColor }) => {
    return (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center bg-slate-100 mb-4 sm:mb-5 ${iconColor}`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">{message}</h3>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-md">{description}</p>
        </div>
    );
};