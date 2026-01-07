'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save, KeyRound, UserX, Shield, Clock, Activity } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

const USER_DATA = {
    id: 'USR-001',
    name: 'Alexander Pierce',
    email: 'alexander.p@company.com',
    phone: '+62 812 3456 7890',
    employeeId: 'EMP-2024-001',
    role: 'OPERATOR',
    dept: 'IT Operations',
    status: 'ACTIVE',
    reportsTo: 'Sarah Johnson',
    createdAt: '2024-06-15',
    lastLogin: '2026-01-06 10:42',
    loginCount: 245
};

const ACTIVITY_LOG = [
    { action: 'LOGIN', timestamp: '2026-01-06 10:42', ip: '192.168.1.50' },
    { action: 'PR_CREATED', timestamp: '2026-01-06 10:45', detail: 'PR-2026-004' },
    { action: 'RFQ_SUBMITTED', timestamp: '2026-01-05 14:30', detail: 'RFQ-9901' },
    { action: 'LOGIN', timestamp: '2026-01-05 08:00', ip: '192.168.1.50' },
];

export default function UserDetailPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/users" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-600">
                            AP
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">{USER_DATA.name}</h1>
                            <p className="text-sm text-slate-500">{USER_DATA.email} • <span className="font-mono">{USER_DATA.id}</span></p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <StatusBadge status={USER_DATA.status} />
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {['profile', 'permissions', 'activity'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize
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

            {/* Tab Content */}
            {activeTab === 'profile' && (
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                            <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Personal Information</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
                                    <input type="text" defaultValue={USER_DATA.name} className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
                                    <input type="email" defaultValue={USER_DATA.email} className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone Number</label>
                                    <input type="tel" defaultValue={USER_DATA.phone} className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Employee ID</label>
                                    <input type="text" defaultValue={USER_DATA.employeeId} className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50" disabled />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                            <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Access Configuration</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Role</label>
                                    <select defaultValue={USER_DATA.role} className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all">
                                        <option>OPERATOR</option>
                                        <option>SUPERVISOR</option>
                                        <option>FINANCE</option>
                                        <option>ADMIN</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Department</label>
                                    <select defaultValue={USER_DATA.dept} className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all">
                                        <option>IT Operations</option>
                                        <option>IT Infrastructure</option>
                                        <option>Procurement</option>
                                        <option>General Affairs</option>
                                        <option>Finance</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>

                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Account Stats</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600 flex items-center gap-2"><Clock className="w-4 h-4" /> Last Login</span>
                                    <span className="text-sm font-mono font-medium">{USER_DATA.lastLogin}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600 flex items-center gap-2"><Activity className="w-4 h-4" /> Total Logins</span>
                                    <span className="text-sm font-mono font-medium">{USER_DATA.loginCount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600 flex items-center gap-2"><Shield className="w-4 h-4" /> 2FA Status</span>
                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">ENABLED</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h4>
                            <div className="space-y-2">
                                <button className="w-full py-2 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded border border-amber-200 flex items-center justify-center gap-2 transition-colors">
                                    <KeyRound className="w-4 h-4" /> Reset Password
                                </button>
                                <button className="w-full py-2 text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 flex items-center justify-center gap-2 transition-colors">
                                    <UserX className="w-4 h-4" /> Deactivate User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'activity' && (
                <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#F8FAFC] border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {ACTIVITY_LOG.map((log, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="px-6 py-3 text-sm font-mono font-medium text-[#0B1120]">{log.action}</td>
                                    <td className="px-6 py-3 text-sm text-slate-500">{log.timestamp}</td>
                                    <td className="px-6 py-3 text-sm text-slate-500">{log.detail || log.ip || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'permissions' && (
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4">Role Permissions: {USER_DATA.role}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['Create PR', 'View PO', 'Create RFQ', 'View Vendor', 'Approve PR', 'View Reports'].map((perm, idx) => (
                            <label key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-200">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" defaultChecked={idx < 4} />
                                <span className="text-sm text-slate-700">{perm}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
