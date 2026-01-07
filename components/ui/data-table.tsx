'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, Search, Filter } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    title?: string;
    searchPlaceholder?: string;
    onSearch?: (term: string) => void;
    actions?: React.ReactNode;
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    title,
    searchPlaceholder = "Search...",
    actions
}: DataTableProps<T>) {
    return (
        <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col">
            {/* Table Header / Toolbar */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-[#0B1120] text-sm">{title || 'Data List'}</h3>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0052CC] w-48 transition-all"
                        />
                    </div>
                    <button className="flex items-center px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-600 hover:bg-slate-50">
                        <Filter className="w-3 h-3 mr-1.5" />
                        Filter
                    </button>
                    {actions}
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#F8FAFC] border-b border-slate-200 sticky top-0 z-10">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className={cn(
                                        "px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider",
                                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                                        col.className
                                    )}
                                >
                                    <div className={cn("flex items-center gap-1", col.align === 'right' && "justify-end", col.align === 'center' && "justify-center")}>
                                        {col.header}
                                        <ArrowUpDown className="w-3 h-3 text-slate-300 cursor-pointer hover:text-slate-500" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {data.map((item, rowIdx) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                {columns.map((col, colIdx) => (
                                    <td
                                        key={colIdx}
                                        className={cn(
                                            "px-6 py-2.5 whitespace-nowrap text-sm text-[#0B1120]",
                                            col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                                            col.className
                                        )}
                                    >
                                        {col.cell ? col.cell(item) : (item[col.accessorKey as keyof T] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30">
                <div>
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{data.length}</span> of <span className="font-medium">{data.length}</span> results
                </div>
                <div className="flex gap-1">
                    <button className="p-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled><ChevronsLeft className="w-4 h-4" /></button>
                    <button className="p-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-1 border border-slate-300 rounded hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
                    <button className="p-1 border border-slate-300 rounded hover:bg-slate-50"><ChevronsRight className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
}
