'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, MessageSquare, Clock, CheckCircle, FileText, Send, Paperclip, DollarSign, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

const DISPUTE = {
    id: 'DSP-24-001',
    type: 'PAYMENT',
    subject: 'Short payment claim from PT Teknologi Maju',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    openDate: '2024-01-02',
    vendor: 'PT Teknologi Maju',
    vendorCode: 'VND-001',
    invoiceRef: 'INV-2023-998',
    claimedAmount: 5000000,
    description: 'Vendor claims payment was IDR 5,000,000 short of invoiced amount. Invoice total was IDR 125,000,000 but payment processed was IDR 120,000,000.',
    assignedTo: 'Dewi Sartika',
};

const TIMELINE = [
    { id: '1', date: '2024-01-02 10:30', actor: 'Vendor', action: 'Dispute raised', type: 'SYSTEM' },
    { id: '2', date: '2024-01-02 14:15', actor: 'System', action: 'Dispute assigned to Dewi Sartika', type: 'SYSTEM' },
    { id: '3', date: '2024-01-03 09:00', actor: 'Dewi Sartika', action: 'Requested bank statement from vendor', type: 'REQUEST' },
    { id: '4', date: '2024-01-03 11:30', actor: 'Vendor', action: 'Uploaded bank statement evidence', type: 'UPLOAD' },
    { id: '5', date: '2024-01-04 10:00', actor: 'Dewi Sartika', action: 'Verified bank records - confirmed short payment', type: 'RESPONSE' },
    { id: '6', date: '2024-01-05 16:00', actor: 'Dewi Sartika', action: 'Submitted correction payment request to supervisor', type: 'ESCALATE' },
];

export default function FinanceDisputeDetailPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/finance/disputes" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{DISPUTE.id}</h1>
                        <StatusBadge status={DISPUTE.status} />
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">{DISPUTE.priority}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Opened on {DISPUTE.openDate} • Assigned to {DISPUTE.assignedTo}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                        <CheckCircle className="w-4 h-4 mr-1" /> Resolve
                    </Button>
                </div>
            </div>

            {/* Dispute Summary */}
            <div className="grid grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Dispute Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Type</p>
                                <p className="font-medium text-[#0B1120]">{DISPUTE.type}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Invoice Reference</p>
                                <p className="font-medium text-[#0052CC]">{DISPUTE.invoiceRef}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Claimed Amount</p>
                                <p className="font-mono font-bold text-rose-600">{formatCurrency(DISPUTE.claimedAmount)}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase mb-1">Subject</p>
                            <p className="font-medium text-[#0B1120]">{DISPUTE.subject}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase mb-1">Description</p>
                            <p className="text-slate-700">{DISPUTE.description}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Building className="w-4 h-4" /> Vendor Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Company</p>
                            <p className="font-medium text-[#0B1120]">{DISPUTE.vendor}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Vendor Code</p>
                            <p className="font-mono text-sm text-slate-600">{DISPUTE.vendorCode}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                            <p className="text-xs text-slate-500 uppercase flex items-center gap-1">
                                <User className="w-3 h-3" /> Assigned To
                            </p>
                            <p className="font-medium text-[#0B1120]">{DISPUTE.assignedTo}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Resolution Actions */}
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                            <div>
                                <p className="font-medium text-blue-900">Resolution Proposal</p>
                                <p className="text-sm text-blue-700">Issue correction payment of {formatCurrency(DISPUTE.claimedAmount)} to vendor.</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                                Modify
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Approve Resolution
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-400" />
                        Resolution Timeline
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
                        <div className="space-y-6">
                            {TIMELINE.map((item) => (
                                <div key={item.id} className="relative flex gap-4">
                                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'SYSTEM' ? 'bg-slate-100 text-slate-500' :
                                            item.type === 'RESPONSE' ? 'bg-blue-100 text-blue-600' :
                                                item.type === 'REQUEST' ? 'bg-amber-100 text-amber-600' :
                                                    item.type === 'ESCALATE' ? 'bg-purple-100 text-purple-600' :
                                                        'bg-emerald-100 text-emerald-600'
                                        }`}>
                                        {item.type === 'SYSTEM' && <AlertTriangle className="w-4 h-4" />}
                                        {item.type === 'RESPONSE' && <MessageSquare className="w-4 h-4" />}
                                        {item.type === 'REQUEST' && <FileText className="w-4 h-4" />}
                                        {item.type === 'UPLOAD' && <Paperclip className="w-4 h-4" />}
                                        {item.type === 'ESCALATE' && <AlertTriangle className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-[#0B1120]">{item.actor}</p>
                                            <span className="text-xs text-slate-400">{item.date}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1">{item.action}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Add Note */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Add Internal Note</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <textarea
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Add internal notes or communicate with the vendor..."
                    />
                    <div className="flex justify-between items-center">
                        <Button variant="outline" className="gap-2">
                            <Paperclip className="w-4 h-4" /> Attach File
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="outline">Save as Internal Note</Button>
                            <Button className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2">
                                <Send className="w-4 h-4" /> Send to Vendor
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
