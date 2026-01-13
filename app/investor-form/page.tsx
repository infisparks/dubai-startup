// InvestorFormPage.tsx
"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { Session, User as SupabaseUser } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthPopup from "@/components/AuthPopup"
import EmailVerificationNotice from "@/components/EmailVerificationNotice"
import { ArrowRight, CheckCircle2, LogIn, Edit, Save, Lock, TrendingUp, Link as LinkIcon } from "lucide-react"
import { supabase } from "@/lib/supabaseConfig"

// Define the type for the specific profile data fetched from the database
interface InvestorProfileData {
    phone: string;
    linkedin: string;
    investment_amount: string;
    investment_type: string;
    experience: string;
    interests: string[] | null;
    is_approved: boolean;
    // ⭐ NEW: Added name and email from the SQL table
    name: string | null;
    email: string | null;
    reference: string | null;
}

// Define the type for the form's state
interface InvestorFormData {
    fullName: string;
    phone: string;
    email: string;
    linkedin: string;
    investmentAmount: string;
    investmentType: string;
    experience: string;
    interests: string[];
    reference: string;
    referenceOther: string;
}

// Define a type for the structure returned by the translations useMemo hook
type Translations = {
    title: string;
    subtitle: string;
    personalInfo: string;
    investmentDetails: string;
    fullName: string;
    phone: string;
    email: string;
    linkedin: string;
    investmentAmount: string;
    investorType: string;
    experience: string;
    areas: string;
    back: string;
    next: string;
    submit: string;
    update: string;
    required: string;
    loginRequired: string;
    loginRequiredDesc: string;
    login: string;
    roleMismatch: string;
    roleMismatchDesc: string;
    placeholder: {
        name: string;
        phone: string;
        email: string;
        linkedin: string;
    };
    interests: string[];
    ranges: string[];
    types: string[];
    levels: string[];
    whatNext: string;
    nextDesc: string;
    status: {
        title: string;
        pending: string;
        approved: string;
        notApprovedDesc: string;
        approvedDesc: string;
        viewDetails: string;
    };
    reference: string;
    referenceOther: string;
    referenceOptions: string[];
};

