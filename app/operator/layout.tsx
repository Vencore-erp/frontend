import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function OperatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar role="OPERATOR" />
            <div className="flex-1 ml-64 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 overflow-auto bg-[#F8FAFC]">
                    {children}
                </main>
            </div>
        </div>
    );
}
