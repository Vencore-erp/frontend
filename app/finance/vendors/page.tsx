'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building, Search, Filter, Eye, DollarSign, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';

interface FinanceVendor {
    id: string;
    code: string;
    name: string;
    category: string;
    taxId: string;
    bankAccount: string;
    status: 'ACTIVE' | 'INACTIVE';
    pendingInvoices: number;
    totalPaidYTD: number;
}

const VENDOR_DATA: FinanceVendor[] = [
    { id: '1', code: 'VND-001', name: 'PT Teknologi Maju', category: 'IT Equipment', taxId: '01.234.567.8-012.000', bankAccount: 'BCA 1234567890', status: 'ACTIVE', pendingInvoices: 2, totalPaidYTD: 1250000000 },
    { id: '2', code: 'VND-002', name: 'CV Sumber Makmur', category: 'Office Supplies', taxId: '02.345.678.9-023.000', bankAccount: 'Mandiri 0987654321', status: 'ACTIVE', pendingInvoices: 0, totalPaidYTD: 85000000 },
    { id: '3', code: 'VND-003', name: 'PT Solusi Digital', category: 'Software', taxId: '03.456.789.0-034.000', bankAccount: 'BNI 1122334455', status: 'ACTIVE', pendingInvoices: 1, totalPaidYTD: 3200000000 },
    { id: '4', code: 'VND-004', name: 'PT Jaya Abadi', category: 'Furniture', taxId: '04.567.890.1-045.000', bankAccount: 'BRI 5566778899', status: 'INACTIVE', pendingInvoices: 0, totalPaidYTD: 0 },
];

export default function FinanceVendorListPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = VENDOR_DATA.filter(vendor =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const columns: Column<FinanceVendor>[] = [
        {
            header: 'Vendor Details',
            accessorKey: 'name',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-600">
                        <Building className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-medium text-[#0B1120]">{item.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{item.code}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Tax Info',
            accessorKey: 'taxId',
            cell: (item) => (
                <div>
                    <div className="text-xs text-slate-500 uppercase">NPWP</div>
                    <div className="text-sm font-mono text-slate-700">{item.taxId}</div>
                </div>
            )
        },
        {
            header: 'Payment Info',
            accessorKey: 'bankAccount',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <CreditCard className="w-3 h-3 text-slate-400" />
                    <span className="text-sm text-slate-600">{item.bankAccount}</span>
                </div>
            )
        },
        {
            header: 'Pending Invoices',
            accessorKey: 'pendingInvoices',
            cell: (item) => (
                item.pendingInvoices > 0 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-700">
                        {item.pendingInvoices} Pending
                    </span>
                ) : (
                    <span className="text-xs text-slate-400">All Paid</span>
                )
            )
        },
        {
            header: 'Total Paid (YTD)',
            accessorKey: 'totalPaidYTD',
            cell: (item) => <span className="font-mono text-sm font-medium">{formatCurrency(item.totalPaidYTD)}</span>
        },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <Link href={`/finance/vendors/${item.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-[#0052CC]">
                        <Eye className="w-4 h-4" />
                    </Button>
                </Link>
            )
        }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Financial Vendor Records</h1>
                    <p className="text-sm text-slate-500 mt-1">View vendor financial details, tax info, and payment history.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Registered Vendors</CardTitle>
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by name, code, or NPWP..."
                                className="pl-9 h-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <DataTable
                        data={filteredData}
                        columns={columns}
                        searchPlaceholder="Search..."
                    />
                </CardContent>
            </Card>
        </div>
    );
}
