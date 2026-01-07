'use client';

import React, { useState } from 'react';
import { Plus, Download, Edit, Trash2, Building2, Users, Wallet } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Button } from '@/components/ui/button';

interface Department {
    id: string;
    code: string;
    name: string;
    head: string;
    budget: string;
    employeeCount: number;
    status: 'ACTIVE' | 'INACTIVE';
}

const DEPARTMENTS: Department[] = [
    { id: 'DEPT-001', code: 'IT-OPS', name: 'IT Operations', head: 'Robert Wilson', budget: 'IDR 2.5B', employeeCount: 24, status: 'ACTIVE' },
    { id: 'DEPT-002', code: 'HR-GEN', name: 'Human Resources', head: 'Sarah Connor', budget: 'IDR 500M', employeeCount: 8, status: 'ACTIVE' },
    { id: 'DEPT-003', code: 'FIN-ACC', name: 'Finance & Accounting', head: 'Michael Chen', budget: 'IDR 800M', employeeCount: 15, status: 'ACTIVE' },
    { id: 'DEPT-004', code: 'PROC-MGT', name: 'Procurement', head: 'Sarah Johnson', budget: 'IDR 1.2B', employeeCount: 10, status: 'ACTIVE' },
    { id: 'DEPT-005', code: 'MKT-DIG', name: 'Digital Marketing', head: 'Emily Blunt', budget: 'IDR 3.0B', employeeCount: 6, status: 'ACTIVE' },
];

export default function DepartmentsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = DEPARTMENTS.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns: Column<Department>[] = [
        {
            header: 'Department',
            accessorKey: 'name',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded text-indigo-600 border border-indigo-100">
                        <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.code}</div>
                    </div>
                </div>
            )
        },
        { header: 'Head of Dept', accessorKey: 'head' },
        {
            header: 'Annual Budget',
            accessorKey: 'budget',
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-700">
                    <Wallet className="w-3 h-3 text-slate-400" />
                    {item.budget}
                </div>
            )
        },
        {
            header: 'Employees',
            accessorKey: 'employeeCount',
            cell: (item) => (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Users className="w-3 h-3 text-slate-400" />
                    {item.employeeCount}
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
                </div>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Departments</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage organizational structure and budgets.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button className="bg-[#0052CC] hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Department
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardSpotlight className="p-6 h-32" color="#6366f1">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Depts</p>
                    <p className="text-3xl font-black text-white">{DEPARTMENTS.length}</p>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#f59e0b">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Budget Allocated</p>
                    <p className="text-3xl font-black text-white">IDR 8.0B</p>
                    <p className="text-[10px] text-amber-400 mt-1 font-bold">FY 2026</p>
                </CardSpotlight>
                <CardSpotlight className="p-6 h-32" color="#ec4899">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Headcount</p>
                    <p className="text-3xl font-black text-white">{DEPARTMENTS.reduce((acc, curr) => acc + curr.employeeCount, 0)}</p>
                    <p className="text-[10px] text-pink-400 mt-1 font-bold">Total Employees</p>
                </CardSpotlight>
            </div>

            <div className="space-y-4">
                <DataTable
                    data={filteredData}
                    columns={columns}
                    searchPlaceholder="Search department..."
                />
            </div>
        </div>
    );
}
