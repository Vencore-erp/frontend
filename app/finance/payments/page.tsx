'use client';

import React, { useState } from 'react';
import { CreditCard, DollarSign, Clock, AlertCircle, Calendar, Download, Send } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const PAYMENT_QUEUE = [
    { id: 'INV-2026-001', vendor: 'IBM INDONESIA', amount: 4500000000, due: '2026-01-10', daysOverdue: 0, priority: 'NORMAL', status: 'APPROVED' },
    { id: 'INV-2026-008', vendor: 'AWS SINGAPORE', amount: 35000000, due: '2026-01-06', daysOverdue: 0, priority: 'HIGH', status: 'APPROVED' },
    { id: 'INV-2025-998', vendor: 'PT. GRAHA SARANA', amount: 125000000, due: '2026-01-04', daysOverdue: 2, priority: 'CRITICAL', status: 'APPROVED' },
    { id: 'INV-2026-012', vendor: 'MCKINSEY & CO', amount: 850000000, due: '2026-01-15', daysOverdue: 0, priority: 'NORMAL', status: 'PENDING' },
];

export default function PaymentQueuePage() {
    const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelectedInvoices(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const totalSelected = PAYMENT_QUEUE
        .filter(p => selectedInvoices.includes(p.id))
        .reduce((acc, p) => acc + p.amount, 0);

    const columns = [
        {
            header: '',
            accessorKey: 'id',
            cell: (item: any) => (
                <input
                    type="checkbox"
                    checked={selectedInvoices.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]"
                    disabled={item.status !== 'APPROVED'}
                />
            )
        },
        {
            header: 'Invoice #',
            accessorKey: 'id',
            cell: (item: any) => (
                <Link href={`/finance/payments/${item.id}`} className="font-mono font-medium text-[#0052CC] hover:underline">
                    {item.id}
                </Link>
            )
        },
        { header: 'Vendor', accessorKey: 'vendor' },
        { header: 'Amount (IDR)', accessorKey: 'amount', align: 'right', cell: (item: any) => <span className="font-mono font-bold">{item.amount.toLocaleString('id-ID')}</span> },
        { header: 'Due Date', accessorKey: 'due' },
        {
            header: 'Days Overdue',
            accessorKey: 'daysOverdue',
            cell: (item: any) => (
                item.daysOverdue > 0
                    ? <span className="text-rose-600 font-bold">{item.daysOverdue} days</span>
                    : <span className="text-slate-400">-</span>
            )
        },
        {
            header: 'Priority',
            accessorKey: 'priority',
            cell: (item: any) => {
                const styles = {
                    'CRITICAL': 'bg-rose-50 text-rose-700 border-rose-200',
                    'HIGH': 'bg-amber-50 text-amber-700 border-amber-200',
                    'NORMAL': 'bg-slate-50 text-slate-600 border-slate-200',
                };
                return (
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${styles[item.priority as keyof typeof styles]}`}>
                        {item.priority}
                    </span>
                );
            }
        },
        { header: 'Status', accessorKey: 'status', cell: (item: any) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Payment Queue</h1>
                    <p className="text-sm text-slate-500 mt-1">Process verified invoices for payment disbursement.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                    </button>
                    <Link href="/finance/payments/new" className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                        <Send className="w-4 h-4 mr-2" />
                        Process Payment
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-indigo-50 rounded text-indigo-600">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">IDR 5.5B</p>
                    <p className="text-xs text-slate-500 mt-1">4 invoices ready</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-rose-50 rounded text-rose-600">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overdue</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">1</p>
                    <p className="text-xs text-rose-600 mt-1 font-medium">IDR 125M outstanding</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-50 rounded text-amber-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Due Today</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">1</p>
                    <p className="text-xs text-slate-500 mt-1">IDR 35M</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paid (MTD)</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">IDR 45.2B</p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">52 payments</p>
                </div>
            </div>

            {/* Selection Summary */}
            {selectedInvoices.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded border border-blue-200">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-blue-800">
                            {selectedInvoices.length} invoice(s) selected
                        </span>
                        <span className="text-sm text-blue-600">
                            Total: <span className="font-mono font-bold">IDR {totalSelected.toLocaleString('id-ID')}</span>
                        </span>
                    </div>
                    <button className="px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                        Process Selected
                    </button>
                </div>
            )}

            <DataTable
                data={PAYMENT_QUEUE}
                columns={columns}
                title="Payment Queue"
            />

        </div>
    );
}
