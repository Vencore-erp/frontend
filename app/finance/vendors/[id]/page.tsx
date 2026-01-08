'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Building, CreditCard, FileText, History, Download, DollarSign, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

const VENDOR_DETAIL = {
    id: '1',
    code: 'VND-001',
    name: 'PT Teknologi Maju',
    taxId: '01.234.567.8-012.000',
    address: 'Jl. Sudirman Kav. 50, Jakarta Pusat',
    status: 'ACTIVE',
    financials: {
        bankName: 'Bank Central Asia (BCA)',
        accountNumber: '1234567890',
        accountHolder: 'PT TEKNOLOGI MAJU',
        currency: 'IDR',
        paymentTerms: 'Net 30'
    },
    paymentHistory: [
        { id: 'PAY-2026-001', date: '2026-01-05', invoiceRef: 'INV/TM/2026/001', amount: 125000000, status: 'PROCESSED' },
        { id: 'PAY-2025-156', date: '2025-12-15', invoiceRef: 'INV/TM/2025/112', amount: 45000000, status: 'PAID' },
        { id: 'PAY-2025-142', date: '2025-11-20', invoiceRef: 'INV/TM/2025/089', amount: 32000000, status: 'PAID' },
    ],
    taxDocuments: [
        { id: 1, name: 'NPWP Card', valid: true, lastVerified: '2025-01-01' },
        { id: 2, name: 'PKP Certificate', valid: true, lastVerified: '2025-01-01' },
        { id: 3, name: 'SKT (Surat Keterangan Terdaftar)', valid: true, lastVerified: '2025-01-01' },
    ]
};

export default function FinanceVendorDetailPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/finance/vendors" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{VENDOR_DETAIL.name}</h1>
                        <StatusBadge status={VENDOR_DETAIL.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{VENDOR_DETAIL.code} • {VENDOR_DETAIL.financials.currency}</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Download Statement
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Left: Financial Info */}
                <div className="col-span-2 space-y-6">
                    {/* Bank Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-[#0052CC]" />
                                Bank Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Bank Name</p>
                                    <p className="font-medium text-[#0B1120]">{VENDOR_DETAIL.financials.bankName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Account Number</p>
                                    <p className="font-mono text-lg font-bold text-[#0B1120] tracking-wide">{VENDOR_DETAIL.financials.accountNumber}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Account Holder</p>
                                <p className="font-medium text-[#0B1120]">{VENDOR_DETAIL.financials.accountHolder}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex gap-4">
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                                    {VENDOR_DETAIL.financials.currency}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold">
                                    Terms: {VENDOR_DETAIL.financials.paymentTerms}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment History */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <History className="w-5 h-5 text-slate-400" />
                                recent Payments
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Payment ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Input Ref</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {VENDOR_DETAIL.paymentHistory.map((pay) => (
                                        <tr key={pay.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-sm text-[#0052CC]">{pay.id}</div>
                                                    <div className="text-xs text-slate-500">{pay.date}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 font-mono">{pay.invoiceRef}</td>
                                            <td className="px-6 py-4 text-right font-mono text-sm font-medium">{formatCurrency(pay.amount)}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${pay.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {pay.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Tax & Compliance */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <FileText className="w-5 h-5 text-slate-400" />
                                Tax Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase">NPWP Number</p>
                                <p className="font-mono text-lg font-bold text-[#0B1120]">{VENDOR_DETAIL.taxId}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-slate-500 uppercase">Tax Documents</p>
                                {VENDOR_DETAIL.taxDocuments.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                                        <div className="flex items-center gap-2">
                                            {doc.valid ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                                            <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                            <Eye className="w-3 h-3 text-slate-400" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-bold text-blue-900">Withholding Tax (PPh 23)</p>
                                    <p className="text-sm text-blue-700 mt-1">This vendor is subject to 2% withholding tax on services.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
