'use client';

import React, { useState } from 'react';
import { Plus, Download, Loader2 } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const INITIAL_PRS = [
    { id: 'PR-2026-001', desc: 'Q1 Office Supplies', requester: 'Alexander Pierce', dept: 'General Affairs', amount: 12500000, status: 'APPROVED', date: '05 Jan 2026' },
    { id: 'PR-2026-002', desc: 'Server Rack Maintenance', requester: 'Alexander Pierce', dept: 'IT Infrastructure', amount: 45000000, status: 'PENDING', date: '05 Jan 2026' },
    { id: 'PR-2026-003', desc: 'MacBook Pro M4 (x5)', requester: 'Alexander Pierce', dept: 'IT Ops', amount: 145000000, status: 'PENDING', date: '06 Jan 2026' },
    { id: 'PR-2026-004', desc: 'Data Center Cooling R&D', requester: 'Alexander Pierce', dept: 'IT Infra', amount: 8500000, status: 'DRAFT', date: '06 Jan 2026' },
    { id: 'PR-2026-005', desc: 'Annual Security Audit', requester: 'James Wilson', dept: 'Compliance', amount: 850000000, status: 'RISK_MED', date: '06 Jan 2026' },
];

export default function PRListPage() {
    const [activeTab, setActiveTab] = useState('ALL');
    const [prs, setPrs] = useState(INITIAL_PRS);
    const [isCreating, setIsCreating] = useState(false);

    const handleQuickCreate = () => {
        setIsCreating(true);
        setTimeout(() => {
            const newId = `PR-2026-00${prs.length + 1}`;
            const newPR = {
                id: newId,
                desc: 'New Mock Requisition',
                requester: 'Alexander Pierce',
                dept: 'Procurement',
                amount: 0,
                status: 'DRAFT',
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            };
            setPrs([newPR, ...prs]);
            setIsCreating(false);
            toast.success(`Requisition ${newId} created successfully`);
        }, 1000);
    };

    const columns = [
        { header: 'PR Number', accessorKey: 'id', cell: (item: any) => <Link href={`/procurement/pr/${item.id}`} className="font-mono font-medium text-[#0052CC] hover:underline">{item.id}</Link> },
        { header: 'Date', accessorKey: 'date' },
        { header: 'Description', accessorKey: 'desc', className: 'font-medium' },
        { header: 'Requester', accessorKey: 'requester', cell: (item: any) => <div>{item.requester}<div className="text-[10px] text-slate-500">{item.dept}</div></div> },
        { header: 'Amount (IDR)', accessorKey: 'amount', align: 'right', cell: (item: any) => <span className="font-mono">{item.amount.toLocaleString('id-ID')}</span> },
        { header: 'Status', accessorKey: 'status', cell: (item: any) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Purchase Requisitions</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and track your procurement requests.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button
                        disabled={isCreating}
                        onClick={handleQuickCreate}
                        className="bg-[#0052CC] hover:bg-blue-700 shadow-sm"
                    >
                        {isCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                        {isCreating ? 'Creating...' : 'Quick New PR'}
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {['ALL', 'DRAFT', 'PENDING', 'APPROVED', 'REJECTED'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                ${activeTab === tab
                                    ? 'border-[#0052CC] text-[#0052CC]'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }
                            `}
                        >
                            {tab.replace('_', ' ')}
                            <span className={`ml-2 py-0.5 px-2 rounded-full text-xs transition-colors ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                                {tab === 'ALL' ? prs.length : prs.filter(p => !['DRAFT', 'PENDING', 'APPROVED'].includes(tab) ? false : p.status === tab).length}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            <DataTable
                data={activeTab === 'ALL' ? prs : prs.filter(p => p.status === activeTab)}
                columns={columns}
            />

        </div>
    );
}
