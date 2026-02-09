// @/app/admin/exhibitor-dashboard/page.tsx
"use client"

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { supabase } from "@/lib/supabaseConfig"
import {
    Filter, Search, Users, CheckCircle, Clock, X, Loader2,
    Save, Store, XCircle, User, Link as LinkIcon, Phone, Mail, FileText, Trash2, Download
} from "lucide-react"
import { useForm, Controller } from 'react-hook-form';
import { cn } from "@/lib/utils"
import * as XLSX from 'xlsx';
import html2canvas from "html2canvas"
import QRCode from "react-qr-code"

// --- Types ---

interface ExhibitorProfile {
    user_id: string;
    company_name: string;
    company_website: string;
    contact_phone: string;
    booth_type: string;
    company_description: string;
    company_logo_url: string | null;
    is_approved: boolean;
    email: string; // From DB fetch
    contact_personname: string;
    created_at: string;
    reference: string | null;
    payment_status: string;
    stripe_session_id: string | null;
    paid_at: string | null;
}

// Type for the editable fields
interface EditableProfileFields {
    company_name: string;
    company_website: string;
    contact_personname: string;
    contact_phone: string;
    booth_type: string;
    company_description: string;
    reference: string;
    is_approved: boolean;
}

// --- Helper Components (FIXED WITH FORWARD REF) ---

const FormInput = React.forwardRef<HTMLInputElement, any>(({ label, icon, ...props }, ref) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
            <input
                ref={ref}
                {...props}
                className={`block w-full ${icon ? 'pl-9' : 'px-4'} pr-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition`}
            />
        </div>
    </div>
));
FormInput.displayName = "FormInput";

const FormSelect = React.forwardRef<HTMLSelectElement, any>(({ label, options, value, onChange, ...props }, ref) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <select
            ref={ref}
            value={value}
            onChange={onChange}
            {...props}
            className="block w-full px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition"
        >
            <option value="" disabled>Select an option</option>
            {options.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
));
FormSelect.displayName = "FormSelect";

const FormTextarea = React.forwardRef<HTMLTextAreaElement, any>(({ label, ...props }, ref) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <textarea
            ref={ref}
            {...props}
            className="block w-full px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition resize-none"
        />
    </div>
));
FormTextarea.displayName = "FormTextarea";

