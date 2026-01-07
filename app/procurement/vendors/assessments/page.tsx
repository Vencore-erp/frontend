'use client';

import React from 'react';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Star, AlertCircle } from 'lucide-react';

const PERFORMANCE_DATA = [
    { month: 'Jul', score: 85 },
    { month: 'Aug', score: 88 },
    { month: 'Sep', score: 82 },
    { month: 'Oct', score: 90 },
    { month: 'Nov', score: 87 },
    { month: 'Dec', score: 92 },
];

const TOP_VENDORS = [
    { name: 'IBM INDONESIA', score: 95, category: 'IT Solutions', trend: 'up' },
    { name: 'GRAHA SARANA', score: 94, category: 'Furniture', trend: 'up' },
    { name: 'AUTO DEALER JAYA', score: 91, category: 'Fleet', trend: 'flat' },
];

const RISK_VENDORS = [
    { name: 'OFFICE SUPPLIES CO', score: 65, issue: 'Late Delivery', trend: 'down' },
    { name: 'NETWORKS LTD', score: 68, issue: 'Quality Issues', trend: 'down' },
];

export default function VendorAssessments() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Vendor Scorecards & Performance</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Metric Card */}
                <CardSpotlight className="lg:col-span-2 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Average Vendor Score</h3>
                            <p className="text-neutral-400 text-sm">Overall performance across all categories (Last 6 Months)</p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold text-emerald-400">89.2</p>
                            <p className="text-xs text-emerald-500 font-bold flex items-center justify-end gap-1">
                                <TrendingUp className="w-3 h-3" /> +2.4% vs last Q
                            </p>
                        </div>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={PERFORMANCE_DATA}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="month" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardSpotlight>

                {/* Top Performers */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-[#0B1120] flex items-center gap-2 mb-4">
                            <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Top Performers
                        </h3>
                        <div className="space-y-4">
                            {TOP_VENDORS.map((v, i) => (
                                <div key={i} className="flex justify-between items-center pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-bold text-[#0B1120]">{v.name}</p>
                                        <p className="text-xs text-slate-500">{v.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-emerald-600">{v.score}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm border-l-4 border-l-rose-500">
                        <h3 className="font-bold text-[#0B1120] flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-rose-500" /> At Risk
                        </h3>
                        <div className="space-y-4">
                            {RISK_VENDORS.map((v, i) => (
                                <div key={i} className="flex justify-between items-center pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-bold text-[#0B1120]">{v.name}</p>
                                        <p className="text-xs text-rose-500">{v.issue}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-rose-600">{v.score}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
