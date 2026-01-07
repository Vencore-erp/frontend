'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, Clock, FileText, Download, Printer } from 'lucide-react';
import { StatusBadge } from "@/components/ui/status-badge";

export default function PRDetailPage({ params }: { params: { id: string } }) {
    // Mock Data
    const PR = {
        id: params.id || 'PR-2026-9901',
        status: 'PENDING_APPROVAL',
        desc: 'Core Banking Server Upgrade (Oracle Exadata)',
        requester: 'David Chen',
        dept: 'IT Infrastructure',
        date: '06 Jan 2026',
        total: 4500000000,
        items: [
            { id: 1, desc: 'Oracle Exadata X9M-2 Database Server', qty: 2, price: 1800000000, total: 3600000000 },
            { id: 2, desc: 'Installation & Professional Services', qty: 1, price: 900000000, total: 900000000 },
        ],
        timeline: [
            { status: 'DRAFT', date: '06 Jan 2026 09:00', user: 'David Chen', note: 'Created requisition' },
            { status: 'SUBMITTED', date: '06 Jan 2026 09:15', user: 'David Chen', note: 'Submitted for approval' },
            { status: 'PENDING', date: '06 Jan 2026 09:15', user: 'System', note: 'Forwarded to Supervisor' },
        ]
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/procurement/pr" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{PR.id}</h1>
                            <StatusBadge status={PR.status} />
                        </div>
                        <p className="text-sm text-slate-500">{PR.desc}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-slate-500 hover:text-[#0052CC] hover:bg-blue-50 rounded transition-colors" title="Print">
                        <Printer className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-[#0052CC] hover:bg-blue-50 rounded transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Content */}
                <div className="col-span-12 lg:col-span-8 space-y-8">

                    {/* Line Items */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider">Line Items</h3>
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
                                {PR.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-[#0B1120]">{item.desc}</td>
                                        <td className="px-6 py-4 text-sm text-center">{item.qty}</td>
                                        <td className="px-6 py-4 text-sm text-right font-mono text-slate-600">{item.price.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 text-sm text-right font-mono font-medium text-[#0B1120]">{item.total.toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="border-t border-slate-200 bg-slate-50/50">
                                <tr>
                                    <td colSpan={3} className="px-6 py-4 text-right font-bold text-sm text-[#0B1120]">Total Amount (IDR):</td>
                                    <td className="px-6 py-4 text-right font-bold font-mono text-lg text-[#0052CC]">{PR.total.toLocaleString('id-ID')}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Approval Timeline */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider mb-6">Processing Timeline</h3>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            {PR.timeline.map((event, idx) => (
                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                    <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-slate-500">
                                        {event.status === 'SUBMITTED' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3" />}
                                    </div>

                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-xs text-[#0B1120]">{event.status}</span>
                                            <time className="font-mono text-[10px] text-slate-400">{event.date}</time>
                                        </div>
                                        <p className="text-xs text-slate-500">{event.note} by <span className="font-medium text-slate-700">{event.user}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Sidebar Info */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Request Details</h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-500">Requester</span>
                                <span className="font-medium text-[#0B1120]">{PR.requester}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-500">Department</span>
                                <span className="font-medium text-[#0B1120]">{PR.dept}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-50 pb-2">
                                <span className="text-slate-500">Date</span>
                                <span className="font-medium text-[#0B1120]">{PR.date}</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-slate-500">Budget Code</span>
                                <span className="font-mono font-medium text-[#0B1120]">CC-102-IT-CAPEX</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center space-y-3">
                        <p className="text-xs text-slate-500">Actions available for this status</p>
                        <button className="w-full py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded shadow-sm hover:bg-slate-50">
                            Cancel Requisition
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
