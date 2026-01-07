'use client';

import React, { useState } from 'react';
import {
    Building2,
    FileText,
    ShieldCheck,
    CreditCard,
    Users,
    Bell,
    Search,
    ChevronRight,
    MoreHorizontal,
    Filter,
    Download,
    LayoutDashboard,
    Settings,
    HelpCircle,
    Menu,
    ArrowUpRight
} from 'lucide-react';
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
import { cn } from '@/lib/utils';

// --- NEXUS PROCURA DESIGN TOKENS ---
// Primary Nav: #0B1120 (Midnight Slate)
// Background: #F8FAFC (Cool Grey)
// Accent: #0052CC (Regal Blue)
// Border: #E2E8F0 (Slate-200)

// --- MOCK DATA (High Finance) ---
const KPI_METRICS = [
    { label: 'Total CAPEX Spend (YTD)', value: 'IDR 45.200.000.000', change: '+12.5%', trend: 'up' },
    { label: 'Pending Risk Review', value: '3 Items', change: 'Critical', trend: 'alert' },
    { label: 'Active Vendor Contracts', value: '1,248', change: '+14', trend: 'up' },
    { label: 'Budget Utilization', value: '78.4%', change: 'On Track', trend: 'neutral' },
];

const RECENT_TRANSACTIONS = [
    {
        id: 'PR-2026-9901',
        description: 'Core Banking Server Upgrade (Oracle Exadata)',
        requester: 'David Chen',
        dept: 'IT Infrastructure',
        vendor: 'IBM INDONESIA',
        amount: 4500000000,
        glCode: '102-339-IT-HW',
        status: 'PENDING_RISK_COMMITTEE',
        date: '06 Jan 2026',
        approver: 'Risk Committee'
    },
    {
        id: 'PR-2026-9902',
        description: 'Q1 Branch Office Supplies (Paper, Toner)',
        requester: 'Sarah Miller',
        dept: 'General Affairs',
        vendor: 'PT. GRAHA SARANA',
        amount: 125000000,
        glCode: '201-110-OPS-SUP',
        status: 'APPROVED',
        date: '06 Jan 2026',
        approver: 'Branch Manager'
    },
    {
        id: 'PR-2026-9903',
        description: 'Security Audit Consulting Services',
        requester: 'James Wilson',
        dept: 'Compliance',
        vendor: 'PWC INDONESIA',
        amount: 850000000,
        glCode: '305-550-LGL-CNS',
        status: 'AWAITING_BUDGET',
        date: '05 Jan 2026',
    }
];

// --- MOCK DATA ---
const SPENDING_DATA = [
    { month: 'Jan', amount: 45000, budget: 50000 },
    { month: 'Feb', amount: 52000, budget: 50000 },
    { month: 'Mar', amount: 48000, budget: 55000 },
    { month: 'Apr', amount: 61000, budget: 60000 },
    { month: 'May', amount: 55000, budget: 60000 },
    { month: 'Jun', amount: 67000, budget: 70000 },
];

const RECENT_ACTIVITIES = [
    { id: 1, type: 'PR', code: 'PR-2024-001', action: 'Created', user: 'Sarah J.', time: '2 mins ago', status: 'pending' },
    { id: 2, type: 'PO', code: 'PO-2024-089', action: 'Approved', user: 'Michael C.', time: '1 hour ago', status: 'success' },
    { id: 3, type: 'RFQ', code: 'RFQ-2024-012', action: 'Published', user: 'System', time: '3 hours ago', status: 'info' },
    { id: 4, type: 'PR', code: 'PR-2024-002', action: 'Rejected', user: 'David L.', time: '5 hours ago', status: 'error' },
];

