'use client';

import React from 'react';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Filter, Download } from 'lucide-react';

const SPEND_TREND = [
    { month: 'Jul', it: 400, office: 240, marketing: 100 },
    { month: 'Aug', it: 300, office: 139, marketing: 200 },
    { month: 'Sep', it: 200, office: 980, marketing: 200 },
    { month: 'Oct', it: 278, office: 390, marketing: 150 },
    { month: 'Nov', it: 189, office: 480, marketing: 300 },
    { month: 'Dec', it: 239, office: 380, marketing: 250 },
];

const CATEGORY_DATA = [
    { name: 'IT Infrastructure', value: 45 },
    { name: 'Office Supplies', value: 25 },
    { name: 'Professional Services', value: 20 },
    { name: 'Marketing', value: 10 },
];

const COLORS = ['#0052CC', '#10b981', '#f59e0b', '#64748b'];

export default function SpendingAnalysisPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Spending Analysis</h1>
                    <p className="text-sm text-slate-500 mt-1">Detailed breakdown of procurement expenditure.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last 6 Months
                    </button>
                    <button className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Total Spend Card */}
                <CardSpotlight className="p-6" color="#3b82f6">
                    <h3 className="text-sm text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Spend</h3>
                    <div className="text-4xl font-black text-white mb-2">IDR 12.5B</div>
                    <p className="text-xs text-emerald-400 font-bold">+12% vs previous period</p>
                </CardSpotlight>

                {/* Avg PO Value */}
                <CardSpotlight className="p-6" color="#8b5cf6">
                    <h3 className="text-sm text-neutral-400 font-bold uppercase tracking-wider mb-2">Avg PO Value</h3>
                    <div className="text-4xl font-black text-white mb-2">IDR 850M</div>
                    <p className="text-xs text-neutral-500 font-bold">Based on 145 orders</p>
                </CardSpotlight>

                {/* Top Category */}
                <CardSpotlight className="p-6" color="#10b981">
                    <h3 className="text-sm text-neutral-400 font-bold uppercase tracking-wider mb-2">Top Category</h3>
                    <div className="text-3xl font-black text-white mb-2">IT Infra</div>
                    <p className="text-xs text-neutral-500 font-bold">45% of total budget</p>
                </CardSpotlight>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Bar Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-[#0B1120] mb-6">Spending Trend by Category</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={SPEND_TREND}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Bar dataKey="it" name="IT Infra" stackId="a" fill="#0052CC" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="office" name="Office Supplies" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="marketing" name="Marketing" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-[#0B1120] mb-6">Category Distribution</h3>
                    <div className="h-[200px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={CATEGORY_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-[#0B1120]">100%</span>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {CATEGORY_DATA.map((entry, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-slate-600">{entry.name}</span>
                                </div>
                                <span className="font-bold text-[#0B1120]">{entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
