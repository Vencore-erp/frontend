'use client';

import React from 'react';
import Link from 'next/link';
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    FileText,
    AlertCircle,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

// --- MOCK DATA ---
const KPI_DATA = [
    { label: 'Cash on Hand', value: 'IDR 142.5B', change: '+2.4%', trend: 'up', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'AP Aging (30+ Days)', value: 'IDR 1.2B', change: '-12%', trend: 'down', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'YTD Spending', value: 'IDR 45.2B', change: '84% of Budget', trend: 'neutral', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Invoices', value: '15', change: '5 Urgent', trend: 'alert', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const SPENDING_TREND = [
    { month: 'Jan', actual: 4500, budget: 5000 },
    { month: 'Feb', actual: 5200, budget: 5000 },
    { month: 'Mar', actual: 4800, budget: 5500 },
    { month: 'Apr', actual: 6100, budget: 6000 },
    { month: 'May', actual: 5500, budget: 6000 },
    { month: 'Jun', actual: 6700, budget: 7000 },
];

const RECENT_INVOICES = [
    { id: 'INV-2024-001', vendor: 'PT Alpha Tech', amount: 45000000, due: '2024-02-15', status: 'PENDING_APPROVAL' },
    { id: 'INV-2024-002', vendor: 'Office Solutions', amount: 12500000, due: '2024-02-10', status: 'PAYMENT_SCHEDULED' },
    { id: 'INV-2024-003', vendor: 'Global Logistics', amount: 8500000, due: '2024-01-28', status: 'OVERDUE' },
    { id: 'INV-2024-004', vendor: 'SecureDat Inc', amount: 120000000, due: '2024-03-01', status: 'VERIFIED' },
];

export default function FinanceDashboard() {
    return (
        <div className="space-y-8">

            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Finance Overview</h1>
                    <p className="text-slate-500 mt-1">Financial performance and payable status.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white">
                        <Calendar className="w-4 h-4 mr-2" /> Jan 2026
                    </Button>
                    <Link href="/finance/payments/new">
                        <Button className="bg-[#0052CC] hover:bg-blue-700">
                            <CreditCard className="w-4 h-4 mr-2" /> New Payment Batch
                        </Button>
                    </Link>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {KPI_DATA.map((kpi, idx) => (
                    <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${kpi.bg} ${kpi.color}`}>
                                    <kpi.icon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${kpi.trend === 'up' ? 'bg-emerald-50 text-emerald-600' :
                                        kpi.trend === 'down' ? 'bg-emerald-50 text-emerald-600' :
                                            kpi.trend === 'alert' ? 'bg-amber-50 text-amber-600' :
                                                'bg-slate-100 text-slate-600'
                                    }`}>
                                    {kpi.change}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{kpi.label}</h3>
                                <p className="text-2xl font-bold text-slate-900 font-mono">{kpi.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Spending Chart */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader>
                            <CardTitle className="text-base font-bold text-slate-900 flex items-center justify-between">
                                <span>Budget vs Actual Spending</span>
                                <select className="text-xs font-normal border-slate-200 rounded-md p-1 bg-slate-50 text-slate-600">
                                    <option>Last 6 Months</option>
                                    <option>YTD</option>
                                </select>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={SPENDING_TREND}>
                                        <defs>
                                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0052CC" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}M`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="actual" stroke="#0052CC" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                                        <Area type="monotone" dataKey="budget" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 opacity-80">
                                    <Briefcase className="w-5 h-5" />
                                    <span className="text-sm font-medium">Department Spend</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm opacity-60">IT Operations</span>
                                        <span className="font-mono font-bold">45%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-1.5">
                                        <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm opacity-60">Marketing</span>
                                        <span className="font-mono font-bold">28%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-1.5">
                                        <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '28%' }}></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm bg-white">
                            <CardContent className="p-6 flex flex-col justify-center items-center text-center space-y-2">
                                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-2">
                                    <DollarSign className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-slate-900">Tax Report Ready</h3>
                                <p className="text-xs text-slate-500">Q4 2025 PPN & PPH Summary is ready for review.</p>
                                <Button variant="outline" size="sm" className="mt-2 w-full">View Report</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Recent Invoices */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-sm bg-white h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-base font-bold text-slate-900">Recent Invoices</CardTitle>
                            <Link href="/finance/invoices" className="text-xs text-blue-600 hover:underline font-medium">View All</Link>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {RECENT_INVOICES.map((inv) => (
                                    <div key={inv.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                                                {inv.vendor.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{inv.vendor}</p>
                                                <p className="text-xs text-slate-500 font-mono">{inv.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900 font-mono">{(inv.amount / 1000000).toFixed(1)}M</p>
                                            <div className="flex justify-end mt-1">
                                                <StatusBadge status={inv.status} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                                <Button className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                                    Verify Queue (5)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
