'use client';

import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const RFQS = [
    { id: 'RFQ-9901', title: 'Network Switch Upgrade 2026', deadline: '2026-02-01', items: 12, bids: 3, status: 'OPEN' },
    { id: 'RFQ-9902', title: 'Annual Security Audit Vendor', deadline: '2026-02-15', items: 1, bids: 0, status: 'OPEN' },
    { id: 'RFQ-9899', title: 'Q4 Laptop Refresh', deadline: '2025-12-01', items: 50, bids: 5, status: 'CLOSED' },
];

export default function RFQListPage() {
    const columns = [
        { header: 'RFQ Number', accessorKey: 'id', cell: (item: any) => <span className="font-mono font-medium text-[#0052CC]">{item.id}</span> },
        { header: 'Title', accessorKey: 'title', className: 'font-medium' },
        { header: 'Deadline', accessorKey: 'deadline' },
        { header: 'Line Items', accessorKey: 'items', align: 'center' },
        { header: 'Bids Recv', accessorKey: 'bids', align: 'center' },
        { header: 'Status', accessorKey: 'status', cell: (item: any) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Request for Quotation (RFQ)</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage sourcing events and vendor bids.</p>
                </div>
                <Link href="/procurement/rfq/new" className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Create RFQ
                </Link>
            </div>

            <DataTable
                data={RFQS}
                columns={columns}
            />
        </div>
    );
}
