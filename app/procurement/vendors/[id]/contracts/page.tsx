'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, FileText, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { StatusBadge } from '@/components/ui/status-badge';
import { DataTable, Column } from '@/components/ui/data-table';

const VENDOR_DATA = {
    id: 'VEND-001',
    name: 'PT Alpha Tech',
    contracts: [
        { id: 'CTR-2023-001', title: 'Master Service Agreement - IT Support', startDate: '2023-01-01', endDate: '2024-12-31', value: 'IDR 1,200,000,000', status: 'ACTIVE' },
        { id: 'CTR-2022-156', title: 'Hardware Procurement Framework', startDate: '2022-06-01', endDate: '2023-05-31', value: 'IDR 5,000,000,000', status: 'EXPIRED' },
    ]
};

export default function VendorContractsPage() {

    const columns: Column<any>[] = [
        {
            header: 'Contract Ref',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded text-purple-600">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.id}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Standard Agreement</div>
                    </div>
                </div>
            )
        },
        { header: 'Title', accessorKey: 'title', cell: (item) => <span className="font-medium text-slate-700">{item.title}</span> },
        {
            header: 'Value',
            accessorKey: 'value',
            cell: (item) => <span className="font-mono font-medium text-slate-900">{item.value}</span>
        },
        {
            header: 'Duration',
            accessorKey: 'startDate',
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.startDate} - {item.endDate}
                </div>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href={`/procurement/vendors/${VENDOR_DATA.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Contract Management</h1>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">Manage legal agreements for {VENDOR_DATA.name}.</p>
                    </div>
                </div>
                <Button className="bg-[#0052CC] hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> New Contract
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSpotlight className="p-6 h-32" color="#8b5cf6">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Active Contracts</p>
                    <p className="text-3xl font-black text-white">1</p>
                    <p className="text-[10px] text-purple-400 mt-1 font-bold">Valid & Enforceable</p>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#ec4899">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Value</p>
                    <p className="text-3xl font-black text-white">IDR 1.2B</p>
                    <p className="text-[10px] text-pink-400 mt-1 font-bold">Active Commitments</p>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#f43f5e">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Expiring Soon</p>
                    <p className="text-3xl font-black text-white">1</p>
                    <p className="text-[10px] text-rose-400 mt-1 font-bold">Due in &lt; 90 days</p>
                </CardSpotlight>
            </div>

            {/* Expiring Alert */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                    <h4 className="font-bold text-amber-800 text-sm">Contract Renewal Required</h4>
                    <p className="text-amber-700 text-xs mt-1">
                        MSA for IT Support is expiring in December. Review performance and initiate renewal or RFP process at least 60 days prior.
                    </p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto bg-white border-amber-300 text-amber-800 hover:bg-amber-100">
                    Initiate Renewal
                </Button>
            </div>

            <div className="space-y-4">
                <DataTable
                    data={VENDOR_DATA.contracts}
                    columns={columns}
                    searchPlaceholder="Search contracts..."
                />
            </div>
        </div>
    );
}
