// @/app/admin/investor-dashboard/page.tsx
"use client"

import React, { useEffect, useState, useMemo, useCallback } from "react"
import { supabase } from "@/lib/supabaseConfig"
import {
    Filter, Search, Users, CheckCircle, Clock, X, Loader2,
    Save, User, Phone, TrendingUp, XCircle, Linkedin, Mail, FileText
} from "lucide-react"
import { useForm, Controller } from 'react-hook-form';

// --- Types ---

interface InvestorProfile {
    user_id: string;
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    investment_amount: string;
    investment_type: string;
    experience: string;
    interests: string[] | null;
    is_approved: boolean;
    created_at: string;
    reference: string | null;
}

// Type for the editable fields
interface EditableProfileFields {
    name: string;
    phone: string;
    linkedin: string;
    investment_amount: string;
    investment_type: string;
    experience: string;
    interests: string[];
    reference: string;
    is_approved: boolean;
}

// --- Helper Components (FIXED WITH FORWARD REF) ---

// 🟢 FIX 1: Wrapped in forwardRef so React Hook Form can control the input value
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

// 🟢 FIX 2: Wrapped in forwardRef for Select inputs too
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


// --- 1. Investor Review Modal ---

interface InvestorReviewModalProps {
    profile: InvestorProfile;
    onClose: () => void;
    onSave: (updatedProfile: InvestorProfile) => void;
}

