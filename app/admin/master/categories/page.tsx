'use client';

import React, { useState } from 'react';
import { Plus, Download, Edit, Trash2, Tag, Layers, Database } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Category {
    id: string;
    code: string;
    name: string;
    type: 'GOODS' | 'SERVICES' | 'ASSETS';
    status: 'ACTIVE' | 'INACTIVE';
    itemCount: number;
}

const CATEGORIES: Category[] = [
    { id: 'CAT-001', code: 'IT-HW', name: 'IT Hardware', type: 'ASSETS', status: 'ACTIVE', itemCount: 154 },
    { id: 'CAT-002', code: 'IT-SW', name: 'IT Software', type: 'GOODS', status: 'ACTIVE', itemCount: 89 },
    { id: 'CAT-003', code: 'OFF-SUP', name: 'Office Supplies', type: 'GOODS', status: 'ACTIVE', itemCount: 432 },
    { id: 'CAT-004', code: 'PRO-SRV', name: 'Professional Services', type: 'SERVICES', status: 'ACTIVE', itemCount: 25 },
    { id: 'CAT-005', code: 'FAC-MNT', name: 'Facility Maintenance', type: 'SERVICES', status: 'ACTIVE', itemCount: 12 },
    { id: 'CAT-006', code: 'LOG-FLE', name: 'Logistics Fleet', type: 'ASSETS', status: 'INACTIVE', itemCount: 0 },
];

export default function CategoriesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = CATEGORIES.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: Column<Category>[] = [
        {
            header: 'Category Name',
            accessorKey: 'name',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-500">
                        <Tag className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.code}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Type',
            accessorKey: 'type',
            cell: (item) => (
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {item.type}
                </span>
            )
        },
        {
            header: 'Items Linked',
            accessorKey: 'itemCount',
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Database className="w-3 h-3 text-slate-400" />
                    {item.itemCount} items
                </div>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <div className="flex items-center gap-1">
                    <Button className="h-7 w-7 p-0 bg-transparent text-slate-400 hover:text-[#0052CC] hover:bg-slate-50 border-0 shadow-none">
                        <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button className="h-7 w-7 p-0 bg-transparent text-slate-400 hover:text-rose-600 hover:bg-rose-50 border-0 shadow-none">
                        <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Category Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage procurement categories for goods and services.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button className="bg-[#0052CC] hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSpotlight className="p-6 h-32" color="#0052CC">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Categories</p>
                    <p className="text-3xl font-black text-white">{CATEGORIES.length}</p>
                    <p className="text-[10px] text-blue-400 mt-1 font-bold">In system</p>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#10b981">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Active Categories</p>
                    <p className="text-3xl font-black text-white">{CATEGORIES.filter(c => c.status === 'ACTIVE').length}</p>
                    <p className="text-[10px] text-emerald-400 mt-1 font-bold">Ready for usage</p>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#8b5cf6">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Types</p>
                    <div className="flex gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-neutral-800 rounded text-[10px] text-neutral-300 border border-neutral-700">Goods</span>
                        <span className="px-2 py-0.5 bg-neutral-800 rounded text-[10px] text-neutral-300 border border-neutral-700">Services</span>
                        <span className="px-2 py-0.5 bg-neutral-800 rounded text-[10px] text-neutral-300 border border-neutral-700">Assets</span>
                    </div>
                </CardSpotlight>
            </div>

            <div className="space-y-4">
                <DataTable
                    data={filteredData}
                    columns={columns}
                    searchPlaceholder="Search category..."
                />
            </div>
        </div>
    );
}
