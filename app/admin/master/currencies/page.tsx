'use client';

import React from 'react';
import { Plus, RefreshCw, TrendingUp } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Button } from '@/components/ui/button';

interface Currency {
    id: string;
    code: string;
    name: string;
    symbol: string;
    rate: number;
    lastUpdated: string;
    status: 'ACTIVE' | 'INACTIVE';
}

const CURRENCIES: Currency[] = [
    { id: 'CUR-001', code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', rate: 1, lastUpdated: '2026-01-06 12:00', status: 'ACTIVE' },
    { id: 'CUR-002', code: 'USD', name: 'United States Dollar', symbol: '$', rate: 15650, lastUpdated: '2026-01-06 12:00', status: 'ACTIVE' },
    { id: 'CUR-003', code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 11400, lastUpdated: '2026-01-06 12:00', status: 'ACTIVE' },
    { id: 'CUR-004', code: 'EUR', name: 'Euro', symbol: '€', rate: 16800, lastUpdated: '2026-01-06 12:00', status: 'ACTIVE' },
    { id: 'CUR-005', code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 105, lastUpdated: '2026-01-06 12:00', status: 'ACTIVE' },
];

export default function CurrenciesPage() {

    const columns: Column<Currency>[] = [
        {
            header: 'Currency',
            accessorKey: 'code',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {item.symbol}
                    </div>
                    <div>
                        <div className="font-bold text-[#0B1120]">{item.code}</div>
                        <div className="text-[10px] text-slate-500">{item.name}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Exchange Rate (to IDR)',
            accessorKey: 'rate',
            cell: (item) => (
                <div className="font-mono font-medium text-slate-700">
                    {item.rate.toLocaleString('id-ID')}
                </div>
            )
        },
        { header: 'Last Updated', accessorKey: 'lastUpdated', cell: (item) => <span className="text-xs text-slate-500 font-mono">{item.lastUpdated}</span> },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Currencies & Rates</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage exchange rates for multi-currency procurement.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Rates
                    </Button>
                    <Button className="bg-[#0052CC] hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Currency
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CardSpotlight className="p-6" color="#10b981">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Base Currency</p>
                            <p className="text-4xl font-black text-white">IDR</p>
                            <p className="text-sm text-neutral-500 mt-1">Indonesian Rupiah</p>
                        </div>
                        <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                            <span className="text-2xl font-bold text-emerald-500">Rp</span>
                        </div>
                    </div>
                </CardSpotlight>
                <CardSpotlight className="p-6" color="#f59e0b">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Active Rates</p>
                            <p className="text-4xl font-black text-white">{CURRENCIES.length}</p>
                            <p className="text-sm text-neutral-500 mt-1">Currencies supported</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 text-xs text-amber-500 font-bold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 mb-2">
                                <TrendingUp className="w-3 h-3" /> Live Updates
                            </div>
                            <span className="text-[10px] text-neutral-500">Last sync: 12:00</span>
                        </div>
                    </div>
                </CardSpotlight>
            </div>

            <div className="space-y-4">
                <DataTable
                    data={CURRENCIES}
                    columns={columns}
                    searchPlaceholder="Search currency..."
                />
            </div>
        </div>
    );
}
