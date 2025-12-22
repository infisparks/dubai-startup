'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseConfig"
import { Users, User, Briefcase, DollarSign, Star, Linkedin } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function InvestorsPage() {
    const [language, setLanguage] = useState<"en" | "ar">("en")
    const [investors, setInvestors] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInvestors = async () => {
            try {
                const { data, error } = await supabase
                    .from('investor_profiles')
                    .select('*')
                    .eq('is_approved', true)

                if (error) {
                    console.error('Error fetching investors:', error)
                } else {
                    setInvestors(data || [])
                }
            } catch (err) {
                console.error('Unexpected error:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchInvestors()
    }, [])

    return (
        <div className="min-h-screen bg-slate-50">
            <Header language={language} setLanguage={setLanguage} />
            <main className="pt-24 pb-20 min-h-[80vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="text-center mb-16 animate-fadeIn">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            {language === 'en' ? 'Our Approved Investors' : 'المستثمرون المعتمدون لدينا'}
                        </h1>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-6" />
                        <p className="max-w-2xl mx-auto text-lg text-slate-600">
                            {language === 'en'
                                ? 'Connect with our network of verified visionary investors ready to fuel the next generation of innovation.'
                                : 'تواصل مع شبكتنا من المستثمرين المعتمدين المستعدين لدعم الجيل القادم من الابتكار.'}
                        </p>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="bg-white rounded-2xl p-6 h-80 animate-pulse border border-slate-200">
                                    <div className="w-16 h-16 bg-slate-200 rounded-full mb-4 mx-auto" />
                                    <div className="h-6 bg-slate-200 rounded w-3/4 mx-auto mb-4" />
                                    <div className="space-y-3">
                                        <div className="h-4 bg-slate-200 rounded w-full" />
                                        <div className="h-4 bg-slate-200 rounded w-5/6" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : investors.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                {language === 'en' ? 'No investors found yet' : 'لم يتم العثور على مستثمرين بعد'}
                            </h3>
                            <p className="text-slate-500">
                                {language === 'en' ? 'Check back soon for updates.' : 'تحقق مرة أخرى قريبا للحصول على تحديثات.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {investors.map((investor) => (
                                <div
                                    key={investor.id}
                                    className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Header: Avatar & Name */}
                                    <div className="flex flex-col items-center text-center mb-6">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-white shadow-md flex items-center justify-center mb-4 text-2xl font-bold text-blue-600">
                                            {investor.name ? investor.name.charAt(0).toUpperCase() : <User className="w-8 h-8" />}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                                            {investor.name || (language === 'en' ? 'Anonymous Investor' : 'مستثمر مجهول')}
                                        </h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {investor.investment_type || 'Investor'}
                                        </span>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-start gap-3 text-sm">
                                            <Briefcase className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{language === 'en' ? 'Experience' : 'الخبرة'}</p>
                                                <p className="text-slate-700">{investor.experience || '-'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 text-sm">
                                            <DollarSign className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{language === 'en' ? 'Investment Range' : 'نطاق الاستثمار'}</p>
                                                <p className="text-slate-700">{investor.investment_amount || '-'}</p>
                                            </div>
                                        </div>

                                        {investor.interests && investor.interests.length > 0 && (
                                            <div className="flex items-start gap-3 text-sm">
                                                <Star className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1.5">{language === 'en' ? 'Interests' : 'الاهتمامات'}</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {investor.interests.slice(0, 3).map((interest: string, i: number) => (
                                                            <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">
                                                                {interest}
                                                            </span>
                                                        ))}
                                                        {investor.interests.length > 3 && (
                                                            <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-xs border border-slate-200">
                                                                +{investor.interests.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    {investor.linkedin && (
                                        <a
                                            href={investor.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium text-sm group-hover:border-blue-200"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            {language === 'en' ? 'Connect on LinkedIn' : 'تواصل على LinkedIn'}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer language={language} />
        </div>
    )
}
