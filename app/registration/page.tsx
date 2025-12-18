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
                // subtitle: "Join the Investarise ecosystem. Choose your role to get started.",
                subtitle: "Registration starts from 20 Dec 2025",
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
        <div className="min-h-screen flex flex-col bg-white">
            <Header
                language={language}
                setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>}
                userEmail={session?.user?.email} // Pass user email if available
            />

            <main className="flex-1 pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12 text-center animate-fadeIn">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{t.title}</h1>
                        <p className="text-lg text-slate-600">{t.subtitle}</p>
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
                                    <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-lg p-8 h-full transition-all hover:border-[#013371] hover:shadow-2xl hover:scale-[1.02]">
                                        <div className="w-14 h-14 bg-[#013371] text-white flex items-center justify-center rounded-full mb-5">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 mb-3">{option.title}</h2>
                                        <p className="text-slate-600 mb-6">{option.desc}</p>
                                        <div className="flex items-center text-lg font-semibold text-[#013371] group-hover:underline">
                                            {option.cta}
                                            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
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