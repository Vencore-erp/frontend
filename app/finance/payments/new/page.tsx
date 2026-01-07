'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Send, CreditCard, DollarSign } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const paymentFormSchema = z.object({
    batchName: z.string().min(3, { message: "Batch name is required." }),
    paymentDate: z.string().min(1, { message: "Payment date is required." }),
    sourceAccount: z.string().min(1, { message: "Source account is required." }),
    paymentMethod: z.string().min(1, { message: "Payment method is required." }),
    notes: z.string().optional(),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

export default function NewPaymentBatchPage() {
    const router = useRouter();
    const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

    const form = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            batchName: "",
            paymentDate: new Date().toISOString().split('T')[0],
            sourceAccount: "",
            paymentMethod: "BANK_TRANSFER",
            notes: "",
        },
    })

    const PENDING_INVOICES = [
        { id: 'INV-001', vendor: 'PT Alpha Tech', amount: 154000000, due: '2024-01-20' },
        { id: 'INV-005', vendor: 'CV Office Supplies', amount: 2500000, due: '2024-01-22' },
        { id: 'INV-012', vendor: 'Global Logistics', amount: 45000000, due: '2024-01-25' },
    ];

    const toggleInvoice = (id: string) => {
        if (selectedInvoices.includes(id)) {
            setSelectedInvoices(selectedInvoices.filter(i => i !== id));
        } else {
            setSelectedInvoices([...selectedInvoices, id]);
        }
    };

    const totalAmount = PENDING_INVOICES
        .filter(inv => selectedInvoices.includes(inv.id))
        .reduce((sum, inv) => sum + inv.amount, 0);

    function onSubmit(data: PaymentFormValues) {
        if (selectedInvoices.length === 0) {
            toast.error("Please select at least one invoice to pay.");
            return;
        }

        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Creating payment batch...',
                success: () => {
                    return `Batch ${data.batchName} created for IDR ${totalAmount.toLocaleString()}`
                },
                error: 'Failed to create batch',
            }
        )
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Header */}
                    <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                        <Link href="/finance/payments" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Create Payment Batch</h1>
                            <p className="text-sm text-slate-500">Schedule payments for approved invoices.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">

                        <div className="col-span-12 lg:col-span-8 space-y-6">

                            {/* Batch Details */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-slate-400" />
                                    Batch Configuration
                                </h3>

                                <div className="grid grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="batchName"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel>Batch Reference Name *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Weekly Payment Run - Jan W4" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paymentDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Scheduled Date *</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paymentMethod"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Method *</FormLabel>
                                                <FormControl>
                                                    <select
                                                        className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052CC]"
                                                        {...field}
                                                    >
                                                        <option value="BANK_TRANSFER">Bank Transfer (LLG/RTGS)</option>
                                                        <option value="CHEQUE">Giro / Cheque</option>
                                                        <option value="CASH">Petty Cash</option>
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="sourceAccount"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel>Source Account *</FormLabel>
                                                <FormControl>
                                                    <select
                                                        className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052CC]"
                                                        {...field}
                                                    >
                                                        <option value="">Select Account...</option>
                                                        <option value="ACC-001">Operating Account - BCA (IDR)</option>
                                                        <option value="ACC-002">Treasury Account - Mandiri (IDR)</option>
                                                        <option value="ACC-003">USD Account - DBS (USD)</option>
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Invoice Selection */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-slate-400" />
                                        Select Invoices to Pay
                                    </h3>
                                    <span className="text-xs font-semibold text-slate-500">
                                        {selectedInvoices.length} selected
                                    </span>
                                </div>


                                <div className="space-y-2">
                                    {PENDING_INVOICES.map(inv => (
                                        <div
                                            key={inv.id}
                                            onClick={() => toggleInvoice(inv.id)}
                                            className={`
                                                flex justify-between items-center p-4 rounded border cursor-pointer transition-all
                                                ${selectedInvoices.includes(inv.id)
                                                    ? 'border-[#0052CC] bg-blue-50/50'
                                                    : 'border-slate-200 hover:bg-slate-50'}
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`
                                                    w-5 h-5 rounded border flex items-center justify-center transition-colors
                                                    ${selectedInvoices.includes(inv.id) ? 'bg-[#0052CC] border-[#0052CC]' : 'border-slate-300 bg-white'}
                                                `}>
                                                    {selectedInvoices.includes(inv.id) && <CheckIcon className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm text-slate-900">{inv.id}</div>
                                                    <div className="text-xs text-slate-500">{inv.vendor}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono font-bold text-sm text-slate-900">IDR {inv.amount.toLocaleString()}</div>
                                                <div className="text-xs text-amber-600 font-medium">Due: {inv.due}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">

                            {/* Summary */}
                            <div className="bg-slate-900 text-white p-6 rounded border border-slate-800 shadow-lg">
                                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Payment Summary</h4>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-slate-300">Selected Invoices</span>
                                    <span className="font-medium">{selectedInvoices.length}</span>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-sm text-slate-300">Total Amount</span>
                                    <span className="font-mono text-xl font-bold text-emerald-400">IDR {totalAmount.toLocaleString()}</span>
                                </div>

                                <div className="p-3 bg-slate-800 rounded text-xs text-slate-300 mb-4">
                                    <p className="mb-1">⚠️ <strong>Approval Required</strong></p>
                                    <p>Payments over IDR 100M require dual approval from Finance Manager.</p>
                                </div>

                                <Button type="submit" className="w-full bg-[#0052CC] hover:bg-blue-600 text-white border-0">
                                    <Send className="w-4 h-4 mr-2" /> Submit Batch
                                </Button>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <Button type="button" onClick={() => router.back()} variant="outline" className="w-full bg-white border-slate-300">
                                    <Save className="w-4 h-4 mr-2" /> Save Draft
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

function CheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
