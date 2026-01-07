'use client';

import React from 'react';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Check, X, FileText, Globe, Building2 } from 'lucide-react';

const PENDING_VENDORS = [
    {
        id: 'REG-2026-001',
        company: 'PT. Digital Solusi Pratama',
        category: 'IT Services',
        email: 'contact@dsp.co.id',
        submittedAt: '2 hours ago',
        documents: ['SIUP', 'NPWP', 'Company Profile'],
        status: 'PENDING_REVIEW'
    },
    {
        id: 'REG-2026-003',
        company: 'CV. Maju Jaya Furniture',
        category: 'Office Supplies',
        email: 'sales@majujaya.com',
        submittedAt: '1 day ago',
        documents: ['SIUP', 'NPWP'],
        status: 'PENDING_DOCS'
    },
    {
        id: 'REG-2026-005',
        company: 'Global Tech Systems Ltd',
        category: 'Hardware',
        email: 'biz@gts.com.sg',
        submittedAt: '3 days ago',
        documents: ['Tax ID', 'Inc Cert'],
        status: 'PENDING_KYC'
    }
];

export default function VendorApprovals() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Vendor Registration Approvals</h1>
                <p className="text-sm text-slate-500 mt-1">Review and approve new vendor applications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PENDING_VENDORS.map((vendor) => (
                    <CardSpotlight key={vendor.id} className="h-full flex flex-col justify-between p-6">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-neutral-800 rounded-lg">
                                    <Building2 className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="text-[10px] font-mono text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded">
                                    {vendor.id}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{vendor.company}</h3>
                            <p className="text-sm text-neutral-400 mb-4">{vendor.category}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-xs text-neutral-300">
                                    <Globe className="w-4 h-4 text-neutral-500" />
                                    {vendor.email}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-neutral-300">
                                    <FileText className="w-4 h-4 text-neutral-500" />
                                    {vendor.documents.length} Documents Submitted
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-800">
                            <button className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors">
                                <Check className="w-3 h-3" /> Approve
                            </button>
                            <button className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors border border-neutral-700">
                                <X className="w-3 h-3" /> Reject
                            </button>
                        </div>
                    </CardSpotlight>
                ))}
            </div>
        </div>
    );
}
