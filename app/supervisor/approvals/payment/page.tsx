'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle, XCircle, Eye, Clock, ArrowLeft, Building, AlertTriangle } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface PaymentApproval {
    id: string;
    paymentNumber: string;
    vendor: string;
    invoiceRef: string;
    amount: number;
    dueDate: string;
    submittedAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    isUrgent: boolean;
}

const PAYMENT_APPROVALS: PaymentApproval[] = [
    { id: '1', paymentNumber: 'PAY-2026-0089', vendor: 'PT Teknologi Maju', invoiceRef: 'INV-2026-0156', amount: 125000000, dueDate: '2026-01-12', submittedAt: '2026-01-08', status: 'PENDING', isUrgent: true },
    { id: '2', paymentNumber: 'PAY-2026-0088', vendor: 'CV Sumber Makmur', invoiceRef: 'INV-2026-0148', amount: 35000000, dueDate: '2026-01-20', submittedAt: '2026-01-07', status: 'PENDING', isUrgent: false },
];

export default function PaymentApprovalPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const columns: Column<PaymentApproval>[] = [
        {
            header: 'Payment #',
            accessorKey: 'paymentNumber',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${item.isUrgent ? 'bg-rose-50 text-rose-600' : 'bg-purple-50 text-purple-600'}`}>
                        {item.isUrgent ? <AlertTriangle className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120] flex items-center gap-2">
                            {item.paymentNumber}
                            {item.isUrgent && <span className="text-[9px] px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded font-bold">URGENT</span>}
                        </div>
                        <div className="text-xs text-slate-500">Ref: {item.invoiceRef}</div>
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
            header: 'Due Date',
            accessorKey: 'dueDate',
            cell: (item) => {
                const isOverdue = new Date(item.dueDate) < new Date();
                return (
                    <span className={`text-sm ${isOverdue ? 'text-rose-600 font-medium' : 'text-slate-600'}`}>
                        {item.dueDate}
                    </span>
                );
            }
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <Link href={`/finance/payments/${item.id}`}>
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
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Payment Approvals</h1>
                    <p className="text-sm text-slate-500 mt-1">Approve payments above threshold before execution.</p>
                </div>
            </div>

            {/* Warning Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                    <p className="font-medium text-amber-800">Payment Approval Required</p>
                    <p className="text-sm text-amber-700">Payments above IDR 100,000,000 require supervisor approval before processing.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border border-slate-200 flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded text-amber-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#0B1120]">{PAYMENT_APPROVALS.length}</p>
                        <p className="text-xs text-slate-500">Pending</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200 flex items-center gap-3">
                    <div className="p-2 bg-rose-50 rounded text-rose-600">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#0B1120]">{PAYMENT_APPROVALS.filter(p => p.isUrgent).length}</p>
                        <p className="text-xs text-slate-500">Urgent</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">Total Value</p>
                    <p className="text-xl font-bold font-mono text-[#0B1120]">
                        {formatCurrency(PAYMENT_APPROVALS.reduce((acc, p) => acc + p.amount, 0))}
                    </p>
                </div>
            </div>

            <DataTable
                data={PAYMENT_APPROVALS}
                columns={columns}
                searchPlaceholder="Search payments..."
            />
        </div>
    );
}
