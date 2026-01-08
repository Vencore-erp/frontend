'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, FileText, Calendar, AlertTriangle } from 'lucide-react';
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
    fiscalYear: 'FY 2026',
};

const MONTHLY_DATA = [
    { month: 'Jan', allocated: 4166666667, used: 3200000000, committed: 500000000 },
    { month: 'Feb', allocated: 4166666667, used: 2800000000, committed: 350000000 },
    { month: 'Mar', allocated: 4166666667, used: 4100000000, committed: 200000000 },
    { month: 'Apr', allocated: 4166666667, used: 3500000000, committed: 450000000 },
    { month: 'May', allocated: 4166666667, used: 3900000000, committed: 300000000 },
    { month: 'Jun', allocated: 4166666667, used: 4200000000, committed: 150000000 },
    { month: 'Jul', allocated: 4166666667, used: 3600000000, committed: 400000000 },
    { month: 'Aug', allocated: 4166666667, used: 3100000000, committed: 550000000 },
    { month: 'Sep', allocated: 4166666667, used: 2900000000, committed: 600000000 },
    { month: 'Oct', allocated: 4166666667, used: 1200000000, committed: 1000000000 },
    { month: 'Nov', allocated: 4166666667, used: 0, committed: 0 },
    { month: 'Dec', allocated: 4166666667, used: 0, committed: 0 },
];

const TRANSACTIONS = [
    { id: 'INV-2026-0156', type: 'Invoice', desc: 'Server Infrastructure - PT Teknologi Maju', amount: 125000000, date: '2026-01-08', status: 'PAID' },
    { id: 'PO-2026-0015', type: 'PO', desc: 'Network Equipment Purchase', amount: 180000000, date: '2026-01-05', status: 'ACTIVE' },
    { id: 'INV-2026-0148', type: 'Invoice', desc: 'Cloud Services - PT Solusi Digital', amount: 450000000, date: '2026-01-02', status: 'VERIFIED' },
    { id: 'PR-2026-0042', type: 'PR', desc: 'New Server Cluster', amount: 250000000, date: '2025-12-28', status: 'COMMITTED' },
    { id: 'INV-2025-0982', type: 'Invoice', desc: 'Annual Maintenance', amount: 85000000, date: '2025-12-20', status: 'PAID' },
];

export default function FinanceBudgetDetailPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const available = BUDGET_DETAIL.allocated - BUDGET_DETAIL.used - BUDGET_DETAIL.committed;
    const utilizationPercent = ((BUDGET_DETAIL.used + BUDGET_DETAIL.committed) / BUDGET_DETAIL.allocated) * 100;
    const isNearLimit = utilizationPercent > 85;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/finance/budget" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{BUDGET_DETAIL.dept}</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {BUDGET_DETAIL.code} • {BUDGET_DETAIL.fiscalYear} • Manager: {BUDGET_DETAIL.manager}
                    </p>
                </div>
                <span className={`text-sm font-bold uppercase px-3 py-1 rounded border ${BUDGET_DETAIL.type === 'CAPEX' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                    {BUDGET_DETAIL.type}
                </span>
            </div>

            {/* Alert if near limit */}
            {isNearLimit && (
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <div>
                        <p className="font-medium text-rose-800">Budget Alert</p>
                        <p className="text-sm text-rose-700">This cost center has utilized {utilizationPercent.toFixed(1)}% of allocated budget.</p>
                    </div>
                </div>
            )}

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
                                <p className="text-xs text-slate-500">Spent</p>
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
                    <CardTitle className="text-base">Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex">
                            <div className="h-full bg-[#0052CC]" style={{ width: `${(BUDGET_DETAIL.used / BUDGET_DETAIL.allocated) * 100}%` }} />
                            <div className="h-full bg-amber-400" style={{ width: `${(BUDGET_DETAIL.committed / BUDGET_DETAIL.allocated) * 100}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>0%</span>
                            <span className={`font-bold ${isNearLimit ? 'text-rose-600' : 'text-[#0B1120]'}`}>
                                {utilizationPercent.toFixed(1)}% utilized
                            </span>
                            <span>100%</span>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 bg-[#0052CC] rounded" />
                                <span className="text-slate-600">Spent ({((BUDGET_DETAIL.used / BUDGET_DETAIL.allocated) * 100).toFixed(1)}%)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 bg-amber-400 rounded" />
                                <span className="text-slate-600">Committed ({((BUDGET_DETAIL.committed / BUDGET_DETAIL.allocated) * 100).toFixed(1)}%)</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Monthly Breakdown Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Monthly Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Month</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Allocated</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Spent</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Committed</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Variance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MONTHLY_DATA.map((m) => {
                                const variance = m.allocated - m.used - m.committed;
                                return (
                                    <tr key={m.month} className="hover:bg-slate-50">
                                        <td className="px-6 py-3 font-medium text-slate-700">{m.month}</td>
                                        <td className="px-6 py-3 text-right font-mono text-sm">{formatCurrency(m.allocated)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-sm">{formatCurrency(m.used)}</td>
                                        <td className="px-6 py-3 text-right font-mono text-sm text-amber-600">{formatCurrency(m.committed)}</td>
                                        <td className={`px-6 py-3 text-right font-mono text-sm font-medium ${variance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
                                    <div className={`p-2 rounded ${txn.type === 'Invoice' ? 'bg-emerald-50 text-emerald-600' :
                                            txn.type === 'PO' ? 'bg-blue-50 text-blue-600' :
                                                'bg-amber-50 text-amber-600'
                                        }`}>
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-[#0B1120]">{txn.id}</p>
                                        <p className="text-xs text-slate-500">{txn.desc}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-sm font-medium">{formatCurrency(txn.amount)}</p>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${txn.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                                            txn.status === 'COMMITTED' ? 'bg-amber-100 text-amber-700' :
                                                'bg-blue-100 text-blue-700'
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
