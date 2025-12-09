'use client';

import { DollarSign, TrendingUp, Users, Trophy, ShoppingBag, Calendar, PieChart } from 'lucide-react';

export default function StatisticsPage() {
    // Mock data for the "16 Pillars"
    // In production, these would be aggregated queries from Supabase

    const stats = [
        { label: 'إجمالي الإيرادات', value: '154,200', unit: 'ج.م', icon: DollarSign, color: 'text-green-400' },
        { label: 'إيرادات اليوم', value: '4,250', unit: 'ج.م', icon: TrendingUp, color: 'text-green-400' },
        { label: 'إيرادات الشهر', value: '42,000', unit: 'ج.م', icon: Calendar, color: 'text-green-400' },
        { label: 'إيرادات الطاولات', value: '85,000', unit: 'ج.م', icon: Users, color: 'text-blue-400' },
        { label: 'إيرادات المنتجات', value: '69,200', unit: 'ج.م', icon: ShoppingBag, color: 'text-orange-400' },
        { label: 'صافي الخربح', value: '92,100', unit: 'ج.م', icon: PieChart, color: 'text-hub-yellow' },
    ];

    const entertainmentStats = [
        { label: 'عدد الليالي الترفيهية', value: '12', icon: Trophy, color: 'text-purple-400' },
        { label: 'المشاركين في البطولات', value: '145', icon: Users, color: 'text-purple-400' },
        { label: 'إجمالي الجوائز الموزعة', value: '5,000', unit: 'ج.م', icon: DollarSign, color: 'text-red-400' },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">الإحصائيات والتقارير</h1>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-6 hover:border-hub-orange/30 transition">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-xs text-gray-500 bg-black/20 px-2 py-1 rounded-md">محدث الآن</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold">{stat.value} <span className="text-sm font-normal text-gray-500">{stat.unit}</span></h3>
                    </div>
                ))}
            </div>

            {/* Entertainment Stats */}
            <h2 className="text-xl font-bold pt-4">إحصائيات الترفيه</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {entertainmentStats.map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <stat.icon size={20} className="text-purple-400" />
                            <h3 className="font-bold text-gray-300">{stat.label}</h3>
                        </div>
                        <p className="text-4xl font-bold text-white">{stat.value} <span className="text-sm font-normal text-gray-500">{stat.unit}</span></p>
                    </div>
                ))}
            </div>

            {/* Top Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-6">
                    <h3 className="font-bold mb-4">الأكثر إنفاقاً (Top Spenders)</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-hub-gradient flex items-center justify-center font-bold">#{i}</div>
                                    <span>اسم العميل {i}</span>
                                </div>
                                <span className="font-bold text-hub-orange">5,000 ج.م</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-6">
                    <h3 className="font-bold mb-4">أبطال الألعاب (Top Winners)</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold">#{i}</div>
                                    <span>اللاعب المحترف {i}</span>
                                </div>
                                <span className="font-bold text-purple-400">12 فوز</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
