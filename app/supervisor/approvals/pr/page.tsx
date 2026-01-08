'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, CheckCircle, XCircle, Eye, Clock, ArrowLeft } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';

interface PRApproval {
    id: string;
    prNumber: string;
    title: string;
    requester: string;
    department: string;
    amount: number;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    submittedAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const PR_APPROVALS: PRApproval[] = [
    { id: '1', prNumber: 'PR-2026-0042', title: 'Server Infrastructure Upgrade', requester: 'Ahmad Rizki', department: 'IT', amount: 250000000, priority: 'HIGH', submittedAt: '2026-01-08', status: 'PENDING' },
    { id: '2', prNumber: 'PR-2026-0041', title: 'Office Supplies Q1', requester: 'Dewi Sartika', department: 'GA', amount: 15000000, priority: 'LOW', submittedAt: '2026-01-07', status: 'PENDING' },
    { id: '3', prNumber: 'PR-2026-0040', title: 'Marketing Campaign Materials', requester: 'Budi Santoso', department: 'Marketing', amount: 85000000, priority: 'MEDIUM', submittedAt: '2026-01-07', status: 'PENDING' },
    { id: '4', prNumber: 'PR-2026-0039', title: 'Network Equipment Renewal', requester: 'Ahmad Rizki', department: 'IT', amount: 120000000, priority: 'HIGH', submittedAt: '2026-01-06', status: 'PENDING' },
    { id: '5', prNumber: 'PR-2026-0038', title: 'Training Materials', requester: 'Siti Nurhaliza', department: 'HR', amount: 25000000, priority: 'MEDIUM', submittedAt: '2026-01-05', status: 'PENDING' },
];

export default function PRApprovalPage() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const columns: Column<PRApproval>[] = [
        {
            header: 'PR Number',
            accessorKey: 'prNumber',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded text-blue-600">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.prNumber}</div>
                        <div className="text-xs text-slate-500">{item.submittedAt}</div>
                    </div>
                </div>
            )
        },
        { header: 'Title', accessorKey: 'title', cell: (item) => <span className="font-medium text-slate-700">{item.title}</span> },
        {
            header: 'Requester',
            accessorKey: 'requester',
            cell: (item) => (
                <div>
                    <div className="font-medium text-slate-700">{item.requester}</div>
                    <div className="text-xs text-slate-500">{item.department}</div>
                </div>
            )
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
            cell: (item) => <span className="font-mono font-medium">{formatCurrency(item.amount)}</span>
        },
        {
            header: 'Priority',
            accessorKey: 'priority',
            cell: (item) => (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.priority === 'HIGH' ? 'bg-rose-100 text-rose-700' :
                        item.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-600'
                    }`}>
                    {item.priority}
                </span>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <Link href={`/procurement/pr/${item.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 text-slate-600 hover:text-slate-900">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                        <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                        <XCircle className="w-4 h-4" />
                    </Button>
                </div>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/supervisor/approvals" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">PR Approvals</h1>
                    <p className="text-sm text-slate-500 mt-1">Review and approve Purchase Requisitions.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded border border-slate-200 flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded text-amber-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#0B1120]">{PR_APPROVALS.filter(p => p.status === 'PENDING').length}</p>
                        <p className="text-xs text-slate-500">Pending</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200 flex items-center gap-3">
                    <div className="p-2 bg-rose-50 rounded text-rose-600">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#0B1120]">{PR_APPROVALS.filter(p => p.priority === 'HIGH').length}</p>
                        <p className="text-xs text-slate-500">High Priority</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200 col-span-2">
                    <p className="text-xs text-slate-500 mb-1">Total Pending Value</p>
                    <p className="text-xl font-bold font-mono text-[#0B1120]">
                        {formatCurrency(PR_APPROVALS.filter(p => p.status === 'PENDING').reduce((acc, p) => acc + p.amount, 0))}
                    </p>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded p-4 flex items-center justify-between">
                    <span className="text-sm text-blue-700">{selectedItems.length} item(s) selected</span>
                    <div className="flex gap-2">
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <CheckCircle className="w-4 h-4 mr-1" /> Approve All
                        </Button>
                        <Button size="sm" variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50">
                            <XCircle className="w-4 h-4 mr-1" /> Reject All
                        </Button>
                    </div>
                </div>
            )}

            <DataTable
                data={PR_APPROVALS}
                columns={columns}
                searchPlaceholder="Search PRs..."
            />
        </div>
    );
}
