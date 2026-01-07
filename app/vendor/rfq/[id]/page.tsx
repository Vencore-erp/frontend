'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, FileText, Upload, CheckCircle2, Clock, DollarSign, Building, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function RFQDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleBack = () => router.back();

    const handleSubmitQuote = () => {
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            toast.success('Quotation submitted successfully!', {
                description: 'We have notified the procurement team.'
            });
            router.push('/vendor/rfq'); // Back to list
        }, 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header / Nav */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handleBack} className="text-slate-500 hover:text-slate-900">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">RFQ-9901: Network Switch Upgrade</h1>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">INVITED</Badge>
                    </div>
                    <p className="text-slate-500 text-sm mt-1">Due Date: 12 Jan 2026 • 2 Days Left</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: RFQ Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Information */}
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base font-bold text-slate-900">Request Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-slate-600">
                            <p>
                                Bank XYZ is seeking proposals from qualified vendors for the supply, installation, and configuration of enterprise-grade network switches for our Head Office Data Center.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Department</span>
                                    <span className="font-medium text-slate-900 flex items-center gap-2">
                                        <Building className="w-4 h-4 text-slate-400" /> IT Infrastructure
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Requested Delivery</span>
                                    <span className="font-medium text-slate-900 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" /> Feb 15, 2026
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Line Items */}
                    <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                            <CardTitle className="text-base font-bold text-slate-900">Line Items</CardTitle>
                        </CardHeader>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Item Name</th>
                                        <th className="px-6 py-3 font-medium">Qty</th>
                                        <th className="px-6 py-3 font-medium">UoM</th>
                                        <th className="px-6 py-3 font-medium text-right">Target Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-slate-900">Cisco Catalyst 9300 48-port PoE+</td>
                                        <td className="px-6 py-4">8</td>
                                        <td className="px-6 py-4 text-slate-500">Unit</td>
                                        <td className="px-6 py-4 text-right text-slate-500 italic">Hidden</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-slate-900">10G SFP+ Transceiver Module</td>
                                        <td className="px-6 py-4">16</td>
                                        <td className="px-6 py-4 text-slate-500">Unit</td>
                                        <td className="px-6 py-4 text-right text-slate-500 italic">Hidden</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-slate-900">Installation & Config Services (Man-days)</td>
                                        <td className="px-6 py-4">5</td>
                                        <td className="px-6 py-4 text-slate-500">Days</td>
                                        <td className="px-6 py-4 text-right text-slate-500 italic">Hidden</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* RIGHT: Submission Form */}
                <div className="space-y-6">
                    <Card className="border-blue-100 shadow-md ring-1 ring-blue-500/10">
                        <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-4">
                            <CardTitle className="text-blue-900 flex items-center gap-2">
                                <FileText className="w-5 h-5" /> Submit Quotation
                            </CardTitle>
                            <CardDescription className="text-blue-700/70">RFQ-9901</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase text-slate-500">Total Quotation Value (IDR)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">Rp</span>
                                    <Input placeholder="0" className="pl-8 font-mono font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase text-slate-500">Valid Until</Label>
                                <Input type="date" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase text-slate-500">Attach Proposal (PDF)</Label>
                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                                    <span className="text-xs text-slate-500 font-medium">Click to upload quote</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase text-slate-500">Remarks</Label>
                                <Textarea placeholder="Any additional notes..." className="text-sm resize-none" rows={3} />
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2 pb-6">
                            <Button
                                className="w-full bg-[#0052CC] hover:bg-blue-700 shadow-lg shadow-blue-900/20"
                                size="lg"
                                onClick={handleSubmitQuote}
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : 'Submit Quotation'}
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <p className="text-xs text-amber-800 leading-relaxed">
                            <strong>Note:</strong> By submitting this quotation, you agree to the Terms & Conditions set forth in the RFQ document.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
