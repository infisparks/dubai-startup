"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction, useRef } from "react"
import { Session, User as SupabaseUser } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthPopup from "@/components/AuthPopup"
import EmailVerificationNotice from "@/components/EmailVerificationNotice"
import { CheckCircle2, LogIn, Edit, Save, Lock, TrendingUp, CreditCard, Download, Ticket, User, Mail, Phone, Calendar, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabaseConfig"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import html2canvas from "html2canvas"
import QRCode from "react-qr-code"

const API_URL = "https://pay.infispark.in";

interface VisitorFormData {
    fullName: string;
    email: string;
    phone: string;
    ticketType: 'standard' | 'premium' | '';
}

type Translations = {
    title: string;
    subtitle: string;
    formTitle: string;
    fullName: string;
    email: string;
    phone: string;
    ticketType: string;
    standardTitle: string;
    standardDesc: string;
    premiumTitle: string;
    premiumDesc: string;
    submit: string;
    update: string;
    loginRequired: string;
    loginRequiredDesc: string;
    login: string;
    status: any;
    thankYou: any;
};

export default function VisitorFormPage() {
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const [loadingSession, setLoadingSession] = useState(true)
    const [loadingData, setLoadingData] = useState(false)
    const [showAuthPopup, setShowAuthPopup] = useState(false)
    const [needsVerification, setNeedsVerification] = useState(false)
    const [hasExistingProfile, setHasExistingProfile] = useState(false)
    const [showThankYouPopup, setShowThankYouPopup] = useState(false)

    // Status States
    const [paymentStatus, setPaymentStatus] = useState<string>('unpaid')
    const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null)
    const [paidAt, setPaidAt] = useState<string | null>(null)

    const [step, setStep] = useState(1)
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const [formData, setFormData] = useState<VisitorFormData>({
        fullName: "",
        email: "",
        phone: "",
        ticketType: "standard",
    })

    const fetchUserData = useCallback(async (currentUser: SupabaseUser) => {
        setLoadingData(true);

        const { data: profileData } = await supabase.from('profiles').select('full_name').eq('id', currentUser.id).single();

        setFormData((prev) => ({
            ...prev,
            fullName: profileData?.full_name || prev.fullName,
            email: currentUser.email!,
        }));

        const { data: visitorProfile } = await supabase
            .from('visitor_profiles')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();

        if (visitorProfile) {
            setHasExistingProfile(true);
            setPaymentStatus(visitorProfile.payment_status || 'unpaid');
            setPaymentSessionId(visitorProfile.stripe_session_id || null);
            setPaidAt(visitorProfile.paid_at || null);
            setStep(0);

            setFormData((prev) => ({
                ...prev,
                fullName: visitorProfile.full_name || '',
                email: visitorProfile.email || currentUser.email!,
                phone: visitorProfile.phone || '',
                ticketType: visitorProfile.ticket_type as 'standard' | 'premium',
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
                    setPaymentStatus('unpaid');
                    setStep(1);
                    setFormData({ fullName: "", email: "", phone: "", ticketType: "" });
                }
            },
        )
        return () => authListener.subscription.unsubscribe();
    }, [fetchUserData])

    const t = useMemo(() => {
        const translations = {
            en: {
                title: "Visitor Registration",
                subtitle: "Experience the future of innovation in Dubai",
                formTitle: "Visitor Details",
                fullName: "Full Name",
                email: "Email Address",
                phone: "Phone Number",
                ticketType: "Access Pass",
                standardTitle: "Standard Access Pass ($500)",
                standardDesc: "Includes Full Day Event Access",
                submit: "Confirm & Proceed to Payment",
                update: "Update Registration",
                loginRequired: "Login Required",
                loginRequiredDesc: "Please login or sign up to register as a visitor.",
                login: "Login / Sign Up",
                status: {
                    title: "Registration Status",
                    pending: "Payment Pending",
                    paid: "Registration Confirmed",
                    pendingDesc: "Your registration is almost complete. Please proceed with payment.",
                    paidDesc: "Your registration is confirmed! Download your Visitor Pass below.",
                    viewDetails: "Registration Details",
                },
                thankYou: {
                    title: "Registration Received!",
                    message: "Thank you for registering as a visitor.",
                    subMessage: "Please complete the payment to receive your digital entry pass.",
                    close: "Close"
                }
            },
            ar: {
                title: "تسجيل الزوار",
                subtitle: "اختبر مستقبل الابتكار في دبي",
                formTitle: "تفاصيل الزائر",
                fullName: "الاسم الكامل",
                email: "البريد الإلكتروني",
                phone: "رقم الهاتف",
                ticketType: "تذكرة الدخول",
                standardTitle: "تذكرة دخول قياسية ($500)",
                standardDesc: "تشمل دخول الحدث طوال اليوم",
                submit: "تأكيد ومتابعة الدفع",
                update: "تحديث التسجيل",
                loginRequired: "تسجيل الدخول مطلوب",
                loginRequiredDesc: "يرجى تسجيل الدخول أو إنشاء حساب للتسجيل كزائر.",
                login: "تسجيل الدخول / إنشاء حساب",
                status: {
                    title: "حالة التسجيل",
                    pending: "في انتظار الدفع",
                    paid: "تم تأكيد التسجيل",
                    pendingDesc: "تسجيلك شبه مكتمل. يرجى المتابعة للدفع.",
                    paidDesc: "تم تأكيد تسجيلك! قم بتنزيل بطاقة الزائر الخاصة بك أدناه.",
                    viewDetails: "تفاصيل التسجيل",
                },
                thankYou: {
                    title: "تم استلام التسجيل!",
                    message: "شكراً لتسجيلك كزائر.",
                    subMessage: "يرجى إكمال عملية الدفع للحصول على بطاقة الدخول الرقمية الخاصة بك.",
                    close: "إغلاق"
                }
            },
        };
        return translations[language];
    }, [language]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDataSubmission = async () => {
        if (!user) return setShowAuthPopup(true);
        if (!formData.ticketType) return alert("Please select a ticket type.");
        if (!formData.fullName || !formData.phone) return alert("Please fill in all fields.");

        setLoadingData(true);

        try {
            const visitorData = {
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                ticket_type: formData.ticketType,
                is_approved: true,
            };

            let error;
            if (hasExistingProfile) {
                const result = await supabase.from('visitor_profiles').update(visitorData).eq('user_id', user.id);
                error = result.error;
            } else {
                const result = await supabase.from('visitor_profiles').insert({ user_id: user.id, ...visitorData });
                error = result.error;
            }

            if (error) throw error;

            setHasExistingProfile(true);
            setStep(0);
            setShowThankYouPopup(true);
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoadingData(false);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleDataSubmission();
    }

    const renderContent = () => {
        if (loadingSession || loadingData) return <div className="text-center py-20 animate-pulse text-slate-500">Loading...</div>;

        if (!user || needsVerification) {
            if (needsVerification) return <EmailVerificationNotice language={language} />;
            return (
                <div className="max-w-xl mx-auto mt-16 p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-xl">
                    <Lock className="w-12 h-12 text-[#740001] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.loginRequired}</h2>
                    <p className="text-slate-600 mb-6">{t.loginRequiredDesc}</p>
                    <button onClick={() => setShowAuthPopup(true)} className="px-8 py-3 bg-[#740001] text-white rounded-xl font-bold hover:bg-[#940200] transition-all flex items-center justify-center gap-2 mx-auto">
                        <LogIn className="w-5 h-5" /> {t.login}
                    </button>
                </div>
            );
        }

        if (hasExistingProfile && step === 0) {
            return (
                <VisitorStatusView
                    t={t}
                    paymentStatus={paymentStatus}
                    formData={formData}
                    setStep={setStep}
                    userId={user.id}
                    userEmail={user.email!}
                    paymentSessionId={paymentSessionId}
                    paidAt={paidAt}
                />
            );
        }

        return (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 md:p-10 animate-slideInUp">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <h2 className="text-2xl font-bold text-slate-900">{t.formTitle}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <User className="w-4 h-4 text-[#740001]" /> {t.fullName}
                            </label>
                            <input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#740001]/20 focus:border-[#740001] outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#740001]" /> {t.email}
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#740001]/20 focus:border-[#740001] outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#740001]" /> {t.phone}
                        </label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(val) => setFormData(prev => ({ ...prev, phone: val || "" }))}
                            defaultCountry="AE"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#740001]/20 focus-within:border-[#740001] transition-all [&>input]:outline-none [&>input]:bg-transparent"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-[#740001]" /> {t.ticketType}
                        </label>
                        <div className="p-4 rounded-2xl border-2 border-[#740001] bg-[#740001]/5 text-left">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-slate-900">{t.standardTitle}</span>
                                <CheckCircle2 className="w-5 h-5 text-[#740001]" />
                            </div>
                            <p className="text-xs text-slate-500">{t.standardDesc}</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-[#740001] text-white rounded-xl font-bold shadow-lg hover:bg-[#940200] transition-all flex items-center justify-center gap-2"
                    >
                        {hasExistingProfile ? t.update : t.submit} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header language={language} setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>} userEmail={user?.email} />
            <main className="flex-1 pt-32 pb-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{t.title}</h1>
                        <p className="text-lg text-slate-500">{t.subtitle}</p>
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

const VisitorStatusView: React.FC<any> = ({ t, paymentStatus, formData, setStep, userId, userEmail, paymentSessionId, paidAt }) => {
    const isPaid = paymentStatus === 'paid';
    const badgeRef = useRef<HTMLDivElement>(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    const handlePayNow = async () => {
        setProcessingPayment(true);
        try {
            const response = await fetch(`${API_URL}/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    email: userEmail,
                    companyName: formData.fullName,
                    type: 'visitor',
                    ticketType: formData.ticketType
                }),
            });
            const data = await response.json();
            if (data.url) window.location.href = data.url;
            else alert("Failed to initiate payment");
        } catch (error) {
            alert("Error connecting to payment server.");
        } finally {
            setProcessingPayment(false);
        }
    };

    const handleDownloadBadge = async () => {
        if (!badgeRef.current || !isPaid) return;
        try {
            const canvas = await html2canvas(badgeRef.current, { scale: 4, useCORS: true, allowTaint: true });
            const image = canvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");
            link.href = image;
            link.download = `Visitor-Pass-${formData.fullName.replace(/\s+/g, '-')}.png`;
            link.click();
        } catch (error) { console.error(error); }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className={`p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6 ${isPaid ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isPaid ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                    {isPaid ? <CheckCircle2 className="w-8 h-8" /> : <CreditCard className="w-8 h-8" />}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className={`text-2xl font-bold mb-1 ${isPaid ? 'text-green-800' : 'text-amber-800'}`}>{isPaid ? t.status.paid : t.status.pending}</h2>
                    <p className={`text-sm ${isPaid ? 'text-green-600' : 'text-amber-600'}`}>{isPaid ? t.status.paidDesc : t.status.pendingDesc}</p>
                </div>
                {!isPaid && (
                    <button
                        onClick={handlePayNow}
                        disabled={processingPayment}
                        className="w-full md:w-auto px-8 py-3 bg-[#740001] text-white rounded-xl font-bold hover:bg-[#940200] transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        {processingPayment ? "Redirecting..." : <><CreditCard className="w-5 h-5" /> Pay Now</>}
                    </button>
                )}
            </div>

            {isPaid && (
                <div className="flex flex-col items-center gap-4">
                    <div
                        ref={badgeRef}
                        onClick={handleDownloadBadge}
                        className="relative w-full max-w-[340px] cursor-pointer group"
                    >
                        {/* ID CARD UI */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ perspective: '1000px' }}>
                            <div className="relative h-[550px] bg-slate-900 border border-slate-700 flex flex-col">
                                {/* Header */}
                                <div className="p-8 text-center border-b border-slate-800">
                                    <h5 className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-2">Official Visitor Pass</h5>
                                    <h2 className="text-2xl font-black text-[#C5A059] leading-tight">INVESTARISE<br />GLOBAL</h2>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-[#C5A059] flex items-center justify-center mb-6 shadow-xl overflow-hidden">
                                        <Ticket className="w-12 h-12 text-[#C5A059]" />
                                    </div>
                                    <h1 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-tight">{formData.fullName}</h1>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest bg-white/5 py-2 px-4 rounded-full">{formData.ticketType} ACCESS</p>
                                </div>

                                {/* QR Footer */}
                                <div className="bg-white p-8 flex items-center justify-between border-t-4 border-[#C5A059]">
                                    <div className="text-left">
                                        <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Event Date</p>
                                        <p className="text-sm font-bold text-slate-900 mb-3">FEB 2026</p>
                                        <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Registration ID</p>
                                        <p className="text-[11px] font-mono font-bold text-slate-900">{userId.slice(0, 8).toUpperCase()}</p>
                                    </div>
                                    <div className="p-2 border border-slate-100 rounded-xl">
                                        <QRCode value={userId} size={70} />
                                    </div>
                                </div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                <div className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <Download className="w-5 h-5" /> Download Pass
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 italic">Click card to download high-resolution pass</p>
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">{t.status.viewDetails}</h3>
                    {!isPaid && <button onClick={() => setStep(1)} className="text-[#740001] text-sm font-bold flex items-center gap-1 hover:underline"><Edit className="w-4 h-4" /> Edit Details</button>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Pass Type</p>
                        <p className="text-slate-900 font-bold capitalize">{formData.ticketType} Access</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Phone</p>
                        <p className="text-slate-900 font-bold">{formData.phone}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Access Inclusions</p>
                        <p className="text-slate-600 text-sm leading-relaxed">Full Day Event Access</p>
                    </div>
                    {isPaid && paidAt && (
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Paid On</p>
                            <p className="text-slate-900 font-bold">{new Date(paidAt).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ThankYouPopup = ({ onClose, t }: { onClose: () => void, t: any }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-bounceIn">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.thankYou.title}</h2>
            <p className="text-slate-600 mb-8">{t.thankYou.message}</p>
            <button
                onClick={onClose}
                className="w-full py-3 bg-[#740001] text-white rounded-xl font-bold shadow-lg hover:bg-[#940200] transition-all"
            >
                {t.thankYou.close}
            </button>
        </div>
    </div>
);
