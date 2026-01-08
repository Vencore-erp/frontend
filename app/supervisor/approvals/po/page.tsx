'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, CheckCircle, XCircle, Eye, Clock, ArrowLeft, Building } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface POApproval {
    id: string;
    poNumber: string;
    vendor: string;
    prRef: string;
    amount: number;
    deliveryDate: string;
    submittedAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const PO_APPROVALS: POApproval[] = [
    { id: '1', poNumber: 'PO-2026-0018', vendor: 'PT Teknologi Maju', prRef: 'PR-2026-0035', amount: 180000000, deliveryDate: '2026-02-15', submittedAt: '2026-01-08', status: 'PENDING' },
    { id: '2', poNumber: 'PO-2026-0017', vendor: 'CV Sumber Makmur', prRef: 'PR-2026-0034', amount: 45000000, deliveryDate: '2026-01-25', submittedAt: '2026-01-07', status: 'PENDING' },
    { id: '3', poNumber: 'PO-2026-0016', vendor: 'PT Solusi Digital', prRef: 'PR-2026-0033', amount: 320000000, deliveryDate: '2026-03-01', submittedAt: '2026-01-06', status: 'PENDING' },
];

export default function POApprovalPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const columns: Column<POApproval>[] = [
        {
            header: 'PO Number',
            accessorKey: 'poNumber',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                        <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.poNumber}</div>
                        <div className="text-xs text-slate-500">Ref: {item.prRef}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Vendor',
            accessorKey: 'vendor',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-100 rounded">
                        <Building className="w-3 h-3 text-slate-500" />
                    </div>
                    <span className="font-medium text-slate-700">{item.vendor}</span>
                </div>
            )
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
            cell: (item) => <span className="font-mono font-bold text-[#0B1120]">{formatCurrency(item.amount)}</span>
        },
        {
            header: 'Delivery',
            accessorKey: 'deliveryDate',
            cell: (item) => <span className="text-sm text-slate-600">{item.deliveryDate}</span>
        },
        {
            header: 'Submitted',
            accessorKey: 'submittedAt',
            cell: (item) => <span className="text-sm text-slate-500">{item.submittedAt}</span>
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <Link href={`/procurement/po/${item.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 text-slate-600 hover:text-slate-900">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                        <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                        <XCircle className="w-4 h-4" />
                    </Button>
                </div>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/supervisor/approvals" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">PO Approvals</h1>
                    <p className="text-sm text-slate-500 mt-1">Review and approve Purchase Orders before issuing to vendors.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border border-slate-200 flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded text-amber-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#0B1120]">{PO_APPROVALS.length}</p>
                        <p className="text-xs text-slate-500">Pending Approval</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200 col-span-2">
                    <p className="text-xs text-slate-500 mb-1">Total PO Value</p>
                    <p className="text-xl font-bold font-mono text-[#0B1120]">
                        {formatCurrency(PO_APPROVALS.reduce((acc, p) => acc + p.amount, 0))}
                    </p>
                </div>
            </div>

            <DataTable
                data={PO_APPROVALS}
                columns={columns}
                searchPlaceholder="Search POs..."
            />
        </div>
    );
}
