'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, X, ShieldCheck, Truck, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { StatusBadge } from '@/components/ui/status-badge';

// Mock Data for PO Approval
const PO_DATA = {
    id: 'PO-2024-005',
    vendor: 'PT Alpha Tech',
    prRef: 'PR-2024-089',
    date: '2024-01-20',
    totalAmount: 445000000, // Slightly less than PR due to negotiation
    status: 'APPROVAL_PENDING',
    paymentTerms: 'NET 30',
    deliveryDate: '2024-02-15',
    vendorRiskScore: 'LOW', // LOW, MEDIUM, HIGH
    contractRef: 'CTR-2023-001',
    items: [
        { desc: 'MacBook Pro 16" M3 Max', qty: 5, unitPrice: 64000000, total: 320000000 }, // Negotiated down
        { desc: 'Dell XPS 15', qty: 5, unitPrice: 25000000, total: 125000000 },
    ],
};

export default function ApprovePOPage() {
    const router = useRouter();

    const handleApprove = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Signing PO digitally...',
                success: 'PO Approved & Sent to Vendor',
                error: 'Failed to approve PO',
            }
        );
        setTimeout(() => router.push('/procurement/po'), 2000);
    };

    const handleReject = () => {
        toast.error("PO Rejected.");
        setTimeout(() => router.push('/procurement/po'), 1000);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href={`/procurement/po/${PO_DATA.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Approve PO {PO_DATA.id}</h1>
                        <StatusBadge status={PO_DATA.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Final review before vendor issuance.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: PO Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Items Table */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-sm text-[#0B1120]">Order Items</h3>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <FileText className="w-3 h-3" /> Ref: {PO_DATA.prRef}
                            </span>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3 text-center">Qty</th>
                                    <th className="px-4 py-3 text-right">Agreed Price</th>
                                    <th className="px-4 py-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {PO_DATA.items.map((item, idx) => (
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
                                    <td colSpan={3} className="px-4 py-3 text-right font-bold text-slate-600">Total PO Value</td>
                                    <td className="px-4 py-3 text-right font-mono font-bold text-[#0052CC] text-lg">
                                        IDR {PO_DATA.totalAmount.toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Terms */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Payment Terms</h3>
                            <p className="font-bold text-slate-900">{PO_DATA.paymentTerms}</p>
                            <p className="text-xs text-slate-500 mt-1">Standard 30 Days Credit</p>
                        </div>
                        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Delivery Schedule</h3>
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-blue-500" />
                                <p className="font-bold text-slate-900">{PO_DATA.deliveryDate}</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Compliance & Actions */}
                <div className="space-y-6">

                    {/* Compliance Check */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Vendor Compliance</h3>

                        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                            <div>
                                <p className="font-bold text-emerald-800 text-sm">Vetted Vendor</p>
                                <p className="text-xs text-emerald-600">Active Contract ({PO_DATA.contractRef})</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100">
                            <span className="text-slate-500">Risk Score</span>
                            <span className="font-bold text-slate-700">{PO_DATA.vendorRiskScore}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm py-2">
                            <span className="text-slate-500">Performance</span>
                            <span className="font-bold text-emerald-600">4.8/5.0</span>
                        </div>
                    </div>

                    {/* Warning (if any) */}
                    {PO_DATA.totalAmount > 100000000 && (
                        <div className="p-4 bg-amber-50 rounded border border-amber-200 text-amber-800 text-xs flex gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <p>High value PO ({'>'}100M). Ensure tax documents are verified by Finance before release.</p>
                        </div>
                    )}

                    {/* Actions */}
                    <CardSpotlight className="p-6 space-y-3" color="#8b5cf6">
                        <h3 className="font-bold text-white mb-4">Final Authorization</h3>
                        <Button
                            onClick={handleApprove}
                            className="w-full bg-[#0052CC] hover:bg-blue-600 text-white border-0"
                        >
                            <Check className="w-4 h-4 mr-2" /> Approve & Send
                        </Button>
                        <Button
                            onClick={handleReject}
                            variant="destructive"
                            className="w-full bg-rose-500/80 hover:bg-rose-600 text-white border-0"
                        >
                            <X className="w-4 h-4 mr-2" /> Reject PO
                        </Button>
                    </CardSpotlight>

                </div>
            </div>
        </div>
    );
}
