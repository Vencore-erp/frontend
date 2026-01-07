'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Trophy, Check } from 'lucide-react';

export default function RFQComparePage({ params }: { params: { id: string } }) {
    const RFQ = {
        id: params.id || 'RFQ-9901',
        title: 'Network Switch Upgrade 2026',
        items: [
            { id: 1, desc: 'Cisco Catalyst 9300', qty: 12 },
            { id: 2, desc: 'SFP+ 10G Transceiver', qty: 24 }
        ],
        bids: [
            {
                vendor: 'PT. Tech Solution',
                total: 420000000,
                score: 95,
                delivery: '14 Days',
                warranty: '3 Years',
                items: [400000000, 20000000] // Item 1 total, Item 2 total
            },
            {
                vendor: 'Global Systems Inc',
                total: 395000000,
                score: 88,
                delivery: '45 Days',
                warranty: '1 Year',
                items: [380000000, 15000000]
            },
            {
                vendor: 'Cyber Network',
                total: 450000000,
                score: 92,
                delivery: '7 Days',
                warranty: '3 Years',
                items: [425000000, 25000000]
            }
        ]
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href={`/procurement/rfq/${RFQ.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[#0B1120]">Bid Evaluation</h1>
                        <p className="text-sm text-slate-500">Comparing 3 responses for <span className="font-semibold text-[#0B1120]">{RFQ.id}</span></p>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto bg-white rounded border border-slate-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 w-1/4 bg-slate-50 border-b border-r border-slate-200">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Criteria / Item</span>
                            </th>
                            {RFQ.bids.map((bid, i) => (
                                <th key={i} className={`p-4 w-1/4 border-b border-slate-200 ${i === 0 ? 'bg-emerald-50/30' : ''}`}>
                                    <div className="font-bold text-[#0B1120] text-lg">{bid.vendor}</div>
                                    {i === 0 && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">Recommended</span>}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">

                        {/* Commercials Row */}
                        <tr className="bg-slate-50/50">
                            <td className="p-4 font-bold text-sm text-slate-600 border-r border-slate-200">Total Bid Value</td>
                            {RFQ.bids.map((bid, i) => (
                                <td key={i} className="p-4">
                                    <div className="text-xl font-mono font-bold text-[#0B1120]">{bid.total.toLocaleString('id-ID')}</div>
                                    {i === 1 && <span className="text-xs text-emerald-600 font-bold">Lowest Price</span>}
                                </td>
                            ))}
                        </tr>

                        {/* Vendor Score Row */}
                        <tr>
                            <td className="p-4 text-sm font-medium text-slate-600 border-r border-slate-200">Vendor Score</td>
                            {RFQ.bids.map((bid, i) => (
                                <td key={i} className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold ${bid.score >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{bid.score}/100</span>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* Delivery Row */}
                        <tr>
                            <td className="p-4 text-sm font-medium text-slate-600 border-r border-slate-200">Lead Time</td>
                            {RFQ.bids.map((bid, i) => (
                                <td key={i} className="p-4">
                                    <span className="text-sm font-medium text-[#0B1120]">{bid.delivery}</span>
                                </td>
                            ))}
                        </tr>

                        {/* Warranty Row */}
                        <tr>
                            <td className="p-4 text-sm font-medium text-slate-600 border-r border-slate-200">Warranty</td>
                            {RFQ.bids.map((bid, i) => (
                                <td key={i} className="p-4">
                                    <span className="text-sm font-medium text-[#0B1120]">{bid.warranty}</span>
                                </td>
                            ))}
                        </tr>

                        {/* Line Item Breakdown */}
                        {RFQ.items.map((item, itemIdx) => (
                            <tr key={item.id} className="bg-slate-50/20">
                                <td className="p-4 text-xs font-medium text-slate-500 border-r border-slate-200 pl-8">
                                    {item.desc} (x{item.qty})
                                </td>
                                {RFQ.bids.map((bid, i) => (
                                    <td key={i} className="p-4 text-sm font-mono text-slate-600">
                                        {bid.items[itemIdx].toLocaleString('id-ID')}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Action Row */}
                        <tr className="bg-slate-50 border-t border-slate-200">
                            <td className="p-4 border-r border-slate-200"></td>
                            {RFQ.bids.map((bid, i) => (
                                <td key={i} className="p-4">
                                    <button className={`w-full py-2 flex items-center justify-center gap-2 rounded text-sm font-bold shadow-sm transition-all ${i === 0 ? 'bg-[#0052CC] text-white hover:bg-blue-700' : 'bg-white border border-slate-300 text-slate-500 hover:bg-slate-50'
                                        }`}>
                                        <Trophy className="w-4 h-4" />
                                        {i === 0 ? 'Award Contract' : 'Award'}
                                    </button>
                                </td>
                            ))}
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}
