'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, Plus, Trash2, Calculator, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuotationItem {
    id: string;
    itemNo: number;
    description: string;
    quantity: number;
    uom: string;
    unitPrice: number;
    leadTime: number;
}

const RFQ_DETAIL = {
    rfqNumber: 'RFQ-2026-0015',
    title: 'IT Infrastructure Equipment',
    deadline: '2026-01-15 17:00',
    buyer: 'PT XYZ Corporation',
};

const INITIAL_ITEMS: QuotationItem[] = [
    { id: '1', itemNo: 1, description: 'Dell PowerEdge R750 Server', quantity: 5, uom: 'Unit', unitPrice: 0, leadTime: 0 },
    { id: '2', itemNo: 2, description: 'Cisco Catalyst 9300 Switch', quantity: 10, uom: 'Unit', unitPrice: 0, leadTime: 0 },
    { id: '3', itemNo: 3, description: 'HPE MSA 2060 Storage', quantity: 2, uom: 'Unit', unitPrice: 0, leadTime: 0 },
];

export default function SubmitQuotationPage() {
    const [items, setItems] = useState<QuotationItem[]>(INITIAL_ITEMS);
    const [validityDays, setValidityDays] = useState(30);
    const [paymentTerms, setPaymentTerms] = useState('');
    const [notes, setNotes] = useState('');

    const updateItem = (id: string, field: keyof QuotationItem, value: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const calculateTotal = () => {
        return items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/vendor/rfq" className="p-2 hover:bg-slate-100 rounded transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Submit Quotation</h1>
                    <p className="text-sm text-slate-500 mt-1">{RFQ_DETAIL.rfqNumber}: {RFQ_DETAIL.title}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-500">Deadline</p>
                    <p className="font-medium text-rose-600">{RFQ_DETAIL.deadline}</p>
                </div>
            </div>

            {/* RFQ Summary */}
            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-blue-900">{RFQ_DETAIL.title}</p>
                                <p className="text-sm text-blue-700">Buyer: {RFQ_DETAIL.buyer}</p>
                            </div>
                        </div>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                            {items.length} Items
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Item Pricing */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Item Pricing</span>
                        <Calculator className="w-5 h-5 text-slate-400" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase w-12">No</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Description</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase w-20">Qty</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase w-20">UoM</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase w-40">Unit Price (IDR)</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase w-32">Lead Time (Days)</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase w-40">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 text-center font-mono text-sm text-slate-500">{item.itemNo}</td>
                                    <td className="px-4 py-3 font-medium text-slate-700">{item.description}</td>
                                    <td className="px-4 py-3 text-center font-mono">{item.quantity}</td>
                                    <td className="px-4 py-3 text-center text-slate-500">{item.uom}</td>
                                    <td className="px-4 py-3">
                                        <input
                                            type="number"
                                            value={item.unitPrice || ''}
                                            onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                                            className="w-full px-2 py-1 text-right border border-slate-300 rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="0"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <input
                                            type="number"
                                            value={item.leadTime || ''}
                                            onChange={(e) => updateItem(item.id, 'leadTime', Number(e.target.value))}
                                            className="w-full px-2 py-1 text-center border border-slate-300 rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="0"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-right font-mono font-medium text-[#0B1120]">
                                        {formatCurrency(item.unitPrice * item.quantity)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                            <tr>
                                <td colSpan={6} className="px-4 py-3 text-right font-bold text-slate-700 uppercase">Grand Total</td>
                                <td className="px-4 py-3 text-right font-mono font-bold text-lg text-[#0052CC]">
                                    {formatCurrency(calculateTotal())}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <div className="grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Quotation Terms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Validity Period *</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={validityDays}
                                    onChange={(e) => setValidityDays(Number(e.target.value))}
                                    className="w-24 px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-slate-500">days</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Payment Terms *</label>
                            <select
                                value={paymentTerms}
                                onChange={(e) => setPaymentTerms(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select payment terms</option>
                                <option value="NET30">Net 30 Days</option>
                                <option value="NET45">Net 45 Days</option>
                                <option value="NET60">Net 60 Days</option>
                                <option value="COD">Cash on Delivery</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Notes / Remarks</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Additional notes for the buyer..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Supporting Documents</label>
                            <div className="border border-dashed border-slate-300 rounded p-4 text-center hover:border-[#0052CC] transition-colors cursor-pointer">
                                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                                <p className="text-sm text-slate-500">Click to upload or drag & drop</p>
                                <p className="text-xs text-slate-400">PDF, DOC up to 10MB</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Submit Actions */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-200 sticky bottom-4">
                <div>
                    <p className="text-sm text-slate-500">Total Quotation Value</p>
                    <p className="text-2xl font-bold font-mono text-[#0052CC]">{formatCurrency(calculateTotal())}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Save as Draft</Button>
                    <Button className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2">
                        <Send className="w-4 h-4" /> Submit Quotation
                    </Button>
                </div>
            </div>
        </div>
    );
}
