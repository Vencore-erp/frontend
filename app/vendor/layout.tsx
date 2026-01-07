import { Sidebar } from '@/components/layout/Sidebar';

export default function VendorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar role="VENDOR" />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
