'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Check } from 'lucide-react';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [success, setSuccess] = useState(false);

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === confirm) {
            setSuccess(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm">

                {!success ? (
                    <>
                        <h2 className="text-2xl font-bold text-[#0B1120] mb-2">Set New Password</h2>
                        <p className="text-slate-500 mb-8 text-sm">Please choose a strong password for your account.</p>

                        <form onSubmit={handleReset} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {/* Password Strength Indicator Mock */}
                                {password.length > 0 && (
                                    <div className="mt-2 flex gap-1 h-1">
                                        <div className={`flex-1 rounded-full ${password.length > 4 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                        <div className={`flex-1 rounded-full ${password.length > 8 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                        <div className={`flex-1 rounded-full ${password.length > 10 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={password !== confirm || password.length === 0}
                                className="w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg shadow-sm transition-all"
                            >
                                Reset Password
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0B1120] mb-2">Password Updated</h2>
                        <p className="text-slate-500 mb-8 text-sm">Your password has been securely updated. You can now sign in with your new credentials.</p>
                        <Link href="/login" className="block w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all">
                            Sign In
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
