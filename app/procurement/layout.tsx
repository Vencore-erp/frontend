import { Sidebar } from '@/components/layout/Sidebar';

export default function ProcurementLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="OPERATOR" />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
