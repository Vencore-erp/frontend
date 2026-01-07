'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const GRS = [
    { id: 'GR-2026-6601', po: 'PO-2026-8801', vendor: 'Oracle Corporation', date: '15 Jan 2026', items: 5, status: 'COMPLETED' },
    { id: 'GR-2026-6602', po: 'PO-2026-8802', vendor: 'PT. Graha Sarana', date: '03 Jan 2026', items: 50, status: 'PARTIAL' },
];

export default function GRListPage() {
    const columns = [
        { header: 'GR Number', accessorKey: 'id' as const, cell: (item: any) => <Link href={`/procurement/gr/${item.id}`} className="font-mono font-medium text-[#0052CC] hover:underline">{item.id}</Link> },
        { header: 'PO Ref', accessorKey: 'po' as const, cell: (item: any) => <span className="font-mono text-xs">{item.po}</span> },
        { header: 'Vendor', accessorKey: 'vendor' as const },
        { header: 'Received Date', accessorKey: 'date' as const },
        { header: 'Item Count', accessorKey: 'items' as const, align: 'center' as const },
        { header: 'Status', accessorKey: 'status' as const, cell: (item: any) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Goods Receipt</h1>
                    <p className="text-sm text-slate-500 mt-1">Track inbound shipments and fulfillment.</p>
                </div>
                <Link href="/procurement/gr/new" className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Receive Goods
                </Link>
            </div>

            <DataTable
                data={GRS}
                columns={columns}
            />
        </div>
    );
}