export default function InvestorFormPage() {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [loadingSession, setLoadingSession] = useState(true)
    const [loadingData, setLoadingData] = useState(false)
    const [showAuthPopup, setShowAuthPopup] = useState(false)
    const [needsVerification, setNeedsVerification] = useState(false)
    const [hasExistingProfile, setHasExistingProfile] = useState(false)
    const [isApproved, setIsApproved] = useState(false)

    const [step, setStep] = useState(1) // 1 = form step 1, 0 = status card
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const [formData, setFormData] = useState<InvestorFormData>({
        fullName: "",
        phone: "",
        email: "",
        linkedin: "",
        investmentAmount: "",
        investmentType: "",
        experience: "",
        interests: [],
        reference: "",
        referenceOther: "",
    })

    // --- Supabase Session and Role Management ---
    const fetchUserData = useCallback(async (currentUser: SupabaseUser) => {
        setLoadingData(true);
        // 1. Fetch Role and Full Name from profiles table (used as initial default)
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role, full_name')
            .eq('id', currentUser.id)
            .single();

        if (profileError || !profileData) {
            console.error("Error fetching profile:", profileError);
            setUserRole(null);
        } else {
            setUserRole(profileData.role);
            // Set initial defaults from auth and profiles table
            setFormData((prev) => ({
                ...prev,
                fullName: profileData.full_name || prev.fullName,
                email: currentUser.email!,
            }));
        }

        // 2. Fetch Investor Profile Data
        const { data: investorProfile, error: investorError } = await supabase
            // ⭐ UPDATED: Fetch name and email from investor_profiles
            .from('investor_profiles')
            .select('*, is_approved, name, email')
            .eq('user_id', currentUser.id)
            .single();

        if (investorProfile && !investorError) {
            setHasExistingProfile(true);
            setIsApproved(investorProfile.is_approved);
            setStep(0); // Show Status Card

            // Pre-fill all specific form fields, prioritizing data from investor_profiles
            setFormData((prev) => ({
                ...prev,
                // ⭐ UPDATED: Use name and email from investor_profiles if present, otherwise fall back.
                fullName: investorProfile.name || prev.fullName,
                email: investorProfile.email || currentUser.email!,

                phone: investorProfile.phone || '',
                linkedin: investorProfile.linkedin || '',
                investmentAmount: investorProfile.investment_amount || '',
                investmentType: investorProfile.investment_type || '',
                experience: investorProfile.experience || '',
                interests: (investorProfile.interests || []) as string[],
                reference: investorProfile.reference && ["Kishan Verma", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar"].includes(investorProfile.reference) ? investorProfile.reference : (investorProfile.reference ? "Other" : ""),
                referenceOther: investorProfile.reference && !["Kishan Verma", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar"].includes(investorProfile.reference) ? investorProfile.reference : "",
            }));
        } else {
            setHasExistingProfile(false);
            setStep(1); // Show new form
        }
        setLoadingData(false);
    }, []);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session }, } = await supabase.auth.getSession()
            setSession(session)
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (currentUser) {
                if (!currentUser.email_confirmed_at) {
                    setNeedsVerification(true);
                } else {
                    setNeedsVerification(false);
                    await fetchUserData(currentUser);
                }
            }
            setLoadingSession(false);
        }

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                const currentUser = newSession?.user ?? null;
                setSession(newSession);
                setUser(currentUser);

                if (event === "SIGNED_IN") {
                    if (currentUser?.email_confirmed_at) {
                        setNeedsVerification(false);
                        setShowAuthPopup(false);
                        fetchUserData(currentUser);
                    } else {
                        setNeedsVerification(true);
                        setShowAuthPopup(false);
                    }
                } else if (event === "SIGNED_OUT") {
                    setNeedsVerification(false);
                    setUserRole(null);
                    setHasExistingProfile(false);
                    setIsApproved(false); // Reset approval
                    setStep(1); // Reset step
                    setFormData({
                        fullName: "", phone: "", email: "", linkedin: "",
                        investmentAmount: "", investmentType: "", experience: "", interests: [],
                        reference: "", referenceOther: "",
                    });
                }
            },
        )

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [fetchUserData])


    const t = useMemo(() => {
        const translations = {
            en: {
                title: "Investor Registration",
                subtitle: "Join our network of visionary investors",
                personalInfo: "Personal Information",
                investmentDetails: "Investment Details",
                fullName: "Full Name",
                phone: "Phone Number",
                email: "Email Address",
                linkedin: "LinkedIn Profile",
                investmentAmount: "Investment Amount",
                investorType: "Investor Type",
                experience: "Investment Experience",
                areas: "Areas of Interest",
                back: "Back",
                next: "Next",
                submit: "Submit Application",
                update: "Update Profile",
                required: "Required",
                loginRequired: "Login Required",
                loginRequiredDesc: "Please login or sign up to access the investor registration form.",
                login: "Login / Sign Up",
                roleMismatch: "Access Denied",
                roleMismatchDesc: "Your account is registered as a Founder. Please login with an Investor account to access this form.",
                placeholder: {
                    name: "Enter your full name",
                    phone: "Enter your phone number",
                    email: "Enter your email",
                    linkedin: "https://linkedin.com/in/yourprofile",
                },
                interests: ["Technology", "Healthcare", "FinTech", "E-commerce", "SaaS", "EdTech"],
                ranges: [
                    "AED 50,000 - 100,000",
                    "AED 100,000 - 500,000",
                    "AED 500,000 - 1,000,000",
                    "AED 1,000,000 - 5,000,000",
                    "AED 5,000,000+",
                ],
                types: ["Angel Investor", "Venture Capital", "Institutional", "Family Office"],
                levels: ["Beginner (0-2 years)", "Intermediate (2-5 years)", "Experienced (5-10 years)", "Expert (10+ years)"],
                whatNext: "What happens next?",
                nextDesc: "Our investment team will review your application and contact you within 48 hours.",
                status: {
                    title: "Profile Status",
                    pending: "Profile Pending Review",
                    approved: "Profile Approved",
                    notApprovedDesc: "Your profile is under review by our team. You can edit your details until it is approved.",
                    approvedDesc: "Your investor profile is approved. You now have full access to our platform features.",
                    viewDetails: "Your Profile Details (Read-Only)",
                },
            },
            ar: {
                title: "تسجيل المستثمر",
                subtitle: "انضم إلى شبكتنا من المستثمرين الرائدين",
                personalInfo: "المعلومات الشخصية",
                investmentDetails: "تفاصيل الاستثمار",
                fullName: "الاسم الكامل",
                phone: "رقم الهاتف",
                email: "عنوان البريد الإلكتروني",
                linkedin: "ملف LinkedIn",
                investmentAmount: "مبلغ الاستثمار",
                investorType: "نوع المستثمر",
                experience: "خبرة الاستثمار",
                areas: "مجالات الاهتمام",
                back: "رجوع",
                next: "التالي",
                submit: "إرسال الطلب",
                update: "تحديث الملف الشخصي",
                required: "مطلوب",
                loginRequired: "تسجيل الدخول مطلوب",
                loginRequiredDesc: "يرجى تسجيل الدخول أو إنشاء حساب للوصول إلى نموذج تسجيل المستثمر.",
                login: "تسجيل الدخول / إنشاء حساب",
                roleMismatch: "تم رفض الوصول",
                roleMismatchDesc: "حسابك مسجل كمؤسس. يرجى تسجيل الدخول بحساب مستثمر للوصول إلى هذا النموذج.",
                placeholder: {
                    name: "أدخل اسمك الكامل",
                    phone: "أدخل رقم هاتفك",
                    email: "أدخل بريدك الإلكتروني",
                    linkedin: "https://linkedin.com/in/yourprofile",
                },
                interests: ["التكنولوجيا", "الصحة", "التكنولوجيا المالية", "التجارة الإلكترونية", "SaaS", "التعليم"],
                ranges: [
                    "50,000 - 100,000 درهم",
                    "100,000 - 500,000 درهم",
                    "500,000 - 1,000,000 درهم",
                    "1,000,000 - 5,000,000 درهم",
                    "5,000,000 درهم وأكثر",
                ],
                types: ["ملاك/مستثمرون ملائكة", "رأس مال استثماري", "مؤسسي", "مكتب عائلي"],
                levels: ["مبتدئ (0-2 سنة)", "متوسط (2-5 سنوات)", "ذو خبرة (5-10 سنوات)", "خبير (10+ سنوات)"],
                whatNext: "ماذا بعد ذلك؟",
                nextDesc: "سيراجع فريق الاستثمار لدينا طلبك والاتصال بك في غضون 48 ساعة.",
                status: {
                    title: "حالة الملف الشخصي",
                    pending: "الملف الشخصي قيد المراجعة",
                    approved: "تمت الموافقة على الملف الشخصي",
                    notApprovedDesc: "ملفك الشخصي قيد المراجعة من قبل فريقنا. يمكنك تعديل التفاصيل الخاصة بك حتى تتم الموافقة عليها.",
                    approvedDesc: "تمت الموافقة على ملفك الاستثماري. لديك الآن حق الوصول الكامل إلى ميزات المنصة.",
                    viewDetails: "تفاصيل ملفك الشخصي (للقراءة فقط)",
                },
                reference: "مرجع",
                referenceOther: "يرجى تحديد المرجع",
                referenceOptions: ["كيشان فيرما", "سانجاي بهاماري", "فريد أحمد", "عبد المجيد", "أيديا باز", "ماروادي كاتاليست", "رهبار", "أخرى"],
            },
        };
        // Override options for consistent value mapping if needed, but for now we use English values for logic
        const referenceOptions = ["Kishan Verma", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar", "Other"];

        return {
            ...translations[language],
            referenceOptions: referenceOptions
        } as Translations;
    }, [language]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // ⭐ FIX 1: Create a dedicated handler for checkbox changes
    const handleCheckboxChange = (interest: string, isChecked: boolean) => {
        if (isApproved) return; // Don't allow changes if approved

        setFormData((prev: InvestorFormData) => {
            const currentInterests = prev.interests || [];
            if (isChecked) {
                // Add interest if it's not already there
                if (!currentInterests.includes(interest)) {
                    return { ...prev, interests: [...currentInterests, interest] };
                }
            } else {
                // Remove interest
                return { ...prev, interests: currentInterests.filter((i: string) => i !== interest) };
            }
            return prev; // Return previous state if no change
        });
    };

    const handleNext = () => {
        if (!formData.fullName || !formData.phone || !formData.email) {
            alert("Please fill in all required personal information fields.")
            return
        }
        if (!formData.reference) {
            alert("Reference is required.")
            return
        }
        if (step < 2) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleDataSubmission = async () => {
        if (!user) return alert("Authentication error: User not logged in.");
        if (isApproved) return; // Safety check

        // Create submission object *without* is_approved
        const profileData: Omit<InvestorProfileData, 'is_approved'> = {
            phone: formData.phone,
            linkedin: formData.linkedin,
            investment_amount: formData.investmentAmount,
            investment_type: formData.investmentType,
            experience: formData.experience,
            interests: formData.interests,
            // ⭐ NEW: Save name and email to the investor_profiles table
            name: formData.fullName,
            email: formData.email,
            reference: formData.reference === "Other" ? formData.referenceOther : formData.reference,
        };

        let error;

        if (hasExistingProfile) {
            // Update existing profile (RLS will block if is_approved = true)
            const result = await supabase
                .from('investor_profiles')
                .update(profileData)
                .eq('user_id', user.id)
                .select();
            error = result.error;
        } else {
            // Insert new profile
            const result = await supabase
                .from('investor_profiles')
                .insert({
                    user_id: user.id,
                    ...profileData,
                    is_approved: false // Explicitly set to false on creation
                })
                .select();
            error = result.error;
        }

        if (error) {
            console.error("Supabase submission error:", error);
            alert(`Error submitting data: ${error.message}`);
        } else {
            alert(hasExistingProfile ? "Profile updated successfully!" : "Application submitted successfully!");
            setHasExistingProfile(true);
            setStep(0); // Return to status view
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            alert("You must be logged in to submit the form.")
            setShowAuthPopup(true)
            return
        }
        handleDataSubmission();
    }

    const isUserLoggedInAndVerified = user && user.email_confirmed_at

    const renderContent = () => {
        if (loadingSession || loadingData) {
            return (
                <div className="text-center py-20 text-slate-600 text-xl font-medium animate-pulse">
                    Loading user session and profile...
                </div>
            )
        }

        if (!isUserLoggedInAndVerified && needsVerification) {
            return <EmailVerificationNotice language={language} />
        }

        if (!isUserLoggedInAndVerified) {
            return (
                <div className="max-w-xl mx-auto mt-16 p-8 text-center bg-red-50 border-2 border-[#740001]/20 rounded-xl shadow-lg animate-fadeIn">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.loginRequired}</h2>
                    <p className="text-slate-700 mb-6">{t.loginRequiredDesc}</p>
                    <button
                        onClick={() => setShowAuthPopup(true)}
                        className="px-8 py-3 bg-[#740001] text-white rounded-lg font-semibold hover:bg-[#940200] transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
                    >
                        <LogIn className="w-5 h-5" /> {t.login}
                    </button>
                </div>
            )
        }

        // --- Render logic based on step ---

        // Show Status Card
        if (hasExistingProfile && step === 0) {
            return (
                <InvestorStatusView
                    t={t}
                    isApproved={isApproved}
                    formData={formData}
                    setStep={setStep}
                    canEdit={!isApproved}
                />
            );
        }

        // Show Form (Steps 1 or 2)
        if (step === 1 || step === 2) {
            return (
                <InvestorFormView
                    t={t}
                    step={step}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleCheckboxChange={handleCheckboxChange}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                    hasExistingProfile={hasExistingProfile}
                    isApproved={isApproved}
                />
            );
        }

        // Fallback
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

            <main className="flex-1 pt-32 pb-20 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header Section (Title remains the same) */}
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

// 1. Form View Component
interface InvestorFormViewProps {
    t: Translations;
    step: number;
    formData: InvestorFormData; // Use specific type
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleCheckboxChange: (interest: string, isChecked: boolean) => void;
    handleNext: () => void;
    handleBack: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    hasExistingProfile: boolean;
    isApproved: boolean;
}

const InvestorFormView: React.FC<InvestorFormViewProps> = ({
    t,
    step,
    formData,
    handleInputChange,
    handleCheckboxChange,
    handleNext,
    handleBack,
    handleSubmit,
    hasExistingProfile,
    isApproved
}) => {
    return (
        <>
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-6 md:gap-8 mb-12 animate-slideInDown">
                {[1, 2].map((stepNum) => (
                    <div key={stepNum} className="flex items-center">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= stepNum ? "bg-[#740001] text-white shadow-lg" : "bg-slate-200 text-slate-500"
                                }`}
                        >
                            {step > stepNum ? <CheckCircle2 className="w-6 h-6" /> : stepNum}
                        </div>
                        {stepNum < 2 && (
                            <div className={`h-1 w-12 md:w-20 transition-all ${step >= 2 ? "bg-[#740001]" : "bg-slate-200"}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Form Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-10 animate-slideInUp">
                <p className={`text-sm mb-8 ${hasExistingProfile ? 'text-green-600' : 'text-slate-600'}`}>
                    {hasExistingProfile ?
                        <span className="font-semibold flex items-center gap-1"><Edit className="w-4 h-4" /> Editing existing profile.</span> :
                        "Please fill out both steps to complete your registration."}
                </p>
                <form onSubmit={handleSubmit}>
                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="space-y-6 animate-slideInUp">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.personalInfo}</h2>

                            {[
                                // ⭐ FIXED: Full Name is now editable (disabled only if isApproved)
                                { label: t.fullName, name: "fullName", type: "text", placeholder: t.placeholder.name, required: true, disabled: isApproved },
                                { label: t.phone, name: "phone", type: "tel", placeholder: t.placeholder.phone, required: true, disabled: isApproved },
                                // Email remains disabled as it's the core login identity
                                { label: t.email, name: "email", type: "email", placeholder: t.placeholder.email, required: true, disabled: isApproved },
                                { label: t.linkedin, name: "linkedin", type: "url", placeholder: t.placeholder.linkedin, required: false, disabled: isApproved },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        // Use field.disabled to handle Email lock, and isApproved for others
                                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors ${field.disabled ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        required={field.required}
                                        disabled={field.disabled}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.reference} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="reference"
                                    value={formData.reference}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    disabled={isApproved}
                                    required
                                >
                                    <option value="">Select Reference</option>
                                    {t.referenceOptions.map((opt: string) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            {formData.reference === "Other" && (
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        {t.referenceOther} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="referenceOther"
                                        value={formData.referenceOther}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        required
                                        disabled={isApproved}
                                    />
                                </div>
                            )}

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
                                    className="flex-1 px-6 py-3 bg-[#740001] text-white rounded-lg font-semibold hover:bg-[#940200] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    disabled={isApproved} // Disable next if approved
                                >
                                    {t.next} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-6 animate-slideInUp">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.investmentDetails}</h2>

                            {[
                                { label: t.investmentAmount, name: "investmentAmount", options: t.ranges },
                                { label: t.investorType, name: "investmentType", options: t.types },
                                { label: t.experience, name: "experience", options: t.levels },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        {field.label} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name={field.name}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        required
                                        disabled={isApproved}
                                    >
                                        <option value="">Select option</option>
                                        {field.options.map((opt: string) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-3">
                                    {t.areas} <span className="text-red-500">*</span>
                                </label>
                                <div className={`grid grid-cols-2 gap-3 ${isApproved ? 'opacity-70 pointer-events-none' : ''}`}>
                                    {t.interests.map((interest: string) => (
                                        <label
                                            key={interest}
                                            className="flex items-center gap-2 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.interests.includes(interest)}
                                                onChange={(e) => handleCheckboxChange(interest, e.target.checked)}
                                                className="w-4 h-4 accent-[#740001] cursor-pointer"
                                                disabled={isApproved}
                                            />
                                            <span className="text-sm text-slate-900 font-medium">{interest}</span>
                                        </label>
                                    ))}
                                </div>
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
                                    className="flex-1 px-6 py-3 bg-[#740001] text-white rounded-lg font-semibold hover:bg-[#940200] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    disabled={isApproved} // Disable submit if approved
                                >
                                    {hasExistingProfile ? t.update : t.submit} {hasExistingProfile && <Save className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Info Box */}
            <div
                className="mt-8 bg-black/5 border-2 border-[#740001]/20 rounded-xl p-6 animate-slideInUp"
                style={{ animationDelay: "200ms" }}
            >
                <p className="font-semibold text-slate-900 mb-2">{t.whatNext}</p>
                <p className="text-slate-600">{t.nextDesc}</p>
            </div>
        </>
    );
};

// 2. Status View Component (Showed after submission)
interface InvestorStatusViewProps {
    t: Translations;
    isApproved: boolean;
    formData: InvestorFormData; // Use specific type
    setStep: Dispatch<SetStateAction<number>>;
    canEdit: boolean;
}

const InvestorStatusView: React.FC<InvestorStatusViewProps> = ({ t, isApproved, formData, setStep, canEdit }) => {
    const statusColor = isApproved ? "bg-green-50 border-green-300 text-green-700" : "bg-yellow-50 border-yellow-300 text-yellow-700";
    const statusIcon = isApproved ? <CheckCircle2 className="w-8 h-8" /> : <TrendingUp className="w-8 h-8" />;
    const statusTitle = isApproved ? t.status.approved : t.status.pending;
    const statusDesc = isApproved ? t.status.approvedDesc : t.status.notApprovedDesc;

    const readOnlyFields = [
        { label: t.fullName, value: formData.fullName },
        { label: t.email, value: formData.email },
        { label: t.phone, value: formData.phone },
        { label: t.linkedin, value: formData.linkedin, link: true },
        { label: t.investmentAmount, value: formData.investmentAmount },
        { label: t.investorType, value: formData.investmentType },
        { label: t.experience, value: formData.experience },
        { label: t.areas, value: formData.interests.join(', ') },
        { label: t.reference, value: formData.reference === "Other" ? formData.referenceOther : formData.reference },
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
                    <h3 className="text-2xl font-bold text-slate-900">{isApproved ? t.status.viewDetails : "Your Profile"}</h3>
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
                            <Lock className="w-4 h-4" /> Profile Locked
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
                                    href={field.value && field.value.startsWith('http') ? field.value : `https://${field.value}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#740001] hover:underline break-words"
                                >
                                    <LinkIcon className="w-4 h-4 inline-block mr-1" />
                                    {field.value}
                                </a>
                            ) : (
                                <p className="text-slate-900 font-medium">{field.value}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};