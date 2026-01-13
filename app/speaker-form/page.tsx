// app/speaker-form/page.tsx
"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { Session, User as SupabaseUser } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthPopup from "@/components/AuthPopup"
import EmailVerificationNotice from "@/components/EmailVerificationNotice"
import { ArrowRight, CheckCircle2, LogIn, Edit, Save, Lock, TrendingUp, Link as LinkIcon, Upload, User, Mic } from "lucide-react"
import { supabase } from "@/lib/supabaseConfig"

// Define the type for the specific profile data fetched from the database
interface SpeakerProfileData {
    phone: string;
    linkedin: string;
    job_title: string;
    company: string;
    speaker_bio: string;
    topic_title: string;
    topic_abstract: string;
    profile_photo_url: string | null;
    is_approved: boolean;
    // ⭐ NEW: Added name and email from the SQL table
    name: string | null;
    email: string | null;
    reference: string | null;
}

// Define the type for the form's state
interface SpeakerFormData {
    fullName: string;
    phone: string;
    email: string;
    linkedin: string;
    jobTitle: string;
    company: string;
    speakerBio: string;
    topicTitle: string;
    topicAbstract: string;
    profilePhoto: File | null;
    profilePhotoUrl: string | null;
    reference: string;
    referenceOther: string;
}

// Define a type for the structure returned by the translations useMemo hook
type Translations = {
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    fullName: string;
    phone: string;
    email: string;
    linkedin: string;
    jobTitle: string;
    company: string;
    speakerBio: string;
    topicTitle: string;
    topicAbstract: string;
    headshot: string;
    headshotHint: string;
    uploadFile: string;
    back: string;
    next: string;
    submit: string;
    update: string;
    required: string;
    loginRequired: string;
    loginRequiredDesc: string;
    login: string;
    placeholder: {
        name: string;
        phone: string;
        email: string;
        linkedin: string;
        jobTitle: string;
        company: string;
        bio: string;
        topicTitle: string;
        topicAbstract: string;
    };
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
    validation: {
        step1: string;
        headshot: string;
    };
    reference: string;
    referenceOther: string;
    referenceOptions: string[];
};

