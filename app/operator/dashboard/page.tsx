'use client';

import React from 'react';
import Link from 'next/link';
import {
    FileText,
    Search,
    Clock,
    AlertCircle,
    Plus,
    ArrowUpRight,
    Filter
} from 'lucide-react';
import { StatusBadge } from "@/components/ui/status-badge";

const MY_PRS = [
    { id: 'PR-2026-001', title: 'Q1 Office Supplies Restock', date: '2026-01-05', amount: 12500000, status: 'APPROVED', dept: 'General Affairs' },
    { id: 'PR-2026-003', title: 'MacBook Pro M4 (x5)', date: '2026-01-06', amount: 145000000, status: 'PENDING', dept: 'IT Ops' },
    { id: 'PR-2026-004', title: 'Data Center Cooling Maintenance', date: '2026-01-06', amount: 8500000, status: 'DRAFT', dept: 'IT Infra' },
];

const ACTIVE_RFQS = [
    { id: 'RFQ-9901', title: 'Network Switch Upgrade 2026', deadline: '2 Days Left', responses: 3, status: 'OPEN' },
    { id: 'RFQ-9902', title: 'Annual Security Audit Vendor', deadline: '5 Days Left', responses: 0, status: 'OPEN' },
];

export default function OperatorDashboard() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">

            {/* Welcome Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Operator Workspace</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your requisitions and sourcing events.</p>
                </div>
                <Link href="/procurement/pr/create" className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    New Requisition
                </Link>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 rounded text-blue-600">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active PRs</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">12</p>
                    <p className="text-xs text-slate-500 mt-1">3 pending approval</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-50 rounded text-amber-600">
                            <Search className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Open RFQs</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">5</p>
                    <p className="text-xs text-slate-500 mt-1">2 closing soon</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Cycle Time</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">4.2 Days</p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">-12% vs last month</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-rose-50 rounded text-rose-600">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Needed</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">2</p>
                    <p className="text-xs text-rose-600 mt-1 font-medium">Clarification required</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Table: My Requisitions */}
                <div className="col-span-12 lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#0B1120] text-sm flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            Recent Requisitions
                        </h3>
                        <button className="text-xs text-[#0052CC] font-medium hover:underline flex items-center">
                            View All <ArrowUpRight className="w-3 h-3 ml-1" />
                        </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MY_PRS.map((pr) => (
                                    <tr key={pr.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                                        <td className="px-6 py-3">
                                            <span className="font-mono text-xs font-medium text-[#0052CC]">{pr.id}</span>
                                            <div className="text-[10px] text-slate-400">{pr.date}</div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <p className="text-sm text-[#0B1120] font-medium">{pr.title}</p>
                                            <p className="text-xs text-slate-500">{pr.dept}</p>
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <span className="font-mono text-sm text-[#0B1120]">{pr.amount.toLocaleString('id-ID')}</span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <StatusBadge status={pr.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Side Panel: Active RFQs */}
                <div className="col-span-12 lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#0B1120] text-sm flex items-center gap-2">
                            <Search className="w-4 h-4 text-slate-400" />
                            Active Sourcing (RFQs)
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {ACTIVE_RFQS.map((rfq) => (
                            <div key={rfq.id} className="bg-white border border-slate-200 p-4 rounded shadow-sm hover:border-[#0052CC]/50 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{rfq.id}</span>
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                                        {rfq.deadline}
                                    </span>
                                </div>
                                <h4 className="text-sm font-semibold text-[#0B1120] mb-1 group-hover:text-[#0052CC]">{rfq.title}</h4>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Filter className="w-3 h-3" /> {rfq.responses} Bids
                                    </span>
                                    <span className="flex items-center gap-1">
                                        OPEN
                                    </span>
                                </div>
                            </div>
                        ))}

                        <button className="w-full py-2 border border-dashed border-slate-300 rounded text-xs font-medium text-slate-500 hover:text-[#0052CC] hover:border-[#0052CC] transition-colors">
                            + Create New RFQ
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
