"use client"

import type React from "react"
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react"
import { Session } from "@supabase/supabase-js"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { supabase } from "@/lib/supabaseConfig"
import {
    AlertTriangle, Check, Edit, Trash2, X, Shield,
    CheckCircle, Clock, Search, ExternalLink, FileText, XCircle,
    DollarSign, Calendar, Ticket, User, Mail, Phone
} from "lucide-react"
import * as XLSX from 'xlsx';

interface VisitorProfile {
    user_id: string;
    email: string;
    full_name: string;
    phone: string;
    ticket_type: string;
    payment_status: string;
    stripe_session_id: string | null;
    paid_at: string | null;
    created_at: string;
    is_approved: boolean;
}

type Translations = {
    title: string;
    subtitle: string;
    loading: string;
    notAuthorized: string;
    notAuthorizedDesc: string;
    error: string;
    errorDesc: string;
    searchPlaceholder: string;
    visitor: string;
    email: string;
    phone: string;
    ticketType: string;
    payment: string;
    status: string;
    actions: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    noVisitors: string;
    noResults: string;
};

export default function AdminVisitorsPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [language, setLanguage] = useState<"en" | "ar">("en");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allVisitors, setAllVisitors] = useState<VisitorProfile[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedVisitor, setSelectedVisitor] = useState<VisitorProfile | null>(null);

    const t = useMemo((): Translations => {
        return language === 'ar' ? {
            title: "إدارة الزوار 🎫",
            subtitle: "مراجعة وتعديل وحذف سجلات الزوار.",
            loading: "جاري التحميل...",
            notAuthorized: "غير مصرح لك 🔒",
            notAuthorizedDesc: "يجب أن تكون مسؤولاً للوصول إلى هذه الصفحة.",
            error: "حدث خطأ ⚠️",
            errorDesc: "لم نتمكن من تحميل البيانات.",
            searchPlaceholder: "ابحث بالاسم أو البريد الإلكتروني...",
            visitor: "الزائر",
            email: "البريد الإلكتروني",
            phone: "الهاتف",
            ticketType: "نوع التذكرة",
            payment: "الدفع",
            status: "الحالة",
            actions: "الإجراءات",
            edit: "تعديل",
            delete: "حذف",
            save: "حفظ",
            cancel: "إلغاء",
            noVisitors: "لا يوجد زوار",
            noResults: "لا توجد نتائج"
        } : {
            title: "Visitor Management 🎫",
            subtitle: "Review, edit, and manage visitor registrations.",
            loading: "Loading...",
            notAuthorized: "Not Authorized 🔒",
            notAuthorizedDesc: "You must be an admin to access this page.",
            error: "An Error Occurred ⚠️",
            errorDesc: "We couldn't load the data. Please try again.",
            searchPlaceholder: "Search by name or email...",
            visitor: "Visitor",
            email: "Email",
            phone: "Phone",
            ticketType: "Ticket Type",
            payment: "Payment",
            status: "Status",
            actions: "Actions",
            edit: "Edit",
            delete: "Delete",
            save: "Save",
            cancel: "Cancel",
            noVisitors: "No Visitors Found",
            noResults: "No Results Found"
        };
    }, [language]);

    useEffect(() => {
        const initialize = async () => {
            setLoading(true);
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            setSession(currentSession);

            if (!currentSession) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            const { data: adminData, error: adminError } = await supabase
                .from('admins')
                .select('user_id')
                .eq('user_id', currentSession.user.id)
                .single();

            if (adminError || !adminData) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }
            setIsAdmin(true);

            const { data: visitorsData, error: visitorsError } = await supabase
                .from('visitor_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (visitorsError) {
                console.error("Error fetching visitors:", visitorsError);
                setError(t.errorDesc);
            } else {
                setAllVisitors(visitorsData || []);
            }
            setLoading(false);
        };

        initialize();
    }, [t.errorDesc]);

    const approvePayment = async (visitorId: string, ticketType: string) => {
        const { data, error } = await supabase
            .from('visitor_profiles')
            .update({
                payment_status: 'paid',
                stripe_session_id: 'direct_admin',
                paid_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('user_id', visitorId)
            .select()
            .single();

        if (error) {
            alert(`Error: ` + error.message);
            return null;
        }
        return data;
    }

    const handleApprovePayment = async (visitorId: string, ticketType: string) => {
        if (confirm(`Approve payment for ${ticketType.toUpperCase()} pass?`)) {
            const data = await approvePayment(visitorId, ticketType);
            if (data) setAllVisitors(allVisitors.map(v => v.user_id === visitorId ? data : v));
        }
    };

    const handleEditSave = (updatedVisitor: VisitorProfile) => {
        setAllVisitors(allVisitors.map(v => v.user_id === updatedVisitor.user_id ? updatedVisitor : v));
        setEditModalOpen(false);
    };

    const handleDelete = (deletedVisitorId: string) => {
        setAllVisitors(allVisitors.filter(v => v.user_id !== deletedVisitorId));
        setDeleteModalOpen(false);
    };

    const filteredVisitors = useMemo(() => {
        if (!searchTerm) return allVisitors;
        const lowerSearch = searchTerm.toLowerCase();
        return allVisitors.filter(v =>
            v.full_name.toLowerCase().includes(lowerSearch) ||
            v.email.toLowerCase().includes(lowerSearch) ||
            v.phone.toLowerCase().includes(lowerSearch)
        );
    }, [allVisitors, searchTerm]);

    const exportToExcel = () => {
        const exportData = filteredVisitors.map((v, index) => ({
            '#': index + 1,
            'Registration Date': new Date(v.created_at).toLocaleString(),
            'Full Name': v.full_name,
            'Email': v.email,
            'Phone': v.phone,
            'Ticket Type': v.ticket_type.toUpperCase(),
            'Payment Status': v.payment_status.toUpperCase(),
            'Paid At': v.paid_at ? new Date(v.paid_at).toLocaleString() : 'N/A',
            'Transaction ID': v.stripe_session_id || 'N/A'
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Visitors");
        XLSX.writeFile(workbook, `Visitors_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const renderContent = () => {
        if (loading) return <div className="text-center p-12">{t.loading}</div>;
        if (!isAdmin) return <div className="p-12 text-center text-blue-600 font-bold">{t.notAuthorized}</div>;
        if (error) return <div className="p-12 text-center text-blue-600">{error}</div>;

        return (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-100">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">#</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t.visitor}</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t.ticketType}</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t.payment}</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {filteredVisitors.map((visitor, index) => (
                            <tr key={visitor.user_id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4 text-sm font-mono text-slate-500">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-900">{visitor.full_name}</span>
                                        <span className="text-xs text-slate-500">{visitor.email}</span>
                                        <span className="text-[10px] text-slate-400">{visitor.phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                                        {visitor.ticket_type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${visitor.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {visitor.payment_status === 'paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {visitor.payment_status.toUpperCase()}
                                        </span>
                                        {visitor.paid_at && <span className="text-[9px] text-slate-400">{new Date(visitor.paid_at).toLocaleDateString()}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                    <button onClick={() => { setSelectedVisitor(visitor); setEditModalOpen(true); }} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => { setSelectedVisitor(visitor); setDeleteModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header language={language} setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>} userEmail={session?.user?.email} />
            <main className="flex-1 pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900">{t.title}</h1>
                            <p className="text-slate-500">{t.subtitle}</p>
                        </div>
                        <button onClick={exportToExcel} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-md font-bold">
                            <FileText className="w-5 h-5" /> Export Excel
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t.searchPlaceholder} className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#740001] outline-none" />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>

                    {renderContent()}
                </div>
            </main>
            <Footer language={language} />
            {editModalOpen && selectedVisitor && <EditVisitorModal visitor={selectedVisitor} onClose={() => setEditModalOpen(false)} onSave={handleEditSave} onApprovePayment={handleApprovePayment} t={t} />}
            {deleteModalOpen && selectedVisitor && <DeleteVisitorModal visitor={selectedVisitor} onClose={() => setDeleteModalOpen(false)} onDelete={handleDelete} t={t} />}
        </div>
    );
}

const EditVisitorModal = ({ visitor, onClose, onSave, onApprovePayment, t }: any) => {
    const [formData, setFormData] = useState({ ...visitor });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const { data, error } = await supabase.from('visitor_profiles').update({ ...formData, updated_at: new Date().toISOString() }).eq('user_id', visitor.user_id).select().single();
        if (error) alert(error.message);
        else onSave(data);
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Edit Visitor</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X className="w-6 h-6 text-slate-400" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                        <input value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#740001]" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#740001]" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                        <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#740001]" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ticket Type</label>
                        <input value="Standard" disabled className="w-full px-4 py-2 border rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed" />
                    </div>

                    {formData.payment_status !== 'paid' && (
                        <button type="button" onClick={() => { onApprovePayment(visitor.user_id, formData.ticket_type); onClose(); }} className="w-full py-2 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition">
                            <DollarSign className="w-4 h-4" /> Manually Approve Payment
                        </button>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-2 border rounded-xl font-bold hover:bg-slate-50">Cancel</button>
                        <button type="submit" disabled={isSaving} className="flex-1 py-2 bg-[#740001] text-white rounded-xl font-bold hover:bg-[#023c7a] disabled:bg-slate-400">
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteVisitorModal = ({ visitor, onClose, onDelete, t }: any) => {
    const [confirmText, setConfirmText] = useState("");
    const isConfirmed = confirmText === "confirm delete";

    const handleDelete = async () => {
        const { error } = await supabase.from('visitor_profiles').delete().eq('user_id', visitor.user_id);
        if (error) alert(error.message);
        else onDelete(visitor.user_id);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Visitor Registration</h3>
                <p className="text-sm text-slate-500 mb-4">Are you sure you want to delete **{visitor.full_name}**? This cannot be undone.</p>
                <input value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder="Type 'confirm delete'" className="w-full px-4 py-2 border rounded-xl mb-6 outline-none focus:border-blue-500" />
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2 border rounded-xl font-bold">Cancel</button>
                    <button onClick={handleDelete} disabled={!isConfirmed} className="flex-1 py-2 bg-blue-600 text-white rounded-xl font-bold disabled:bg-blue-300">Delete Permanently</button>
                </div>
            </div>
        </div>
    );
};
