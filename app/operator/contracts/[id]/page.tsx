'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { toast } from 'sonner';

// MOCK DETAIL
const MOCK_CONTRACT_DETAIL = {
    id: 'CTR-2026-001',
    title: 'Managed Service IT Support',
    vendor: 'PT. Global Tech',
    period: '01 Jan 2026 - 31 Dec 2026',
    totalValue: 1200000000,
    paidAmount: 300000000,
    status: 'ACTIVE',
    paymentTerms: 'Termin (Milestone Based)',
    milestones: [
        { id: 1, name: 'DP / Mobilization', percentage: 20, amount: 240000000, dueDate: '2026-01-15', status: 'PAID', evidence: 'Invoice-001.pdf' },
        { id: 2, name: 'Q1 Service Delivery', percentage: 25, amount: 300000000, dueDate: '2026-04-01', status: 'PENDING_BILLING', evidence: '-' },
        { id: 3, name: 'Q2 Service Delivery', percentage: 25, amount: 300000000, dueDate: '2026-07-01', status: 'NOT_STARTED', evidence: '-' },
        { id: 4, name: 'Q3 Service Delivery', percentage: 20, amount: 240000000, dueDate: '2026-10-01', status: 'NOT_STARTED', evidence: '-' },
        { id: 5, name: 'Retention / Final', percentage: 10, amount: 120000000, dueDate: '2027-01-15', status: 'NOT_STARTED', evidence: '-' },
    ]
};

export default function ContractDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [contract] = useState(MOCK_CONTRACT_DETAIL); // In real app, fetch by params.id

    const progress = (contract.paidAmount / contract.totalValue) * 100;

    const handleCreateBill = (milestoneId: number) => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
            loading: 'Membuat Permintaan Tagihan...',
            success: () => {
                router.push(`/operator/billing/create?contract=${contract.id}&milestone=${milestoneId}`);
                return 'Draft Tagihan Berhasil Dibuat!';
            },
            error: 'Gagal membuat tagihan'
        });
    };

    return (
        <DashboardLayout role="OPERATOR">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{contract.title}</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <span>{contract.id}</span>
                        <span>•</span>
                        <span>{contract.vendor}</span>
                        <span>•</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{contract.status === 'ACTIVE' ? 'AKTIF' : contract.status}</Badge>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Nilai Kontrak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rp {contract.totalValue.toLocaleString('id-ID')}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Jumlah Terbayar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Rp {contract.paidAmount.toLocaleString('id-ID')}</div>
                        <Progress value={progress} className="h-2 mt-2" />
                        <p className="text-xs text-slate-500 mt-1">{progress.toFixed(0)}% Selesai</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Ketentuan Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-medium">{contract.paymentTerms === 'Termin (Milestone Based)' ? 'Termin (Berbasis Tahapan)' : contract.paymentTerms}</div>
                        <p className="text-sm text-slate-500 mt-1">Periode: {contract.period}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Jadwal Termin & Pembayaran</CardTitle>
                    <CardDescription>Lacak progres pembayaran termin dan buat permintaan penagihan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Nama Tahapan</TableHead>
                                <TableHead>Jatuh Tempo</TableHead>
                                <TableHead>Persentase</TableHead>
                                <TableHead>Jumlah (IDR)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contract.milestones.map((ms) => (
                                <TableRow key={ms.id}>
                                    <TableCell>{ms.id}</TableCell>
                                    <TableCell className="font-medium">{ms.name}</TableCell>
                                    <TableCell>{ms.dueDate}</TableCell>
                                    <TableCell>{ms.percentage}%</TableCell>
                                    <TableCell>{ms.amount.toLocaleString('id-ID')}</TableCell>
                                    <TableCell>
                                        {ms.status === 'PAID' && <Badge className="bg-green-100 text-green-800 border-green-200">LUNAS</Badge>}
                                        {ms.status === 'PENDING_BILLING' && <Badge className="bg-blue-50 text-blue-700 border-blue-200">SIAP DITAGIH</Badge>}
                                        {ms.status === 'NOT_STARTED' && <Badge variant="outline" className="text-slate-400">TERKUNCI</Badge>}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {ms.status === 'PAID' && (
                                            <Button variant="ghost" size="sm" className="h-8">
                                                <Download className="w-4 h-4 mr-1" /> Inv
                                            </Button>
                                        )}
                                        {ms.status === 'PENDING_BILLING' && (
                                            <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700" onClick={() => handleCreateBill(ms.id)}>
                                                Buat Tagihan
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
