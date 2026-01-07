'use client';

import React, { useState } from 'react';
import { AlertCircle, MessageSquare, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const DISPUTES = [
    {
        id: 'DSP-2026-001',
        type: 'INVOICE_MISMATCH',
        vendor: 'PT. GRAHA SARANA',
        relatedDoc: 'INV-2026-003',
        amount: 125000000,
        status: 'OPEN',
        priority: 'HIGH',
        createdAt: '2026-01-05',
        lastUpdate: '2026-01-06 10:30',
        description: 'Invoice amount does not match PO total. Quantity discrepancy on line item 3.'
    },
    {
        id: 'DSP-2026-002',
        type: 'DELIVERY_ISSUE',
        vendor: 'NETWORKS LTD',
        relatedDoc: 'PO-2025-9988',
        amount: 0,
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        createdAt: '2026-01-03',
        lastUpdate: '2026-01-05 14:00',
        description: 'Partial delivery received. 5 out of 10 items missing.'
    },
    {
        id: 'DSP-2025-098',
        type: 'QUALITY_ISSUE',
        vendor: 'OFFICE SUPPLIES CO',
        relatedDoc: 'GR-2025-1122',
        amount: 5000000,
        status: 'RESOLVED',
        priority: 'LOW',
        createdAt: '2025-12-20',
        lastUpdate: '2026-01-02 09:00',
        description: 'Defective items received. Vendor agreed to replacement.'
    },
];

export default function DisputeListPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    const filteredDisputes = activeTab === 'ALL'
        ? DISPUTES
        : DISPUTES.filter(d => d.status === activeTab);

    const getTypeStyle = (type: string) => {
        switch (type) {
            case 'INVOICE_MISMATCH': return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'DELIVERY_ISSUE': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'QUALITY_ISSUE': return 'bg-purple-50 text-purple-700 border-purple-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'HIGH': return 'text-rose-600';
            case 'MEDIUM': return 'text-amber-600';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Dispute Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Track and resolve vendor disputes and discrepancies.</p>
                </div>
            </div>

            {/* KPI Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
                    <div className="flex justify-between items-start mb-2">
                        <AlertCircle className="w-5 h-5 text-rose-500" />
                        <span className="text-xs font-bold text-slate-400">OPEN</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">1</p>
                    <p className="text-xs text-rose-600 font-medium">Requires attention</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <Clock className="w-5 h-5 text-amber-500" />
                        <span className="text-xs font-bold text-slate-400">IN PROGRESS</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">1</p>
                    <p className="text-xs text-slate-500">Being resolved</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-bold text-slate-400">RESOLVED</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">1</p>
                    <p className="text-xs text-emerald-600 font-medium">This month</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                        <span className="text-xs font-bold text-slate-400">AVG RESOLUTION</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">4.2 Days</p>
                    <p className="text-xs text-slate-500">Target: 5 days</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                ${activeTab === tab
                                    ? 'border-[#0052CC] text-[#0052CC]'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }
                            `}
                        >
                            {tab.replace('_', ' ')}
                            <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                {tab === 'ALL' ? DISPUTES.length : DISPUTES.filter(d => d.status === tab).length}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Dispute List */}
            <div className="space-y-4">
                {filteredDisputes.map((dispute) => (
                    <div key={dispute.id} className="bg-white border border-slate-200 rounded shadow-sm p-5 hover:border-[#0052CC]/30 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-sm font-bold text-[#0052CC]">{dispute.id}</span>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getTypeStyle(dispute.type)}`}>
                                    {dispute.type.replace('_', ' ')}
                                </span>
                                <StatusBadge status={dispute.status.replace('_', ' ')} />
                            </div>
                            <span className={`text-xs font-bold ${getPriorityStyle(dispute.priority)}`}>
                                {dispute.priority} PRIORITY
                            </span>
                        </div>

                        <p className="text-sm text-[#0B1120] mb-3">{dispute.description}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-6 text-xs text-slate-500">
                                <span>Vendor: <strong className="text-[#0B1120]">{dispute.vendor}</strong></span>
                                <span>Related: <span className="font-mono">{dispute.relatedDoc}</span></span>
                                {dispute.amount > 0 && (
                                    <span>Amount: <strong className="font-mono text-[#0B1120]">IDR {dispute.amount.toLocaleString('id-ID')}</strong></span>
                                )}
                                <span>Updated: {dispute.lastUpdate}</span>
                            </div>
                            <button className="text-xs font-medium text-[#0052CC] hover:underline flex items-center gap-1">
                                View Details <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
