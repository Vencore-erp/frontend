'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Check, X, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const INV = {
        id: id || 'INV-2026-001',
        vendor: 'IBM INDONESIA',
        po: 'PO-2026-8801',
        gr: 'GR-2026-6601',
        date: '08 Jan 2026',
        due: '08 Feb 2026',
        amount: 4500000000,
        tax: 495000000,
        total: 4995000000,
        status: 'PENDING',
        items: [
            { id: 1, desc: 'Oracle Exadata X9M-2 Database Server', qty: 2, price: 1800000000, total: 3600000000, match: true },
            { id: 2, desc: 'Installation & Professional Services', qty: 1, price: 900000000, total: 900000000, match: true },
        ]
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href="/finance/invoices" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{INV.id}</h1>
                        <StatusBadge status={INV.status} />
                    </div>
                    <p className="text-sm text-slate-500">Vendor: <span className="font-semibold text-[#0B1120]">{INV.vendor}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Content */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    {/* 3-Way Match Visualization */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider mb-6">3-Way Match Validation</h3>

                        <div className="flex items-center justify-between relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

                            {/* PO Node */}
                            <div className="flex flex-col items-center bg-white px-2">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 mb-2 shadow-sm">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-[#0B1120]">Purchase Order</p>
                                <Link href={`/procurement/po/${INV.po}`} className="text-[10px] font-mono text-[#0052CC] hover:underline">{INV.po}</Link>
                                <span className="text-[10px] text-emerald-600 font-bold mt-1">Confirmed</span>
                            </div>

                            {/* GR Node */}
                            <div className="flex flex-col items-center bg-white px-2">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 mb-2 shadow-sm">
                                    <Check className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-[#0B1120]">Goods Receipt</p>
                                <Link href={`/procurement/gr/${INV.gr}`} className="text-[10px] font-mono text-[#0052CC] hover:underline">{INV.gr}</Link>
                                <span className="text-[10px] text-emerald-600 font-bold mt-1">Received</span>
                            </div>

                            {/* Invoice Node */}
                            <div className="flex flex-col items-center bg-white px-2">
                                <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-500 flex items-center justify-center text-blue-600 mb-2 shadow-sm ring-4 ring-blue-50">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-bold text-[#0B1120]">Invoice</p>
                                <span className="text-[10px] font-mono text-slate-500">{INV.id}</span>
                                <span className="text-[10px] text-blue-600 font-bold mt-1">Current</span>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded flex items-start gap-3">
                            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                            <div className="text-xs text-emerald-800">
                                <p className="font-bold">Match Successful</p>
                                <p>Invoice line items match perfectly with PO quantity and price, and goods have been marked as received.</p>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Items */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider">Invoice Lines</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3 text-center">Qty</th>
                                    <th className="px-6 py-3 text-right">Unit Price</th>
                                    <th className="px-6 py-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {INV.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-[#0B1120]">{item.desc}</td>
                                        <td className="px-6 py-4 text-sm text-center">{item.qty}</td>
                                        <td className="px-6 py-4 text-sm text-right font-mono text-slate-600">{item.price.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-sm text-right font-mono font-medium text-[#0B1120]">{item.total.toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-50/50 border-t border-slate-200">
                                <tr>
                                    <td colSpan={3} className="px-6 py-2 text-right text-xs text-slate-500">Subtotal:</td>
                                    <td className="px-6 py-2 text-right font-mono text-sm text-slate-700">{INV.amount.toLocaleString('id-ID')}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="px-6 py-2 text-right text-xs text-slate-500">VAT (11%):</td>
                                    <td className="px-6 py-2 text-right font-mono text-sm text-slate-700">{INV.tax.toLocaleString('id-ID')}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="px-6 py-3 text-right font-bold text-sm text-[#0B1120]">Total Payable:</td>
                                    <td className="px-6 py-3 text-right font-bold font-mono text-lg text-[#0052CC]">{INV.total.toLocaleString('id-ID')}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>

                {/* Sidebar Actions */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Payment Schedule</h4>
                        <div className="space-y-4">
                            <div>
                                <span className="block text-xs text-slate-500 mb-1">Invoice Date</span>
                                <span className="font-medium text-[#0B1120]">{INV.date}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-500 mb-1">Due Date</span>
                                <span className="font-medium text-[#0B1120]">{INV.due}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-slate-500 mb-1">Payment Method</span>
                                <span className="font-medium text-[#0B1120]">Bank Transfer (BCA)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="w-full py-3 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2">
                            <Check className="w-4 h-4" /> Approve for Payment
                        </button>
                        <button className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Raise Dispute
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
