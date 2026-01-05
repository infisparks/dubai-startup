"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction, useRef } from "react"
import Link from "next/link"
import { Session, User as SupabaseUser } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthPopup from "@/components/AuthPopup"
import EmailVerificationNotice from "@/components/EmailVerificationNotice"
import { CheckCircle2, LogIn, Edit, Save, Lock, TrendingUp, Link as LinkIcon, Upload, Store, DollarSign, Download, CreditCard } from "lucide-react"
import { supabase } from "@/lib/supabaseConfig"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import html2canvas from "html2canvas"
import QRCode from "react-qr-code"

// CONSTANTS
const API_URL = "https://pay.infispark.in"; // Your deployed backend

// --- Types ---
interface ExhibitorProfileData {
    company_name: string;
    company_website: string;
    contact_phone: string;
    booth_type: string;
    company_description: string;
    company_logo_url: string | null;
    is_approved: boolean;
    email: string | null;
    contact_personname: string | null;
    reference: string | null;
    payment_status: string; // Added
}

interface ExhibitorFormData {
    companyName: string;
    companyWebsite: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    boothType: string;
    companyDescription: string;
    companyLogo: File | null;
    companyLogoUrl: string | null;
    reference: string;
    referenceOther: string;
}

type Translations = {
    title: string;
    subtitle: string;
    formTitle: string;
    companyName: string;
    companyWebsite: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    boothType: string;
    companyDescription: string;
    companyLogo: string;
    logoHint: string;
    uploadFile: string;
    submit: string;
    update: string;
    required: string;
    loginRequired: string;
    loginRequiredDesc: string;
    login: string;
    boothOptions: string[];
    placeholder: any;
    whatNext: string;
    nextDesc: string;
    status: any;
    validation: any;
    reference: string;
    referenceOther: string;
    referenceOptions: string[];
};

