// app/exhibitor-form/page.tsx
"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link" 
import { Session, User as SupabaseUser } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthPopup from "@/components/AuthPopup" 
import EmailVerificationNotice from "@/components/EmailVerificationNotice" 
import { CheckCircle2, LogIn, Edit, Save, Lock, TrendingUp, Link as LinkIcon, Upload, Store } from "lucide-react" 
import { supabase } from "@/lib/supabaseConfig" 

// Define the type for the specific profile data fetched from the database
interface ExhibitorProfileData {
    company_name: string;
    company_website: string;
    contact_phone: string;
    booth_type: string;
    company_description: string;
    company_logo_url: string | null;
    is_approved: boolean;
}

// Define the type for the form's state
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
}

// Define a type for the structure returned by the translations useMemo hook
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
    placeholder: {
      companyName: string;
      companyWebsite: string;
      contactName: string;
      contactEmail: string;
      contactPhone: string;
      description: string;
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
        logo: string;
    };
};

export default function ExhibitorFormPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const [loadingData, setLoadingData] = useState(false)
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [needsVerification, setNeedsVerification] = useState(false)
  const [hasExistingProfile, setHasExistingProfile] = useState(false)
  const [isApproved, setIsApproved] = useState(false) 

  const [step, setStep] = useState(1) // 1 = form, 0 = status card
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [formData, setFormData] = useState<ExhibitorFormData>({
    companyName: "",
    companyWebsite: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    boothType: "",
    companyDescription: "",
    companyLogo: null,
    companyLogoUrl: null,
  })

  // --- Supabase Session and Role Management ---
  const fetchUserData = useCallback(async (currentUser: SupabaseUser) => {
        setLoadingData(true);
        // 1. Fetch Full Name (for pre-filling)
        const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', currentUser.id)
            .single();

        setFormData((prev) => ({
            ...prev,
            contactName: profileData?.full_name || prev.contactName,
            contactEmail: currentUser.email!,
        }));

        // 2. Fetch Exhibitor Profile Data
        const { data: exhibitorProfile } = await supabase
            .from('exhibitor_profiles')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        if (exhibitorProfile) {
            setHasExistingProfile(true);
            setIsApproved(exhibitorProfile.is_approved);
            setStep(0); // Show Status Card
            
            setFormData((prev) => ({
                ...prev,
                companyName: exhibitorProfile.company_name || '',
                companyWebsite: exhibitorProfile.company_website || '',
                contactPhone: exhibitorProfile.contact_phone || '',
                boothType: exhibitorProfile.booth_type || '',
                companyDescription: exhibitorProfile.company_description || '',
                companyLogoUrl: exhibitorProfile.company_logo_url,
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
            companyName: "", companyWebsite: "", contactName: "",
            contactEmail: "", contactPhone: "", boothType: "",
            companyDescription: "", companyLogo: null, companyLogoUrl: null,
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
                approvedDesc: "Your exhibitor application is approved! We will be in touch with the next steps.",
                viewDetails: "Your Application Details (Read-Only)",
            },
            validation: {
                logo: "A company logo is required to submit.",
            },
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
                approvedDesc: "تمت الموافقة على طلبك كعارض! سنتواصل معك لإبلاغك بالخطوات التالية.",
                viewDetails: "تفاصيل طلبك (للقراءة فقط)",
            },
            validation: {
                logo: "شعار الشركة مطلوب للإرسال.",
            },
        },
    };
    return translations[language] as Translations;
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
        companyLogo: file,
      }))
    }
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

    let finalLogoUrl = formData.companyLogoUrl;

    try {
        if (formData.companyLogo) {
            finalLogoUrl = await uploadFile(formData.companyLogo, user.id, 'company_logos');
        } else if (!finalLogoUrl) {
            throw new Error(t.validation.logo);
        }

        const profileData: Omit<ExhibitorProfileData, 'is_approved'> = {
            company_name: formData.companyName,
            company_website: formData.companyWebsite,
            contact_phone: formData.contactPhone,
            booth_type: formData.boothType,
            company_description: formData.companyDescription,
            company_logo_url: finalLogoUrl,
        };

        let error;
        if (hasExistingProfile) {
            const result = await supabase
                .from('exhibitor_profiles')
                .update(profileData)
                .eq('user_id', user.id);
            error = result.error;
        } else {
            const result = await supabase
                .from('exhibitor_profiles')
                .insert({ user_id: user.id, ...profileData, is_approved: false });
            error = result.error;
        }

        if (error) throw error;

        alert(hasExistingProfile ? "Application updated!" : "Application submitted!");
        setHasExistingProfile(true); 
        setFormData(prev => ({ ...prev, companyLogoUrl: finalLogoUrl }));
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
    
    if (hasExistingProfile && step === 0) {
        return (
            <ExhibitorStatusView
                t={t}
                isApproved={isApproved}
                formData={formData}
                setStep={setStep}
                canEdit={!isApproved}
            />
        );
    }

    if (step === 1) {
        return (
            <ExhibitorFormView
                t={t}
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileUpload={handleFileUpload}
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

interface ExhibitorFormViewProps {
    t: Translations;
    formData: ExhibitorFormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    hasExistingProfile: boolean;
    isApproved: boolean;
}

const ExhibitorFormView: React.FC<ExhibitorFormViewProps> = ({ 
    t, formData, handleInputChange, handleFileUpload, handleSubmit, hasExistingProfile, isApproved 
}) => {
    return (
        <>
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 md:p-10 animate-slideInUp">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.formTitle}</h2>

                {[
                    { label: t.companyName, name: "companyName", type: "text", placeholder: t.placeholder.companyName, required: true, disabled: isApproved },
                    { label: t.companyWebsite, name: "companyWebsite", type: "url", placeholder: t.placeholder.companyWebsite, required: true, disabled: isApproved },
                    { label: t.contactName, name: "contactName", type: "text", placeholder: t.placeholder.contactName, required: true, disabled: true },
                    { label: t.contactEmail, name: "contactEmail", type: "email", placeholder: t.placeholder.contactEmail, required: true, disabled: true },
                    { label: t.contactPhone, name: "contactPhone", type: "tel", placeholder: t.placeholder.contactPhone, required: true, disabled: isApproved },
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
                    className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors ${field.disabled || isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                    required={field.required}
                    disabled={field.disabled || isApproved}
                    />
                </div>
                ))}

                {/* Booth Type */}
                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.boothType} <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="boothType"
                        value={formData.boothType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isApproved}
                    >
                        <option value="">Select a booth package</option>
                        {t.boothOptions.map((opt: string) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Company Description */}
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
                        className={`w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#013371] focus:outline-none bg-white hover:border-slate-300 transition-colors resize-none ${isApproved ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                        required
                        disabled={isApproved}
                    />
                    <p className="text-xs text-slate-500 mt-1">{formData.companyDescription.length}/150</p>
                </div>

                {/* Company Logo Upload */}
                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {t.companyLogo} {formData.companyLogoUrl ? "(Optional Update)" : <span className="text-red-500">*</span>}
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${isApproved ? 'border-slate-200 bg-slate-50' : 'border-slate-300 hover:border-[#013371] hover:bg-blue-50 cursor-pointer'}`}>
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
                            <Store className="w-8 h-8 text-[#013371] mx-auto mb-2" />
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
                        className="w-full px-6 py-3 bg-[#013371] text-white rounded-lg font-semibold hover:bg-[#024fa3] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        disabled={isApproved}
                    >
                        {hasExistingProfile ? t.update : t.submit} {hasExistingProfile && <Save className="w-4 h-4"/>}
                    </button>
                </div>
            </form>
            </div>

            <div
            className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 animate-slideInUp"
            style={{ animationDelay: "200ms" }}
            >
            <p className="font-semibold text-slate-900 mb-2">{t.whatNext}</p>
            <p className="text-slate-600">{t.nextDesc}</p>
            </div>
        </>
    );
};

interface ExhibitorStatusViewProps {
    t: Translations;
    isApproved: boolean;
    formData: ExhibitorFormData;
    setStep: Dispatch<SetStateAction<number>>;
    canEdit: boolean; 
}

const ExhibitorStatusView: React.FC<ExhibitorStatusViewProps> = ({ t, isApproved, formData, setStep, canEdit }) => {
    const statusColor = isApproved ? "bg-green-50 border-green-300 text-green-700" : "bg-yellow-50 border-yellow-300 text-yellow-700";
    const statusIcon = isApproved ? <CheckCircle2 className="w-8 h-8" /> : <TrendingUp className="w-8 h-8"/>;
    const statusTitle = isApproved ? t.status.approved : t.status.pending;
    const statusDesc = isApproved ? t.status.approvedDesc : t.status.notApprovedDesc;

    const readOnlyFields = [
        { label: t.companyName, value: formData.companyName },
        { label: t.boothType, value: formData.boothType },
        { label: t.contactName, value: formData.contactName },
        { label: t.contactEmail, value: formData.contactEmail },
        { label: t.contactPhone, value: formData.contactPhone },
        { label: t.companyWebsite, value: formData.companyWebsite, link: true },
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
                        <p className="font-semibold text-slate-500 mb-1 text-sm">{t.companyLogo}:</p>
                        <img 
                            src={formData.companyLogoUrl || '/default-logo.png'} 
                            alt="Company Logo" 
                            className="w-32 h-32 rounded-lg object-contain border border-slate-200 p-2 bg-white"
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
                                        className="text-[#013371] hover:underline break-words"
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
                            <p className="font-semibold text-slate-500 mb-1">{t.companyDescription}:</p>
                            <p className="text-slate-900 font-medium whitespace-pre-wrap">{formData.companyDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};