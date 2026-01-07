'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Save, Shield, Check, X } from 'lucide-react';

const PERMISSIONS = {
    'Procurement': [
        { id: 'pr.create', name: 'Create Purchase Requisition', granted: true },
        { id: 'pr.view', name: 'View Purchase Requisitions', granted: true },
        { id: 'pr.approve', name: 'Approve Purchase Requisitions', granted: false },
        { id: 'rfq.create', name: 'Create RFQ', granted: true },
        { id: 'rfq.manage', name: 'Manage RFQ Responses', granted: true },
        { id: 'po.create', name: 'Create Purchase Order', granted: false },
        { id: 'po.view', name: 'View Purchase Orders', granted: true },
    ],
    'Vendor Management': [
        { id: 'vendor.view', name: 'View Vendor List', granted: true },
        { id: 'vendor.create', name: 'Onboard New Vendor', granted: false },
        { id: 'vendor.approve', name: 'Approve Vendor Registration', granted: false },
        { id: 'vendor.blacklist', name: 'Manage Blacklist', granted: false },
    ],
    'Finance': [
        { id: 'invoice.view', name: 'View Invoices', granted: false },
        { id: 'invoice.verify', name: 'Verify Invoices', granted: false },
        { id: 'payment.process', name: 'Process Payments', granted: false },
        { id: 'budget.view', name: 'View Budget', granted: true },
    ],
    'Administration': [
        { id: 'user.view', name: 'View Users', granted: false },
        { id: 'user.manage', name: 'Manage Users', granted: false },
        { id: 'role.manage', name: 'Manage Roles', granted: false },
        { id: 'audit.view', name: 'View Audit Logs', granted: false },
    ],
};

export default function RoleDetailPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/roles" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Operator</h1>
                            <p className="text-sm text-slate-500">Create and manage procurement requests</p>
                        </div>
                    </div>
                </div>
                <button className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </button>
            </div>

            {/* Permission Matrix */}
            <div className="space-y-6">
                {Object.entries(PERMISSIONS).map(([category, perms]) => (
                    <div key={category} className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                            <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider">{category}</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {perms.map((perm) => (
                                <div key={perm.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50">
                                    <div>
                                        <p className="text-sm font-medium text-[#0B1120]">{perm.name}</p>
                                        <p className="text-xs text-slate-400 font-mono">{perm.id}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={perm.granted} />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0052CC]"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Users with this role */}
            <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider">Users with this Role</h3>
                    <span className="text-xs font-bold text-[#0052CC] bg-blue-50 px-2 py-0.5 rounded">45 Users</span>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                        {['Alexander Pierce', 'Emily Davis', 'James Wilson', 'Maria Garcia', 'David Kim'].map((name, idx) => (
                            <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm">
                                <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                    {name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {name}
                            </span>
                        ))}
                        <span className="inline-flex items-center px-3 py-1.5 text-sm text-slate-500">+40 more</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
