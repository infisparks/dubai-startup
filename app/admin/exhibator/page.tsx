// @/app/admin/exhibitor-dashboard/page.tsx
"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { supabase } from "@/lib/supabaseConfig" 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table" 
import { Label } from "@/components/ui/label" 
import { Filter, Search, Users, CheckCircle, Clock, X, Loader2, FilePenLine, Save, Store, XCircle, User, Link as LinkIcon } from "lucide-react" 
import { useForm, Controller } from 'react-hook-form';
import { cn } from "@/lib/utils" // Assuming this utility is available for Tailwind classes


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
}

// Type for the editable fields in the modal
interface EditableProfileFields {
    company_name: string;
    company_website: string;
    contact_personname: string;
    contact_phone: string;
    booth_type: string;
    company_description: string;
    // Note: Logo update requires file handling which is complex inside the modal RHF, 
    // so we'll leave it as a visual link/note in the admin view.
}


// --- Components ---

// 1. Exhibitor Review Modal (Component to approve/view/edit details)
interface ExhibitorReviewModalProps {
    profile: ExhibitorProfile;
    onClose: (updated: boolean) => void;
    onStatusUpdate: (userId: string, isApproved: boolean) => Promise<void>;
    onDataUpdate: (userId: string, data: EditableProfileFields) => Promise<void>;
    // Pass booth options for select field translation
    boothOptions: string[]; 
}

