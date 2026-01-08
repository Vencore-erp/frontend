'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Building, Mail, Phone, MapPin, FileText, Calendar, Star, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

const VENDOR_DETAIL = {
    id: '1',
    code: 'VND-001',
    name: 'PT Teknologi Maju',
    category: 'IT Equipment',
    status: 'ACTIVE',
    rating: 91,
    joinDate: '2024-05-12',
    email: 'contact@teknologimaju.com',
    phone: '(021) 555-0123',
    address: 'Jl. Sudirman Kav. 50, Jakarta Pusat',
    pic: 'Budi Santoso',
    picPhone: '0812-3456-7890',
    documents: [
        { id: 1, name: 'SIUP.pdf', type: 'License', expiry: '2026-05-12', status: 'VALID' },
        { id: 2, name: 'NPWP.pdf', type: 'Tax', expiry: 'Lifetime', status: 'VALID' },
        { id: 3, name: 'TDP.pdf', type: 'License', expiry: '2025-12-31', status: 'WARNING' },
    ],
    performance: {
        quality: 92,
        delivery: 88,
        response: 95,
        compliance: 90
    },
    recentPOs: [
        { id: 'PO-2026-0015', date: '2026-01-05', amount: 180000000, status: 'OPEN' },
        { id: 'PO-2025-0982', date: '2025-12-20', amount: 45000000, status: 'COMPLETED' },
        { id: 'PO-2025-0845', date: '2025-11-15', amount: 320000000, status: 'COMPLETED' },
    ]
};

export default function SupervisorVendorDetailPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/supervisor/vendors" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{VENDOR_DETAIL.name}</h1>
                        <StatusBadge status={VENDOR_DETAIL.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{VENDOR_DETAIL.code} • {VENDOR_DETAIL.category}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Left Column: Info & Stats */}
                <div className="col-span-2 space-y-6">
                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Overall Rating</p>
                                        <p className="text-xl font-bold text-[#0B1120]">{VENDOR_DETAIL.rating}/100</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded text-blue-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Total POs</p>
                                        <p className="text-xl font-bold text-[#0B1120]">{VENDOR_DETAIL.recentPOs.length}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 rounded text-purple-600">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">Total Value</p>
                                        <p className="text-xl font-bold text-[#0B1120]">{formatCurrency(545000000)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Performance Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600">Quality</span>
                                        <span className="font-bold text-[#0B1120]">{VENDOR_DETAIL.performance.quality}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${VENDOR_DETAIL.performance.quality}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600">Delivery</span>
                                        <span className="font-bold text-[#0B1120]">{VENDOR_DETAIL.performance.delivery}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${VENDOR_DETAIL.performance.delivery}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600">Responsiveness</span>
                                        <span className="font-bold text-[#0B1120]">{VENDOR_DETAIL.performance.response}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500" style={{ width: `${VENDOR_DETAIL.performance.response}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-600">Compliance</span>
                                        <span className="font-bold text-[#0B1120]">{VENDOR_DETAIL.performance.compliance}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500" style={{ width: `${VENDOR_DETAIL.performance.compliance}%` }} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Transactions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Recent Purchase Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">PO Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {VENDOR_DETAIL.recentPOs.map((po) => (
                                        <tr key={po.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-3 font-medium text-sm text-[#0052CC]">{po.id}</td>
                                            <td className="px-6 py-3 text-sm text-slate-600">{po.date}</td>
                                            <td className="px-6 py-3 text-right font-mono text-sm">{formatCurrency(po.amount)}</td>
                                            <td className="px-6 py-3 text-center">
                                                <StatusBadge status={po.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Contact & Docs */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                <p className="text-sm text-slate-600">{VENDOR_DETAIL.address}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <p className="text-sm text-slate-600">{VENDOR_DETAIL.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <p className="text-sm text-slate-600">{VENDOR_DETAIL.phone}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-xs text-slate-500 uppercase mb-2">Primary Contact</p>
                                <p className="font-bold text-[#0B1120]">{VENDOR_DETAIL.pic}</p>
                                <p className="text-sm text-slate-600">{VENDOR_DETAIL.picPhone}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Documents */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Legal Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {VENDOR_DETAIL.documents.map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-slate-500" />
                                        <div>
                                            <p className="font-medium text-sm text-[#0B1120]">{doc.name}</p>
                                            <p className="text-xs text-slate-500">Exp: {doc.expiry}</p>
                                        </div>
                                    </div>
                                    {doc.status === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
