"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction, useRef } from "react"
import { Session, User as SupabaseUser } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthPopup from "@/components/bincomponent/AuthPopup"
import EmailVerificationNotice from "@/components/bincomponent/EmailVerificationNotice"
import QRCode from "react-qr-code"
import html2canvas from "html2canvas"
import {
    ArrowRight, Upload, CheckCircle2, LogIn, TrendingUp, Edit,
    Lock, Save, Link as LinkIcon, XCircle, FileText, Globe,
    Linkedin, Phone, Building2, Calendar, DollarSign, FileCheck, Download, CreditCard, Clock, Zap
} from "lucide-react"
import { supabase } from "@/lib/supabaseConfig"

// --- Constants ---
// CHANGE THIS TO YOUR DEPLOYED BACKEND URL IN PRODUCTION
const API_URL = "https://pay.infispark.in";

// --- Types ---
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
    establishment_year: number | null;
    turnover: string | null;
    net_profit: string | null;
    it_returns_filed: boolean;
    is_audited: boolean;
    is_approved: boolean;
    email: string;
    reference: string | null;
    payment_status: string; // Added payment_status
}

type Translations = {
    title: string;
    subtitle: string;
    startupInfo: string;
    founderDetails: string;
    financialDetails: string;
    companyName: string;
    stage: string;
    domain: string;
    domainOtherSpec: string;
    problemDescription: string;
    earningStatus: string;
    establishmentYear: string;
    turnover: string;
    netProfit: string;
    itFiled: string;
    audited: string;
    yes: string;
    no: string;
    pitchDeck: string;
    pitchDeckChoice: string;
    uploadFile: string;
    addUrl: string;
    externalUrl: string;
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
    fileHint: string;
    urlHint: string;
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
        externalUrl: string;
        turnover: string;
        netProfit: string;
        year: string;
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
        qrTitle: string;
        qrDesc: string;
        clickToDownload: string;
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
        pitchDeckChoice: string;
    };
    reference: string;
    referenceOther: string;
    referenceOptions: string[];
    thankYou: {
        title: string;
        message: string;
        subMessage: string;
        close: string;
    };
};

type PitchDeckMode = 'file' | 'url';

