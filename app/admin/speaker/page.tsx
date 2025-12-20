// @/app/admin/speaker-dashboard/page.tsx
"use client"

import React, { useEffect, useState, useMemo, useCallback } from "react"
import { supabase } from "@/lib/supabaseConfig"
import {
    Filter, Search, Users, CheckCircle, Clock, X, Loader2,
    Save, User, Mic, XCircle, TrendingUp, Phone, Linkedin, FileText, Briefcase
} from "lucide-react"
import { useForm, Controller } from 'react-hook-form';

// --- Types ---

interface SpeakerProfile {
    user_id: string;
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    job_title: string;
    company: string;
    speaker_bio: string;
    topic_title: string;
    topic_abstract: string;
    profile_photo_url: string | null;
    is_approved: boolean;
    created_at: string;
    reference: string | null;
}

// Type for the editable fields
interface EditableProfileFields {
    name: string;
    phone: string;
    linkedin: string;
    job_title: string;
    company: string;
    speaker_bio: string;
    topic_title: string;
    topic_abstract: string;
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


// --- 1. Speaker Review Modal ---

interface SpeakerReviewModalProps {
    profile: SpeakerProfile;
    onClose: () => void;
    onSave: (updatedProfile: SpeakerProfile) => void;
}

const SpeakerReviewModal: React.FC<SpeakerReviewModalProps> = ({ profile, onClose, onSave }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // RHF Setup
    const { control, handleSubmit, register, watch, setValue, reset } = useForm<EditableProfileFields>({
        defaultValues: {
            name: '',
            phone: '',
            linkedin: '',
            job_title: '',
            company: '',
            speaker_bio: '',
            topic_title: '',
            topic_abstract: '',
            reference: '',
            is_approved: false
        },
    });

    const watchedBio = watch('speaker_bio') || '';
    const watchedAbstract = watch('topic_abstract') || '';

    // 🟢 CRITICAL FIX: Reset form values when profile prop changes
    useEffect(() => {
        if (profile) {
            console.log("Loading speaker data:", profile);
            reset({
                name: profile.name || '',
                phone: profile.phone || '',
                linkedin: profile.linkedin || '',
                job_title: profile.job_title || '',
                company: profile.company || '',
                speaker_bio: profile.speaker_bio || '',
                topic_title: profile.topic_title || '',
                topic_abstract: profile.topic_abstract || '',
                reference: profile.reference || '',
                is_approved: profile.is_approved || false
            });
        }
    }, [profile, reset]);

    const onSubmit = async (data: EditableProfileFields) => {
        setIsSubmitting(true);
        try {
            // 1. Update Speaker Profile Table
            const { data: updatedData, error } = await supabase
                .from('speaker_profiles')
                .update({
                    name: data.name,
                    phone: data.phone,
                    linkedin: data.linkedin,
                    job_title: data.job_title,
                    company: data.company,
                    speaker_bio: data.speaker_bio,
                    topic_title: data.topic_title,
                    topic_abstract: data.topic_abstract,
                    reference: data.reference,
                    is_approved: data.is_approved
                })
                .eq('user_id', profile.user_id)
                .select()
                .single();

            if (error) throw error;

            // 2. Sync with Main Profiles Table (if needed for permissions)
            if (profile.is_approved !== data.is_approved) {
                 await supabase
                    .from('profiles')
                    .update({ is_speaker: data.is_approved }) // Assuming 'is_speaker' column exists
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
                            <Mic className="w-5 h-5 text-blue-600" /> Review Speaker: {profile.name}
                        </h3>
                        <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Col 1: Personal Info */}
                            <div className="lg:col-span-1 space-y-4">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Personal Info</h4>
                                
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                                         {profile.profile_photo_url ? (
                                            <img src={profile.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
                                         ) : (
                                            <User className="w-10 h-10 text-slate-300" />
                                         )}
                                    </div>
                                </div>

                                <FormInput label="Full Name" {...register('name', { required: true })} icon={<User className="w-4 h-4"/>} />
                                
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email (Read-only)</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><User className="w-4 h-4"/></div>
                                        <input value={profile.email} disabled className="block w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-300 rounded-lg shadow-sm text-sm text-slate-500 cursor-not-allowed" />
                                    </div>
                                </div>

                                <FormInput label="Phone" {...register('phone')} icon={<Phone className="w-4 h-4"/>} />
                                <FormInput label="LinkedIn" {...register('linkedin')} icon={<Linkedin className="w-4 h-4"/>} />
                                <FormInput label="Job Title" {...register('job_title')} icon={<Briefcase className="w-4 h-4"/>} />
                                <FormInput label="Company" {...register('company')} icon={<Briefcase className="w-4 h-4"/>} />
                                <FormInput label="Reference" {...register('reference')} icon={<FileText className="w-4 h-4"/>} />
                            </div>

                            {/* Col 2: Session Info */}
                            <div className="lg:col-span-2 space-y-4">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Session Proposal</h4>
                                
                                <FormInput label="Topic Title" {...register('topic_title', { required: true })} />
                                
                                <div>
                                    <FormTextarea 
                                        label="Session Abstract" 
                                        {...register('topic_abstract', { required: true, maxLength: 500 })} 
                                        rows={6}
                                    />
                                    <div className="flex justify-end mt-1 text-xs text-slate-400">{watchedAbstract.length} chars</div>
                                </div>

                                <div>
                                    <FormTextarea 
                                        label="Speaker Bio" 
                                        {...register('speaker_bio', { required: true, maxLength: 300 })} 
                                        rows={4}
                                    />
                                    <div className="flex justify-end mt-1 text-xs text-slate-400">{watchedBio.length} chars</div>
                                </div>
                            </div>
                        </div>

                        {/* Status Action */}
                        <div className="pt-6 mt-6 border-t border-slate-200">
                             <Controller
                                name="is_approved"
                                control={control}
                                render={({ field }) => (
                                    <ToggleSwitch 
                                        label="Speaker Approval Status" 
                                        checked={field.value} 
                                        onChange={field.onChange} 
                                    />
                                )}
                            />
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
export default function AdminSpeakerDashboard() {
    const [profiles, setProfiles] = useState<SpeakerProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [approvalFilter, setApprovalFilter] = useState('all');
    
    // Modal State
    const [selectedProfileForModal, setSelectedProfileForModal] = useState<SpeakerProfile | null>(null);

    const fetchSpeakerProfiles = useCallback(async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('speaker_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (approvalFilter === 'approved') query = query.eq('is_approved', true);
            else if (approvalFilter === 'pending') query = query.eq('is_approved', false);

            const { data, error } = await query;
            if (error) throw error;
            setProfiles((data || []) as SpeakerProfile[]);
        } catch (err: any) {
            console.error("Error fetching:", err);
        } finally {
            setLoading(false);
        }
    }, [approvalFilter]);

    useEffect(() => {
        fetchSpeakerProfiles();
    }, [fetchSpeakerProfiles]);

    const handleModalSave = (updatedProfile: SpeakerProfile) => {
        setProfiles(prev => prev.map(p => p.user_id === updatedProfile.user_id ? updatedProfile : p));
        fetchSpeakerProfiles(); // Refresh to be sure
    };

    // Filtering
    const filteredProfiles = useMemo(() => {
        if (!searchTerm) return profiles;
        const lowerSearch = searchTerm.toLowerCase();
        return profiles.filter(p =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.email.toLowerCase().includes(lowerSearch) ||
            p.topic_title.toLowerCase().includes(lowerSearch)
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
                        <Mic className="w-8 h-8 text-indigo-600" /> Speaker Management
                    </h1>
                    <p className="text-slate-600 mt-1">Review and manage speaker applications and proposals.</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <input 
                            type="text" 
                            placeholder="Search name, email, topic..." 
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
                        <button onClick={fetchSpeakerProfiles} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-600 transition">
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
                        <div className="p-12 text-center text-slate-500">No speaker profiles found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Speaker</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Topic</th>
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
                                                     <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 overflow-hidden">
                                                        {p.profile_photo_url ? (
                                                            <img src={p.profile_photo_url} className="w-full h-full object-cover" alt="p"/>
                                                        ) : <User className="w-full h-full p-2 text-slate-400" />}
                                                     </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-slate-900">{p.name}</span>
                                                        <span className="text-xs text-slate-500">{p.job_title} @ {p.company}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <div className="flex flex-col text-sm text-slate-600">
                                                    <span>{p.email}</span>
                                                    <span className="text-xs text-slate-400">{p.phone || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <div className="text-sm font-medium text-slate-700 max-w-xs truncate" title={p.topic_title}>
                                                    {p.topic_title}
                                                </div>
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
                <SpeakerReviewModal
                    profile={selectedProfileForModal}
                    onClose={() => setSelectedProfileForModal(null)}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
}