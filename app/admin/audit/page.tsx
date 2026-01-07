'use client';

import React, { useState } from 'react';
import { Download, Filter, AlertTriangle, Shield, Calendar } from 'lucide-react';

const AUDIT_LOGS = [
    { id: 1, timestamp: '2026-01-06 11:02:45', user: 'Admin_Sys', action: 'ROLE_PERMISSION_UPDATE', resource: 'Role: OPERATOR', ip: '127.0.0.1', severity: 'MEDIUM' },
    { id: 2, timestamp: '2026-01-06 10:42:12', user: 'unknown', action: 'LOGIN_FAILED', resource: '-', ip: '192.168.1.55', severity: 'HIGH' },
    { id: 3, timestamp: '2026-01-06 10:15:33', user: 'Supervisor_HQ', action: 'BUDGET_OVERRIDE', resource: 'CC-102', ip: '192.168.1.10', severity: 'HIGH' },
    { id: 4, timestamp: '2026-01-06 09:30:00', user: 'Risk_Officer', action: 'VENDOR_BLACKLIST_ADD', resource: 'VN-0000', ip: '192.168.1.25', severity: 'HIGH' },
    { id: 5, timestamp: '2026-01-06 09:00:00', user: 'Admin_Sys', action: 'USER_CREATED', resource: 'USR-006', ip: '127.0.0.1', severity: 'LOW' },
    { id: 6, timestamp: '2026-01-05 16:45:22', user: 'alexander.p', action: 'PR_SUBMITTED', resource: 'PR-2026-004', ip: '192.168.1.50', severity: 'LOW' },
    { id: 7, timestamp: '2026-01-05 14:30:00', user: 'alexander.p', action: 'RFQ_CREATED', resource: 'RFQ-9901', ip: '192.168.1.50', severity: 'LOW' },
    { id: 8, timestamp: '2026-01-05 11:00:00', user: 'sarah.j', action: 'PR_APPROVED', resource: 'PR-2026-001', ip: '192.168.1.12', severity: 'MEDIUM' },
];

export default function AuditLogPage() {
    const [severityFilter, setSeverityFilter] = useState('ALL');

    const filteredLogs = severityFilter === 'ALL'
        ? AUDIT_LOGS
        : AUDIT_LOGS.filter(log => log.severity === severityFilter);

    const getSeverityStyle = (severity: string) => {
        switch (severity) {
            case 'HIGH': return 'bg-rose-50 text-rose-700 border-rose-200';
            case 'MEDIUM': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Audit Trail</h1>
                    <p className="text-sm text-slate-500 mt-1">Monitor all system activities and security events.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <input type="date" className="text-sm border border-slate-300 rounded px-3 py-1.5 bg-white" defaultValue="2026-01-06" />
                    <span className="text-slate-400">to</span>
                    <input type="date" className="text-sm border border-slate-300 rounded px-3 py-1.5 bg-white" defaultValue="2026-01-06" />
                </div>
                <div className="w-px h-8 bg-slate-300" />
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={severityFilter}
                        onChange={(e) => setSeverityFilter(e.target.value)}
                        className="text-sm border border-slate-300 rounded px-3 py-1.5 bg-white"
                    >
                        <option value="ALL">All Severity</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                    <input type="text" placeholder="Search user or action..." className="text-sm border border-slate-300 rounded px-3 py-1.5 bg-white w-48" />
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Timestamp</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Resource</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">IP Address</th>
                            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3 text-xs font-mono text-slate-500">{log.timestamp}</td>
                                <td className="px-6 py-3 text-sm font-medium text-[#0B1120]">{log.user}</td>
                                <td className="px-6 py-3">
                                    <span className="text-xs font-mono font-bold text-[#0B1120] flex items-center gap-2">
                                        {log.action.includes('FAILED') || log.action.includes('BLACKLIST') ? (
                                            <AlertTriangle className="w-3 h-3 text-rose-500" />
                                        ) : log.action.includes('OVERRIDE') || log.action.includes('PERMISSION') ? (
                                            <Shield className="w-3 h-3 text-amber-500" />
                                        ) : null}
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-sm text-slate-600">{log.resource}</td>
                                <td className="px-6 py-3 text-xs font-mono text-slate-400">{log.ip}</td>
                                <td className="px-6 py-3">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getSeverityStyle(log.severity)}`}>
                                        {log.severity}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30">
                    <div>
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{AUDIT_LOGS.length}</span> results
                    </div>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Previous</button>
                        <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
