"use client"

import type React from "react"
import { useState, useEffect, useMemo, useRef, Dispatch, SetStateAction } from "react"
import { Session } from "@supabase/supabase-js"
// Assuming you have these components.
import Header from "@/components/header"
import Footer from "@/components/footer"
import { supabase } from "@/lib/supabaseConfig"
import {
  AlertTriangle, Check, Edit, Trash2, X, Shield,
  CheckCircle, Clock, Search, ExternalLink, FileText, XCircle,
  DollarSign, Calendar, FileCheck
} from "lucide-react"
import * as XLSX from 'xlsx';
import html2canvas from "html2canvas"
import QRCode from "react-qr-code"
import { Download, CreditCard } from "lucide-react"

// --- 1. Define Types ---

interface FounderProfile {
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

  // New Financial Fields
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
  is_gala: boolean | null;
}

// Define fields allowed to be edited
type EditableFounderProfile = Pick<
  FounderProfile,
  'email' | 'company_name' | 'founder_name' | 'founder_phone' | 'website' | 'stage' |
  'description' | 'domain' | 'domain_other_spec' | 'earning_status' | 'is_approved' |
  'pitch_deck_url' | 'company_linkedin' | 'problem_description' |
  'pitch_deck_url' | 'company_linkedin' | 'problem_description' |
  'establishment_year' | 'turnover' | 'net_profit' | 'it_returns_filed' | 'is_audited' | 'reference' | 'is_gala'
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
  // Modals
  editStartup: string;
  sectionGeneral: string; // New
  sectionFinancial: string; // New
  save: string;
  cancel: string;
  deleteStartup: string;
  deleteWarning: string;
  deleteConfirmText: string;
  deleteButton: string;
  // Field Labels
  establishmentYear: string;
  turnover: string;
  netProfit: string;
  itReturns: string;
  audited: string;
  yes: string;
  no: string;
};

