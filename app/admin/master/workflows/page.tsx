'use client';

import React from 'react';
import { Plus, GitMerge, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Button } from '@/components/ui/button';

interface Workflow {
    id: string;
    name: string;
    module: 'PROCUREMENT' | 'FINANCE' | 'VENDOR';
    trigger: string;
    steps: number;
    status: 'ACTIVE' | 'INACTIVE';
}

const WORKFLOWS: Workflow[] = [
    { id: 'WF-001', name: 'Standard IT Purchase', module: 'PROCUREMENT', trigger: 'PR > 100M', steps: 3, status: 'ACTIVE' },
    { id: 'WF-002', name: 'Low Value Purchase', module: 'PROCUREMENT', trigger: 'PR < 10M', steps: 1, status: 'ACTIVE' },
    { id: 'WF-003', name: 'Emergency Procurement', module: 'PROCUREMENT', trigger: 'Type = Emergency', steps: 2, status: 'ACTIVE' },
    { id: 'WF-004', name: 'Vendor Registration', module: 'VENDOR', trigger: 'New Registration', steps: 4, status: 'ACTIVE' },
    { id: 'WF-005', name: 'Large Payment Release', module: 'FINANCE', trigger: 'Payment > 1B', steps: 3, status: 'ACTIVE' },
];

export default function WorkflowsPage() {

    const columns: Column<Workflow>[] = [
        {
            header: 'Workflow Name',
            accessorKey: 'name',
            cell: (item) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded text-slate-500">
                        <GitMerge className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-[#0B1120]">{item.name}</div>
                </div>
            )
        },
        {
            header: 'Module',
            accessorKey: 'module',
            cell: (item) => (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-600">
                    {item.module}
                </span>
            )
        },
        { header: 'Trigger Condition', accessorKey: 'trigger', cell: (item) => <code className="text-xs bg-slate-50 px-2 py-1 rounded text-rose-600 border border-slate-200">{item.trigger}</code> },
        {
            header: 'Steps',
            accessorKey: 'steps',
            cell: (item) => (
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                        {[...Array(item.steps)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                        ))}
                    </div>
                    <span className="text-xs text-slate-500">{item.steps} Levels</span>
                </div>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item) => <StatusBadge status={item.status} /> },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (item) => (
                <Button className="h-8 text-xs bg-white text-slate-700 border border-slate-300 hover:bg-slate-50">
                    Edit Steps
                </Button>
            )
        },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Approval Workflows</h1>
                    <p className="text-sm text-slate-500 mt-1">Configure multi-level approval chains and logic.</p>
                </div>
                <Button className="bg-[#0052CC] hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workflow
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <CardSpotlight className="p-8 flex items-center justify-between" color="#3b82f6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Workflow Engine Active</h3>
                        <p className="text-neutral-400 max-w-lg text-sm">
                            The system is currently processing approvals based on the 5 active configurations below. Changes will apply to new requests only.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black text-white">{WORKFLOWS.length}</span>
                            <span className="text-[10px] uppercase tracking-wider text-neutral-500">Active Flows</span>
                        </div>
                        <div className="h-12 w-px bg-neutral-800"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black text-emerald-500">100%</span>
                            <span className="text-[10px] uppercase tracking-wider text-neutral-500">Uptime</span>
                        </div>
                    </div>
                </CardSpotlight>
            </div>

            <div className="space-y-4">
                <DataTable
                    data={WORKFLOWS}
                    columns={columns}
                    searchPlaceholder="Search workflows..."
                />
            </div>
        </div>
    );
}
