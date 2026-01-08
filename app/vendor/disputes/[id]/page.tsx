'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, MessageSquare, Clock, CheckCircle, FileText, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

const DISPUTE = {
    id: 'DSP-24-001',
    type: 'PAYMENT',
    subject: 'Short payment received for Invoice INV-2023-998',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    openDate: '2024-01-02',
    relatedDoc: 'INV-2023-998',
    description: 'Payment received was IDR 5,000,000 short of the invoiced amount. Invoice total was IDR 125,000,000 but only IDR 120,000,000 was transferred.',
};

const TIMELINE = [
    { id: '1', date: '2024-01-02 10:30', actor: 'You', action: 'Dispute created', type: 'SYSTEM' },
    { id: '2', date: '2024-01-02 14:15', actor: 'Finance Team', action: 'Dispute acknowledged and under review', type: 'RESPONSE' },
    { id: '3', date: '2024-01-03 09:00', actor: 'Finance Team', action: 'Requested additional bank statement', type: 'REQUEST' },
    { id: '4', date: '2024-01-03 11:30', actor: 'You', action: 'Uploaded bank statement evidence', type: 'UPLOAD' },
    { id: '5', date: '2024-01-05 16:00', actor: 'Finance Team', action: 'Confirmed short payment. Processing correction.', type: 'RESPONSE' },
];

export default function DisputeDetailPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/vendor/disputes" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{DISPUTE.id}</h1>
                        <StatusBadge status={DISPUTE.status} />
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">{DISPUTE.priority}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Opened on {DISPUTE.openDate}</p>
                </div>
            </div>

            {/* Dispute Summary */}
            <Card>
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
                            <p className="text-xs text-slate-500 uppercase">Related Document</p>
                            <p className="font-medium text-[#0052CC]">{DISPUTE.relatedDoc}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Status</p>
                            <p className="font-medium text-amber-600">In Progress</p>
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
                            {TIMELINE.map((item, idx) => (
                                <div key={item.id} className="relative flex gap-4">
                                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'SYSTEM' ? 'bg-slate-100 text-slate-500' :
                                            item.type === 'RESPONSE' ? 'bg-blue-100 text-blue-600' :
                                                item.type === 'REQUEST' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-emerald-100 text-emerald-600'
                                        }`}>
                                        {item.type === 'SYSTEM' && <AlertTriangle className="w-4 h-4" />}
                                        {item.type === 'RESPONSE' && <MessageSquare className="w-4 h-4" />}
                                        {item.type === 'REQUEST' && <FileText className="w-4 h-4" />}
                                        {item.type === 'UPLOAD' && <Paperclip className="w-4 h-4" />}
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

            {/* Add Response */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Add Response</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <textarea
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Type your response or additional information..."
                    />
                    <div className="flex justify-between items-center">
                        <Button variant="outline" className="gap-2">
                            <Paperclip className="w-4 h-4" /> Attach File
                        </Button>
                        <Button className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2">
                            <Send className="w-4 h-4" /> Send Response
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
