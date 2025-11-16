// FounderFormPage.tsx
"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link" 
import { Session, User as SupabaseUser } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthPopup from "@/components/AuthPopup" 
import EmailVerificationNotice from "@/components/EmailVerificationNotice" 
import { ArrowRight, Upload, CheckCircle2, LogIn, TrendingUp, Edit, Lock, Save } from "lucide-react" 
import { supabase } from "@/lib/supabaseConfig" 

// Define the shape of the data we fetch/save
interface FounderProfileData {
    company_name: string;
    stage: string;
    pitch_deck_url: string | null;
    website: string;
    description: string;
    founder_name: string;
    founder_phone: string;
    company_linkedin: string;
    domain: string;
    domain_other_spec: string | null;
    problem_description: string | null;
    earning_status: string | null;
    is_approved: boolean;
}

// Define a type for the structure returned by the translations useMemo hook
type Translations = {
    title: string;
    subtitle: string;
    startupInfo: string;
    founderDetails: string;
    companyName: string;
    stage: string;
    domain: string;
    domainOtherSpec: string;
    problemDescription: string;
    earningStatus: string;
    pitchDeck: string;
    website: string;
    description: string;
    founderName: string;
    email: string;
    phone: string;
    companyLinkedin: string;
    back: string;
    next: string;
    submit: string;
    update: string;
    required: string;
    uploadFile: string;
    fileHint: string;
    descHint: string;
    domains: string[];
    earnings: string[];
    stages: string[];
    placeholder: {
        company: string;
        website: string;
        description: string;
        problemDescription: string;
        domainOtherSpec: string;
        name: string;
        email: string;
        phone: string;
        companyLinkedin: string;
    };
    ready: string;
    readyDesc: string;
    status: {
        title: string;
        notSubmitted: string;
        pending: string;
        approved: string;
        notApprovedDesc: string;
        approvedDesc: string;
        viewDetails: string;
    };
    authError: string;
    pitchDeckRequiredError: string;
    submitSuccess: string;
    updateSuccess: string;
    submitError: string;
    loginRequired: string;
    loginRequiredDesc: string;
    roleMismatch: string;
    roleMismatchDesc: string;
    login: string; 
    validation: {
        step1: string;
    };
};