export default function FounderFormPage() {
    // --- State Logic ---
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const [loadingSession, setLoadingSession] = useState(true)
    const [loadingData, setLoadingData] = useState(false)
    const [showAuthPopup, setShowAuthPopup] = useState(false)
    const [needsVerification, setNeedsVerification] = useState(false)

    const [hasExistingProfile, setHasExistingProfile] = useState(false)
    const [showThankYouPopup, setShowThankYouPopup] = useState(false)

    // Status & Payment States
    const [isApproved, setIsApproved] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<string>("unpaid")
    const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null)
    const [paidAt, setPaidAt] = useState<string | null>(null)
    const [isGala, setIsGala] = useState(false)

    const [step, setStep] = useState(1)
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const [pitchDeckMode, setPitchDeckMode] = useState<PitchDeckMode>('file');
    const [formData, setFormData] = useState({
        companyName: "",
        stage: "",
        pitchDeckFile: null as File | null,
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
        establishmentYear: "" as string | number,
        turnover: "",
        netProfit: "",
        itReturnsFiled: false,
        isAudited: false,
        reference: "",
        referenceOther: "",
    })

    // --- Effects & Fetching ---
    const fetchUserData = useCallback(async (currentUser: SupabaseUser) => {
        setLoadingData(true);
        const { data: profileData } = await supabase.from('profiles').select('role').eq('id', currentUser.id).single();
        setUserRole(profileData?.role || null);

        const { data: founderProfile } = await supabase.from('founder_profiles').select('*').eq('user_id', currentUser.id).single();

        if (founderProfile) {
            setHasExistingProfile(true);
            setIsApproved(founderProfile.is_approved);
            setPaymentStatus(founderProfile.payment_status || 'unpaid'); // Set Payment Status
            setPaymentSessionId(founderProfile.stripe_session_id || null);
            setPaidAt(founderProfile.paid_at || null);
            setIsGala(founderProfile.is_gala || false);
            setStep(0);
            const storedUrl = founderProfile.pitch_deck_url;
            if (storedUrl && storedUrl.startsWith('http') && !storedUrl.includes(process.env.NEXT_PUBLIC_SUPABASE_URL || '')) {
                setPitchDeckMode('url');
            } else {
                setPitchDeckMode('file');
            }
            setFormData((prev) => ({
                ...prev,
                companyName: founderProfile.company_name || '',
                stage: founderProfile.stage || '',
                pitchDeckUrl: storedUrl,
                companyLinkedin: founderProfile.company_linkedin || '',
                website: founderProfile.website || '',
                description: founderProfile.description || '',
                founderName: founderProfile.founder_name || '',
                founderEmail: founderProfile.email || currentUser.email!,
                founderPhone: founderProfile.founder_phone || '',
                domain: founderProfile.domain || '',
                domainOtherSpec: founderProfile.domain_other_spec || '',
                problemDescription: founderProfile.problem_description || '',
                earningStatus: founderProfile.earning_status || '',
                establishmentYear: founderProfile.establishment_year || '',
                turnover: founderProfile.turnover || '',
                netProfit: founderProfile.net_profit || '',
                itReturnsFiled: founderProfile.it_returns_filed || false,
                isAudited: founderProfile.is_audited || false,
                reference: founderProfile.reference && ["Kishan Verma", "Finarise", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar"].includes(founderProfile.reference) ? founderProfile.reference : (founderProfile.reference ? "Other" : ""),
                referenceOther: founderProfile.reference && !["Kishan Verma", "Finarise", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar"].includes(founderProfile.reference) ? founderProfile.reference : "",
            }));
        } else {
            setHasExistingProfile(false);
            setStep(1);
        }
        setLoadingData(false);
    }, []);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session }, } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setSession(session);
            setUser(currentUser);

            // Check if returned from Stripe successfully
            const params = new URLSearchParams(window.location.search);
            if (params.get('success') === 'true') {
                // You might want to show a toast/alert here
                console.log("Payment successful, refreshing data...");
            }

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
                    setPaymentStatus('unpaid');
                    setHasExistingProfile(false);
                    setStep(1);
                    setPitchDeckMode('file');
                    // Reset form...
                }
            }
        );
        return () => { authListener.subscription.unsubscribe() };
    }, [fetchUserData]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('done') === 'registration') {
            setShowThankYouPopup(true);
        }
    }, [])

    // --- Translations ---
    const t = useMemo(() => {
        const translations = {
            en: {
                title: "Startup Application",
                subtitle: "Get funding for your innovative startup",
                startupInfo: "Startup Information",
                founderDetails: "Founder & Legal",
                financialDetails: "Financial Details",
                companyName: "Company Name",
                stage: "Funding Stage",
                domain: "Primary Domain",
                domainOtherSpec: "Specify Domain",
                problemDescription: "Problem/Solution",
                earningStatus: "Revenue Status",
                establishmentYear: "Year of Establishment",
                turnover: "Annual Turnover",
                netProfit: "Net Profit",
                itFiled: "IT Returns Filed?",
                audited: "Accounts Audited?",
                yes: "Yes",
                no: "No",
                pitchDeck: "Pitch Deck",
                pitchDeckChoice: "Submission Method",
                uploadFile: "Upload PDF/PPT",
                addUrl: "External Link",
                externalUrl: "Deck URL",
                website: "Website",
                description: "Short Description",
                founderName: "Full Name",
                email: "Email",
                phone: "Phone",
                companyLinkedin: "LinkedIn",
                back: "Back",
                next: "Next Step",
                submit: "Submit Application",
                update: "Update Profile",
                required: "Required",
                fileHint: "PDF or PPT, max 25MB",
                urlHint: "Link to Video, Doc, or Drive",
                descHint: "words remaining",
                domains: ["FinTech", "HealthTech", "E-commerce", "SaaS", "EdTech", "Other"],
                earnings: ["Pre-revenue", "Pilot/Traction", "Revenue Generating (<$1M)", "Scaling (>$1M)"],
                stages: ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"],
                placeholder: {
                    company: "Acme Inc.",
                    website: "https://",
                    description: "Briefly describe what your company does...",
                    problemDescription: "What problem are you solving?",
                    domainOtherSpec: "Specific industry...",
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "+1 234...",
                    companyLinkedin: "https://linkedin.com/...",
                    externalUrl: "https://",
                    turnover: "e.g. 500,000 USD",
                    netProfit: "e.g. 50,000 USD",
                    year: "YYYY",
                },
                ready: "Ready to launch?",
                readyDesc: "Our team reviews applications daily. We'll be in touch shortly.",
                status: {
                    title: "Application Status",
                    notSubmitted: "Not Submitted",
                    pending: "Under Review",
                    approved: "Approved",
                    notApprovedDesc: "Your application is currently being reviewed by our investment team.",
                    approvedDesc: "Your startup has been approved for the next stage.",
                    viewDetails: "Application Details",
                    qrTitle: "Startup ID Pass",
                    qrDesc: "Scan to verify your startup identity",
                    clickToDownload: "Click card to download",
                },
                authError: "Authentication error: Please try logging in again.",
                pitchDeckRequiredError: "Pitch Deck is required.",
                submitSuccess: "Application submitted successfully!",
                updateSuccess: "Application updated successfully!",
                submitError: "An error occurred: ",
                loginRequired: "Authentication Required",
                loginRequiredDesc: "Please login to access the founder application.",
                roleMismatch: "Access Denied",
                roleMismatchDesc: "Your account is registered as an Investor.",
                login: "Login / Sign Up",
                validation: {
                    step1: "Please complete all required fields.",
                    pitchDeckChoice: "Please provide a pitch deck file or URL.",
                },
                reference: "Reference",
                referenceOther: "Please specify reference",
                referenceOptions: ["Kishan Verma", "Finarise", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar", "Other"],
                thankYou: {
                    title: "Registration Successful!",
                    message: "Thank you for registering. Your application has been received successfully.",
                    subMessage: "You can now proceed to the payment step to complete your verification.",
                    close: "Close"
                }
            },
            ar: {
                title: "طلب الشركة الناشئة",
                subtitle: "احصل على تمويل لشركتك الناشئة المبتكرة",
                startupInfo: "معلومات الشركة الناشئة",
                founderDetails: "تفاصيل المؤسس",
                financialDetails: "التفاصيل المالية",
                companyName: "اسم الشركة",
                stage: "مرحلة التمويل",
                domain: "المجال الرئيسي",
                domainOtherSpec: "تحديد المجال",
                problemDescription: "نظرة عامة على المشكلة/الحل",
                earningStatus: "حالة الإيرادات",
                establishmentYear: "سنة التأسيس",
                turnover: "دوران السنوي",
                netProfit: "صافي الربح",
                itFiled: "تم تقديم الإقرارات الضريبية؟",
                audited: "حسابات مدققة؟",
                yes: "نعم",
                no: "لا",
                pitchDeck: "إرسال عرض الملعب",
                pitchDeckChoice: "طريقة عرض الملعب",
                uploadFile: "تحميل ملف (PDF/PPT)",
                addUrl: "إضافة رابط خارجي",
                externalUrl: "رابط عرض الملعب",
                website: "موقع الويب",
                description: "وصف الشركة",
                founderName: "اسم المؤسس",
                email: "البريد الإلكتروني",
                phone: "رقم الهاتف",
                companyLinkedin: "LinkedIn",
                back: "رجوع",
                next: "التالي",
                submit: "إرسال الطلب",
                update: "تحديث الطلب",
                required: "مطلوب",
                fileHint: "PDF أو PowerPoint، بحد أقصى 25 ميجابايت",
                urlHint: "رابط إلى الفيديو أو المستند",
                descHint: "كلمة",
                domains: ["التكنولوجيا المالية", "التكنولوجيا الصحية", "التجارة الإلكترونية", "SaaS", "التعليم", "أخرى"],
                earnings: ["ما قبل الإيرادات", "تجريبي/احتكاك", "توليد الإيرادات (أقل من 1 مليون دولار)", "التوسع (أكثر من 1 مليون دولار)"],
                stages: ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"],
                placeholder: {
                    company: "أدخل اسم الشركة",
                    website: "https://yourcompany.com",
                    description: "وصف شركتك الناشئة...",
                    problemDescription: "صف المشكلة والحل...",
                    domainOtherSpec: "مثال: تكنولوجيا الفضاء",
                    name: "أدخل اسمك الكامل",
                    email: "أدخل بريدك الإلكتروني",
                    phone: "أدخل رقم هاتفك",
                    companyLinkedin: "https://linkedin.com/...",
                    externalUrl: "https://...",
                    turnover: "مثال: 50 ألف",
                    netProfit: "مثال: 5 آلاف",
                    year: "السنة",
                },
                ready: "هل أنت مستعد للإطلاق؟",
                readyDesc: "يراجع فريقنا الطلبات يوميًا.",
                status: {
                    title: "حالة الطلب",
                    notSubmitted: "لم يتم تقديم الطلب",
                    pending: "الطلب قيد المراجعة",
                    approved: "تمت الموافقة",
                    notApprovedDesc: "يتم حاليًا مراجعة طلبك.",
                    approvedDesc: "تمت الموافقة على شركتك الناشئة.",
                    viewDetails: "تفاصيل الطلب",
                    qrTitle: "بطاقة هوية الشركة الناشئة",
                    qrDesc: "امسح للتحقق من هوية شركتك الناشئة",
                    clickToDownload: "انقر فوق البطاقة للتنزيل",
                },
                authError: "خطأ في المصادقة.",
                pitchDeckRequiredError: "عرض الملعب مطلوب.",
                submitSuccess: "تم إرسال الطلب بنجاح!",
                updateSuccess: "تم تحديث الطلب بنجاح!",
                submitError: "حدث خطأ: ",
                loginRequired: "تسجيل الدخول مطلوب",
                loginRequiredDesc: "يرجى تسجيل الدخول للمتابعة.",
                roleMismatch: "تم رفض الوصول",
                roleMismatchDesc: "حسابك مسجل كمستثمر.",
                login: "تسجيل الدخول",
                validation: {
                    step1: "يرجى ملء جميع الحقول.",
                    pitchDeckChoice: "يرجى تقديم عرض الملعب.",
                },
                reference: "مرجع",
                referenceOther: "يرجى تحديد المرجع",
                referenceOptions: ["كيشان فيرما", "سانجاي بهاماري", "فريد أحمد", "عبد المجيد", "أيديا باز", "ماروادي كاتاليست", "رهبار", "أخرى"],
                thankYou: {
                    title: "تم التسجيل بنجاح!",
                    message: "شكراً لتسجيلك. تم استلام طلبك بنجاح.",
                    subMessage: "يمكنك الآن المتابعة إلى خطوة الدفع لإكمال التحقق.",
                    close: "إغلاق"
                }
            },
        };
        const referenceOptions = ["Kishan Verma", "Finarise", "Sanjay Bhambri", "Adhar Bharat", "Farid Ahmed", "Abdulmajid", "Ideabaaz", "Marwadi Catalyst", "Rehbar", "Other"];
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

    const handleToggleChange = (name: string, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked }))
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, pitchDeckUrl: e.target.value, pitchDeckFile: null }))
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData((prev) => ({ ...prev, pitchDeckFile: file, pitchDeckUrl: null }))
        }
    }

    const clearUrl = () => { setFormData((prev) => ({ ...prev, pitchDeckUrl: null })) }

    const handlePitchDeckModeChange = (mode: PitchDeckMode) => {
        setPitchDeckMode(mode);
        if (mode === 'file') { setFormData(prev => ({ ...prev, pitchDeckUrl: null })); }
        else { setFormData(prev => ({ ...prev, pitchDeckFile: null })); }
    }

    const handleNext = () => {
        let isStep1Valid = !!formData.companyName && !!formData.domain && !!formData.website && !!formData.establishmentYear;
        if (formData.domain === 'Other' && !formData.domainOtherSpec) isStep1Valid = false;
        const isPitchDeckValid = !!formData.pitchDeckFile || !!formData.pitchDeckUrl;

        if (formData.establishmentYear && Number(formData.establishmentYear) < 2000) {
            alert("Year of Establishment cannot be earlier than 2000.");
            return;
        }

        if (!isStep1Valid) { alert(t.validation.step1); return; }
        if (!isPitchDeckValid) { alert(t.validation.pitchDeckChoice); return; }
        if (step < 2) setStep(step + 1)
    }

    const handleBack = () => { if (step > 1) setStep(step - 1) }

    const uploadPitchDeck = async (file: File, userId: string) => {
        const fileExt = file.name.split('.').pop();
        const filePath = `${userId}/${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage.from('pitchdecks').upload(filePath, file, { cacheControl: '3600', upsert: false });
        if (error) throw error;
        const { data: urlData } = supabase.storage.from('pitchdecks').getPublicUrl(filePath);
        return urlData.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return alert(t.authError);
        if (isApproved) return;
        setLoadingData(true);
        let finalPitchUrl = formData.pitchDeckUrl;

        try {
            if (formData.pitchDeckFile) {
                finalPitchUrl = await uploadPitchDeck(formData.pitchDeckFile, user.id);
            } else if (!finalPitchUrl) {
                throw new Error(t.pitchDeckRequiredError);
            }

            if (!formData.reference) {
                alert("Reference is required.");
                setLoadingData(false);
                return;
            }

            const submissionData: Omit<FounderProfileData, 'is_approved' | 'payment_status'> = {
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
                establishment_year: formData.establishmentYear ? parseInt(String(formData.establishmentYear)) : null,
                turnover: formData.turnover,
                net_profit: formData.netProfit,
                it_returns_filed: formData.itReturnsFiled,
                is_audited: formData.isAudited,
                email: formData.founderEmail,
                reference: formData.reference === "Other" ? formData.referenceOther : formData.reference,
            }

            let error;
            if (hasExistingProfile) {
                const result = await supabase.from('founder_profiles').update({ ...submissionData, is_approved: true }).eq('user_id', user.id).select();
                error = result.error;
            } else {
                const result = await supabase.from('founder_profiles').insert({ user_id: user.id, ...submissionData, is_approved: true }).select();
                error = result.error;
            }
            if (error) throw error;

            // Update URL without reload to show Thank You Popup
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('done', 'registration');
            window.history.pushState({}, '', newUrl);

            setShowThankYouPopup(true);
            setHasExistingProfile(true);
            setIsApproved(true);
            setFormData(prev => ({ ...prev, pitchDeckUrl: finalPitchUrl, pitchDeckFile: null }));
            setStep(0);
        } catch (err: any) {
            alert(t.submitError + (err.message || ''));
            console.error("Submission error:", err);
        } finally {
            setLoadingData(false);
        }
    }

    // --- Main Render ---
    const renderContent = () => {
        if (loadingSession || loadingData) {
            return <div className="flex items-center justify-center py-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div></div>
        }

        if (!user || needsVerification) {
            if (needsVerification) return <EmailVerificationNotice language={language} />;
            return (
                <div className="max-w-md mx-auto mt-20 p-8 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-6 h-6 text-slate-600" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">{t.loginRequired}</h2>
                    <p className="text-sm text-slate-500 mb-6">{t.loginRequiredDesc}</p>
                    <button
                        onClick={() => setShowAuthPopup(true)}
                        className="w-full py-2.5 bg-[#740001] text-white text-sm font-medium rounded-lg hover:bg-[#023c7a] transition-all flex items-center justify-center gap-2"
                    >
                        <LogIn className="w-4 h-4" /> {t.login}
                    </button>
                </div>
            );
        }

        if (hasExistingProfile && step === 0) {
            return (
                <StatusView
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
                    isGala={isGala}
                    setIsGala={setIsGala}
                />
            );
        }

        if (step === 1 || step === 2) {
            return (
                <FormView
                    t={t} step={step} formData={formData} pitchDeckMode={pitchDeckMode}
                    handleInputChange={handleInputChange} handleFileUpload={handleFileUpload}
                    handleToggleChange={handleToggleChange}
                    handleUrlChange={handleUrlChange} handlePitchDeckModeChange={handlePitchDeckModeChange}
                    handleNext={handleNext} handleBack={handleBack} handleSubmit={handleSubmit}
                    isApproved={isApproved} hasExistingProfile={hasExistingProfile} clearUrl={clearUrl}
                />
            );
        }

        return null;
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header language={language} setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>} userEmail={user?.email} />
            <main className="flex-1 pt-28 pb-20 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">

                    <div className="bg-gradient-to-r from-[#740001] via-blue-600 to-orange-600 text-white p-4 rounded-xl shadow-lg mb-8 flex items-center gap-4 animate-fadeIn border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm animate-pulse">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
                                3 Days Special: Last Minute Entry <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                            </h3>
                            <p className="text-white/90 text-sm">
                                Final opportunity to join the event. Registration closing soon.
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">{t.title}</h1>
                        <p className="text-sm text-slate-500">{t.subtitle}</p>
                    </div>
                    {renderContent()}
                </div>
            </main>
            <Footer language={language} />
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} onSuccess={() => setShowAuthPopup(false)} language={language} />}
            {showThankYouPopup && <ThankYouPopup onClose={() => setShowThankYouPopup(false)} t={t} />}
        </div>
    )
}

// --- Helper Components ---

const InputGroup = ({ label, required, children, subLabel }: { label: string, required?: boolean, children: React.ReactNode, subLabel?: string }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {label} {required && <span className="text-blue-500">*</span>}
        </label>
        {children}
        {subLabel && <p className="text-xs text-slate-400">{subLabel}</p>}
    </div>
);

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className={`w-full px-3 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#740001] focus:ring-1 focus:ring-[#740001]/20 transition-all disabled:bg-slate-50 disabled:text-slate-500 ${props.className}`}
    />
);

const StyledSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div className="relative">
        <select
            {...props}
            className={`w-full px-3 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#740001] focus:ring-1 focus:ring-[#740001]/20 transition-all appearance-none disabled:bg-slate-50 ${props.className}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    </div>
);

const ToggleSwitch = ({ checked, onChange, disabled, labelOn, labelOff }: { checked: boolean, onChange: (val: boolean) => void, disabled: boolean, labelOn: string, labelOff: string }) => (
    <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-8 w-full md:w-48 items-center rounded-lg border px-1 transition-colors ${checked ? 'bg-[#740001]/5 border-[#740001]' : 'bg-white border-slate-200'}`}
        disabled={disabled}
    >
        <span className="sr-only">Use setting</span>
        <span
            className={`${checked ? 'translate-x-full md:translate-x-[calc(100%-8px)] bg-[#740001]' : 'translate-x-0 bg-slate-300'
                } inline-block h-6 w-6 transform rounded-md transition-transform duration-200 ease-in-out`}
        />
        <span className="absolute inset-0 flex items-center justify-between px-3 text-xs font-medium">
            <span className={`${!checked ? 'text-slate-900' : 'text-transparent'} transition-colors`}>{labelOff}</span>
            <span className={`${checked ? 'text-[#740001]' : 'text-transparent'} transition-colors`}>{labelOn}</span>
        </span>
    </button>
);