const ExhibitorReviewModal: React.FC<ExhibitorReviewModalProps> = ({ profile, onClose, onStatusUpdate, onDataUpdate, boothOptions }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // RHF Setup for editing
    const { control, handleSubmit, register, watch, formState: { isDirty } } = useForm<EditableProfileFields>({
        defaultValues: {
            company_name: profile.company_name,
            company_website: profile.company_website,
            contact_personname: profile.contact_personname,
            contact_phone: profile.contact_phone,
            booth_type: profile.booth_type,
            company_description: profile.company_description,
        },
    });

    const watchedDescription = watch('company_description') || '';
    
    
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
                        <FilePenLine className="w-6 h-6 text-[#013371]" /> Review/Edit Exhibitor: {profile.company_name}
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
                            
                            {/* 1. Company & Contact Details (Col 1) */}
                            <div className="lg:col-span-1 p-4 border rounded-lg bg-gray-50 h-full">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
                                    <Store className="w-4 h-4"/> Company Info
                                </h3>
                                <div className="flex justify-center mb-4">
                                    <a href={profile.company_logo_url || '#'} target="_blank" rel="noopener noreferrer" className="block">
                                     <img 
                                        src={profile.company_logo_url || '/default-logo.png'} 
                                        alt="Company Logo" 
                                        className="w-24 h-24 rounded-lg object-contain bg-white border border-slate-300 p-2 shadow-md"
                                    />
                                    </a>
                                </div>
                                <div className="space-y-3">
                                    <div><Label>Company Name</Label><Input {...register('company_name', { required: true })} className="h-9" /></div>
                                    <div><Label>Website</Label><Input {...register('company_website', { required: true })} className="h-9" type="url" /></div>
                                    <h4 className="text-sm font-semibold pt-2 border-t mt-3">Contact</h4>
                                    <div><Label>Contact Name</Label><Input {...register('contact_personname', { required: true })} className="h-9" /></div>
                                    <div><Label>Contact Email (Read-Only)</Label><Input value={profile.email} disabled className="h-9 bg-slate-100" /></div>
                                    <div><Label>Contact Phone</Label><Input {...register('contact_phone', { required: true })} className="h-9" type="tel" /></div>
                                </div>
                            </div>
                            
                            {/* 2. Description & Booth (Col 2 & 3) */}
                            <div className="lg:col-span-2 p-4 border rounded-lg bg-gray-50">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-700">
                                    <User className="w-4 h-4"/> Exhibition Details
                                </h3>
                                
                                {/* Booth Type */}
                                <div className="mb-4">
                                    <Label>Booth Type / Package</Label>
                                    <Controller
                                        name="booth_type"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="h-10"><SelectValue placeholder="Select Booth Package" /></SelectTrigger>
                                                <SelectContent className="max-h-48 overflow-y-auto">
                                                    {boothOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                {/* Company Description */}
                                <div className="mb-4">
                                    <Label>Company Description (Max 150 words)</Label>
                                    <textarea
                                        {...register('company_description', { required: true, maxLength: 150 })}
                                        rows={5}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#013371] resize-none"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">{watchedDescription.length}/150</p>
                                </div>
                                
                                {/* Action Buttons - Save Data */}
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

                                {/* Status Toggle */}
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
                            </div>
                        </div>
                        
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};


// 2. Main Admin Dashboard Component
export default function AdminExhibitorDashboard() {
    const [profiles, setProfiles] = useState<ExhibitorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [approvalFilter, setApprovalFilter] = useState('all');
    
    // 🟢 State for selected profile ID for external actions
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    
    // State for Modal (used only for review/edit)
    const [selectedProfileForModal, setSelectedProfileForModal] = useState<ExhibitorProfile | null>(null);

    // --- Hardcoded Booth Options (should match client form) ---
    const BOOTH_OPTIONS = useMemo(() => ["Startup Pod (2x2m)", "Standard Shell (3x3m)", "Premium Booth (6x3m)", "Custom Build (Space only)"], []);


    const fetchExhibitorProfiles = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSelectedUserId(null); 
        try {
            let query = supabase
                .from('exhibitor_profiles')
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
            
            // Ensure email and contact name are present for display
            const formattedData = (data || []).map(p => ({
                ...p,
                email: p.email || 'N/A',
                contact_personname: p.contact_personname || 'N/A',
            })) as ExhibitorProfile[];

            setProfiles(formattedData);
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
                .from('exhibitor_profiles')
                .update({ is_approved: isApproved })
                .eq('user_id', userId);
            
            if (updateError) throw updateError;
            
            // Optimistically update local state
            setProfiles(prev => prev.map(p => 
                p.user_id === userId ? { ...p, is_approved: isApproved } : p
            ));
            
            alert(`Application successfully ${isApproved ? 'approved' : 'disapproved'}!`);
            
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
                company_name: data.company_name,
                company_website: data.company_website,
                contact_phone: data.contact_phone,
                booth_type: data.booth_type,
                company_description: data.company_description,
                contact_personname: data.contact_personname,
                // Logo update is handled separately on the client form and not expected here
            };

            const { error: updateError } = await supabase
                .from('exhibitor_profiles')
                .update(payload)
                .eq('user_id', userId);

            if (updateError) throw updateError;
            
            alert(`Profile data successfully updated!`);

            fetchExhibitorProfiles();

        } catch (err: any) {
            console.error("Error updating profile data:", err);
            alert(`Failed to update profile data: ${err.message}`);
        }
    }, [fetchExhibitorProfiles]);


    useEffect(() => {
        fetchExhibitorProfiles();
    }, [fetchExhibitorProfiles]);


    // --- Filtering and Searching ---
    const filteredProfiles = useMemo(() => {
        if (!searchTerm) return profiles;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return profiles.filter(p => 
            p.company_name.toLowerCase().includes(lowerSearchTerm) ||
            p.email.toLowerCase().includes(lowerSearchTerm) ||
            p.contact_personname.toLowerCase().includes(lowerSearchTerm)
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
                <Store className="w-8 h-8 text-[#013371]" /> Exhibitor Application Admin Dashboard
            </h1>
            
            {/* Action Card for Selected Profile (Sticky Bar) */}
            {selectedUserId && selectedProfileData && (
                <Card className="shadow-lg border-2 border-blue-500 mb-6 sticky top-4 z-10 animate-fadeIn">
                    <CardContent className="p-4 flex justify-between items-center bg-blue-50">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-blue-700">Selected: {selectedProfileData.company_name} (Contact: {selectedProfileData.contact_personname})</span>
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
                                <SelectItem value="all">All Applications</SelectItem>
                                <SelectItem value="pending">Pending Review</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search Bar */}
                    <div className="md:col-span-3">
                        <Label className="block text-sm font-medium text-gray-700 mb-1">Search (Company, Contact, Email)</Label>
                        <div className="relative">
                            <Input 
                                type="text" 
                                placeholder="Search by company name or contact email..." 
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
                        Exhibitor Applications ({filteredProfiles.length})
                        <Button onClick={fetchExhibitorProfiles} disabled={loading} variant="outline" className="h-8">
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
                        <div className="text-center py-10 text-gray-500">No exhibitor applications found matching the criteria.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableHead>Status</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Contact Person</TableHead>
                                        <TableHead>Booth Type</TableHead>
                                        <TableHead>Website</TableHead>
                                        <TableHead>Applied On</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProfiles.map((p) => (
                                        <TableRow 
                                            key={p.user_id} 
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
                                            <TableCell className="font-medium">{p.company_name}</TableCell>
                                            <TableCell className="text-slate-600">{p.contact_personname}</TableCell>
                                            <TableCell>{p.booth_type}</TableCell>
                                            <TableCell className="text-blue-600 hover:underline">
                                                <a href={p.company_website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}><LinkIcon className="w-4 h-4 inline mr-1"/> Visit</a>
                                            </TableCell>
                                            <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Button 
                                                    size="sm" 
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
                <ExhibitorReviewModal
                    profile={selectedProfileForModal}
                    onClose={() => setSelectedProfileForModal(null)}
                    onStatusUpdate={handleStatusUpdate}
                    onDataUpdate={handleDataUpdate}
                    boothOptions={BOOTH_OPTIONS}
                />
            )}
        </div>
    );
}