export default function SpeakerFormPage() {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const [loadingSession, setLoadingSession] = useState(true)
    const [loadingData, setLoadingData] = useState(false)
    const [showAuthPopup, setShowAuthPopup] = useState(false)
    const [needsVerification, setNeedsVerification] = useState(false)
    const [hasExistingProfile, setHasExistingProfile] = useState(false)
    const [isApproved, setIsApproved] = useState(false)

    const [step, setStep] = useState(1) // 1 = form step 1, 2 = form step 2, 0 = status card
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const [formData, setFormData] = useState<SpeakerFormData>({
        fullName: "",
        phone: "",
        email: "",
        linkedin: "",
        jobTitle: "",
        company: "",
        speakerBio: "",
        topicTitle: "",
        topicAbstract: "",
        profilePhoto: null,
        profilePhotoUrl: null,
        reference: "",
        referenceOther: "",
    })

    // --- Supabase Session and Role Management ---
    const fetchUserData = useCallback(async (currentUser: SupabaseUser) => {
        setLoadingData(true);
        // 1. Fetch Full Name from profiles (used as initial default)
        const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', currentUser.id)
            .single();

        // Set initial defaults from auth and profiles table
        setFormData((prev) => ({
            ...prev,
            fullName: profileData?.full_name || prev.fullName,
            email: currentUser.email!,
        }));

        // 2. Fetch Speaker Profile Data
        const { data: speakerProfile } = await supabase
            .from('speaker_profiles')
            // ⭐ UPDATED: Fetch name and email from speaker_profiles
            .select('*, name, email')
            .eq('user_id', currentUser.id)
            .single();

        if (speakerProfile) {
            setHasExistingProfile(true);
            setIsApproved(speakerProfile.is_approved);
            setStep(0); // Show Status Card

            // Pre-fill all specific form fields, prioritizing saved data
            setFormData((prev) => ({
                ...prev,
                // ⭐ UPDATED: Use name and email from speaker_profiles if available
                fullName: speakerProfile.name || prev.fullName,
                email: speakerProfile.email || currentUser.email!,

                phone: speakerProfile.phone || '',
                linkedin: speakerProfile.linkedin || '',
                jobTitle: speakerProfile.job_title || '',
                company: speakerProfile.company || '',
                speakerBio: speakerProfile.speaker_bio || '',
                topicTitle: speakerProfile.topic_title || '',
                topicAbstract: speakerProfile.topic_abstract || '',
                profilePhotoUrl: speakerProfile.profile_photo_url,
                reference: speakerProfile.reference && ["Kishan Verma", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar"].includes(speakerProfile.reference) ? speakerProfile.reference : (speakerProfile.reference ? "Other" : ""),
                referenceOther: speakerProfile.reference && !["Kishan Verma", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar"].includes(speakerProfile.reference) ? speakerProfile.reference : "",
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

                if (event === "SIGNED_IN" && currentUser?.email_confirmed_at) {
                    setNeedsVerification(false);
                    setShowAuthPopup(false);
                    fetchUserData(currentUser);
                } else if (event === "SIGNED_OUT") {
                    setNeedsVerification(false);
                    setHasExistingProfile(false);
                    setIsApproved(false);
                    setStep(1);
                    setFormData({
                        fullName: "", phone: "", email: "", linkedin: "",
                        jobTitle: "", company: "", speakerBio: "",
                        topicTitle: "", topicAbstract: "",
                        profilePhoto: null, profilePhotoUrl: null,
                        reference: "", referenceOther: "",
                    });
                }
            },
        )
        return () => authListener.subscription.unsubscribe();
    }, [fetchUserData])

    // --- Translations ---
    const t = useMemo(() => {
        const translations = {
            en: {
                title: "Speaker Registration",
                subtitle: "Share your expertise with our audience",
                step1Title: "Personal Details",
                step2Title: "Session Proposal",
                fullName: "Full Name",
                phone: "Phone Number",
                email: "Email Address",
                linkedin: "LinkedIn Profile",
                jobTitle: "Job Title",
                company: "Company",
                speakerBio: "Speaker Bio (Max 150 words)",
                topicTitle: "Session/Topic Title",
                topicAbstract: "Session Abstract (Max 250 words)",
                headshot: "Professional Headshot",
                headshotHint: "JPG or PNG, max 5MB",
                uploadFile: "Upload Headshot",
                back: "Back",
                next: "Next",
                submit: "Submit Application",
                update: "Update Application",
                required: "Required",
                loginRequired: "Login Required",
                loginRequiredDesc: "Please login or sign up to apply as a speaker.",
                login: "Login / Sign Up",
                placeholder: {
                    name: "Enter your full name",
                    phone: "Enter your phone number",
                    email: "Enter your email",
                    linkedin: "https://linkedin.com/in/yourprofile",
                    jobTitle: "e.g., CEO, Founder, Senior Developer",
                    company: "e.g., Investarise",
                    bio: "A brief bio about your expertise...",
                    topicTitle: "e.g., The Future of FinTech in Dubai",
                    topicAbstract: "A summary of what your talk will cover...",
                },
                whatNext: "What happens next?",
                nextDesc: "Our curation team will review your proposal. If it's a good fit, we will contact you.",
                status: {
                    title: "Profile Status",
                    pending: "Application Pending Review",
                    approved: "Application Approved",
                    notApprovedDesc: "Your application is under review by our team. You can edit your details until it is approved.",
                    approvedDesc: "Your speaker application is approved! We will be in touch with the next steps.",
                    viewDetails: "Your Application Details (Read-Only)",
                },
                validation: {
                    step1: "Please fill in all required personal information fields.",
                    headshot: "A headshot is required to submit.",
                },
                reference: "Reference",
                referenceOther: "Please specify reference",
                referenceOptions: ["Kishan Verma", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar", "Other"],
            },
            ar: {
                title: "تسجيل المتحدثين",
                subtitle: "شارك خبرتك مع جمهورنا",
                step1Title: "التفاصيل الشخصية",
                step2Title: "مقترح الجلسة",
                fullName: "الاسم الكامل",
                phone: "رقم الهاتف",
                email: "عنوان البريد الإلكتروني",
                linkedin: "ملف LinkedIn",
                jobTitle: "المسمى الوظيفي",
                company: "الشركة",
                speakerBio: "السيرة الذاتية للمتحدث (بحد أقصى 150 كلمة)",
                topicTitle: "عنوان الجلسة / الموضوع",
                topicAbstract: "ملخص الجلسة (بحد أقصى 250 كلمة)",
                headshot: "صورة شخصية احترافية",
                headshotHint: "JPG أو PNG، بحد أقصى 5 ميجابايت",
                uploadFile: "تحميل الصورة الشخصية",
                back: "رجوع",
                next: "التالي",
                submit: "إرسال الطلب",
                update: "تحديث الطلب",
                required: "مطلوب",
                loginRequired: "تسجيل الدخول مطلوب",
                loginRequiredDesc: "يرجى تسجيل الدخول أو إنشاء حساب للتقديم كمتحدث.",
                login: "تسجيل الدخول / إنشاء حساب",
                placeholder: {
                    name: "أدخل اسمك الكامل",
                    phone: "أدخل رقم هاتفك",
                    email: "أدخل بريدك الإلكتروني",
                    linkedin: "https://linkedin.com/in/yourprofile",
                    jobTitle: "مثل: الرئيس التنفيذي، مؤسس، مطور أول",
                    company: "مثل: Investarise",
                    bio: "سيرة ذاتية مختصرة عن خبرتك...",
                    topicTitle: "مثل: مستقبل التكنولوجيا المالية في دبي",
                    topicAbstract: "ملخص لما ستتناوله جلستك...",
                },
                whatNext: "ماذا بعد ذلك؟",
                nextDesc: "سيقوم فريقنا بمراجعة مقترحك. إذا كان مناسبًا، سنتواصل معك.",
                status: {
                    title: "حالة الملف الشخصي",
                    pending: "الطلب قيد المراجعة",
                    approved: "تمت الموافقة على الطلب",
                    notApprovedDesc: "طلبك قيد المراجعة من قبل فريقنا. يمكنك تعديل التفاصيل الخاصة بك حتى تتم الموافقة عليه.",
                    approvedDesc: "تمت الموافقة على طلبك كمتحدث! سنتواصل معك لإبلاغك بالخطوات التالية.",
                    viewDetails: "تفاصيل طلبك (للقراءة فقط)",
                },
                validation: {
                    step1: "يرجى ملء جميع حقول المعلومات الشخصية المطلوبة.",
                    headshot: "الصورة الشخصية مطلوبة للإرسال.",
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

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profilePhoto: file,
            }))
        }
    }

    const handleNext = () => {
        if (!formData.fullName || !formData.phone || !formData.jobTitle || !formData.company) {
            alert(t.validation.step1)
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

    const uploadFile = async (file: File, userId: string, bucket: string) => {
        const fileExt = file.name.split('.').pop();
        const filePath = `${userId}/${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (error) throw error;

        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleDataSubmission = async () => {
        if (!user) return alert("Authentication error.");
        if (isApproved) return;
        setLoadingData(true);

        let finalPhotoUrl = formData.profilePhotoUrl;

        try {
            if (formData.profilePhoto) {
                finalPhotoUrl = await uploadFile(formData.profilePhoto, user.id, 'headshots');
            } else if (!finalPhotoUrl) {
                throw new Error(t.validation.headshot);
            }

            const profileData: Omit<SpeakerProfileData, 'is_approved'> = {
                phone: formData.phone,
                linkedin: formData.linkedin,
                job_title: formData.jobTitle,
                company: formData.company,
                speaker_bio: formData.speakerBio,
                topic_title: formData.topicTitle,
                topic_abstract: formData.topicAbstract,
                profile_photo_url: finalPhotoUrl,
                // ⭐ NEW: Save name and email to the speaker_profiles table
                name: formData.fullName,
                email: formData.email,
                reference: formData.reference === "Other" ? formData.referenceOther : formData.reference,
            };

            let error;
            if (hasExistingProfile) {
                const result = await supabase
                    .from('speaker_profiles')
                    .update(profileData)
                    .eq('user_id', user.id);
                error = result.error;
            } else {
                const result = await supabase
                    .from('speaker_profiles')
                    .insert({ user_id: user.id, ...profileData, is_approved: false });
                error = result.error;
            }

            if (error) throw error;

            alert(hasExistingProfile ? "Application updated!" : "Application submitted!");
            setHasExistingProfile(true);
            setFormData(prev => ({ ...prev, profilePhotoUrl: finalPhotoUrl }));
            setStep(0);
        } catch (err: any) {
            alert(`Error: ${err.message}`);
            console.error("Submission error:", err);
        } finally {
            setLoadingData(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return setShowAuthPopup(true);
        handleDataSubmission();
    }

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
            );
        }

        if (hasExistingProfile && step === 0) {
            return (
                <SpeakerStatusView
                    t={t}
                    isApproved={isApproved}
                    formData={formData}
                    setStep={setStep}
                    canEdit={!isApproved}
                />
            );
        }

        if (step === 1 || step === 2) {
            return (
                <SpeakerFormView
                    t={t}
                    step={step}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFileUpload={handleFileUpload}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSubmit={handleSubmit}
                    hasExistingProfile={hasExistingProfile}
                    isApproved={isApproved}
                />
            );
        }

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

// --- Helper Components ---

interface SpeakerFormViewProps {
    t: Translations;
    step: number;
    formData: SpeakerFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext: () => void;
    handleBack: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    hasExistingProfile: boolean;
    isApproved: boolean;
}

const SpeakerFormView: React.FC<SpeakerFormViewProps> = ({
    t, step, formData, handleInputChange, handleFileUpload,
    handleNext, handleBack, handleSubmit, hasExistingProfile, isApproved
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

            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-10 animate-slideInUp">
                <form onSubmit={handleSubmit}>
                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="space-y-6 animate-slideInUp">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.step1Title}</h2>

                            {[
                                // ⭐ FIXED: Full Name is now editable if not approved
                                { label: t.fullName, name: "fullName", type: "text", placeholder: t.placeholder.name, required: true, disabled: isApproved },
                                { label: t.email, name: "email", type: "email", placeholder: t.placeholder.email, required: true, disabled: isApproved },
                                { label: t.phone, name: "phone", type: "tel", placeholder: t.placeholder.phone, required: true, disabled: isApproved },
                                { label: t.linkedin, name: "linkedin", type: "url", placeholder: t.placeholder.linkedin, required: false, disabled: isApproved },
                                { label: t.jobTitle, name: "jobTitle", type: "text", placeholder: t.placeholder.jobTitle, required: true, disabled: isApproved },
                                { label: t.company, name: "company", type: "text", placeholder: t.placeholder.company, required: true, disabled: isApproved },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof SpeakerFormData] as string}
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

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.speakerBio} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="speakerBio"
                                    value={formData.speakerBio}
                                    onChange={handleInputChange}
                                    placeholder={t.placeholder.bio}
                                    rows={3}
                                    maxLength={150}
                                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors resize-none ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    required
                                    disabled={isApproved}
                                />
                                <p className="text-xs text-slate-500 mt-1">{formData.speakerBio.length}/150</p>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="button" disabled className="flex-1 px-6 py-3 bg-slate-100 text-slate-400 rounded-lg font-semibold cursor-not-allowed">
                                    {t.back}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex-1 px-6 py-3 bg-[#740001] text-white rounded-lg font-semibold hover:bg-[#940200] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    disabled={isApproved}
                                >
                                    {t.next} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-6 animate-slideInUp">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.step2Title}</h2>

                            {[
                                { label: t.topicTitle, name: "topicTitle", type: "text", placeholder: t.placeholder.topicTitle, required: true },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name as keyof SpeakerFormData] as string}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                        required={field.required}
                                        disabled={isApproved}
                                    />
                                </div>
                            ))}

                            {/* Topic Abstract */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.topicAbstract} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="topicAbstract"
                                    value={formData.topicAbstract}
                                    onChange={handleInputChange}
                                    placeholder={t.placeholder.topicAbstract}
                                    rows={5}
                                    maxLength={250}
                                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors resize-none ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                                    required
                                    disabled={isApproved}
                                />
                                <p className="text-xs text-slate-500 mt-1">{formData.topicAbstract.length}/250</p>
                            </div>

                            {/* Headshot Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                    {t.headshot} {formData.profilePhotoUrl ? "(Optional Update)" : <span className="text-red-500">*</span>}
                                </label>
                                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${isApproved ? 'border-slate-200 bg-slate-50' : 'border-slate-300 hover:border-[#740001] hover:bg-slate-50 cursor-pointer'}`}>
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        accept="image/png, image/jpeg"
                                        className="hidden"
                                        id="photo-upload"
                                        required={!formData.profilePhotoUrl}
                                        disabled={isApproved}
                                    />
                                    <label htmlFor="photo-upload" className={`cursor-pointer block ${isApproved ? 'cursor-not-allowed' : ''}`}>
                                        <User className="w-8 h-8 text-[#740001] mx-auto mb-2" />
                                        {formData.profilePhoto ? (
                                            <p className="text-sm font-semibold text-slate-900">{formData.profilePhoto.name}</p>
                                        ) : formData.profilePhotoUrl ? (
                                            <p className="text-sm font-semibold text-green-600">Headshot uploaded. Click to replace.</p>
                                        ) : (
                                            <>
                                                <p className="text-sm font-semibold text-slate-900 mb-1">{t.uploadFile}</p>
                                                <p className="text-xs text-slate-500">{t.headshotHint}</p>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 px-6 py-3 bg-slate-100 text-slate-900 rounded-lg font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                                    disabled={isApproved}
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" /> {t.back}
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-[#740001] text-white rounded-lg font-semibold hover:bg-[#940200] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    disabled={isApproved}
                                >
                                    {hasExistingProfile ? t.update : t.submit} {hasExistingProfile && <Save className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>

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

interface SpeakerStatusViewProps {
    t: Translations;
    isApproved: boolean;
    formData: SpeakerFormData;
    setStep: Dispatch<SetStateAction<number>>;
    canEdit: boolean;
}

const SpeakerStatusView: React.FC<SpeakerStatusViewProps> = ({ t, isApproved, formData, setStep, canEdit }) => {
    const statusColor = isApproved ? "bg-green-50 border-green-300 text-green-700" : "bg-yellow-50 border-yellow-300 text-yellow-700";
    const statusIcon = isApproved ? <CheckCircle2 className="w-8 h-8" /> : <TrendingUp className="w-8 h-8" />;
    const statusTitle = isApproved ? t.status.approved : t.status.pending;
    const statusDesc = isApproved ? t.status.approvedDesc : t.status.notApprovedDesc;

    const readOnlyFields = [
        { label: t.fullName, value: formData.fullName },
        { label: t.email, value: formData.email },
        { label: t.phone, value: formData.phone },
        { label: t.jobTitle, value: formData.jobTitle },
        { label: t.company, value: formData.company },
        { label: t.linkedin, value: formData.linkedin, link: true },
        { label: t.topicTitle, value: formData.topicTitle },
        { label: t.reference, value: formData.reference === "Other" ? formData.referenceOther : formData.reference },
    ];

    return (
        <div className="space-y-8">
            <div className={`p-8 rounded-xl shadow-lg flex items-start gap-4 ${statusColor}`}>
                {statusIcon}
                <div>
                    <h2 className="text-2xl font-bold mb-2">{t.status.title}</h2>
                    <h3 className="text-xl font-semibold mb-2">{statusTitle}</h3>
                    <p className="text-sm">{statusDesc}</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">{t.status.viewDetails}</h3>
                    {canEdit && (
                        <button
                            onClick={() => setStep(1)}
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

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <p className="font-semibold text-slate-500 mb-1 text-sm">{t.headshot}:</p>
                        <img
                            src={formData.profilePhotoUrl || '/default-avatar.png'}
                            alt="Speaker Headshot"
                            className="w-32 h-32 rounded-full object-cover bg-slate-100"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm flex-1">
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
                        <div className="md:col-span-2">
                            <p className="font-semibold text-slate-500 mb-1">{t.speakerBio}:</p>
                            <p className="text-slate-900 font-medium whitespace-pre-wrap">{formData.speakerBio}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="font-semibold text-slate-500 mb-1">{t.topicAbstract}:</p>
                            <p className="text-slate-900 font-medium whitespace-pre-wrap">{formData.topicAbstract}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};