const PENDING_TASKS = [
    { id: 1, title: 'Approve IT Hardware Requisition', priority: 'High', due: 'Today' },
    { id: 2, title: 'Review Vendor Contracts for 2024', priority: 'Medium', due: 'Tomorrow' },
    { id: 3, title: 'Sign off Monthly Budget Report', priority: 'High', due: 'In 2 days' },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            {/* --- SIDEBAR (Shared Component) --- */}
            <Sidebar role="OPERATOR" />

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">

                {/* --- HEADER --- */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
                    {/* Search Bar */}
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                            placeholder="Search PR, PO, Vendors..."
                            className="pl-10 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-[#0052CC]/20 transition-all font-medium text-sm"
                        />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" className="hidden md:flex text-slate-600 border-slate-200 font-medium">
                            <Clock className="w-4 h-4 mr-2" />
                            History
                        </Button>
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-[#0052CC] hover:bg-blue-50">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </Button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0052CC] to-blue-400 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-lg">
                            AP
                        </div>
                    </div>
                </header>

                {/* --- SCROLLABLE CONTENT AREA --- */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 pb-20">

                    {/* Page Header */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                            <p className="text-slate-500 mt-1 text-sm font-medium">Welcome back, Alexander. Here's what's happening today.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="font-medium text-slate-700 bg-white border-slate-300 shadow-sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                            <Button className="font-bold bg-[#0052CC] hover:bg-blue-700 shadow-lg shadow-blue-900/20">
                                + Create Requisition
                            </Button>
                        </div>
                    </div>

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Spending', value: '$1,240,500', trend: '+12.5%', trendUp: true, icon: AlertCircle },
                            { label: 'Active PRs', value: '24', trend: '-2 from last week', trendUp: false, icon: Clock },
                            { label: 'Pending Approvals', value: '7', trend: 'Urgent attention', trendUp: false, color: 'text-amber-600', icon: AlertCircle },
                            { label: 'Vendors Onboarded', value: '158', trend: '+5 this month', trendUp: true, icon: CheckCircle2 }
                        ].map((stat, i) => (
                            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white group">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-lg ${stat.color ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'} group-hover:scale-110 transition-transform`}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                        {stat.trendUp !== undefined && (
                                            <div className={`flex items-center text-xs font-bold ${stat.trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'} px-2 py-1 rounded-full`}>
                                                {stat.trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                                {stat.trend.split(' ')[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</h3>
                                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* CHARTS SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Chart */}
                        <Card className="lg:col-span-2 border-0 shadow-sm bg-white">
                            <CardHeader>
                                <CardTitle className="text-base font-bold text-slate-900">Budget vs Actual Spending</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={SPENDING_DATA}>
                                            <defs>
                                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#0052CC" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#0052CC" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Area type="monotone" dataKey="amount" stroke="#0052CC" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" activeDot={{ r: 6, strokeWidth: 0 }} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="border-0 shadow-sm bg-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-bold text-slate-900">Pending Tasks</CardTitle>
                                <Badge variant="secondary" className="bg-blue-50 text-[#0052CC] font-bold">3 New</Badge>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-4">
                                    {PENDING_TASKS.map((task) => (
                                        <div key={task.id} className="p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className={`${task.priority === 'High' ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'} border-0 px-2 py-0.5 text-[10px]`}>
                                                    {task.priority}
                                                </Badge>
                                                <span className="text-[10px] font-medium text-slate-400">{task.due}</span>
                                            </div>
                                            <h4 className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-[#0052CC] transition-colors">{task.title}</h4>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full text-xs font-bold text-slate-500 hover:text-[#0052CC] mt-2">
                                        View All Tasks
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RECENT TRANSACTIONS TABLE */}
                    <Card className="border-0 shadow-sm bg-white overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-base font-bold text-slate-900">Recent Activities</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-3 font-bold">Code</th>
                                        <th className="px-6 py-3 font-bold">Type</th>
                                        <th className="px-6 py-3 font-bold">Action</th>
                                        <th className="px-6 py-3 font-bold">User</th>
                                        <th className="px-6 py-3 font-bold">Time</th>
                                        <th className="px-6 py-3 font-bold text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {RECENT_ACTIVITIES.map((activity) => (
                                        <tr key={activity.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900">{activity.code}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant="outline" className="text-slate-500 border-slate-200 font-medium">
                                                    {activity.type}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-slate-700">{activity.action}</td>
                                            <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                    {activity.user.charAt(0)}
                                                </div>
                                                {activity.user}
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 text-xs">{activity.time}</td>
                                            <td className="px-6 py-4 text-right">
                                                {activity.status === 'success' && <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500"></span>}
                                                {activity.status === 'pending' && <span className="inline-flex w-2.5 h-2.5 rounded-full bg-amber-400"></span>}
                                                {activity.status === 'error' && <span className="inline-flex w-2.5 h-2.5 rounded-full bg-rose-500"></span>}
                                                {activity.status === 'info' && <span className="inline-flex w-2.5 h-2.5 rounded-full bg-blue-500"></span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                </div>
            </main>
        </div>
    );
}
