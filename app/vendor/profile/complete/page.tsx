'use client';

import React, { useState } from 'react';
import { CheckCircle, Building, User, CreditCard, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const STEPS = [
    { id: 1, title: 'Company Information', icon: Building, description: 'Basic company details and address' },
    { id: 2, title: 'Contact Person', icon: User, description: 'Primary contact information' },
    { id: 3, title: 'Bank Account', icon: CreditCard, description: 'Payment receiving details' },
    { id: 4, title: 'Documents', icon: FileText, description: 'Legal and compliance documents' },
];

export default function ProfileCompletionPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const handleNext = () => {
        if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep]);
        }
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const progress = (completedSteps.length / STEPS.length) * 100;

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Complete Your Profile</h1>
                <p className="text-sm text-slate-500 mt-1">Fill in all required information to start receiving RFQ invitations.</p>
            </div>

            {/* Progress Bar */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-slate-600">Profile Completion</span>
                    <span className="text-lg font-bold text-[#0052CC]">{progress.toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#0052CC] to-blue-400 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Steps Indicator */}
            <div className="flex justify-between">
                {STEPS.map((step) => (
                    <div
                        key={step.id}
                        className={`flex-1 flex flex-col items-center ${step.id !== STEPS.length ? 'relative' : ''}`}
                    >
                        {step.id !== STEPS.length && (
                            <div className={`absolute top-5 left-1/2 w-full h-0.5 ${completedSteps.includes(step.id) ? 'bg-[#0052CC]' : 'bg-slate-200'
                                }`} />
                        )}
                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${completedSteps.includes(step.id)
                                ? 'bg-[#0052CC] text-white'
                                : currentStep === step.id
                                    ? 'bg-white border-2 border-[#0052CC] text-[#0052CC]'
                                    : 'bg-slate-100 text-slate-400'
                            }`}>
                            {completedSteps.includes(step.id) ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <step.icon className="w-5 h-5" />
                            )}
                        </div>
                        <p className={`mt-2 text-xs font-medium text-center ${currentStep === step.id ? 'text-[#0052CC]' : 'text-slate-500'
                            }`}>
                            {step.title}
                        </p>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        {React.createElement(STEPS[currentStep - 1].icon, { className: 'w-5 h-5 text-[#0052CC]' })}
                        {STEPS[currentStep - 1].title}
                    </CardTitle>
                    <p className="text-sm text-slate-500">{STEPS[currentStep - 1].description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {currentStep === 1 && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="PT Example Company" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tax ID (NPWP) *</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="XX.XXX.XXX.X-XXX.XXX" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Business Address *</label>
                                <textarea className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="Full address..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">City *</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="Jakarta" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                                    <input type="tel" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="+62 21 XXXXXXX" />
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="Contact person name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Position *</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="Director / Manager" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                                    <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="contact@company.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Phone *</label>
                                    <input type="tel" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="+62 812 XXXX XXXX" />
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 3 && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Bank Name *</label>
                                    <select className="w-full px-3 py-2 border border-slate-300 rounded">
                                        <option>Select Bank</option>
                                        <option>Bank Central Asia (BCA)</option>
                                        <option>Bank Mandiri</option>
                                        <option>Bank Negara Indonesia (BNI)</option>
                                        <option>Bank Rakyat Indonesia (BRI)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="Branch name" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Account Number *</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="XXXX XXXX XXXX" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Account Holder Name *</label>
                                    <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded" placeholder="As registered in bank" />
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 4 && (
                        <>
                            <div className="space-y-4">
                                {[
                                    { name: 'SIUP (Business License)', required: true },
                                    { name: 'TDP (Company Registration)', required: true },
                                    { name: 'NPWP (Tax ID) Document', required: true },
                                    { name: 'Company Profile', required: false },
                                ].map((doc) => (
                                    <div key={doc.name} className="flex items-center justify-between p-4 border border-dashed border-slate-300 rounded hover:border-[#0052CC] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-slate-400" />
                                            <div>
                                                <p className="font-medium text-slate-700">{doc.name} {doc.required && <span className="text-rose-500">*</span>}</p>
                                                <p className="text-xs text-slate-500">PDF, JPG, PNG up to 5MB</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Upload</Button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Previous
                </Button>
                <Button
                    onClick={handleNext}
                    className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2"
                >
                    {currentStep === STEPS.length ? 'Submit Profile' : 'Save & Continue'}
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
