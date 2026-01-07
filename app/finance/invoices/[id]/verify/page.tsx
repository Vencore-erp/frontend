'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, X, FileText, AlertTriangle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { CardSpotlight } from '@/components/ui/card-spotlight';

// Mock Data
const INVOICE = {
    id: 'INV-2024-001',
    vendor: 'PT Alpha Tech',
    poRef: 'PO-2024-089',
    amount: 495000000, // Inclusive Tax
    date: '2024-01-15',
    status: 'VERIFICATION_PENDING',
    items: [
        { desc: 'High Perf Laptop', qty: 10, unitPrice: 45000000, total: 450000000 },
    ]
};

const PO_DATA = {
    id: 'PO-2024-089',
    amount: 495000000,
    status: 'RECEIVED',
    items: [
        { desc: 'High Perf Laptop', qty: 10, unitPrice: 45000000, total: 450000000 },
    ]
};

const GR_DATA = {
    id: 'GR-2024-012',
    date: '2024-01-14',
    status: 'VERIFIED',
    items: [
        { desc: 'High Perf Laptop', qty: 10, matched: true },
    ]
};

export default function VerifyInvoicePage() {
    const router = useRouter();

    const handleApprove = () => {
        toast.success("Invoice verified and matched successfully!");
        setTimeout(() => router.push('/finance/invoices'), 1000);
    };

    const handleReject = () => {
        toast.error("Invoice rejected. Dispute created.");
        setTimeout(() => router.push('/finance/invoices'), 1000);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href={`/finance/invoices/${INVOICE.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Verify Invoice {INVOICE.id}</h1>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded border border-amber-200">
                            3-Way Match Pending
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Compare Invoice against PO and Goods Receipt.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Column 1: Invoice (Vendor) */}
                <div className="space-y-4">
                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" /> 1. Invoice
                    </h3>
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                        <div>
                            <span className="text-xs text-slate-500">Vendor</span>
                            <p className="font-bold text-slate-900">{INVOICE.vendor}</p>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500">Amount Claimed</span>
                            <p className="font-bold text-lg text-slate-900 font-mono">IDR {INVOICE.amount.toLocaleString()}</p>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500">Line Items</span>
                            <p className="text-sm text-slate-700">{INVOICE.items[0].qty}x {INVOICE.items[0].desc}</p>
                        </div>
                        <div className="pt-4 border-t border-slate-100">
                            <Button variant="outline" size="sm" className="w-full">
                                <Eye className="w-3 h-3 mr-2" /> View Original PDF
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Column 2: PO (Internal) */}
                <div className="space-y-4">
                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-500" /> 2. Purchase Order
                    </h3>
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                        <div>
                            <span className="text-xs text-slate-500">PO Reference</span>
                            <p className="font-bold text-slate-900">{PO_DATA.id}</p>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500">Authorized Amount</span>
                            <p className="font-bold text-lg text-slate-900 font-mono">IDR {PO_DATA.amount.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                            <Check className="w-3 h-3" /> Amount Matches
                        </div>
                    </div>
                </div>

                {/* Column 3: GR (Warehouse) */}
                <div className="space-y-4">
                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-500" /> 3. Goods Receipt
                    </h3>
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                        <div>
                            <span className="text-xs text-slate-500">GR Reference</span>
                            <p className="font-bold text-slate-900">{GR_DATA.id}</p>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500">Received Date</span>
                            <p className="font-bold text-slate-900">{GR_DATA.date}</p>
                        </div>
                        <div>
                            <span className="text-xs text-slate-500">Quality Check</span>
                            <p className="font-bold text-slate-900 text-emerald-600">PASSED</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                            <Check className="w-3 h-3" /> Quantity Matches
                        </div>
                    </div>
                </div>

            </div>

            {/* Match Status Card */}
            <CardSpotlight className="p-8" color="#10b981">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-500/20 p-4 rounded-full border border-emerald-500/50">
                            <Check className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Match Successful</h3>
                            <p className="text-neutral-400">All data points (Price, Quantity, Quality) align across Invoice, PO, and GR.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button
                            onClick={handleReject}
                            className="flex-1 md:flex-none bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/50"
                        >
                            <X className="w-4 h-4 mr-2" /> Reject
                        </Button>
                        <Button
                            onClick={handleApprove}
                            className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <Check className="w-4 h-4 mr-2" /> Verify & Approve
                        </Button>
                    </div>
                </div>
            </CardSpotlight>

            {/* Warning Section (Hidden if matched, illustrative here) */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600">
                <p className="font-bold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-slate-500" />
                    Verification Policy
                </p>
                <p className="mb-1">1. Price variance &le; 2% is auto-approved.</p>
                <p className="mb-1">2. Quantity mismatch requires Goods Receipt revision.</p>
                <p>3. Tax computation must match Faktur Pajak exactly.</p>
            </div>

        </div>
    );
}
