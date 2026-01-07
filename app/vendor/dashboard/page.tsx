'use client';

import React from 'react';
import {
    Building2,
    Search,
    ShoppingBag,
    FileText,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';
import { StatusBadge } from "@/components/ui/status-badge";

const OPEN_RFQS = [
    { id: 'RFQ-9901', title: 'Network Switch Upgrade 2026', items: 12, deadline: '2 Days' },
    { id: 'RFQ-9904', title: 'Data Center Cabling Service', items: 1, deadline: '5 Days' },
];

const ACTIVE_POS = [
    { id: 'PO-2026-8801', date: '01 Jan 2026', items: 5, total: 45000000, status: 'OPEN' },
    { id: 'PO-2025-7799', date: '28 Dec 2025', items: 10, total: 12500000, status: 'COMPLETED' },
];

export default function VendorDashboard() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">

            {/* Welcome / Profile Status */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#0B1120]">PT. Tech Solutions Indonesia</h1>
                        <p className="text-sm text-slate-500">Vendor ID: <span className="font-mono">VN-88201</span> • Status: <span className="text-emerald-600 font-medium">Verified Partner</span></p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-xs text-slate-400 uppercase font-bold">Performance</p>
                        <p className="text-lg font-bold text-[#0B1120]">98/100</p>
                    </div>
                    <div className="w-px bg-slate-200 h-10" />
                    <div className="text-right">
                        <p className="text-xs text-slate-400 uppercase font-bold">On-Time Delivery</p>
                        <p className="text-lg font-bold text-emerald-600">100%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: RFQ Invitations */}
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm col-span-1">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded text-blue-600"><Search className="w-5 h-5" /></div>
                            <h3 className="font-bold text-[#0B1120]">RFQ Invitations</h3>
                        </div>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">2 New</span>
                    </div>

                    <div className="space-y-4">
                        {OPEN_RFQS.map((rfq) => (
                            <div key={rfq.id} className="border border-slate-200 rounded p-3 hover:border-blue-300 transition-colors cursor-pointer group">
                                <div className="flex justify-between mb-1">
                                    <span className="text-[10px] font-mono font-bold text-slate-500">{rfq.id}</span>
                                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">Exp: {rfq.deadline}</span>
                                </div>
                                <p className="text-sm font-semibold text-[#0B1120] mb-2">{rfq.title}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-slate-500">{rfq.items} Items Required</span>
                                    <button className="text-xs font-bold text-blue-600 hover:underline">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Card 2: Active Orders */}
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm col-span-1">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded text-emerald-600"><ShoppingBag className="w-5 h-5" /></div>
                            <h3 className="font-bold text-[#0B1120]">Active Orders</h3>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {ACTIVE_POS.map((po) => (
                            <div key={po.id} className="border border-slate-200 rounded p-3 hover:border-emerald-300 transition-colors cursor-pointer">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-[#0B1120]">{po.id}</span>
                                    <StatusBadge status={po.status} />
                                </div>
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>Date: {po.date}</span>
                                    <span>{po.items} Items</span>
                                </div>
                                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                                    <span className="font-mono font-bold text-[#0B1120]">IDR {po.total.toLocaleString('id-ID')}</span>
                                    <button className="text-xs font-bold text-emerald-600 hover:underline">Acknowledge</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Card 3: Quick Stats / Invoices */}
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm col-span-1 space-y-6">

                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-50 rounded text-amber-600"><FileText className="w-5 h-5" /></div>
                            <h3 className="font-bold text-[#0B1120]">Invoice Status</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                                <span className="text-sm text-slate-600">Pending Payment</span>
                                <span className="font-mono font-bold text-[#0B1120]">IDR 125M</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded">
                                <span className="text-sm text-emerald-800">Paid (Last 30 Days)</span>
                                <span className="font-mono font-bold text-emerald-700">IDR 450M</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 rounded text-purple-600"><AlertTriangle className="w-5 h-5" /></div>
                            <h3 className="font-bold text-[#0B1120]">Alerts</h3>
                        </div>
                        <div className="p-3 border border-amber-200 bg-amber-50 rounded text-xs text-amber-800">
                            <p className="font-bold mb-1">Document Expiry Warning</p>
                            <p>Your SIUP document will expire in 15 days. Please renew to avoid account suspension.</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
