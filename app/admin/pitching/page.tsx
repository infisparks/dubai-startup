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
    DollarSign, Calendar, FileCheck
} from "lucide-react"
import * as XLSX from 'xlsx';

// --- 1. Define Types ---

interface PitchingProfile {
    user_id: string;
    email: string | null;
    company_name: string;
    stage: string | null;
    pitch_deck_url: string | null;
    website: string | null;
    description: string | null;
    founder_name: string | null;
    founder_phone: string | null;
    company_linkedin: string | null;
    domain: string | null;
    domain_other_spec: string | null;
    problem_description: string | null;
    earning_status: string | null;
    establishment_year: number | null;
    turnover: string | null;
    net_profit: string | null;
    it_returns_filed: boolean | null;
    is_audited: boolean | null;
    is_approved: boolean | null;
    created_at: string | null;
    updated_at: string | null;
    reference: string | null;
    payment_status: string;
    stripe_session_id: string | null;
    paid_at: string | null;
}

type EditablePitchingProfile = Pick<
    PitchingProfile,
    'email' | 'company_name' | 'founder_name' | 'founder_phone' | 'website' | 'stage' |
    'description' | 'domain' | 'domain_other_spec' | 'earning_status' | 'is_approved' |
    'pitch_deck_url' | 'company_linkedin' | 'problem_description' |
    'establishment_year' | 'turnover' | 'net_profit' | 'it_returns_filed' | 'is_audited' | 'reference'
>;

type Translations = {
    title: string;
    subtitle: string;
    loading: string;
    notAuthorized: string;
    notAuthorizedDesc: string;
    error: string;
    errorDesc: string;
    searchPlaceholder: string;
    company: string;
    founder: string;
    email: string;
    pitchDeck: string;
    status: string;
    actions: string;
    approved: string;
    pending: string;
    disapproved: string;
    edit: string;
    delete: string;
    approve: string;
    disapprove: string;
    noStartups: string;
    noStartupsDesc: string;
    noResults: string;
    noResultsDesc: string;
    editStartup: string;
    sectionGeneral: string;
    sectionFinancial: string;
    save: string;
    cancel: string;
    deleteStartup: string;
    deleteWarning: string;
    deleteConfirmText: string;
    deleteButton: string;
    establishmentYear: string;
    turnover: string;
    netProfit: string;
    itReturns: string;
    audited: string;
    yes: string;
    no: string;
};

