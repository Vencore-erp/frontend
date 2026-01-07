'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MFAPage() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate verification
        setTimeout(() => {
            router.push('/dashboard'); // Generic redirect, in real app assumes user role
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">

                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>

                <h2 className="text-2xl font-bold text-[#0B1120] mb-2">Two-Factor Authentication</h2>
                <p className="text-slate-500 mb-8 text-sm">We've sent a 6-digit code to your registered device. Please enter it below to continue.</p>

                <form onSubmit={handleVerify}>
                    <div className="flex justify-center gap-2 mb-8">
                        {otp.map((data, index) => (
                            <input
                                className="w-10 h-12 text-center text-xl font-mono font-bold border border-slate-300 rounded focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none"
                                type="text"
                                name="otp"
                                maxLength={1}
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 mb-4"
                    >
                        {isLoading ? 'Verifying...' : 'Verify Identity'}
                        {!isLoading && <ArrowRight className="w-4 h-4" />}
                    </button>
                </form>

                <p className="text-sm text-slate-500">
                    Didn't receive code? <button className="font-medium text-[#0052CC] hover:underline">Resend in 30s</button>
                </p>

                <div className="mt-6 pt-6 border-t border-slate-100">
                    <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-slate-700"> Back to Login</Link>
                </div>

            </div>
        </div>
    );
}
