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
    CheckCircle, Clock, Search, ExternalLink, FileText
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
    email: string; // Added
    pitchDeck: string; // Added
    status: string;
    actions: string;
    approved: string;
    pending: string;
    edit: string;
    delete: string;
    approve: string;
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
        title: "إدارة الشركات الناشئة",
        subtitle: "مراجعة وتعديل وحذف ملفات الشركات الناشئة.",
        loading: "جاري التحميل...",
        notAuthorized: "غير مصرح لك",
        notAuthorizedDesc: "يجب أن تكون مسؤولاً للوصول إلى هذه الصفحة.",
        error: "حدث خطأ",
        errorDesc: "لم نتمكن من تحميل البيانات. يرجى المحاولة مرة أخرى.",
        searchPlaceholder: "ابحث باسم الشركة أو المؤسس...",
        company: "الشركة",
        founder: "المؤسس",
        email: "البريد الإلكتروني",
        pitchDeck: "ملف العرض",
        status: "الحالة",
        actions: "الإجراءات",
        approved: "مقبول",
        pending: "قيد الانتظار",
        edit: "تعديل",
        delete: "حذف",
        approve: "قبول",
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
        title: "Startup Management",
        subtitle: "Review, approve, edit, and delete startup profiles.",
        loading: "Loading...",
        notAuthorized: "Not Authorized",
        notAuthorizedDesc: "You must be an admin to access this page.",
        error: "An Error Occurred",
        errorDesc: "We couldn't load the data. Please try again.",
        searchPlaceholder: "Search by company name or founder...",
        company: "Company",
        founder: "Founder",
        email: "Email",
        pitchDeck: "Pitch Deck",
        status: "Status",
        actions: "Actions",
        approved: "Approved",
        pending: "Pending",
        edit: "Edit",
        delete: "Delete",
        approve: "Approve",
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
      // Assumes `email` column exists on `founder_profiles` table
      const { data: startupsData, error: startupsError } = await supabase
        .from('founder_profiles')
        .select('*');

      if (startupsError) {
        console.error("Error fetching startups:", startupsError);
        setError(t.errorDesc);
      } else {
        setAllStartups(startupsData || []);
      }
      setLoading(false);
    };

    initialize();
  }, [t.errorDesc]);

  // --- Event Handlers ---

  const handleApprove = async (startupId: string) => {
    // 1. Update founder_profiles table
    const { data, error } = await supabase
      .from('founder_profiles')
      .update({ is_approved: true, updated_at: new Date().toISOString() })
      .eq('user_id', startupId)
      .select()
      .single();

    if (error) {
      alert("Error approving startup: " + error.message);
      return; // Stop if primary approval fails
    }
    
    // 2. Update profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ is_startup: true, updated_at: new Date().toISOString() })
      .eq('id', startupId); // Match on the same user ID
      
    if (profileError) {
        // Log the error but don't block the UI update, as the main approval succeeded
        console.error("Error updating profiles table:", profileError.message);
        alert("Startup approved, but failed to update 'profiles' table. Please check console.");
    }

    // 3. Update state
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

  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-12">{t.loading}</div>;
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
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.company}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.founder}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.email}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.pitchDeck}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.status}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredStartups.map(startup => (
              <tr key={startup.user_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">{startup.company_name}</span>
                    {startup.website && (
                      <a href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600">{startup.founder_name || "N/A"}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600">{startup.email || "N/A"}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {startup.pitch_deck_url ? (
                    <a href={startup.pitch_deck_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      <FileText className="w-5 h-5" />
                    </a>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {startup.is_approved ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {t.approved}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="w-3.5 h-3.5" />
                      {t.pending}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {!startup.is_approved && (
                    <button
                      onClick={() => handleApprove(startup.user_id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                    >
                      <Check className="w-4 h-4" />
                      {t.approve}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedStartup(startup);
                      setEditModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                  >
                    <Edit className="w-4 h-4" />
                    {t.edit}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStartup(startup);
                      setDeleteModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t.delete}
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
      <Header
        language={language}
        setLanguage={setLanguage as Dispatch<SetStateAction<"en" | "ar">>}
        userEmail={session?.user?.email}
      />

      <main className="flex-1 pt-20 pb-12 sm:pt-24 sm:pb-16 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">{t.title}</h1>
            <p className="text-sm text-slate-600">{t.subtitle}</p>
          </div>

          {/* Search Bar */}
          {isAdmin && allStartups.length > 0 && (
            <div className="relative mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-slate-400" />
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
    is_approved: startup.is_approved || false,
    pitch_deck_url: startup.pitch_deck_url || '',
    company_linkedin: startup.company_linkedin || '',
    problem_description: startup.problem_description || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

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
      onSave(data);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium text-slate-900">{t.editStartup}</h3>
            <button type="button" onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="company_name" label="Company Name" value={formData.company_name} onChange={handleChange} />
              <FormInput name="founder_name" label="Founder Name" value={formData.founder_name || ''} onChange={handleChange} />
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="email" label="Email" value={formData.email || ''} onChange={handleChange} />
              <FormInput name="founder_phone" label="Founder Phone" value={formData.founder_phone || ''} onChange={handleChange} />
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="website" label="Website" value={formData.website || ''} onChange={handleChange} />
              <FormInput name="company_linkedin" label="Company LinkedIn" value={formData.company_linkedin || ''} onChange={handleChange} />
            </div>
            <FormInput name="pitch_deck_url" label="Pitch Deck URL" value={formData.pitch_deck_url || ''} onChange={handleChange} />
            <FormTextArea name="description" label="Short Description" value={formData.description || ''} onChange={handleChange} />
            <FormTextArea name="problem_description" label="Problem Description" value={formData.problem_description || ''} onChange={handleChange} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="domain" label="Domain" value={formData.domain || ''} onChange={handleChange} />
              <FormInput name="domain_other_spec" label="Domain (Other)" value={formData.domain_other_spec || ''} onChange={handleChange} />
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput name="stage" label="Stage" value={formData.stage || ''} onChange={handleChange} />
              <FormInput name="earning_status" label="Earning Status" value={formData.earning_status || ''} onChange={handleChange} />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_approved"
                name="is_approved"
                checked={formData.is_approved || false}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="is_approved" className="ml-2 block text-sm font-medium text-slate-700">
                {t.approved}
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center gap-3 p-4 bg-slate-50 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
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
    const { error } = await supabase
      .from('founder_profiles')
      .delete()
      .eq('user_id', startup.user_id);

    setIsDeleting(false);

    if (error) {
      alert("Error deleting startup: " + error.message);
    } else {
      onDelete(startup.user_id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md m-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-slate-900">{t.deleteStartup}</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            {t.deleteWarning}
          </p>
          <p className="text-sm text-slate-600">
            {t.deleteConfirmText}
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="CONFIRM"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-4 bg-slate-50 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none"
          >
            {t.cancel}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmed || isDeleting}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isDeleting ? (t.loading + "...") : t.deleteButton}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 4. Helper Components ---

const FormInput: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ name, label, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const FormTextArea: React.FC<{ name: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }> = ({ name, label, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

interface FeedbackCardProps {
  message: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ message, description, icon: Icon, iconColor }) => (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-slate-100 mb-4 ${iconColor}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{message}</h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm">{description}</p>
    </div>
);