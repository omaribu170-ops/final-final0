'use client';

import { Gamepad2, Trophy, Clock, Users } from 'lucide-react';

export default function EntertainmentPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">إدارة الترفيه (Entertainment Hub)</h1>

            {/* Next Event */}
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 text-purple-400 mb-2">
                            <Trophy size={20} />
                            <span className="font-bold">البطولة القادمة</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4">FIFA 24 Championship</h2>
                        <div className="flex gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>الخميس، 8:00 مساءً</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={18} />
                                <span>32 مشترك</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                        <div className="text-sm text-gray-400 mb-1">العد التنازلي</div>
                        <div className="text-3xl font-mono font-bold">02:14:30</div>
                    </div>
                </div>
            </div>

            {/* Tournaments List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-glass-white border border-glass-border p-6 rounded-2xl opacity-75">
                    <h3 className="font-bold text-gray-400 mb-2">بطولة سابقة</h3>
                    <h4 className="text-xl font-bold mb-4">Valorant 5v5</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between p-2 bg-yellow-500/10 rounded-lg">
                            <span>🥇 الفريق الفائز</span>
                            <span className="font-bold text-yellow-500">Team Alpha</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-500/10 rounded-lg">
                            <span>🥈 المركز الثاني</span>
                            <span>Team Beta</span>
                        </div>
                    </div>
                </div>

                <button className="bg-white/5 border border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-white hover:border-white transition min-h-[200px]">
                    <Gamepad2 size={40} className="mb-4" />
                    <span className="font-bold text-lg">إنشاء بطولة جديدة</span>
                </button>
            </div>
        </div>
    );
}
