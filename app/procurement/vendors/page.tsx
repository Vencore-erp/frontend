'use client';

import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const VENDORS = [
    { id: 'VN-1001', name: 'IBM INDONESIA', category: 'IT Solutions', rating: 'A (Low Risk)', status: 'ACTIVE' },
    { id: 'VN-1042', name: 'GRAHA SARANA', category: 'General Supplies', rating: 'B (Medium)', status: 'ACTIVE' },
    { id: 'VN-2055', name: 'NETWORKS LTD', category: 'Telecommunications', rating: 'A (Low Risk)', status: 'PENDING' },
    { id: 'VN-0000', name: 'UNKNOWN VENDOR', category: 'Services', rating: 'C (High Risk)', status: 'BLACKLISTED' },
];

export default function VendorListPage() {
    const handleOnboard = () => {
        toast.info("Vendor Onboarding Started", { description: "Redirecting to qualification form..." });
    };

    const columns = [
        { header: 'Vendor ID', accessorKey: 'id', cell: (item: any) => <span className="font-mono font-medium text-[#0052CC]">{item.id}</span> },
        { header: 'Company Name', accessorKey: 'name', className: 'font-bold' },
        { header: 'Category', accessorKey: 'category' },
        {
            header: 'Risk Rating', accessorKey: 'rating', cell: (item: any) => (
                <span className={cn(
                    "font-medium text-xs",
                    item.rating.includes('A') ? "text-emerald-600" : item.rating.includes('B') ? "text-amber-600" : "text-rose-600"
                )}>
                    {item.rating}
                </span>
            )
        },
        { header: 'Status', accessorKey: 'status', cell: (item: any) => <StatusBadge status={item.status} /> },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vendor Database</h1>
                    <p className="text-sm text-slate-500 mt-1">Master data and risk assessment for suppliers.</p>
                </div>
                <Button onClick={handleOnboard} className="bg-[#0052CC] hover:bg-blue-700 shadow-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Onboard Vendor
                </Button>
            </div>

            <DataTable
                data={VENDORS}
                columns={columns}
            />
        </div>
    );
}