export default function FounderFormPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null) // We still fetch the role, but don't use it to block
  const [loadingSession, setLoadingSession] = useState(true)
  const [loadingData, setLoadingData] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [needsVerification, setNeedsVerification] = useState(false)
  const [hasExistingProfile, setHasExistingProfile] = useState(false)
  const [isApproved, setIsApproved] = useState(false) 

  const [step, setStep] = useState(1) // Default step is 1 for new users
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [formData, setFormData] = useState({
    companyName: "",
    stage: "",
    pitchDeck: null as File | null,
    pitchDeckUrl: null as string | null, 
    companyLinkedin: "",
    website: "",
    description: "",
    founderName: "",
    founderEmail: "",
    founderPhone: "",
    domain: "",
    domainOtherSpec: "",
    problemDescription: "",
    earningStatus: "",
  })

  // --- SUPABASE DATA FETCHING AND AUTH LOGIC ---
  const fetchUserData = useCallback(async (currentUser: SupabaseUser) => {
    setLoadingData(true);
    
    // 1. Fetch Role (for context, not for blocking)
    const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single();
    
    setUserRole(profileData?.role || null);
    
    // 2. Fetch Founder Profile Data (ALWAYS, regardless of role)
    //    This allows an 'investor' to also have a 'founder' profile.
    const { data: founderProfile } = await supabase
        .from('founder_profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();
    
    if (founderProfile) {
        setHasExistingProfile(true);
        setIsApproved(founderProfile.is_approved);
        setStep(0); // Show status view
        
        // Pre-fill form data
        setFormData((prev) => ({
            ...prev,
            companyName: founderProfile.company_name || '',
            stage: founderProfile.stage || '',
            pitchDeckUrl: founderProfile.pitch_deck_url,
            companyLinkedin: founderProfile.company_linkedin || '',
            website: founderProfile.website || '',
            description: founderProfile.description || '',
            founderName: founderProfile.founder_name || '',
            founderEmail: currentUser.email!,
            founderPhone: founderProfile.founder_phone || '',
            domain: founderProfile.domain || '',
            domainOtherSpec: founderProfile.domain_other_spec || '',
            problemDescription: founderProfile.problem_description || '',
            earningStatus: founderProfile.earning_status || '',
        }));
    } else {
         setHasExistingProfile(false);
         setStep(1); // Show form
    }
    
    setLoadingData(false);
  }, []); // useCallback dependencies are empty

  useEffect(() => {
    const getSession = async () => {
        const { data: { session }, } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setSession(session);
        setUser(currentUser);
        
        if (currentUser) {
            setFormData(prev => ({ ...prev, founderEmail: currentUser.email! }));
            if (!currentUser.email_confirmed_at) {
                setNeedsVerification(true);
            } else {
                setNeedsVerification(false);
                await fetchUserData(currentUser);
            }
        }
        setLoadingSession(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        const currentUser = newSession?.user ?? null;
        setSession(newSession);
        setUser(currentUser);
        
        if (event === "SIGNED_IN" && currentUser?.email_confirmed_at) {
            setNeedsVerification(false);
            setShowAuthPopup(false);
            fetchUserData(currentUser);
        } else if (event === "SIGNED_OUT") {
            setNeedsVerification(false);
            setUserRole(null);
            setIsApproved(false);
            setHasExistingProfile(false);
            setStep(1); 
            setFormData({
                companyName: "", stage: "", pitchDeck: null, pitchDeckUrl: null,
                companyLinkedin: "", website: "", description: "",
                founderName: "", founderEmail: "", founderPhone: "",
                domain: "", domainOtherSpec: "", problemDescription: "",
                earningStatus: "",
            });
        }
      }
    );

    return () => { authListener.subscription.unsubscribe() };
  }, [fetchUserData]);

  // --- TRANSLATIONS (Updated with new fields) ---
  const t = useMemo(() => {
    const translations = {
        en: {
            title: "Startup Application",
            subtitle: "Get funding for your innovative startup",
            startupInfo: "Startup Information",
            founderDetails: "Founder Details",
            companyName: "Company Name",
            stage: "Funding Stage",
            domain: "Primary Domain",
            domainOtherSpec: "Specify Domain",
            problemDescription: "Problem/Solution Overview",
            earningStatus: "Earning Status",
            pitchDeck: "Pitch Deck (PDF/PPT)",
            website: "Company Website",
            description: "Company Description (Max 250 words)",
            founderName: "Founder Name",
            email: "Email Address",
            phone: "Phone Number",
            companyLinkedin: "Company LinkedIn",
            back: "Back",
            next: "Next",
            submit: "Submit Application",
            update: "Update Application",
            required: "Required",
            uploadFile: "Upload your pitch deck",
            fileHint: "PDF or PowerPoint, max 25MB",
            descHint: "Describe in 200-250 words",
            domains: ["FinTech", "HealthTech", "E-commerce", "SaaS", "EdTech", "Other"],
            earnings: ["Pre-revenue", "Pilot/Traction", "Revenue Generating (Under $1M)", "Scaling (Over $1M)"],
            stages: ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"],
            placeholder: {
                company: "Enter company name",
                website: "https://yourcompany.com",
                description: "Describe your startup in max 250 words...",
                problemDescription: "Describe the problem and your unique solution...",
                domainOtherSpec: "e.g., Quantum Computing, SpaceTech",
                name: "Enter your full name",
                email: "Enter your email",
                phone: "Enter your phone number",
                companyLinkedin: "https://linkedin.com/company/yourcompany",
            },
            ready: "Ready to launch?",
            readyDesc:
                "Our team reviews applications daily. If your startup is a good fit, we'll schedule a call to discuss funding opportunities.",
            status: {
                title: "Application Status",
                notSubmitted: "Application Not Submitted",
                pending: "Application Pending Review",
                approved: "Congratulations! Your Startup is Approved.",
                notApprovedDesc: "Your application is currently being reviewed by our team. We aim to respond within 5 business days.",
                approvedDesc: "Your startup has been approved for the next stage of funding discussions. Please check your email for a detailed next step from your dedicated advisor.",
                viewDetails: "View Details (Read-Only)",
            },
            authError: "Authentication error: Please try logging in again.",
            pitchDeckRequiredError: "Pitch Deck is required.",
            submitSuccess: "Application submitted successfully! We will review your pitch.",
            updateSuccess: "Application updated successfully!",
            submitError: "An error occurred during submission: ",
            loginRequired: "Login Required", 
            loginRequiredDesc: "Please login or sign up as a Founder to access this application form.", 
            roleMismatch: "Access Denied",
            roleMismatchDesc: "Your account is registered as an Investor. Please login with a Founder account.",
            login: "Login / Sign Up", // Added key
            validation: {
                step1: "Please fill in all required fields in Step 1.",
            }
        },
        ar: {
            title: "طلب الشركة الناشئة",
            subtitle: "احصل على تمويل لشركتك الناشئة المبتكرة",
            startupInfo: "معلومات الشركة الناشئة",
            founderDetails: "تفاصيل المؤسس",
            companyName: "اسم الشركة",
            stage: "مرحلة التمويل",
            domain: "المجال الرئيسي",
            domainOtherSpec: "تحديد المجال",
            problemDescription: "نظرة عامة على المشكلة/الحل",
            earningStatus: "حالة الإيرادات",
            pitchDeck: "عرض الملعب (PDF/PPT)",
            website: "موقع الويب للشركة",
            description: "وصف الشركة (بحد أقصى 250 كلمة)",
            founderName: "اسم المؤسس",
            email: "عنوان البريد الإلكتروني",
            phone: "رقم الهاتف",
            companyLinkedin: "LinkedIn للشركة",
            back: "رجوع",
            next: "التالي",
            submit: "إرسال الطلب",
            update: "تحديث الطلب",
            required: "مطلوب",
            uploadFile: "قم بتحميل عرض الملعب الخاص بك",
            fileHint: "PDF أو PowerPoint، بحد أقصى 25 ميجابايت",
            descHint: "اكتب وصفًا بـ 200-250 كلمة",
            domains: ["التكنولوجيا المالية", "التكنولوجيا الصحية", "التجارة الإلكترونية", "SaaS", "التعليم", "أخرى"],
            earnings: ["ما قبل الإيرادات", "تجريبي/احتكاك", "توليد الإيرادات (أقل من 1 مليون دولار)", "التوسع (أكثر من 1 مليون دولار)"],
            stages: ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"],
            placeholder: {
                company: "أدخل اسم الشركة",
                website: "https://yourcompany.com",
                description: "وصف شركتك الناشئة بحد أقصى 250 كلمة...",
                problemDescription: "صف المشكلة والحل الفريد...",
                domainOtherSpec: "مثال: الحوسبة الكمومية، تكنولوجيا الفضاء",
                name: "أدخل اسمك الكامل",
                email: "أدخل بريدك الإلكتروني",
                phone: "أدخل رقم هاتفك",
                companyLinkedin: "https://linkedin.com/company/yourcompany",
            },
            ready: "هل أنت مستعد للإطلاق؟",
            readyDesc: "يراجع فريقنا الطلبات يوميًا. إذا كانت شركتك الناشئة مناسبة، سنجدول مكالمة لمناقشة فرص التمويل.",
            status: {
                title: "حالة الطلب",
                notSubmitted: "لم يتم تقديم الطلب",
                pending: "الطلب قيد المراجعة",
                approved: "تهانينا! تمت الموافقة على شركتك الناشئة.",
                notApprovedDesc: "يتم حاليًا مراجعة طلبك من قبل فريقنا. نهدف إلى الرد في غضون 5 أيام عمل.",
                approvedDesc: "تمت الموافقة على شركتك الناشئة للمرحلة التالية من مناقشات التمويل. يرجى التحقق من بريدك الإلكتروني للحصول على خطوة تالية مفصلة من مستشارك المخصص.",
                viewDetails: "عرض التفاصيل (للقراءة فقط)",
            },
            authError: "خطأ في المصادقة: يرجى محاولة تسجيل الدخول مرة أخرى.",
            pitchDeckRequiredError: "عرض الملعب مطلوب.",
            submitSuccess: "تم إرسال الطلب بنجاح! سنقوم بمراجعة العرض الخاص بك.",
            updateSuccess: "تم تحديث الطلب بنجاح!",
            submitError: "حدث خطأ أثناء الإرسال: ",
            loginRequired: "تسجيل الدخول مطلوب", 
            loginRequiredDesc: "يرجى تسجيل الدخول أو إنشاء حساب كمؤسس للوصول إلى نموذج الطلب هذا.", 
            roleMismatch: "تم رفض الوصول",
            roleMismatchDesc: "حسابك مسجل كمستثمر. يرجى تسجيل الدخول بحساب مؤسس.",
            login: "تسجيل الدخول / إنشاء حساب", // Added key
            validation: {
                step1: "يرجى ملء جميع الحقول المطلوبة في الخطوة 1.",
            }
        },
    }
    return translations[language] as Translations;
  }, [language]); 

  // --- FORM HANDLERS AND SUBMISSION ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        pitchDeck: file,
      }))
    }
  }

  const handleNext = () => {
    // Validation for Step 1
    if (!formData.companyName || !formData.domain || !formData.website || (!formData.pitchDeck && !formData.pitchDeckUrl)) {
        alert(t.validation.step1);
        return;
    }
    if (step < 2) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const uploadPitchDeck = async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('pitch_decks')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false, 
        });

    if (error) throw error;
    
    // Get the public URL
    const { data: urlData } = supabase.storage
        .from('pitch_decks')
        .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert(t.authError);
    if (isApproved) return; 

    setLoadingData(true);
    let finalPitchUrl = formData.pitchDeckUrl;

    try {
        // 1. Handle File Upload if a new file was selected
        if (formData.pitchDeck) {
            finalPitchUrl = await uploadPitchDeck(formData.pitchDeck, user.id);
        } else if (!finalPitchUrl) {
            throw new Error(t.pitchDeckRequiredError);
        }
        
        // Create submission data *without* is_approved
        const submissionData: Omit<FounderProfileData, 'is_approved'> = {
            company_name: formData.companyName,
            stage: formData.stage,
            pitch_deck_url: finalPitchUrl,
            website: formData.website,
            description: formData.description,
            founder_name: formData.founderName,
            founder_phone: formData.founderPhone,
            company_linkedin: formData.companyLinkedin,
            domain: formData.domain,
            domain_other_spec: formData.domain === 'Other' ? formData.domainOtherSpec : null,
            problem_description: formData.problemDescription,
            earning_status: formData.earningStatus,
        }

        let error;
        if (hasExistingProfile) {
            // Update existing profile (RLS will prevent this if is_approved=true)
            const result = await supabase
                .from('founder_profiles')
                .update(submissionData)
                .eq('user_id', user.id)
                .select();
            error = result.error;
        } else {
            // Insert new profile, explicitly setting is_approved to false
            const result = await supabase
                .from('founder_profiles')
                .insert({ 
                    user_id: user.id, 
                    ...submissionData,
                    is_approved: false 
                })
                .select();
            error = result.error;
        }

        if (error) throw error;

        alert(hasExistingProfile ? t.updateSuccess : t.submitSuccess);
        setHasExistingProfile(true); 
        setStep(0); // Show StatusView after successful submission/update
    } catch (err: any) {
        alert(t.submitError + (err.message || ''));
        console.error("Submission error:", err);
    } finally {
        setLoadingData(false);
    }
  }

  // --- CONDITIONAL RENDERING LOGIC ---
  const renderContent = () => {
    if (loadingSession || loadingData) {
      return (
        <div className="text-center py-20 text-slate-600 text-xl font-medium animate-pulse">
          Loading user session and profile...
        </div>
      )
    }

    if (!user || needsVerification) {
        if (needsVerification) return <EmailVerificationNotice language={language} />;
        
        return (
            <div className="max-w-xl mx-auto mt-16 p-8 text-center bg-red-50 border-2 border-red-300 rounded-xl shadow-lg animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.loginRequired}</h2>
              <p className="text-slate-700 mb-6">{t.loginRequiredDesc}</p>
              <button
                onClick={() => setShowAuthPopup(true)}
                className="px-8 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
              >
                <LogIn className="w-5 h-5" /> {t.login} 
              </button>
            </div>
        );
    }
    
    // ⭐ FIX: REMOVED the "Role Check: Deny access if user is an investor" block.
    // A user can now see this form regardless of their primary role.

    // Show StatusView if profile exists AND we are on step 0 (default for existing users)
    if (hasExistingProfile && step === 0) {
        return (
            <StatusView 
                t={t} 
                isApproved={isApproved} 
                formData={formData} 
                setStep={setStep}
                canEdit={!isApproved}
            />
        );
    }

    // Show FormView if we are on step 1 or 2
    // This covers both new users (step=1) and existing users editing (step=1 or 2)
    if (step === 1 || step === 2) {
        return (
          <FormView 
              t={t} 
              step={step} 
              formData={formData} 
              handleInputChange={handleInputChange} 
              handleFileUpload={handleFileUpload} 
              handleNext={handleNext} 
              handleBack={handleBack} 
              handleSubmit={handleSubmit}
              isApproved={isApproved}
              hasExistingProfile={hasExistingProfile} // Pass this to set button text
          />
        );
    }

    // Fallback for any other state
    return (
        <div className="text-center py-20 text-slate-600 text-xl font-medium animate-pulse">
          Loading...
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        language={language} 
        setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>}
        userEmail={user?.email} 
      />

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{t.title}</h1>
            <p className="text-lg text-slate-600">{t.subtitle}</p>
          </div>

          {renderContent()}
        </div>
      </main>

      <Footer language={language} />

      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          onSuccess={() => setShowAuthPopup(false)} 
          language={language}
        />
      )}
    </div>
  )
}