export default function ExhibitorFormPage() {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const [loadingSession, setLoadingSession] = useState(true)
    const [loadingData, setLoadingData] = useState(false)
    const [showAuthPopup, setShowAuthPopup] = useState(false)
    const [needsVerification, setNeedsVerification] = useState(false)
    const [hasExistingProfile, setHasExistingProfile] = useState(false)

    // Status States
    const [isApproved, setIsApproved] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<string>('unpaid')
    const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null)
    const [paidAt, setPaidAt] = useState<string | null>(null)

    const [step, setStep] = useState(1)
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const [formData, setFormData] = useState<ExhibitorFormData>({
        companyName: "", companyWebsite: "", contactName: "",
        contactEmail: "", contactPhone: "", boothType: "",
        companyDescription: "", companyLogo: null, companyLogoUrl: null,
        reference: "", referenceOther: "",
    })

    // --- Data Fetching ---
    const fetchUserData = useCallback(async (currentUser: SupabaseUser) => {
        setLoadingData(true);

        const { data: profileData } = await supabase.from('profiles').select('full_name').eq('id', currentUser.id).single();

        setFormData((prev) => ({
            ...prev,
            contactName: profileData?.full_name || prev.contactName,
            contactEmail: currentUser.email!,
        }));

        const { data: exhibitorProfile } = await supabase
            .from('exhibitor_profiles')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();

        if (exhibitorProfile) {
            setHasExistingProfile(true);
            setIsApproved(exhibitorProfile.is_approved);
            setPaymentStatus(exhibitorProfile.payment_status || 'unpaid'); // Set Payment Status
            setPaymentSessionId(exhibitorProfile.stripe_session_id || null);
            setPaidAt(exhibitorProfile.paid_at || null);
            setStep(0);

            setFormData((prev) => ({
                ...prev,
                companyName: exhibitorProfile.company_name || '',
                companyWebsite: exhibitorProfile.company_website || '',
                contactPhone: exhibitorProfile.contact_phone || '',
                boothType: exhibitorProfile.booth_type || '',
                companyDescription: exhibitorProfile.company_description || '',
                companyLogoUrl: exhibitorProfile.company_logo_url,
                contactName: exhibitorProfile.contact_personname || profileData?.full_name || '',
                contactEmail: exhibitorProfile.email || currentUser.email!,
                reference: exhibitorProfile.reference && ["Kishan Verma", "Sanjay Bhamari", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar"].includes(exhibitorProfile.reference) ? exhibitorProfile.reference : (exhibitorProfile.reference ? "Other" : ""),
                referenceOther: exhibitorProfile.reference && !["Kishan Verma", "Sanjay Bhamari", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar"].includes(exhibitorProfile.reference) ? exhibitorProfile.reference : "",
            }));
        } else {
            setHasExistingProfile(false);
            setStep(1);
        }
        setLoadingData(false);
    }, []);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session }, } = await supabase.auth.getSession()
            setSession(session)
            const currentUser = session?.user ?? null;
            setUser(currentUser);

            // Check URL for success payment
            const params = new URLSearchParams(window.location.search);
            if (params.get('success') === 'true') {
                console.log("Exhibitor Payment successful, refreshing data...");
            }

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
                    setPaymentStatus('unpaid');
                    setStep(1);
                    setFormData({
                        companyName: "", companyWebsite: "", contactName: "",
                        contactEmail: "", contactPhone: "", boothType: "",
                        companyDescription: "", companyLogo: null, companyLogoUrl: null,
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
                title: "Exhibitor Registration",
                subtitle: "Showcase your brand to key decision-makers",
                formTitle: "Exhibitor Details",
                companyName: "Company Name",
                companyWebsite: "Company Website",
                contactName: "Contact Person Name",
                contactEmail: "Contact Email",
                contactPhone: "Contact Phone",
                boothType: "Booth Type / Package",
                companyDescription: "Company Description (Max 150 words)",
                companyLogo: "Company Logo",
                logoHint: "JPG or PNG, max 5MB",
                uploadFile: "Upload Company Logo",
                submit: "Submit Application",
                update: "Update Application",
                required: "Required",
                loginRequired: "Login Required",
                loginRequiredDesc: "Please login or sign up to apply as an exhibitor.",
                login: "Login / Sign Up",
                boothOptions: ["Startup Pod (2x2m)", "Standard Shell (3x3m)", "Premium Booth (6x3m)", "Custom Build (Space only)"],
                placeholder: {
                    companyName: "Enter your company's official name",
                    companyWebsite: "https://yourcompany.com",
                    contactName: "Enter your full name",
                    contactEmail: "Enter your email",
                    contactPhone: "Enter your phone number",
                    description: "A brief overview of your company...",
                },
                whatNext: "What happens next?",
                nextDesc: "Our team will review your application and contact you regarding booth availability and payment.",
                status: {
                    title: "Application Status",
                    pending: "Application Pending Review",
                    approved: "Application Approved",
                    notApprovedDesc: "Your application is under review. You can edit your details until it is approved.",
                    approvedDesc: "Your exhibitor application is approved! Please proceed with payment to confirm your booth.",
                    viewDetails: "Your Application Details (Read-Only)",
                },
                validation: {
                    logo: "A company logo is required to submit.",
                },
                reference: "Reference",
                referenceOther: "Please specify reference",
                referenceOptions: ["Kishan Verma", "Sanjay Bhamari", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar", "Other"],
            },
            ar: {
                title: "تسجيل العارضين",
                subtitle: "اعرض علامتك التجارية أمام صناع القرار الرئيسيين",
                formTitle: "تفاصيل العارض",
                companyName: "اسم الشركة",
                companyWebsite: "موقع الشركة",
                contactName: "اسم مسؤول الاتصال",
                contactEmail: "البريد الإلكتروني للمسؤول",
                contactPhone: "هاتف مسؤول الاتصال",
                boothType: "نوع الجناح / الباقة",
                companyDescription: "وصف الشركة (بحد أقصى 150 كلمة)",
                companyLogo: "شعار الشركة",
                logoHint: "JPG أو PNG، بحد أقصى 5 ميجابايت",
                uploadFile: "تحميل شعار الشركة",
                submit: "إرسال الطلب",
                update: "تحديث الطلب",
                required: "مطلوب",
                loginRequired: "تسجيل الدخول مطلوب",
                loginRequiredDesc: "يرجى تسجيل الدخول أو إنشاء حساب للتقديم كعارض.",
                login: "تسجيل الدخول / إنشاء حساب",
                boothOptions: ["جناح شركة ناشئة (2x2م)", "جناح قياسي (3x3م)", "جناح مميز (6x3م)", "بناء مخصص (مساحة فقط)"],
                placeholder: {
                    companyName: "أدخل اسم شركتك الرسمي",
                    companyWebsite: "https://yourcompany.com",
                    contactName: "أدخل اسمك الكامل",
                    contactEmail: "أدخل بريدك الإلكتروني",
                    contactPhone: "أدخل رقم هاتفك",
                    description: "نبذة مختصرة عن شركتك...",
                },
                whatNext: "ماذا بعد ذلك؟",
                nextDesc: "سيقوم فريقنا بمراجعة طلبك والتواصل معك بخصوص توافر الجناح والدفع.",
                status: {
                    title: "حالة الطلب",
                    pending: "الطلب قيد المراجعة",
                    approved: "تمت الموافقة على الطلب",
                    notApprovedDesc: "طلبك قيد المراجعة. يمكنك تعديل التفاصيل الخاصة بك حتى تتم الموافقة عليه.",
                    approvedDesc: "تمت الموافقة على طلبك كعارض! يرجى متابعة الدفع لتأكيد حجز الجناح.",
                    viewDetails: "تفاصيل طلبك (للقراءة فقط)",
                },
                validation: {
                    logo: "شعار الشركة مطلوب للإرسال.",
                },
                reference: "مرجع",
                referenceOther: "يرجى تحديد المرجع",
                referenceOptions: ["كيشان فيرما", "سانجاي بهاماري", "فريد أحمد", "عبد المجيد", "أيديا باز", "ماروادي كاتاليست", "رهبار", "أخرى"],
            },
        };

        const referenceOptions = ["Kishan Verma", "Sanjay Bhamari", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar", "Other"];

        return {
            ...translations[language],
            referenceOptions: referenceOptions
        } as Translations;
    }, [language]);

    // --- Handlers ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handlePhoneChange = (value: string | undefined) => {
        setFormData((prev) => ({ ...prev, contactPhone: value || "" }))
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                alert("Please upload a PNG or JPG image.");
                e.target.value = '';
                return;
            }
            setFormData((prev) => ({ ...prev, companyLogo: file }))
        }
    }

    const uploadFile = async (file: File, userId: string, bucket: string) => {
        const fileExt = file.name.split('.').pop();
        const filePath = `${userId}/${Date.now()}.${fileExt}`;
        const { error } = await supabase.storage.from(bucket).upload(filePath, file);
        if (error) throw error;
        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleDataSubmission = async () => {
        if (!user) return alert("Authentication error.");
        if (isApproved) return;
        setLoadingData(true);

        let finalLogoUrl = formData.companyLogoUrl;

        try {
            if (formData.companyLogo) {
                finalLogoUrl = await uploadFile(formData.companyLogo, user.id, 'companylogos');
            } else if (!finalLogoUrl) {
                throw new Error(t.validation.logo);
            }

            if (!formData.reference) throw new Error("Reference is required.");
            if (formData.contactPhone && !isValidPhoneNumber(formData.contactPhone)) throw new Error("Invalid phone number.");

            let formattedWebsite = formData.companyWebsite.trim();
            if (formattedWebsite && !/^https?:\/\//i.test(formattedWebsite)) formattedWebsite = `https://${formattedWebsite}`;

            const profileData: Omit<ExhibitorProfileData, 'is_approved' | 'payment_status'> = {
                company_name: formData.companyName,
                company_website: formattedWebsite,
                contact_phone: formData.contactPhone,
                booth_type: formData.boothType,
                company_description: formData.companyDescription,
                company_logo_url: finalLogoUrl,
                email: formData.contactEmail,
                contact_personname: formData.contactName,
                reference: formData.reference === "Other" ? formData.referenceOther : formData.reference,
            };

            let error;
            if (hasExistingProfile) {
                const result = await supabase.from('exhibitor_profiles').update(profileData).eq('user_id', user.id);
                error = result.error;
            } else {
                const result = await supabase.from('exhibitor_profiles').insert({ user_id: user.id, ...profileData, is_approved: false });
                error = result.error;
            }

            if (error) throw error;

            alert(hasExistingProfile ? "Application updated!" : "Application submitted!");
            setHasExistingProfile(true);
            setFormData(prev => ({ ...prev, companyLogoUrl: finalLogoUrl }));
            setStep(0);
            window.location.reload();
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoadingData(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return setShowAuthPopup(true);
        handleDataSubmission();
    }

    // --- Render Logic ---
    const renderContent = () => {
        if (loadingSession || loadingData) return <div className="text-center py-20 text-slate-600 text-xl font-medium animate-pulse">Loading...</div>;

        if (!user || needsVerification) {
            if (needsVerification) return <EmailVerificationNotice language={language} />;
            return (
                <div className="max-w-xl mx-auto mt-16 p-8 text-center bg-red-50 border-2 border-[#740001]/20 rounded-xl shadow-lg animate-fadeIn">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.loginRequired}</h2>
                    <p className="text-slate-700 mb-6">{t.loginRequiredDesc}</p>
                    <button onClick={() => setShowAuthPopup(true)} className="px-8 py-3 bg-[#740001] text-white rounded-lg font-semibold hover:bg-[#940200] transition-all flex items-center justify-center gap-2 mx-auto">
                        <LogIn className="w-5 h-5" /> {t.login}
                    </button>
                </div>
            );
        }

        if (hasExistingProfile && step === 0) {
            return (
                <ExhibitorStatusView
                    t={t}
                    isApproved={isApproved}
                    paymentStatus={paymentStatus}
                    formData={formData}
                    setStep={setStep}
                    canEdit={!isApproved}
                    userId={user.id}
                    userEmail={user.email!}
                    paymentSessionId={paymentSessionId}
                    paidAt={paidAt}
                />
            );
        }

        if (step === 1) {
            return (
                <ExhibitorFormView
                    t={t}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handlePhoneChange={handlePhoneChange}
                    handleFileUpload={handleFileUpload}
                    handleSubmit={handleSubmit}
                    hasExistingProfile={hasExistingProfile}
                    isApproved={isApproved}
                />
            );
        }
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header language={language} setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>} userEmail={user?.email} />
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
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} onSuccess={() => setShowAuthPopup(false)} language={language} />}
        </div>
    )
}

