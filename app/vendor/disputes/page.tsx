'use client';

import React, { useState } from 'react';
import { Plus, AlertTriangle, MessageSquare, CheckCircle } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Button } from '@/components/ui/button';

interface Dispute {
    id: string;
    refType: 'INVOICE' | 'PO' | 'QUALITY';
    refId: string;
    subject: string;
    openDate: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'OPEN' | 'RESOLVED' | 'IN_PROGRESS';
}

const DISPUTES: Dispute[] = [
    { id: 'DSP-24-001', refType: 'INVOICE', refId: 'INV-2023-998', subject: 'Short payment received', openDate: '2024-01-02', priority: 'HIGH', status: 'IN_PROGRESS' },
    { id: 'DSP-23-089', refType: 'PO', refId: 'PO-2023-155', subject: 'Delivery terms disagreement', openDate: '2023-12-15', priority: 'MEDIUM', status: 'RESOLVED' },
    { id: 'DSP-24-003', refType: 'QUALITY', refId: 'GR-2024-012', subject: 'Rejection of goods (Batch A)', openDate: '2024-01-05', priority: 'HIGH', status: 'OPEN' },
];

export default function VendorDisputesPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    const filteredData = activeTab === 'ALL' ? DISPUTES : DISPUTES.filter(d => d.status === activeTab);

    const columns: Column<Dispute>[] = [
        {
            header: 'Dispute ID',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-50 rounded text-rose-600">
                        <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.id}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Ref: {item.refId}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Type',
            accessorKey: 'refType',
            cell: (item) => (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-600">
                    {item.refType}
                </span>
            )
        },
        { header: 'Subject', accessorKey: 'subject', cell: (item) => <span className="font-medium text-slate-700">{item.subject}</span> },
        {
            header: 'Priority',
            accessorKey: 'priority',
            cell: (item) => (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded
                    ${item.priority === 'HIGH' ? 'bg-rose-100 text-rose-700' :
                        item.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-600'}`}>
                    {item.priority}
                </span>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <Button variant="ghost" className="h-8 text-xs text-[#0052CC] hover:text-blue-700 hover:bg-blue-50">
                    View Details
                </Button>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Dispute Resolution</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and track issues related to payments or orders.</p>
                </div>
                <Button className="bg-[#0052CC] hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Raise Dispute
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSpotlight className="p-6 h-32" color="#f43f5e">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Open Disputes</p>
                            <p className="text-3xl font-black text-white">{DISPUTES.filter(d => d.status === 'OPEN').length}</p>
                            <p className="text-sm text-neutral-500 mt-1">Requires attention</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-rose-500 opacity-50" />
                    </div>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#3b82f6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">In Progress</p>
                            <p className="text-3xl font-black text-white">{DISPUTES.filter(d => d.status === 'IN_PROGRESS').length}</p>
                            <p className="text-sm text-neutral-500 mt-1">Being reviewed</p>
                        </div>
                        <MessageSquare className="w-8 h-8 text-blue-500 opacity-50" />
                    </div>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#10b981">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Resolved (YTD)</p>
                            <p className="text-3xl font-black text-white">12</p>
                            <p className="text-sm text-neutral-500 mt-1">Successfully closed</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-emerald-500 opacity-50" />
                    </div>
                </CardSpotlight>
            </div>

            <div className="space-y-4">
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8">
                        {['ALL', 'OPEN', 'RESOLVED'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
                                    ${activeTab === tab
                                        ? 'border-[#0052CC] text-[#0052CC]'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <DataTable
                    data={filteredData}
                    columns={columns}
                    searchPlaceholder="Search disputes..."
                />
            </div>
        </div>
    );
}
