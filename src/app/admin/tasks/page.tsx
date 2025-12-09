'use client';

import { useState } from 'react';
import { UserCog, ClipboardList, CheckCircle, Clock } from 'lucide-react';

export default function StaffAndTasksPage() {
    const [activeTab, setActiveTab] = useState<'staff' | 'tasks'>('tasks');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">الموظفين والمهام</h1>
                <div className="flex bg-glass-white border border-glass-border rounded-xl p-1">
                    <button
                        onClick={() => setActiveTab('tasks')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'tasks' ? 'bg-hub-gradient text-white' : 'text-gray-400'}`}
                    >
                        <ClipboardList size={16} /> المهام
                    </button>
                    <button
                        onClick={() => setActiveTab('staff')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'staff' ? 'bg-hub-gradient text-white' : 'text-gray-400'}`}
                    >
                        <UserCog size={16} /> الموظفين
                    </button>
                </div>
            </div>

            {activeTab === 'tasks' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Pending Tasks */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-400 border-b border-white/10 pb-2">قيد التنفيذ</h3>
                        {[1, 2].map(i => (
                            <div key={i} className="bg-glass-white border border-glass-border p-4 rounded-xl">
                                <h4 className="font-bold mb-2">تنظيف مخزن 2</h4>
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span className="flex items-center gap-1"><UserCog size={12} /> محمد أحمد</span>
                                    <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">جار التنفيذ</span>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-2 bg-white/5 rounded-xl text-sm hover:bg-white/10 text-gray-400">+ مهمة جديدة</button>
                    </div>

                    {/* Done Tasks */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-400 border-b border-white/10 pb-2">تم الإنجاز</h3>
                        <div className="bg-glass-white border border-glass-border p-4 rounded-xl opacity-75">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold line-through text-gray-500">جرد الثلاجات</h4>
                                <CheckCircle size={16} className="text-green-500" />
                            </div>
                            <div className="text-xs text-gray-500">تم بواسطة: علي حسن</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Staff List */}
                    <div className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-5 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl">👨‍💼</div>
                        <div>
                            <h3 className="font-bold text-lg">أحمد محمود</h3>
                            <p className="text-sm text-gray-400">مشرف فترة مسائية</p>
                            <div className="flex gap-2 mt-2">
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">حاضر</span>
                            </div>
                        </div>
                    </div>

                    <button className="h-full min-h-[120px] bg-white/5 border border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-white transition">
                        <UserCog size={32} className="mb-2" />
                        <span>إضافة موظف</span>
                    </button>
                </div>
            )}
        </div>
    );
}
