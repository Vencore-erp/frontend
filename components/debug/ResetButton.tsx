'use client';

import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function ResetButton() {
    const handleReset = () => {
        if (confirm('⚠️ RESET SIMULATION?\n\nThis will clear all local storage and sign you out. Use this to start a fresh testing session.')) {
            localStorage.clear();
            toast.success('Simulation Reset!');
            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
        }
    };

    return (
        <button
            onClick={handleReset}
            className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 px-3 py-2 bg-slate-900 text-white text-xs font-medium rounded-full opacity-30 hover:opacity-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            title="Reset Simulation State"
        >
            <RefreshCw className="w-3 h-3" />
            <span>Reset State</span>
        </button>
    );
}
