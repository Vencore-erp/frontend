'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Building, Package, Calendar, Truck, CheckCircle, XCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';

const PO_DETAIL = {
    poNumber: 'PO-2026-0018',
    issueDate: '2026-01-08',
    deliveryDate: '2026-02-15',
    buyer: 'PT XYZ Corporation',
    buyerAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
    status: 'ISSUED',
    paymentTerms: 'Net 30 Days',
    shippingTerms: 'FOB Destination',
    totalAmount: 180000000,
};

const PO_ITEMS = [
    { id: '1', itemNo: 1, description: 'Dell PowerEdge R750 Server', quantity: 5, uom: 'Unit', unitPrice: 25000000, total: 125000000 },
    { id: '2', itemNo: 2, description: 'Cisco Catalyst 9300 Switch', quantity: 10, uom: 'Unit', unitPrice: 4500000, total: 45000000 },
    { id: '3', itemNo: 3, description: 'Network Cables CAT6', quantity: 100, uom: 'Meter', unitPrice: 100000, total: 10000000 },
];

export default function VendorPODetailPage() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/vendor/po" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{PO_DETAIL.poNumber}</h1>
                        <StatusBadge status={PO_DETAIL.status} />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Issued on {PO_DETAIL.issueDate}</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Download PO
                </Button>
            </div>

            {/* Action Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-6 h-6 text-amber-600" />
                        <div>
                            <p className="font-medium text-amber-900">Purchase Order Requires Your Action</p>
                            <p className="text-sm text-amber-700">Please acknowledge or reject this PO within 3 business days.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                            <CheckCircle className="w-4 h-4" /> Acknowledge
                        </Button>
                        <Button variant="outline" className="text-rose-600 border-rose-200 hover:bg-rose-50 gap-2">
                            <XCircle className="w-4 h-4" /> Reject
                        </Button>
                    </div>
                </div>
            </div>

            {/* PO Details */}
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Building className="w-4 h-4" /> Buyer Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Company</p>
                            <p className="font-medium text-[#0B1120]">{PO_DETAIL.buyer}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Delivery Address</p>
                            <p className="text-slate-700">{PO_DETAIL.buyerAddress}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Order Terms
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Delivery Date</p>
                                <p className="font-medium text-[#0B1120] flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-slate-400" /> {PO_DETAIL.deliveryDate}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase">Shipping Terms</p>
                                <p className="font-medium text-[#0B1120] flex items-center gap-1">
                                    <Truck className="w-4 h-4 text-slate-400" /> {PO_DETAIL.shippingTerms}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-slate-500 uppercase">Payment Terms</p>
                                <p className="font-medium text-[#0B1120]">{PO_DETAIL.paymentTerms}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Line Items */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" /> Order Items
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">No</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Description</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Qty</th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase">UoM</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Unit Price</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {PO_ITEMS.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-mono text-sm text-slate-500">{item.itemNo}</td>
                                    <td className="px-6 py-4 font-medium text-slate-700">{item.description}</td>
                                    <td className="px-6 py-4 text-center font-mono">{item.quantity}</td>
                                    <td className="px-6 py-4 text-center text-slate-500">{item.uom}</td>
                                    <td className="px-6 py-4 text-right font-mono">{formatCurrency(item.unitPrice)}</td>
                                    <td className="px-6 py-4 text-right font-mono font-medium">{formatCurrency(item.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-right font-bold text-slate-700 uppercase">Grand Total</td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-lg text-[#0052CC]">
                                    {formatCurrency(PO_DETAIL.totalAmount)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </CardContent>
            </Card>

            {/* Delivery Update Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Advance Shipping Notice (ASN)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-slate-500">
                        <Truck className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p className="font-medium">No shipping notice submitted yet</p>
                        <p className="text-sm mb-4">Submit ASN when you ship the goods</p>
                        <Button variant="outline" disabled>Submit ASN</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
