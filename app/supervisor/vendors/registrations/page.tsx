'use client';

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, FileText, Calendar, Building, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, Column } from '@/components/ui/data-table';
import Link from 'next/link';

interface VendorRegistration {
    id: string;
    submittedAt: string;
    companyName: string;
    type: string;
    picName: string;
    email: string;
    status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
    documents: number;
}

const REGISTRATIONS: VendorRegistration[] = [
    { id: 'REG-2601-001', submittedAt: '2026-01-08 09:30', companyName: 'PT Global Sarana', type: 'IT Services', picName: 'Andi Wijaya', email: 'andi@globalsarana.com', status: 'PENDING_REVIEW', documents: 5 },
    { id: 'REG-2601-002', submittedAt: '2026-01-07 14:15', companyName: 'CV Maju Bersama', type: 'Office Supplies', picName: 'Budi Hartono', email: 'budi@majubersama.com', status: 'PENDING_REVIEW', documents: 4 },
    { id: 'REG-2601-003', submittedAt: '2026-01-06 11:20', companyName: 'PT Mega Konstruksi', type: 'Construction', picName: 'Citra Dewi', email: 'citra@megakonstruksi.com', status: 'REJECTED', documents: 3 },
];

export default function VendorRegistrationReviewPage() {
    const [selectedTab, setSelectedTab] = useState('PENDING');

    const filteredData = selectedTab === 'ALL' ? REGISTRATIONS : REGISTRATIONS.filter(r =>
        selectedTab === 'PENDING' ? r.status === 'PENDING_REVIEW' : r.status === selectedTab
    );

    const columns: Column<VendorRegistration>[] = [
        {
            header: 'Submission Date',
            accessorKey: 'submittedAt',
            cell: (item) => (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-3 h-3 text-slate-400" /> {item.submittedAt}
                </div>
            )
        },
        {
            header: 'Company',
            accessorKey: 'companyName',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-600">
                        <Building className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-medium text-[#0B1120]">{item.companyName}</div>
                        <div className="text-xs text-slate-500">{item.type}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'PIC',
            accessorKey: 'picName',
            cell: (item) => (
                <div>
                    <div className="text-sm font-medium text-slate-700">{item.picName}</div>
                    <div className="text-xs text-blue-600">{item.email}</div>
                </div>
            )
        },
        {
            header: 'Documents',
            accessorKey: 'documents',
            cell: (item) => (
                <div className="flex items-center gap-1 text-sm text-slate-600">
                    <FileText className="w-3 h-3 text-slate-400" /> {item.documents} Files
                </div>
            )
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (item) => (
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${item.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' :
                            'bg-amber-100 text-amber-700'
                    }`}>
                    {item.status.replace('_', ' ')}
                </span>
            )
        },
        {
            header: 'Action',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">Review</Button>
                </div>
            )
        }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/supervisor/vendors" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Vendor Registrations</h1>
                    <p className="text-sm text-slate-500 mt-1">Review and approve new vendor registration requests.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">Pending Review</p>
                            <span className="p-1 bg-amber-100 text-amber-600 rounded">
                                <FileText className="w-4 h-4" />
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-[#0B1120] mt-2">
                            {REGISTRATIONS.filter(r => r.status === 'PENDING_REVIEW').length}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">Approved (This Month)</p>
                            <span className="p-1 bg-emerald-100 text-emerald-600 rounded">
                                <CheckCircle className="w-4 h-4" />
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-emerald-600">12</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">Rejected (This Month)</p>
                            <span className="p-1 bg-rose-100 text-rose-600 rounded">
                                <XCircle className="w-4 h-4" />
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-rose-600">3</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex gap-4 border-b border-slate-100 pb-4">
                        {['PENDING', 'APPROVED', 'REJECTED', 'ALL'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`text-sm font-medium pb-2 -mb-4 transition-colors ${selectedTab === tab
                                        ? 'text-[#0052CC] border-b-2 border-[#0052CC]'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {tab === 'PENDING' ? 'Pending Review' : tab}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <DataTable
                        data={filteredData}
                        columns={columns}
                        searchPlaceholder="Search company or PIC..."
                    />
                </CardContent>
            </Card>
        </div>
    );
}
