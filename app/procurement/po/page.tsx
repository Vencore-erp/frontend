'use client';

import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const POS = [
    { id: 'PO-2026-8801', vendor: 'Oracle Corporation', date: '01 Jan 2026', total: 4500000000, status: 'OPEN', delivery: '15 Jan 2026' },
    { id: 'PO-2026-8802', vendor: 'PT. Graha Sarana', date: '02 Jan 2026', total: 125000000, status: 'COMPLETED', delivery: '03 Jan 2026' },
    { id: 'PO-2026-8803', vendor: 'AWS Singapore', date: '03 Jan 2026', total: 35000000, status: 'OPEN', delivery: 'Subscription' },
];

export default function POListPage() {
    const columns = [
        { header: 'PO Number', accessorKey: 'id' as const, cell: (item: any) => <Link href={`/procurement/po/${item.id}`} className="font-mono font-medium text-[#0052CC] hover:underline">{item.id}</Link> },
        { header: 'Vendor', accessorKey: 'vendor' as const, className: 'font-bold' },
        { header: 'Date', accessorKey: 'date' as const },
        { header: 'Exp. Delivery', accessorKey: 'delivery' as const },
        { header: 'Total (IDR)', accessorKey: 'total' as const, align: 'right' as const, cell: (item: any) => <span className="font-mono">{item.total.toLocaleString('id-ID')}</span> },
        { header: 'Status', accessorKey: 'status' as const, cell: (item: any) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Purchase Orders</h1>
                    <p className="text-sm text-slate-500 mt-1">Track issued orders and delivery status.</p>
                </div>
                <Link href="/procurement/po/new" className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Create PO
                </Link>
            </div>

            <DataTable
                data={POS}
                columns={columns}
            />
        </div>
    );
}
