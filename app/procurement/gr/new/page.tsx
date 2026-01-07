'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, Package, Check, AlertTriangle, UploadCloud } from 'lucide-react';

function GRForm() {
    const searchParams = useSearchParams();
    const poId = searchParams.get('po') || 'PO-2026-8801';

    const [items, setItems] = useState([
        { id: 1, desc: 'Oracle Exadata X9M-2 Database Server', ordered: 2, received: 2, condition: 'Good', notes: '' },
        { id: 2, desc: 'Installation & Professional Services', ordered: 1, received: 1, condition: 'Good', notes: '' },
    ]);

    const updateItem = (id: number, field: string, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href={`/procurement/po/${poId}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Receive Goods</h1>
                    <p className="text-sm text-slate-500">Processing delivery for <span className="font-mono font-bold text-[#0052CC]">{poId}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Main Form */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    {/* Delivery Details */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Delivery Information</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Delivery Note / Surat Jalan No.</label>
                                <input type="text" placeholder="e.g. SJ-2026-001" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Received Date</label>
                                <input type="date" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Carrier / Courier (Optional)</label>
                                <input type="text" placeholder="e.g. FedEx, JNE, Internal Fleet" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-xs text-[#0B1120] uppercase tracking-wider">Item Inspection</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-3 w-[40%]">Item Description</th>
                                    <th className="px-6 py-3 w-[15%] text-center">Ordered</th>
                                    <th className="px-6 py-3 w-[15%] text-center">Received</th>
                                    <th className="px-6 py-3 w-[30%]">Condition / Notes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.map((item) => (
                                    <tr key={item.id} className={item.received !== item.ordered ? 'bg-amber-50/30' : ''}>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-[#0B1120]">{item.desc}</p>
                                            <p className="text-[10px] text-slate-400">SKU: ORC-DB-X9M</p>
                                        </td>
                                        <td className="px-6 py-4 text-center text-sm text-slate-500">{item.ordered}</td>
                                        <td className="px-6 py-4 text-center">
                                            <input
                                                type="number"
                                                min="0"
                                                max={item.ordered}
                                                value={item.received}
                                                onChange={(e) => updateItem(item.id, 'received', parseInt(e.target.value))}
                                                className={`w-16 text-center text-sm border rounded py-1 focus:ring-1 outline-none ${item.received !== item.ordered ? 'border-amber-300 focus:border-amber-500 focus:ring-amber-500' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500'}`}
                                            />
                                        </td>
                                        <td className="px-6 py-4 space-y-2">
                                            <select
                                                value={item.condition}
                                                onChange={(e) => updateItem(item.id, 'condition', e.target.value)}
                                                className="w-full text-xs border border-slate-200 rounded px-2 py-1 bg-white"
                                            >
                                                <option>Good</option>
                                                <option>Damaged</option>
                                                <option>Wrong Item</option>
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="Add note..."
                                                value={item.notes}
                                                onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                                                className="w-full text-xs border border-slate-200 rounded px-2 py-1 bg-white placeholder:text-slate-300"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {items.some(i => i.received !== i.ordered) && (
                            <div className="p-4 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                                <div className="text-xs text-amber-800">
                                    <p className="font-bold">Quantity Mismatch Detected</p>
                                    <p>You are receiving a different quantity than ordered. This will create a "Partial Receipt" status or require a secondary delivery.</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Evidence</h4>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                            <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#0052CC] mb-2 transition-colors" />
                            <p className="text-xs text-slate-600 font-medium">Upload Delivery Note</p>
                            <p className="text-[10px] text-slate-400 mt-1">Required for verification</p>
                        </div>

                        <div className="mt-4 border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                            <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#0052CC] mb-2 transition-colors" />
                            <p className="text-xs text-slate-600 font-medium">Upload Item Photos</p>
                            <p className="text-[10px] text-slate-400 mt-1">Optional, for high-value items</p>
                        </div>
                    </div>

                    <button className="w-full py-3 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" /> Confirm & Submit GR
                    </button>

                </div>

            </div>
        </div>
    );
}

export default function NewGRPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <GRForm />
        </Suspense>
    );
}
