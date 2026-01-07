'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, FileText, Check, X, Download, Printer, Building2 } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

const PAYMENT_DATA = {
    id: 'PMT-2026-0042',
    status: 'COMPLETED',
    createdAt: '2026-01-06 14:30',
    processedAt: '2026-01-06 14:35',
    method: 'Bank Transfer',
    bankAccount: 'BCA 1234567890',
    totalAmount: 4500000000,
    invoices: [
        { id: 'INV-2026-001', vendor: 'IBM INDONESIA', amount: 4500000000 }
    ],
    approvals: [
        { role: 'Finance Officer', user: 'Michael Chen', date: '2026-01-06 14:30', status: 'APPROVED' },
        { role: 'Finance Manager', user: 'Linda Wu', date: '2026-01-06 14:32', status: 'APPROVED' },
    ]
};

export default function PaymentDetailPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/finance/payments" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight font-mono">{PAYMENT_DATA.id}</h1>
                            <StatusBadge status={PAYMENT_DATA.status} />
                        </div>
                        <p className="text-sm text-slate-500 mt-1">Processed on {PAYMENT_DATA.processedAt}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center px-3 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </button>
                    <button className="flex items-center px-3 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Content */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    {/* Payment Details */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Payment Details</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Payment Method</p>
                                <p className="text-sm font-medium text-[#0B1120]">{PAYMENT_DATA.method}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Bank Account</p>
                                <p className="text-sm font-medium text-[#0B1120] font-mono">{PAYMENT_DATA.bankAccount}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Created</p>
                                <p className="text-sm font-medium text-[#0B1120]">{PAYMENT_DATA.createdAt}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Processed</p>
                                <p className="text-sm font-medium text-[#0B1120]">{PAYMENT_DATA.processedAt}</p>
                            </div>
                        </div>
                    </div>

                    {/* Included Invoices */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                            <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider">Included Invoices</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-[#F8FAFC] border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice #</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vendor</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount (IDR)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {PAYMENT_DATA.invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-3">
                                            <Link href={`/finance/invoices/${inv.id}`} className="font-mono text-sm font-medium text-[#0052CC] hover:underline">
                                                {inv.id}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3 text-sm text-[#0B1120]">{inv.vendor}</td>
                                        <td className="px-6 py-3 text-sm font-mono font-bold text-right">{inv.amount.toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-50 border-t border-slate-200">
                                <tr>
                                    <td colSpan={2} className="px-6 py-3 text-sm font-bold text-right">Total Payment:</td>
                                    <td className="px-6 py-3 text-lg font-mono font-bold text-[#0052CC] text-right">
                                        IDR {PAYMENT_DATA.totalAmount.toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* Vendor Info */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Beneficiary</h4>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[#0B1120]">IBM INDONESIA</p>
                                <p className="text-xs text-slate-500">BCA 1234567890</p>
                                <p className="text-xs text-slate-500">SWIFT: CENAIDJA</p>
                            </div>
                        </div>
                    </div>

                    {/* Approval Trail */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Approval Trail</h4>
                        <div className="space-y-4">
                            {PAYMENT_DATA.approvals.map((approval, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-emerald-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-[#0B1120]">{approval.role}</p>
                                        <p className="text-xs text-slate-500">{approval.user}</p>
                                        <p className="text-[10px] text-slate-400">{approval.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Proof */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Payment Proof</h4>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                            <FileText className="w-8 h-8 text-slate-400 mb-2" />
                            <p className="text-xs text-slate-600 font-medium">payment_proof_PMT-2026-0042.pdf</p>
                            <button className="text-xs text-[#0052CC] font-medium mt-2 hover:underline">Download</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
