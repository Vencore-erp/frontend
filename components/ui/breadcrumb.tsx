'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumbs({ className }: { className?: string }) {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav aria-label="Breadcrumb" className={cn("hidden md:flex items-center text-sm text-slate-500 mb-4", className)}>
            <Link href="/" className="flex items-center hover:text-[#0052CC] transition-colors">
                <Home className="w-4 h-4" />
            </Link>
            {segments.map((segment, index) => {
                const href = `/${segments.slice(0, index + 1).join('/')}`;
                const isLast = index === segments.length - 1;

                return (
                    <div key={href} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
                        {isLast ? (
                            <span className="font-semibold text-[#0052CC] capitalize">
                                {segment.replace(/-/g, ' ')}
                            </span>
                        ) : (
                            <Link href={href} className="hover:text-slate-800 transition-colors capitalize">
                                {segment.replace(/-/g, ' ')}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
