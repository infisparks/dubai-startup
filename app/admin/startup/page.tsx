"use client"

import type React from "react"
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react"
import { Session } from "@supabase/supabase-js"
// Assuming you have these components. If not, you may need to remove or mock them.
import Header from "@/components/header" 
import Footer from "@/components/footer" 
import { supabase } from "@/lib/supabaseConfig"
import {
    AlertTriangle, Check, Edit, Trash2, X, Shield,
    CheckCircle, Clock, Search, ExternalLink, FileText, XCircle
} from "lucide-react"

// --- 1. Define Types ---

interface FounderProfile {
  user_id: string;
  email: string | null; // Added email
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
  is_approved: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

// Define *all* fields we allow to be edited
type EditableFounderProfile = Pick<
  FounderProfile,
  'email' | 'company_name' | 'founder_name' | 'founder_phone' | 'website' | 'stage' |
  'description' | 'domain' | 'domain_other_spec' | 'earning_status' | 'is_approved' |
  'pitch_deck_url' | 'company_linkedin' | 'problem_description'
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
    disapproved: string; // New
    edit: string;
    delete: string;
    approve: string;
    disapprove: string; // New
    noStartups: string;
    noStartupsDesc: string;
    noResults: string;
    noResultsDesc: string;
    // Modals
    editStartup: string;
    save: string;
    cancel: string;
    deleteStartup: string;
    deleteWarning: string;
    deleteConfirmText: string;
    deleteButton: string;
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
        disapproved: "مرفوض ❌", // New
        edit: "تعديل",
        delete: "حذف",
        approve: "قبول",
        disapprove: "رفض", // New
        noStartups: "لا توجد شركات ناشئة",
        noStartupsDesc: "لا توجد شركات ناشئة في النظام حتى الآن.",
        noResults: "لا توجد نتائج",
        noResultsDesc: "لم يتم العثور على شركات تطابق بحثك.",
        editStartup: "تعديل الشركة الناشئة",
        save: "حفظ",
        cancel: "إلغاء",
        deleteStartup: "حذف الشركة الناشئة",
        deleteWarning: "هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الملف الشخصي للشركة نهائيًا.",
        deleteConfirmText: "لحذف، اكتب 'CONFIRM' في المربع أدناه:",
        deleteButton: "حذف",
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
        disapproved: "Disapproved ❌", // New
        edit: "Edit",
        delete: "Delete",
        approve: "Approve",
        disapprove: "Disapprove", // New
        noStartups: "No Startups Found",
        noStartupsDesc: "There are no startups in the system yet.",
        noResults: "No Results Found",
        noResultsDesc: "No startups match your search criteria.",
        editStartup: "Edit Startup",
        save: "Save",
        cancel: "Cancel",
        deleteStartup: "Delete Startup",
        deleteWarning: "This action cannot be undone. This will permanently delete the startup's profile.",
        deleteConfirmText: "To delete, type 'CONFIRM' in the box below:",
        deleteButton: "Delete",
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

      // 1. Check if user is admin
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

      // 2. If admin, fetch all startups
      const { data: startupsData, error: startupsError } = await supabase
        .from('founder_profiles')
        .select('*');

