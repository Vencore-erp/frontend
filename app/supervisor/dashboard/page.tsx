'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';

export default function SupervisorDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Supervisor Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-amber-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Pending Approvals</CardTitle>
                        <Clock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">3</div>
                        <p className="text-xs text-slate-500 mt-1">Requisitions waiting for review</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-emerald-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Approved (MTD)</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">12</div>
                        <p className="text-xs text-slate-500 mt-1">Total value: IDR 450M</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-rose-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Budget Alerts</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">1</div>
                        <p className="text-xs text-slate-500 mt-1">IT Dept at 95% usage</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100/50 p-2 rounded">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">PR-2026-00{i}: Office Supplies</p>
                                        <p className="text-xs text-slate-500">Requested by Alexander Pierce • 2 hours ago</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 text-xs font-medium bg-[#0052CC] text-white rounded hover:bg-blue-700">Review</button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
