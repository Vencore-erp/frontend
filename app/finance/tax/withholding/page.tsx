'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Percent, Building, Download, FileText, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, Column } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

interface WHTRecord {
    id: string;
    vendor: string;
    vendorNpwp: string;
    invoiceRef: string;
    grossAmount: number;
    whtRate: number;
    whtAmount: number;
    netPayable: number;
    taxSlipNo: string;
    status: 'GENERATED' | 'PENDING' | 'SUBMITTED';
}

const WHT_DATA: WHTRecord[] = [
    { id: '1', vendor: 'PT Teknologi Maju', vendorNpwp: '01.234.567.8-012.000', invoiceRef: 'INV-2026-0156', grossAmount: 125000000, whtRate: 2, whtAmount: 2500000, netPayable: 122500000, taxSlipNo: 'WHT-2026-0089', status: 'GENERATED' },
    { id: '2', vendor: 'CV Sumber Makmur', vendorNpwp: '02.345.678.9-023.000', invoiceRef: 'INV-2026-0148', grossAmount: 45000000, whtRate: 2, whtAmount: 900000, netPayable: 44100000, taxSlipNo: 'WHT-2026-0088', status: 'SUBMITTED' },
    { id: '3', vendor: 'PT Solusi Digital', vendorNpwp: '03.456.789.0-034.000', invoiceRef: 'INV-2026-0135', grossAmount: 320000000, whtRate: 2, whtAmount: 6400000, netPayable: 313600000, taxSlipNo: '-', status: 'PENDING' },
    { id: '4', vendor: 'PT Jaya Abadi', vendorNpwp: '04.567.890.1-045.000', invoiceRef: 'INV-2026-0122', grossAmount: 85000000, whtRate: 2, whtAmount: 1700000, netPayable: 83300000, taxSlipNo: 'WHT-2026-0085', status: 'GENERATED' },
];

export default function TaxWithholdingPage() {
    const [filter, setFilter] = useState('ALL');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const totalWHT = WHT_DATA.reduce((acc, w) => acc + w.whtAmount, 0);
    const totalGross = WHT_DATA.reduce((acc, w) => acc + w.grossAmount, 0);

    const filteredData = filter === 'ALL' ? WHT_DATA : WHT_DATA.filter(w => w.status === filter);

    const columns: Column<WHTRecord>[] = [
        {
            header: 'Vendor',
            accessorKey: 'vendor',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-600">
                        <Building className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-medium text-[#0B1120]">{item.vendor}</div>
                        <div className="text-xs text-slate-500 font-mono">{item.vendorNpwp}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Invoice',
            accessorKey: 'invoiceRef',
            cell: (item) => <span className="font-mono text-sm text-[#0052CC]">{item.invoiceRef}</span>
        },
        {
            header: 'Gross Amount',
            accessorKey: 'grossAmount',
            cell: (item) => <span className="font-mono text-sm">{formatCurrency(item.grossAmount)}</span>
        },
        {
            header: 'WHT Rate',
            accessorKey: 'whtRate',
            cell: (item) => (
                <span className="flex items-center gap-1 text-sm">
                    <Percent className="w-3 h-3 text-slate-400" /> {item.whtRate}%
                </span>
            )
        },
        {
            header: 'WHT Amount',
            accessorKey: 'whtAmount',
            cell: (item) => <span className="font-mono text-sm font-medium text-rose-600">{formatCurrency(item.whtAmount)}</span>
        },
        {
            header: 'Net Payable',
            accessorKey: 'netPayable',
            cell: (item) => <span className="font-mono text-sm font-bold text-[#0B1120]">{formatCurrency(item.netPayable)}</span>
        },
        {
            header: 'Tax Slip',
            accessorKey: 'taxSlipNo',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    {item.taxSlipNo !== '-' ? (
                        <>
                            <span className="font-mono text-xs">{item.taxSlipNo}</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Download className="w-3 h-3" />
                            </Button>
                        </>
                    ) : (
                        <span className="text-slate-400 text-sm">—</span>
                    )}
                </div>
            )
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (item) => (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.status === 'SUBMITTED' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'GENERATED' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                    }`}>
                    {item.status}
                </span>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/finance/tax" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Tax Withholding (PPh 23)</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage withholding tax calculations and tax slip generation.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export Report
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded text-blue-600">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Total Transactions</p>
                                <p className="text-2xl font-bold">{WHT_DATA.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded text-slate-600">
                                <Calculator className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Gross Total</p>
                                <p className="text-lg font-bold font-mono">{formatCurrency(totalGross)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-rose-500">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 rounded text-rose-600">
                                <Percent className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Total WHT</p>
                                <p className="text-lg font-bold font-mono text-rose-600">{formatCurrency(totalWHT)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded text-amber-600">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Pending Slips</p>
                                <p className="text-2xl font-bold">{WHT_DATA.filter(w => w.status === 'PENDING').length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {['ALL', 'PENDING', 'GENERATED', 'SUBMITTED'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all
                                ${filter === tab
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
                searchPlaceholder="Search vendors or invoices..."
            />

            {/* Generate Slip Button */}
            {WHT_DATA.some(w => w.status === 'PENDING') && (
                <div className="flex justify-end">
                    <Button className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2">
                        <FileText className="w-4 h-4" /> Generate Tax Slips
                    </Button>
                </div>
            )}
        </div>
    );
}
