'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ChevronLeft, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateInvoicePage() {
    const router = useRouter();
    const [invoiceType, setInvoiceType] = useState('PO');
    const [selectedContract, setSelectedContract] = useState('');
    const [milestone, setMilestone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'Submitting Invoice...',
            success: () => {
                router.push('/finance/invoices');
                return 'Invoice Submitted Successfully!';
            },
            error: 'Failed to submit'
        });
    };

    return (
        <DashboardLayout role="FINANCE">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Invoice Entry</h1>
                    <p className="text-slate-500">Register new invoice from vendor.</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                    <CardDescription>Fill in the invoice information received from vendor.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Invoice Type</Label>
                                <Select value={invoiceType} onValueChange={setInvoiceType}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PO">Standard PO Based</SelectItem>
                                        <SelectItem value="CONTRACT">Contract / Termin</SelectItem>
                                        <SelectItem value="NON_PO">Non-PO (Utility/Expense)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Vendor Invoice Number</Label>
                                <Input placeholder="INV-2026/..." required />
                            </div>
                        </div>

                        {/* DYNAMIC FIELDS BASED ON TYPE */}
                        {invoiceType === 'PO' && (
                            <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <Label>Purchase Order Reference</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select PO..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PO-001">PO-2026-001 (50x Laptops)</SelectItem>
                                        <SelectItem value="PO-002">PO-2026-002 (Office Furniture)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {invoiceType === 'CONTRACT' && (
                            <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <div className="space-y-2">
                                    <Label>Select Contract</Label>
                                    <Select value={selectedContract} onValueChange={setSelectedContract}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose active contract..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CTR-001">CTR-2026-001: Managed Service IT Support</SelectItem>
                                            <SelectItem value="CTR-002">CTR-2026-002: Building Renovation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedContract && (
                                    <div className="space-y-2">
                                        <Label>Select Milestone / Termin</Label>
                                        <Select value={milestone} onValueChange={setMilestone}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose payment milestone..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MS-1">Termin 1 (DP) - 20%</SelectItem>
                                                <SelectItem value="MS-2">Termin 2 (Progress 50%) - 30%</SelectItem>
                                                <SelectItem value="MS-3">Termin 3 (Pelunasan) - 50%</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="flex items-center gap-2 text-xs text-blue-700 mt-2">
                                            <Info className="w-4 h-4" />
                                            <span>Amount will be calculated automatically based on contract percentage.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Invoice Date</Label>
                                <Input type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Total Amount (Inc. Tax)</Label>
                                <Input type="number" placeholder="Rp 0" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Upload Scan Invoice</Label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer">
                                <p className="text-sm text-slate-500">Drag & drop or click to upload PDF</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full bg-[#0052CC] hover:bg-blue-700">Submit Invoice</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
