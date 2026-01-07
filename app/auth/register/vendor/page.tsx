'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Check, UploadCloud, Building2, User } from 'lucide-react';

export default function VendorRegistrationPage() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-[#0B1120] tracking-tight">Vendor Registration</h1>
                    <p className="text-slate-500 mt-2">Join the Nexus Bank procurement network.</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-white border-2 ${step >= s ? 'border-[#0052CC] text-[#0052CC]' : 'border-slate-300 text-slate-300'} ${step > s ? 'bg-[#0052CC] text-white border-[#0052CC]' : ''}`}>
                            {step > s ? <Check className="w-5 h-5" /> : s}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Step 1: Company Info */}
                    {step === 1 && (
                        <div className="p-8 space-y-6">
                            <div className="border-b border-slate-100 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-[#0B1120] flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-slate-400" />
                                    Company Information
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Legal Name</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#0052CC] outline-none" placeholder="PT. Example Indonesia" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Tax ID (NPWP)</label>
                                    <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#0052CC] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Type</label>
                                    <select className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#0052CC] outline-none bg-white">
                                        <option>Limited Liability Company (PT)</option>
                                        <option>Commanditaire Vennootschap (CV)</option>
                                        <option>Individual</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Registered Address</label>
                                    <textarea className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#0052CC] outline-none" rows={3}></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Documents */}
                    {step === 2 && (
                        <div className="p-8 space-y-6">
                            <div className="border-b border-slate-100 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-[#0B1120] flex items-center gap-2">
                                    <UploadCloud className="w-5 h-5 text-slate-400" />
                                    Legal Documents
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#0052CC] mb-2 transition-colors" />
                                    <p className="text-sm font-medium text-[#0B1120]">Upload NIB (Nomor Induk Berusaha)</p>
                                    <p className="text-xs text-slate-500 mt-1">PDF, Max 5MB</p>
                                </div>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#0052CC] mb-2 transition-colors" />
                                    <p className="text-sm font-medium text-[#0B1120]">Upload Tax Card (NPWP)</p>
                                    <p className="text-xs text-slate-500 mt-1">JPG, PNG, PDF</p>
                                </div>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                    <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-[#0052CC] mb-2 transition-colors" />
                                    <p className="text-sm font-medium text-[#0B1120]">Upload Company Deed (Akta)</p>
                                    <p className="text-xs text-slate-500 mt-1">PDF (All Pages)</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                        <div className="p-8 text-center space-y-6">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                                <Check className="w-10 h-10 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#0B1120]">Submission Received</h3>
                                <p className="text-slate-500 mt-2 max-w-md mx-auto">Thank you for registering. Our Procurement Team will review your documents. You will receive an email notification within 3-5 business days.</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded text-sm text-slate-600 border border-slate-200 inline-block text-left">
                                <p><span className="font-bold">Reference ID:</span> REG-2026-8821</p>
                                <p><span className="font-bold">Email:</span> procurement@nexusbank.co.id</p>
                            </div>
                        </div>
                    )}

                    {/* Footer Navigation */}
                    <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-between items-center">
                        {step < 3 ? (
                            <>
                                <button
                                    onClick={() => setStep(step - 1)}
                                    disabled={step === 1}
                                    className="text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-50"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="px-6 py-2 bg-[#0052CC] hover:bg-blue-700 text-white text-sm font-bold rounded flex items-center gap-2"
                                >
                                    {step === 2 ? 'Submit Registration' : 'Continue'} <ChevronRight className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="w-full text-center text-[#0052CC] font-bold text-sm hover:underline">
                                Back to Login
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
