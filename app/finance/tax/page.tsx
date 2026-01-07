'use client';

import React, { useState } from 'react';
import { Download, Calendar, DollarSign, FileText, PieChart } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Button } from '@/components/ui/button';

interface TaxRecord {
    id: string;
    period: string;
    type: 'PPN (VAT)' | 'PPH 23' | 'PPH 21' | 'PPH 4(2)';
    taxableAmount: string;
    taxAmount: string;
    status: 'PAID' | 'PENDING' | 'FILED';
    dueDate: string;
}

const TAX_RECORDS: TaxRecord[] = [
    { id: 'TAX-2024-001', period: 'Jan 2024', type: 'PPN (VAT)', taxableAmount: 'IDR 4,500,000,000', taxAmount: 'IDR 495,000,000', status: 'PAID', dueDate: '2024-02-28' },
    { id: 'TAX-2024-002', period: 'Jan 2024', type: 'PPH 23', taxableAmount: 'IDR 850,000,000', taxAmount: 'IDR 17,000,000', status: 'FILED', dueDate: '2024-02-10' },
    { id: 'TAX-2024-003', period: 'Feb 2024', type: 'PPN (VAT)', taxableAmount: 'IDR 3,200,000,000', taxAmount: 'IDR 352,000,000', status: 'PENDING', dueDate: '2024-03-31' },
    { id: 'TAX-2024-004', period: 'Feb 2024', type: 'PPH 21', taxableAmount: 'IDR 1,200,000,000', taxAmount: 'IDR 65,000,000', status: 'PENDING', dueDate: '2024-03-10' },
];

export default function TaxPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    const filteredData = activeTab === 'ALL' ? TAX_RECORDS : TAX_RECORDS.filter(t => t.status === activeTab);

    const columns: Column<TaxRecord>[] = [
        {
            header: 'Tax Reference',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-500">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.id}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.type}</div>
                    </div>
                </div>
            )
        },
        { header: 'Period', accessorKey: 'period', cell: (item) => <span className="font-medium text-slate-700">{item.period}</span> },
        {
            header: 'Taxable Amount',
            accessorKey: 'taxableAmount',
            cell: (item) => (
                <span className="font-mono text-xs text-slate-500">{item.taxableAmount}</span>
            )
        },
        {
            header: 'Tax Due',
            accessorKey: 'taxAmount',
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B1120]">
                    <DollarSign className="w-3 h-3 text-slate-400" />
                    {item.taxAmount}
                </div>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Due Date',
            accessorKey: 'dueDate',
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.dueDate}
                </div>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Tax & Compliance</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage corporate tax obligations and reporting.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSpotlight className="p-6 h-32" color="#f59e0b">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Payable</p>
                            <p className="text-3xl font-black text-white">IDR 417M</p>
                            <p className="text-sm text-neutral-500 mt-1">Due next 30 days</p>
                        </div>
                        <Calendar className="w-8 h-8 text-amber-500 opacity-50" />
                    </div>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#10b981">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Paid YTD</p>
                            <p className="text-3xl font-black text-white">IDR 1.2B</p>
                            <p className="text-sm text-neutral-500 mt-1">Fiscal Year 2024</p>
                        </div>
                        <CheckCircleIcon className="w-8 h-8 text-emerald-500 opacity-50" />
                    </div>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#3b82f6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Faktur Pajak</p>
                            <p className="text-3xl font-black text-white">1,024</p>
                            <p className="text-sm text-neutral-500 mt-1">Processed</p>
                        </div>
                        <PieChart className="w-8 h-8 text-blue-500 opacity-50" />
                    </div>
                </CardSpotlight>
            </div>

            <div className="space-y-4">
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8">
                        {['ALL', 'PENDING', 'PAID', 'FILED'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
                                    ${activeTab === tab
                                        ? 'border-[#0052CC] text-[#0052CC]'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <DataTable
                    data={filteredData}
                    columns={columns}
                    searchPlaceholder="Search tax records..."
                />
            </div>
        </div>
    );
}

function CheckCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