      if (startupsError) {
        console.error("Error fetching startups:", startupsError);
        setError(t.errorDesc);
      } else {
        // Ensure is_approved is a boolean; treat null as false/pending for display purposes
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

  // --- Utility Functions for Approval/Disapproval ---
  const updateApprovalStatus = async (startupId: string, isApproved: boolean) => {
    // 1. Update founder_profiles table
    const { data, error } = await supabase
      .from('founder_profiles')
      .update({ is_approved: isApproved, updated_at: new Date().toISOString() })
      .eq('user_id', startupId)
      .select()
      .single();

    if (error) {
      alert(`Error ${isApproved ? 'approving' : 'disapproving'} startup: ` + error.message);
      return null;
    }
    
    // 2. Update profiles table (assuming setting/unsetting the 'is_startup' flag)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ is_startup: isApproved, updated_at: new Date().toISOString() })
      .eq('id', startupId);

    if (profileError) {
        console.error("Error updating profiles table:", profileError.message);
        alert(`Startup status updated in founder_profiles, but failed to update 'profiles' table. Please check console.`);
    }

    return data;
  }

  // --- Event Handlers ---

  const handleApprove = async (startupId: string) => {
    const data = await updateApprovalStatus(startupId, true);
    if (data) {
      setAllStartups(allStartups.map(s => s.user_id === startupId ? data : s));
    }
  };

  const handleDisapprove = async (startupId: string) => {
    const data = await updateApprovalStatus(startupId, false);
    if (data) {
      setAllStartups(allStartups.map(s => s.user_id === startupId ? data : s));
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

  // --- Filtering Logic ---
  const filteredStartups = useMemo(() => {
    if (!searchTerm) return allStartups;
    const lowerSearch = searchTerm.toLowerCase();
    return allStartups.filter(s =>
      s.company_name.toLowerCase().includes(lowerSearch) ||
      (s.founder_name && s.founder_name.toLowerCase().includes(lowerSearch)) ||
      (s.email && s.email.toLowerCase().includes(lowerSearch))
    );
  }, [allStartups, searchTerm]);

  // --- Render Functions ---

  const renderStatusBadge = (isApproved: boolean | null) => {
    const status = isApproved === true ? 'approved' : 'pending'; // Treat false/null as pending/disapproved for initial check
    
    // Explicitly check for 'false' approval status to display 'Disapproved'
    if (isApproved === false) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          <XCircle className="w-3.5 h-3.5" />
          {t.disapproved}
        </span>
      );
    }
    
    // Check for 'true' or null/default (which we'll treat as Pending for a fresh submission)
    return isApproved ? (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        <CheckCircle className="w-3.5 h-3.5" />
        {t.approved}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
        <Clock className="w-3.5 h-3.5" />
        {t.pending}
      </span>
    );
  };
  
  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-12 text-slate-600 font-medium">{t.loading}</div>;
    }

    if (!isAdmin) {
      return <FeedbackCard message={t.notAuthorized} description={t.notAuthorizedDesc} icon={Shield} iconColor="text-red-500" />;
    }

    if (error) {
      return <FeedbackCard message={t.error} description={error} icon={AlertTriangle} iconColor="text-red-500" />;
    }

    if (allStartups.length === 0) {
      return <FeedbackCard message={t.noStartups} description={t.noStartupsDesc} icon={AlertTriangle} iconColor="text-yellow-500" />;
    }

    if (filteredStartups.length === 0) {
      return <FeedbackCard message={t.noResults} description={t.noResultsDesc} icon={Search} iconColor="text-slate-500" />;
    }

