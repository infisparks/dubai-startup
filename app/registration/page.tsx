// app/registration/page.tsx
"use client"

import type React from "react"
import { useState, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link"
import Header from "@/components/header" // Assuming path
import Footer from "@/components/footer" // Assuming path
import { ArrowRight, Rocket, Briefcase, Mic, Store } from "lucide-react"
import { Session } from "@supabase/supabase-js" // For header prop if needed

// Define a simple translations type for this page
type Translations = {
    title: string;
    subtitle: string;
    startup: {
        title: string;
        desc: string;
        cta: string;
    };
    investor: {
        title: string;
        desc: string;
        cta: string;
    };
    speaker: {
        title: string;
        desc: string;
        cta: string;
    };
    exhibitor: {
        title: string;
        desc: string;
        cta: string;
    };
};

export default function RegistrationSelectionPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en");
    const [session, setSession] = useState<Session | null>(null); // Example, adapt as needed

    const t = useMemo((): Translations => {
        const translations = {
            en: {
                title: "Register Your Interest",
                subtitle: "Join the Investarise ecosystem. Choose your role to get started.",
                // subtitle: "Registration starts from 20 Dec 2025",
                startup: {
                    title: "Startup Registration",
                    desc: "Apply for funding, gain visibility, and connect with investors.",
                    cta: "Apply as a Startup",
                },
                investor: {
                    title: "Investor Registration",
                    desc: "Access our network of vetted startups and investment opportunities.",
                    cta: "Register as an Investor",
                },
                speaker: {
                    title: "Speaker Registration",
                    desc: "Share your insights. Apply to be a speaker at our next event.",
                    cta: "Apply as a Speaker",
                },
                exhibitor: {
                    title: "Exhibitor Registration",
                    desc: "Showcase your product or service to a targeted audience.",
                    cta: "Register as an Exhibitor",
                },
            },
            ar: {
                title: "سجل اهتمامك",
                subtitle: "انضم إلى نظام Investarise. اختر دورك للبدء.",
                startup: {
                    title: "تسجيل شركة ناشئة",
                    desc: "تقدم بطلب للحصول على تمويل واكتسب الظهور وتواصل مع المستثمرين.",
                    cta: "قدم كشركة ناشئة",
                },
                investor: {
                    title: "تسجيل مستثمر",
                    desc: "اطلع على شبكتنا من الشركات الناشئة المعتمدة وفرص الاستثمار.",
                    cta: "سجل كمستثمر",
                },
                speaker: {
                    title: "تسجيل متحدث",
                    desc: "شارك برؤاك. قدم لتكون متحدثًا في حدثنا القادم.",
                    cta: "قدم كمتحدث",
                },
                exhibitor: {
                    title: "تسجيل عارض",
                    desc: "اعرض منتجك أو خدمتك أمام جمهور مستهدف.",
                    cta: "سجل كعارض",
                },
            },
        };
        return translations[language];
    }, [language]);

    const registrationOptions = [
        {
            icon: Rocket,
            title: t.startup.title,
            desc: t.startup.desc,
            cta: t.startup.cta,
            href: "/founder-form",
        },
        {
            icon: Briefcase,
            title: t.investor.title,
            desc: t.investor.desc,
            cta: t.investor.cta,
            href: "/investor-form",
        },
        {
            icon: Mic,
            title: t.speaker.title,
            desc: t.speaker.desc,
            cta: t.speaker.cta,
            href: "/speaker-form",
        },
        {
            icon: Store,
            title: t.exhibitor.title,
            desc: t.exhibitor.desc,
            cta: t.exhibitor.cta,
            href: "/exhibitor-form",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col relative bg-slate-900">
            {/* Background Image with Overlay */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: 'url(/taj.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>

            <Header
                language={language}
                setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>}
                userEmail={session?.user?.email}
            />

            <main className="relative z-10 flex-1 pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Header Section */}
                    <div className="mb-12 text-center animate-fadeIn space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            {t.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            {t.subtitle}
                        </p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-[#bf1e2e] to-[#940200] rounded-full mx-auto mt-6 shadow-lg shadow-[#bf1e2e]/50"></div>
                    </div>

                    {/* Registration Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 animate-slideInUp">
                        {registrationOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <Link
                                    href={option.href}
                                    key={option.title}
                                    className="group block"
                                >
                                    <div className="h-full bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:bg-white/15 hover:border-[#bf1e2e]/30 hover:shadow-2xl hover:shadow-[#bf1e2e]/10 flex flex-col items-start relative overflow-hidden">

                                        {/* Decorative Gradient Blob */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#bf1e2e]/20 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none group-hover:bg-[#bf1e2e]/30 transition-colors"></div>

                                        <div className="w-14 h-14 bg-gradient-to-br from-[#bf1e2e] to-[#940200] text-white flex items-center justify-center rounded-xl mb-6 shadow-lg shadow-[#bf1e2e]/25 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-7 h-7" />
                                        </div>

                                        <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">{option.title}</h2>
                                        <p className="text-gray-300 mb-8 leading-relaxed flex-grow">{option.desc}</p>

                                        <div className="flex items-center text-sm font-bold text-[#bf1e2e] uppercase tracking-wider group-hover:text-red-400 transition-colors mt-auto">
                                            {option.cta}
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer language={language} />
        </div>
    );
}