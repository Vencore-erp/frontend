'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShoppingCart, CreditCard, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const APPROVAL_SUMMARY = [
    { type: 'Purchase Requisitions', icon: FileText, pending: 5, approved: 23, rejected: 2, href: '/supervisor/approvals/pr', color: 'blue' },
    { type: 'Purchase Orders', icon: ShoppingCart, pending: 3, approved: 18, rejected: 1, href: '/supervisor/approvals/po', color: 'emerald' },
    { type: 'Payments', icon: CreditCard, pending: 2, approved: 45, rejected: 0, href: '/supervisor/approvals/payment', color: 'purple' },
];

export default function SupervisorApprovalsPage() {
    const totalPending = APPROVAL_SUMMARY.reduce((acc, item) => acc + item.pending, 0);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Approval Center</h1>
                <p className="text-sm text-slate-500 mt-1">Review and approve pending requests across all modules.</p>
            </div>

            {/* Summary Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-full">
                            <Clock className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-amber-100 text-sm font-medium">Total Pending Approvals</p>
                            <p className="text-4xl font-bold">{totalPending}</p>
                        </div>
                    </div>
                    <p className="text-amber-100 text-sm">Requires your attention</p>
                </div>
            </div>

            {/* Approval Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {APPROVAL_SUMMARY.map((item) => (
                    <Card key={item.type} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded bg-${item.color}-50`}>
                                    <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                                </div>
                                <Link 
                                    href={item.href}
                                    className="text-xs text-[#0052CC] hover:text-blue-700 font-medium flex items-center gap-1"
                                >
                                    View All <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                            <CardTitle className="text-base mt-3">{item.type}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-3 bg-amber-50 rounded">
                                    <div className="flex items-center justify-center gap-1 text-amber-600 mb-1">
                                        <Clock className="w-3 h-3" />
                                    </div>
                                    <p className="text-xl font-bold text-amber-700">{item.pending}</p>
                                    <p className="text-[10px] text-amber-600 font-medium">Pending</p>
                                </div>
                                <div className="p-3 bg-emerald-50 rounded">
                                    <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                                        <CheckCircle className="w-3 h-3" />
                                    </div>
                                    <p className="text-xl font-bold text-emerald-700">{item.approved}</p>
                                    <p className="text-[10px] text-emerald-600 font-medium">Approved</p>
                                </div>
                                <div className="p-3 bg-rose-50 rounded">
                                    <div className="flex items-center justify-center gap-1 text-rose-600 mb-1">
                                        <XCircle className="w-3 h-3" />
                                    </div>
                                    <p className="text-xl font-bold text-rose-700">{item.rejected}</p>
                                    <p className="text-[10px] text-rose-600 font-medium">Rejected</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Pending Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { id: 'PR-2026-0042', type: 'PR', title: 'Server Infrastructure Upgrade', requester: 'Ahmad Rizki', amount: 'IDR 250,000,000', time: '2 hours ago' },
                            { id: 'PO-2026-0018', type: 'PO', title: 'Office Equipment Purchase', requester: 'Siti Nurhaliza', amount: 'IDR 45,000,000', time: '4 hours ago' },
                            { id: 'PAY-2026-0089', type: 'Payment', title: 'Vendor Invoice - PT ABC', requester: 'Finance Team', amount: 'IDR 125,000,000', time: '1 day ago' },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded ${
                                        item.type === 'PR' ? 'bg-blue-50 text-blue-600' :
                                        item.type === 'PO' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-purple-50 text-purple-600'
                                    }`}>
                                        {item.type === 'PR' ? <FileText className="w-5 h-5" /> :
                                         item.type === 'PO' ? <ShoppingCart className="w-5 h-5" /> :
                                         <CreditCard className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#0B1120]">{item.id}: {item.title}</p>
                                        <p className="text-xs text-slate-500">Requested by {item.requester} • {item.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono font-medium text-[#0B1120]">{item.amount}</p>
                                    <button className="mt-1 px-3 py-1 text-xs font-medium bg-[#0052CC] text-white rounded hover:bg-blue-700 transition-colors">
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