// --- Helper Components for Cleanliness ---

// 1. Form View Component (Handles Steps 1 and 2)
interface FormViewProps {
    t: Translations; 
    step: number;
    formData: any; 
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext: () => void;
    handleBack: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    isApproved: boolean;
    hasExistingProfile: boolean; 
}

const FormView: React.FC<FormViewProps> = ({ t, step, formData, handleInputChange, handleFileUpload, handleNext, handleBack, handleSubmit, isApproved, hasExistingProfile }) => {
    
    const isDisabled = isApproved;
    const OTHER_DOMAIN_VALUE = "Other";

    return (
        <>
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-6 md:gap-8 mb-12 animate-slideInDown">
                {[1, 2].map((stepNum) => (
                    <div key={stepNum} className="flex items-center">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                                step >= stepNum ? "bg-[#013371] text-white shadow-lg" : "bg-slate-200 text-slate-500"
                            }`}
                        >
                            {step > stepNum ? <CheckCircle2 className="w-6 h-6" /> : stepNum}
                        </div>
                        {stepNum < 2 && (
                            <div className={`h-1 w-12 md:w-20 transition-all ${step >= 2 ? "bg-[#013371]" : "bg-slate-200"}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Form Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-10 animate-slideInUp">
                <form onSubmit={handleSubmit}>
                    {/* Step 1: Startup Info */}
                    {step === 1 && (
                        <div className="space-y-6 animate-slideInUp">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.startupInfo}</h2>

                            {[
                                { label: t.companyName, name: "companyName", type: "text", placeholder: t.placeholder.company, required: true },
                                { label: t.website, name: "website", type: "url", placeholder: t.placeholder.website, required: true },
                                { label: t.companyLinkedin, name: "companyLinkedin", type: "url", placeholder: t.placeholder.companyLinkedin, required: false },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        {field.label} {field.required && <span className="text-red-500">*</span>} 
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof typeof formData] || ""}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isDisabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        required={field.required} 
                                        disabled={isDisabled}
                                    />
                                </div>
                            ))}

                            {/* Domain Dropdown */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.domain} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isDisabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    required
                                    disabled={isDisabled}
                                >
                                    <option value="">Select Domain</option>
                                    {t.domains.map((d: string) => ( 
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Domain Other Specification (Conditional Input) */}
                            {formData.domain === OTHER_DOMAIN_VALUE && (
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        {t.domainOtherSpec} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="domainOtherSpec"
                                        value={formData.domainOtherSpec}
                                        onChange={handleInputChange}
                                        placeholder={t.placeholder.domainOtherSpec}
                                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isDisabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        required
                                        disabled={isDisabled}
                                    />
                                </div>
                            )}

                            {/* Pitch Deck Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.pitchDeck} {formData.pitchDeckUrl ? "(Optional Update)" : <span className="text-red-500">*</span>}
                                </label>
                                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${isDisabled ? 'border-slate-200 bg-slate-50' : 'border-slate-300 hover:border-[#013371] hover:bg-blue-50 cursor-pointer'}`}>
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        accept=".pdf,.ppt,.pptx"
                                        className="hidden"
                                        id="pitch-upload"
                                        required={!formData.pitchDeckUrl}
                                        disabled={isDisabled}
                                    />
                                    <label htmlFor="pitch-upload" className={`cursor-pointer block ${isDisabled ? 'cursor-not-allowed' : ''}`}>
                                        <Upload className="w-8 h-8 text-[#013371] mx-auto mb-2" />
                                        {formData.pitchDeck ? (
                                            <p className="text-sm font-semibold text-slate-900">{formData.pitchDeck.name}</p>
                                        ) : formData.pitchDeckUrl ? (
                                            <p className="text-sm font-semibold text-green-600">Existing file uploaded. Click to replace.</p>
                                        ) : (
                                            <>
                                                <p className="text-sm font-semibold text-slate-900 mb-1">{t.uploadFile}</p>
                                                <p className="text-xs text-slate-500">{t.fileHint}</p>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    disabled
                                    className="flex-1 px-6 py-3 bg-slate-100 text-slate-400 rounded-lg font-semibold cursor-not-allowed"
                                >
                                    {t.back}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex-1 px-6 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    disabled={isDisabled}
                                >
                                    {t.next} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Founder Details & Descriptions */}
                    {step === 2 && (
                        <div className="space-y-6 animate-slideInUp">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.founderDetails}</h2>

                            {[
                                { label: t.founderName, name: "founderName", type: "text", placeholder: t.placeholder.name, required: true, disabled: false },
                                { label: t.email, name: "founderEmail", type: "email", placeholder: t.placeholder.email, required: true, disabled: true }, 
                                { label: t.phone, name: "founderPhone", type: "tel", placeholder: t.placeholder.phone, required: true, disabled: false },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        {field.label} {field.required ? <span className="text-red-500">*</span> : ''}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof typeof formData] || ""}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors ${field.disabled || isDisabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        required={field.required}
                                        disabled={field.disabled || isDisabled}
                                    />
                                </div>
                            ))}
                            
                            {/* Funding Stage */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.stage} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isDisabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    required
                                    disabled={isDisabled}
                                >
                                    <option value="">Select funding stage</option>
                                    {t.stages.map((s: string) => ( 
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Earning Status */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.earningStatus} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="earningStatus"
                                    value={formData.earningStatus}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isDisabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    required
                                    disabled={isDisabled}
                                >
                                    <option value="">Select earning status</option>
                                    {t.earnings.map((e: string) => ( 
                                        <option key={e} value={e}>
                                            {e}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Problem Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.problemDescription} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="problemDescription"
                                    value={formData.problemDescription}
                                    onChange={handleInputChange}
                                    placeholder={t.placeholder.problemDescription}
                                    rows={3}
                                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors resize-none ${isDisabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    required
                                    disabled={isDisabled}
                                />
                            </div>

                            {/* Company Description (Original) */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.description} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder={t.placeholder.description}
                                    rows={4}
                                    maxLength={250}
                                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors resize-none ${isDisabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    required
                                    disabled={isDisabled}
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    {formData.description.length}/250 {t.descHint}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 px-6 py-3 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" /> {t.back}
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    disabled={isDisabled}
                                >
                                    {hasExistingProfile ? t.update : t.submit} {hasExistingProfile && <Save className="w-4 h-4"/>}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Info Box */}
            <div
                className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 animate-slideInUp"
                style={{ animationDelay: "200ms" }}
            >
                <p className="font-semibold text-slate-900 mb-2">{t.ready}</p>
                <p className="text-slate-600">{t.readyDesc}</p>
            </div>
        </>
    );
};


// 2. Status View Component (Showed after submission)
interface StatusViewProps {
    t: Translations; // Use the defined type
    isApproved: boolean;
    formData: any;
    setStep: Dispatch<SetStateAction<number>>;
    canEdit: boolean; 
}

const StatusView: React.FC<StatusViewProps> = ({ t, isApproved, formData, setStep, canEdit }) => {
    const statusColor = isApproved ? "bg-green-50 border-green-300 text-green-700" : "bg-yellow-50 border-yellow-300 text-yellow-700";
    const statusIcon = isApproved ? <CheckCircle2 className="w-8 h-8" /> : <TrendingUp className="w-8 h-8"/>;
    const statusTitle = isApproved ? t.status.approved : t.status.pending;
    const statusDesc = isApproved ? t.status.approvedDesc : t.status.notApprovedDesc;

    const readOnlyFields = [
        { label: t.companyName, value: formData.companyName },
        { label: t.stage, value: formData.stage },
        { label: t.domain, value: formData.domain === 'Other' ? `${formData.domain} (${formData.domainOtherSpec})` : formData.domain },
        { label: t.earningStatus, value: formData.earningStatus },
        { label: t.founderName, value: formData.founderName },
        { label: t.email, value: formData.founderEmail },
        { label: t.website, value: formData.website, link: true },
        { label: t.pitchDeck, value: "View Pitch Deck", link: true, url: formData.pitchDeckUrl },
    ];


    return (
        <div className="space-y-8">
            {/* Status Card */}
            <div className={`p-8 rounded-xl shadow-lg flex items-start gap-4 ${statusColor}`}>
                {statusIcon}
                <div>
                    <h2 className="text-2xl font-bold mb-2">{t.status.title}</h2>
                    <h3 className="text-xl font-semibold mb-2">{statusTitle}</h3>
                    <p className="text-sm">{statusDesc}</p>
                </div>
            </div>

            {/* Details and Edit Button */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">{t.status.viewDetails}</h3>
                    {canEdit && (
                        <button
                            onClick={() => setStep(1)} // Go back to Step 1 to edit
                            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors shadow-md"
                        >
                            <Edit className="w-4 h-4" /> {t.update}
                        </button>
                    )}
                    {!canEdit && (
                        <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 rounded-lg font-semibold shadow-md">
                            <Lock className="w-4 h-4" /> Application Locked
                        </span>
                    )}
                </div>

                {/* Read-Only Fields Grid */}
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    {readOnlyFields.map((field) => (
                        <div key={field.label}>
                            <p className="font-semibold text-slate-500 mb-1">{field.label}:</p>
                            {field.link ? (
                                <a 
                                    href={field.url || (field.label === t.website ? field.value : '#')} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#013371] hover:underline break-words"
                                >
                                    {field.value}
                                </a>
                            ) : (
                                <p className="text-slate-900 font-medium">{field.value}</p>
                            )}
                        </div>
                    ))}
                    <div className="md:col-span-2">
                        <p className="font-semibold text-slate-500 mb-1">{t.problemDescription}:</p>
                        <p className="text-slate-900 font-medium whitespace-pre-wrap">{formData.problemDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};