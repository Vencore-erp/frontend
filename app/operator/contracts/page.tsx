'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileText, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

// MOCK DATA
const MOCK_CONTRACTS = [
    { id: 'CTR-2026-001', title: 'Managed Service IT Support', vendor: 'PT. Global Tech', start: '2026-01-01', end: '2026-12-31', value: 'Rp 1.200.000.000', status: 'ACTIVE', type: 'SERVICE' },
    { id: 'CTR-2026-002', title: 'Office Building Renovation', vendor: 'CV. Bangun Jaya', start: '2026-02-15', end: '2026-06-30', value: 'Rp 450.000.000', status: 'DRAFT', type: 'PROJECT' },
    { id: 'CTR-2026-003', title: 'Annual Security Audit', vendor: 'PT. Secure Indo', start: '2026-03-01', end: '2026-04-30', value: 'Rp 150.000.000', status: 'PENDING_APPROVAL', type: 'SERVICE' },
];

export default function ContractsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = MOCK_CONTRACTS.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout role="OPERATOR">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Contract Management</h1>
                    <p className="text-slate-500">Manage vendor agreements and payment milestones.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/operator/contracts/new')}>
                    <Plus className="w-4 h-4 mr-2" /> New Contract
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                                placeholder="Search by contract number, title, or vendor..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Contract No</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>Value (IDR)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((contract) => (
                                <TableRow key={contract.id} className="cursor-pointer hover:bg-slate-50" onClick={() => router.push(`/operator/contracts/${contract.id}`)}>
                                    <TableCell className="font-medium text-blue-600">{contract.id}</TableCell>
                                    <TableCell>{contract.title}</TableCell>
                                    <TableCell>{contract.vendor}</TableCell>
                                    <TableCell className="text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {contract.start} - {contract.end}
                                        </div>
                                    </TableCell>
                                    <TableCell>{contract.value}</TableCell>
                                    <TableCell>
                                        <Badge className={`
                                            ${contract.status === 'ACTIVE' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                                            ${contract.status === 'DRAFT' ? 'bg-slate-100 text-slate-700 hover:bg-slate-100' : ''}
                                            ${contract.status === 'PENDING_APPROVAL' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : ''}
                                        `}>
                                            {contract.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
