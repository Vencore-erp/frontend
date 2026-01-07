'use client';

import React, { useState } from 'react';
import { Search, Clock, FileText, Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const RFQ_INVITATIONS = [
    {
        id: 'RFQ-9901',
        title: 'Network Switch Upgrade 2026',
        description: 'Supply and installation of enterprise-grade network switches for HQ data center',
        items: 12,
        deadline: '2026-01-08',
        daysLeft: 2,
        buyer: 'IT Infrastructure',
        status: 'INVITED'
    },
    {
        id: 'RFQ-9904',
        title: 'Data Center Cabling Service',
        description: 'Structured cabling installation for new server room',
        items: 1,
        deadline: '2026-01-11',
        daysLeft: 5,
        buyer: 'IT Operations',
        status: 'INVITED'
    },
    {
        id: 'RFQ-9890',
        title: 'Laptop Procurement Q1 2026',
        description: 'Supply of business laptops for new employee onboarding',
        items: 50,
        deadline: '2026-01-02',
        daysLeft: 0,
        buyer: 'HR Department',
        status: 'SUBMITTED'
    },
    {
        id: 'RFQ-9885',
        title: 'Annual IT Support Contract',
        description: 'Managed IT support services for regional offices',
        items: 1,
        deadline: '2025-12-28',
        daysLeft: 0,
        buyer: 'IT Operations',
        status: 'WON'
    },
];

export default function VendorRFQListPage() {
    const [activeTab, setActiveTab] = useState('ALL');

    const filteredRFQs = activeTab === 'ALL'
        ? RFQ_INVITATIONS
        : RFQ_INVITATIONS.filter(r => r.status === activeTab);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'INVITED': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'SUBMITTED': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'WON': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'LOST': return 'bg-slate-50 text-slate-500 border-slate-200';
            case 'DECLINED': return 'bg-rose-50 text-rose-700 border-rose-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div>
                <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">RFQ Invitations</h1>
                <p className="text-sm text-slate-500 mt-1">View and respond to Request for Quotation invitations.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">New Invitations</p>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">2</p>
                    <p className="text-xs text-blue-600 font-medium">Awaiting response</p>
                </div>
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Submitted</p>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">1</p>
                    <p className="text-xs text-slate-500">Under evaluation</p>
                </div>
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Won (YTD)</p>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">8</p>
                    <p className="text-xs text-emerald-600 font-medium">IDR 2.5B value</p>
                </div>
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Win Rate</p>
                    <p className="text-2xl font-bold text-[#0B1120] font-mono">72%</p>
                    <p className="text-xs text-slate-500">Last 12 months</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {['ALL', 'INVITED', 'SUBMITTED', 'WON', 'LOST'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                ${activeTab === tab
                                    ? 'border-[#0052CC] text-[#0052CC]'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* RFQ Cards */}
            <div className="space-y-4">
                {filteredRFQs.map((rfq) => (
                    <div key={rfq.id} className="bg-white border border-slate-200 rounded shadow-sm p-5 hover:border-[#0052CC]/30 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded">
                                    <Search className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs text-slate-500">{rfq.id}</span>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusStyle(rfq.status)}`}>
                                            {rfq.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0B1120] mt-1">{rfq.title}</h3>
                                </div>
                            </div>
                            {rfq.daysLeft > 0 && rfq.status === 'INVITED' && (
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded ${rfq.daysLeft <= 2 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-bold">{rfq.daysLeft} days left</span>
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-slate-600 mb-4">{rfq.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-6 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    {rfq.items} {rfq.items === 1 ? 'item' : 'items'}
                                </span>
                                <span>Buyer: {rfq.buyer}</span>
                                <span>Deadline: {rfq.deadline}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {rfq.status === 'INVITED' && (
                                    <>
                                        <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 border border-slate-200 rounded hover:border-rose-200 transition-colors flex items-center gap-1">
                                            <X className="w-3 h-3" /> Decline
                                        </button>
                                        <Link href={`/vendor/rfq/${rfq.id}`} className="px-3 py-1.5 text-xs font-bold text-white bg-[#0052CC] rounded hover:bg-blue-700 transition-colors flex items-center gap-1">
                                            <Check className="w-3 h-3" /> Submit Quote
                                        </Link>
                                    </>
                                )}
                                {rfq.status !== 'INVITED' && (
                                    <Link href={`/vendor/rfq/${rfq.id}`} className="text-xs font-medium text-[#0052CC] hover:underline flex items-center gap-1">
                                        View Details <ArrowRight className="w-3 h-3" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
