'use client';

import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle, Clock, DollarSign, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { CardSpotlight } from '@/components/ui/card-spotlight';

interface PaymentRecord {
    id: string;
    paymentNumber: string;
    invoiceRef: string;
    poRef: string;
    amount: number;
    paymentDate: string;
    method: string;
    status: 'PAID' | 'PENDING' | 'PROCESSING';
}

const PAYMENTS: PaymentRecord[] = [
    { id: '1', paymentNumber: 'PAY-2026-0045', invoiceRef: 'INV-2026-0089', poRef: 'PO-2026-0015', amount: 125000000, paymentDate: '2026-01-05', method: 'Bank Transfer', status: 'PAID' },
    { id: '2', paymentNumber: 'PAY-2026-0038', invoiceRef: 'INV-2026-0076', poRef: 'PO-2026-0012', amount: 45000000, paymentDate: '2025-12-28', method: 'Bank Transfer', status: 'PAID' },
    { id: '3', paymentNumber: 'PAY-2026-0052', invoiceRef: 'INV-2026-0102', poRef: 'PO-2026-0018', amount: 180000000, paymentDate: '2026-01-12', method: 'Bank Transfer', status: 'PROCESSING' },
    { id: '4', paymentNumber: 'PAY-2025-0289', invoiceRef: 'INV-2025-0456', poRef: 'PO-2025-0089', amount: 65000000, paymentDate: '2025-12-15', method: 'Bank Transfer', status: 'PAID' },
];

export default function VendorPaymentHistoryPage() {
    const [filter, setFilter] = useState('ALL');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const totalReceived = PAYMENTS.filter(p => p.status === 'PAID').reduce((acc, p) => acc + p.amount, 0);
    const totalPending = PAYMENTS.filter(p => p.status !== 'PAID').reduce((acc, p) => acc + p.amount, 0);

    const filteredPayments = filter === 'ALL' ? PAYMENTS : PAYMENTS.filter(p => p.status === filter);

    const columns: Column<PaymentRecord>[] = [
        {
            header: 'Payment #',
            accessorKey: 'paymentNumber',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${item.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {item.status === 'PAID' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.paymentNumber}</div>
                        <div className="text-xs text-slate-500">Ref: {item.invoiceRef}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'PO Reference',
            accessorKey: 'poRef',
            cell: (item) => <span className="font-mono text-sm text-slate-600">{item.poRef}</span>
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
            cell: (item) => <span className="font-mono font-bold text-[#0B1120]">{formatCurrency(item.amount)}</span>
        },
        {
            header: 'Payment Date',
            accessorKey: 'paymentDate',
            cell: (item) => (
                <span className="flex items-center gap-1 text-slate-600">
                    <Calendar className="w-3 h-3" /> {item.paymentDate}
                </span>
            )
        },
        {
            header: 'Method',
            accessorKey: 'method',
            cell: (item) => <span className="text-sm text-slate-600">{item.method}</span>
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-[#0052CC] hover:text-blue-700"
                    disabled={item.status !== 'PAID'}
                >
                    <Download className="w-4 h-4 mr-1" /> Receipt
                </Button>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Payment History</h1>
                    <p className="text-sm text-slate-500 mt-1">Track all payments received from buyers.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export Statement
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSpotlight className="p-6 h-32" color="#10b981">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Received</p>
                            <p className="text-2xl font-black text-white font-mono">{formatCurrency(totalReceived)}</p>
                            <p className="text-sm text-neutral-500 mt-1">YTD 2026</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-emerald-500 opacity-50" />
                    </div>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#f59e0b">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Pending</p>
                            <p className="text-2xl font-black text-white font-mono">{formatCurrency(totalPending)}</p>
                            <p className="text-sm text-neutral-500 mt-1">In processing</p>
                        </div>
                        <Clock className="w-8 h-8 text-amber-500 opacity-50" />
                    </div>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#0052CC">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Payments</p>
                            <p className="text-2xl font-black text-white">{PAYMENTS.length}</p>
                            <p className="text-sm text-neutral-500 mt-1">{PAYMENTS.filter(p => p.status === 'PAID').length} completed</p>
                        </div>
                        <FileText className="w-8 h-8 text-blue-500 opacity-50" />
                    </div>
                </CardSpotlight>
            </div>

            {/* Filter Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {['ALL', 'PAID', 'PROCESSING'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
                                ${filter === tab
                                    ? 'border-[#0052CC] text-[#0052CC]'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }
                            `}
                        >
                            {tab}
                            {tab !== 'ALL' && (
                                <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                    {PAYMENTS.filter(p => p.status === tab).length}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            <DataTable
                data={filteredPayments}
                columns={columns}
                searchPlaceholder="Search payments..."
            />
        </div>
    );
}
