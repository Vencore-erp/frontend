'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BUDGET_DETAIL = {
    id: '1',
    dept: 'IT Infrastructure',
    code: 'CC-102',
    type: 'CAPEX',
    allocated: 50000000000,
    used: 32500000000,
    committed: 4500000000,
    manager: 'Ahmad Rizki',
};

const MONTHLY_DATA = [
    { month: 'Jan', allocated: 4166666667, used: 3200000000 },
    { month: 'Feb', allocated: 4166666667, used: 2800000000 },
    { month: 'Mar', allocated: 4166666667, used: 4100000000 },
    { month: 'Apr', allocated: 4166666667, used: 3500000000 },
    { month: 'May', allocated: 4166666667, used: 3900000000 },
    { month: 'Jun', allocated: 4166666667, used: 4200000000 },
    { month: 'Jul', allocated: 4166666667, used: 3600000000 },
    { month: 'Aug', allocated: 4166666667, used: 3100000000 },
    { month: 'Sep', allocated: 4166666667, used: 2900000000 },
    { month: 'Oct', allocated: 4166666667, used: 1200000000 },
    { month: 'Nov', allocated: 4166666667, used: 0 },
    { month: 'Dec', allocated: 4166666667, used: 0 },
];

const TRANSACTIONS = [
    { id: 'PR-2026-0042', type: 'PR', desc: 'Server Infrastructure Upgrade', amount: 250000000, date: '2026-01-08', status: 'COMMITTED' },
    { id: 'PO-2026-0015', type: 'PO', desc: 'Network Equipment', amount: 180000000, date: '2026-01-05', status: 'UTILIZED' },
    { id: 'PO-2026-0012', type: 'PO', desc: 'Cloud Services Annual', amount: 450000000, date: '2026-01-02', status: 'UTILIZED' },
    { id: 'PR-2026-0035', type: 'PR', desc: 'Backup Storage Expansion', amount: 120000000, date: '2025-12-28', status: 'COMMITTED' },
];

export default function BudgetDetailPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const available = BUDGET_DETAIL.allocated - BUDGET_DETAIL.used - BUDGET_DETAIL.committed;
    const utilizationPercent = ((BUDGET_DETAIL.used + BUDGET_DETAIL.committed) / BUDGET_DETAIL.allocated) * 100;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/supervisor/budget" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{BUDGET_DETAIL.dept}</h1>
                    <p className="text-sm text-slate-500 mt-1">Cost Center: {BUDGET_DETAIL.code} • Manager: {BUDGET_DETAIL.manager}</p>
                </div>
                <span className={`text-sm font-bold uppercase px-3 py-1 rounded border ${BUDGET_DETAIL.type === 'CAPEX' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                    {BUDGET_DETAIL.type}
                </span>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded text-blue-600">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Allocated</p>
                                <p className="text-lg font-bold font-mono">{(BUDGET_DETAIL.allocated / 1000000000).toFixed(1)}B</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Used</p>
                                <p className="text-lg font-bold font-mono">{(BUDGET_DETAIL.used / 1000000000).toFixed(1)}B</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded text-amber-600">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Committed</p>
                                <p className="text-lg font-bold font-mono">{(BUDGET_DETAIL.committed / 1000000000).toFixed(1)}B</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded text-blue-600">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Available</p>
                                <p className="text-lg font-bold font-mono">{(available / 1000000000).toFixed(1)}B</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Utilization Bar */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Overall Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                            <div className="h-full bg-[#0052CC]" style={{ width: `${(BUDGET_DETAIL.used / BUDGET_DETAIL.allocated) * 100}%` }} />
                            <div className="h-full bg-amber-400" style={{ width: `${(BUDGET_DETAIL.committed / BUDGET_DETAIL.allocated) * 100}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>0%</span>
                            <span className="font-bold text-[#0B1120]">{utilizationPercent.toFixed(1)}% utilized</span>
                            <span>100%</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Monthly Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Monthly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-12 gap-2">
                        {MONTHLY_DATA.map((m) => {
                            const percent = (m.used / m.allocated) * 100;
                            return (
                                <div key={m.month} className="text-center">
                                    <div className="h-24 bg-slate-100 rounded relative mb-2">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-[#0052CC] rounded"
                                            style={{ height: `${Math.min(percent, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] font-medium text-slate-600">{m.month}</p>
                                    <p className="text-[9px] text-slate-400">{percent.toFixed(0)}%</p>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {TRANSACTIONS.map((txn) => (
                            <div key={txn.id} className="flex items-center justify-between p-3 border border-slate-100 rounded hover:bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded ${txn.type === 'PR' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-[#0B1120]">{txn.id}: {txn.desc}</p>
                                        <p className="text-xs text-slate-500">{txn.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-sm font-medium">{formatCurrency(txn.amount)}</p>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${txn.status === 'COMMITTED' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                        {txn.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
