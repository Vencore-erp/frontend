'use client';

import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const VENDOR_INVOICES = [
    { id: 'INV-2026-001', po: 'PO-2026-8801', date: '08 Jan 2026', amount: 4500000000, status: 'APPROVED', paymentDate: '10 Feb 2026' },
    { id: 'INV-2026-015', po: 'PO-2026-8805', date: '15 Jan 2026', amount: 150000000, status: 'PENDING', paymentDate: '-' },
];

export default function VendorInvoicesPage() {
    const columns = [
        { header: 'Invoice #', accessorKey: 'id' as const, cell: (item: any) => <span className="font-mono font-medium text-[#0052CC]">{item.id}</span> },
        { header: 'PO Reference', accessorKey: 'po' as const, cell: (item: any) => <span className="font-mono text-xs">{item.po}</span> },
        { header: 'Submitted Date', accessorKey: 'date' as const },
        { header: 'Amount (IDR)', accessorKey: 'amount' as const, align: 'right' as const, cell: (item: any) => <span className="font-mono">{item.amount.toLocaleString('id-ID')}</span> },
        { header: 'Est. Payment', accessorKey: 'paymentDate' as const, cell: (item: any) => <span className="text-xs font-medium text-slate-600">{item.paymentDate}</span> },
        { header: 'Status', accessorKey: 'status' as const, cell: (item: any) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">My Invoices</h1>
                    <p className="text-sm text-slate-500 mt-1">Track submitted invoices and payment schedules.</p>
                </div>
                <Link href="/vendor/invoices/new" className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit New Invoice
                </Link>
            </div>

            <DataTable
                data={VENDOR_INVOICES}
                columns={columns}
            />
        </div>
    );
}
