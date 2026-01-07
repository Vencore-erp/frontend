'use client';

import React from 'react';
import { BarChart3, PieChart, TrendingUp, FileText, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const REPORT_CATEGORIES = [
    {
        title: 'Procurement',
        icon: FileText,
        color: 'blue',
        reports: [
            { name: 'PR Cycle Time Analysis', path: '/reports/procurement/pr', desc: 'Requisition processing metrics' },
            { name: 'Spending Analysis', path: '/reports/procurement/spending', desc: 'Category and department breakdown' },
            { name: 'PO Summary', path: '/reports/procurement/po', desc: 'Order status and trends' },
        ]
    },
    {
        title: 'Vendor',
        icon: TrendingUp,
        color: 'emerald',
        reports: [
            { name: 'Vendor Performance', path: '/reports/vendor/performance', desc: 'Delivery and quality metrics' },
            { name: 'Transaction History', path: '/reports/vendor/transaction', desc: 'Spend by vendor' },
        ]
    },
    {
        title: 'Finance',
        icon: PieChart,
        color: 'purple',
        reports: [
            { name: 'Payment Report', path: '/reports/finance/payment', desc: 'Cash flow and aging' },
            { name: 'Invoice Aging', path: '/reports/finance/aging', desc: 'Outstanding payables' },
            { name: 'Tax Summary', path: '/reports/finance/tax', desc: 'PPN/PPh breakdown' },
        ]
    },
];

export default function ReportsDashboard() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Reports & Analytics</h1>
                    <p className="text-sm text-slate-500 mt-1">Access insights and export data.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REPORT_CATEGORIES.map((category) => (
                    <div key={category.title} className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
                        <div className={`px-6 py-4 bg-${category.color}-50 border-b border-slate-200 flex items-center gap-3`}>
                            <category.icon className={`w-5 h-5 text-${category.color}-600`} />
                            <h3 className="font-bold text-sm text-[#0B1120]">{category.title} Reports</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {category.reports.map((report) => (
                                <Link key={report.path} href={report.path} className="block px-6 py-4 hover:bg-slate-50 transition-colors group">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-[#0B1120] group-hover:text-[#0052CC]">{report.name}</p>
                                            <p className="text-xs text-slate-500">{report.desc}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0052CC]" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-50 p-6 rounded border border-slate-200">
                <h3 className="font-bold text-sm text-[#0B1120] mb-4">Recently Generated</h3>
                <div className="space-y-3">
                    {[
                        { name: 'Q4 2025 Spending Report.xlsx', date: '2026-01-05', size: '2.4 MB' },
                        { name: 'Vendor Performance Dec 2025.pdf', date: '2026-01-02', size: '1.1 MB' },
                    ].map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border border-slate-200">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-[#0B1120]">{file.name}</p>
                                    <p className="text-xs text-slate-500">{file.date} • {file.size}</p>
                                </div>
                            </div>
                            <button className="text-xs font-medium text-[#0052CC] hover:underline flex items-center gap-1">
                                <Download className="w-3 h-3" /> Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