    return (
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-100">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t.company}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">{t.founder}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">{t.email}</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">{t.pitchDeck}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t.status}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {filteredStartups.map(startup => (
              <tr key={startup.user_id} className="hover:bg-slate-50 transition duration-150 ease-in-out">
                {/* Company Name (and Website on mobile) */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{startup.company_name}</span>
                    <div className="text-xs text-slate-500 sm:hidden mt-1">
                        {startup.founder_name || "N/A"}
                    </div>
                    {startup.website && (
                      <a href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-xs mt-1 flex items-center gap-1">
                        {startup.website.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </td>
                
                {/* Founder Name (Desktop) */}
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <span className="text-sm text-slate-600">{startup.founder_name || "N/A"}</span>
                </td>
                
                {/* Email (Desktop) */}
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <span className="text-sm text-slate-600">{startup.email || "N/A"}</span>
                </td>
                
                {/* Pitch Deck (Desktop) */}
                <td className="px-6 py-4 whitespace-nowrap text-center hidden md:table-cell">
                  {startup.pitch_deck_url ? (
                    <a href={startup.pitch_deck_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 p-2 inline-block rounded-full bg-indigo-50 hover:bg-indigo-100 transition">
                      <FileText className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                
                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusBadge(startup.is_approved)}
                </td>
                
                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-y-1 sm:space-y-0 sm:space-x-1 flex flex-col sm:flex-row">
                  {startup.is_approved === false ? (
                    // Show Approve button if not approved
                    <button
                      onClick={() => handleApprove(startup.user_id)}
                      title={t.approve}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition w-full sm:w-auto"
                    >
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">{t.approve}</span>
                    </button>
                  ) : (
                    // Show Disapprove button if approved (or implicitly pending/null for first action)
                    <button
                      onClick={() => handleDisapprove(startup.user_id)}
                      title={t.disapprove}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition w-full sm:w-auto"
                    >
                      <X className="w-4 h-4" />
                      <span className="hidden sm:inline">{t.disapprove}</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedStartup(startup);
                      setEditModalOpen(true);
                    }}
                    title={t.edit}
                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-lg shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition w-full sm:w-auto"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.edit}</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedStartup(startup);
                      setDeleteModalOpen(true);
                    }}
                    title={t.delete}
                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition w-full sm:w-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.delete}</span>
                  </button>
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
      {/* Assuming Header and Footer exist and manage their own responsiveness */}
      <Header
        language={language}
        setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>}
        userEmail={session?.user?.email}
      />

      <main className="flex-1 pt-20 pb-12 sm:pt-24 sm:pb-16 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900">{t.title}</h1>
            <p className="text-md text-slate-600 mt-1">{t.subtitle}</p>
          </div>

          {/* Search Bar */}
          {isAdmin && allStartups.length > 0 && (
            <div className="relative mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-2.5 text-base bg-white border border-slate-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          )}

          {/* Content */}
          {renderContent()}
        </div>
      </main>

      <Footer language={language} />

      {/* Modals */}
      {editModalOpen && selectedStartup && (
        <EditModal
          startup={selectedStartup}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditSave}
          t={t}
        />
      )}

      {deleteModalOpen && selectedStartup && (
        <DeleteModal
          startup={selectedStartup}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDelete}
          t={t}
        />
      )}
    </div>
  );
}

// --- 3. Modal Components ---

interface EditModalProps {
  startup: FounderProfile;
  onClose: () => void;
  onSave: (startup: FounderProfile) => void;
  t: Translations;
}

const EditModal: React.FC<EditModalProps> = ({ startup, onClose, onSave, t }) => {
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
    is_approved: startup.is_approved ?? false, // Use ?? to handle null
    pitch_deck_url: startup.pitch_deck_url || '',
    company_linkedin: startup.company_linkedin || '',
    problem_description: startup.problem_description || '',
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

    const { data, error } = await supabase
      .from('founder_profiles')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('user_id', startup.user_id)
      .select()
      .single();

    setIsSaving(false);

    if (error) {
      alert("Error updating startup: " + error.message);
    } else if (data) {
        // Also update the 'profiles' table if is_approved changed
        const originalApproval = startup.is_approved ?? false;
        const newApproval = data.is_approved ?? false;
        
        if (originalApproval !== newApproval) {
             const { error: profileError } = await supabase
              .from('profiles')
              .update({ is_startup: newApproval, updated_at: new Date().toISOString() })
              .eq('id', startup.user_id);
              
            if (profileError) {
                console.error("Error updating profiles table after edit save:", profileError.message);
                alert("Startup updated, but failed to update 'profiles' table. Please check console.");
            }
        }
        
      onSave(data);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b bg-white rounded-t-xl">
            <h3 className="text-xl font-bold text-slate-900">{t.editStartup} - **{startup.company_name}**</h3>
            <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            
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
            
            <FormInput name="pitch_deck_url" label="Pitch Deck URL" value={formData.pitch_deck_url || ''} onChange={handleChange} placeholder="https://docs.google.com/..." />
            
            <FormTextArea name="description" label="Short Description (Max 200 chars)" value={formData.description || ''} onChange={handleChange} rows={2} />
            <FormTextArea name="problem_description" label="Problem Description" value={formData.problem_description || ''} onChange={handleChange} rows={3} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormInput name="domain" label="Domain / Industry" value={formData.domain || ''} onChange={handleChange} />
              <FormInput name="domain_other_spec" label="Domain (Other Specification)" value={formData.domain_other_spec || ''} onChange={handleChange} />
            </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormInput name="stage" label="Stage (e.g., Pre-Seed, Seed)" value={formData.stage || ''} onChange={handleChange} />
              <FormInput name="earning_status" label="Earning Status (e.g., Pre-Revenue, MRR)" value={formData.earning_status || ''} onChange={handleChange} />
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
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 z-10 flex justify-end items-center gap-3 p-6 bg-slate-50 border-t rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 border border-slate-300 text-sm font-medium rounded-xl shadow-sm text-slate-700 bg-white hover:bg-slate-100 focus:outline-none transition"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-300 transition"
            >
              {isSaving ? (t.loading + "...") : t.save}
            </button>
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
  const isConfirmed = confirmText === "CONFIRM";

  const handleDelete = async () => {
    if (!isConfirmed) return;

    setIsDeleting(true);
    
    // 1. Delete founder_profiles entry
    const { error: founderError } = await supabase
      .from('founder_profiles')
      .delete()
      .eq('user_id', startup.user_id);
      
    // 2. Optional: Reset profiles table flags if needed (e.g., is_startup)
     const { error: profileError } = await supabase
      .from('profiles')
      .update({ is_startup: false, updated_at: new Date().toISOString() })
      .eq('id', startup.user_id);
      
    if (founderError) {
      setIsDeleting(false);
      alert("Error deleting startup: " + founderError.message);
      return;
    }
    
    if (profileError) {
      console.error("Error updating profiles table during deletion:", profileError.message);
      alert("Startup deleted, but failed to reset 'profiles' table flag. Please check console.");
    }

    setIsDeleting(false);
    onDelete(startup.user_id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 opacity-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-slate-900">{t.deleteStartup}</h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-md text-slate-700 font-semibold">
            **{startup.company_name}**
          </p>
          <p className="text-sm text-red-600 font-medium">
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            {t.deleteWarning}
          </p>
          <p className="text-sm text-slate-600">
            {t.deleteConfirmText}
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            placeholder="CONFIRM"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-6 bg-slate-50 border-t rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-5 py-2.5 border border-slate-300 text-sm font-medium rounded-xl shadow-sm text-slate-700 bg-white hover:bg-slate-100 focus:outline-none transition"
          >
            {t.cancel}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmed || isDeleting}
            className="px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl shadow-md text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:bg-red-300 disabled:cursor-not-allowed transition"
          >
            {isDeleting ? (t.loading + "...") : t.deleteButton}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 4. Helper Components ---

const FormInput: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, required?: boolean, placeholder?: string }> = ({ name, label, value, onChange, type = 'text', required = false, placeholder = '' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="block w-full px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition"
    />
  </div>
);

const FormTextArea: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }> = ({ name, label, value, onChange, rows = 3 }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="block w-full px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition"
    />
  </div>
);

const ToggleSwitch: React.FC<{ name: string, label: string, checked: boolean, onChange: (checked: boolean) => void, t: Translations }> = ({ name, label, checked, onChange, t }) => (
    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
        <label htmlFor={name} className="text-sm font-medium text-slate-700 flex flex-col">
            {label}
            <span className={`text-xs mt-0.5 font-bold ${checked ? 'text-green-600' : 'text-red-600'}`}>
                {checked ? t.approved : t.disapproved}
            </span>
        </label>
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`${
                checked ? 'bg-green-600' : 'bg-red-600'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            role="switch"
            aria-checked={checked}
        >
            <span
                aria-hidden="true"
                className={`${
                    checked ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
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
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-slate-100 mb-4 ${iconColor}`}>
            <Icon className="w-6 h-6 sm:w-7 h-7" />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">{message}</h3>
        <p className="text-sm sm:text-base text-slate-600 max-w-sm">{description}</p>
    </div>
);