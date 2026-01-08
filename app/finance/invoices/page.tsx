'use client';

import React, { useState, useEffect } from 'react';
import { Filter, Download } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const INITIAL_DATA = [
    { id: 'INV-2026-001', vendor: 'IBM INDONESIA', amount: 4500000000, date: '08 Jan 2026', due: '08 Feb 2026', status: 'PENDING', match: 'PASS' },
    { id: 'INV-2026-003', vendor: 'PT. GRAHA SARANA', amount: 125000000, date: '09 Jan 2026', due: '09 Feb 2026', status: 'PENDING', match: 'FAIL' },
    { id: 'INV-2026-008', vendor: 'AWS SINGAPORE', amount: 35000000, date: '10 Jan 2026', due: '10 Jan 2026', status: 'APPROVED', match: 'PASS' },
    { id: 'INV-2026-012', vendor: 'MCKINSEY & CO', amount: 850000000, date: '12 Jan 2026', due: '12 Feb 2026', status: 'PAID', match: 'PASS' },
];

export default function InvoiceListPage() {
    const [invoices, setInvoices] = useState(INITIAL_DATA);

    useEffect(() => {
        const stored = localStorage.getItem('mock_invoices');
        if (stored) {
            setInvoices([...JSON.parse(stored), ...INITIAL_DATA]);
        }
    }, []);
    const columns = [
        { header: 'No. Faktur', accessorKey: 'id' as const, cell: (item: any) => <Link href={`/finance/invoices/${item.id}`} className="font-mono font-medium text-[#0052CC] hover:underline">{item.id}</Link> },
        { header: 'Vendor', accessorKey: 'vendor' as const },
        { header: 'Tgl Faktur', accessorKey: 'date' as const },
        { header: 'Jatuh Tempo', accessorKey: 'due' as const, cell: (item: any) => <span className="font-medium text-slate-700">{item.due}</span> },
        { header: 'Jumlah (IDR)', accessorKey: 'amount' as const, align: 'right' as const, cell: (item: any) => <span className="font-mono">{item.amount.toLocaleString('id-ID')}</span> },
        {
            header: 'Validasi 3-Way', accessorKey: 'match' as const, align: 'center' as const, cell: (item: any) => (
                item.match === 'PASS'
                    ? <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">COCOK (MATCH)</span>
                    : <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">TIDAK COCOK</span>
            )
        },
        { header: 'Status', accessorKey: 'status' as const, cell: (item: any) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Pemrosesan Faktur</h1>
                    <p className="text-sm text-slate-500 mt-1">Verifikasi dan proses pembayaran faktur vendor.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                        <Download className="w-4 h-4 mr-2" />
                        Ekspor Laporan
                    </button>
                </div>
            </div>

            <DataTable
                data={invoices}
                columns={columns}
            />
        </div>
    );
}