const InvestorReviewModal: React.FC<InvestorReviewModalProps> = ({ profile, onClose, onSave }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // RHF Setup
    const { control, handleSubmit, register, watch, setValue, reset } = useForm<EditableProfileFields>({
        defaultValues: {
            name: '',
            phone: '',
            linkedin: '',
            reference: '',
            investment_amount: '',
            investment_type: '',
            experience: '',
            interests: [],
            is_approved: false
        },
    });

    // 🟢 FIX 3: Robust Reset Logic
    useEffect(() => {
        if (profile) {
            console.log("🟢 Resetting form with:", profile);
            reset({
                name: profile.name || '',
                phone: profile.phone || '',
                linkedin: profile.linkedin || '',
                reference: profile.reference || '',
                investment_amount: profile.investment_amount || '',
                investment_type: profile.investment_type || '',
                experience: profile.experience || '',
                interests: profile.interests || [],
                is_approved: profile.is_approved || false
            });
        }
    }, [profile, reset]);

    const watchedInterests = watch('interests') || [];

    // Static Options
    const options = {
        interests: ["Technology", "Healthcare", "FinTech", "E-commerce", "SaaS", "EdTech", "AI/ML"],
        ranges: ["AED 50,000 - 100,000", "AED 100,000 - 500,000", "AED 500,000 - 1,000,000", "AED 1,000,000 - 5,000,000", "AED 5,000,000+"],
        types: ["Angel Investor", "Venture Capital", "Institutional", "Family Office"],
        levels: ["Beginner (0-2 years)", "Intermediate (2-5 years)", "Experienced (5-10 years)", "Expert (10+ years)"],
    };

    const handleCheckboxChange = (interest: string, isChecked: boolean) => {
        const current = watchedInterests;
        if (isChecked) {
            setValue('interests', [...current, interest]);
        } else {
            setValue('interests', current.filter(i => i !== interest));
        }
    };

    const onSubmit = async (data: EditableProfileFields) => {
        setIsSubmitting(true);
        try {
            // 1. Update Investor Profile Table
            const { data: updatedData, error } = await supabase
                .from('investor_profiles')
                .update({
                    name: data.name,
                    phone: data.phone,
                    linkedin: data.linkedin,
                    reference: data.reference,
                    investment_amount: data.investment_amount,
                    investment_type: data.investment_type,
                    experience: data.experience,
                    interests: data.interests,
                    is_approved: data.is_approved
                })
                .eq('user_id', profile.user_id)
                .select()
                .single();

            if (error) throw error;

            // 2. Sync with Main Profiles Table (for permissions)
            if (profile.is_approved !== data.is_approved) {
                await supabase
                    .from('profiles')
                    .update({ is_investor: data.is_approved })
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
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b bg-white rounded-t-xl">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600" /> Review Investor: {profile.name}
                        </h3>
                        <button type="button" onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 space-y-8">
                        
                        {/* Section 1: Personal Info */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Personal Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <FormInput 
                                    label="Full Name" 
                                    {...register('name', { required: true })} 
                                    icon={<User className="w-4 h-4"/>}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email (Read-only)</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4"/></div>
                                        <input value={profile.email} disabled className="block w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-300 rounded-lg shadow-sm text-sm text-slate-500 cursor-not-allowed" />
                                    </div>
                                </div>
                                <FormInput 
                                    label="Phone Number" 
                                    {...register('phone')} 
                                    icon={<Phone className="w-4 h-4"/>}
                                />
                                <FormInput 
                                    label="LinkedIn URL" 
                                    {...register('linkedin')} 
                                    placeholder="https://linkedin.com/in/..."
                                    icon={<Linkedin className="w-4 h-4"/>}
                                />
                                <div className="md:col-span-2">
                                    <FormInput 
                                        label="Reference Source" 
                                        {...register('reference')} 
                                        placeholder="Who referred them?"
                                        icon={<FileText className="w-4 h-4"/>}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Investment Details */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Investment Criteria</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                <Controller
                                    name="investment_amount"
                                    control={control}
                                    render={({ field }) => (
                                        <FormSelect label="Investment Range" options={options.ranges} {...field} />
                                    )}
                                />
                                <Controller
                                    name="investment_type"
                                    control={control}
                                    render={({ field }) => (
                                        <FormSelect label="Investor Type" options={options.types} {...field} />
                                    )}
                                />
                                <Controller
                                    name="experience"
                                    control={control}
                                    render={({ field }) => (
                                        <FormSelect label="Experience Level" options={options.levels} {...field} />
                                    )}
                                />
                            </div>

                            {/* Interests Checkboxes */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Areas of Interest</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {options.interests.map((interest) => (
                                        <label key={interest} className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border transition-all ${watchedInterests.includes(interest) ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                            <input
                                                type="checkbox"
                                                checked={watchedInterests.includes(interest)}
                                                onChange={(e) => handleCheckboxChange(interest, e.target.checked)}
                                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-slate-700">{interest}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Status Action */}
                        <div className="pt-4 border-t border-slate-200">
                             <Controller
                                name="is_approved"
                                control={control}
                                render={({ field }) => (
                                    <ToggleSwitch 
                                        label="Account Approval Status" 
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
export default function AdminInvestorDashboard() {
    const [profiles, setProfiles] = useState<InvestorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [approvalFilter, setApprovalFilter] = useState('all');
    
    // Modal State
    const [selectedProfileForModal, setSelectedProfileForModal] = useState<InvestorProfile | null>(null);

    const fetchInvestorProfiles = useCallback(async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('investor_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (approvalFilter === 'approved') query = query.eq('is_approved', true);
            else if (approvalFilter === 'pending') query = query.eq('is_approved', false);

            const { data, error } = await query;
            if (error) throw error;
            setProfiles((data || []) as InvestorProfile[]);
        } catch (err: any) {
            console.error("Error fetching:", err);
        } finally {
            setLoading(false);
        }
    }, [approvalFilter]);

    useEffect(() => {
        fetchInvestorProfiles();
    }, [fetchInvestorProfiles]);

    const handleModalSave = (updatedProfile: InvestorProfile) => {
        setProfiles(prev => prev.map(p => p.user_id === updatedProfile.user_id ? updatedProfile : p));
        // Also refresh list to be safe
        fetchInvestorProfiles();
    };

    // Filtering
    const filteredProfiles = useMemo(() => {
        if (!searchTerm) return profiles;
        const lowerSearch = searchTerm.toLowerCase();
        return profiles.filter(p =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.email.toLowerCase().includes(lowerSearch)
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
                        <Users className="w-8 h-8 text-indigo-600" /> Investor Management
                    </h1>
                    <p className="text-slate-600 mt-1">Review and manage investor applications and profiles.</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
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
                        <button onClick={fetchInvestorProfiles} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-600 transition">
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
                        <div className="p-12 text-center text-slate-500">No profiles found matching your criteria.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Investor</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Investment</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Reference</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {filteredProfiles.map((p) => (
                                        <tr key={p.user_id} className="hover:bg-slate-50 transition duration-150 group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-900">{p.name}</span>
                                                    <span className="text-xs text-slate-500 md:hidden">{p.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <div className="flex flex-col text-sm text-slate-600">
                                                    <span>{p.email}</span>
                                                    <span className="text-xs text-slate-400">{p.phone || 'No phone'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <div className="flex flex-col text-sm">
                                                    <span className="font-medium text-slate-700">{p.investment_amount}</span>
                                                    <span className="text-xs text-slate-500">{p.investment_type}</span>
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
                                                    Review & Edit
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
                <InvestorReviewModal
                    profile={selectedProfileForModal}
                    onClose={() => setSelectedProfileForModal(null)}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
}