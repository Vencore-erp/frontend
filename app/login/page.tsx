'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (role: 'OPERATOR' | 'SUPERVISOR' | 'FINANCE' | 'ADMIN' | 'VENDOR') => {
        setIsLoading(true);

        // SIMULATE NETWORK DELAY
        setTimeout(() => {
            // MOCK SESSION
            localStorage.setItem('nexus_token', 'mock_jwt_token_123');
            localStorage.setItem('nexus_user_role', role);

            let name = 'Alexander Pierce';
            if (role === 'VENDOR') name = 'PT. Global Tech';
            if (role === 'SUPERVISOR') name = 'Sarah Manager';
            if (role === 'FINANCE') name = 'Michael Finance';
            if (role === 'ADMIN') name = 'System Admin';

            localStorage.setItem('nexus_user_name', name);

            toast.success(`Welcome back! Logged in as ${role}`);

            if (role === 'VENDOR') {
                router.push('/vendor/dashboard');
            } else if (role === 'SUPERVISOR') {
                router.push('/supervisor/dashboard');
            } else if (role === 'FINANCE') {
                router.push('/finance/dashboard');
            } else if (role === 'ADMIN') {
                router.push('/admin/dashboard');
            } else {
                router.push('/dashboard'); // Main/Operator Dashboard
            }

            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#0052CC] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-2xl text-slate-900 tracking-tight">
                            NEXUS<span className="font-light text-slate-500">PROCURA</span>
                        </span>
                    </div>
                </div>

                <Tabs defaultValue="internal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="internal">Internal Team</TabsTrigger>
                        <TabsTrigger value="vendor">Vendor Portal</TabsTrigger>
                    </TabsList>

                    {/* INTERNAL LOGIN */}
                    <TabsContent value="internal">
                        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Internal System Access</CardTitle>
                                <CardDescription>Enter your corporate credentials to continue.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Select Role (Mock)</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        onChange={(e) => {
                                            const role = e.target.value;
                                            // Auto-fill mock credentials based on role
                                            if (role === 'OPERATOR') {
                                                // Default
                                            }
                                        }}
                                        id="role-selector"
                                    >
                                        <option value="OPERATOR">Operator (Procurement)</option>
                                        <option value="SUPERVISOR">Supervisor (Approver)</option>
                                        <option value="FINANCE">Finance Dept</option>
                                        <option value="ADMIN">System Admin</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input id="email" placeholder="user@bank-xyz.com" className="pl-9" defaultValue="alexander@bank-xyz.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input id="password" type="password" className="pl-9" defaultValue="password123" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-[#0052CC] hover:bg-blue-700"
                                    onClick={() => {
                                        const roleSelect = document.getElementById('role-selector') as HTMLSelectElement;
                                        handleLogin(roleSelect.value as any);
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Authenticating...' : (
                                        <>
                                            Sign In <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                        <div className="mt-4 text-center text-xs text-slate-500">
                            <p>Select a role above to simulate different user flows.</p>
                        </div>
                    </TabsContent>

                    {/* VENDOR LOGIN */}
                    <TabsContent value="vendor">
                        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Vendor Portal</CardTitle>
                                <CardDescription>Secure access for registered suppliers.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                                    <p className="text-xs text-blue-800">
                                        You are accessing the <strong>Bank XYZ Procurement Gateway</strong>. All activities are monitored.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="v-email">Registered Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input id="v-email" placeholder="contact@vendor.com" className="pl-9" defaultValue="sales@pt-global.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="v-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input id="v-password" type="password" className="pl-9" defaultValue="vendor123" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-slate-900 hover:bg-slate-800"
                                    onClick={() => handleLogin('VENDOR')}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Verifying...' : (
                                        <>
                                            Access Portal <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                        <div className="mt-4 text-center text-xs text-slate-500">
                            <p>Demo Vendor: sales@pt-global.com / vendor123</p>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}
