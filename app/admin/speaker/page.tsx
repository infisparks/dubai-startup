// @/app/admin/speaker-dashboard/page.tsx
"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { supabase } from "@/lib/supabaseConfig" // Use your config file
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table" 
import { Label } from "@/components/ui/label" 
import { Filter, Search, Users, CheckCircle, Clock, X, Loader2, FilePenLine, Save, User, Mic, XCircle, TrendingUp } from "lucide-react" 
import { useForm, Controller } from 'react-hook-form';
import { cn } from "@/lib/utils" // Assuming this utility is available for Tailwind classes


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
}

// Type for the editable fields in the modal
interface EditableProfileFields {
    name: string;
    phone: string;
    linkedin: string;
    job_title: string;
    company: string;
    speaker_bio: string;
    topic_title: string;
    topic_abstract: string;
}


// --- Components ---

// 1. Speaker Review Modal (Component to approve/view/edit details)
interface SpeakerReviewModalProps {
    profile: SpeakerProfile;
    onClose: (updated: boolean) => void;
    onStatusUpdate: (userId: string, isApproved: boolean) => Promise<void>;
    onDataUpdate: (userId: string, data: EditableProfileFields) => Promise<void>;
}

const SpeakerReviewModal: React.FC<SpeakerReviewModalProps> = ({ profile, onClose, onStatusUpdate, onDataUpdate }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // RHF Setup for editing
    const { control, handleSubmit, register, watch, formState: { isDirty } } = useForm<EditableProfileFields>({
        defaultValues: {
            name: profile.name,
            phone: profile.phone,
            linkedin: profile.linkedin,
            job_title: profile.job_title,
            company: profile.company,
            speaker_bio: profile.speaker_bio,
            topic_title: profile.topic_title,
            topic_abstract: profile.topic_abstract,
        },
    });

    const watchedBio = watch('speaker_bio') || '';
    const watchedAbstract = watch('topic_abstract') || '';
    
    
    const handleDataSubmission = handleSubmit(async (data) => {
        setIsSubmitting(true);
        await onDataUpdate(profile.user_id, data);
        setIsSubmitting(false);
        onClose(true);
    });

    const handleStatusUpdate = async (approved: boolean) => {
        setIsSubmitting(true);
        await onStatusUpdate(profile.user_id, approved);
        setIsSubmitting(false);
        onClose(true);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row justify-between items-center border-b p-4">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Mic className="w-6 h-6 text-[#013371]" /> Review/Edit Speaker: {profile.name}
                    </CardTitle>
                    <Button variant="ghost" onClick={() => onClose(false)} className="p-2 h-auto">
                        <X className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleDataSubmission}>
                        
                        {/* Status Display */}
                        <div className={`mb-6 p-4 rounded-lg font-semibold flex items-center gap-2 ${profile.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {profile.is_approved ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                            Status: {profile.is_approved ? 'APPROVED' : 'PENDING'}
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* 1. Personal Details (Col 1) */}
                            <div className="lg:col-span-1 p-4 border rounded-lg bg-gray-50 h-full">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
                                    <User className="w-4 h-4"/> Personal Info
                                </h3>
                                <div className="flex justify-center mb-4">
                                     <img 
                                        src={profile.profile_photo_url || '/default-avatar.png'} 
                                        alt="Headshot" 
                                        className="w-24 h-24 rounded-full object-cover bg-white border-4 border-white shadow-md"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div><Label>Name</Label><Input {...register('name', { required: true })} className="h-9" /></div>
                                    <div><Label>Email (Read-Only)</Label><Input value={profile.email} disabled className="h-9 bg-slate-100" /></div>
                                    <div><Label>Phone</Label><Input {...register('phone', { required: true })} className="h-9" type="tel" /></div>
                                    <div><Label>LinkedIn</Label><Input {...register('linkedin')} className="h-9" placeholder="URL" /></div>
                                    <div><Label>Job Title</Label><Input {...register('job_title', { required: true })} className="h-9" /></div>
                                    <div><Label>Company</Label><Input {...register('company', { required: true })} className="h-9" /></div>
                                </div>
                            </div>
                            
                            {/* 2. Proposal Details (Col 2 & 3) */}
                            <div className="lg:col-span-2 p-4 border rounded-lg bg-gray-50">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
                                    <TrendingUp className="w-4 h-4"/> Session Proposal
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Label>Topic Title</Label>
                                        <Input {...register('topic_title', { required: true })} className="h-9" />
                                    </div>

                                    {/* Topic Abstract */}
                                    <div className="md:col-span-2">
                                        <Label>Session Abstract (Max 250 words)</Label>
                                        <textarea
                                            {...register('topic_abstract', { required: true, maxLength: 250 })}
                                            rows={5}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#013371] resize-none"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">{watchedAbstract.length}/250</p>
                                    </div>
                                    
                                    {/* Speaker Bio */}
                                    <div className="md:col-span-2">
                                        <Label>Speaker Bio (Max 150 words)</Label>
                                        <textarea
                                            {...register('speaker_bio', { required: true, maxLength: 150 })}
                                            rows={3}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#013371] resize-none"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">{watchedBio.length}/150</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer Actions - Save Data */}
                        <div className="pt-6 border-t mt-6 flex justify-end">
                            <Button 
                                type="submit"
                                disabled={isSubmitting || !isDirty}
                                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Profile Data Edits
                            </Button>
                        </div>
                        
                        {/* Status Toggle (Optional: for fast status changes within modal) */}
                         <div className='pt-4 border-t mt-4 flex justify-end gap-2'>
                            {!profile.is_approved && (
                                <Button
                                    type="button"
                                    onClick={() => handleStatusUpdate(true)}
                                    disabled={isSubmitting}
                                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" /> Approve Now
                                </Button>
                            )}
                            {profile.is_approved && (
                                <Button
                                    type="button"
                                    onClick={() => handleStatusUpdate(false)}
                                    disabled={isSubmitting}
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-50"
                                >
                                    <XCircle className="w-4 h-4" /> Disapprove
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};


// 2. Main Admin Dashboard Component
export default function AdminSpeakerDashboard() {
    const [profiles, setProfiles] = useState<SpeakerProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [approvalFilter, setApprovalFilter] = useState('all');
    
    // 🟢 State for selected profile ID for external actions
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    
    // State for Modal (used only for review/edit)
    const [selectedProfileForModal, setSelectedProfileForModal] = useState<SpeakerProfile | null>(null);

    const fetchSpeakerProfiles = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSelectedUserId(null); // Clear selection on refresh
        try {
            // RLS assumption: Admin users can select all profiles
            let query = supabase
                .from('speaker_profiles')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (approvalFilter === 'approved') {
                query = query.eq('is_approved', true);
            } else if (approvalFilter === 'pending') {
                query = query.eq('is_approved', false);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) {
                throw new Error(fetchError.message || "Failed to fetch profiles. Check RLS or admin permissions.");
            }

            setProfiles((data || []) as SpeakerProfile[]);
        } catch (err: any) {
            console.error("Error fetching profiles:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }, [approvalFilter]);


    // --- Status Update Handler (Shared by Modal and External Buttons) ---
    const handleStatusUpdate = useCallback(async (userId: string, isApproved: boolean) => {
        try {
            const { error: updateError } = await supabase
                .from('speaker_profiles')
                .update({ is_approved: isApproved })
                .eq('user_id', userId);
            
            if (updateError) throw updateError;
            
            // Optimistically update local state
            setProfiles(prev => prev.map(p => 
                p.user_id === userId ? { ...p, is_approved: isApproved } : p
            ));
            
            alert(`Profile successfully ${isApproved ? 'approved' : 'disapproved'}!`);
            
            // Clear selection after action
            setSelectedUserId(null); 
            
        } catch (err: any) {
            console.error("Error updating approval status:", err);
            alert(`Failed to update approval status: ${err.message}`);
        }
    }, []);

    // --- Data Update Handler (From Modal) ---
    const handleDataUpdate = useCallback(async (userId: string, data: EditableProfileFields) => {
        try {
            const payload = {
                name: data.name.toUpperCase(),
                phone: data.phone,
                linkedin: data.linkedin,
                job_title: data.job_title,
                company: data.company,
                speaker_bio: data.speaker_bio,
                topic_title: data.topic_title,
                topic_abstract: data.topic_abstract,
            };

            const { error: updateError } = await supabase
                .from('speaker_profiles')
                .update(payload)
                .eq('user_id', userId);

            if (updateError) throw updateError;
            
            alert(`Profile data successfully updated!`);

            fetchSpeakerProfiles();

        } catch (err: any) {
            console.error("Error updating profile data:", err);
            alert(`Failed to update profile data: ${err.message}`);
        }
    }, [fetchSpeakerProfiles]);


    useEffect(() => {
        fetchSpeakerProfiles();
    }, [fetchSpeakerProfiles]);


    // --- Filtering and Searching ---
    const filteredProfiles = useMemo(() => {
        if (!searchTerm) return profiles;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return profiles.filter(p => 
            p.name.toLowerCase().includes(lowerSearchTerm) ||
            p.email.toLowerCase().includes(lowerSearchTerm) ||
            p.topic_title.toLowerCase().includes(lowerSearchTerm)
        );
    }, [profiles, searchTerm]);

    const selectedProfileData = useMemo(() => 
        profiles.find(p => p.user_id === selectedUserId), 
        [profiles, selectedUserId]
    );

    // --- Render Component ---
    
    return (
        <div className="p-6 lg:p-10 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                <Mic className="w-8 h-8 text-[#013371]" /> Speaker Application Admin Dashboard
            </h1>
            
            {/* Action Card for Selected Profile (Sticky Bar) */}
            {selectedUserId && selectedProfileData && (
                <Card className="shadow-lg border-2 border-blue-500 mb-6 sticky top-4 z-10 animate-fadeIn">
                    <CardContent className="p-4 flex justify-between items-center bg-blue-50">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-blue-700">Selected: {selectedProfileData.name} ({selectedProfileData.company})</span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedProfileData.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {selectedProfileData.is_approved ? 'APPROVED' : 'PENDING'}
                            </span>
                        </div>
                        <div className="flex gap-3">
                            {/* Disapprove Button */}
                            {selectedProfileData.is_approved && (
                                <Button 
                                    onClick={() => handleStatusUpdate(selectedUserId, false)}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    <XCircle className="w-4 h-4 mr-2" /> Disapprove
                                </Button>
                            )}
                            {/* Approve Button */}
                            {!selectedProfileData.is_approved && (
                                <Button 
                                    onClick={() => handleStatusUpdate(selectedUserId, true)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                </Button>
                            )}
                            
                            {/* Clear Selection */}
                            <Button variant="outline" onClick={() => setSelectedUserId(null)}>
                                Clear Selection
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            
            <Card className="shadow-xl mb-6">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Filter className="w-5 h-5" /> Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Approval Filter */}
                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-1">Approval Status</Label>
                        <Select 
                            value={approvalFilter} 
                            onValueChange={(v) => setApprovalFilter(v)}
                        >
                            <SelectTrigger className="h-10"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Profiles</SelectItem>
                                <SelectItem value="pending">Pending Review</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search Bar */}
                    <div className="md:col-span-3">
                        <Label className="block text-sm font-medium text-gray-700 mb-1">Search (Name, Email, Topic)</Label>
                        <div className="relative">
                            <Input 
                                type="text" 
                                placeholder="Search by name, email, or topic..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-10"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl flex justify-between items-center">
                        Speaker Profiles ({filteredProfiles.length})
                        <Button onClick={fetchSpeakerProfiles} disabled={loading} variant="outline" className="h-8">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Refresh'}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="p-4 mb-4 text-sm font-medium text-red-800 rounded-lg bg-red-50 border border-red-300">
                            {error}
                        </div>
                    )}
                    {loading ? (
                        <div className="text-center py-10 flex items-center justify-center gap-2 text-slate-600">
                            <Loader2 className="w-5 h-5 animate-spin" /> Fetching data...
                        </div>
                    ) : filteredProfiles.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No speaker profiles found matching the criteria.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableHead>Status</TableHead>
                                        <TableHead>Name / Company</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Topic Title</TableHead>
                                        <TableHead>Applied On</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProfiles.map((p) => (
                                        <TableRow 
                                            key={p.user_id} 
                                            // 🟢 Highlight selected row and set selection
                                            onClick={() => setSelectedUserId(p.user_id)}
                                            className={cn(
                                                "cursor-pointer hover:bg-slate-50 transition-colors",
                                                selectedUserId === p.user_id && "bg-blue-100 hover:bg-blue-200 border-l-4 border-blue-600"
                                            )}
                                        >
                                            <TableCell>
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${p.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {p.is_approved ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                    {p.is_approved ? 'Approved' : 'Pending'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="font-medium">{p.name}<div className="text-xs text-slate-500">{p.job_title} @ {p.company}</div></TableCell>
                                            <TableCell className="text-slate-600">{p.email}</TableCell>
                                            <TableCell>{p.topic_title}</TableCell>
                                            <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Button 
                                                    size="sm" 
                                                    // 🟢 Open modal to review/edit
                                                    onClick={(e) => { e.stopPropagation(); setSelectedProfileForModal(p); }}
                                                    className="h-8 px-3 bg-[#013371] hover:bg-[#024fa3]"
                                                >
                                                    Review
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Modal Renderer */}
            {selectedProfileForModal && (
                <SpeakerReviewModal
                    profile={selectedProfileForModal}
                    onClose={() => setSelectedProfileForModal(null)}
                    onStatusUpdate={handleStatusUpdate}
                    onDataUpdate={handleDataUpdate}
                />
            )}
        </div>
    );
}