// --- 2. The Main Page Component ---
export default function AdminStartupsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allStartups, setAllStartups] = useState<FounderProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<FounderProfile | null>(null);

  const t = useMemo((): Translations => {
    return language === 'ar' ? {
      title: "إدارة الشركات الناشئة 🚀",
      subtitle: "مراجعة وتعديل وحذف ملفات الشركات الناشئة.",
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
      noStartups: "لا توجد شركات ناشئة",
      noStartupsDesc: "لا توجد شركات ناشئة في النظام حتى الآن.",
      noResults: "لا توجد نتائج",
      noResultsDesc: "لم يتم العثور على شركات تطابق بحثك.",
      editStartup: "تعديل الشركة الناشئة",
      sectionGeneral: "معلومات عامة",
      sectionFinancial: "التفاصيل المالية والقانونية",
      save: "حفظ",
      cancel: "إلغاء",
      deleteStartup: "حذف الشركة الناشئة",
      deleteWarning: "هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الملف الشخصي للشركة نهائيًا.",
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
      title: "Startup Management 🚀",
      subtitle: "Review, approve, edit, and delete startup profiles.",
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
      noStartups: "No Startups Found",
      noStartupsDesc: "There are no startups in the system yet.",
      noResults: "No Results Found",
      noResultsDesc: "No startups match your search criteria.",
      editStartup: "Edit Startup",
      sectionGeneral: "General Information",
      sectionFinancial: "Financial & Legal Details",
      save: "Save",
      cancel: "Cancel",
      deleteStartup: "Delete Startup",
      deleteWarning: "This action cannot be undone. This will permanently delete the startup's profile.",
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

  // --- Data Fetching ---
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

      // 1. Check admin
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

      // 2. Fetch startups (auto-fetches new columns due to select('*'))
      const { data: startupsData, error: startupsError } = await supabase
        .from('founder_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (startupsError) {
        console.error("Error fetching startups:", startupsError);
        setError(t.errorDesc);
      } else {
        const processedData = (startupsData || []).map(s => ({
          ...s,
          is_approved: s.is_approved ?? false,
        }))
        setAllStartups(processedData);
      }
      setLoading(false);
    };

    initialize();
  }, [t.errorDesc]);

  // --- Handlers ---
  const updateApprovalStatus = async (startupId: string, isApproved: boolean) => {
    const { data, error } = await supabase
      .from('founder_profiles')
      .update({ is_approved: isApproved, updated_at: new Date().toISOString() })
      .eq('user_id', startupId)
      .select()
      .single();

    if (error) {
      alert(`Error: ` + error.message);
      return null;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ is_startup: isApproved, updated_at: new Date().toISOString() })
      .eq('id', startupId);

    if (profileError) console.error("Profile sync error:", profileError.message);

    return data;
  }

  const approvePayment = async (startupId: string, isGala: boolean) => {
    const { data, error } = await supabase
      .from('founder_profiles')
      .update({
        payment_status: 'paid',
        stripe_session_id: 'direct',
        is_gala: isGala,
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', startupId)
      .select()
      .single();

    if (error) {
      alert(`Error: ` + error.message);
      return null;
    }

    return data;
  }

  const handleApprove = async (startupId: string) => {
    const data = await updateApprovalStatus(startupId, true);
    if (data) setAllStartups(allStartups.map(s => s.user_id === startupId ? data : s));
  };

  const handleDisapprove = async (startupId: string) => {
    const data = await updateApprovalStatus(startupId, false);
    if (data) setAllStartups(allStartups.map(s => s.user_id === startupId ? data : s));
  };

  const handleApprovePayment = async (startupId: string, isGala: boolean) => {
    if (confirm(`Approve payment as "direct" ${isGala ? 'WITH' : 'WITHOUT'} Gala Dinner?`)) {
      const data = await approvePayment(startupId, isGala);
      if (data) setAllStartups(allStartups.map(s => s.user_id === startupId ? data : s));
    }
  };

  const handleEditSave = (updatedStartup: FounderProfile) => {
    setAllStartups(allStartups.map(s => s.user_id === updatedStartup.user_id ? updatedStartup : s));
    setEditModalOpen(false);
  };

  const handleDelete = (deletedStartupId: string) => {
    setAllStartups(allStartups.filter(s => s.user_id !== deletedStartupId));
    setDeleteModalOpen(false);
  };

  const filteredStartups = useMemo(() => {
    if (!searchTerm) return allStartups;
    const lowerSearch = searchTerm.toLowerCase();
    return allStartups.filter(s =>
      s.company_name.toLowerCase().includes(lowerSearch) ||
      (s.founder_name && s.founder_name.toLowerCase().includes(lowerSearch)) ||
      (s.email && s.email.toLowerCase().includes(lowerSearch))
    );
  }, [allStartups, searchTerm]);

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredStartups
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()) // Latest on top
      .map((s, index) => ({
        '#': index + 1,
        'Registration Date': s.created_at ? new Date(s.created_at).toLocaleString() : 'N/A',
        'Company Name': s.company_name,
        'Founder Name': s.founder_name || 'N/A',
        'Email': s.email || 'N/A',
        'Phone': s.founder_phone || 'N/A',
        'Website': s.website || 'N/A',
        'LinkedIn': s.company_linkedin || 'N/A',
        'Domain': s.domain || 'N/A',
        'Domain Other': s.domain_other_spec || 'N/A',
        'Stage': s.stage || 'N/A',
        'Earning Status': s.earning_status || 'N/A',
        'Description': s.description || 'N/A',
        'Problem Statement': s.problem_description || 'N/A',
        'Reference Source': s.reference || 'N/A',
        'Establishment Year': s.establishment_year || 'N/A',
        'Turnover': s.turnover || 'N/A',
        'Net Profit': s.net_profit || 'N/A',
        'IT Returns Filed': s.it_returns_filed ? 'Yes' : 'No',
        'Payment Status': s.payment_status || 'N/A',
        'Gala Dinner': s.is_gala ? 'Included' : 'No',
        'Amount Paid': s.payment_status === 'paid' ? (s.is_gala ? '$1000' : '$500') : '$0',
        'Paid At': s.paid_at ? new Date(s.paid_at).toLocaleString() : 'N/A',
        'Stripe Session ID': s.stripe_session_id || 'N/A',
        'Approval Status': s.is_approved ? 'Approved' : (s.is_approved === false ? 'Disapproved' : 'Pending')
      }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Startups");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Startups_Detailed_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // --- Render ---
  const renderStatusBadge = (isApproved: boolean | null) => {
    if (isApproved === false) return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"><XCircle className="w-3.5 h-3.5" />{t.disapproved}</span>;
    return isApproved ? <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"><CheckCircle className="w-3.5 h-3.5" />{t.approved}</span> : <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"><Clock className="w-3.5 h-3.5" />{t.pending}</span>;
  };

  const renderContent = () => {
    if (loading) return <div className="text-center p-12 text-slate-600 font-medium">{t.loading}</div>;
    if (!isAdmin) return <FeedbackCard message={t.notAuthorized} description={t.notAuthorizedDesc} icon={Shield} iconColor="text-red-500" />;
    if (error) return <FeedbackCard message={t.error} description={error} icon={AlertTriangle} iconColor="text-red-500" />;
    if (allStartups.length === 0) return <FeedbackCard message={t.noStartups} description={t.noStartupsDesc} icon={AlertTriangle} iconColor="text-yellow-500" />;
    if (filteredStartups.length === 0) return <FeedbackCard message={t.noResults} description={t.noResultsDesc} icon={Search} iconColor="text-slate-500" />;

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
            {filteredStartups.map((startup, index) => (
              <tr key={startup.user_id} className="hover:bg-slate-50 transition duration-150">
                <td className="px-6 py-4 text-xs text-slate-900 font-bold font-mono">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{startup.company_name}</span>
                    <div className="text-xs text-slate-500 sm:hidden mt-1">{startup.founder_name || "N/A"}</div>
                    {startup.website && <a href={startup.website} target="_blank" className="text-blue-500 hover:text-blue-700 text-xs mt-1 flex items-center gap-1">Link <ExternalLink className="w-3 h-3" /></a>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell text-sm text-slate-600">{startup.founder_name || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-sm text-slate-600">{startup.email || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell text-sm text-slate-600">{startup.reference || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center hidden md:table-cell">
                  {startup.pitch_deck_url ? <a href={startup.pitch_deck_url} target="_blank" className="text-indigo-600 hover:text-indigo-800 p-2 inline-block rounded-full bg-indigo-50 hover:bg-indigo-100"><FileText className="w-4 h-4" /></a> : <span className="text-slate-400">-</span>}
                </td>
                <td className="px-6 py-4">
                  {startup.payment_status === 'paid' ? (
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                        <CheckCircle className="w-3 h-3" /> Paid {startup.is_gala ? "$1000" : "$500"}
                      </span>
                      <span className={`text-[10px] mt-1 font-bold ${startup.is_gala ? 'text-purple-600' : 'text-slate-500'}`}>
                        {startup.is_gala ? "Pass + Gala Dinner" : "Startup Pass Only"}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 font-mono" title={startup.stripe_session_id || ''}>
                        ID: {(startup.stripe_session_id || 'N/A').slice(0, 8)}...
                      </span>
                      {startup.paid_at && (
                        <span className="text-[10px] text-slate-400">
                          {new Date(startup.paid_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      <Clock className="w-3 h-3" /> Unpaid
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{renderStatusBadge(startup.is_approved)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex flex-col sm:flex-row gap-1">
                  {startup.is_approved === false ?
                    <button onClick={() => handleApprove(startup.user_id)} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"><Check className="w-4 h-4" /><span className="hidden sm:inline">{t.approve}</span></button>
                    :
                    <button onClick={() => handleDisapprove(startup.user_id)} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-white bg-red-600 hover:bg-red-700 transition"><X className="w-4 h-4" /><span className="hidden sm:inline">{t.disapprove}</span></button>
                  }
                  <button onClick={() => { setSelectedStartup(startup); setEditModalOpen(true); }} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition"><Edit className="w-4 h-4" /><span className="hidden sm:inline">{t.edit}</span></button>
                  <button onClick={() => handleDownloadCard(startup)} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition" title="Download ID Card"><Download className="w-4 h-4" /><span className="hidden sm:inline">Card</span></button>
                  <button onClick={() => { setSelectedStartup(startup); setDeleteModalOpen(true); }} className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-white bg-slate-400 hover:bg-slate-500 transition"><Trash2 className="w-4 h-4" /><span className="hidden sm:inline">{t.delete}</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // --- Badge Generation Logic ---
  const badgeRef = useRef<HTMLDivElement>(null);
  const [badgeStartup, setBadgeStartup] = useState<FounderProfile | null>(null);

  const handleDownloadCard = async (startup: FounderProfile) => {
    setBadgeStartup(startup);
    // Allow time for state to update and DOM to render
    setTimeout(() => generateBadge(startup), 500);
  };

  const generateBadge = async (startup: FounderProfile) => {
    if (!badgeRef.current) return;

    try {
      const canvas = await html2canvas(badgeRef.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
          const element = clonedDoc.getElementById('admin-badge-content');
          if (element) {
            element.style.visibility = 'visible';
          }
        }
      });

      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `Investarise-Pass-${startup.founder_name?.replace(/\s+/g, '-') || 'Founder'}.png`;
      link.click();

      // Clear after download
      setBadgeStartup(null);
    } catch (error) {
      console.error("Error generating badge:", error);
      alert("Could not download badge. Please try again.");
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header language={language} setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>} userEmail={session?.user?.email} />
      <main className="flex-1 pt-20 pb-12 sm:pt-24 sm:pb-16 px-3 sm:px-4">
        <div className="w-full px-4">
          <div className="mb-6"><h1 className="text-3xl font-extrabold text-slate-900">{t.title}</h1><p className="text-md text-slate-600 mt-1">{t.subtitle}</p></div>
          {isAdmin && allStartups.length > 0 && (
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
              <div className="relative flex-1 w-full">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t.searchPlaceholder} className="w-full pl-12 pr-4 py-2.5 text-base bg-white border border-slate-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2"><Search className="w-5 h-5 text-slate-400" /></div>
              </div>
              <button
                onClick={exportToExcel}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-md font-bold whitespace-nowrap"
              >
                <FileText className="w-5 h-5" /> Export Excel
              </button>
            </div>
          )}
          {renderContent()}
        </div>
      </main>
      <Footer language={language} />
      {editModalOpen && selectedStartup && <EditModal startup={selectedStartup} onClose={() => setEditModalOpen(false)} onSave={handleEditSave} onApprovePayment={handleApprovePayment} t={t} />}
      {deleteModalOpen && selectedStartup && <DeleteModal startup={selectedStartup} onClose={() => setDeleteModalOpen(false)} onDelete={handleDelete} t={t} />}

      {/* Hidden Badge Template for Generation */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        {badgeStartup && (
          <div
            ref={badgeRef}
            id="admin-badge-content"
            className="relative rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: 'radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%)',
              border: '1px solid #334155',
              fontFamily: 'Arial, sans-serif',
              width: '340px',
              minHeight: '500px',
              boxSizing: 'border-box',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'absolute', top: '-100px', left: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(197,160,89,0.1) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{
              padding: '30px 20px 20px 20px',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              zIndex: 10
            }}>
              <h5 style={{
                color: '#94a3b8',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                margin: '0 0 8px 0'
              }}>
                Official Event Pass
              </h5>
              <h2 style={{
                color: '#C5A059',
                fontSize: '22px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.2',
                margin: 0,
                textShadow: '0 2px 10px rgba(197,160,89,0.3)'
              }}>
                INVESTARISE<br />GLOBAL
              </h2>
            </div>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '30px 24px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 10
            }}>
              <div style={{
                width: '180px',
                padding: '12px',
                margin: '0 auto 24px auto',
                borderRadius: '12px',
                border: '2px solid #C5A059',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-white.png"
                  alt="Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h1 style={{
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: '800',
                margin: '0 0 8px 0',
                lineHeight: '1.2',
                wordWrap: 'break-word',
                textTransform: 'uppercase'
              }}>
                {badgeStartup.founder_name || 'Founder'}
              </h1>
              <p style={{
                color: '#cbd5e1',
                fontSize: '16px',
                fontWeight: '500',
                margin: '0 0 20px 0',
                opacity: 0.9,
                textTransform: 'uppercase'
              }}>
                {badgeStartup.company_name}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{
                  color: '#C5A059',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Founder Access
                </span>
              </div>
            </div>
            <div style={{
              background: '#ffffff',
              padding: '25px 20px',
              borderTop: '4px solid #C5A059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 10
            }}>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: '#64748b', fontSize: '9px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>
                  Event Date
                </p>
                <p style={{ color: '#0f172a', fontSize: '12px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                  FEB 2026
                </p>
                <p style={{ color: '#64748b', fontSize: '9px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 2px 0' }}>
                  Pass ID
                </p>
                <p style={{ color: '#0f172a', fontSize: '11px', fontFamily: 'monospace', margin: 0 }}>
                  {badgeStartup.user_id.slice(0, 8)}
                </p>
              </div>
              <div style={{
                padding: '4px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}>
                <QRCode value={badgeStartup.user_id} size={80} fgColor="#000000" bgColor="#ffffff" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

// --- 3. Modal Components ---

interface EditModalProps {
  startup: FounderProfile;
  onClose: () => void;
  onSave: (startup: FounderProfile) => void;
  onApprovePayment: (startupId: string, isGala: boolean) => void;
  t: Translations;
}

const EditModal: React.FC<EditModalProps> = ({ startup, onClose, onSave, onApprovePayment, t }) => {
  const [formData, setFormData] = useState<EditableFounderProfile>({
    email: startup.email || '',
    company_name: startup.company_name || '',
    founder_name: startup.founder_name || '',
    founder_phone: startup.founder_phone || '',
    website: startup.website || '',
    stage: startup.stage || '',
    description: startup.description || '',
    domain: startup.domain || '',
    domain_other_spec: startup.domain_other_spec || '',
    earning_status: startup.earning_status || '',
    is_approved: startup.is_approved ?? false,
    pitch_deck_url: startup.pitch_deck_url || '',
    company_linkedin: startup.company_linkedin || '',
    problem_description: startup.problem_description || '',
    // New Fields
    establishment_year: startup.establishment_year, // can be null
    turnover: startup.turnover || '',
    net_profit: startup.net_profit || '',
    it_returns_filed: startup.it_returns_filed ?? false,
    is_audited: startup.is_audited ?? false,
    reference: startup.reference || '',
    is_gala: startup.is_gala || false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: keyof EditableFounderProfile, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Parse number field
    const submissionData = {
      ...formData,
      establishment_year: formData.establishment_year ? Number(formData.establishment_year) : null,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('founder_profiles')
      .update(submissionData)
      .eq('user_id', startup.user_id)
      .select()
      .single();

    setIsSaving(false);

    if (error) {
      alert("Error: " + error.message);
    } else if (data) {
      if ((startup.is_approved ?? false) !== (data.is_approved ?? false)) {
        await supabase.from('profiles').update({ is_startup: data.is_approved, updated_at: new Date().toISOString() }).eq('id', startup.user_id);
      }
      onSave(data);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b bg-white rounded-t-xl">
            <h3 className="text-xl font-bold text-slate-900">{t.editStartup} - {startup.company_name}</h3>
            <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"><X className="w-6 h-6" /></button>
          </div>

          <div className="p-6 space-y-8">

            {/* General Information Section */}
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">{t.sectionGeneral}</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormInput name="company_name" label="Company Name" value={formData.company_name} onChange={handleChange} required />
                  <FormInput name="founder_name" label="Founder Name" value={formData.founder_name || ''} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormInput name="email" label="Email" type="email" value={formData.email || ''} onChange={handleChange} required />
                  <FormInput name="founder_phone" label="Founder Phone" type="tel" value={formData.founder_phone || ''} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormInput name="website" label="Website URL" value={formData.website || ''} onChange={handleChange} placeholder="https://example.com" />
                  <FormInput name="company_linkedin" label="Company LinkedIn URL" value={formData.company_linkedin || ''} onChange={handleChange} />
                </div>
                <FormInput name="pitch_deck_url" label="Pitch Deck URL" value={formData.pitch_deck_url || ''} onChange={handleChange} placeholder="https://..." />
                <FormTextArea name="description" label="Short Description" value={formData.description || ''} onChange={handleChange} rows={2} />
                <FormTextArea name="problem_description" label="Problem Description" value={formData.problem_description || ''} onChange={handleChange} rows={3} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormInput name="domain" label="Domain / Industry" value={formData.domain || ''} onChange={handleChange} />
                  <FormInput name="domain_other_spec" label="Domain (Other)" value={formData.domain_other_spec || ''} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormInput name="stage" label="Stage" value={formData.stage || ''} onChange={handleChange} />
                  <FormInput name="earning_status" label="Earning Status" value={formData.earning_status || ''} onChange={handleChange} />
                </div>
                <FormInput name="reference" label="Reference" value={formData.reference || ''} onChange={handleChange} placeholder="Reference source" />
              </div>
            </div>

            {/* Financial & Legal Section (NEW) */}
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">{t.sectionFinancial}</h4>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <FormInput
                    name="establishment_year"
                    label={t.establishmentYear}
                    type="number"
                    value={String(formData.establishment_year || '')}
                    onChange={handleChange}
                    icon={<Calendar className="w-4 h-4" />}
                  />
                  <FormInput
                    name="turnover"
                    label={t.turnover}
                    value={formData.turnover || ''}
                    onChange={handleChange}
                    icon={<DollarSign className="w-4 h-4" />}
                  />
                  <FormInput
                    name="net_profit"
                    label={t.netProfit}
                    value={formData.net_profit || ''}
                    onChange={handleChange}
                    icon={<DollarSign className="w-4 h-4" />}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <SwitchInput
                    label={t.itReturns}
                    checked={!!formData.it_returns_filed}
                    onChange={(val) => handleToggleChange('it_returns_filed', val)}
                    t={t}
                  />
                  <SwitchInput
                    label={t.audited}
                    checked={!!formData.is_audited}
                    onChange={(val) => handleToggleChange('is_audited', val)}
                    t={t}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <ToggleSwitch
                name="is_approved"
                label="Startup Approval Status"
                checked={!!formData.is_approved}
                onChange={(checked) => handleToggleChange('is_approved', checked)}
                t={t}
              />
            </div>

            {/* Payment Information Section (NEW) */}
            <div className="pt-6 border-t border-slate-200 mt-6 bg-slate-50 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Payment Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Payment Status</label>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${startup.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-700'}`}>
                    {startup.payment_status === 'paid' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {startup.payment_status === 'paid' ? 'PAID' : 'UNPAID'}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Payment Date</label>
                  <p className="text-sm font-mono text-slate-900 border border-slate-200 bg-white px-2 py-1 rounded">
                    {startup.paid_at ? new Date(startup.paid_at).toLocaleString() : '-'}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-slate-500 mb-1">Stripe Session ID</label>
                <div className="flex">
                  <code className="flex-1 block w-full px-3 py-1.5 bg-white border border-slate-300 rounded-l-md text-xs text-slate-600 font-mono overflow-x-auto whitespace-nowrap">
                    {startup.stripe_session_id || 'No transaction ID'}
                  </code>
                  {startup.stripe_session_id && (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(startup.stripe_session_id!);
                        alert("Copied Session ID!");
                      }}
                      className="px-3 py-1 bg-indigo-50 border border-l-0 border-indigo-200 rounded-r-md text-indigo-600 hover:bg-indigo-100 text-xs font-medium"
                    >
                      Copy
                    </button>
                  )}
                </div>
              </div>
              {startup.payment_status !== 'paid' && (
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onApprovePayment(startup.user_id, true);
                      onClose();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-bold shadow-sm"
                  >
                    <DollarSign className="w-4 h-4" /> Approve Paid (With Gala)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApprovePayment(startup.user_id, false);
                      onClose();
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-bold shadow-sm"
                  >
                    <DollarSign className="w-4 h-4" /> Approve Paid (No Gala)
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 z-10 flex justify-end items-center gap-3 p-6 bg-slate-50 border-t rounded-b-xl">
            <button type="button" onClick={onClose} disabled={isSaving} className="px-5 py-2.5 border border-slate-300 text-sm font-medium rounded-xl shadow-sm text-slate-700 bg-white hover:bg-slate-100 transition">{t.cancel}</button>
            <button type="submit" disabled={isSaving} className="px-5 py-2.5 rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 transition">{isSaving ? (t.loading + "...") : t.save}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteModalProps {
  startup: FounderProfile;
  onClose: () => void;
  onDelete: (startupId: string) => void;
  t: Translations;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ startup, onClose, onDelete, t }) => {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const isConfirmed = confirmText === "confirm delete";

  const handleDelete = async () => {
    if (!isConfirmed) return;
    setIsDeleting(true);
    const { error: founderError } = await supabase.from('founder_profiles').delete().eq('user_id', startup.user_id);
    await supabase.from('profiles').update({ is_startup: false, updated_at: new Date().toISOString() }).eq('id', startup.user_id);
    if (founderError) {
      setIsDeleting(false);
      alert("Error: " + founderError.message);
      return;
    }
    setIsDeleting(false);
    onDelete(startup.user_id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-slate-900">{t.deleteStartup}</h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-md text-slate-700 font-semibold">**{startup.company_name}**</p>
          <p className="text-sm text-red-600 font-medium"><AlertTriangle className="w-4 h-4 inline mr-1" />{t.deleteWarning}</p>
          <p className="text-sm text-slate-600">{t.deleteConfirmText}</p>
          <input type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="w-full px-4 py-2 text-sm bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="confirm delete" />
        </div>
        <div className="flex justify-end items-center gap-3 p-6 bg-slate-50 border-t rounded-b-xl">
          <button type="button" onClick={onClose} disabled={isDeleting} className="px-5 py-2.5 border border-slate-300 text-sm font-medium rounded-xl shadow-sm text-slate-700 bg-white hover:bg-slate-100 transition">{t.cancel}</button>
          <button type="button" onClick={handleDelete} disabled={!isConfirmed || isDeleting} className="px-5 py-2.5 rounded-xl shadow-md text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300 transition">{isDeleting ? (t.loading + "...") : t.deleteButton}</button>
        </div>
      </div>
    </div>
  );
};

// --- 4. Helper Components ---

const FormInput: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, required?: boolean, placeholder?: string, icon?: React.ReactNode }> = ({ name, label, value, onChange, type = 'text', required = false, placeholder = '', icon }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} placeholder={placeholder} className={`block w-full ${icon ? 'pl-9' : 'px-4'} pr-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition`} />
    </div>
  </div>
);

const FormTextArea: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }> = ({ name, label, value, onChange, rows = 3 }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <textarea id={name} name={name} value={value} onChange={onChange} rows={rows} className="block w-full px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition" />
  </div>
);

// Toggle for Approval (Big colored toggle)
const ToggleSwitch: React.FC<{ name: string, label: string, checked: boolean, onChange: (checked: boolean) => void, t: Translations }> = ({ name, label, checked, onChange, t }) => (
  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
    <label htmlFor={name} className="text-sm font-medium text-slate-700 flex flex-col">{label}<span className={`text-xs mt-0.5 font-bold ${checked ? 'text-green-600' : 'text-red-600'}`}>{checked ? t.approved : t.disapproved}</span></label>
    <button type="button" onClick={() => onChange(!checked)} className={`${checked ? 'bg-green-600' : 'bg-red-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`} role="switch" aria-checked={checked}>
      <span aria-hidden="true" className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
    </button>
  </div>
);

// Simple switch for boolean fields (IT Filed, Audited)
const SwitchInput: React.FC<{ label: string, checked: boolean, onChange: (val: boolean) => void, t: Translations }> = ({ label, checked, onChange, t }) => (
  <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
    <button type="button" onClick={() => onChange(!checked)} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-indigo-600' : 'bg-slate-200'}`} role="switch">
      <span aria-hidden="true" className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
    </button>
  </div>
);

interface FeedbackCardProps {
  message: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ message, description, icon: Icon, iconColor }) => (
  <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white border border-slate-200 rounded-xl shadow-lg">
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-slate-100 mb-4 ${iconColor}`}><Icon className="w-6 h-6 sm:w-7 h-7" /></div>
    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">{message}</h3>
    <p className="text-sm sm:text-base text-slate-600 max-w-sm">{description}</p>
  </div>
);