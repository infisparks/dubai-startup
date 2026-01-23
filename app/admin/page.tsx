// @/app/admin/dashboard/page.tsx
"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Mic, Store, Stethoscope, Briefcase, Settings, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the structure for the navigation cards
const dashboardLinks = [
    {
        title: "Investor Profiles",
        description: "Review, approve, and manage applications from potential investors.",
        icon: Users,
        href: "/admin/investor",
        color: "bg-blue-600",
    },
    {
        title: "Speaker Applications",
        description: "Curate, edit, and approve session proposals and speaker bios.",
        icon: Mic,
        href: "/admin/speaker",
        color: "bg-purple-600",
    },
    {
        title: "Exhibitor Applications",
        description: "Process booth reservations, approve company logos, and manage exhibitor details.",
        icon: Store,
        href: "/admin/exhibator",
        color: "bg-yellow-600",
    },
    {
        title: "Start Up",
        description: "Access and audit the startups and financial records for summit services.",
        icon: Stethoscope,
        href: "/admin/startup",
        color: "bg-green-600",
    },
    {
        title: "Pitching Applications",
        description: "Process pitching applications for the 10-minute presentation slots.",
        icon: Mic,
        href: "/admin/pitching",
        color: "bg-red-600",
    },
    {
        title: "Platform Users",
        description: "View and manage all registered users on the platform.",
        icon: Users,
        href: "/admin/users",
        color: "bg-slate-700",
    },
    {
        title: "Visitor Management",
        description: "Manage visitor registrations, ticket types, and payment statuses.",
        icon: Ticket,
        href: "/admin/visitor",
        color: "bg-orange-600",
    },
];

export default function AdminLandingPage() {

    return (
        <div className="p-6 lg:p-10 min-h-screen bg-gray-50">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
                    <Briefcase className="w-9 h-9 text-[#013371]" /> Central Admin Panel
                </h1>
                <p className="text-lg text-slate-600">Select a management area to begin reviewing and processing applications/data.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dashboardLinks.map((link) => (
                    <Link key={link.href} href={link.href} passHref>
                        <Card className="shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer h-full">
                            <CardHeader className="pb-0">
                                <div className="flex items-center justify-between">
                                    <link.icon className={`w-8 h-8 p-1 rounded-md text-white ${link.color}`} />
                                    <ArrowRight className="w-5 h-5 text-slate-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                                    {link.title}
                                </CardTitle>
                                <p className="text-sm text-slate-600 mb-4">
                                    {link.description}
                                </p>
                                <Button variant="link" className="p-0 text-md text-[#013371] hover:text-[#024fa3]">
                                    Go to Dashboard →
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}