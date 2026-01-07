'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">System Administration</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-slate-700" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">45</div>
                        <p className="text-xs text-slate-500 mt-1">12 currently online</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-emerald-600">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">System Health</CardTitle>
                        <Activity className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">99.9%</div>
                        <p className="text-xs text-slate-500 mt-1">All services operational</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
