'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, X, CornerUpLeft, Clock, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { StatusBadge } from '@/components/ui/status-badge';

// Mock Data for PR
const PR_DATA = {
    id: 'PR-2024-089',
    requestor: 'John Doe (IT Dept)',
    department: 'IT Operations',
    date: '2024-01-15',
    totalAmount: 450000000,
    status: 'APPROVAL_PENDING',
    justification: 'Urgent replacement for engineering team laptops. Current devices are 4 years old and causing productivity issues.',
    items: [
        { desc: 'MacBook Pro 16" M3 Max', qty: 5, unitPrice: 65000000, total: 325000000 },
        { desc: 'Dell XPS 15', qty: 5, unitPrice: 25000000, total: 125000000 },
    ],
    budgetStatus: 'WITHIN_BUDGET',
    budgetRemaining: 1500000000
};

export default function ApprovePRPage() {
    const router = useRouter();

    const handleApprove = () => {
        toast.success("Purchase Request approved successfully.");
        // Simulated API call
        setTimeout(() => router.push('/procurement/pr'), 1000);
    };

    const handleReject = () => {
        toast.error("Purchase Request rejected.");
        setTimeout(() => router.push('/procurement/pr'), 1000);
    };

    const handleRevision = () => {
        toast('Returned for revision', {
            description: 'Notification sent to requestor.'
        });
        setTimeout(() => router.push('/procurement/pr'), 1000);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href={`/procurement/pr/${PR_DATA.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Approve PR {PR_DATA.id}</h1>
                        <StatusBadge status={PR_DATA.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Review request details and budget availability.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Items Table */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-sm text-[#0B1120]">Requested Items</h3>
                            <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600">
                                {PR_DATA.items.length} Items
                            </span>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3 text-center">Qty</th>
                                    <th className="px-4 py-3 text-right">Unit Price</th>
                                    <th className="px-4 py-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {PR_DATA.items.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-3 font-medium text-slate-900">{item.desc}</td>
                                        <td className="px-4 py-3 text-center text-slate-600">{item.qty}</td>
                                        <td className="px-4 py-3 text-right font-mono text-slate-600">{item.unitPrice.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">{item.total.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-50 border-t border-slate-200">
                                <tr>
                                    <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-600">Total Requested Amount</td>
                                    <td className="px-4 py-3 text-right font-mono font-bold text-[#0052CC] text-lg">
                                        IDR {PR_DATA.totalAmount.toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Justification */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-2">
                        <h3 className="font-bold text-sm text-[#0B1120] flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            Business Justification
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded border border-slate-100 italic">
                            "{PR_DATA.justification}"
                        </p>
                    </div>

                </div>

                {/* Right Column: Context & Actions */}
                <div className="space-y-6">

                    {/* Budget Check */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Budget Availability</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-emerald-700 text-sm">Witihn Budget</p>
                                <p className="text-xs text-slate-500">Dept: {PR_DATA.department}</p>
                            </div>
                        </div>
                        <div className="space-y-1 pt-4 border-t border-slate-100">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Remaining (YTD)</span>
                                <span className="font-mono font-medium">IDR {PR_DATA.budgetRemaining.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Requestor Info */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Requestor</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 text-sm">{PR_DATA.requestor}</p>
                                <p className="text-xs text-slate-500">{PR_DATA.date}</p>
                            </div>
                        </div>
                    </div>

                    {/* Approval Actions */}
                    <CardSpotlight className="p-6 space-y-3" color="#3b82f6">
                        <h3 className="font-bold text-white mb-4">Decision Required</h3>
                        <Button
                            onClick={handleApprove}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                        >
                            <Check className="w-4 h-4 mr-2" /> Approve Request
                        </Button>
                        <Button
                            onClick={handleRevision}
                            variant="secondary"
                            className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                        >
                            <CornerUpLeft className="w-4 h-4 mr-2" /> Request Revision
                        </Button>
                        <Button
                            onClick={handleReject}
                            variant="destructive"
                            className="w-full bg-rose-500/80 hover:bg-rose-600 text-white border-0"
                        >
                            <X className="w-4 h-4 mr-2" /> Reject
                        </Button>
                    </CardSpotlight>

                </div>
            </div>
        </div>
    );
}

