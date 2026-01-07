'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm">

                {!submitted ? (
                    <>
                        <h2 className="text-2xl font-bold text-[#0B1120] mb-2">Reset Password</h2>
                        <p className="text-slate-500 mb-8 text-sm">Enter the email address associated with your account and we'll send you a link to reset your password.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none transition-all"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                                Send Reset Link
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0B1120] mb-2">Check your email</h2>
                        <p className="text-slate-500 mb-8 text-sm">We have sent a password reset link to your email address.</p>
                        <button onClick={() => setSubmitted(false)} className="text-sm font-medium text-[#0052CC] hover:underline">
                            Try another email
                        </button>
                    </div>
                )}

                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                    <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-slate-700">Back to Login</Link>
                </div>

            </div>
        </div>
    );
}