// --- 2. The Main Page Component ---
export default function AdminPitchingPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [language, setLanguage] = useState<"en" | "ar">("en");

    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allPitching, setAllPitching] = useState<PitchingProfile[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPitching, setSelectedPitching] = useState<PitchingProfile | null>(null);

    const t = useMemo((): Translations => {
        return language === 'ar' ? {
            title: "إدارة العروض المخطط لها 🎤",
            subtitle: "مراجعة وتعديل وحذف ملفات العروض.",
            loading: "جاري التحميل...",
            notAuthorized: "غير مصرح لك 🔒",
            notAuthorizedDesc: "يجب أن تكون مسؤولاً للوصول إلى هذه الصفحة.",
            error: "حدث خطأ ⚠️",
            errorDesc: "لم نتمكن من تحميل البيانات. يرجى المحاولة مرة أخرى.",
            searchPlaceholder: "ابحث باسم الشركة أو المؤسس...",
            company: "الشركة",
            founder: "المؤسس",
            email: "البريد الإلكتروني",
            pitchDeck: "ملف العرض",
            status: "الحالة",
            actions: "الإجراءات",
            approved: "مقبول ✅",
            pending: "قيد الانتظار ⏳",
            disapproved: "مرفوض ❌",
            edit: "تعديل",
            delete: "حذف",
            approve: "قبول",
            disapprove: "رفض",
            noStartups: "لا توجد عروض",
            noStartupsDesc: "لا توجد عروض في النظام حتى الآن.",
            noResults: "لا توجد نتائج",
            noResultsDesc: "لم يتم العثور على عروض تطابق بحثك.",
            editStartup: "تعديل العرض",
            sectionGeneral: "معلومات عامة",
            sectionFinancial: "التفاصيل المالية والقانونية",
            save: "حفظ",
            cancel: "إلغاء",
            deleteStartup: "حذف العرض",
            deleteWarning: "هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الملف الشخصي للعرض نهائيًا.",
            deleteConfirmText: "لحذف، اكتب 'confirm delete' في المربع أدناه:",
            deleteButton: "حذف نهائيًا",
            establishmentYear: "سنة التأسيس",
            turnover: "دوران السنوي",
            netProfit: "صافي الربح",
            itReturns: "الإقرارات الضريبية؟",
            audited: "حسابات مدققة؟",
            yes: "نعم",
            no: "لا"
        } : {
            title: "Pitching Management 🎤",
            subtitle: "Review, approve, edit, and delete pitching applications.",
            loading: "Loading...",
            notAuthorized: "Not Authorized 🔒",
            notAuthorizedDesc: "You must be an admin to access this page.",
            error: "An Error Occurred ⚠️",
            errorDesc: "We couldn't load the data. Please try again.",
            searchPlaceholder: "Search by company name or founder...",
            company: "Company",
            founder: "Founder",
            email: "Email",
            pitchDeck: "Pitch Deck",
            status: "Status",
            actions: "Actions",
            approved: "Approved ✅",
            pending: "Pending ⏳",
            disapproved: "Disapproved ❌",
            edit: "Edit",
            delete: "Delete",
            approve: "Approve",
            disapprove: "Disapprove",
            noStartups: "No Pitching Apps Found",
            noStartupsDesc: "There are no pitching registrations in the system yet.",
            noResults: "No Results Found",
            noResultsDesc: "No applications match your search criteria.",
            editStartup: "Edit Pitching Profile",
            sectionGeneral: "General Information",
            sectionFinancial: "Financial & Legal Details",
            save: "Save",
            cancel: "Cancel",
            deleteStartup: "Delete Pitching Application",
            deleteWarning: "This action cannot be undone. This will permanently delete the application.",
            deleteConfirmText: "Please type 'confirm delete' to proceed:",
            deleteButton: "Delete Permanently",
            establishmentYear: "Establishment Year",
            turnover: "Annual Turnover",
            netProfit: "Net Profit",
            itReturns: "IT Returns Filed?",
            audited: "Accounts Audited?",
            yes: "Yes",
            no: "No"
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

            const { data: pitchingData, error: pitchingError } = await supabase
                .from('pitching_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (pitchingError) {
                console.error("Error fetching pitching profiles:", pitchingError);
                setError(t.errorDesc);
            } else {
                const processedData = (pitchingData || []).map(p => ({
                    ...p,
                    is_approved: p.is_approved ?? false,
                }))
                setAllPitching(processedData);
            }
            setLoading(false);
        };

        initialize();
    }, [t.errorDesc]);

    const updateApprovalStatus = async (userId: string, isApproved: boolean) => {
        const { data, error } = await supabase
            .from('pitching_profiles')
            .update({ is_approved: isApproved, updated_at: new Date().toISOString() })
            .eq('user_id', userId)
            .select()
            .single();

        if (error) {
            alert(`Error: ` + error.message);
            return null;
        }
        return data;
    }

    const handleApprove = async (userId: string) => {
        const data = await updateApprovalStatus(userId, true);
        if (data) setAllPitching(allPitching.map(p => p.user_id === userId ? data : p));
    };

    const handleDisapprove = async (userId: string) => {
        const data = await updateApprovalStatus(userId, false);
        if (data) setAllPitching(allPitching.map(p => p.user_id === userId ? data : p));
    };

    const handleEditSave = (updatedProfile: PitchingProfile) => {
        setAllPitching(allPitching.map(p => p.user_id === updatedProfile.user_id ? updatedProfile : p));
        setEditModalOpen(false);
    };

    const handleDelete = (deletedId: string) => {
        setAllPitching(allPitching.filter(p => p.user_id !== deletedId));
        setDeleteModalOpen(false);
    };

    const filteredPitching = useMemo(() => {
        if (!searchTerm) return allPitching;
        const lowerSearch = searchTerm.toLowerCase();
        return allPitching.filter(p =>
            p.company_name.toLowerCase().includes(lowerSearch) ||
            (p.founder_name && p.founder_name.toLowerCase().includes(lowerSearch)) ||
            (p.email && p.email.toLowerCase().includes(lowerSearch))
        );
    }, [allPitching, searchTerm]);

    const exportToExcel = () => {
        const exportData = filteredPitching
            .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
            .map((p, index) => ({
                '#': index + 1,
                'Registration Date': p.created_at ? new Date(p.created_at).toLocaleString() : 'N/A',
                'Company Name': p.company_name,
                'Founder Name': p.founder_name || 'N/A',
                'Email': p.email || 'N/A',
                'Phone': p.founder_phone || 'N/A',
                'Website': p.website || 'N/A',
                'LinkedIn': p.company_linkedin || 'N/A',
                'Domain': p.domain || 'N/A',
                'Domain Other': p.domain_other_spec || 'N/A',
                'Stage': p.stage || 'N/A',
                'Earning Status': p.earning_status || 'N/A',
                'Description': p.description || 'N/A',
                'Problem Statement': p.problem_description || 'N/A',
                'Reference Source': p.reference || 'N/A',
                'Establishment Year': p.establishment_year || 'N/A',
                'Turnover': p.turnover || 'N/A',
                'Net Profit': p.net_profit || 'N/A',
                'IT Returns Filed': p.it_returns_filed ? 'Yes' : 'No',
                'Audited': p.is_audited ? 'Yes' : 'No',
                'Payment Status': p.payment_status || 'N/A',
                'Paid At': p.paid_at ? new Date(p.paid_at).toLocaleString() : 'N/A',
                'Stripe Session ID': p.stripe_session_id || 'N/A',
                'Approval Status': p.is_approved ? 'Approved' : (p.is_approved === false ? 'Disapproved' : 'Pending')
            }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pitching");
        XLSX.writeFile(workbook, `Pitching_Detailed_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const renderStatusBadge = (isApproved: boolean | null) => {
        if (isApproved === false) return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"><XCircle className="w-3.5 h-3.5" />{t.disapproved}</span>;
        return isApproved ? <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"><CheckCircle className="w-3.5 h-3.5" />{t.approved}</span> : <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"><Clock className="w-3.5 h-3.5" />{t.pending}</span>;
    };

    const renderContent = () => {
        if (loading) return <div className="text-center p-12 text-slate-600 font-medium">{t.loading}</div>;
        if (!isAdmin) return <FeedbackCard message={t.notAuthorized} description={t.notAuthorizedDesc} icon={Shield} iconColor="text-red-500" />;
        if (error) return <FeedbackCard message={t.error} description={error} icon={AlertTriangle} iconColor="text-red-500" />;
        if (allPitching.length === 0) return <FeedbackCard message={t.noStartups} description={t.noStartupsDesc} icon={AlertTriangle} iconColor="text-yellow-500" />;
        if (filteredPitching.length === 0) return <FeedbackCard message={t.noResults} description={t.noResultsDesc} icon={Search} iconColor="text-slate-500" />;

        return (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-100">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase w-10">#</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t.company}</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">{t.founder}</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">{t.email}</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Reference</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">{t.pitchDeck}</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t.status}</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {filteredPitching.map((profile, index) => (
                            <tr key={profile.user_id} className="hover:bg-slate-50 transition duration-150">
                                <td className="px-6 py-4 text-xs text-slate-900 font-bold font-mono">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900">{profile.company_name}</span>
                                        <div className="text-xs text-slate-500 sm:hidden mt-1">{profile.founder_name || "N/A"}</div>
                                        {profile.website && <a href={profile.website} target="_blank" className="text-blue-500 hover:text-blue-700 text-xs mt-1 flex items-center gap-1">Link <ExternalLink className="w-3 h-3" /></a>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell text-sm text-slate-600">{profile.founder_name || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-sm text-slate-600">{profile.email || "N/A"}</td>
                                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell text-sm text-slate-600">{profile.reference || "-"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center hidden md:table-cell">
                                    {profile.pitch_deck_url ? <a href={profile.pitch_deck_url} target="_blank" className="text-indigo-600 hover:text-indigo-800 p-2 inline-block rounded-full bg-indigo-50 hover:bg-indigo-100"><FileText className="w-4 h-4" /></a> : <span className="text-slate-400">-</span>}
                                </td>
                                <td className="px-6 py-4">
                                    {profile.payment_status === 'paid' ? (
                                        <div className="flex flex-col">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                                                <CheckCircle className="w-3 h-3" /> $2500 Paid
                                            </span>
                                            <span className="text-[10px] text-slate-400 mt-1 font-mono">ID: {(profile.stripe_session_id || 'N/A').slice(0, 8)}...</span>
                                            {profile.paid_at && <span className="text-[10px] text-slate-400">{new Date(profile.paid_at).toLocaleDateString()}</span>}
                                        </div>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                            <Clock className="w-3 h-3" /> Unpaid
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{renderStatusBadge(profile.is_approved)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex flex-col sm:flex-row gap-1">
                                    {profile.is_approved === false ?
                                        <button onClick={() => handleApprove(profile.user_id)} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"><Check className="w-4 h-4" /><span className="hidden sm:inline">{t.approve}</span></button>
                                        :
                                        <button onClick={() => handleDisapprove(profile.user_id)} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-white bg-red-600 hover:bg-red-700 transition"><X className="w-4 h-4" /><span className="hidden sm:inline">{t.disapprove}</span></button>
                                    }
                                    <button onClick={() => { setSelectedPitching(profile); setEditModalOpen(true); }} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition"><Edit className="w-4 h-4" /><span className="hidden sm:inline">{t.edit}</span></button>
                                    <button onClick={() => { setSelectedPitching(profile); setDeleteModalOpen(true); }} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-white bg-slate-400 hover:bg-slate-500 transition"><Trash2 className="w-4 h-4" /><span className="hidden sm:inline">{t.delete}</span></button>
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
                <div className="w-full max-w-7xl mx-auto">
                    <div className="mb-6"><h1 className="text-3xl font-extrabold text-slate-900">{t.title}</h1><p className="text-md text-slate-600 mt-1">{t.subtitle}</p></div>
                    {isAdmin && allPitching.length > 0 && (
                        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                            <div className="relative flex-1 w-full">
                                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t.searchPlaceholder} className="w-full pl-12 pr-4 py-2.5 text-base bg-white border border-slate-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2"><Search className="w-5 h-5 text-slate-400" /></div>
                            </div>
                            <button onClick={exportToExcel} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-md font-bold whitespace-nowrap">
                                <FileText className="w-5 h-5" /> Export Excel
                            </button>
                        </div>
                    )}
                    {renderContent()}
                </div>
            </main>
            <Footer language={language} />
            {editModalOpen && selectedPitching && <EditModal profile={selectedPitching} onClose={() => setEditModalOpen(false)} onSave={handleEditSave} t={t} />}
            {deleteModalOpen && selectedPitching && <DeleteModal profile={selectedPitching} onClose={() => setDeleteModalOpen(false)} onDelete={handleDelete} t={t} />}
        </div>
    );
}

// --- 3. Modal Components ---

interface EditModalProps {
    profile: PitchingProfile;
    onClose: () => void;
    onSave: (profile: PitchingProfile) => void;
    t: Translations;
}

const EditModal: React.FC<EditModalProps> = ({ profile, onClose, onSave, t }) => {
    const [formData, setFormData] = useState<EditablePitchingProfile>({
        email: profile.email || '',
        company_name: profile.company_name || '',
        founder_name: profile.founder_name || '',
        founder_phone: profile.founder_phone || '',
        website: profile.website || '',
        stage: profile.stage || '',
        description: profile.description || '',
        domain: profile.domain || '',
        domain_other_spec: profile.domain_other_spec || '',
        earning_status: profile.earning_status || '',
        is_approved: profile.is_approved ?? false,
        pitch_deck_url: profile.pitch_deck_url || '',
        company_linkedin: profile.company_linkedin || '',
        problem_description: profile.problem_description || '',
        establishment_year: profile.establishment_year,
        turnover: profile.turnover || '',
        net_profit: profile.net_profit || '',
        it_returns_filed: profile.it_returns_filed ?? false,
        is_audited: profile.is_audited ?? false,
        reference: profile.reference || '',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (name: keyof EditablePitchingProfile, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const submissionData = { ...formData, establishment_year: formData.establishment_year ? Number(formData.establishment_year) : null, updated_at: new Date().toISOString() }
        const { data, error } = await supabase.from('pitching_profiles').update(submissionData).eq('user_id', profile.user_id).select().single();
        setIsSaving(false);
        if (error) alert("Error: " + error.message);
        else if (data) onSave(data);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b bg-white rounded-t-xl">
                        <h3 className="text-xl font-bold text-slate-900">{t.editStartup}</h3>
                        <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"><X className="w-6 h-6" /></button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput name="company_name" label="Company Name" value={formData.company_name} onChange={handleChange} required />
                            <FormInput name="founder_name" label="Founder Name" value={formData.founder_name || ''} onChange={handleChange} />
                            <FormInput name="email" label="Email" type="email" value={formData.email || ''} onChange={handleChange} required />
                            <FormInput name="founder_phone" label="Phone" type="tel" value={formData.founder_phone || ''} onChange={handleChange} />
                            <FormInput name="website" label="Website" value={formData.website || ''} onChange={handleChange} />
                            <FormInput name="company_linkedin" label="LinkedIn" value={formData.company_linkedin || ''} onChange={handleChange} />
                            <FormInput name="domain" label="Domain" value={formData.domain || ''} onChange={handleChange} />
                            <FormInput name="stage" label="Stage" value={formData.stage || ''} onChange={handleChange} />
                            <FormInput name="reference" label="Reference" value={formData.reference || ''} onChange={handleChange} />
                        </div>
                        <FormTextArea name="description" label="Description" value={formData.description || ''} onChange={handleChange} rows={2} />
                        <FormTextArea name="problem_description" label="Problem/Solution" value={formData.problem_description || ''} onChange={handleChange} rows={2} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ToggleSwitch name="is_approved" label="Application Approval" checked={!!formData.is_approved} onChange={(checked) => handleToggleChange('is_approved', checked)} t={t} />
                        </div>
                    </div>
                    <div className="sticky bottom-0 z-10 flex justify-end items-center gap-3 p-6 bg-slate-50 border-t rounded-b-xl">
                        <button type="button" onClick={onClose} disabled={isSaving} className="px-5 py-2.5 border border-slate-300 text-sm font-medium rounded-xl shadow-sm bg-white hover:bg-slate-100 transition">{t.cancel}</button>
                        <button type="submit" disabled={isSaving} className="px-5 py-2.5 rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 transition">{isSaving ? (t.loading + "...") : t.save}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteModal: React.FC<{ profile: PitchingProfile, onClose: () => void, onDelete: (id: string) => void, t: Translations }> = ({ profile, onClose, onDelete, t }) => {
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const isConfirmed = confirmText === "confirm delete";

    const handleDelete = async () => {
        if (!isConfirmed) return;
        setIsDeleting(true);
        const { error } = await supabase.from('pitching_profiles').delete().eq('user_id', profile.user_id);
        setIsDeleting(false);
        if (error) alert("Error: " + error.message);
        else onDelete(profile.user_id);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-xl font-bold text-slate-900">{t.deleteStartup}</h3>
                    <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"><X className="w-6 h-6" /></button>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-md text-slate-700 font-semibold">{profile.company_name}</p>
                    <p className="text-sm text-red-600 font-medium"><AlertTriangle className="w-4 h-4 inline mr-1" />{t.deleteWarning}</p>
                    <input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="w-full px-4 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500" placeholder="confirm delete" />
                </div>
                <div className="flex justify-end gap-3 p-6 bg-slate-50 border-t rounded-b-xl">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 border border-slate-300 rounded-xl bg-white hover:bg-slate-100">Cancel</button>
                    <button type="button" onClick={handleDelete} disabled={!isConfirmed || isDeleting} className="px-5 py-2.5 rounded-xl text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300">Delete</button>
                </div>
            </div>
        </div>
    );
};

const FormInput: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, required?: boolean, placeholder?: string }> = ({ name, label, value, onChange, type = 'text', required = false, placeholder = '' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className="block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm text-sm focus:ring-indigo-600 transition" />
    </div>
);

const FormTextArea: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }> = ({ name, label, value, onChange, rows = 3 }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <textarea id={name} name={name} value={value} onChange={onChange} rows={rows} className="block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm text-sm focus:ring-indigo-600 transition" />
    </div>
);

const ToggleSwitch: React.FC<{ name: string, label: string, checked: boolean, onChange: (checked: boolean) => void, t: Translations }> = ({ name, label, checked, onChange, t }) => (
    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
        <label htmlFor={name} className="text-sm font-medium text-slate-700 flex flex-col">{label}<span className={`text-xs mt-0.5 font-bold ${checked ? 'text-green-600' : 'text-red-600'}`}>{checked ? t.approved : t.disapproved}</span></label>
        <button type="button" onClick={() => onChange(!checked)} className={`${checked ? 'bg-green-600' : 'bg-red-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`} role="switch">
            <span aria-hidden="true" className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
        </button>
    </div>
);

const FeedbackCard: React.FC<{ message: string, description: string, icon: React.ElementType, iconColor: string }> = ({ message, description, icon: Icon, iconColor }) => (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white border border-slate-200 rounded-xl shadow-lg">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-slate-100 mb-4 ${iconColor}`}><Icon className="w-7 h-7" /></div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">{message}</h3>
        <p className="text-base text-slate-600 max-w-sm">{description}</p>
    </div>
);
