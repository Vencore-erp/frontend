'use client';

import { Bell, ChevronRight, HelpCircle, Search, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-slate-500 capitalize">
                <span className="font-semibold text-[#0B1120]">NEXUS</span>
                {segments.map((segment, index) => (
                    <div key={segment} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
                        <span className={index === segments.length - 1 ? "text-[#0052CC] font-medium" : "hover:text-slate-800 transition-colors cursor-pointer"}>
                            {segment.replace(/-/g, ' ')}
                        </span>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0052CC] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search (Ctrl+K)"
                        className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 bg-slate-50 rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-[#0052CC] focus:border-[#0052CC] placeholder:text-slate-400 transition-all focus:bg-white"
                    />
                    <div className="absolute right-2 top-1.5 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-mono">
                        ⌘K
                    </div>
                </div>

                <div className="h-6 w-px bg-slate-200 mx-2" />

                <button className="p-2 text-slate-400 hover:text-[#0B1120] hover:bg-slate-50 rounded-full transition-all relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-1 ring-rose-500"></span>
                </button>

                <button className="p-2 text-slate-400 hover:text-[#0B1120] hover:bg-slate-50 rounded-full transition-all">
                    <HelpCircle className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
