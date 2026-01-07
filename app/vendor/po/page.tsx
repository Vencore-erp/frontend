'use client';

import React, { useState } from 'react';
import { ShoppingBag, Truck, FileText, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const VENDOR_POS = [
    { id: 'PO-2026-8801', date: '01 Jan 2026', items: 5, total: 45000000, deliveryDate: '21 Jan 2026', status: 'OPEN', acknowledged: false },
    { id: 'PO-2026-8805', date: '03 Jan 2026', items: 10, total: 125000000, deliveryDate: '25 Jan 2026', status: 'PROCESSING', acknowledged: true },
    { id: 'PO-2025-7799', date: '28 Dec 2025', items: 10, total: 12500000, deliveryDate: '15 Jan 2026', status: 'COMPLETED', acknowledged: true },
];

export default function VendorPOListPage() {
    const [activeTab, setActiveTab] = useState('ALL');
    const filteredPOs = activeTab === 'ALL' ? VENDOR_POS : VENDOR_POS.filter(po => po.status === activeTab);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">My Orders</h1>
                <p className="text-sm text-slate-500 mt-1">View and manage purchase orders assigned to you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">New Orders</p>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">1</p>
                </div>
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">In Progress</p>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">1</p>
                </div>
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">This Month</p>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">IDR 170M</p>
                </div>
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">On-Time Rate</p>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">100%</p>
                </div>
            </div>

            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {['ALL', 'OPEN', 'PROCESSING', 'COMPLETED'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-[#0052CC] text-[#0052CC]' : 'border-transparent text-slate-500'}`}>
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">PO Number</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Total</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredPOs.map((po) => (
                            <tr key={po.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4"><Link href={`/vendor/po/${po.id}`} className="font-mono text-sm font-medium text-[#0052CC] hover:underline">{po.id}</Link></td>
                                <td className="px-6 py-4 text-sm text-slate-600">{po.date}</td>
                                <td className="px-6 py-4 text-sm font-mono font-bold text-right">{po.total.toLocaleString('id-ID')}</td>
                                <td className="px-6 py-4"><StatusBadge status={po.status} /></td>
                                <td className="px-6 py-4">
                                    {!po.acknowledged && po.status === 'OPEN' ? (
                                        <button className="px-3 py-1.5 text-xs font-bold text-white bg-[#0052CC] rounded">Acknowledge</button>
                                    ) : (
                                        <Link href={`/vendor/po/${po.id}`} className="text-xs text-[#0052CC] hover:underline">View</Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
