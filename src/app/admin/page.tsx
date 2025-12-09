export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
                    <p className="text-gray-400">مرحباً بك في نظام إدارة The Hub</p>
                </div>
                <div className="bg-glass-white backdrop-blur-md border border-glass-border px-4 py-2 rounded-lg text-sm">
                    {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'الإيرادات اليومية', value: '4,200 ج.م', color: 'from-green-500 to-emerald-600' },
                    { title: 'الجلسات النشطة', value: '12', color: 'from-blue-500 to-indigo-600' },
                    { title: 'الأعضاء الجدد', value: '5', color: 'from-purple-500 to-pink-600' },
                    { title: 'المهام المعلقة', value: '3', color: 'from-orange-500 to-red-600' },
                ].map((stat, index) => (
                    <div key={index} className="relative group overflow-hidden bg-glass-white backdrop-blur-md rounded-2xl p-6 border border-glass-border hover:border-hub-orange/50 transition-all duration-300">
                        <div className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b ${stat.color}`} />
                        <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.title}</h3>
                        <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Content Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-96">
                <div className="lg:col-span-2 bg-glass-white backdrop-blur-glass rounded-2xl border border-glass-border p-6">
                    <h3 className="text-xl font-bold mb-4">نشاط الجلسات</h3>
                    <div className="flex items-center justify-center h-full text-gray-500">
                        مخطط بياني (قريباً)
                    </div>
                </div>
                <div className="bg-glass-white backdrop-blur-glass rounded-2xl border border-glass-border p-6">
                    <h3 className="text-xl font-bold mb-4">آخر التنبيهات</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-3 items-start pb-4 border-b border-glass-border last:border-0">
                                <div className="w-2 h-2 mt-2 rounded-full bg-hub-red shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-200">قام أحمد محمد بفتح جلسة جديدة</p>
                                    <span className="text-xs text-gray-500">منذ 5 دقائق</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
