'use client';

import React, { useState } from 'react';
import { Mail, Plus, Edit2, Eye, Copy, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmailTemplate {
    id: string;
    name: string;
    code: string;
    subject: string;
    category: 'AUTH' | 'PROCUREMENT' | 'FINANCE' | 'NOTIFICATION' | 'VENDOR';
    lastModified: string;
    isActive: boolean;
}

const TEMPLATES: EmailTemplate[] = [
    { id: '1', name: 'Welcome Email', code: 'WELCOME', subject: 'Welcome to Nexus Procura!', category: 'AUTH', lastModified: '2026-01-05', isActive: true },
    { id: '2', name: 'Password Reset', code: 'PWD_RESET', subject: 'Reset Your Password', category: 'AUTH', lastModified: '2026-01-03', isActive: true },
    { id: '3', name: 'PR Approval Request', code: 'PR_APPROVAL', subject: 'Action Required: PR {{pr_number}} Pending Approval', category: 'PROCUREMENT', lastModified: '2026-01-02', isActive: true },
    { id: '4', name: 'PO Issued', code: 'PO_ISSUED', subject: 'Purchase Order {{po_number}} Issued', category: 'PROCUREMENT', lastModified: '2025-12-28', isActive: true },
    { id: '5', name: 'Invoice Received', code: 'INV_RECEIVED', subject: 'Invoice {{invoice_number}} Received', category: 'FINANCE', lastModified: '2025-12-20', isActive: true },
    { id: '6', name: 'Payment Confirmation', code: 'PAYMENT_CONF', subject: 'Payment Processed - {{payment_number}}', category: 'FINANCE', lastModified: '2025-12-18', isActive: true },
    { id: '7', name: 'Vendor Registration', code: 'VENDOR_REG', subject: 'Registration Received - Pending Review', category: 'VENDOR', lastModified: '2025-12-15', isActive: true },
    { id: '8', name: 'Vendor Approved', code: 'VENDOR_APPROVED', subject: 'Congratulations! Your Registration is Approved', category: 'VENDOR', lastModified: '2025-12-15', isActive: true },
    { id: '9', name: 'RFQ Invitation', code: 'RFQ_INVITE', subject: 'Invitation to Quote - {{rfq_number}}', category: 'VENDOR', lastModified: '2025-12-10', isActive: true },
];

export default function EmailTemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const categories = ['ALL', 'AUTH', 'PROCUREMENT', 'FINANCE', 'VENDOR', 'NOTIFICATION'];
    const filteredTemplates = selectedCategory === 'ALL'
        ? TEMPLATES
        : TEMPLATES.filter(t => t.category === selectedCategory);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'AUTH': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'PROCUREMENT': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'FINANCE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'VENDOR': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'NOTIFICATION': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Email Templates</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage notification email templates for the system.</p>
                </div>
                <Button className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2">
                    <Plus className="w-4 h-4" /> New Template
                </Button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${selectedCategory === cat
                                ? 'bg-[#0052CC] text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded text-blue-600">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium text-[#0B1120]">{template.name}</h3>
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getCategoryColor(template.category)}`}>
                                                {template.category}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-mono mb-2">{template.code}</p>
                                        <p className="text-sm text-slate-600 mb-2">{template.subject}</p>
                                        <p className="text-xs text-slate-400">Last modified: {template.lastModified}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {template.isActive && (
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full" title="Active" />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                                <Button variant="ghost" size="sm" className="h-8 text-slate-600 hover:text-[#0052CC] gap-1">
                                    <Eye className="w-3 h-3" /> Preview
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 text-slate-600 hover:text-[#0052CC] gap-1">
                                    <Edit2 className="w-3 h-3" /> Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 text-slate-600 hover:text-slate-900 gap-1">
                                    <Copy className="w-3 h-3" /> Duplicate
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Variables Reference */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Available Variables</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="p-3 bg-slate-50 rounded">
                            <code className="text-xs text-[#0052CC]">{'{{user_name}}'}</code>
                            <p className="text-xs text-slate-500 mt-1">User's full name</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                            <code className="text-xs text-[#0052CC]">{'{{company_name}}'}</code>
                            <p className="text-xs text-slate-500 mt-1">Company name</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                            <code className="text-xs text-[#0052CC]">{'{{pr_number}}'}</code>
                            <p className="text-xs text-slate-500 mt-1">PR document number</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded">
                            <code className="text-xs text-[#0052CC]">{'{{po_number}}'}</code>
                            <p className="text-xs text-slate-500 mt-1">PO document number</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
