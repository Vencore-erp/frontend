'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Upload, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DISPUTE_TYPES = [
    { value: 'PAYMENT', label: 'Payment Issue', desc: 'Short payment, late payment, or payment not received' },
    { value: 'INVOICE', label: 'Invoice Dispute', desc: 'Invoice rejected or amount discrepancy' },
    { value: 'QUALITY', label: 'Quality Issue', desc: 'Goods rejected due to quality concerns' },
    { value: 'DELIVERY', label: 'Delivery Issue', desc: 'Delivery terms or timeline dispute' },
    { value: 'OTHER', label: 'Other', desc: 'Other issues not listed above' },
];

export default function CreateDisputePage() {
    const [disputeType, setDisputeType] = useState('');
    const [relatedDoc, setRelatedDoc] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/vendor/disputes" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Raise a Dispute</h1>
                    <p className="text-sm text-slate-500 mt-1">Submit a formal dispute for review.</p>
                </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                    <p className="font-medium text-amber-800">Before Raising a Dispute</p>
                    <p className="text-sm text-amber-700">Please ensure you have contacted the buyer directly first. Disputes should be raised only after initial communication attempts have failed.</p>
                </div>
            </div>

            {/* Dispute Type */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Step 1: Select Dispute Type</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                        {DISPUTE_TYPES.map((type) => (
                            <label
                                key={type.value}
                                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${disputeType === type.value
                                        ? 'border-[#0052CC] bg-blue-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="disputeType"
                                    value={type.value}
                                    checked={disputeType === type.value}
                                    onChange={(e) => setDisputeType(e.target.value)}
                                    className="w-4 h-4 text-[#0052CC]"
                                />
                                <div className="ml-3">
                                    <p className="font-medium text-[#0B1120]">{type.label}</p>
                                    <p className="text-sm text-slate-500">{type.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Related Document */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Step 2: Related Document</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
                        <select
                            className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                            value={relatedDoc}
                            onChange={(e) => setRelatedDoc(e.target.value)}
                        >
                            <option value="">Select document type</option>
                            <option value="PO">Purchase Order</option>
                            <option value="INV">Invoice</option>
                            <option value="GR">Goods Receipt</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Document Number</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., PO-2026-0018 or INV-2026-0089"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Description */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Step 3: Dispute Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Brief summary of the issue"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                            rows={5}
                            placeholder="Provide detailed description of the issue, including dates, amounts, and any relevant information..."
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Evidence */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Step 4: Supporting Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#0052CC] transition-colors cursor-pointer">
                        <Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="font-medium text-slate-700">Upload Evidence Documents</p>
                        <p className="text-sm text-slate-500 mt-1">Drag & drop or click to upload</p>
                        <p className="text-xs text-slate-400 mt-2">PDF, JPG, PNG up to 10MB each (max 5 files)</p>
                    </div>
                </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-between items-center">
                <Link href="/vendor/disputes">
                    <Button variant="outline">Cancel</Button>
                </Link>
                <Button className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2">
                    <Send className="w-4 h-4" /> Submit Dispute
                </Button>
            </div>
        </div>
    );
}
