"use client"

import React, { useState, useEffect, useRef } from 'react'
import { supabase } from "@/lib/supabaseConfig"
import {
    Scan, User, Search, CheckCircle, XCircle, Clock,
    CreditCard, Building, Mic, Briefcase, Award,
    AlertTriangle, Loader2, Camera, X
} from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Session } from "@supabase/supabase-js"
import { Html5QrcodeScanner } from "html5-qrcode"

// --- Types ---

interface ScanResult {
    profile: {
        id: string;
        full_name: string | null;
        email: string | null;
        avatar_url: string | null;
        is_investor: boolean;
        is_speaker: boolean;
        is_startup: boolean;
        is_exhibitor: boolean;
    };
    founderDetails?: {
        company_name: string;
        payment_status: string;
        is_gala: boolean | null;
        stripe_session_id: string | null;
    } | null;
    exhibitorDetails?: {
        company_name: string;
        payment_status: string;
        booth_type: string;
        stripe_session_id: string | null;
    } | null;
    investorDetails?: {
        investment_type: string;
        investment_amount: string;
    } | null;
    verifiedAt: Date;
}

export default function ScannerPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en");
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<ScanResult | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isCameraActive, setIsCameraActive] = useState(false)

    // Focus input on load for "keyboard wedge" scanners
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        // Get session
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };
        getSession();
    }, []);

    // Cleanup scanner when component unmounts or camera is closed
    useEffect(() => {
        if (!isCameraActive) {
            const element = document.getElementById('reader');
            if (element) element.innerHTML = '';
            return;
        }

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );

        scanner.render(onScanSuccess, onScanFailure);

        function onScanSuccess(decodedText: string, decodedResult: any) {
            // Handle the scanned code as you like, for example:
            console.log(`Code matched = ${decodedText}`, decodedResult);
            setSearchTerm(decodedText);

            // Trigger search immediately
            handleSearch(undefined, decodedText); // Pass it directly to avoid state lag

            // Close camera after successful scan
            scanner.clear();
            setIsCameraActive(false);
        }

        function onScanFailure(error: any) {
            // handle scan failure, usually better to ignore and keep scanning.
            // console.warn(`Code scan error = ${error}`);
        }

        return () => {
            scanner.clear().catch(error => {
                // Ignore clear errors
            });
        };
    }, [isCameraActive]);

    const handleSearch = async (e?: React.FormEvent, overrideTerm?: string) => {
        if (e) e.preventDefault();

        const term = (overrideTerm || searchTerm).trim();
        if (!term) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // 1. Fetch Basic Profile
            // We search by ID first (as UUID is the most likely barcode content)
            // Fallback search by email if UUID is invalid format could be added, but prompt implies ID card scanner.

            let query = supabase.from('profiles').select('*');

            // Basic UUID validation or loose search
            if (term.includes('@')) {
                query = query.eq('email', term);
            } else {
                query = query.eq('id', term);
            }

            const { data: profileData, error: profileError } = await query.single();

            if (profileError || !profileData) {
                // Try searching strictly by ID if first attempt failed (helps if email check was mistakenly triggered)
                // Or inform user.
                throw new Error("User not found. Please check the ID or Email.");
            }

            const userId = profileData.id;
            const res: ScanResult = {
                profile: profileData,
                verifiedAt: new Date(),
                founderDetails: null,
                exhibitorDetails: null,
                investorDetails: null
            };

            // 2. Fetch Detailed Roles
            const queries = [];

            // Founder / Startup
            if (profileData.is_startup) {
                queries.push(
                    supabase.from('founder_profiles')
                        .select('company_name, payment_status, is_gala, stripe_session_id')
                        .eq('user_id', userId)
                        .single()
                        .then(({ data }) => { if (data) res.founderDetails = data; })
                );
            }

            // Exhibitor
            if (profileData.is_exhibitor) {
                queries.push(
                    supabase.from('exhibitor_profiles')
                        .select('company_name, payment_status, booth_type, stripe_session_id')
                        .eq('user_id', userId)
                        .single()
                        .then(({ data }) => { if (data) res.exhibitorDetails = data; })
                );
            }

            // Investor (just for extra context)
            if (profileData.is_investor) {
                queries.push(
                    supabase.from('investor_profiles')
                        .select('investment_type, investment_amount')
                        .eq('user_id', userId)
                        .single()
                        .then(({ data }) => { if (data) res.investorDetails = data; })
                );
            }

            await Promise.all(queries);
            setResult(res);
            setSearchTerm(""); // clear input for next scan (optional)

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
            setSearchTerm(""); // allow fast re-scan
        } finally {
            setLoading(false);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const StatusBadge = ({ status, label }: { status: string, label?: string }) => {
        const isPaid = status === 'paid';
        return (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isPaid ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                {isPaid ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <div className="flex flex-col leading-none">
                    <span className="text-xs font-bold uppercase">{label || "Payment Status"}</span>
                    <span className="text-sm font-semibold uppercase">{status || "UNPAID"}</span>
                </div>
            </div>
        )
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <Header language={language} setLanguage={setLanguage as React.Dispatch<React.SetStateAction<"en" | "ar">>} userEmail={session?.user?.email} />

            <main className="flex-1 flex flex-col items-center pt-24 pb-12 px-4 sm:px-6">

                {/* --- Scanner Header --- */}
                <div className="text-center mb-10 max-w-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white mb-6 shadow-xl shadow-indigo-200">
                        <Scan className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                        Attendee Scanner
                    </h1>
                    <p className="text-lg text-slate-600">
                        Scan ID Card QR Code or enter User ID to verify details, payment status, and gala access.
                    </p>
                </div>

                {/* --- Camera Area (Conditionally Rendered) --- */}
                {isCameraActive && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
                        <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden relative">
                            <div className="p-4 bg-slate-100 flex justify-between items-center border-b">
                                <h3 className="font-bold text-slate-800">Scan QR Code</h3>
                                <button onClick={() => setIsCameraActive(false)} className="p-2 bg-slate-200 rounded-full hover:bg-slate-300">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div id="reader" className="w-full h-[400px]"></div>
                            <div className="p-4 text-center text-sm text-slate-500">
                                Point your camera at the QR code
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Scan Input Area --- */}
                <div className="w-full max-w-xl mx-auto mb-10">
                    <form onSubmit={(e) => handleSearch(e)} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Scan className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 rounded-2xl text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50/50 transition-all font-mono"
                            placeholder="Type ID or use Scanner..."
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={() => setIsCameraActive(true)}
                            className="absolute right-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition flex items-center gap-2 top-2 bottom-2"
                        >
                            <Camera className="w-4 h-4" />
                            CAMERA
                        </button>
                    </form>

                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={(e) => handleSearch(e)}
                            disabled={loading || !searchTerm}
                            className={`w-full max-w-xs px-6 py-3 rounded-xl font-bold text-white transition-all shadow-md ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95'} flex items-center justify-center gap-2`}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "VERIFY NOW"}
                        </button>
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Ready for Manual Entry, USB Scanner, or Camera
                    </p>
                </div>

                {/* --- Results Section --- */}
                <div className="w-full max-w-4xl mx-auto space-y-6">

                    {error && (
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4">
                            <XCircle className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-lg font-bold text-blue-900">Verification Failed</h3>
                                <p className="text-blue-700 mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {result && (
                        <div className="bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden animate-in zoom-in-95 duration-300">

                            {/* Card Header: User Identity */}
                            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
                                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center text-4xl font-bold shadow-inner">
                                        {result.profile.full_name?.charAt(0).toUpperCase() || <User className="w-12 h-12" />}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-extrabold mb-1">{result.profile.full_name || "Unknown Name"}</h2>
                                        <p className="text-slate-300 font-mono text-sm mb-4">ID: {result.profile.id}</p>
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                            {result.profile.is_startup && <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">Startup Founder</span>}
                                            {result.profile.is_exhibitor && <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-200 text-xs font-bold uppercase tracking-wider">Exhibitor</span>}
                                            {result.profile.is_investor && <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">Investor</span>}
                                            {result.profile.is_speaker && <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider">Speaker</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center md:items-end gap-1">
                                        <div className="px-4 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg shadow-green-900/20">
                                            <CheckCircle className="w-3 h-3" /> VERIFIED VALID
                                        </div>
                                        <span className="text-xs text-slate-400 font-mono">
                                            {result.verifiedAt.toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body: Details */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">

                                {/* 1. FOUNDER / STARTUP DETAILS */}
                                {result.profile.is_startup && (
                                    <div className={`space-y-4 rounded-xl p-5 border ${result.founderDetails?.payment_status === 'paid' ? 'bg-slate-50 border-slate-200' : 'bg-blue-50 border-blue-200'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Building className="w-5 h-5 text-blue-600" />
                                            <h3 className="text-lg font-bold text-slate-800">Founder Details</h3>
                                        </div>

                                        {result.founderDetails ? (
                                            <>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-slate-500 font-medium">Company Name</p>
                                                    <p className="text-lg font-bold text-slate-900">{result.founderDetails.company_name}</p>
                                                </div>

                                                <div className="pt-3 border-t border-slate-200/50">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="text-sm text-slate-500 font-bold">Participation Payment</span>
                                                        <StatusBadge status={result.founderDetails.payment_status} />
                                                    </div>

                                                    <div className="bg-white rounded-lg p-3 border border-slate-200 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${result.founderDetails.is_gala ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                                                                <Award className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-slate-900">Gala Dinner Access</p>
                                                                <p className="text-xs text-slate-500">{result.founderDetails.is_gala ? "Included & Approved" : "Not Included"}</p>
                                                            </div>
                                                        </div>
                                                        {result.founderDetails.is_gala ? (
                                                            <CheckCircle className="w-6 h-6 text-purple-600" />
                                                        ) : (
                                                            <span className="text-xs font-bold text-slate-400 px-2 py-1 bg-slate-100 rounded">NO ACCESS</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-sm text-blue-500 italic">Startup profile data missing.</p>
                                        )}
                                    </div>
                                )}

                                {/* 2. EXHIBITOR DETAILS */}
                                {result.profile.is_exhibitor && (
                                    <div className="space-y-4 bg-slate-50 rounded-xl p-5 border border-slate-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <StoreInfo className="w-5 h-5 text-orange-600" />
                                            <h3 className="text-lg font-bold text-slate-800">Exhibitor Details</h3>
                                        </div>

                                        {result.exhibitorDetails ? (
                                            <>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-slate-500 font-medium">Company Name</p>
                                                    <p className="text-lg font-bold text-slate-900">{result.exhibitorDetails.company_name}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-slate-500 font-medium">Booth Type</p>
                                                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded">
                                                        {result.exhibitorDetails.booth_type || "Not Selected"}
                                                    </span>
                                                </div>

                                                <div className="pt-3 border-t border-slate-200/50 flex justify-between items-center">
                                                    <span className="text-sm text-slate-500 font-bold">Booth Payment</span>
                                                    <StatusBadge status={result.exhibitorDetails.payment_status} />
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-sm text-blue-500 italic">Exhibitor profile data missing.</p>
                                        )}
                                    </div>
                                )}

                            </div>

                            {/* Card Footer: Access Status */}
                            <div className={`p-4 text-center border-t ${(result.founderDetails?.payment_status === 'paid' || result.exhibitorDetails?.payment_status === 'paid' || result.profile.is_investor || result.profile.is_speaker)
                                ? 'bg-green-600 text-white'
                                : 'bg-slate-100 text-slate-500'
                                }`}>
                                <h3 className="text-lg font-bold uppercase tracking-widest">
                                    {(result.founderDetails?.payment_status === 'paid' || result.exhibitorDetails?.payment_status === 'paid' || result.profile.is_investor || result.profile.is_speaker)
                                        ? "ACCESS GRANTED"
                                        : "CHECK PAYMENT STATUS"}
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer language={language} />
        </div>
    )
}

function StoreInfo({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
            <path d="M2 7h20" />
            <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
        </svg>
    )
}
