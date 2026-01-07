'use client';

import React from 'react';
import { Save, Building2, Mail, Bell, Globe, Database } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">

            <div>
                <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">System Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Configure global system preferences and integrations.</p>
            </div>

            {/* Company Profile */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-blue-50 rounded text-blue-600">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-[#0B1120]">Company Profile</h3>
                        <p className="text-xs text-slate-500">Organization information displayed across the system</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Company Name</label>
                        <input type="text" defaultValue="PT. XYZ Corporation" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Tax ID (NPWP)</label>
                        <input type="text" defaultValue="01.234.567.8-901.000" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Address</label>
                        <textarea rows={2} defaultValue="Jl. Sudirman No. 123, Jakarta Pusat 10220" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none resize-none" />
                    </div>
                </div>
            </div>

            {/* Email Configuration */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-[#0B1120]">Email Configuration</h3>
                        <p className="text-xs text-slate-500">SMTP settings for system notifications</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">SMTP Host</label>
                        <input type="text" defaultValue="smtp.company.com" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">SMTP Port</label>
                        <input type="text" defaultValue="587" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">From Email</label>
                        <input type="email" defaultValue="noreply@company.com" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">From Name</label>
                        <input type="text" defaultValue="NEXUS PROCURA" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                    </div>
                </div>
            </div>

            {/* System Preferences */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-purple-50 rounded text-purple-600">
                        <Globe className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-[#0B1120]">System Preferences</h3>
                        <p className="text-xs text-slate-500">Regional and display settings</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Default Currency</label>
                        <select className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all">
                            <option>IDR - Indonesian Rupiah</option>
                            <option>USD - US Dollar</option>
                            <option>SGD - Singapore Dollar</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Timezone</label>
                        <select className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all">
                            <option>Asia/Jakarta (WIB, UTC+7)</option>
                            <option>Asia/Makassar (WITA, UTC+8)</option>
                            <option>Asia/Jayapura (WIT, UTC+9)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Date Format</label>
                        <select className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all">
                            <option>DD MMM YYYY (06 Jan 2026)</option>
                            <option>YYYY-MM-DD (2026-01-06)</option>
                            <option>DD/MM/YYYY (06/01/2026)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Session Timeout (minutes)</label>
                        <input type="number" defaultValue="30" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                    </div>
                </div>
            </div>

            {/* Approval Thresholds */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-amber-50 rounded text-amber-600">
                        <Database className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-[#0B1120]">Approval Thresholds</h3>
                        <p className="text-xs text-slate-500">Configure automatic approval rules based on amount</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded border border-slate-200">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[#0B1120]">Auto-approve threshold</p>
                            <p className="text-xs text-slate-500">PRs below this amount skip supervisor approval</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">IDR</span>
                            <input type="number" defaultValue="5000000" className="w-32 text-sm border border-slate-300 rounded px-3 py-1.5 text-right font-mono" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded border border-slate-200">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[#0B1120]">High-value threshold</p>
                            <p className="text-xs text-slate-500">PRs above this require additional Finance approval</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">IDR</span>
                            <input type="number" defaultValue="1000000000" className="w-32 text-sm border border-slate-300 rounded px-3 py-1.5 text-right font-mono" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <button className="w-full py-3 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save All Settings
            </button>

        </div>
    );
}
