'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Grid, BookOpen, ShoppingBag, User } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white pb-20">
            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 w-full bg-[#161621]/90 backdrop-blur-lg border-t border-white/10 z-50 px-4 py-2 safe-bottom">
                <ul className="flex justify-around items-center">
                    <NavItem href="/" icon={Home} label="الرئيسية" />
                    <NavItem href="/tools" icon={Grid} label="أدوات" />
                    <NavItem href="/book" icon={BookOpen} label="حجز" />
                    <NavItem href="/store" icon={ShoppingBag} label="المتجر" />
                    <NavItem href="/profile" icon={User} label="حسابي" />
                </ul>
            </nav>
        </div>
    );
}

function NavItem({ href, icon: Icon, label }: any) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li>
            <Link href={href} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${isActive ? 'text-hub-orange' : 'text-gray-500'}`}>
                <Icon size={24} className={isActive ? 'fill-current' : ''} />
                <span className="text-[10px] font-bold">{label}</span>
            </Link>
        </li>
    );
}
