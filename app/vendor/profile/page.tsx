'use client';

import React, { useState } from 'react';
import { Building2, User, CreditCard, FileText, Save, Upload, AlertTriangle } from 'lucide-react';

export default function VendorProfilePage() {
    const [activeTab, setActiveTab] = useState('company');

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">

            {/* Header with Progress */}
            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-7 h-7 text-slate-400" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[#0B1120]">PT. Tech Solutions Indonesia</h1>
                            <p className="text-sm text-slate-500">Vendor ID: <span className="font-mono">VN-88201</span></p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500 mb-1">Profile Completion</p>
                        <div className="flex items-center gap-2">
                            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="w-4/5 h-full bg-emerald-500" />
                            </div>
                            <span className="text-sm font-bold text-emerald-600">80%</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Your SIUP document will expire in 15 days. Please upload a renewed version.</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {[
                        { id: 'company', label: 'Company Info', icon: Building2 },
                        { id: 'contacts', label: 'Contacts', icon: User },
                        { id: 'bank', label: 'Bank Accounts', icon: CreditCard },
                        { id: 'documents', label: 'Documents', icon: FileText },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                                ${activeTab === tab.id
                                    ? 'border-[#0052CC] text-[#0052CC]'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }
                            `}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'company' && (
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider border-b border-slate-100 pb-2">Company Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Company Name</label>
                            <input type="text" defaultValue="PT. Tech Solutions Indonesia" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Tax ID (NPWP)</label>
                            <input type="text" defaultValue="01.234.567.8-901.000" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Address</label>
                            <textarea rows={2} defaultValue="Jl. Gatot Subroto No. 123, Jakarta Selatan 12930" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone</label>
                            <input type="tel" defaultValue="+62 21 5555 1234" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Website</label>
                            <input type="url" defaultValue="https://techsolutions.co.id" className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Business Category</label>
                            <div className="flex flex-wrap gap-2">
                                {['IT Solutions', 'Software', 'Hardware', 'Consulting'].map((cat, idx) => (
                                    <label key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded border border-slate-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors">
                                        <input type="checkbox" defaultChecked={idx < 2} className="w-4 h-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" />
                                        <span className="text-sm">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            )}

            {activeTab === 'contacts' && (
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider">Contact Persons</h3>
                        <button className="text-xs font-medium text-[#0052CC] hover:underline">+ Add Contact</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Budi Santoso', role: 'Sales Director', email: 'budi@techsolutions.co.id', phone: '+62 812 1234 5678', primary: true },
                            { name: 'Siti Rahayu', role: 'Finance Manager', email: 'siti@techsolutions.co.id', phone: '+62 812 8765 4321', primary: false },
                        ].map((contact, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded border border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                                        {contact.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#0B1120]">
                                            {contact.name}
                                            {contact.primary && <span className="ml-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">PRIMARY</span>}
                                        </p>
                                        <p className="text-xs text-slate-500">{contact.role}</p>
                                    </div>
                                </div>
                                <div className="text-right text-xs text-slate-500">
                                    <p>{contact.email}</p>
                                    <p>{contact.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'bank' && (
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider">Bank Accounts</h3>
                        <button className="text-xs font-medium text-[#0052CC] hover:underline">+ Add Account</button>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded border border-slate-200">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">PRIMARY</span>
                                <button className="text-xs text-slate-500 hover:text-[#0052CC]">Edit</button>
                            </div>
                            <p className="text-sm font-bold text-[#0B1120]">Bank Central Asia (BCA)</p>
                            <p className="text-lg font-mono text-[#0B1120] mt-1">1234567890</p>
                            <p className="text-xs text-slate-500 mt-1">a/n PT. Tech Solutions Indonesia</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'documents' && (
                <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider border-b border-slate-100 pb-2">Legal Documents</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'SIUP', file: 'siup_2024.pdf', expiry: '2026-01-21', status: 'EXPIRING' },
                            { name: 'TDP', file: 'tdp_2024.pdf', expiry: '2027-06-15', status: 'VALID' },
                            { name: 'NPWP', file: 'npwp_2024.pdf', expiry: null, status: 'VALID' },
                            { name: 'Akta Perusahaan', file: null, expiry: null, status: 'MISSING' },
                        ].map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded border border-slate-200">
                                <div className="flex items-center gap-4">
                                    <FileText className="w-8 h-8 text-slate-400" />
                                    <div>
                                        <p className="text-sm font-medium text-[#0B1120]">{doc.name}</p>
                                        {doc.file ? (
                                            <p className="text-xs text-slate-500">{doc.file}</p>
                                        ) : (
                                            <p className="text-xs text-rose-500">Not uploaded</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {doc.expiry && (
                                        <span className={`text-xs ${doc.status === 'EXPIRING' ? 'text-amber-600 font-medium' : 'text-slate-500'}`}>
                                            Exp: {doc.expiry}
                                        </span>
                                    )}
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${doc.status === 'VALID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            doc.status === 'EXPIRING' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                'bg-rose-50 text-rose-700 border-rose-200'
                                        }`}>
                                        {doc.status}
                                    </span>
                                    <button className="text-xs font-medium text-[#0052CC] hover:underline flex items-center gap-1">
                                        <Upload className="w-3 h-3" /> Upload
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