// --- Form View ---
const FormView: React.FC<any> = ({ t, step, formData, pitchDeckMode, handleInputChange, handleFileUpload, handleToggleChange, handleUrlChange, handlePitchDeckModeChange, handleNext, handleBack, handleSubmit, isApproved, hasExistingProfile, clearUrl }) => {
    const isDisabled = isApproved;
    const isFileSelected = !!formData.pitchDeckFile;
    const isUrlEntered = !!formData.pitchDeckUrl;

    return (
        <>
            <div className="flex items-center justify-between mb-8 px-1">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 1 ? 'bg-[#740001] text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400'}`}>1</div>
                    <span className={`text-sm font-medium ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>{t.startupInfo}</span>
                </div>
                <div className={`flex-1 h-px mx-4 ${step >= 2 ? 'bg-[#740001]' : 'bg-slate-200'}`}></div>
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 2 ? 'bg-[#740001] text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400'}`}>2</div>
                    <span className={`text-sm font-medium ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>{t.founderDetails}</span>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup label={t.companyName} required>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <StyledInput name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder={t.placeholder.company} disabled={isDisabled} className="pl-9" required />
                                        </div>
                                    </InputGroup>
                                    <InputGroup label={t.establishmentYear} required>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <StyledInput type="number" name="establishmentYear" value={formData.establishmentYear} onChange={handleInputChange} placeholder={t.placeholder.year} min="1900" max={new Date().getFullYear() + 1} disabled={isDisabled} className="pl-9" required />
                                        </div>
                                    </InputGroup>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup label={t.website} required>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <StyledInput type="url" name="website" value={formData.website} onChange={handleInputChange} placeholder={t.placeholder.website} disabled={isDisabled} className="pl-9" required />
                                        </div>
                                    </InputGroup>
                                    <InputGroup label={t.companyLinkedin}>
                                        <div className="relative">
                                            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <StyledInput type="url" name="companyLinkedin" value={formData.companyLinkedin} onChange={handleInputChange} placeholder={t.placeholder.companyLinkedin} disabled={isDisabled} className="pl-9" />
                                        </div>
                                    </InputGroup>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputGroup label={t.domain} required>
                                        <StyledSelect name="domain" value={formData.domain} onChange={handleInputChange} disabled={isDisabled} required>
                                            <option value="">Select...</option>
                                            {t.domains.map((d: string) => <option key={d} value={d}>{d}</option>)}
                                        </StyledSelect>
                                    </InputGroup>
                                    {formData.domain === "Other" && (
                                        <InputGroup label={t.domainOtherSpec} required>
                                            <StyledInput name="domainOtherSpec" value={formData.domainOtherSpec} onChange={handleInputChange} placeholder={t.placeholder.domainOtherSpec} disabled={isDisabled} required />
                                        </InputGroup>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <InputGroup label={t.pitchDeck} required>
                                        <div className="bg-slate-50 p-1 rounded-lg flex mb-4 w-full md:w-fit border border-slate-200">
                                            {(['file', 'url'] as const).map((mode) => (
                                                <button
                                                    key={mode}
                                                    type="button"
                                                    onClick={() => handlePitchDeckModeChange(mode)}
                                                    className={`flex-1 px-4 py-1.5 text-xs font-medium rounded-md transition-all ${pitchDeckMode === mode ? 'bg-white text-[#740001] shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-700'}`}
                                                    disabled={isDisabled}
                                                >
                                                    {mode === 'file' ? t.uploadFile : t.addUrl}
                                                </button>
                                            ))}
                                        </div>

                                        {pitchDeckMode === 'file' ? (
                                            <div className="relative">
                                                <input type="file" id="pitch-upload" onChange={handleFileUpload} accept=".pdf,.ppt,.pptx" className="hidden" disabled={isDisabled} />
                                                <label htmlFor="pitch-upload" className={`block border border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 hover:border-[#740001] transition-all cursor-pointer ${isDisabled ? 'opacity-60 pointer-events-none' : ''}`}>
                                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-[#740001]">
                                                        <Upload className="w-5 h-5" />
                                                    </div>
                                                    {isFileSelected ? (
                                                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#740001]">
                                                            <FileText className="w-4 h-4" /> {formData.pitchDeckFile.name}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <p className="text-sm font-medium text-slate-900">{t.uploadFile}</p>
                                                            <p className="text-xs text-slate-500 mt-1">{t.fileHint}</p>
                                                        </>
                                                    )}
                                                </label>
                                                {formData.pitchDeckUrl && !isFileSelected && (
                                                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Current file on server.</p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <StyledInput type="url" name="pitchDeckUrl" value={formData.pitchDeckUrl || ""} onChange={handleUrlChange} placeholder={t.placeholder.externalUrl} disabled={isDisabled} />
                                                {isUrlEntered && (
                                                    <button type="button" onClick={clearUrl} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500" disabled={isDisabled}>
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </InputGroup>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button type="button" onClick={handleNext} className="bg-[#740001] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#023c7a] transition-colors flex items-center gap-2">
                                        {t.next} <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">{t.founderDetails}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputGroup label={t.founderName} required>
                                            <StyledInput name="founderName" value={formData.founderName} onChange={handleInputChange} placeholder={t.placeholder.name} disabled={isDisabled} required />
                                        </InputGroup>
                                        <InputGroup label={t.email} required>
                                            <StyledInput type="email" name="founderEmail" value={formData.founderEmail} onChange={handleInputChange} placeholder={t.placeholder.email} disabled={isDisabled} required />
                                        </InputGroup>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputGroup label={t.phone} required>
                                            <StyledInput type="tel" name="founderPhone" value={formData.founderPhone} onChange={handleInputChange} placeholder={t.placeholder.phone} disabled={isDisabled} required />
                                        </InputGroup>
                                        <InputGroup label="Reference" required>
                                            <StyledSelect name="reference" value={formData.reference} onChange={handleInputChange} disabled={isDisabled} required>
                                                <option value="">Select Reference</option>
                                                {t.referenceOptions.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                                            </StyledSelect>
                                        </InputGroup>
                                    </div>
                                    {formData.reference === "Other" && (
                                        <InputGroup label={t.referenceOther} required>
                                            <StyledInput name="referenceOther" value={formData.referenceOther} onChange={handleInputChange} placeholder="Enter reference name" disabled={isDisabled} required />
                                        </InputGroup>
                                    )}
                                </div>

                                <div className="space-y-5">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">{t.financialDetails}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <InputGroup label={t.stage} required>
                                            <StyledSelect name="stage" value={formData.stage} onChange={handleInputChange} disabled={isDisabled} required>
                                                <option value="">Select...</option>
                                                {t.stages.map((s: string) => <option key={s} value={s}>{s}</option>)}
                                            </StyledSelect>
                                        </InputGroup>
                                        <InputGroup label={t.earningStatus} required>
                                            <StyledSelect name="earningStatus" value={formData.earningStatus} onChange={handleInputChange} disabled={isDisabled} required>
                                                <option value="">Select...</option>
                                                {t.earnings.map((e: string) => <option key={e} value={e}>{e}</option>)}
                                            </StyledSelect>
                                        </InputGroup>
                                        <InputGroup label={t.turnover} required>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <StyledInput name="turnover" value={formData.turnover} onChange={handleInputChange} placeholder={t.placeholder.turnover} disabled={isDisabled} className="pl-9" required />
                                            </div>
                                        </InputGroup>
                                        <InputGroup label={t.netProfit} required>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <StyledInput name="netProfit" value={formData.netProfit} onChange={handleInputChange} placeholder={t.placeholder.netProfit} disabled={isDisabled} className="pl-9" required />
                                            </div>
                                        </InputGroup>
                                        <InputGroup label={t.itFiled}>
                                            <div className="flex items-center h-[42px]">
                                                <ToggleSwitch
                                                    checked={formData.itReturnsFiled}
                                                    onChange={(val) => handleToggleChange('itReturnsFiled', val)}
                                                    disabled={isDisabled}
                                                    labelOn={t.yes}
                                                    labelOff={t.no}
                                                />
                                            </div>
                                        </InputGroup>
                                        <InputGroup label={t.audited}>
                                            <div className="flex items-center h-[42px]">
                                                <ToggleSwitch
                                                    checked={formData.isAudited}
                                                    onChange={(val) => handleToggleChange('isAudited', val)}
                                                    disabled={isDisabled}
                                                    labelOn={t.yes}
                                                    labelOff={t.no}
                                                />
                                            </div>
                                        </InputGroup>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <InputGroup label={t.problemDescription} required>
                                        <textarea
                                            name="problemDescription"
                                            value={formData.problemDescription}
                                            onChange={handleInputChange}
                                            placeholder={t.placeholder.problemDescription}
                                            rows={3}
                                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#740001] focus:ring-1 focus:ring-[#740001]/20 transition-all disabled:bg-slate-50 resize-none"
                                            required
                                            disabled={isDisabled}
                                        />
                                    </InputGroup>

                                    <InputGroup label={t.description} required>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder={t.placeholder.description}
                                            rows={4}
                                            maxLength={250}
                                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-md text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#740001] focus:ring-1 focus:ring-[#740001]/20 transition-all disabled:bg-slate-50 resize-none"
                                            required
                                            disabled={isDisabled}
                                        />
                                        <p className="text-xs text-slate-400 text-right pt-1">{formData.description.length}/250</p>
                                    </InputGroup>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-slate-100">
                                    <button type="button" onClick={handleBack} className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                                        {t.back}
                                    </button>
                                    <button type="submit" disabled={isDisabled} className="flex-1 bg-[#740001] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#023c7a] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50">
                                        {hasExistingProfile ? t.update : t.submit} {hasExistingProfile && <Save className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form >
                </div >
            </div >
        </>
    );
};

// --- Status View (Vertical + Payment Logic) ---
const StatusView: React.FC<any> = ({ t, isApproved, paymentStatus, formData, setStep, canEdit, userId, userEmail, paymentSessionId, paidAt, isGala, setIsGala }) => {
    const isPaid = paymentStatus === 'paid';

    // Status Logic
    let statusColor = "bg-amber-50 text-amber-700 border-amber-200";
    let statusIcon = <TrendingUp className="w-5 h-5" />;
    let statusTitle = t.status.pending;
    let statusDesc = t.status.notApprovedDesc;

    if (isApproved) {
        if (isPaid) {
            statusColor = "bg-green-50 text-green-700 border-green-200";
            statusIcon = <CheckCircle2 className="w-5 h-5" />;
            statusTitle = t.status.approved;
            statusDesc = t.status.approvedDesc;
        } else {
            statusColor = "bg-blue-50 text-blue-700 border-blue-200";
            statusIcon = <CheckCircle2 className="w-5 h-5" />;
            statusTitle = "Application Approved";
            statusDesc = "Your application has been accepted. You can download your Founder Pass below.";
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
                    isGala: isGala,
                    type: 'founder',
                    success_url: "https://www.investariseglobal.com/founder-form?success=true",
                    cancel_url: "https://www.investariseglobal.com/founder-form?canceled=true"
                }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Failed to initiate payment");
            }
        } catch (error) {
            console.error(error);
            alert("Error connecting to payment server. Make sure the Node.js backend is running.");
        } finally {
            setProcessingPayment(false);
        }
    };

    const handleDownloadBadge = async () => {
        if (!badgeRef.current || !isApproved) return;

        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const canvas = await html2canvas(badgeRef.current, {
                scale: 4,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                scrollY: -window.scrollY,
                onclone: (clonedDoc) => {
                    const element = clonedDoc.getElementById('badge-content');
                    if (element) {
                        element.style.height = 'auto';
                        element.style.visibility = 'visible';
                        element.style.transform = 'none';
                    }
                }
            });

            const image = canvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");
            link.href = image;
            link.download = `Investarise-Pass-${formData.founderName.replace(/\s+/g, '-')}.png`;
            link.click();
        } catch (error) {
            console.error("Error generating badge:", error);
            alert("Could not download badge. Please try again.");
        }
    };

    const DataItem = ({ label, value, link }: { label: string, value: string, link?: boolean }) => (
        <div className="flex flex-col">
            <dt className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">{label}</dt>
            <dd className="text-sm font-medium text-slate-900 break-words">
                {link ? (
                    <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-[#740001] hover:underline flex items-center gap-1">
                        {value} <LinkIcon className="w-3 h-3" />
                    </a>
                ) : value}
            </dd>
        </div>
    );

    const BooleanItem = ({ label, value }: { label: string, value: boolean }) => (
        <div className="flex flex-col">
            <dt className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">{label}</dt>
            <dd className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                    {value ? <FileCheck className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                    {value ? t.yes : t.no}
                </span>
            </dd>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-xl border ${statusColor} flex flex-col md:flex-row items-start md:items-center gap-4`}>
                <div className="mt-1">{statusIcon}</div>
                <div className="flex-1">
                    <h3 className="font-bold text-base mb-1">{statusTitle}</h3>
                    <p className="text-sm opacity-90">{statusDesc}</p>
                </div>
                {/* Pay Button Logic */}
                {/* Pay Button Logic Removed - Direct Approval for Event */}{/*
                {isApproved && !isPaid && (
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <label className="flex items-center gap-2 bg-white/50 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-white/80 transition-colors">
                            <input
                                type="checkbox"
                                checked={isGala}
                                onChange={(e) => setIsGala(e.target.checked)}
                                className="w-4 h-4 text-[#740001] focus:ring-[#740001] border-slate-300 rounded"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-800">Include Gala Dinner</span>
                                <span className="text-xs text-slate-500">Add networking dinner for +$500.00</span>
                            </div>
                        </label>
                        <button
                            onClick={handlePayNow}
                            disabled={processingPayment}
                            className="bg-[#740001] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#023c7a] transition-colors shadow-md flex items-center gap-2 w-full justify-center"
                        >
                            {processingPayment ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <CreditCard className="w-4 h-4" />}
                            Pay ${isGala ? '1000.00' : '500.00'}
                        </button>
                    </div>
                )}
                */}
            </div>

            {/* ONLY SHOW BADGE IF PAID (Modified to allow unpaid) */}
            {isApproved && userId && (
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
                                    Official Event Pass
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
                                padding: '30px 24px',
                                textAlign: 'center',
                                position: 'relative',
                                zIndex: 10
                            }}>
                                <div style={{
                                    width: '180px',
                                    padding: '12px',
                                    margin: '0 auto 24px auto',
                                    borderRadius: '12px',
                                    border: '2px solid #C5A059',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                }}>
                                    <img
                                        src="/logo-white.png"
                                        alt="Logo"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                                <h1 style={{
                                    color: '#ffffff',
                                    fontSize: '28px',
                                    fontWeight: '800',
                                    margin: '0 0 8px 0',
                                    lineHeight: '1.2',
                                    wordWrap: 'break-word',
                                    textTransform: 'uppercase'
                                }}>
                                    {formData.founderName}
                                </h1>
                                <p style={{
                                    color: '#cbd5e1',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    margin: '0 0 20px 0',
                                    opacity: 0.9,
                                    textTransform: 'uppercase'
                                }}>
                                    {formData.companyName}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <span style={{
                                        color: '#C5A059',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Founder Access
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
                                        Pass ID
                                    </p>
                                    <p style={{ color: '#0f172a', fontSize: '11px', fontFamily: 'monospace', margin: 0 }}>
                                        {userId.slice(0, 8)}
                                    </p>
                                </div>
                                <div style={{
                                    padding: '4px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px'
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

                    <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Download className="w-3 h-3" /> {t.status.clickToDownload}
                    </p>
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-semibold text-slate-900">{t.status.viewDetails}</h3>
                    {canEdit && (
                        <button onClick={() => setStep(1)} className="text-xs bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded hover:bg-slate-50 transition-colors flex items-center gap-2">
                            <Edit className="w-3 h-3" /> {t.update}
                        </button>
                    )}
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <DataItem label={t.companyName} value={formData.companyName} />
                        <DataItem label={t.establishmentYear} value={String(formData.establishmentYear)} />
                        <DataItem label={t.website} value={formData.website} link />
                        <DataItem label={t.stage} value={formData.stage} />
                        <DataItem label={t.earningStatus} value={formData.earningStatus} />
                        <DataItem label={t.domain} value={formData.domain === 'Other' ? `${formData.domain} (${formData.domainOtherSpec})` : formData.domain} />
                        <DataItem label="Pass Type" value={"Founder Pass (Standard)"} />

                        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <DataItem label={t.turnover} value={formData.turnover} />
                            <DataItem label={t.netProfit} value={formData.netProfit} />
                            <BooleanItem label={t.itFiled} value={formData.itReturnsFiled} />
                            <BooleanItem label={t.audited} value={formData.isAudited} />
                        </div>

                        <DataItem label={t.founderName} value={formData.founderName} />
                        <DataItem label={t.email} value={formData.founderEmail} />
                        <DataItem label="Payment Status" value={paymentStatus.toUpperCase()} />
                        {isPaid && paidAt && <DataItem label="Payment Date" value={new Date(paidAt).toLocaleString()} />}
                        {isPaid && paymentSessionId && (
                            <div className="flex flex-col">
                                <dt className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">Transaction ID</dt>
                                <dd className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-900 font-mono bg-slate-100 px-2 py-1 rounded">
                                        {paymentSessionId.slice(0, 10)}...
                                    </span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(paymentSessionId);
                                            alert("Transaction ID Copied!");
                                        }}
                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-200 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
                                    >
                                        Copy
                                    </button>
                                </dd>
                            </div>
                        )}

                        <div className="flex flex-col">
                            <dt className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">{t.pitchDeck}</dt>
                            <dd>
                                <a href={formData.pitchDeckUrl || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#740001]/5 text-[#740001] rounded text-xs font-bold hover:bg-[#740001]/10 transition-colors">
                                    <FileText className="w-3 h-3" /> View Document
                                </a>
                            </dd>
                        </div>

                        <div className="md:col-span-2 pt-2 border-t border-slate-100">
                            <dt className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-2 mt-4">{t.problemDescription}</dt>
                            <dd className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-100">
                                {formData.problemDescription}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ThankYouPopup = ({ onClose, t }: { onClose: () => void, t: Translations }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-bounceIn">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 rounded-full p-1">
                <XCircle className="w-5 h-5" />
            </button>
            <div className="p-8 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.thankYou.title}</h2>
                <div className="space-y-2 mb-8">
                    <p className="text-slate-600 text-base font-medium">
                        {t.thankYou.message}
                    </p>
                    <p className="text-slate-500 text-sm">
                        {t.thankYou.subMessage}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="w-full py-3.5 bg-[#740001] text-white rounded-xl font-bold shadow-lg shadow-[#740001]/20 hover:bg-[#023c7a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                    {t.thankYou.close}
                </button>
            </div>
        </div>
    </div>
);