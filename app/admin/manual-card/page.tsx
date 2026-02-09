"use client"

import React, { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabaseConfig"
import { Download, Save, User, Building2, Mail, CreditCard, RefreshCw, Trash2, CheckCircle, Ticket, Settings, Plus, X, Palette, Search, Pencil } from "lucide-react"
import html2canvas from "html2canvas"
import QRCode from "react-qr-code"

interface AccessRole {
    id: string;
    role_name: string;
    bg_gradient: string;
    accent_color: string;
    label: string;
}

interface ManualCard {
    id: string;
    full_name: string;
    company_name: string;
    role: string;
    email: string | null;
    created_at: string;
}

export default function ManualCardPage() {
    const [loading, setLoading] = useState(false);
    const [recentCards, setRecentCards] = useState<ManualCard[]>([]);
    const [roles, setRoles] = useState<AccessRole[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Form State
    const [formData, setFormData] = useState<{
        full_name: string;
        company_name: string;
        role: string;
        email: string;
    }>({
        full_name: '',
        company_name: '',
        role: '', // Will default after fetch
        email: ''
    });

    const [editingCardId, setEditingCardId] = useState<string | null>(null);

    // Badge Generation State
    const badgeRef = useRef<HTMLDivElement>(null);
    const [badgeData, setBadgeData] = useState<ManualCard | null>(null);

    // Role Management Modal
    const [isManageRolesOpen, setIsManageRolesOpen] = useState(false);
    const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
    const [newRoleData, setNewRoleData] = useState({
        role_name: '',
        base_color: '#3b82f6', // Default blueish
        accent_color: '#ffffff'
    });

    useEffect(() => {
        fetchRoles();
        fetchRecentCards();
    }, []);

    const fetchRoles = async () => {
        const { data, error } = await supabase.from('access_roles').select('*').order('role_name');
        if (data) {
            setRoles(data);
            if (!formData.role && data.length > 0) {
                // Set default role to the first one found or 'Founder' if exists
                const defaultRole = data.find(r => r.role_name === 'Founder') || data[0];
                setFormData(prev => ({ ...prev, role: defaultRole.role_name }));
            }
        }
    };

    const fetchRecentCards = async () => {
        const { data, error } = await supabase
            .from('manual_id_cards')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50); // Increased limit slightly since we have search now

        if (data) setRecentCards(data as ManualCard[]);
    };

    const handleDeleteCard = async (id: string) => {
        if (!confirm("Are you sure you want to delete this card history?")) return;
        const { error } = await supabase.from('manual_id_cards').delete().eq('id', id);
        if (!error) {
            setRecentCards(prev => prev.filter(c => c.id !== id));
        } else {
            alert("Failed to delete.");
        }
    };

    const handleRoleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Generate simple gradient from base color
            const bgGradient = `radial-gradient(circle at top right, ${newRoleData.base_color} 0%, #000000 130%)`;

            if (editingRoleId) {
                // Update
                const { error } = await supabase.from('access_roles').update({
                    role_name: newRoleData.role_name,
                    label: newRoleData.role_name.toUpperCase(),
                    bg_gradient: bgGradient,
                    accent_color: newRoleData.accent_color
                }).eq('id', editingRoleId);

                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase.from('access_roles').insert([{
                    role_name: newRoleData.role_name,
                    label: newRoleData.role_name.toUpperCase(),
                    bg_gradient: bgGradient,
                    accent_color: newRoleData.accent_color
                }]);

                if (error) throw error;
            }

            fetchRoles();
            resetRoleForm();
        } catch (err: any) {
            alert("Error saving role: " + err.message);
        }
    };

    const handleEditRole = (role: AccessRole) => {
        setEditingRoleId(role.id);
        // Try to extract base color from gradient string using regex
        const colorMatch = role.bg_gradient.match(/#[0-9a-fA-F]{6}/);
        const baseColor = colorMatch ? colorMatch[0] : '#3b82f6';

        setNewRoleData({
            role_name: role.role_name,
            base_color: baseColor,
            accent_color: role.accent_color
        });
    };

    const resetRoleForm = () => {
        setEditingRoleId(null);
        setNewRoleData({ role_name: '', base_color: '#3b82f6', accent_color: '#ffffff' });
    };

    const handleDeleteRole = async (id: string) => {
        if (!confirm("Delete this access role? This won't affect existing cards but will remove it from the dropdown.")) return;
        const { error } = await supabase.from('access_roles').delete().eq('id', id);
        if (!error) fetchRoles();
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let cardData: ManualCard;

            if (editingCardId) {
                // UPDATE logic
                const { data, error } = await supabase
                    .from('manual_id_cards')
                    .update({
                        full_name: formData.full_name,
                        company_name: formData.company_name,
                        role: formData.role,
                        email: formData.email || null
                    })
                    .eq('id', editingCardId)
                    .select()
                    .single();

                if (error) throw error;
                cardData = data as ManualCard;

                // Update local state
                setRecentCards(prev => prev.map(c => c.id === cardData.id ? cardData : c));
                setEditingCardId(null);
            } else {
                // INSERT logic
                const { data, error } = await supabase
                    .from('manual_id_cards')
                    .insert([{
                        full_name: formData.full_name,
                        company_name: formData.company_name,
                        role: formData.role,
                        email: formData.email || null
                    }])
                    .select()
                    .single();

                if (error) throw error;
                cardData = data as ManualCard;
                setRecentCards([cardData, ...recentCards]);
            }

            // Trigger Download for both cases
            setBadgeData(cardData);
            setTimeout(() => downloadBadge(cardData), 500);

            // Reset Form (keep role since user might print cards in batch for same role)
            setFormData({
                ...formData,
                full_name: '',
                company_name: '',
                email: ''
            });

        } catch (err: any) {
            console.error("Error saving card:", err);
            alert("Failed to save card: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditCard = (card: ManualCard) => {
        setEditingCardId(card.id);
        setFormData({
            full_name: card.full_name,
            company_name: card.company_name,
            role: card.role,
            email: card.email || ''
        });
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditCard = () => {
        setEditingCardId(null);
        setFormData({
            ...formData,
            full_name: '',
            company_name: '',
            email: ''
        });
    }

    const downloadBadge = async (card: ManualCard) => {
        if (!badgeRef.current) return;
        try {
            const canvas = await html2canvas(badgeRef.current, {
                scale: 4,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                onclone: (clonedDoc) => {
                    const element = clonedDoc.getElementById('manual-badge-content');
                    if (element) {
                        element.style.visibility = 'visible';
                    }
                }
            });

            const image = canvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");
            link.href = image;
            link.download = `Pass-${card.role}-${card.full_name.replace(/\s+/g, '-')}.png`;
            link.click();
            setBadgeData(null);
        } catch (err) {
            console.error(err);
            alert("Error downloading badge image.");
        }
    };

    const handleHistoryDownload = (card: ManualCard) => {
        setBadgeData(card);
        setTimeout(() => downloadBadge(card), 500);
    };

    // Helper to get current role config
    const currentRoleConfig = roles.find(r => r.role_name === formData.role) || roles[0];
    const badgeRoleConfig = badgeData ? (roles.find(r => r.role_name === badgeData.role) || roles[0]) : null;

    // Filter Logic
    const filteredCards = recentCards.filter(card =>
        card.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Ticket className="w-8 h-8 text-teal-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Manual ID Card Generator</h1>
                            <p className="text-slate-600">Create & Manage instant ID cards for dynamic roles.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsManageRolesOpen(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow-sm font-medium"
                    >
                        <Settings className="w-4 h-4" /> Manage Access Roles
                    </button>
                </div>

                {/* Creation Form */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2 flex justify-between items-center">
                        {editingCardId ? 'Edit Card Details' : 'New Card Details'}
                        {editingCardId && (
                            <button
                                onClick={cancelEditCard}
                                className="text-sm font-normal text-slate-500 hover:text-blue-500 hover:bg-blue-50 px-2 py-1 rounded transition"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </h2>
                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-slate-400" /> Access Role <span className="text-xs text-slate-400 font-normal">(Determines Card Color)</span>
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white font-medium"
                                >
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.role_name}>{role.role_name}</option>
                                    ))}
                                </select>
                                {currentRoleConfig && (
                                    <div className="text-xs flex items-center gap-2 mt-1">
                                        Preview:
                                        <div
                                            className="w-20 h-4 rounded border border-slate-200"
                                            style={{ background: currentRoleConfig.bg_gradient }}
                                        ></div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-400" /> Full Name
                                </label>
                                <input
                                    required
                                    value={formData.full_name}
                                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                    placeholder="e.g. John Doe"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-slate-400" /> Company / Organization
                                </label>
                                <input
                                    required
                                    value={formData.company_name}
                                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                                    placeholder="e.g. Tech Solutions Inc."
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-slate-400" /> Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="For records..."
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex items-center gap-2 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all disabled:opacity-50 ${editingCardId ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-teal-600 hover:bg-teal-700'}`}
                            >
                                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (editingCardId ? <Save className="w-5 h-5" /> : <Download className="w-5 h-5" />)}
                                {editingCardId ? 'Update & Regenerate Card' : 'Generate & Download Card'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Recent History */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h3 className="font-bold text-slate-800">Recent Generated Cards</h3>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            {/* Search */}
                            <div className="relative w-full sm:w-64">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    placeholder="Search history..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-teal-500 transition-colors"
                                />
                            </div>

                            <button onClick={fetchRecentCards} className="text-sm text-slate-500 hover:text-teal-600 flex items-center gap-1">
                                <RefreshCw className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {filteredCards.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                {searchTerm ? 'No matches found.' : 'No recent cards found.'}
                            </div>
                        ) : (
                            filteredCards.map(card => {
                                const roleConfig = roles.find(r => r.role_name === card.role) || { bg_gradient: '#333', accent_color: '#888' };
                                return (
                                    <div key={card.id} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-slate-50 group">
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
                                                style={{ background: roleConfig.bg_gradient }}
                                            >
                                                {card.role[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{card.full_name}</p>
                                                <p className="text-xs text-slate-500">{card.company_name} • <span className="font-medium" style={{ color: roleConfig.accent_color === '#888' ? '#64748b' : roleConfig.accent_color }}>{card.role}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                                            <button
                                                onClick={() => handleEditCard(card)}
                                                className="px-3 py-1.5 border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                title="Edit details"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleHistoryDownload(card)}
                                                className="px-3 py-1.5 border border-slate-200 hover:border-teal-500 hover:text-teal-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                title="Download again"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCard(card.id)}
                                                className="px-3 py-1.5 border border-blue-200 hover:bg-blue-50 text-blue-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                title="Delete record"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

            </div>

            {/* Manage Roles Modal */}
            {isManageRolesOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setIsManageRolesOpen(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800">Manage Access Roles</h3>
                            <button onClick={() => setIsManageRolesOpen(false)} className="text-slate-400 hover:text-slate-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {/* Create / Edit Form */}
                            <form onSubmit={handleRoleSubmit} className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 space-y-4">
                                <h4 className="text-sm font-bold text-slate-700 uppercase flex justify-between items-center">
                                    {editingRoleId ? 'Edit Access Role' : 'Create New Access Role'}
                                    {editingRoleId && (
                                        <button
                                            type="button"
                                            onClick={resetRoleForm}
                                            className="text-xs text-indigo-600 hover:underline font-normal normal-case"
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 mb-1 block">Role Name</label>
                                        <input
                                            required
                                            placeholder="e.g. VIP"
                                            className="w-full px-3 py-2 rounded border border-slate-300 text-sm"
                                            value={newRoleData.role_name}
                                            onChange={e => setNewRoleData({ ...newRoleData, role_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label className="text-xs font-semibold text-slate-500 mb-1 block">Base Color</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    className="w-10 h-9 p-0 rounded cursor-pointer border-none"
                                                    value={newRoleData.base_color}
                                                    onChange={e => setNewRoleData({ ...newRoleData, base_color: e.target.value })}
                                                />
                                                <span className="text-xs font-mono text-slate-500">{newRoleData.base_color}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs font-semibold text-slate-500 mb-1 block">Accent Text</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    className="w-10 h-9 p-0 rounded cursor-pointer border-none"
                                                    value={newRoleData.accent_color}
                                                    onChange={e => setNewRoleData({ ...newRoleData, accent_color: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2">
                                    {editingRoleId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    {editingRoleId ? 'Update Role' : 'Add Role'}
                                </button>
                            </form>

                            {/* List Existing */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-slate-700 uppercase mb-2">Existing Roles</h4>
                                {roles.map(role => (
                                    <div key={role.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm hover:border-slate-300 transition">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-6 h-6 rounded-full border border-slate-100 shadow-sm"
                                                style={{ background: role.bg_gradient }}
                                            ></div>
                                            <span className="font-semibold text-sm text-slate-800">{role.role_name}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleEditRole(role)}
                                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
                                                title="Edit Role"
                                            >
                                                <Settings className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRole(role.id)}
                                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                                                title="Delete Role"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden Badge Render */}
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                {badgeData && badgeRoleConfig && (
                    <div
                        ref={badgeRef}
                        id="manual-badge-content"
                        className="relative rounded-2xl shadow-2xl overflow-hidden"
                        style={{
                            background: badgeRoleConfig.bg_gradient,
                            border: '1px solid rgba(255,255,255,0.2)',
                            fontFamily: 'Arial, sans-serif',
                            width: '340px',
                            minHeight: '500px',
                            boxSizing: 'border-box',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Decorative Circle matches color */}
                        <div style={{
                            position: 'absolute',
                            top: '-100px',
                            left: '-50px',
                            width: '300px',
                            height: '300px',
                            background: `radial-gradient(circle, ${badgeRoleConfig.accent_color}33 0%, rgba(0,0,0,0) 70%)`,
                            borderRadius: '50%',
                            pointerEvents: 'none'
                        }}></div>

                        <div style={{
                            padding: '30px 20px 20px 20px',
                            textAlign: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            position: 'relative',
                            zIndex: 10
                        }}>
                            <h5 style={{
                                color: '#e2e8f0', // Lighter for contrast on dark colors
                                fontSize: '10px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                margin: '0 0 8px 0',
                                opacity: 0.8
                            }}>
                                Official Event Pass
                            </h5>
                            <h2 style={{
                                color: badgeRoleConfig.accent_color,
                                fontSize: '22px',
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                lineHeight: '1.2',
                                margin: 0,
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
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
                                border: `2px solid ${badgeRoleConfig.accent_color}`,
                                background: 'rgba(255, 255, 255, 0.05)',
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
                                fontSize: '26px',
                                fontWeight: '800',
                                margin: '0 0 8px 0',
                                lineHeight: '1.2',
                                wordWrap: 'break-word',
                                textTransform: 'uppercase'
                            }}>
                                {badgeData.full_name}
                            </h1>
                            <p style={{
                                color: '#e2e8f0',
                                fontSize: '16px',
                                fontWeight: '500',
                                margin: '0 0 20px 0',
                                opacity: 0.9,
                                textTransform: 'uppercase'
                            }}>
                                {badgeData.company_name}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <span style={{
                                    color: badgeRoleConfig.accent_color,
                                    fontSize: '18px', // Slightly larger
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    borderBottom: `2px solid ${badgeRoleConfig.accent_color}`,
                                    paddingBottom: '4px'
                                }}>
                                    {badgeRoleConfig.label} ACCESS
                                </span>
                            </div>
                        </div>
                        <div style={{
                            background: '#ffffff',
                            padding: '25px 20px',
                            borderTop: `4px solid ${badgeRoleConfig.accent_color}`,
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
                                    {badgeData.id.slice(0, 8)}
                                </p>
                            </div>
                            <div style={{
                                padding: '4px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px'
                            }}>
                                <QRCode value={badgeData.id} size={80} fgColor="#000000" bgColor="#ffffff" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
