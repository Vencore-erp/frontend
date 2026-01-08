'use client';

import React, { useState } from 'react';
import { Plus, Percent, Edit2, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TaxRate {
    id: string;
    name: string;
    code: string;
    rate: number;
    type: 'PPN' | 'PPH21' | 'PPH22' | 'PPH23' | 'PPH4_2' | 'OTHER';
    description: string;
    isActive: boolean;
}

const TAX_RATES: TaxRate[] = [
    { id: '1', name: 'PPN Standard', code: 'PPN-11', rate: 11, type: 'PPN', description: 'Value Added Tax (Standard Rate)', isActive: true },
    { id: '2', name: 'PPh 21 (Gross Up)', code: 'PPH21-GU', rate: 5, type: 'PPH21', description: 'Income Tax Art. 21 - Gross Up Method', isActive: true },
    { id: '3', name: 'PPh 22 Import', code: 'PPH22-IMP', rate: 7.5, type: 'PPH22', description: 'Income Tax Art. 22 - Importers', isActive: true },
    { id: '4', name: 'PPh 23 Services', code: 'PPH23-SVC', rate: 2, type: 'PPH23', description: 'Income Tax Art. 23 - Services', isActive: true },
    { id: '5', name: 'PPh 23 Royalty', code: 'PPH23-ROY', rate: 15, type: 'PPH23', description: 'Income Tax Art. 23 - Royalties', isActive: true },
    { id: '6', name: 'PPh 4(2) Construction', code: 'PPH42-CON', rate: 3, type: 'PPH4_2', description: 'Income Tax Art. 4(2) - Construction Services', isActive: true },
    { id: '7', name: 'PPh 4(2) Rental', code: 'PPH42-RNT', rate: 10, type: 'PPH4_2', description: 'Income Tax Art. 4(2) - Property Rental', isActive: false },
];

export default function TaxConfigurationPage() {
    const [taxes, setTaxes] = useState<TaxRate[]>(TAX_RATES);
    const [editingId, setEditingId] = useState<string | null>(null);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'PPN': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'PPH21': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'PPH22': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'PPH23': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'PPH4_2': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Tax Configuration</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage tax rates for PPN, PPh, and other tax types.</p>
                </div>
                <Button className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2">
                    <Plus className="w-4 h-4" /> Add Tax Rate
                </Button>
            </div>

            {/* Tax Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-500 uppercase">PPN Rate</p>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700">Active</span>
                        </div>
                        <p className="text-2xl font-bold font-mono text-[#0B1120] mt-2">11%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-500 uppercase">PPh 23 Services</p>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Active</span>
                        </div>
                        <p className="text-2xl font-bold font-mono text-[#0B1120] mt-2">2%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-500 uppercase">Total Configs</p>
                        </div>
                        <p className="text-2xl font-bold text-[#0B1120] mt-2">{taxes.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-500 uppercase">Active Rates</p>
                        </div>
                        <p className="text-2xl font-bold text-[#0B1120] mt-2">{taxes.filter(t => t.isActive).length}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tax Rates Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Percent className="w-5 h-5 text-slate-400" />
                        Tax Rates
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Code</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Rate</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {taxes.map((tax) => (
                                <tr key={tax.id} className={`hover:bg-slate-50 ${!tax.isActive ? 'opacity-50' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-[#0B1120]">{tax.name}</p>
                                            <p className="text-xs text-slate-500">{tax.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-sm text-slate-600">{tax.code}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getTypeColor(tax.type)}`}>
                                            {tax.type.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-mono text-lg font-bold text-[#0B1120]">{tax.rate}%</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tax.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {tax.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-[#0052CC]">
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500 hover:text-rose-600">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {/* Info */}
            <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded border border-slate-200">
                <p className="font-medium text-slate-700 mb-1">Note:</p>
                <p>Changes to tax rates will apply to new transactions only. Existing transactions will retain their original tax calculations.</p>
            </div>
        </div>
    );
}
