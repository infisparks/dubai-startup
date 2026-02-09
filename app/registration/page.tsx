// app/registration/page.tsx
"use client"

import type React from "react"
import { useState, useMemo, Dispatch, SetStateAction } from "react"
import Link from "next/link"
import Header from "@/components/header" // Assuming path
import Footer from "@/components/footer" // Assuming path
import { ArrowRight, Rocket, Briefcase, Mic, Store, Ticket } from "lucide-react"
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
    pitching: {
        title: string;
        desc: string;
        cta: string;
    };
    visitor: {
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
                exhibitor: {
                    title: "Exhibitor Registration",
                    desc: "Showcase your product or service to a targeted audience.",
                    cta: "Register as an Exhibitor",
                },
                pitching: {
                    title: "Startup Pitching",
                    desc: "Apply for a  presentation slot to showcase your startup.",
                    cta: "Register to Pitch",
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
                visitor: {
                    title: "Visitor Registration",
                    desc: "Join as a visitor to network and experience the summit. Choose from Standard ($250) or Premium ($500) access.",
                    cta: "Register as a Visitor",
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
                pitching: {
                    title: "عرض الشركة الناشئة",
                    desc: "تقدم بطلب للحصول على فتحة عرض مدتها 10 دقائق لعرض شركتك الناشئة. الرسوم: 2500 دولار.",
                    cta: "سجل للعرض",
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
                visitor: {
                    title: "تسجيل الزوار",
                    desc: "انضم كزائر للتواصل وتجربة القمة. اختر من بين الوصول القياسي أو الوصول المميز لكبار الشخصيات.",
                    cta: "سجل كزائر",
                },
            },
        };
        return translations[language];
    }, [language]);

    const registrationOptions = [
        {
            icon: Ticket,
            title: t.visitor.title,
            desc: t.visitor.desc,
            cta: t.visitor.cta,
            href: "/visitor-form",
        },
        {
            icon: Rocket,
            title: t.startup.title,
            desc: t.startup.desc,
            cta: t.startup.cta,
            href: "/founder-form",
        },
        {
            icon: Rocket, // Using Rocket icon again or can find another one
            title: t.pitching.title,
            desc: t.pitching.desc,
            cta: t.pitching.cta,
            href: "/pitching-form",
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
                    <div className="mb-8 text-center animate-fadeIn space-y-2">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                            {t.title}
                        </h1>
                        <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed shadow-sm">
                            {t.subtitle}
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#034FA3] to-[#023c7a] rounded-full mx-auto mt-4 shadow-lg shadow-[#034FA3]/50"></div>
                    </div>

                    {/* Registration Cards Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 animate-slideInUp">
                        {registrationOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <Link
                                    href={option.href}
                                    key={option.title}
                                    className="group block"
                                >
                                    <div className="h-full bg-white/10 backdrop-blur-md border border-white/5 rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/15 hover:border-[#034FA3]/30 hover:shadow-2xl hover:shadow-[#034FA3]/10 flex flex-col items-start relative overflow-hidden">

                                        {/* Decorative Gradient Blob */}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#034FA3]/20 rounded-full blur-[40px] -mr-8 -mt-8 pointer-events-none group-hover:bg-[#034FA3]/30 transition-colors"></div>

                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#034FA3] to-[#023c7a] text-white flex items-center justify-center rounded-lg mb-3 shadow-lg shadow-[#034FA3]/25 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>

                                        <h2 className="text-lg md:text-xl font-bold text-white mb-2 tracking-wide leading-tight">{option.title}</h2>
                                        <p className="text-gray-300 text-xs md:text-sm mb-4 leading-relaxed flex-grow line-clamp-2 md:line-clamp-none">{option.desc}</p>

                                        <div className="flex items-center text-[10px] md:text-xs font-bold text-[#034FA3] uppercase tracking-wider group-hover:text-blue-400 transition-colors mt-auto">
                                            {option.cta}
                                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
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