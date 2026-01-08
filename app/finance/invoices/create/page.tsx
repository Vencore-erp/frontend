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
    const [amount, setAmount] = useState(0);
    const [tax, setTax] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newInvoice = {
            id: `INV-2026-${Math.floor(Math.random() * 1000)}`,
            vendor: 'MOCK VENDOR INC.', // Simplified for prototype
            amount: amount + tax,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'PENDING',
            match: 'PASS'
        };

        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'Mengirim Faktur...',
            success: () => {
                // Save to localStorage for mock persistence
                const existing = JSON.parse(localStorage.getItem('mock_invoices') || '[]');
                localStorage.setItem('mock_invoices', JSON.stringify([newInvoice, ...existing]));

                router.push('/finance/invoices');
                return 'Faktur Berhasil Disimpan!';
            },
            error: 'Gagal mengirim faktur'
        });
    };

    return (
        <DashboardLayout role="FINANCE">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Input Faktur Baru</h1>
                    <p className="text-slate-500">Registrasi faktur tagihan baru dari vendor.</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Detail Faktur</CardTitle>
                    <CardDescription>Isi informasi faktur yang diterima dari vendor.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Jenis Faktur</Label>
                                <Select value={invoiceType} onValueChange={setInvoiceType}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PO">Berbasis PO (Standard)</SelectItem>
                                        <SelectItem value="CONTRACT">Kontrak / Termin</SelectItem>
                                        <SelectItem value="NON_PO">Non-PO (Utilitas/Beban)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Nomor Faktur Vendor</Label>
                                <Input placeholder="INV-2026/..." required />
                            </div>
                        </div>

                        {/* DYNAMIC FIELDS BASED ON TYPE */}
                        {invoiceType === 'PO' && (
                            <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <Label>Referensi Purchase Order (PO)</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih PO..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PO-001">PO-2026-001 (50x Laptop)</SelectItem>
                                        <SelectItem value="PO-002">PO-2026-002 (Furniture Kantor)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {invoiceType === 'CONTRACT' && (
                            <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <div className="space-y-2">
                                    <Label>Pilih Kontrak</Label>
                                    <Select value={selectedContract} onValueChange={setSelectedContract}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kontrak aktif..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CTR-001">CTR-2026-001: Managed Service IT Support</SelectItem>
                                            <SelectItem value="CTR-002">CTR-2026-002: Renovasi Gedung</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedContract && (
                                    <div className="space-y-2">
                                        <Label>Pilih Termin / Tahapan</Label>
                                        <Select value={milestone} onValueChange={setMilestone}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih tahapan pembayaran..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MS-1">Termin 1 (DP) - 20%</SelectItem>
                                                <SelectItem value="MS-2">Termin 2 (Progress 50%) - 30%</SelectItem>
                                                <SelectItem value="MS-3">Termin 3 (Pelunasan) - 50%</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="flex items-center gap-2 text-xs text-blue-700 mt-2">
                                            <Info className="w-4 h-4" />
                                            <span>Jumlah akan dihitung otomatis berdasarkan persentase kontrak.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Tanggal Faktur</Label>
                                <Input type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Jumlah (Sebelum Pajak)</Label>
                                <Input
                                    type="number"
                                    placeholder="Rp 0"
                                    value={amount}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setAmount(val);
                                        setTax(val * 0.11);
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded border border-slate-200">
                            <div className="space-y-1">
                                <Label className="text-xs text-slate-500">PPN (11%)</Label>
                                <div className="font-mono font-medium text-slate-700">Rp {tax.toLocaleString('id-ID')}</div>
                            </div>
                            <div className="space-y-1 text-right">
                                <Label className="text-xs text-slate-500">Total (Termasuk Pajak)</Label>
                                <div className="font-mono font-bold text-[#0052CC] text-lg">Rp {(amount + tax).toLocaleString('id-ID')}</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Unggah Pindai Faktur (PDF)</Label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer">
                                <p className="text-sm text-slate-500">Drag & drop atau klik untuk unggah PDF</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full bg-[#0052CC] hover:bg-blue-700">Kirim Faktur</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
