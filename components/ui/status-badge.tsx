import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    Clock,
    AlertTriangle,
    XCircle,
    HelpCircle
} from "lucide-react";

export type StatusType =
    | 'APPROVED'
    | 'PENDING'
    | 'REJECTED'
    | 'DRAFT'
    | 'REVIEW'
    | 'RISK_HIGH'
    | 'RISK_MED'
    | 'RISK_LOW';

interface StatusBadgeProps {
    status: string; // Accepts string to be flexible with DB values
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    // Normalize status
    const normalizedStatus = status.toUpperCase().replace(/ /g, '_');

    let styles = "bg-slate-100 text-slate-600 border-slate-200";
    let icon = HelpCircle;

    if (normalizedStatus.includes('APPROVED') || normalizedStatus === 'COMPLETED' || normalizedStatus === 'PAID') {
        styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
        icon = CheckCircle2;
    } else if (normalizedStatus.includes('PENDING') || normalizedStatus === 'OPEN' || normalizedStatus === 'SUBMITTED') {
        styles = "bg-amber-50 text-amber-700 border-amber-200";
        icon = Clock;
    } else if (normalizedStatus.includes('REJECTED') || normalizedStatus === 'CANCELLED') {
        styles = "bg-slate-100 text-slate-500 border-slate-200 line-through decoration-slate-400";
        icon = XCircle;
    } else if (normalizedStatus === 'DRAFT') {
        styles = "bg-slate-100 text-slate-600 border-slate-200 border-dashed";
        icon = File;
    } else if (normalizedStatus.includes('RISK_HIGH') || normalizedStatus === 'CRITICAL') {
        styles = "bg-rose-50 text-rose-700 border-rose-200 font-bold";
        icon = AlertTriangle;
    } else if (normalizedStatus.includes('RISK_MED')) {
        styles = "bg-amber-50 text-amber-700 border-amber-200";
        icon = AlertTriangle;
    } else if (normalizedStatus.includes('RISK_LOW')) {
        styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
        icon = CheckCircle2;
    }

    const Icon = icon;

    return (
        <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
            styles,
            className
        )}>
            <Icon className="w-3 h-3 mr-1.5" />
            {status.replace(/_/g, ' ')}
        </span>
    );
}

// Fallback icon for Import
import { File } from "lucide-react";
