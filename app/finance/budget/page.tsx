'use client';

import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, PieChart, DollarSign } from 'lucide-react';

const BUDGET_DATA = [
    { dept: 'IT Infrastructure', code: 'CC-102', type: 'CAPEX', allocated: 50000000000, used: 32500000000, committed: 4500000000 },
    { dept: 'IT Operations', code: 'CC-103', type: 'OPEX', allocated: 12000000000, used: 8500000000, committed: 150000000 },
    { dept: 'General Affairs', code: 'CC-201', type: 'OPEX', allocated: 5000000000, used: 4200000000, committed: 300000000 },
    { dept: 'Marketing', code: 'CC-301', type: 'OPEX', allocated: 8000000000, used: 7200000000, committed: 50000000 },
    { dept: 'Compliance', code: 'CC-401', type: 'OPEX', allocated: 3000000000, used: 1500000000, committed: 850000000 },
];

export default function BudgetOverviewPage() {
    const totalAllocated = BUDGET_DATA.reduce((acc, b) => acc + b.allocated, 0);
    const totalUsed = BUDGET_DATA.reduce((acc, b) => acc + b.used, 0);
    const totalCommitted = BUDGET_DATA.reduce((acc, b) => acc + b.committed, 0);
    const overallUtilization = ((totalUsed + totalCommitted) / totalAllocated) * 100;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Budget Overview</h1>
                    <p className="text-sm text-slate-500 mt-1">Monitor department budgets and spending trends.</p>
                </div>
                <div className="flex gap-3">
                    <select className="text-sm border border-slate-300 rounded px-3 py-2 bg-white">
                        <option>FY 2026</option>
                        <option>FY 2025</option>
                    </select>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 rounded text-blue-600">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Allocated</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">IDR {(totalAllocated / 1000000000).toFixed(1)}B</p>
                    <p className="text-xs text-slate-500 mt-1">Across {BUDGET_DATA.length} cost centers</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Spent</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">IDR {(totalUsed / 1000000000).toFixed(1)}B</p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">{((totalUsed / totalAllocated) * 100).toFixed(1)}% of total</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-50 rounded text-amber-600">
                            <PieChart className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Committed</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">IDR {(totalCommitted / 1000000000).toFixed(1)}B</p>
                    <p className="text-xs text-amber-600 mt-1 font-medium">Reserved by pending PRs</p>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 rounded text-blue-600">
                            <TrendingDown className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">IDR {((totalAllocated - totalUsed - totalCommitted) / 1000000000).toFixed(1)}B</p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">{(100 - overallUtilization).toFixed(1)}% remaining</p>
                </div>
            </div>

            {/* Budget Table */}
            <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider">Budget by Cost Center</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Allocated</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Used</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-48">Utilization</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {BUDGET_DATA.map((budget, idx) => {
                            const usedPercent = (budget.used / budget.allocated) * 100;
                            const committedPercent = (budget.committed / budget.allocated) * 100;
                            const totalPercent = usedPercent + committedPercent;
                            const isNearLimit = totalPercent > 85;

                            return (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-[#0B1120]">{budget.dept}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs text-slate-500">{budget.code}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${budget.type === 'CAPEX'
                                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                : 'bg-blue-50 text-blue-700 border-blue-200'
                                            }`}>
                                            {budget.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-mono text-sm">{(budget.allocated / 1000000000).toFixed(1)}B</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-mono text-sm font-medium">{(budget.used / 1000000000).toFixed(1)}B</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden flex">
                                                    <div
                                                        className="h-full bg-[#0052CC]"
                                                        style={{ width: `${usedPercent}%` }}
                                                    />
                                                    <div
                                                        className="h-full bg-amber-400"
                                                        style={{ width: `${committedPercent}%` }}
                                                    />
                                                </div>
                                                <span className={`text-xs font-mono font-bold ${isNearLimit ? 'text-rose-600' : 'text-slate-600'}`}>
                                                    {totalPercent.toFixed(0)}%
                                                </span>
                                                {isNearLimit && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#0052CC] rounded" />
                    <span>Used</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-400 rounded" />
                    <span>Committed (Pending PRs)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-100 rounded border border-slate-200" />
                    <span>Available</span>
                </div>
            </div>

        </div>
    );
}
