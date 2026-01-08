'use client';

import React from 'react';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import {
    Users,
    Activity,
    ShieldCheck,
    Server,
    AlertTriangle,
    Clock,
    Database,
    Globe,
    Cpu,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const SYSTEM_HEALTH = [
    { service: 'Auth Service', status: 'OPERATIONAL', latency: '45ms', uptime: '99.99%' },
    { service: 'Procurement Core', status: 'OPERATIONAL', latency: '120ms', uptime: '99.95%' },
    { service: 'Finance Module', status: 'OPERATIONAL', latency: '85ms', uptime: '99.98%' },
    { service: 'Vendor Portal', status: 'WARN', latency: '450ms', uptime: '98.50%' },
    { service: 'Notification Engine', status: 'OPERATIONAL', latency: '30ms', uptime: '100%' },
];

const RECENT_AUDITS = [
    { id: 'LOG-9921', action: 'USER_LOGIN_FAILED', user: 'unknown@ip-192.168.1.5', time: '2 mins ago', severity: 'HIGH' },
    { id: 'LOG-9920', action: 'ROLE_UPDATED', user: 'admin_sys', time: '15 mins ago', severity: 'MEDIUM' },
    { id: 'LOG-9919', action: 'VENDOR_APPROVED', user: 'supervisor_tara', time: '1 hour ago', severity: 'LOW' },
    { id: 'LOG-9918', action: 'SYSTEM_CONFIG_CHANGED', user: 'admin_sys', time: '2 hours ago', severity: 'CRITICAL' },
];

const TRAFFIC_DATA = [
    { time: '08:00', requests: 1200 },
    { time: '10:00', requests: 3500 },
    { time: '12:00', requests: 4200 },
    { time: '14:00', requests: 3800 },
    { time: '16:00', requests: 2900 },
    { time: '18:00', requests: 1500 },
];

const ACTIVE_SESSIONS = [
    { user: 'Alexander Pierce', role: 'OPERATOR', ip: '10.0.0.5', device: 'Chrome / Windows', duration: '2h 15m' },
    { user: 'Sarah Manager', role: 'SUPERVISOR', ip: '192.168.1.12', device: 'Safari / macOS', duration: '45m' },
    { user: 'Michael Finance', role: 'FINANCE', ip: '10.0.0.8', device: 'Edge / Windows', duration: '3h 10m' },
];

export default function AdminDashboard() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">System Administration</h1>
                    <p className="text-sm text-slate-500 mt-1">Real-time system monitoring and security overview.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1 rounded border border-slate-200 text-slate-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    SYSTEM ONLINE
                </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <CardSpotlight className="p-6 h-32" color="#3b82f6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Total Users</p>
                            <p className="text-3xl font-black text-white">1,248</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-500 opacity-50" />
                    </div>
                    <p className="text-[10px] text-blue-400 mt-2 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> 42 Currently Online
                    </p>
                </CardSpotlight>

                <CardSpotlight className="p-6 h-32" color="#10b981">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">System Health</p>
                            <p className="text-3xl font-black text-white">99.9%</p>
                        </div>
                        <Activity className="w-8 h-8 text-emerald-500 opacity-50" />
                    </div>
                    <p className="text-[10px] text-emerald-400 mt-2 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> All Services Stable
                    </p>
                </CardSpotlight>

                <CardSpotlight className="p-6 h-32" color="#f59e0b">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">API Requests</p>
                            <p className="text-3xl font-black text-white">4.2M</p>
                        </div>
                        <Server className="w-8 h-8 text-amber-500 opacity-50" />
                    </div>
                    <p className="text-[10px] text-amber-400 mt-2 font-bold flex items-center gap-1">
                        <Activity className="w-3 h-3" /> +15% vs Last Week
                    </p>
                </CardSpotlight>

                <CardSpotlight className="p-6 h-32" color="#ef4444">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">Security Alerts</p>
                            <p className="text-3xl font-black text-white">3</p>
                        </div>
                        <ShieldCheck className="w-8 h-8 text-rose-500 opacity-50" />
                    </div>
                    <p className="text-[10px] text-rose-400 mt-2 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Action Required
                    </p>
                </CardSpotlight>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Traffic Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[#0B1120] flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-600" /> API Traffic Load
                        </h3>
                        <select className="text-xs border-none bg-slate-50 rounded px-2 py-1 text-slate-600 outline-none">
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={TRAFFIC_DATA}>
                                <defs>
                                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRequests)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Service Health Status */}
                <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg border border-slate-800 text-slate-300">
                    <h3 className="font-bold text-white flex items-center gap-2 mb-6">
                        <Cpu className="w-5 h-5 text-emerald-500" /> Service Status
                    </h3>
                    <div className="space-y-4">
                        {SYSTEM_HEALTH.map((sys, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${sys.status === 'OPERATIONAL' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{sys.service}</p>
                                        <p className="text-[10px] text-slate-500 font-mono">Uptime: {sys.uptime}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-mono ${sys.status === 'WARN' ? 'text-amber-400' : 'text-emerald-400'}`}>
                                    {sys.latency}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View Detailed Metrics</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Recent Audits */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[#0B1120] flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-indigo-600" /> Recent Security Audits
                        </h3>
                        <button className="text-xs text-blue-600 font-medium hover:underline">View All Logs</button>
                    </div>
                    <div className="space-y-4">
                        {RECENT_AUDITS.map((log) => (
                            <div key={log.id} className="flex items-start gap-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                                <div className={`p-2 rounded-full ${log.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-600' :
                                        log.severity === 'HIGH' ? 'bg-amber-100 text-amber-600' :
                                            'bg-blue-100 text-blue-600'
                                    }`}>
                                    <AlertTriangle className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-bold text-slate-800">{log.action.replace(/_/g, ' ')}</p>
                                        <span className="text-[10px] text-slate-400 font-medium">{log.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-slate-500 font-mono">{log.user}</p>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${log.severity === 'CRITICAL' ? 'bg-rose-50 text-rose-600' :
                                                log.severity === 'HIGH' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-slate-100 text-slate-500'
                                            }`}>{log.severity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Sessions */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[#0B1120] flex items-center gap-2">
                            <Globe className="w-5 h-5 text-teal-600" /> Active Corporate Sessions
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Live
                        </div>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 bg-slate-50 uppercase border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 font-medium">User</th>
                                <th className="px-4 py-3 font-medium">Device / IP</th>
                                <th className="px-4 py-3 font-medium text-right">Duration</th>
                                <th className="px-4 py-3 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {ACTIVE_SESSIONS.map((session, idx) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                    <td className="px-4 py-3">
                                        <div className="font-bold text-slate-800">{session.user}</div>
                                        <div className="text-[10px] text-slate-500 font-mono">{session.role}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-slate-600 text-xs">{session.device}</div>
                                        <div className="text-[10px] text-slate-400 font-mono">{session.ip}</div>
                                    </td>
                                    <td className="px-4 py-3 text-right text-xs font-mono text-slate-600">
                                        {session.duration}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="text-xs font-bold text-rose-500 hover:bg-rose-50 px-2 py-1 rounded transition-colors">
                                            Kill
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
