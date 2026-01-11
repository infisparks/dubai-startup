"use client"

import { useState, useEffect, useMemo, useCallback, Dispatch, SetStateAction } from "react"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseConfig"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
    Users, Search, Mail, Shield, User, Clock,
    CheckCircle, AlertTriangle, Loader2, ExternalLink, FileText
} from "lucide-react"
import * as XLSX from 'xlsx';

interface UserProfile {
    id: string;
    full_name: string | null;
    email: string | null;
    is_investor: boolean;
    is_speaker: boolean;
    is_startup: boolean;
    is_exhibitor: boolean;
    updated_at: string;
}

export default function AdminUsersPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [language, setLanguage] = useState<"en" | "ar">("en");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchAllUsers = useCallback(async () => {
        setLoading(true);
        try {
            // 1. Try to fetch using the RPC (fetches directly from auth.users)
            const { data: rpcData, error: rpcError } = await supabase.rpc('get_platform_users');

            if (!rpcError && rpcData) {
                setUsers(rpcData);
                setLoading(false);
                return;
            }

            console.warn("RPC fetch failed or not found, falling back to manual join:", rpcError?.message);

            // 2. Fallback: Manual join from role tables (current method)
            const { data: profiles, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .order('updated_at', { ascending: false });

            if (profileError) throw profileError;

            const [
                { data: investorData },
                { data: founderData },
                { data: speakerData },
                { data: exhibitorData }
            ] = await Promise.all([
                supabase.from('investor_profiles').select('user_id, email'),
                supabase.from('founder_profiles').select('user_id, email'),
                supabase.from('speaker_profiles').select('user_id, email'),
                supabase.from('exhibitor_profiles').select('user_id, email')
            ]);

            const emailMap: Record<string, string> = {};
            investorData?.forEach(p => { if (p.email) emailMap[p.user_id] = p.email });
            founderData?.forEach(p => { if (p.email) emailMap[p.user_id] = p.email });
            speakerData?.forEach(p => { if (p.email) emailMap[p.user_id] = p.email });
            exhibitorData?.forEach(p => { if (p.email) emailMap[p.user_id] = p.email });

            const mergedUsers = (profiles || []).map(p => ({
                ...p,
                email: emailMap[p.id] || "N/A"
            }));

            setUsers(mergedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const initialize = async () => {
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            setSession(currentSession);

            if (!currentSession) {
                setLoading(false);
                return;
            }

            // Check admin status
            const { data: adminData } = await supabase
                .from('admins')
                .select('user_id')
                .eq('user_id', currentSession.user.id)
                .single();

            if (adminData) {
                setIsAdmin(true);
                await fetchAllUsers();
            } else {
                setIsAdmin(false);
                setLoading(false);
            }
        };

        initialize();
    }, [fetchAllUsers]);

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        const lowerSearch = searchTerm.toLowerCase();
        return users.filter(u =>
            u.full_name?.toLowerCase().includes(lowerSearch) ||
            u.email?.toLowerCase().includes(lowerSearch) ||
            u.id.toLowerCase().includes(lowerSearch)
        );
    }, [users, searchTerm]);

    const exportToExcel = () => {
        // Prepare data for export
        const exportData = filteredUsers.map((u, index) => ({
            '#': index + 1,
            'Full Name': u.full_name || 'N/A',
            'Email Address': u.email || 'N/A',
            'Summit Roles': [
                u.is_investor ? 'Investor' : null,
                u.is_speaker ? 'Speaker' : null,
                u.is_startup ? 'Startup' : null,
                u.is_exhibitor ? 'Exhibitor' : null
            ].filter(Boolean).join(', ') || 'No Roles',
            'Account UID': u.id,
            'Last Sync Date': new Date(u.updated_at).toLocaleString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, `Platform_Users_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const renderRoles = (user: UserProfile) => {
        const roles = [];
        if (user.is_investor) roles.push({ label: "Investor", color: "bg-blue-100 text-blue-700" });
        if (user.is_speaker) roles.push({ label: "Speaker", color: "bg-purple-100 text-purple-700" });
        if (user.is_startup) roles.push({ label: "Startup", color: "bg-green-100 text-green-700" });
        if (user.is_exhibitor) roles.push({ label: "Exhibitor", color: "bg-orange-100 text-orange-700" });

        if (roles.length === 0) return <span className="text-slate-400 text-xs italic">No roles assigned</span>;

        return (
            <div className="flex flex-wrap gap-1">
                {roles.map((r, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${r.color}`}>
                        {r.label}
                    </span>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-[#013371] animate-spin" />
                    <p className="text-slate-500 font-medium">Loading user data...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
                    <p className="text-slate-600 mb-8">You do not have the necessary permissions to access the user management panel.</p>
                    <a href="/" className="inline-block px-6 py-3 bg-[#013371] text-white rounded-xl font-semibold hover:bg-[#024fa3] transition-all">
                        Return Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header language={language} setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>} userEmail={session?.user?.email} />

            <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                                <Users className="w-8 h-8 text-[#013371]" /> Platform Users
                            </h1>
                            <p className="text-slate-600 mt-1">Manage and view all registered users across the summit platform.</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                            <Users className="w-4 h-4" />
                            Total: {users.length} Users
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative max-w-md w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email or UID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#013371] transition-all text-sm"
                                />
                            </div>
                            <button
                                onClick={exportToExcel}
                                className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-sm font-bold text-sm"
                            >
                                <FileText className="w-4 h-4" /> Export Excel
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Information</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Summit Roles</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Account UID</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Last Sync</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                                            {user.full_name ? user.full_name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-900">{user.full_name || "Unknown User"}</div>
                                                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">REGISTERED</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <Mail className="w-4 h-4 text-slate-400" />
                                                        {user.email || <span className="text-slate-300 italic">Not found in profiles</span>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {renderRoles(user)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-[11px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono">
                                                            {user.id.slice(0, 18)}...
                                                        </code>
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(user.id)}
                                                            className="p-1 text-slate-400 hover:text-[#013371] opacity-0 group-hover:opacity-100 transition-all"
                                                            title="Copy UID"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(user.updated_at).toLocaleDateString()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                                                No users found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {filteredUsers.length > 0 && (
                            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                                <p className="text-xs text-slate-400">
                                    Displaying {filteredUsers.length} of {users.length} total users. Data synced from multi-channel registrations.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer language={language} />
        </div>
    );
}
