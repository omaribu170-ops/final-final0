'use client';

import AppLayout from '@/components/app/AppLayout';
import { User, Wallet, History, Settings, LogOut, ChevronLeft } from 'lucide-react';

export default function ProfilePage() {
    // Mock user for MVP, real one from Supabase Auth context
    const user = {
        name: 'عمر المصري',
        email: 'omar@example.com',
        balance: 150.50,
        points: 340
    };

    return (
        <AppLayout>
            <div className="p-6 pb-24 space-y-6">
                <div className="flex items-center gap-4 py-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hub-red to-hub-orange flex items-center justify-center text-3xl font-bold border-4 border-[#0a0a0f] shadow-glow">
                        {user.name[0]}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-md font-bold">{user.points} نقطة</span>
                        </div>
                    </div>
                </div>

                {/* Wallet */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-6 border border-white/5 relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm mb-1">رصيد المحفظة</p>
                        <h2 className="text-4xl font-bold text-white mb-6">{user.balance} <span className="text-lg">ج.م</span></h2>
                        <div className="flex gap-3">
                            <button className="flex-1 py-3 bg-hub-gradient rounded-xl font-bold text-sm shadow-lg">شحن رصيد</button>
                            <button className="flex-1 py-3 bg-white/10 rounded-xl font-bold text-sm">تحويل</button>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="space-y-2">
                    <MenuItem icon={History} label="سجل الزيارات" />
                    <MenuItem icon={Wallet} label="المعاملات المالية" />
                    <MenuItem icon={Settings} label="الإعدادات" />
                    <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-red-500/10 hover:text-red-400 transition group">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/5 rounded-xl group-hover:bg-red-500/20"><LogOut size={20} /></div>
                            <span className="font-bold">تسجيل الخروج</span>
                        </div>
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}

function MenuItem({ icon: Icon, label }: any) {
    return (
        <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition group">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white/10"><Icon size={20} className="text-hub-orange" /></div>
                <span className="font-bold text-gray-200">{label}</span>
            </div>
            <ChevronLeft size={18} className="text-gray-500" />
        </button>
    );
}
