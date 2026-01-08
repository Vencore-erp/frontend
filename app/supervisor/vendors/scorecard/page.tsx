'use client';

import React, { useState } from 'react';
import { Building, Star, TrendingUp, TrendingDown, Award, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VendorScore {
    id: string;
    vendorCode: string;
    vendorName: string;
    category: string;
    qualityScore: number;
    deliveryScore: number;
    responsivenessScore: number;
    overallScore: number;
    totalPOs: number;
    trend: 'UP' | 'DOWN' | 'STABLE';
}

const VENDOR_SCORES: VendorScore[] = [
    { id: '1', vendorCode: 'VND-001', vendorName: 'PT Teknologi Maju', category: 'IT Equipment', qualityScore: 92, deliveryScore: 88, responsivenessScore: 95, overallScore: 92, totalPOs: 24, trend: 'UP' },
    { id: '2', vendorCode: 'VND-002', vendorName: 'CV Sumber Makmur', category: 'Office Supplies', qualityScore: 85, deliveryScore: 90, responsivenessScore: 82, overallScore: 86, totalPOs: 45, trend: 'STABLE' },
    { id: '3', vendorCode: 'VND-003', vendorName: 'PT Solusi Digital', category: 'Software', qualityScore: 95, deliveryScore: 85, responsivenessScore: 90, overallScore: 90, totalPOs: 12, trend: 'UP' },
    { id: '4', vendorCode: 'VND-004', vendorName: 'PT Jaya Abadi', category: 'Furniture', qualityScore: 78, deliveryScore: 72, responsivenessScore: 80, overallScore: 77, totalPOs: 8, trend: 'DOWN' },
    { id: '5', vendorCode: 'VND-005', vendorName: 'CV Prima Mandiri', category: 'Stationery', qualityScore: 88, deliveryScore: 92, responsivenessScore: 85, overallScore: 88, totalPOs: 32, trend: 'UP' },
];

const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-amber-600 bg-amber-50';
    return 'text-rose-600 bg-rose-50';
};

const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (score >= 80) return { label: 'Good', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    if (score >= 70) return { label: 'Average', color: 'bg-amber-100 text-amber-700 border-amber-200' };
    return { label: 'Below Average', color: 'bg-rose-100 text-rose-700 border-rose-200' };
};

export default function VendorScorecardPage() {
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const categories = ['ALL', ...new Set(VENDOR_SCORES.map(v => v.category))];
    const filteredVendors = selectedCategory === 'ALL'
        ? VENDOR_SCORES
        : VENDOR_SCORES.filter(v => v.category === selectedCategory);

    const sortedVendors = [...filteredVendors].sort((a, b) => b.overallScore - a.overallScore);
    const avgScore = Math.round(VENDOR_SCORES.reduce((acc, v) => acc + v.overallScore, 0) / VENDOR_SCORES.length);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Vendor Scorecard</h1>
                    <p className="text-sm text-slate-500 mt-1">Performance rankings and evaluations for all vendors.</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export Report
                </Button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded text-blue-600">
                                <Building className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Total Vendors</p>
                                <p className="text-2xl font-bold">{VENDOR_SCORES.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                                <Star className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Avg Score</p>
                                <p className="text-2xl font-bold">{avgScore}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded text-amber-600">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Top Performer</p>
                                <p className="text-lg font-bold truncate">{sortedVendors[0]?.vendorName}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 rounded text-rose-600">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Needs Improvement</p>
                                <p className="text-2xl font-bold">{VENDOR_SCORES.filter(v => v.overallScore < 80).length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-slate-400" />
                <div className="flex gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${selectedCategory === cat
                                    ? 'bg-[#0052CC] text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scorecard Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Vendor Rankings</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Rank</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Vendor</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Quality</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Delivery</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Responsiveness</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Overall</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {sortedVendors.map((vendor, idx) => {
                                const badge = getScoreBadge(vendor.overallScore);
                                return (
                                    <tr key={vendor.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-amber-100 text-amber-700' :
                                                    idx === 1 ? 'bg-slate-200 text-slate-700' :
                                                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                                                            'bg-slate-100 text-slate-500'
                                                }`}>
                                                {idx + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 rounded">
                                                    <Building className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#0B1120]">{vendor.vendorName}</p>
                                                    <p className="text-xs text-slate-500">{vendor.vendorCode} • {vendor.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-block px-2 py-1 rounded font-mono text-sm font-bold ${getScoreColor(vendor.qualityScore)}`}>
                                                {vendor.qualityScore}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-block px-2 py-1 rounded font-mono text-sm font-bold ${getScoreColor(vendor.deliveryScore)}`}>
                                                {vendor.deliveryScore}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-block px-2 py-1 rounded font-mono text-sm font-bold ${getScoreColor(vendor.responsivenessScore)}`}>
                                                {vendor.responsivenessScore}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xl font-bold text-[#0B1120]">{vendor.overallScore}</span>
                                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${badge.color}`}>
                                                    {badge.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {vendor.trend === 'UP' && <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto" />}
                                            {vendor.trend === 'DOWN' && <TrendingDown className="w-5 h-5 text-rose-500 mx-auto" />}
                                            {vendor.trend === 'STABLE' && <span className="text-slate-400">—</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}
