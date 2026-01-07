'use client';

import React, { useState } from 'react';
import { Eye, FileText, Calendar, DollarSign, Filter } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Quotation {
    id: string;
    rfqId: string;
    rfqTitle: string;
    submittedDate: string;
    amount: string;
    validUntil: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const QUOTATIONS: Quotation[] = [
    { id: 'QT-2024-001', rfqId: 'RFQ-2024-089', rfqTitle: 'High Performance Laptops Batch Q1', submittedDate: '2024-01-15', amount: 'IDR 450,000,000', validUntil: '2024-02-15', status: 'PENDING' },
    { id: 'QT-2023-156', rfqId: 'RFQ-2023-112', rfqTitle: 'Office Furniture Supply', submittedDate: '2023-12-10', amount: 'IDR 125,000,000', validUntil: '2024-01-10', status: 'ACCEPTED' },
    { id: 'QT-2023-142', rfqId: 'RFQ-2023-098', rfqTitle: 'Data Center Cooling System', submittedDate: '2023-11-20', amount: 'IDR 850,000,000', validUntil: '2023-12-20', status: 'REJECTED' },
    { id: 'QT-2024-005', rfqId: 'RFQ-2024-092', rfqTitle: 'Annual Software Licenses', submittedDate: '2024-01-18', amount: 'IDR 2,400,000,000', validUntil: '2024-02-18', status: 'PENDING' },
];

export default function VendorQuotationsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = QUOTATIONS.filter(item =>
        item.rfqTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: Column<Quotation>[] = [
        {
            header: 'Quotation Ref',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded text-blue-600">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.id}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Run for: {item.rfqId}</div>
                    </div>
                </div>
            )
        },
        { header: 'RFQ Title', accessorKey: 'rfqTitle', cell: (item) => <span className="font-medium text-slate-700">{item.rfqTitle}</span> },
        {
            header: 'Submitted Amount',
            accessorKey: 'amount',
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700">
                    <DollarSign className="w-3 h-3 text-slate-400" />
                    {item.amount}
                </div>
            )
        },
        {
            header: 'Submitted Date',
            accessorKey: 'submittedDate',
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.submittedDate}
                </div>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <Link href={`/vendor/rfq/${item.rfqId}`} className="text-xs font-medium text-[#0052CC] hover:underline flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> View
                </Link>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">My Quotations</h1>
                    <p className="text-sm text-slate-500 mt-1">Track status of your submitted bids and proposals.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSpotlight className="p-6 h-32" color="#3b82f6">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Submitted</p>
                    <p className="text-3xl font-black text-white">{QUOTATIONS.length}</p>
                    <p className="text-[10px] text-blue-400 mt-1 font-bold">Lifetime</p>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#f59e0b">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Pending Decision</p>
                    <p className="text-3xl font-black text-white">{QUOTATIONS.filter(q => q.status === 'PENDING').length}</p>
                    <p className="text-[10px] text-amber-400 mt-1 font-bold">Awaiting review</p>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#10b981">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Win Rate</p>
                    <p className="text-3xl font-black text-white">33%</p>
                    <p className="text-[10px] text-emerald-400 mt-1 font-bold">Based on last 10 bids</p>
                </CardSpotlight>
            </div>

            <div className="space-y-4">
                <DataTable
                    data={filteredData}
                    columns={columns}
                    searchPlaceholder="Search by ID or Title..."
                />
            </div>
        </div>
    );
}
