'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Truck, Package, Printer, Download, Mail } from 'lucide-react';
import { StatusBadge } from "@/components/ui/status-badge";

export default function PODetailPage({ params }: { params: { id: string } }) {
    const PO = {
        id: params.id || 'PO-2026-8801',
        vendor: 'Oracle Corporation',
        date: '01 Jan 2026',
        status: 'OPEN',
        total: 4500000000,
        deliveryDate: '15 Jan 2026',
        paymentTerms: 'Net 30',
        items: [
            { id: 1, desc: 'Oracle Exadata X9M-2 Database Server', qty: 2, price: 1800000000, total: 3600000000 },
            { id: 2, desc: 'Installation & Professional Services', qty: 1, price: 900000000, total: 900000000 },
        ]
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header with Actions */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/procurement/po" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{PO.id}</h1>
                            <StatusBadge status={PO.status} />
                        </div>
                        <p className="text-sm text-slate-500">Vendor: <span className="font-semibold text-[#0B1120]">{PO.vendor}</span></p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center px-3 py-2 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50">
                        <Mail className="w-4 h-4 mr-2" /> Resend to Vendor
                    </button>
                    <button className="p-2 text-slate-500 hover:text-[#0052CC] hover:bg-blue-50 rounded transition-colors" title="Print PO">
                        <Printer className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-[#0052CC] hover:bg-blue-50 rounded transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Content: PO Formal Document */}
                <div className="col-span-12 lg:col-span-8 bg-white rounded border border-slate-200 shadow-sm overflow-hidden">

                    {/* Document Header */}
                    <div className="p-8 border-b border-slate-100">
                        <div className="flex justify-between mb-8">
                            <div>
                                <h3 className="font-bold text-lg text-[#0B1120]">NEXUS BANK INDONESIA</h3>
                                <p className="text-xs text-slate-500 w-48 mt-1">Menara Nexus, Jl. Jend. Sudirman Kav. 1, Jakarta 10220</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl font-bold text-slate-200 uppercase tracking-widest">Purchase Order</h2>
                                <p className="text-sm font-mono font-bold text-[#0B1120] mt-1">{PO.id}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Vendor</h4>
                                <p className="font-bold text-[#0B1120]">{PO.vendor}</p>
                                <p className="text-slate-500">Oracle Building, Jakarta Service Center</p>
                                <p className="text-slate-500">billing@oracle.co.id</p>
                            </div>
                            <div className="text-right">
                                <div className="inline-block text-left space-y-2">
                                    <div className="flex justify-between w-48">
                                        <span className="text-slate-500">Order Date:</span>
                                        <span className="font-medium text-[#0B1120]">{PO.date}</span>
                                    </div>
                                    <div className="flex justify-between w-48">
                                        <span className="text-slate-500">Delivery Due:</span>
                                        <span className="font-medium text-[#0B1120]">{PO.deliveryDate}</span>
                                    </div>
                                    <div className="flex justify-between w-48">
                                        <span className="text-slate-500">Terms:</span>
                                        <span className="font-medium text-[#0B1120]">{PO.paymentTerms}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <table className="w-full text-left">
                        <thead className="bg-[#F8FAFC] text-slate-500 text-[10px] uppercase font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-8 py-3 w-[50%]">Description</th>
                                <th className="px-8 py-3 w-[15%] text-center">Qty</th>
                                <th className="px-8 py-3 w-[15%] text-right">Unit Price</th>
                                <th className="px-8 py-3 w-[20%] text-right">Line Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {PO.items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-8 py-4 text-sm font-medium text-[#0B1120]">{item.desc}</td>
                                    <td className="px-8 py-4 text-sm text-center">{item.qty}</td>
                                    <td className="px-8 py-4 text-sm text-right font-mono text-slate-600">{item.price.toLocaleString('id-ID')}</td>
                                    <td className="px-8 py-4 text-sm text-right font-mono font-medium text-[#0B1120]">{item.total.toLocaleString('id-ID')}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-[#F8FAFC] border-t border-slate-200">
                            <tr>
                                <td colSpan={3} className="px-8 py-4 text-right font-bold text-sm text-[#0B1120]">Total (IDR):</td>
                                <td className="px-8 py-4 text-right font-bold font-mono text-lg text-[#0052CC]">{PO.total.toLocaleString('id-ID')}</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>

                {/* Sidebar Actions */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Fulfillment Status</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded border border-amber-100 text-amber-800">
                                <Truck className="w-5 h-5 shrink-0" />
                                <div className="text-xs">
                                    <p className="font-bold">Awaiting Delivery</p>
                                    <p>Expected by {PO.deliveryDate}</p>
                                </div>
                            </div>

                            <Link href={`/procurement/gr/new?po=${PO.id}`} className="w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2">
                                <Package className="w-4 h-4" /> Receive Goods (GR)
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Related Documents</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded">
                                <div className="flex items-center gap-2 text-[#0052CC]">
                                    <FileText className="w-4 h-4" />
                                    <span className="font-medium underline decoration-dotted">PR-2026-9901</span>
                                </div>
                                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">APPROVED</span>
                            </li>
                            <li className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded">
                                <div className="flex items-center gap-2 text-[#0052CC]">
                                    <FileText className="w-4 h-4" />
                                    <span className="font-medium underline decoration-dotted">RFQ-9901</span>
                                </div>
                                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">AWARDED</span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
}
