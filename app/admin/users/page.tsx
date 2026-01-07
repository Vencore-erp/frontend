'use client';

import React, { useState } from 'react';
import { Plus, Download, Edit, UserX, KeyRound, Users, Shield, UserCheck, Activity } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import Link from 'next/link';

const USERS = [
    { id: 'USR-001', name: 'Alexander Pierce', email: 'alexander.p@company.com', role: 'OPERATOR', dept: 'IT Operations', status: 'ACTIVE', lastLogin: '2026-01-06 10:42' },
    { id: 'USR-002', name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'SUPERVISOR', dept: 'Procurement', status: 'ACTIVE', lastLogin: '2026-01-06 09:15' },
    { id: 'USR-003', name: 'Michael Chen', email: 'michael.c@company.com', role: 'FINANCE', dept: 'Treasury', status: 'ACTIVE', lastLogin: '2026-01-05 16:30' },
    { id: 'USR-004', name: 'Emily Davis', email: 'emily.d@company.com', role: 'OPERATOR', dept: 'General Affairs', status: 'INACTIVE', lastLogin: '2025-12-20 08:00' },
    { id: 'USR-005', name: 'Robert Wilson', email: 'robert.w@company.com', role: 'ADMIN', dept: 'IT Security', status: 'ACTIVE', lastLogin: '2026-01-06 11:00' },
    { id: 'USR-006', name: 'Lina Kusuma', email: 'lina.k@company.com', role: 'OPERATOR', dept: 'Logistics', status: 'ACTIVE', lastLogin: '2026-01-06 08:30' },
    { id: 'USR-007', name: 'David Lee', email: 'david.l@company.com', role: 'VENDOR_MGR', dept: 'Procurement', status: 'PENDING', lastLogin: '-' },
];

export default function UserListPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    const filteredUsers = activeTab === 'ALL'
        ? USERS
        : USERS.filter(u => u.status === activeTab);

    type User = typeof USERS[0];

    const columns: Column<User>[] = [
        {
            header: 'User',
            accessorKey: 'name',
            cell: (item: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-[#0052CC]">
                        {item.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <Link href={`/admin/users/${item.id}`} className="font-bold text-[#0B1120] hover:text-[#0052CC] transition-colors">
                            {item.name}
                        </Link>
                        <div className="text-[11px] text-slate-500 font-medium">{item.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Role / Dept',
            accessorKey: 'role',
            cell: (item: any) => (
                <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border mb-1 inline-block
                        ${item.role === 'ADMIN' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            item.role === 'SUPERVISOR' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                'bg-blue-50 text-blue-700 border-blue-200'}`}>
                        {item.role}
                    </span>
                    <div className="text-xs text-slate-500">{item.dept}</div>
                </div>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item: any) => <StatusBadge status={item.status} /> },
        {
            header: 'Last Login',
            accessorKey: 'lastLogin',
            cell: (item: any) => (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Activity className="w-3 h-3 text-slate-400" />
                    {item.lastLogin}
                </div>
            )
        },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item: any) => (
                <div className="flex items-center gap-1">
                    <Link href={`/admin/users/${item.id}`} className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-[#0052CC] transition-colors" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                    </Link>
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-amber-600 transition-colors" title="Reset Password">
                        <KeyRound className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-rose-600 transition-colors" title="Deactivate">
                        <UserX className="w-3.5 h-3.5" />
                    </button>
                </div>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">User Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage internal users, access roles, and security permissions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </button>
                    <Link href="/admin/users/new" className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New User
                    </Link>
                </div>
            </div>

            {/* Stats Cards with Aceternity UI */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <CardSpotlight className="p-6 h-32" color="#3b82f6">
                    <div className="absolute top-4 right-4 p-2 bg-blue-500/20 rounded-lg">
                        <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Users</p>
                    <p className="text-3xl font-black text-white">{USERS.length}</p>
                    <p className="text-[10px] text-blue-400 mt-1 font-bold">+3 this week</p>
                </CardSpotlight>

                <CardSpotlight className="p-6 h-32" color="#10b981">
                    <div className="absolute top-4 right-4 p-2 bg-emerald-500/20 rounded-lg">
                        <UserCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Active Now</p>
                    <p className="text-3xl font-black text-white">4</p>
                    <p className="text-[10px] text-emerald-400 mt-1 font-bold">Online sessions</p>
                </CardSpotlight>

                <CardSpotlight className="p-6 h-32" color="#8b5cf6">
                    <div className="absolute top-4 right-4 p-2 bg-purple-500/20 rounded-lg">
                        <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Admins</p>
                    <p className="text-3xl font-black text-white">2</p>
                    <p className="text-[10px] text-purple-400 mt-1 font-bold">Full access</p>
                </CardSpotlight>

                <CardSpotlight className="p-6 h-32" color="#f59e0b">
                    <div className="absolute top-4 right-4 p-2 bg-amber-500/20 rounded-lg">
                        <KeyRound className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Pending</p>
                    <p className="text-3xl font-black text-white">1</p>
                    <p className="text-[10px] text-amber-400 mt-1 font-bold">Awaiting activation</p>
                </CardSpotlight>
            </div>

            {/* Filter Tabs & Table */}
            <div className="space-y-4">
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-8">
                        {['ALL', 'ACTIVE', 'INACTIVE', 'PENDING'].map((tab) => (
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
                                <span className={`ml-2 py-0.5 px-2 rounded-full text-[10px] font-bold ${activeTab === tab ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {tab === 'ALL' ? USERS.length : USERS.filter(u => u.status === tab).length}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                <DataTable
                    data={filteredUsers}
                    columns={columns}
                />
            </div>
        </div>
    );
}
