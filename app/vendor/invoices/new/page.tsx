'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Send, Upload, FileText, DollarSign } from 'lucide-react';
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

const invoiceFormSchema = z.object({
    poNumber: z.string().min(1, { message: "Please select a Purchase Order." }),
    invoiceNumber: z.string().min(3, { message: "Invoice number is required." }),
    invoiceDate: z.string().min(1, { message: "Invoice date is required." }),
    dueDate: z.string().min(1, { message: "Due date is required." }),
    subtotal: z.string().min(1, { message: "Subtotal is required." }),
    tax: z.string().min(1, { message: "Tax amount is required." }),
    total: z.string().min(1, { message: "Total amount is required." }),
    notes: z.string().optional(),
})

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

export default function NewInvoicePage() {
    const router = useRouter();

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(invoiceFormSchema),
        defaultValues: {
            poNumber: "",
            invoiceNumber: "",
            invoiceDate: new Date().toISOString().split('T')[0],
            dueDate: "",
            subtotal: "",
            tax: "",
            total: "",
            notes: "",
        },
    })

    function onSubmit(data: InvoiceFormValues) {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Submitting invoice...',
                success: () => {
                    return `Invoice ${data.invoiceNumber} submitted successfully`
                },
                error: 'Failed to submit invoice',
            }
        )
        // In real app: await api.submitInvoice(data); router.push('/vendor/invoices');
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Header */}
                    <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                        <Link href="/vendor/invoices" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Submit New Invoice</h1>
                            <p className="text-sm text-slate-500">Create and submit an invoice for a fulfilled Purchase Order.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">

                        <div className="col-span-12 lg:col-span-8 space-y-6">

                            {/* PO Selection */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    Order Reference
                                </h3>

                                <FormField
                                    control={form.control}
                                    name="poNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Purchase Order *</FormLabel>
                                            <FormControl>
                                                <select
                                                    className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052CC]"
                                                    {...field}
                                                >
                                                    <option value="">Select PO...</option>
                                                    <option value="PO-2024-001">PO-2024-001 (High Performance Laptops) - IDR 450M</option>
                                                    <option value="PO-2024-005">PO-2024-005 (Office Supplies) - IDR 25M</option>
                                                </select>
                                            </FormControl>
                                            <FormDescription>Only POs with "Received" or "Partial Delivery" status are eligible.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Invoice Details */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    Invoice Details
                                </h3>

                                <div className="grid grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="invoiceNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Invoice Number *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="INV-2024-XXXX" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="invoiceDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Invoice Date *</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Financials */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-slate-400" />
                                    Payment Details
                                </h3>

                                <div className="grid grid-cols-3 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="subtotal"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subtotal</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="tax"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tax (PPN 11%)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="total"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Due</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0" className="font-bold text-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment Due Date *</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">

                            {/* Upload Section */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Attachments</h4>
                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
                                        <Upload className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">Upload Invoice File</p>
                                    <p className="text-xs text-slate-400 mt-1">PDF, JPG or PNG up to 5MB</p>
                                </div>

                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full mb-3">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">Tax Invoice (Faktur Pajak)</p>
                                    <p className="text-xs text-slate-400 mt-1">Required for processing</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full bg-[#0052CC] hover:bg-blue-700 text-white">
                                    <Send className="w-4 h-4 mr-2" /> Submit Invoice
                                </Button>
                                <Button type="button" onClick={() => router.back()} variant="outline" className="w-full bg-white border-slate-300">
                                    <Save className="w-4 h-4 mr-2" /> Save Draft
                                </Button>
                            </div>

                            <div className="p-4 bg-emerald-50 rounded border border-emerald-100 text-xs text-emerald-800">
                                <p className="font-bold mb-1">✅ Checklist</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Referenced valid PO number</li>
                                    <li>Uploaded official Invoice PDF</li>
                                    <li>Uploaded Tax Invoice (Faktur Pajak)</li>
                                    <li>Verified bank account details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