// --- Helper Components ---

const ExhibitorFormView: React.FC<any> = ({ t, formData, handleInputChange, handlePhoneChange, handleFileUpload, handleSubmit, hasExistingProfile, isApproved }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-10 animate-slideInUp">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.formTitle}</h2>

                {[
                    { label: t.companyName, name: "companyName", type: "text", placeholder: t.placeholder.companyName, required: true },
                    { label: t.companyWebsite, name: "companyWebsite", type: "text", placeholder: t.placeholder.companyWebsite, required: true },
                    { label: t.contactName, name: "contactName", type: "text", placeholder: t.placeholder.contactName, required: true },
                    { label: t.contactEmail, name: "contactEmail", type: "email", placeholder: t.placeholder.contactEmail, required: true, disabled: true },
                ].map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-semibold text-slate-900 mb-2">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name as keyof ExhibitorFormData] as string}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors ${field.disabled || isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                            required={field.required}
                            disabled={field.disabled || isApproved}
                        />
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.contactPhone} <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                        placeholder={t.placeholder.contactPhone}
                        value={formData.contactPhone}
                        onChange={handlePhoneChange}
                        defaultCountry="AE"
                        disabled={isApproved}
                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus-within:border-[#740001] bg-white hover:border-slate-300 transition-colors ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''} [&>input]:outline-none [&>input]:bg-transparent [&>input]:w-full`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.boothType} <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="boothType"
                        value={formData.boothType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isApproved}
                    >
                        <option value="">Select a booth package</option>
                        {t.boothOptions.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.reference} <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="reference"
                        value={formData.reference}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isApproved}
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

                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.companyDescription} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleInputChange}
                        placeholder={t.placeholder.description}
                        rows={3}
                        maxLength={150}
                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#740001] focus:outline-none bg-white hover:border-slate-300 transition-colors resize-none ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isApproved}
                    />
                    <p className="text-xs text-slate-500 mt-1">{formData.companyDescription.length}/150</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.companyLogo} {formData.companyLogoUrl ? "(Optional Update)" : <span className="text-red-500">*</span>}
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${isApproved ? 'border-slate-200 bg-slate-50' : 'border-slate-300 hover:border-[#740001] hover:bg-slate-50 cursor-pointer'}`}>
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            accept="image/png, image/jpeg"
                            className="hidden"
                            id="logo-upload"
                            required={!formData.companyLogoUrl}
                            disabled={isApproved}
                        />
                        <label htmlFor="logo-upload" className={`cursor-pointer block ${isApproved ? 'cursor-not-allowed' : ''}`}>
                            <Store className="w-8 h-8 text-[#740001] mx-auto mb-2" />
                            {formData.companyLogo ? (
                                <p className="text-sm font-semibold text-slate-900">{formData.companyLogo.name}</p>
                            ) : formData.companyLogoUrl ? (
                                <p className="text-sm font-semibold text-green-600">Logo uploaded. Click to replace.</p>
                            ) : (
                                <>
                                    <p className="text-sm font-semibold text-slate-900 mb-1">{t.uploadFile}</p>
                                    <p className="text-xs text-slate-500">{t.logoHint}</p>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-[#740001] text-white rounded-lg font-semibold hover:bg-[#940200] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        disabled={isApproved}
                    >
                        {hasExistingProfile ? t.update : t.submit} {hasExistingProfile && <Save className="w-4 h-4" />}
                    </button>
                </div>
            </form >
        </div>
    );
};

const ExhibitorStatusView: React.FC<any> = ({ t, isApproved, paymentStatus, formData, setStep, canEdit, userId, userEmail, paymentSessionId, paidAt }) => {
    const isPaid = paymentStatus === 'paid';

    // Status Logic
    let statusColor = "bg-yellow-50 border-yellow-300 text-yellow-700";
    let statusIcon = <TrendingUp className="w-8 h-8" />;
    let statusTitle = t.status.pending;
    let statusDesc = t.status.notApprovedDesc;

    if (isApproved) {
        if (isPaid) {
            statusColor = "bg-green-50 border-green-300 text-green-700";
            statusIcon = <CheckCircle2 className="w-8 h-8" />;
            statusTitle = t.status.approved;
            statusDesc = t.status.approvedDesc;
        } else {
            statusColor = "bg-blue-50 border-blue-300 text-blue-700";
            statusIcon = <DollarSign className="w-8 h-8" />;
            statusTitle = "Application Approved - Payment Required";
            statusDesc = "Your application is approved. Please proceed with payment to confirm your booth.";
        }
    }

    const badgeRef = useRef<HTMLDivElement>(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    // --- Payment Handler ---
    const handlePayNow = async () => {
        setProcessingPayment(true);
        try {
            const response = await fetch(`${API_URL}/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    email: userEmail,
                    companyName: formData.companyName,
                    type: 'exhibitor' // Tell backend this is an exhibitor
                }),
            });
            const data = await response.json();
            if (data.url) window.location.href = data.url;
            else alert("Failed to initiate payment");
        } catch (error) {
            console.error(error);
            alert("Error connecting to payment server.");
        } finally {
            setProcessingPayment(false);
        }
    };

    const handleDownloadBadge = async () => {
        if (!badgeRef.current || !isApproved) return;
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            const canvas = await html2canvas(badgeRef.current, { scale: 4, useCORS: true, allowTaint: true, backgroundColor: null });
            const image = canvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");
            link.href = image;
            link.download = `Exhibitor-Pass-${formData.companyName.replace(/\s+/g, '-')}.png`;
            link.click();
        } catch (error) { console.error(error); }
    };

    const readOnlyFields = [
        { label: t.companyName, value: formData.companyName },
        { label: t.boothType, value: formData.boothType },
        { label: t.contactName, value: formData.contactName },
        { label: t.contactEmail, value: formData.contactEmail },
        { label: t.contactPhone, value: formData.contactPhone },
        { label: "Payment Status", value: paymentStatus.toUpperCase() },
    ];

    if (isPaid) {
        if (paidAt) readOnlyFields.push({ label: "Payment Date", value: new Date(paidAt).toLocaleString() });
        // Removed automatic adding of Transaction ID to use custom render below
    }

    return (
        <div className="space-y-8">
            <div className={`p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4 ${statusColor}`}>
                {statusIcon}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{t.status.title}</h2>
                    <h3 className="text-xl font-semibold mb-2">{statusTitle}</h3>
                    <p className="text-sm">{statusDesc}</p>
                </div>
                {isApproved && !isPaid && (
                    <button
                        onClick={handlePayNow}
                        disabled={processingPayment}
                        className="bg-[#740001] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#940200] transition-colors shadow-md flex items-center gap-2"
                    >
                        {processingPayment ? "Processing..." : <> <CreditCard className="w-5 h-5" /> Pay Fee</>}
                    </button>
                )}
            </div>



            {/* ONLY SHOW BADGE IF PAID */}
            {isApproved && isPaid && (
                <div className="flex flex-col items-center space-y-6 py-6 animate-fadeIn">
                    <div
                        onClick={handleDownloadBadge}
                        className="group relative w-full max-w-[340px] cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                        title={t.status.clickToDownload}
                    >
                        <div
                            ref={badgeRef}
                            id="badge-content"
                            className="relative rounded-2xl shadow-2xl overflow-hidden"
                            style={{
                                background: 'radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%)',
                                border: '1px solid #334155',
                                fontFamily: 'Arial, sans-serif',
                                width: '100%',
                                maxWidth: '340px',
                                minHeight: '500px',
                                boxSizing: 'border-box',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-100px', left: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(197,160,89,0.1) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>

                            <div style={{
                                padding: '30px 20px 20px 20px',
                                textAlign: 'center',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                zIndex: 10
                            }}>
                                <h5 style={{
                                    color: '#94a3b8',
                                    fontSize: '10px',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    margin: '0 0 8px 0'
                                }}>
                                    Official Exhibitor Pass
                                </h5>
                                <h2 style={{
                                    color: '#C5A059',
                                    fontSize: '22px',
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    lineHeight: '1.2',
                                    margin: 0,
                                    textShadow: '0 2px 10px rgba(197,160,89,0.3)'
                                }}>
                                    INVESTARISE<br />GLOBAL
                                </h2>
                            </div>

                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '30px 24px',
                                textAlign: 'center',
                                position: 'relative',
                                zIndex: 10
                            }}>
                                <div style={{
                                    width: '90px',
                                    height: '90px',
                                    margin: '0 auto 20px auto',
                                    borderRadius: '12px',
                                    background: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid #C5A059',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                    overflow: 'hidden',
                                    padding: '5px'
                                }}>
                                    <img
                                        src={formData.companyLogoUrl || ''}
                                        alt="Logo"
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </div>

                                <h1 style={{
                                    color: '#ffffff',
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    margin: '0 0 8px 0',
                                    lineHeight: '1.2',
                                    wordWrap: 'break-word',
                                    textTransform: 'uppercase'
                                }}>
                                    {formData.companyName}
                                </h1>

                                <p style={{
                                    color: '#cbd5e1',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    margin: '0',
                                    opacity: 0.9,
                                    textTransform: 'uppercase'
                                }}>
                                    {formData.contactName}
                                </p>

                                <div style={{
                                    marginTop: '16px',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{
                                        color: '#C5A059',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {formData.boothType || "Exhibitor"}
                                    </span>
                                </div>
                            </div>

                            <div style={{
                                background: '#ffffff',
                                padding: '25px 20px',
                                borderTop: '4px solid #C5A059',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                position: 'relative',
                                zIndex: 10
                            }}>
                                <div style={{ textAlign: 'left' }}>
                                    <p style={{ color: '#64748b', fontSize: '9px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>
                                        Event Date
                                    </p>
                                    <p style={{ color: '#0f172a', fontSize: '12px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                                        FEB 2026
                                    </p>
                                    <p style={{ color: '#64748b', fontSize: '9px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>
                                        Exhibitor ID
                                    </p>
                                    <p style={{ color: '#0f172a', fontSize: '11px', fontFamily: 'monospace', margin: 0 }}>
                                        {userId.slice(0, 8)}
                                    </p>
                                </div>
                                <div style={{
                                    padding: '4px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    backgroundColor: 'white' // Ensure background is explicitly white for QR
                                }}>
                                    <QRCode value={userId} size={80} fgColor="#000000" bgColor="#ffffff" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-slate-900/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-[2px]">
                            <div className="bg-white/10 border border-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl">
                                <p className="flex items-center gap-2 text-sm font-bold text-white tracking-wide">
                                    <Download className="h-4 w-4" /> Save to Device
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1"><Download className="w-3 h-3" /> {t.status.clickToDownload || "Click card to download"}</p>
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">{t.status.viewDetails}</h3>
                    {canEdit && <button onClick={() => setStep(1)} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors shadow-md"><Edit className="w-4 h-4" /> {t.update}</button>}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <img src={formData.companyLogoUrl || '/default-logo.png'} alt="Company Logo" className="w-32 h-32 rounded-lg object-contain border border-slate-200 p-2 bg-white" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm flex-1">
                        {readOnlyFields.map((field) => (
                            <div key={field.label}>
                                <p className="font-semibold text-slate-500 mb-1">{field.label}:</p>
                                <p className="text-slate-900 font-medium">{field.value}</p>
                            </div>
                        ))}

                        {/* Custom Transaction ID Render */}
                        {isPaid && paymentSessionId && (
                            <div className="flex flex-col">
                                <p className="font-semibold text-slate-500 mb-1">Transaction ID:</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-900 font-medium font-mono bg-slate-100 px-2 py-1 rounded">
                                        {paymentSessionId.slice(0, 10)}...
                                    </span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(paymentSessionId);
                                            alert("Transaction ID Copied!");
                                        }}
                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-bold border border-indigo-200 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};