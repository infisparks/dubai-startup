"use client"

import type React from "react"
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link" 
import { Session } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { supabase } from "@/lib/supabaseConfig" 
import { ArrowRight, Rocket, TrendingUp, DollarSign, AlertTriangle, Search, X, Heart, Star, Globe } from "lucide-react" 

// --- Types ---
interface FounderProfile {
  user_id: string;
  company_name: string;
  stage: string | null;
  website: string | null;
  description: string | null;
  domain: string | null;
  earning_status: string | null;
}

interface StartupEngagement {
  startup_id: string;
  likes: number;
  rating: number;
  ratingCount: number;
  userLiked: boolean;
  userRating: number | null;
}

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
    changeRating: string;
};

export default function StartupsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isInvestor, setIsInvestor] = useState(false); 
  const [language, setLanguage] = useState<"en" | "ar">("en");
  
  const [allStartups, setAllStartups] = useState<FounderProfile[]>([]);
  const [engagementData, setEngagementData] = useState<Map<string, StartupEngagement>>(new Map());
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const t = useMemo((): Translations => {
    return language === 'ar' ? {
        title: "الشركات الناشئة",
        subtitle: "استكشف النظام البيئي للابتكار",
        searchPlaceholder: "بحث (الاسم، المجال)...",
        viewDetails: "التفاصيل",
        stage: "المرحلة",
        earnings: "الدخل",
        loading: "تحميل...",
        noStartups: "لا توجد شركات",
        noStartupsDesc: "سيتم إضافة شركات قريباً",
        noResults: "لا توجد نتائج",
        noResultsDesc: "حاول بكلمات أخرى",
        error: "خطأ",
        errorDesc: "فشل التحميل",
        likes: "إعجاب",
        rating: "تقييم",
        rateThis: "قيم",
        alreadyRated: "مقيّم",
        changeRating: "تغيير",
    } : {
        title: "Approved Startups",
        subtitle: "Explore the innovation ecosystem",
        searchPlaceholder: "Search (name, domain)...",
        viewDetails: "Details",
        stage: "Stage",
        earnings: "Revenue",
        loading: "Loading...",
        noStartups: "No Startups Yet",
        noStartupsDesc: "Check back later.",
        noResults: "No Results",
        noResultsDesc: "Try a different term.",
        error: "Error",
        errorDesc: "Failed to load.",
        likes: "Likes",
        rating: "Rating",
        rateThis: "Rate",
        alreadyRated: "Rated",
        changeRating: "Change",
    };
  }, [language]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      // 1. Get Session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      
      const currentUserId = currentSession?.user?.id || null;
      let investorStatus = false;

      // 2. CHECK INVESTOR STATUS
      if (currentUserId) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('is_investor')
          .eq('id', currentUserId)
          .single();
          
        if (profileData && profileData.is_investor === true) {
          investorStatus = true;
        }
      }
      setIsInvestor(investorStatus);

      // 3. Fetch Startups
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

      // 4. Fetch Engagement Data
      try {
          const { data: likesData } = await supabase
            .from('startup_likes')
            .select('startup_id, user_id')
            .in('startup_id', startupIds);
            
          const { data: ratingsData } = await supabase
            .from('startup_ratings')
            .select('startup_id, user_id, rating')
            .in('startup_id', startupIds);
            
          const engagementMap = new Map<string, StartupEngagement>();
          
          for (const startup of startupsData) {
            const startupId = startup.user_id;
            
            const allLikes = likesData ? likesData.filter(l => l.startup_id === startupId) : [];
            const userHasLiked = currentUserId ? allLikes.some(l => l.user_id === currentUserId) : false;
            
            const allRatings = ratingsData ? ratingsData.filter(r => r.startup_id === startupId) : [];
            const userRatingObj = currentUserId ? allRatings.find(r => r.user_id === currentUserId) : null;
            
            let averageRating = 0;
            if (allRatings.length > 0) {
              const sum = allRatings.reduce((acc, r) => acc + r.rating, 0);
              averageRating = parseFloat((sum / allRatings.length).toFixed(1));
            }

            engagementMap.set(startupId, {
              startup_id: startupId,
              likes: allLikes.length,
              rating: averageRating,
              ratingCount: allRatings.length,
              userLiked: userHasLiked,
              userRating: userRatingObj ? userRatingObj.rating : null,
            });
          }
          setEngagementData(engagementMap);
      } catch (err) {
          console.error("Engagement tables missing or error:", err);
          const emptyMap = new Map<string, StartupEngagement>();
          startupsData.forEach(s => emptyMap.set(s.user_id, {
             startup_id: s.user_id, likes: 0, rating: 0, ratingCount: 0, userLiked: false, userRating: null
          }));
          setEngagementData(emptyMap);
      }

      setLoading(false);
    };

    fetchAllData();
  }, [t.errorDesc]);


  const toggleLike = async (startupId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInvestor || !session?.user) return;

    const current = engagementData.get(startupId);
    if (!current) return;

    const newLikedState = !current.userLiked;
    const currentUserId = session.user.id;

    const optimisticData = {
      ...current,
      userLiked: newLikedState,
      likes: newLikedState ? current.likes + 1 : current.likes - 1,
    };
    setEngagementData(new Map(engagementData.set(startupId, optimisticData)));

    if (newLikedState) {
      const { error } = await supabase.from('startup_likes').insert({ user_id: currentUserId, startup_id: startupId });
      if (error) setEngagementData(new Map(engagementData.set(startupId, current))); 
    } else {
      const { error } = await supabase.from('startup_likes').delete().eq('user_id', currentUserId).eq('startup_id', startupId);
      if (error) setEngagementData(new Map(engagementData.set(startupId, current))); 
    }
  };

  const submitRating = async (startupId: string, ratingValue: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInvestor || !session?.user) return;

    const current = engagementData.get(startupId);
    if (!current) return;
    
    const currentUserId = session.user.id;

    const { error } = await supabase
      .from('startup_ratings')
      .upsert({ user_id: currentUserId, startup_id: startupId, rating: ratingValue }, { onConflict: 'user_id, startup_id' });

    if (error) return;

    const { data: ratingsData } = await supabase.from('startup_ratings').select('rating').eq('startup_id', startupId);

    let newAverageRating = 0;
    let newRatingCount = 0;
    if (ratingsData && ratingsData.length > 0) {
      const sum = ratingsData.reduce((acc, r) => acc + r.rating, 0);
      newAverageRating = parseFloat((sum / ratingsData.length).toFixed(1));
      newRatingCount = ratingsData.length;
    }

    const updated = { ...current, userRating: ratingValue, rating: newAverageRating, ratingCount: newRatingCount };
    setEngagementData(new Map(engagementData.set(startupId, updated)));
  };

  const filteredStartups = useMemo(() => {
    if (!searchTerm) return allStartups;
    const lowerSearch = searchTerm.toLowerCase();
    return allStartups.filter(startup => 
      startup.company_name.toLowerCase().includes(lowerSearch) ||
      (startup.domain && startup.domain.toLowerCase().includes(lowerSearch)) ||
      (startup.description && startup.description.toLowerCase().includes(lowerSearch))
    );
  }, [allStartups, searchTerm]);

  const renderContent = () => {
    // Dense grid: Mobile (1), Tablet (2/3), Desktop (4/5)
    const gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4";

    if (loading) return <div className={gridClass}>{[...Array(10)].map((_, i) => <StartupCardSkeleton key={i} />)}</div>;
    if (error) return <FeedbackCard message={t.error} description={t.errorDesc} icon={AlertTriangle} iconColor="text-red-500" />;
    if (allStartups.length === 0) return <FeedbackCard message={t.noStartups} description={t.noStartupsDesc} icon={Rocket} iconColor="text-[#013371]" />;
    if (filteredStartups.length === 0) return <FeedbackCard message={t.noResults} description={t.noResultsDesc} icon={Search} iconColor="text-slate-500" />;

    return (
        <div className={gridClass}>
            {filteredStartups.map((startup) => (
                <StartupCard 
                  key={startup.user_id} 
                  startup={startup} 
                  t={t}
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
    <div className="min-h-screen flex flex-col bg-slate-50/50 font-sans">
      <Header language={language} setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>} userEmail={session?.user?.email} />
      
      <main className="flex-1 pt-[85px] pb-10">
        {/* Compact Toolbar */}
        <div className="sticky top-[70px] z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
                        <p className="text-xs text-slate-500 hidden sm:block">{t.subtitle}</p>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            placeholder={t.searchPlaceholder} 
                            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-100 border border-transparent focus:bg-white focus:border-[#013371] rounded-lg transition-all" 
                        />
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2"><Search className="w-3.5 h-3.5 text-slate-400" /></div>
                        {searchTerm && (<button onClick={() => setSearchTerm("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200"><X className="w-3 h-3 text-slate-500" /></button>)}
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 mt-6">{renderContent()}</div>
      </main>
      <Footer language={language} />
    </div>
  );
}

// --- Compact Startup Card ---
interface StartupCardProps {
    startup: FounderProfile;
    t: Translations;
    isInvestor: boolean; 
    engagement?: StartupEngagement;
    onToggleLike: (startupId: string, e: React.MouseEvent) => void;
    onSubmitRating: (startupId: string, ratingValue: number, e: React.MouseEvent) => void;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, t, isInvestor, engagement, onToggleLike, onSubmitRating }) => {
    const [showRatingMenu, setShowRatingMenu] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    
    const eng = engagement || { startup_id: startup.user_id, likes: 0, rating: 0, ratingCount: 0, userLiked: false, userRating: null };
    const displayRating = hoverRating || eng.userRating || 0;

    return (
        <Link href={`/startups/${startup.user_id}`} className="group relative bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-visible">
            <div className="p-3.5 flex flex-col h-full">
                {/* Header: Icon & Badge */}
                <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 flex-shrink-0">
                        <Rocket className="w-5 h-5 text-[#013371]" />
                    </div>
                    {startup.domain && (
                        <span className="bg-blue-50/80 text-[#013371] border border-blue-100 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide truncate max-w-[100px]">
                            {startup.domain}
                        </span>
                    )}
                </div>
                
                {/* Content */}
                <div className="mb-3">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate leading-tight mb-1 group-hover:text-[#013371] transition-colors">
                        {startup.company_name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed h-8">
                        {startup.description || "No description available."}
                    </p>
                </div>

                {/* Mini Stats Row */}
                <div className="grid grid-cols-2 gap-2 mb-3 pt-2 border-t border-slate-50">
                    <div>
                         <p className="text-[10px] text-slate-400 font-medium uppercase">{t.stage}</p>
                         <div className="flex items-center gap-1 text-slate-700">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-[11px] font-semibold truncate">{startup.stage || "-"}</span>
                         </div>
                    </div>
                    <div>
                         <p className="text-[10px] text-slate-400 font-medium uppercase">{t.earnings}</p>
                         <div className="flex items-center gap-1 text-slate-700">
                            <DollarSign className="w-3 h-3" />
                            <span className="text-[11px] font-semibold truncate">{startup.earning_status || "-"}</span>
                         </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Stats (Left) */}
                    <div className="flex items-center gap-3">
                         <div className="flex items-center gap-1" title={`${eng.likes} Likes`}>
                            <Heart className={`w-3.5 h-3.5 ${eng.userLiked ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} />
                            <span className="text-[11px] font-medium text-slate-600">{eng.likes}</span>
                         </div>
                         <div className="flex items-center gap-1" title={`${eng.rating} Rating`}>
                            <Star className={`w-3.5 h-3.5 ${eng.rating > 0 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
                            <span className="text-[11px] font-medium text-slate-600">{eng.rating.toFixed(1)}</span>
                         </div>
                    </div>

                    {/* Buttons (Right) */}
                    <div className="flex items-center gap-1.5">
                        {isInvestor ? (
                            <>
                                <button
                                    onClick={(e) => onToggleLike(startup.user_id, e)}
                                    className={`p-1.5 rounded-md transition-colors ${
                                        eng.userLiked ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                    }`}
                                >
                                    <Heart className={`w-3.5 h-3.5 ${eng.userLiked ? 'fill-current' : ''}`} />
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowRatingMenu(!showRatingMenu); setHoverRating(0); }}
                                        className={`p-1.5 rounded-md transition-colors ${
                                            eng.userRating ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                    >
                                        <Star className={`w-3.5 h-3.5 ${eng.userRating ? 'fill-current' : ''}`} />
                                    </button>
                                    
                                    {/* Rating Popup */}
                                    {showRatingMenu && (
                                        <div 
                                            className="absolute bottom-full right-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-xl p-2 z-50 w-32 flex justify-between animate-in zoom-in-95 duration-100"
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            onMouseLeave={() => setShowRatingMenu(false)}
                                        >
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={(e) => { onSubmitRating(startup.user_id, star, e); setShowRatingMenu(false); }}
                                                    className="p-0.5 hover:scale-110 transition-transform"
                                                >
                                                    <Star className={`w-4 h-4 ${star <= displayRating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : null}
                        
                        <button className="text-[10px] font-bold bg-slate-900 text-white px-2.5 py-1.5 rounded-md hover:bg-[#013371] transition-colors flex items-center gap-1">
                            {t.viewDetails} <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const StartupCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white border border-slate-200 rounded-xl h-[220px] p-3.5 flex flex-col">
            <div className="flex justify-between items-start mb-3 animate-pulse">
                <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
                <div className="w-16 h-5 bg-slate-100 rounded-md"></div>
            </div>
            <div className="mb-3 space-y-2 animate-pulse">
                <div className="w-3/4 h-4 bg-slate-100 rounded"></div>
                <div className="w-full h-3 bg-slate-100 rounded"></div>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-slate-50 animate-pulse">
                 <div className="h-8 bg-slate-100 rounded"></div>
                 <div className="h-8 bg-slate-100 rounded"></div>
            </div>
        </div>
    );
};

interface FeedbackCardProps {
    message: string;
    description: string;
    icon: React.ElementType;
    iconColor: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ message, description, icon: Icon, iconColor }) => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center text-center p-10 bg-white border border-slate-200 rounded-xl shadow-sm border-dashed">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 mb-3 ${iconColor}`}><Icon className="w-6 h-6" /></div>
            <h3 className="text-base font-bold text-slate-900 mb-1">{message}</h3>
            <p className="text-xs text-slate-500">{description}</p>
        </div>
    );
};