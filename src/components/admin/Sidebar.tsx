'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Coffee,
    Gamepad2,
    ClipboardList,
    DollarSign,
    Settings,
    LogOut,
    Utensils,
    Brush,
    Box,
    Megaphone,
    CalendarCheck,
    UserCog
} from 'lucide-react';

const menuItems = [
    { name: 'لوحة التحكم', icon: LayoutDashboard, href: '/admin' },
    { name: 'الجلسات والطاولات', icon: Coffee, href: '/admin/sessions' },
    { name: 'الأعضاء', icon: Users, href: '/admin/members' },
    { name: 'المخزون والمنتجات', icon: Utensils, href: '/admin/inventory' },
    { name: 'الترفيه والبطولات', icon: Gamepad2, href: '/admin/entertainment' },
    { name: 'الحجوزات', icon: CalendarCheck, href: '/admin/bookings' },
    { name: 'نظام النظافة', icon: Brush, href: '/admin/cleaning' },
    { name: 'الطلبات والمصروفات', icon: Box, href: '/admin/requests' },
    { name: 'المهام', icon: ClipboardList, href: '/admin/tasks' },
    { name: 'الموظفين', icon: UserCog, href: '/admin/staff', role: 'super_admin' },
    { name: 'الإحصائيات', icon: DollarSign, href: '/admin/stats', role: 'super_admin' },
    { name: 'التسويق', icon: Megaphone, href: '/admin/marketing' },
    { name: 'الإعدادات', icon: Settings, href: '/admin/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed right-0 top-0 h-full w-64 bg-glass-dark backdrop-blur-glass border-l border-glass-border shadow-glass z-50 transition-all duration-300">
            <div className="flex flex-col h-full">
                {/* Logo Area */}
                <div className="flex items-center justify-center h-20 border-b border-glass-border bg-hub-gradient bg-clip-text text-transparent">
                    <h1 className="text-2xl font-bold font-arabic">The Hub</h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                    <ul className="space-y-1 px-3">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                            ${isActive
                                                ? 'bg-hub-gradient text-white shadow-glow'
                                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }
                                        `}
                                    >
                                        <item.icon size={20} className={`${isActive ? 'text-white' : 'text-hub-orange group-hover:text-hub-yellow'}`} />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-glass-border">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
                        <LogOut size={20} />
                        <span className="font-medium">تسجيل الخروج</span>
                    </button>
                    <div className="mt-4 text-center text-xs text-gray-500 font-arabic">
                        v1.0.0 Alpha
                    </div>
                </div>
            </div>
        </aside>
    );
}
