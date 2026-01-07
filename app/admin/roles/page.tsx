'use client';

import React from 'react';
import { Plus, Shield, Users } from 'lucide-react';
import Link from 'next/link';

const ROLES = [
    { id: 'ADMIN', name: 'Administrator', desc: 'Full system access with configuration privileges', users: 3, color: 'rose' },
    { id: 'SUPERVISOR', name: 'Supervisor', desc: 'Approval authority for PRs, POs, and budget oversight', users: 8, color: 'purple' },
    { id: 'OPERATOR', name: 'Operator', desc: 'Create and manage procurement requests', users: 45, color: 'blue' },
    { id: 'FINANCE', name: 'Finance', desc: 'Invoice verification and payment processing', users: 12, color: 'emerald' },
    { id: 'VENDOR', name: 'Vendor (External)', desc: 'External portal access for suppliers', users: 128, color: 'amber' },
];

export default function RoleListPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Role Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Configure roles and permissions for the system.</p>
                </div>
                <button className="flex items-center px-4 py-2 bg-[#0052CC] text-white text-sm font-medium rounded shadow-sm hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Role
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ROLES.map((role) => (
                    <Link
                        key={role.id}
                        href={`/admin/roles/${role.id}`}
                        className="bg-white p-6 rounded border border-slate-200 shadow-sm hover:border-[#0052CC]/50 hover:shadow-md transition-all group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-${role.color}-50`}>
                                <Shield className={`w-6 h-6 text-${role.color}-600`} />
                            </div>
                            <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{role.id}</span>
                        </div>

                        <h3 className="text-lg font-bold text-[#0B1120] group-hover:text-[#0052CC] transition-colors">{role.name}</h3>
                        <p className="text-sm text-slate-500 mt-1 mb-4">{role.desc}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Users className="w-4 h-4" />
                                <span><strong className="text-[#0B1120]">{role.users}</strong> users assigned</span>
                            </div>
                            <span className="text-xs font-medium text-[#0052CC] group-hover:underline">View Permissions →</span>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}
