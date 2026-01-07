'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Send } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button" // Assuming Button component exists, or use standard HTML button
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

// Schema Validation
const userFormSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(),
    employeeId: z.string().min(3, { message: "Employee ID is required." }),
    role: z.enum(["OPERATOR", "SUPERVISOR", "FINANCE", "ADMIN"], {
        required_error: "Please select a role.",
    }),
    department: z.string().min(1, { message: "Please select a department." }),
    reportsTo: z.string().optional(),
    sendWelcomeEmail: z.boolean().default(true),
    requirePasswordChange: z.boolean().default(true),
    enable2FA: z.boolean().default(false),
})

type UserFormValues = z.infer<typeof userFormSchema>

export default function NewUserPage() {
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            employeeId: "",
            role: "OPERATOR", // Default value needs to be a valid enum member
            department: "",
            reportsTo: "",
            sendWelcomeEmail: true,
            requirePasswordChange: true,
            enable2FA: false,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(data: UserFormValues) {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)), // Simulate API call
            {
                loading: 'Creating user...',
                success: () => {
                    // console.log(data)
                    return `User ${data.firstName} ${data.lastName} created successfully`
                },
                error: 'Failed to create user',
            }
        )
        // In real app: await api.createUser(data); router.push('/admin/users');
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Header */}
                    <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                        <Link href="/admin/users" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Create New User</h1>
                            <p className="text-sm text-slate-500">Add a new internal user to the system.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8">

                        {/* Form Section */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">

                            {/* Personal Info */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Personal Information</h3>

                                <div className="grid grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address *</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="john.doe@company.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="+62 812 XXXX XXXX" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="employeeId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employee ID *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="EMP-XXXX" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Access Configuration */}
                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
                                <h3 className="font-bold text-sm text-[#0B1120] uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Access Configuration</h3>

                                <div className="grid grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role *</FormLabel>
                                                <FormControl>
                                                    <select
                                                        className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052CC]"
                                                        {...field}
                                                    >
                                                        <option value="OPERATOR">OPERATOR</option>
                                                        <option value="SUPERVISOR">SUPERVISOR</option>
                                                        <option value="FINANCE">FINANCE</option>
                                                        <option value="ADMIN">ADMIN</option>
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="department"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Department *</FormLabel>
                                                <FormControl>
                                                    <select
                                                        className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052CC]"
                                                        {...field}
                                                    >
                                                        <option value="">Select Department...</option>
                                                        <option value="IT Operations">IT Operations</option>
                                                        <option value="IT Infrastructure">IT Infrastructure</option>
                                                        <option value="Procurement">Procurement</option>
                                                        <option value="General Affairs">General Affairs</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Treasury">Treasury</option>
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="reportsTo"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Reports To</FormLabel>
                                                    <FormControl>
                                                        <select
                                                            className="w-full h-9 rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0052CC]"
                                                            {...field}
                                                        >
                                                            <option value="">Select Supervisor...</option>
                                                            <option value="Sarah Johnson">Sarah Johnson (Supervisor - Procurement)</option>
                                                            <option value="Robert Wilson">Robert Wilson (Admin - IT Security)</option>
                                                        </select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">

                            <div className="bg-white p-6 rounded border border-slate-200 shadow-sm">
                                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Account Options</h4>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="sendWelcomeEmail"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value}
                                                        onChange={field.onChange}
                                                        className="w-4 h-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-sm text-slate-700 m-0 cursor-pointer">
                                                    Send welcome email
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="requirePasswordChange"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value}
                                                        onChange={field.onChange}
                                                        className="w-4 h-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-sm text-slate-700 m-0 cursor-pointer">
                                                    Require password change
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="enable2FA"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value}
                                                        onChange={field.onChange}
                                                        className="w-4 h-4 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-sm text-slate-700 m-0 cursor-pointer">
                                                    Enable 2FA
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded border border-blue-100 text-xs text-blue-800">
                                <p className="font-bold mb-1">💡 Pro Tip</p>
                                <p>After creation, the user will receive an email with login credentials and setup instructions.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" /> Create & Invite
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm rounded shadow-sm transition-all flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" /> Save Draft
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
