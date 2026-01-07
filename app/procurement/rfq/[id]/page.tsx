'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Users, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from "@/components/ui/status-badge";

export default function RFQDetailPage({ params }: { params: { id: string } }) {
    const RFQ = {
        id: params.id || 'RFQ-9901',
        title: 'Network Switch Upgrade 2026',
        status: 'OPEN',
        deadline: '2026-02-01',
        desc: 'Procurement of 12 units of Core Switches for Data Center B.',
        vendors: [
            { name: 'PT. Tech Solution', status: 'Quote Received', price: 420000000 },
            { name: 'Global Systems Inc', status: 'Quote Received', price: 395000000 },
            { name: 'NetWorks Ltd', status: 'Invited', price: null },
        ]
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href="/procurement/rfq" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{RFQ.id}</h1>
                        <StatusBadge status={RFQ.status} />
                    </div>
                    <p className="text-sm text-slate-500">{RFQ.title}</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Info */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Event Details</h3>
                        <p className="text-sm text-slate-600 mb-6">{RFQ.desc}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="block text-xs text-slate-500 mb-1">Bid Deadline</span>
                                <span className="font-bold text-[#0B1120] flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-amber-500" /> {RFQ.deadline}
                                </span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-500 mb-1">Invited Vendors</span>
                                <span className="font-bold text-[#0B1120] flex items-center gap-2">
                                    <Users className="w-4 h-4 text-blue-500" /> {RFQ.vendors.length} Companies
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider">Vendor Responses</h3>
                            <Link href={`/procurement/rfq/${RFQ.id}/compare`} className="text-xs font-bold text-[#0052CC] hover:underline">Compare Bids</Link>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {RFQ.vendors.map((v, i) => (
                                <div key={i} className="px-6 py-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-sm text-[#0B1120]">{v.name}</p>
                                        <p className="text-xs text-slate-500">{v.status}</p>
                                    </div>
                                    {v.price ? (
                                        <span className="font-mono text-sm font-bold text-[#0B1120]">{v.price.toLocaleString('id-ID')}</span>
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">Waiting...</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Sidebar Actions */}
                <div className="col-span-12 lg:col-span-4 space-y-4">
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Management</h4>
                        <div className="space-y-3">
                            <button className="w-full py-2 bg-[#0052CC] text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                                Invite More Vendors
                            </button>
                            <button className="w-full py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50 transition-colors">
                                Extend Deadline
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
