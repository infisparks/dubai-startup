// @/app/admin/exhibitor-dashboard/page.tsx
"use client"

import React, { useEffect, useState, useMemo, useCallback } from "react"
import { supabase } from "@/lib/supabaseConfig"
import {
    Filter, Search, Users, CheckCircle, Clock, X, Loader2,
    Save, Store, XCircle, User, Link as LinkIcon, Phone, Mail, FileText
} from "lucide-react"
import { useForm, Controller } from 'react-hook-form';
import { cn } from "@/lib/utils"

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
            <span className={`text-xs mt-0.5 font-bold ${checked ? 'text-green-600' : 'text-red-600'}`}>
                {checked ? 'APPROVED' : 'PENDING / DISAPPROVED'}
            </span>
        </label>
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`${checked ? 'bg-green-600' : 'bg-red-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
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
    boothOptions: string[];
}

const ExhibitorReviewModal: React.FC<ExhibitorReviewModalProps> = ({ profile, onClose, onSave, boothOptions }) => {
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

                                <FormInput label="Company Name" {...register('company_name', { required: true })} icon={<Store className="w-4 h-4"/>} />
                                <FormInput label="Website" {...register('company_website')} icon={<LinkIcon className="w-4 h-4"/>} />
                                
                                <div className="border-t pt-4 mt-4">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Contact Person</h4>
                                    <div className="space-y-4">
                                        <FormInput label="Name" {...register('contact_personname', { required: true })} icon={<User className="w-4 h-4"/>} />
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Email (Read-only)</label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4"/></div>
                                                <input value={profile.email} disabled className="block w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-300 rounded-lg shadow-sm text-sm text-slate-500 cursor-not-allowed" />
                                            </div>
                                        </div>
                                        <FormInput label="Phone" {...register('contact_phone', { required: true })} icon={<Phone className="w-4 h-4"/>} />
                                        <FormInput label="Reference" {...register('reference')} icon={<FileText className="w-4 h-4"/>} />
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


// 2. Main Admin Dashboard Component
export default function AdminExhibitorDashboard() {
    const [profiles, setProfiles] = useState<ExhibitorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [approvalFilter, setApprovalFilter] = useState('all');
    
    // Modal State
    const [selectedProfileForModal, setSelectedProfileForModal] = useState<ExhibitorProfile | null>(null);

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
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Booth Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Reference</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {filteredProfiles.map((p) => (
                                        <tr key={p.user_id} className="hover:bg-slate-50 transition duration-150 group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                     <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center">
                                                        {p.company_logo_url ? (
                                                            <img src={p.company_logo_url} className="w-full h-full object-contain" alt="logo"/>
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
                                                {renderStatusBadge(p.is_approved)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => setSelectedProfileForModal(p)}
                                                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-indigo-200 rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition text-sm font-medium"
                                                >
                                                    Review
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
                    boothOptions={BOOTH_OPTIONS}
                />
            )}
        </div>
    );
}