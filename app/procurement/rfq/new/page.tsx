'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search, Plus, X, ArrowRight } from 'lucide-react';

export default function NewRFQPage() {
    const [selectedPRs, setSelectedPRs] = useState<string[]>([]);
    const [selectedVendors, setSelectedVendors] = useState<number[]>([]);

    const togglePR = (id: string) => {
        setSelectedPRs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleVendor = (id: number) => {
        setSelectedVendors(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href="/procurement/rfq" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Create Request for Quotation</h1>
                    <p className="text-sm text-slate-500">Invite vendors to bid on open requisitions.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Form */}
                <div className="col-span-12 lg:col-span-8 space-y-8">

                    {/* Step 1: Select PRs */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">1. Select Requisitions</h3>
                        <div className="space-y-3">
                            <div className={`p-4 rounded border cursor-pointer transition-all ${selectedPRs.includes('PR-2026-9901') ? 'border-[#0052CC] bg-blue-50/50 ring-1 ring-[#0052CC]' : 'border-slate-200 hover:bg-slate-50'}`} onClick={() => togglePR('PR-2026-9901')}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-bold text-[#0052CC] bg-blue-100 px-2 py-0.5 rounded mr-2">PR-2026-9901</span>
                                        <span className="text-sm font-medium text-[#0B1120]">Core Banking Server Upgrade</span>
                                    </div>
                                    {selectedPRs.includes('PR-2026-9901') && <div className="bg-[#0052CC] text-white p-1 rounded-full"><Plus className="w-3 h-3" /></div>}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Approved on 06 Jan 2026 • IT Infrastructure • Est. IDR 4.5B</p>
                            </div>
                            <div className={`p-4 rounded border cursor-pointer transition-all ${selectedPRs.includes('PR-2026-9902') ? 'border-[#0052CC] bg-blue-50/50 ring-1 ring-[#0052CC]' : 'border-slate-200 hover:bg-slate-50'}`} onClick={() => togglePR('PR-2026-9902')}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-bold text-[#0052CC] bg-blue-100 px-2 py-0.5 rounded mr-2">PR-2026-9902</span>
                                        <span className="text-sm font-medium text-[#0B1120]">Branch Office Furniture</span>
                                    </div>
                                    {selectedPRs.includes('PR-2026-9902') && <div className="bg-[#0052CC] text-white p-1 rounded-full"><Plus className="w-3 h-3" /></div>}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Approved on 07 Jan 2026 • General Affairs • Est. IDR 125M</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Event Details */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">2. Event Configuration</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">RFQ Title</label>
                                <input type="text" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] outline-none" placeholder="e.g. Server Procurement Q1 2026" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Submission Deadline</label>
                                <input type="date" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Currency</label>
                                <select className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white outline-none">
                                    <option>IDR (Rupiah)</option>
                                    <option>USD (US Dollar)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Invite Vendors */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">3. Invite Vendors</h3>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search vendor database..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0052CC] outline-none" />
                        </div>

                        <div className="space-y-2">
                            {[
                                { id: 1, name: 'PT. Tech Solution', cat: 'IT Hardware', rating: 'A' },
                                { id: 2, name: 'Global Systems Inc', cat: 'IT Hardware', rating: 'A' },
                                { id: 3, name: 'Office World', cat: 'Furniture', rating: 'B' },
                            ].map((v) => (
                                <div key={v.id} onClick={() => toggleVendor(v.id)} className={`flex items-center justify-between p-3 rounded border cursor-pointer ${selectedVendors.includes(v.id) ? 'bg-emerald-50 border-emerald-200' : 'border-slate-100 hover:bg-slate-50'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedVendors.includes(v.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                                            {selectedVendors.includes(v.id) && <Plus className="w-3 h-3 text-white" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#0B1120]">{v.name}</p>
                                            <p className="text-[10px] text-slate-500">{v.cat} • Rating: {v.rating}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Sidebar Summary */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="bg-[#0B1120] p-6 rounded text-white shadow-lg sticky top-6">
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-6 border-b border-slate-700 pb-2">Summary</h4>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between">
                                <span className="text-slate-400 text-sm">Selected PRs</span>
                                <span className="font-mono font-bold">{selectedPRs.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 text-sm">Invited Vendors</span>
                                <span className="font-mono font-bold">{selectedVendors.length}</span>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-[#0052CC] hover:bg-blue-600 text-white font-bold text-sm rounded transition-all flex items-center justify-center gap-2">
                            Publish RFQ <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-[10px] text-slate-500 text-center mt-3">Vendors will be notified via email instantly.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
