'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle2, Circle, AlertCircle, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';

const VENDOR_DATA = {
    id: 'VEND-001',
    name: 'PT Alpha Tech',
    status: 'PENDING_QUALIFICATION',
    checklist: [
        { id: 1, task: 'Legal Entity Validation (SIUP/NIB)', status: 'COMPLETED', verifiedBy: 'System', date: '2023-12-01' },
        { id: 2, task: 'Tax Compliance Check (SPPKP)', status: 'COMPLETED', verifiedBy: 'System', date: '2023-12-01' },
        { id: 3, task: 'Bank Account Verification', status: 'PENDING', verifiedBy: '-', date: '-' },
        { id: 4, task: 'Site Visit / Physical Audit', status: 'PENDING', verifiedBy: '-', date: '-' },
        { id: 5, task: 'Reference Check (3 Clients)', status: 'PENDING', verifiedBy: '-', date: '-' },
    ]
};

export default function VendorQualificationPage() {
    const router = useRouter();

    const handleVerification = (taskId: number) => {
        toast.success(`Task #${taskId} verified successfully.`);
        // In real app: update state or call API
    };

    const handleFinalize = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Finalizing qualification...',
                success: 'Vendor Qualified Successfully!',
                error: 'Failed to qualify vendor',
            }
        );
        setTimeout(() => router.push(`/procurement/vendors/${VENDOR_DATA.id}`), 2000);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href={`/procurement/vendors/${VENDOR_DATA.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Qualification Checklist</h1>
                        <StatusBadge status={VENDOR_DATA.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Verify {VENDOR_DATA.name} for approved vendor status.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Checklist */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {VENDOR_DATA.checklist.map((item) => (
                                <div key={item.id} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                                    <div className="mt-1">
                                        {item.status === 'COMPLETED' ? (
                                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-semibold text-sm ${item.status === 'COMPLETED' ? 'text-slate-900' : 'text-slate-600'}`}>
                                            {item.task}
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Status: <span className="font-medium">{item.status}</span> • Verified by: {item.verifiedBy}
                                        </p>
                                    </div>
                                    {item.status !== 'COMPLETED' && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="ml-4 h-8 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                            onClick={() => handleVerification(item.id)}
                                        >
                                            Details / Verify
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Progress & Actions */}
                <div className="space-y-6">

                    {/* Progress Card */}
                    <CardSpotlight className="p-6" color="#3b82f6">
                        <h3 className="font-bold text-white mb-2">Completion Progress</h3>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-black text-white">40%</span>
                            <span className="text-sm text-blue-200 mb-1">Completed</span>
                        </div>
                        <div className="w-full bg-blue-900/50 rounded-full h-2 mb-4">
                            <div className="bg-blue-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <p className="text-xs text-blue-200">
                            3 pending tasks must be verified before this vendor can be approved for POs.
                        </p>
                    </CardSpotlight>

                    {/* Docs */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Supporting Documents
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100 text-sm">
                                <span className="text-slate-700 truncate">SIUP_TDP_2023.pdf</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400"><FileText className="w-3 h-3" /></Button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100 text-sm">
                                <span className="text-slate-700 truncate">Bank_Letter.pdf</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400"><FileText className="w-3 h-3" /></Button>
                            </div>
                            <Button variant="outline" className="w-full h-8 text-xs bg-white text-slate-600 border-dashed">
                                <Upload className="w-3 h-3 mr-2" /> Upload Document
                            </Button>
                        </div>
                    </div>

                    <Button
                        onClick={handleFinalize}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                        disabled={true} // Disabled in mock until tasks are done
                    >
                        Finalize Qualification
                    </Button>

                </div>
            </div>
        </div>
    );
}
