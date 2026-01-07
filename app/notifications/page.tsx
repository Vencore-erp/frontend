'use client';

import React, { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, FileText, ShoppingBag, CreditCard, AlertTriangle } from 'lucide-react';

const NOTIFICATIONS = [
    { id: 1, type: 'APPROVAL', title: 'PR Approved', message: 'PR-2026-001 telah disetujui oleh Supervisor', time: '10 minutes ago', read: false, link: '/procurement/pr/PR-2026-001' },
    { id: 2, type: 'RFQ', title: 'New RFQ Response', message: '3 vendor telah merespon RFQ-9901', time: '1 hour ago', read: false, link: '/procurement/rfq/RFQ-9901' },
    { id: 3, type: 'PAYMENT', title: 'Payment Processed', message: 'Pembayaran IDR 4.5B ke IBM INDONESIA berhasil', time: '3 hours ago', read: true, link: '/finance/payments/PMT-2026-0042' },
    { id: 4, type: 'ALERT', title: 'Budget Alert', message: 'Budget CC-102 mencapai 85% utilisasi', time: 'Yesterday', read: true, link: '/finance/budget' },
    { id: 5, type: 'APPROVAL', title: 'PO Pending Approval', message: 'PO-2026-8810 membutuhkan persetujuan Anda', time: '2 days ago', read: true, link: '/procurement/po/PO-2026-8810' },
];

export default function NotificationCenterPage() {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'APPROVAL': return FileText;
            case 'RFQ': return ShoppingBag;
            case 'PAYMENT': return CreditCard;
            case 'ALERT': return AlertTriangle;
            default: return Bell;
        }
    };

    const getIconStyle = (type: string) => {
        switch (type) {
            case 'APPROVAL': return 'bg-blue-50 text-blue-600';
            case 'RFQ': return 'bg-purple-50 text-purple-600';
            case 'PAYMENT': return 'bg-emerald-50 text-emerald-600';
            case 'ALERT': return 'bg-amber-50 text-amber-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Notifications</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        You have <span className="font-bold text-[#0052CC]">{unreadCount}</span> unread notifications
                    </p>
                </div>
                <button onClick={markAllRead} className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <CheckCheck className="w-4 h-4 mr-2" /> Mark all as read
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded shadow-sm divide-y divide-slate-100">
                {notifications.map((notif) => {
                    const Icon = getIcon(notif.type);
                    return (
                        <div key={notif.id} className={`p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                            <div className={`p-2 rounded ${getIconStyle(notif.type)}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-[#0B1120]">{notif.title}</p>
                                    {!notif.read && <span className="w-2 h-2 rounded-full bg-[#0052CC]" />}
                                </div>
                                <p className="text-sm text-slate-600 mt-0.5">{notif.message}</p>
                                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!notif.read && (
                                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-[#0052CC]" title="Mark as read">
                                        <Check className="w-4 h-4" />
                                    </button>
                                )}
                                <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-rose-600" title="Delete">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
