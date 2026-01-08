'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Eye, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { StatusBadge } from '@/components/ui/status-badge';

// Mock Data - Filtered for PENDING status
const PENDING_PRS = [
    { id: 'PR-2026-002', desc: 'Server Rack Maintenance', requester: 'Alexander Pierce', dept: 'IT Infrastructure', amount: 45000000, status: 'PENDING', date: '05 Jan 2026', items: 2 },
    { id: 'PR-2026-003', desc: 'MacBook Pro M4 (x5)', requester: 'Alexander Pierce', dept: 'IT Ops', amount: 145000000, status: 'PENDING', date: '06 Jan 2026', items: 5 },
];

export default function ApprovalPage() {
    const [approvals, setApprovals] = useState(PENDING_PRS);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const handleAction = (id: string, action: 'APPROVE' | 'REJECT') => {
        setActionLoading(id);
        const actionText = action === 'APPROVE' ? 'Menyetujui' : 'Menolak';

        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: `${actionText} Permintaan ${id}...`,
            success: () => {
                setApprovals(prev => prev.filter(pr => pr.id !== id));
                setActionLoading(null);
                return `Permintaan ${id} Berhasil ${action === 'APPROVE' ? 'Disetujui' : 'Ditolak'}`;
            },
            error: 'Gagal memproses permintaan'
        });
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daftar Persetujuan</h1>
                <p className="text-sm text-slate-500 mt-1">Tinjau dan setujui permintaan pengadaan yang masuk.</p>
            </div>

            {approvals.length === 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Semua Tugas Selesai!</h3>
                    <p className="text-slate-500 mt-1">Tidak ada permintaan tertunda yang memerlukan persetujuan Anda.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {approvals.map((pr) => (
                        <div key={pr.id} className="bg-white border boundary-l-4 border-l-blue-500 rounded-r-lg shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-mono text-sm font-bold text-[#0052CC]">{pr.id}</span>
                                    <span className="text-xs text-slate-400">•</span>
                                    <span className="text-xs text-slate-500">{pr.date}</span>
                                    <span className="text-xs text-slate-400">•</span>
                                    <StatusBadge status={pr.status} />
                                </div>
                                <h3 className="text-base font-semibold text-slate-900">{pr.desc}</h3>
                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                            {pr.requester.charAt(0)}
                                        </div>
                                        {pr.requester}
                                    </div>
                                    <span>•</span>
                                    <span>{pr.dept}</span>
                                </div>
                            </div>

                            <div className="text-right px-4 border-l border-slate-100 min-w-[150px]">
                                <p className="text-xs text-slate-500 mb-1">Total Nilai</p>
                                <p className="font-mono text-lg font-bold text-slate-900">
                                    IDR {pr.amount.toLocaleString('id-ID')}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 pl-4 md:border-l border-slate-100">
                                <Link href={`/procurement/pr/${pr.id}`}>
                                    <button className="p-2 text-slate-400 hover:text-[#0052CC] hover:bg-blue-50 rounded transition-colors" title="Lihat Detail">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </Link>

                                <div className="w-px h-8 bg-slate-200 mx-1"></div>

                                <button
                                    onClick={() => handleAction(pr.id, 'REJECT')}
                                    disabled={actionLoading === pr.id}
                                    className="px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded transition-colors"
                                >
                                    Tolak
                                </button>
                                <button
                                    onClick={() => handleAction(pr.id, 'APPROVE')}
                                    disabled={actionLoading === pr.id}
                                    className="px-4 py-2 text-sm font-bold text-white bg-[#0052CC] hover:bg-blue-700 rounded shadow-sm transition-all flex items-center gap-2"
                                >
                                    {actionLoading === pr.id && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Setujui
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
