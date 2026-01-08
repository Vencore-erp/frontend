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
    const [email, setEmail] = useState('alexander@bank-xyz.com');
    const [password, setPassword] = useState('password123');
    const [selectedRole, setSelectedRole] = useState('OPERATOR');

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

                                {/* QUICK LOGIN BUTTONS */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-slate-500 uppercase tracking-wider font-bold">Quick Auto-fill (Testing)</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs justify-start border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                            onClick={() => {
                                                setEmail('alexander@bank-xyz.com');
                                                setPassword('password123');
                                                setSelectedRole('OPERATOR');
                                                toast.info('Auto-filled: Operator Credentials');
                                            }}
                                        >
                                            <CheckCircle2 className="w-3 h-3 mr-2" />
                                            Operator
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs justify-start border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
                                            onClick={() => {
                                                setEmail('sarah.manager@bank-xyz.com');
                                                setPassword('password123');
                                                setSelectedRole('SUPERVISOR');
                                                toast.info('Auto-filled: Supervisor Credentials');
                                            }}
                                        >
                                            <CheckCircle2 className="w-3 h-3 mr-2" />
                                            Supervisor
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs justify-start border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                            onClick={() => {
                                                setEmail('michael.finance@bank-xyz.com');
                                                setPassword('password123');
                                                setSelectedRole('FINANCE');
                                                toast.info('Auto-filled: Finance Credentials');
                                            }}
                                        >
                                            <CheckCircle2 className="w-3 h-3 mr-2" />
                                            Finance
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs justify-start border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                            onClick={() => {
                                                setEmail('admin@bank-xyz.com');
                                                setPassword('admin123');
                                                setSelectedRole('ADMIN');
                                                toast.info('Auto-filled: Admin Credentials');
                                            }}
                                        >
                                            <CheckCircle2 className="w-3 h-3 mr-2" />
                                            Admin
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="email"
                                            placeholder="user@bank-xyz.com"
                                            className="pl-9"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            className="pl-9"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-[#0052CC] hover:bg-blue-700"
                                    onClick={() => handleLogin(selectedRole as any)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Authenticating...' : (
                                        <>
                                            Sign In As {selectedRole} <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                        <div className="mt-4 text-center text-xs text-slate-500">
                            <p>Use the buttons above to simulate different user flows.</p>
                        </div>
                    </TabsContent>

                    {/* VENDOR LOGIN */}
                    <TabsContent value="vendor">
                        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Portal Vendor</CardTitle>
                                <CardDescription>Akses aman untuk rekanan terdaftar.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                                    <p className="text-xs text-blue-800">
                                        Anda mengakses <strong>Gerbang Pengadaan Bank XYZ</strong>. Semua aktivitas dipantau.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="v-email">Email Terdaftar</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input id="v-email" placeholder="contact@vendor.com" className="pl-9" defaultValue="sales@pt-global.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="v-password">Kata Sandi</Label>
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
                                    {isLoading ? 'Memverifikasi...' : (
                                        <>
                                            Akses Portal <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                        <div className="mt-4 text-center text-xs text-slate-500">
                            <p>Vendor Demo: sales@pt-global.com / vendor123</p>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}
