'use client';

import React, { useState } from 'react';
import { Link2, Plus, Key, RefreshCw, CheckCircle, XCircle, Settings, ExternalLink, Copy, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Integration {
    id: string;
    name: string;
    type: 'API' | 'WEBHOOK' | 'SSO' | 'PAYMENT';
    status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
    apiKey?: string;
    endpoint?: string;
    lastSync?: string;
    description: string;
}

const INTEGRATIONS: Integration[] = [
    { id: '1', name: 'SAP ERP', type: 'API', status: 'ACTIVE', endpoint: 'https://sap.company.com/api/v1', lastSync: '2026-01-08 10:30', description: 'Master data sync for GL accounts and cost centers' },
    { id: '2', name: 'Microsoft SSO', type: 'SSO', status: 'ACTIVE', endpoint: 'https://login.microsoftonline.com', lastSync: 'N/A', description: 'Single Sign-On with Azure AD' },
    { id: '3', name: 'Bank API (BCA)', type: 'PAYMENT', status: 'ACTIVE', apiKey: '••••••••••••bca1', lastSync: '2026-01-08 09:00', description: 'Payment gateway integration' },
    { id: '4', name: 'Tax System (DJP)', type: 'API', status: 'INACTIVE', endpoint: 'https://api.pajak.go.id', description: 'e-Faktur and tax reporting' },
    { id: '5', name: 'Notification Webhook', type: 'WEBHOOK', status: 'ACTIVE', endpoint: 'https://hooks.company.com/notify', lastSync: '2026-01-08 10:45', description: 'Push notifications to external systems' },
];

export default function IntegrationSettingsPage() {
    const [showApiKey, setShowApiKey] = useState<string | null>(null);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                        <CheckCircle className="w-3 h-3" /> ACTIVE
                    </span>
                );
            case 'INACTIVE':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        <XCircle className="w-3 h-3" /> INACTIVE
                    </span>
                );
            case 'ERROR':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                        <XCircle className="w-3 h-3" /> ERROR
                    </span>
                );
            default:
                return null;
        }
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'API': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'WEBHOOK': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'SSO': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'PAYMENT': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight">Integration Settings</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage API keys and external system connections.</p>
                </div>
                <Button className="bg-[#0052CC] hover:bg-blue-700 text-white gap-2">
                    <Plus className="w-4 h-4" /> Add Integration
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded text-blue-600">
                                <Link2 className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Total Integrations</p>
                                <p className="text-2xl font-bold">{INTEGRATIONS.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-50 rounded text-emerald-600">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Active</p>
                                <p className="text-2xl font-bold text-emerald-600">{INTEGRATIONS.filter(i => i.status === 'ACTIVE').length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded text-slate-600">
                                <XCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Inactive</p>
                                <p className="text-2xl font-bold">{INTEGRATIONS.filter(i => i.status === 'INACTIVE').length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 rounded text-rose-600">
                                <XCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">Errors</p>
                                <p className="text-2xl font-bold text-rose-600">{INTEGRATIONS.filter(i => i.status === 'ERROR').length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Integrations List */}
            <div className="space-y-4">
                {INTEGRATIONS.map((integration) => (
                    <Card key={integration.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="py-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded ${integration.status === 'ACTIVE' ? 'bg-emerald-50' : 'bg-slate-100'
                                        }`}>
                                        <Link2 className={`w-6 h-6 ${integration.status === 'ACTIVE' ? 'text-emerald-600' : 'text-slate-400'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-[#0B1120]">{integration.name}</h3>
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getTypeBadge(integration.type)}`}>
                                                {integration.type}
                                            </span>
                                            {getStatusBadge(integration.status)}
                                        </div>
                                        <p className="text-sm text-slate-600 mb-2">{integration.description}</p>

                                        {integration.endpoint && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                                <ExternalLink className="w-3 h-3" />
                                                <span className="font-mono">{integration.endpoint}</span>
                                            </div>
                                        )}

                                        {integration.apiKey && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                                <Key className="w-3 h-3" />
                                                <span className="font-mono">
                                                    {showApiKey === integration.id ? 'sk-live-abc123def456...' : integration.apiKey}
                                                </span>
                                                <button
                                                    onClick={() => setShowApiKey(showApiKey === integration.id ? null : integration.id)}
                                                    className="text-slate-400 hover:text-slate-600"
                                                >
                                                    {showApiKey === integration.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                </button>
                                                <button className="text-slate-400 hover:text-slate-600">
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                            </div>
                                        )}

                                        {integration.lastSync && integration.lastSync !== 'N/A' && (
                                            <p className="text-xs text-slate-400">Last sync: {integration.lastSync}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-[#0052CC]">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-slate-900">
                                        <Settings className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* API Keys Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Key className="w-5 h-5 text-slate-400" />
                        API Keys
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
                        <p className="text-sm text-amber-800">
                            <strong>Security Notice:</strong> API keys provide full access to your account. Keep them secure and never share in public repositories.
                        </p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Plus className="w-4 h-4" /> Generate New API Key
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
