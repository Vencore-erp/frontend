'use client';

import React, { useState } from 'react';
import { LogIn, Monitor, Smartphone, Globe, CheckCircle, XCircle, AlertTriangle, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, Column } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

interface LoginRecord {
    id: string;
    username: string;
    email: string;
    ipAddress: string;
    device: string;
    browser: string;
    location: string;
    loginTime: string;
    status: 'SUCCESS' | 'FAILED' | 'BLOCKED';
    failReason?: string;
}

const LOGIN_HISTORY: LoginRecord[] = [
    { id: '1', username: 'ahmad.rizki', email: 'ahmad.rizki@company.com', ipAddress: '192.168.1.100', device: 'Desktop', browser: 'Chrome 120', location: 'Jakarta, ID', loginTime: '2026-01-08 10:30:45', status: 'SUCCESS' },
    { id: '2', username: 'dewi.sartika', email: 'dewi.sartika@company.com', ipAddress: '192.168.1.105', device: 'Mobile', browser: 'Safari 17', location: 'Jakarta, ID', loginTime: '2026-01-08 09:15:22', status: 'SUCCESS' },
    { id: '3', username: 'unknown', email: 'admin@company.com', ipAddress: '45.33.32.156', device: 'Desktop', browser: 'Firefox 121', location: 'Singapore, SG', loginTime: '2026-01-08 08:45:11', status: 'FAILED', failReason: 'Invalid password' },
    { id: '4', username: 'budi.santoso', email: 'budi.santoso@company.com', ipAddress: '192.168.1.112', device: 'Desktop', browser: 'Edge 120', location: 'Jakarta, ID', loginTime: '2026-01-08 08:30:00', status: 'SUCCESS' },
    { id: '5', username: 'unknown', email: 'test@test.com', ipAddress: '103.21.244.0', device: 'Desktop', browser: 'Chrome 119', location: 'Unknown', loginTime: '2026-01-08 03:22:15', status: 'BLOCKED', failReason: 'Suspicious activity' },
    { id: '6', username: 'siti.nurhaliza', email: 'siti.nurhaliza@company.com', ipAddress: '192.168.1.108', device: 'Mobile', browser: 'Chrome Mobile', location: 'Bandung, ID', loginTime: '2026-01-07 17:45:30', status: 'SUCCESS' },
];

export default function LoginHistoryPage() {
    const [filter, setFilter] = useState('ALL');

    const filteredData = filter === 'ALL' ? LOGIN_HISTORY : LOGIN_HISTORY.filter(l => l.status === filter);

    const successCount = LOGIN_HISTORY.filter(l => l.status === 'SUCCESS').length;
    const failedCount = LOGIN_HISTORY.filter(l => l.status === 'FAILED').length;
    const blockedCount = LOGIN_HISTORY.filter(l => l.status === 'BLOCKED').length;

    const columns: Column<LoginRecord>[] = [
        {
            header: 'User',
            accessorKey: 'username',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${item.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600' :
                            item.status === 'FAILED' ? 'bg-amber-50 text-amber-600' :
                                'bg-rose-50 text-rose-600'
                        }`}>
                        <LogIn className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="font-medium text-[#0B1120]">{item.username}</p>
                        <p className="text-xs text-slate-500">{item.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'IP Address',
            accessorKey: 'ipAddress',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span className="font-mono text-sm">{item.ipAddress}</span>
                </div>
            )
        },
        {
            header: 'Device',
            accessorKey: 'device',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    {item.device === 'Desktop' ?
                        <Monitor className="w-4 h-4 text-slate-400" /> :
                        <Smartphone className="w-4 h-4 text-slate-400" />
                    }
                    <div>
                        <p className="text-sm text-slate-700">{item.device}</p>
                        <p className="text-xs text-slate-500">{item.browser}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Location',
            accessorKey: 'location',
            cell: (item) => <span className="text-sm text-slate-600">{item.location}</span>
        },
        {
            header: 'Time',
            accessorKey: 'loginTime',
            cell: (item) => <span className="text-sm text-slate-500">{item.loginTime}</span>
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (item) => (
                <div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${item.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' :
                            item.status === 'FAILED' ? 'bg-amber-100 text-amber-700' :
                                'bg-rose-100 text-rose-700'
                        }`}>
                        {item.status === 'SUCCESS' && <CheckCircle className="w-3 h-3" />}
                        {item.status === 'FAILED' && <XCircle className="w-3 h-3" />}
                        {item.status === 'BLOCKED' && <AlertTriangle className="w-3 h-3" />}
                        {item.status}
                    </span>
                    {item.failReason && (
                        <p className="text-[10px] text-slate-500 mt-1">{item.failReason}</p>
                    )}
                </div>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Login History</h1>
                    <p className="text-sm text-slate-500 mt-1">Monitor user login activities and security events.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export Logs
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded text-slate-600">
                                <LogIn className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Total Logins (24h)</p>
                                <p className="text-2xl font-bold">{LOGIN_HISTORY.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Successful</p>
                                <p className="text-2xl font-bold text-emerald-600">{successCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded text-amber-600">
                                <XCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Failed</p>
                                <p className="text-2xl font-bold text-amber-600">{failedCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-rose-500">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 rounded text-rose-600">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Blocked</p>
                                <p className="text-2xl font-bold text-rose-600">{blockedCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-slate-400" />
                <div className="flex gap-2">
                    {['ALL', 'SUCCESS', 'FAILED', 'BLOCKED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${filter === status
                                    ? 'bg-[#0052CC] text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <DataTable
                data={filteredData}
                columns={columns}
                searchPlaceholder="Search by username, email, or IP..."
            />
        </div>
    );
}
