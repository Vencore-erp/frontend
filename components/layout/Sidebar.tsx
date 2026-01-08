'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    FileText,
    Search,
    ShoppingBag,
    CreditCard,
    Users,
    Building2,
    Bell,
    ShieldCheck,
    Settings,
    LogOut,
    ChevronDown
} from 'lucide-react';

interface SidebarProps {
    role: 'OPERATOR' | 'SUPERVISOR' | 'FINANCE' | 'ADMIN' | 'VENDOR' | 'PROCUREMENT';
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const NAV_ITEMS = {
        OPERATOR: [
            { href: '/operator/dashboard', label: 'Dasbor', icon: LayoutDashboard },
            { href: '/operator/contracts', label: 'Kontrak Saya', icon: FileText },
            { href: '/procurement/pr', label: 'Permintaan Saya', icon: FileText },
            { href: '/procurement/rfq', label: 'Manajemen RFQ', icon: Search },
            { href: '/procurement/po', label: 'Pesanan Pembelian', icon: ShoppingBag },
        ],
        SUPERVISOR: [
            { href: '/supervisor/dashboard', label: 'Ringkasan', icon: LayoutDashboard },
            { href: '/procurement/approvals', label: 'Persetujuan', icon: ShieldCheck },
            { href: '/finance/budget', label: 'Kontrol Anggaran', icon: CreditCard },
            { href: '/reports', label: 'Laporan Tim', icon: FileText },
        ],
        FINANCE: [
            { href: '/finance/dashboard', label: 'Ringkasan Keuangan', icon: LayoutDashboard },
            { href: '/finance/invoices', label: 'Faktur & Tagihan', icon: FileText },
            { href: '/finance/payments', label: 'Pembayaran', icon: CreditCard },
            { href: '/finance/tax', label: 'Kepatuhan Pajak', icon: Building2 },
        ],
        ADMIN: [
            { href: '/admin/dashboard', label: 'Kesehatan Sistem', icon: LayoutDashboard },
            { href: '/admin/users', label: 'Manajemen User', icon: Users },
            { href: '/admin/audit', label: 'Audit Log', icon: ShieldCheck },
            { href: '/admin/config', label: 'Konfigurasi', icon: Settings },
        ],
        VENDOR: [
            { href: '/vendor/dashboard', label: 'Beranda Portal', icon: LayoutDashboard },
            { href: '/vendor/rfq', label: 'RFQ Terbuka', icon: Search },
            { href: '/vendor/orders', label: 'Pesanan Saya', icon: ShoppingBag },
            { href: '/vendor/invoices', label: 'Faktur Saya', icon: FileText },
        ],
        PROCUREMENT: [
            { href: '/procurement/dashboard', label: 'Dasbor', icon: LayoutDashboard },
            { href: '/procurement/pr', label: 'Permintaan (PR)', icon: FileText },
            { href: '/procurement/rfq', label: 'Manajemen RFQ', icon: Search },
            { href: '/procurement/po', label: 'Pesanan Pembelian', icon: ShoppingBag },
            { href: '/procurement/vendors', label: 'Daftar Vendor', icon: Building2 },
        ]
    };

    const currentNav = NAV_ITEMS[role] || NAV_ITEMS.OPERATOR;

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-[#0B1120] text-slate-300 flex flex-col z-50 border-r border-slate-800">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-white/10">
                <Building2 className="w-5 h-5 text-white mr-3" />
                <span className="font-bold text-white text-lg tracking-tight">
                    PT XYZ<span className="font-light text-slate-400"> E-PROCUREMENT</span>
                </span>
            </div>

            {/* Role Badge */}
            <div className="px-6 py-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0052CC] bg-[#0052CC]/10 px-2 py-1 rounded w-fit border border-[#0052CC]/20">
                    {role} WORKSPACE
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {currentNav.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group",
                                isActive
                                    ? "bg-[#0052CC] text-white shadow-lg shadow-blue-900/20"
                                    : "hover:bg-white/5 text-slate-400 hover:text-white"
                            )}
                        >
                            <item.icon className={cn(
                                "w-4 h-4 mr-3 transition-colors",
                                isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                            )} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0F172A]">
                <button className="flex items-center gap-3 w-full hover:bg-white/5 p-2 rounded-lg transition-colors text-left group">
                    <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-xs font-bold text-white ring-1 ring-white/10">
                        AP
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">Alexander P.</p>
                        <p className="text-[10px] text-slate-500 truncate group-hover:text-slate-400">View Profile</p>
                    </div>
                    <Settings className="w-4 h-4 text-slate-500 group-hover:text-white" />
                </button>
            </div>
        </aside>
    );
}
