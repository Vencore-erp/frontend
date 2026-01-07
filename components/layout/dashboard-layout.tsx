'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role?: 'ADMIN' | 'PROCUREMENT' | 'FINANCE' | 'SUPERVISOR' | 'OPERATOR' | 'VENDOR';
}

export function DashboardLayout({ children, role = 'OPERATOR' }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role={role} />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
