'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Send, FileText, Truck, CreditCard, Plus, Trash2 } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
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

// Schema
const poFormSchema = z.object({
    vendor: z.string().min(1, { message: "Please select a vendor." }),
    prReference: z.string().min(1, { message: "PR Reference is required." }),
    orderDate: z.string().min(1, { message: "Order date is required." }),
    deliveryDate: z.string().min(1, { message: "Delivery date is required." }),
    paymentTerms: z.string().min(1, { message: "Payment terms are required." }),
    items: z.array(z.object({
        description: z.string().min(1, "Description is required"),
        qty: z.number().min(1, "Qty must be at least 1"),
        unitPrice: z.number().min(0, "Price must be positive"),
    })).min(1, "At least one item is required"),
    notes: z.string().optional(),
})

type PoFormValues = z.infer<typeof poFormSchema>

export default function NewPOPage() {
    const router = useRouter();

    const form = useForm<PoFormValues>({
        resolver: zodResolver(poFormSchema),
        defaultValues: {
            vendor: "",
            prReference: "",
            orderDate: new Date().toISOString().split('T')[0],
            deliveryDate: "",
            paymentTerms: "NET30",
            items: [{ description: "", qty: 1, unitPrice: 0 }],
            notes: "",
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    // Calculated Total
    const items = form.watch("items");
    const totalAmount = items.reduce((sum, item) => sum + ((item.qty || 0) * (item.unitPrice || 0)), 0);

    function onSubmit(data: PoFormValues) {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Generating PO...',
                success: () => {
                    return `PO generated for ${data.vendor} successfully`
                },
                error: 'Failed to generate PO',
            }
        )
        // In real app: await api.createPO(data); router.push('/procurement/po');
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Header */}
                    <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                        <Link href="/procurement/po" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Create Purchase Order</h1>
                            <p className="text-sm text-slate-500">Generate a new PO from an existing PR or directly.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">

                        <div className="col-span-12 lg:col-span-8 space-y-6">

                            {/* Vendor & References */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    Order Details
                                </h3>

                                <div className="grid grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="vendor"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel>Select Vendor *</FormLabel>
                                                <FormControl>
                                                    <select
                                                        className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052CC]"
                                                        {...field}
                                                    >
                                                        <option value="">Select Vendor...</option>
                                                        <option value="PT Alpha Tech">PT Alpha Tech - Electronics</option>
                                                        <option value="CV Office Supplies">CV Office Supplies - General</option>
                                                        <option value="Global Logistics">Global Logistics - Services</option>
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="prReference"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>PR Reference (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. PR-2024-089" {...field} />
                                                </FormControl>
                                                <FormDescription>Auto-fill items if PR is selected.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="orderDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Order Date *</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Line Items */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                    <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider">Line Items</h3>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => append({ description: "", qty: 1, unitPrice: 0 })}
                                        className="h-8 text-xs"
                                    >
                                        <Plus className="w-3 h-3 mr-1" /> Add Item
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="grid grid-cols-12 gap-4 items-end bg-slate-50 p-3 rounded border border-slate-100">
                                            <div className="col-span-6">
                                                <FormField
                                                    control={form.control}
                                                    name={`items.${index}.description`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs">Description</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} className="h-8 text-sm" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`items.${index}.qty`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs">Qty</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" {...field} className="h-8 text-sm text-center" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <FormField
                                                    control={form.control}
                                                    name={`items.${index}.unitPrice`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs">Unit Price</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" {...field} className="h-8 text-sm text-right" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-1 flex justify-end pb-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                                                    onClick={() => remove(index)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <div className="text-right">
                                        <span className="text-sm text-slate-500 mr-4">Total Amount:</span>
                                        <span className="text-xl font-bold font-mono text-[#0B1120]">IDR {totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">

                            {/* Terms */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" />
                                    Payment & Delivery
                                </h4>

                                <FormField
                                    control={form.control}
                                    name="paymentTerms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment Terms</FormLabel>
                                            <FormControl>
                                                <select
                                                    className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052CC]"
                                                    {...field}
                                                >
                                                    <option value="NET30">Net 30 Days</option>
                                                    <option value="NET60">Net 60 Days</option>
                                                    <option value="IMMEDIATE">Immediate</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="deliveryDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Expected Delivery</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full bg-[#0052CC] hover:bg-blue-700 text-white">
                                    <Send className="w-4 h-4 mr-2" /> Submit for Approval
                                </Button>
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
