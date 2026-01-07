'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Package, CheckCircle2, FileText, Calendar } from 'lucide-react';
import { StatusBadge } from "@/components/ui/status-badge";

export default function GRDetailPage({ params }: { params: { id: string } }) {
    const GR = {
        id: params.id || 'GR-2026-6601',
        po: 'PO-2026-8801',
        vendor: 'Oracle Corporation',
        date: '15 Jan 2026',
        receivedBy: 'Gudang Pusat (Warehouse)',
        deliveryNote: 'SJ-2026-001-ORCL',
        status: 'COMPLETED',
        items: [
            { id: 1, desc: 'Oracle Exadata X9M-2 Database Server', ordered: 2, received: 2, condition: 'Good' },
            { id: 2, desc: 'Installation & Professional Services', ordered: 1, received: 1, condition: 'Good' },
        ]
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href="/procurement/gr" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{GR.id}</h1>
                        <StatusBadge status={GR.status} />
                    </div>
                    <p className="text-sm text-slate-500">Receipt for <Link href={`/procurement/po/${GR.po}`} className="font-mono font-bold text-[#0052CC] hover:underline">{GR.po}</Link></p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Content */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    {/* Info Card */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm grid grid-cols-2 gap-6">
                        <div>
                            <span className="block text-xs text-slate-500 mb-1">Received By</span>
                            <span className="font-medium text-[#0B1120] flex items-center gap-2">
                                {GR.receivedBy}
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs text-slate-500 mb-1">Received Date</span>
                            <span className="font-medium text-[#0B1120] flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" /> {GR.date}
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs text-slate-500 mb-1">Vendor Delivery Note</span>
                            <span className="font-mono font-medium text-[#0B1120] flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-400" /> {GR.deliveryNote}
                            </span>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider">Received Items</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-3 w-[50%]">Item</th>
                                    <th className="px-6 py-3 text-center">Ordered</th>
                                    <th className="px-6 py-3 text-center">Received</th>
                                    <th className="px-6 py-3 text-right">Condition</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {GR.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-[#0B1120]">{item.desc}</td>
                                        <td className="px-6 py-4 text-sm text-center text-slate-500">{item.ordered}</td>
                                        <td className="px-6 py-4 text-sm text-center font-bold text-[#0B1120]">{item.received}</td>
                                        <td className="px-6 py-4 text-sm text-right">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                                                {item.condition}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Process Status</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-[#0B1120]">Inventory Updated</p>
                                    <p className="text-xs text-slate-500">Asset registry updated automatically on 15 Jan 2026.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-[#0B1120]">Accrual Posted</p>
                                    <p className="text-xs text-slate-500">Finance notified for month-end close.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <button className="w-full py-2 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50">
                        Print Receipt Note
                    </button>

                </div>

            </div>
        </div>
    );
}
