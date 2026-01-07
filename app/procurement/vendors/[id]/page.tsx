'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, AlertTriangle, FileText, Star, TrendingUp } from 'lucide-react';
import { StatusBadge } from "@/components/ui/status-badge";
import { CardSpotlight } from '@/components/ui/card-spotlight';

export default function VendorDetailPage({ params }: { params: { id: string } }) {
    const Vendor = {
        id: params.id || 'VN-1001',
        name: 'IBM INDONESIA',
        status: 'ACTIVE',
        category: 'IT Solutions',
        risk: { rating: 'A', score: 92, lastAssessment: '12 Dec 2025' },
        performance: { delivery: 98, quality: 100 },
        contacts: [
            { name: 'Budi Santoso', role: 'Key Account Manager', email: 'budi.s@id.ibm.com', phone: '+62 811 900 882' },
            { name: 'Finance Dept', role: 'Billing', email: 'ar@id.ibm.com', phone: '+62 21 500 220' }
        ],
        documents: [
            { name: 'SIUP / NIB', status: 'VALID', expiry: '2028-01-01' },
            { name: 'Tax ID (NPWP)', status: 'VALID', expiry: 'Lifetime' },
            { name: 'ISO 27001 Certificate', status: 'VALID', expiry: '2026-12-31' }
        ]
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href="/procurement/vendors" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{Vendor.name}</h1>
                        <StatusBadge status={Vendor.status} />
                    </div>
                    <p className="text-sm text-slate-500">{Vendor.id} • {Vendor.category}</p>
                </div>
                <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium text-sm rounded shadow-sm hover:bg-slate-50">Edit Profile</button>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {/* Aceternity Risk Card */}
                    <CardSpotlight className="p-8 relative overflow-hidden" color="#10b981">
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-sm text-neutral-400 uppercase tracking-wider mb-2">Risk Assessment</h3>
                                <div className="text-5xl font-black text-white mb-2">{Vendor.risk.rating}</div>
                                <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded text-xs font-bold uppercase">
                                    <ShieldCheck className="w-3 h-3" /> Low Risk
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold text-white mb-1">{Vendor.risk.score}<span className="text-lg text-neutral-500">/100</span></div>
                                <div className="text-xs text-neutral-500">Compliance Score</div>
                                <div className="text-xs text-neutral-600 mt-2">Assessed: {Vendor.risk.lastAssessment}</div>
                            </div>
                        </div>
                    </CardSpotlight>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-2 text-blue-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Delivery</span>
                            </div>
                            <div className="text-2xl font-bold text-[#0B1120]">{Vendor.performance.delivery}%</div>
                            <div className="text-[10px] text-slate-400">On-time rate</div>
                        </div>
                        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-2 text-purple-600">
                                <Star className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Quality</span>
                            </div>
                            <div className="text-2xl font-bold text-[#0B1120]">{Vendor.performance.quality}%</div>
                            <div className="text-[10px] text-slate-400">Pass rate</div>
                        </div>
                        <div className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-2 text-amber-600">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Disputes</span>
                            </div>
                            <div className="text-2xl font-bold text-[#0B1120]">0</div>
                            <div className="text-[10px] text-slate-400">Active cases</div>
                        </div>
                    </div>

                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider">Compliance Documents</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {Vendor.documents.map((doc, i) => (
                                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm font-medium text-[#0B1120]">{doc.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs text-slate-500">Exp: {doc.expiry}</span>
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{doc.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Key Contacts</h4>
                        <div className="space-y-4">
                            {Vendor.contacts.map((contact, i) => (
                                <div key={i} className="pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                    <p className="font-bold text-sm text-[#0B1120]">{contact.name}</p>
                                    <p className="text-xs text-slate-500 mb-1">{contact.role}</p>
                                    <p className="text-xs text-[#0052CC]">{contact.email}</p>
                                    <p className="text-xs text-slate-400">{contact.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <CardSpotlight className="p-6" color="#3b82f6">
                        <h4 className="font-bold text-xs text-neutral-400 uppercase tracking-wider mb-4">Financials</h4>
                        <div className="mb-4">
                            <p className="text-xs text-neutral-500 mb-1">Total Spend (YTD)</p>
                            <p className="text-2xl font-mono font-bold text-white">IDR 4.2B</p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500 mb-1">Open Orders</p>
                            <p className="text-lg font-mono font-bold text-white">IDR 850M</p>
                        </div>
                    </CardSpotlight>
                </div>
            </div>
        </div>
    );
}