const ToggleSwitch = ({ label, checked, onChange }: any) => (
    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
        <label className="text-sm font-medium text-slate-700 flex flex-col">
            {label}
            <span className={`text-xs mt-0.5 font-bold ${checked ? 'text-green-600' : 'text-blue-600'}`}>
                {checked ? 'APPROVED' : 'PENDING / DISAPPROVED'}
            </span>
        </label>
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`${checked ? 'bg-green-600' : 'bg-blue-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
        >
            <span aria-hidden="true" className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
        </button>
    </div>
);


// --- 1. Exhibitor Review Modal ---

interface ExhibitorReviewModalProps {
    profile: ExhibitorProfile;
    onClose: () => void;
    onSave: (updatedProfile: ExhibitorProfile) => void;
    onApprovePayment: (userId: string) => void;
    boothOptions: string[];
}

const ExhibitorReviewModal: React.FC<ExhibitorReviewModalProps> = ({ profile, onClose, onSave, onApprovePayment, boothOptions }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // RHF Setup
    const { control, handleSubmit, register, watch, setValue, reset } = useForm<EditableProfileFields>({
        defaultValues: {
            company_name: '',
            company_website: '',
            contact_personname: '',
            contact_phone: '',
            booth_type: '',
            company_description: '',
            reference: '',
            is_approved: false
        },
    });

    const watchedDescription = watch('company_description') || '';

    // 🟢 CRITICAL FIX: Reset form values when profile prop changes
    useEffect(() => {
        if (profile) {
            console.log("Loading exhibitor data:", profile);
            reset({
                company_name: profile.company_name || '',
                company_website: profile.company_website || '',
                contact_personname: profile.contact_personname || '',
                contact_phone: profile.contact_phone || '',
                booth_type: profile.booth_type || '',
                company_description: profile.company_description || '',
                reference: profile.reference || '',
                is_approved: profile.is_approved || false
            });
        }
    }, [profile, reset]);

    const onSubmit = async (data: EditableProfileFields) => {
        setIsSubmitting(true);
        try {
            // 1. Update Exhibitor Profile Table
            const { data: updatedData, error } = await supabase
                .from('exhibitor_profiles')
                .update({
                    company_name: data.company_name,
                    company_website: data.company_website,
                    contact_personname: data.contact_personname,
                    contact_phone: data.contact_phone,
                    booth_type: data.booth_type,
                    company_description: data.company_description,
                    reference: data.reference,
                    is_approved: data.is_approved
                })
                .eq('user_id', profile.user_id)
                .select()
                .single();

            if (error) throw error;

            // 2. Sync with Main Profiles Table (if needed)
            if (profile.is_approved !== data.is_approved) {
                await supabase
                    .from('profiles')
                    .update({ is_exhibitor: data.is_approved })
                    .eq('id', profile.user_id);
            }

            onSave(updatedData);
            onClose();

        } catch (err: any) {
            console.error("Error updating profile:", err);
            alert(`Failed to save: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Header */}
                    <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b bg-white rounded-t-xl">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Store className="w-5 h-5 text-blue-600" /> Review Exhibitor: {profile.company_name}
                        </h3>
                        <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Col 1: Company Info */}
                            <div className="lg:col-span-1 space-y-4">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Company Info</h4>

                                <div className="flex justify-center mb-4">
                                    <div className="w-32 h-32 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-2">
                                        {profile.company_logo_url ? (
                                            <img src={profile.company_logo_url} alt="Logo" className="w-full h-full object-contain" />
                                        ) : (
                                            <Store className="w-10 h-10 text-slate-300" />
                                        )}
                                    </div>
                                </div>

                                <FormInput label="Company Name" {...register('company_name', { required: true })} icon={<Store className="w-4 h-4" />} />
                                <FormInput label="Website" {...register('company_website')} icon={<LinkIcon className="w-4 h-4" />} />

                                <div className="border-t pt-4 mt-4">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Contact Person</h4>
                                    <div className="space-y-4">
                                        <FormInput label="Name" {...register('contact_personname', { required: true })} icon={<User className="w-4 h-4" />} />
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email (Read-only)</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4" /></div>
                                                <input value={profile.email} disabled className="block w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-300 rounded-lg shadow-sm text-sm text-slate-500 cursor-not-allowed" />
                                            </div>
                                        </div>
                                        <FormInput label="Phone" {...register('contact_phone', { required: true })} icon={<Phone className="w-4 h-4" />} />
                                        <FormInput label="Reference" {...register('reference')} icon={<FileText className="w-4 h-4" />} />
                                    </div>
                                </div>
                            </div>

                            {/* Col 2: Exhibition Details */}
                            <div className="lg:col-span-2 space-y-4">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Exhibition Details</h4>

                                <Controller
                                    name="booth_type"
                                    control={control}
                                    render={({ field }) => (
                                        <FormSelect
                                            label="Booth Package"
                                            options={boothOptions}
                                            {...field}
                                        />
                                    )}
                                />

                                <div>
                                    <FormTextarea
                                        label="Company Description"
                                        {...register('company_description', { required: true, maxLength: 300 })}
                                        rows={6}
                                    />
                                    <div className="flex justify-end mt-1 text-xs text-slate-400">{watchedDescription.length} chars</div>
                                </div>

                                {/* Status Toggle */}
                                <div className="pt-6 border-t border-slate-200 mt-6">
                                    <Controller
                                        name="is_approved"
                                        control={control}
                                        render={({ field }) => (
                                            <ToggleSwitch
                                                label="Exhibitor Approval Status"
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="pt-6 border-t border-slate-200 mt-6 bg-slate-50 p-4 rounded-lg">
                                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Payment Information</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Payment Status</label>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${profile.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-700'}`}>
                                                {profile.payment_status === 'paid' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                                {profile.payment_status === 'paid' ? 'PAID' : 'UNPAID'}
                                            </span>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Payment Date</label>
                                            <p className="text-sm font-mono text-slate-900 border border-slate-200 bg-white px-2 py-1 rounded">
                                                {profile.paid_at ? new Date(profile.paid_at).toLocaleString() : '-'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="block text-xs font-medium text-slate-500 mb-1">Stripe Session ID</label>
                                        <div className="flex">
                                            <code className="flex-1 block w-full px-3 py-1.5 bg-white border border-slate-300 rounded-l-md text-xs text-slate-600 font-mono overflow-x-auto whitespace-nowrap">
                                                {profile.stripe_session_id || 'No transaction ID'}
                                            </code>
                                            {profile.stripe_session_id && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(profile.stripe_session_id!);
                                                        alert("Copied Session ID!");
                                                    }}
                                                    className="px-3 py-1 bg-indigo-50 border border-l-0 border-indigo-200 rounded-r-md text-indigo-600 hover:bg-indigo-100 text-xs font-medium"
                                                >
                                                    Copy
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {profile.payment_status !== 'paid' && (
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onApprovePayment(profile.user_id);
                                                    onClose();
                                                }}
                                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-bold shadow-sm"
                                            >
                                                <Store className="w-4 h-4" /> Approve Paid (Direct)
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 z-10 flex justify-end items-center gap-3 p-6 bg-slate-50 border-t rounded-b-xl">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-5 py-2.5 border border-slate-300 text-sm font-medium rounded-xl shadow-sm text-slate-700 bg-white hover:bg-slate-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-5 py-2.5 rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 transition flex items-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

// --- Deletion Confirm Modal ---
interface DeleteConfirmModalProps {
    profile: ExhibitorProfile;
    onClose: () => void;
    onConfirm: (userId: string) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ profile, onClose, onConfirm }) => {
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const isConfirmed = confirmText === "confirm delete";

    const handleDelete = async () => {
        if (!isConfirmed) return;
        setIsDeleting(true);
        try {
            await onConfirm(profile.user_id);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex items-center gap-3 text-blue-600 mb-4">
                        <XCircle className="w-8 h-8" />
                        <h3 className="text-xl font-bold text-slate-900">Confirm Deletion</h3>
                    </div>
                    <p className="text-slate-600 mb-4">
                        This will permanently delete the exhibitor profile for <span className="font-bold text-slate-900">{profile.company_name}</span>. This action cannot be undone.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-200">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Please type <span className="font-mono font-bold text-blue-600">confirm delete</span> to proceed:
                        </label>
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder="Type here..."
                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={!isConfirmed || isDeleting}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition font-medium flex items-center justify-center gap-2"
                        >
                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            Delete Permanently
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// 2. Main Admin Dashboard Component
export default function AdminExhibitorDashboard() {
    const [profiles, setProfiles] = useState<ExhibitorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [approvalFilter, setApprovalFilter] = useState('all');

    // Modal State
    const [selectedProfileForModal, setSelectedProfileForModal] = useState<ExhibitorProfile | null>(null);
    const [selectedProfileForDelete, setSelectedProfileForDelete] = useState<ExhibitorProfile | null>(null);

    // Hardcoded Booth Options
    const BOOTH_OPTIONS = useMemo(() => ["Startup Pod (2x2m)", "Standard Shell (3x3m)", "Premium Booth (6x3m)", "Custom Build (Space only)"], []);

    const fetchExhibitorProfiles = useCallback(async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('exhibitor_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (approvalFilter === 'approved') query = query.eq('is_approved', true);
            else if (approvalFilter === 'pending') query = query.eq('is_approved', false);

            const { data, error } = await query;
            if (error) throw error;

            // Format data
            const formattedData = (data || []).map(p => ({
                ...p,
                email: p.email || 'N/A',
                contact_personname: p.contact_personname || 'N/A',
            })) as ExhibitorProfile[];

            setProfiles(formattedData);
        } catch (err: any) {
            console.error("Error fetching:", err);
        } finally {
            setLoading(false);
        }
    }, [approvalFilter]);

    useEffect(() => {
        fetchExhibitorProfiles();
    }, [fetchExhibitorProfiles]);

    const handleModalSave = (updatedProfile: ExhibitorProfile) => {
        setProfiles(prev => prev.map(p => p.user_id === updatedProfile.user_id ? updatedProfile : p));
        fetchExhibitorProfiles(); // Refresh to be safe
    };

    const handleApprovePaymentDirect = async (userId: string) => {
        if (confirm(`Approve payment as "direct" for this exhibitor?`)) {
            try {
                const { error } = await supabase
                    .from('exhibitor_profiles')
                    .update({
                        payment_status: 'paid',
                        stripe_session_id: 'direct',
                        paid_at: new Date().toISOString()
                    })
                    .eq('user_id', userId);

                if (error) throw error;
                fetchExhibitorProfiles();
            } catch (err: any) {
                alert(`Error: ${err.message}`);
            }
        }
    };

    const handleDeleteProfile = async (userId: string) => {
        try {
            const { error } = await supabase
                .from('exhibitor_profiles')
                .delete()
                .eq('user_id', userId);

            if (error) throw error;

            // Also update the main profile to remove exhibitor status
            await supabase
                .from('profiles')
                .update({ is_exhibitor: false })
                .eq('id', userId);

            setProfiles(prev => prev.filter(p => p.user_id !== userId));
        } catch (err: any) {
            console.error("Error deleting profile:", err);
            alert(`Failed to delete: ${err.message}`);
            throw err;
        }
    };

    const exportToExcel = () => {
        // Prepare data for export
        const exportData = filteredProfiles
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) // Latest on top
            .map((p, index) => ({
                '#': index + 1,
                'Registration Date': new Date(p.created_at).toLocaleString(),
                'Company Name': p.company_name,
                'Contact Person': p.contact_personname,
                'Email': p.email,
                'Phone': p.contact_phone,
                'Website': p.company_website || 'N/A',
                'Booth Package': p.booth_type || 'Not Selected',
                'Company Description': p.company_description,
                'Reference Source': p.reference || 'N/A',
                'Payment Status': p.payment_status || 'N/A',
                'Paid At': p.paid_at ? new Date(p.paid_at).toLocaleString() : 'N/A',
                'Stripe Session ID': p.stripe_session_id || 'N/A',
                'Approval Status': p.is_approved ? 'Approved' : 'Pending'
            }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Exhibitors");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, `Exhibitors_Detailed_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // Filtering
    const filteredProfiles = useMemo(() => {
        if (!searchTerm) return profiles;
        const lowerSearch = searchTerm.toLowerCase();
        return profiles.filter(p =>
            p.company_name.toLowerCase().includes(lowerSearch) ||
            p.email.toLowerCase().includes(lowerSearch) ||
            p.contact_personname.toLowerCase().includes(lowerSearch)
        );
    }, [profiles, searchTerm]);

    const renderStatusBadge = (isApproved: boolean) => {
        if (isApproved) return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"><CheckCircle className="w-3.5 h-3.5" /> Approved</span>;
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    };

    // --- Badge Generation Logic ---
    const badgeRef = useRef<HTMLDivElement>(null);
    const [badgeProfile, setBadgeProfile] = useState<ExhibitorProfile | null>(null);

    const handleDownloadCard = async (profile: ExhibitorProfile) => {
        setBadgeProfile(profile);
        // Allow time for state to update and DOM to render
        setTimeout(() => generateBadge(profile), 500);
    };

    const generateBadge = async (profile: ExhibitorProfile) => {
        if (!badgeRef.current) return;

        try {
            const canvas = await html2canvas(badgeRef.current, {
                scale: 4,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                onclone: (clonedDoc) => {
                    const element = clonedDoc.getElementById('exhibitor-badge-content');
                    if (element) {
                        element.style.visibility = 'visible';
                    }
                }
            });

            const image = canvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");
            link.href = image;
            link.download = `Investarise-Exhibitor-${profile.company_name.replace(/\s+/g, '-')}.png`;
            link.click();

            // Clear after download
            setBadgeProfile(null);
        } catch (error) {
            console.error("Error generating badge:", error);
            alert("Could not download badge. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                        <Store className="w-8 h-8 text-indigo-600" /> Exhibitor Management
                    </h1>
                    <p className="text-slate-600 mt-1">Review and manage exhibitor applications and booth assignments.</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search company, contact, email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            value={approvalFilter}
                            onChange={(e) => setApprovalFilter(e.target.value)}
                            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                        </select>
                        <button onClick={fetchExhibitorProfiles} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-600 transition">
                            <Filter className="w-5 h-5" />
                        </button>
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium shadow-sm"
                        >
                            <FileText className="w-4 h-4" /> Export Excel
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-slate-500 flex justify-center items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" /> Loading profiles...
                        </div>
                    ) : filteredProfiles.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">No exhibitor profiles found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase w-10">#</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Booth Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Reference</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Payment</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {filteredProfiles.map((p, index) => (
                                        <tr key={p.user_id} className="hover:bg-slate-50 transition duration-150 group">
                                            <td className="px-6 py-4 text-xs text-slate-400 font-mono">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center">
                                                        {p.company_logo_url ? (
                                                            <img src={p.company_logo_url} className="w-full h-full object-contain" alt="logo" />
                                                        ) : <Store className="w-5 h-5 text-slate-400" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-slate-900">{p.company_name}</span>
                                                        <a href={p.company_website} target="_blank" className="text-xs text-blue-600 hover:underline flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                                            View Website
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <div className="flex flex-col text-sm text-slate-600">
                                                    <span className="font-medium text-slate-800">{p.contact_personname}</span>
                                                    <span className="text-xs text-slate-500">{p.email}</span>
                                                    <span className="text-xs text-slate-400">{p.contact_phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                    {p.booth_type || 'Not Selected'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell text-sm text-slate-600">
                                                {p.reference || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {p.payment_status === 'paid' ? (
                                                    <div className="flex flex-col">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                                                            <CheckCircle className="w-3 h-3" /> Paid
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 mt-1 font-mono" title={p.stripe_session_id || ''}>
                                                            ID: {(p.stripe_session_id || 'N/A').slice(0, 8)}...
                                                        </span>
                                                        {p.paid_at && (
                                                            <span className="text-[10px] text-slate-400">
                                                                {new Date(p.paid_at).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                        <Clock className="w-3 h-3" /> Unpaid
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {renderStatusBadge(p.is_approved)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-indigo-200 rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition text-sm font-medium"
                                                >
                                                    Review
                                                </button>
                                                <button
                                                    onClick={() => handleDownloadCard(p)}
                                                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition text-sm font-medium ml-2"
                                                    title="Download ID Card"
                                                >
                                                    <Download className="w-4 h-4" /> Card
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedProfileForDelete(p);
                                                    }}
                                                    className="inline-flex items-center justify-center p-2 border border-blue-200 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition text-sm font-medium ml-2"
                                                    title="Delete Application"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {selectedProfileForModal && (
                <ExhibitorReviewModal
                    profile={selectedProfileForModal}
                    onClose={() => setSelectedProfileForModal(null)}
                    onSave={handleModalSave}
                    onApprovePayment={handleApprovePaymentDirect}
                    boothOptions={BOOTH_OPTIONS}
                />
            )}

            {/* Deletion Confirm Modal */}
            {selectedProfileForDelete && (
                <DeleteConfirmModal
                    profile={selectedProfileForDelete}
                    onClose={() => setSelectedProfileForDelete(null)}
                    onConfirm={handleDeleteProfile}
                />
            )}

            {/* Hidden Badge Template for Generation */}
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                {badgeProfile && (
                    <div
                        ref={badgeRef}
                        id="exhibitor-badge-content"
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
                                fontSize: '24px',
                                fontWeight: '800',
                                margin: '0 0 8px 0',
                                lineHeight: '1.2',
                                wordWrap: 'break-word',
                                textTransform: 'uppercase'
                            }}>
                                {badgeProfile.contact_personname || 'Exhibitor'}
                            </h1>
                            <p style={{
                                color: '#cbd5e1',
                                fontSize: '16px',
                                fontWeight: '500',
                                margin: '0 0 20px 0',
                                opacity: 0.9,
                                textTransform: 'uppercase'
                            }}>
                                {badgeProfile.company_name}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span style={{
                                    color: '#C5A059',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Exhibitor Access
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
                                    {badgeProfile.user_id.slice(0, 8)}
                                </p>
                            </div>
                            <div style={{
                                padding: '4px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px'
                            }}>
                                <QRCode value={badgeProfile.user_id} size={80} fgColor="#000000" bgColor="#ffffff" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}