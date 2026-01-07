'use client';

import React from 'react';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { AlertOctagon, RefreshCw, XCircle, Search, FileText } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

const BLACKLISTED_VENDORS = [
    {
        id: 'VN-0000',
        name: 'Mega Konstruksi Abadi',
        category: 'Construction',
        reason: 'Fraudulent Documentation',
        date: '2025-11-15',
        bannedBy: 'Compliance Dept',
        duration: 'PERMANENT',
        status: 'BLACKLISTED'
    },
    {
        id: 'VN-5599',
        name: 'Indo Tech Supplies',
        category: 'Hardware',
        reason: 'Contract Breach - Severe Delay',
        date: '2026-01-02',
        bannedBy: 'Procurement Head',
        duration: '2 YEARS',
        status: 'SUSPENDED'
    },
];

export default function BlacklistPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Blacklist Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage suspended and banned vendors.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-rose-600 text-white text-sm font-bold rounded shadow-sm hover:bg-rose-700 transition-colors">
                    <AlertOctagon className="w-4 h-4 mr-2" />
                    Blacklist Vendor
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {BLACKLISTED_VENDORS.map((vendor) => (
                    <CardSpotlight key={vendor.id} className="p-6 flex items-center justify-between" color="#ef4444">
                        <div className="flex items-start gap-6 relative z-10">
                            <div className="p-3 bg-neutral-800 rounded-lg border border-rose-500/30">
                                <AlertOctagon className="w-8 h-8 text-rose-500" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-xl font-bold text-white">{vendor.name}</h3>
                                    <span className="text-[10px] font-mono text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded">{vendor.id}</span>
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${vendor.status === 'BLACKLISTED' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                                        {vendor.status}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-400 mb-4">{vendor.category}</p>

                                <div className="flex items-center gap-8 text-xs text-neutral-500">
                                    <div className="flex flex-col">
                                        <span className="uppercase tracking-wider text-[10px]">Reason</span>
                                        <span className="text-white font-medium">{vendor.reason}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="uppercase tracking-wider text-[10px]">Date</span>
                                        <span className="text-white font-medium">{vendor.date}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="uppercase tracking-wider text-[10px]">Duration</span>
                                        <span className="text-white font-medium">{vendor.duration}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="uppercase tracking-wider text-[10px]">Action By</span>
                                        <span className="text-white font-medium">{vendor.bannedBy}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col gap-2">
                            <button className="px-4 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 text-xs font-bold rounded flex items-center gap-2 transition-all">
                                <FileText className="w-3 h-3" /> View Case
                            </button>
                            <button className="px-4 py-2 bg-neutral-800 border border-neutral-700 text-emerald-500 hover:text-emerald-400 hover:border-emerald-500/30 text-xs font-bold rounded flex items-center gap-2 transition-all">
                                <RefreshCw className="w-3 h-3" /> Reinstate
                            </button>
                        </div>
                    </CardSpotlight>
                ))}
            </div>

            {/* Empty State / Search */}
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-medium">Search for vendors to check blacklist status</p>
                <div className="mt-4 max-w-md mx-auto relative">
                    <input type="text" placeholder="Enter vendor name or ID..." className="w-full text-sm border border-slate-300 rounded px-4 py-2 pl-10 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none" />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
            </div>
        </div>
    );
}
