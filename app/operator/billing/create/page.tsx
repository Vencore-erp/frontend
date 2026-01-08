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
            loading: 'Mengirim Permintaan Tagihan...',
            success: () => {
                router.push('/operator/contracts/' + contractId);
                return 'Permintaan Tagihan Dikirim ke Finance!';
            },
            error: 'Gagal mengirim permintaan'
        });
    };

    return (
        <DashboardLayout role="OPERATOR">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Buat Permintaan Tagihan</h1>
                    <p className="text-slate-500">Ajukan pembayaran termin untuk Kontrak {contractId}</p>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <CardTitle className="text-blue-900">Pembayaran Termin #{milestoneId}</CardTitle>
                            <CardDescription className="text-blue-700">
                                Pastikan semua deliverables untuk tahapan ini sudah selesai dan disetujui.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Referensi Kontrak</Label>
                                <Input value={contractId} disabled className="bg-slate-100" />
                            </div>
                            <div className="space-y-2">
                                <Label>Tanggal Penagihan</Label>
                                <Input type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Jumlah Tagihan (Termasuk PPN)</Label>
                            <Input type="text" value="Rp 300.000.000" disabled className="bg-slate-100 font-bold" />
                            <p className="text-xs text-slate-500">Jumlah dihitung otomatis berdasarkan persentase termin (25%).</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Catatan / Keterangan</Label>
                            <Textarea placeholder="Contoh: Pembayaran Termin 2 - Q1 Service Delivery completed..." rows={3} />
                        </div>

                        <div className="space-y-2">
                            <Label>Dokumen Pendukung (BAST / Berita Acara)</Label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 cursor-pointer transition-colors">
                                <p className="text-sm font-medium text-slate-700">Klik untuk unggah BAST</p>
                                <p className="text-xs text-slate-500 mt-1">PDF maks 10MB</p>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>Batal</Button>
                            <Button type="submit" className="flex-1 bg-[#0052CC] hover:bg-blue-700">Kirim Permintaan</Button>
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
