'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ChevronLeft, Info, FileText } from 'lucide-react';
import { toast } from 'sonner';

function BillingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const contractId = searchParams.get('contract') || 'CTR-???';
    const milestoneId = searchParams.get('milestone') || '???';

    const [files, setFiles] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'Submitting Billing Request...',
            success: () => {
                router.push('/operator/contracts/' + contractId);
                return 'Billing Request Submitted to Finance!';
            },
            error: 'Failed to submit'
        });
    };

    return (
        <DashboardLayout role="OPERATOR">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Billing Request</h1>
                    <p className="text-slate-500">Submit termin payment request for Contract {contractId}</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <CardTitle className="text-blue-900">Payment Milestone #{milestoneId}</CardTitle>
                            <CardDescription className="text-blue-700">
                                Make sure all deliverables for this milestone are completed and approved.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Contract Reference</Label>
                                <Input value={contractId} disabled className="bg-slate-100" />
                            </div>
                            <div className="space-y-2">
                                <Label>Invoice Date</Label>
                                <Input type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Billing Amount (Inc. PPN)</Label>
                            <Input type="text" value="Rp 300.000.000" disabled className="bg-slate-100 font-bold" />
                            <p className="text-xs text-slate-500">Amount is auto-calculated based on milestone percentage (25%).</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Notes / Description</Label>
                            <Textarea placeholder="e.g. Pembayaran Termin 2 - Q1 Service Delivery completed..." rows={3} />
                        </div>

                        <div className="space-y-2">
                            <Label>Supporting Documents (BAST / Berita Acara)</Label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                                <p className="text-sm font-medium text-slate-700">Click to upload BAST</p>
                                <p className="text-xs text-slate-500 mt-1">PDF up to 10MB</p>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" className="flex-1 bg-[#0052CC] hover:bg-blue-700">Submit Request</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}

export default function CreateBillingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BillingContent />
        </Suspense>
    );
}
