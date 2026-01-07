'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Trash2, UploadCloud, Save, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NewPRPage() {
    const router = useRouter();
    const [lineItems, setLineItems] = useState([
        { id: 1, desc: '', uom: 'UNIT', qty: 1, price: 0, total: 0 }
    ]);

    const updateLineItem = (id: number, field: string, value: any) => {
        setLineItems(prev => prev.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                if (field === 'qty' || field === 'price') {
                    updated.total = updated.qty * updated.price;
                }
                return updated;
            }
            return item;
        }));
    };

    const addLineItem = () => {
        setLineItems([...lineItems, { id: Date.now(), desc: '', uom: 'UNIT', qty: 1, price: 0, total: 0 }]);
    };

    const removeLineItem = (id: number) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter(item => item.id !== id));
        }
    };

    const grandTotal = lineItems.reduce((acc, item) => acc + item.total, 0);

    const handleSubmit = () => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'Submitting Requisition...',
            success: () => {
                router.push('/procurement/pr');
                return 'PR Draft Submitted Successfully!';
            },
            error: 'Failed to submit'
        });
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                <Link href="/procurement/pr" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Create New Requisition</h1>
                    <p className="text-sm text-slate-500">Draft PR • Generated ID: <span className="font-mono">PR-2026-DRAFT</span></p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Form Section */}
                <div className="col-span-12 lg:col-span-8 space-y-8">

                    {/* General Info */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                        <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">General Information</h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Request Type</label>
                                <select className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all">
                                    <option>Standard Purchase</option>
                                    <option>Service Contract</option>
                                    <option>Capex / Asset</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Required Date</label>
                                <input type="date" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Description / Purpose</label>
                                <input type="text" placeholder="e.g. Q1 Office Supplies Restock" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                            <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider">Line Items</h3>
                            <button onClick={addLineItem} className="text-xs font-medium text-[#0052CC] hover:bg-blue-50 px-2 py-1 rounded transition-colors flex items-center">
                                <Plus className="w-3 h-3 mr-1" /> Add Item
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-semibold">
                                    <tr>
                                        <th className="px-3 py-2 w-[40%]">Item Description</th>
                                        <th className="px-3 py-2 w-[15%]">Category</th>
                                        <th className="px-3 py-2 w-[10%] text-center">Qty</th>
                                        <th className="px-3 py-2 w-[15%] text-right">Unit Price</th>
                                        <th className="px-3 py-2 w-[15%] text-right">Total</th>
                                        <th className="px-3 py-2 w-[5%]"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {lineItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-3 py-2">
                                                <input
                                                    type="text"
                                                    placeholder="Item name..."
                                                    value={item.desc}
                                                    onChange={(e) => updateLineItem(item.id, 'desc', e.target.value)}
                                                    className="w-full text-sm bg-transparent border-none focus:ring-0 placeholder:text-slate-300"
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <select className="w-full text-xs bg-slate-50 border-none rounded py-1 focus:ring-0">
                                                    <option>General</option>
                                                    <option>IT - Hardware</option>
                                                    <option>IT - Software</option>
                                                </select>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.qty}
                                                    onChange={(e) => updateLineItem(item.id, 'qty', parseInt(e.target.value))}
                                                    className="w-16 text-center text-sm border border-slate-200 rounded py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="1000"
                                                    value={item.price}
                                                    onChange={(e) => updateLineItem(item.id, 'price', parseInt(e.target.value))}
                                                    className="w-24 text-right text-sm border border-slate-200 rounded py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="px-3 py-2 text-right font-mono text-sm">
                                                {item.total.toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <button onClick={() => removeLineItem(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="border-t border-slate-200 bg-slate-50/50 font-bold text-sm text-[#0B1120]">
                                    <tr>
                                        <td colSpan={4} className="px-3 py-3 text-right">Grand Total (IDR):</td>
                                        <td className="px-3 py-3 text-right font-mono text-[#0052CC]">{grandTotal.toLocaleString('id-ID')}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Budget Assignment</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#0B1120] mb-1.5">Cost Center</label>
                                <select className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white">
                                    <option>CC-102 (IT Infrastructure)</option>
                                    <option>CC-201 (General Operations)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#0B1120] mb-1.5">GL Account</label>
                                <select className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white">
                                    <option>520100 - Office Supplies</option>
                                    <option>520200 - Hardware Assets</option>
                                </select>
                            </div>
                            <div className="p-3 bg-blue-50 rounded border border-blue-100 text-xs text-blue-800">
                                <p className="font-bold mb-1">Budget Available</p>
                                <p>IDR 4,500,000,000</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Attachments</h4>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                            <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                            <p className="text-xs text-slate-600 font-medium">Click to upload files</p>
                            <p className="text-[10px] text-slate-400 mt-1">PDF, JPG up to 10MB</p>
                        </div>
                    </div>



                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" /> Submit Request
                        </button>
                        <button className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2">
                            <Save className="w-4 h-4" /> Save as Draft
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
