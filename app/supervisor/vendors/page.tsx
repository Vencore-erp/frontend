'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building, Search, Filter, Eye, ShieldCheck, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';

interface Vendor {
    id: string;
    code: string;
    name: string;
    category: string;
    status: 'ACTIVE' | 'INACTIVE' | 'BLACKLISTED' | 'PENDING';
    rating: number;
    city: string;
    picName: string;
}

const VENDOR_DATA: Vendor[] = [
    { id: '1', code: 'VND-001', name: 'PT Teknologi Maju', category: 'IT Equipment', status: 'ACTIVE', rating: 91, city: 'Jakarta', picName: 'Budi Santoso' },
    { id: '2', code: 'VND-002', name: 'CV Sumber Makmur', category: 'Office Supplies', status: 'ACTIVE', rating: 86, city: 'Surabaya', picName: 'Siti Aminah' },
    { id: '3', code: 'VND-003', name: 'PT Solusi Digital', category: 'Software', status: 'ACTIVE', rating: 91, city: 'Bandung', picName: 'Eko Prasetyo' },
    { id: '4', code: 'VND-004', name: 'PT Jaya Abadi', category: 'Furniture', status: 'INACTIVE', rating: 76, city: 'Medan', picName: 'Rudi Hermawan' },
    { id: '5', code: 'VND-005', name: 'CV Prima Mandiri', category: 'Stationery', status: 'ACTIVE', rating: 89, city: 'Semarang', picName: 'Dewi Lestari' },
    { id: '6', code: 'VND-006', name: 'PT Konstruksi Utama', category: 'Construction', status: 'BLACKLISTED', rating: 60, city: 'Jakarta', picName: 'Joko Widodo' },
];

export default function SupervisorVendorListPage() {
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = VENDOR_DATA.filter(vendor => {
        const matchesStatus = filterStatus === 'ALL' || vendor.status === filterStatus;
        const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.code.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const columns: Column<Vendor>[] = [
        {
            header: 'Vendor Name',
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
            header: 'Category',
            accessorKey: 'category',
            cell: (item) => <span className="text-sm text-slate-600">{item.category}</span>
        },
        {
            header: 'Location',
            accessorKey: 'city',
            cell: (item) => (
                <div className="flex items-center gap-1 text-sm text-slate-600">
                    <MapPin className="w-3 h-3 text-slate-400" /> {item.city}
                </div>
            )
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status} />
        },
        {
            header: 'Rating',
            accessorKey: 'rating',
            cell: (item) => (
                <div className="flex items-center gap-1">
                    <span className={`font-bold ${item.rating >= 90 ? 'text-emerald-600' : item.rating >= 70 ? 'text-blue-600' : 'text-amber-600'}`}>
                        {item.rating}
                    </span>
                    <span className="text-xs text-slate-400">/100</span>
                </div>
            )
        },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <Link href={`/supervisor/vendors/${item.id}`}>
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
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Vendor Directory</h1>
                    <p className="text-sm text-slate-500 mt-1">View and monitor registered vendor list (Read-Only).</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/supervisor/vendors/scorecard">
                        <Button variant="outline" className="gap-2">
                            <ShieldCheck className="w-4 h-4" /> View Scorecard
                        </Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">All Vendors</CardTitle>
                        <div className="flex items-center gap-4">
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search vendors..."
                                    className="pl-9 h-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-slate-400" />
                                <select
                                    className="h-9 rounded-md border border-slate-200 text-sm px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="ALL">All Status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="BLACKLISTED">Blacklisted</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <DataTable
                        data={filteredData}
                        columns={columns}
                        searchPlaceholder="Filter vendors..."
                    />
                </CardContent>
            </Card>
        </div>
    );
}
