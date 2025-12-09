'use client';

import { Save } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">الإعدادات العامة</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Info */}
                <div className="bg-glass-white border border-glass-border p-6 rounded-2xl space-y-4">
                    <h3 className="font-bold border-b border-white/10 pb-2 mb-4">معلومات المكان</h3>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">اسم المكان</label>
                        <input type="text" defaultValue="The Hub" className="w-full bg-black/20 border border-glass-border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">رقم الهاتف الرسمي</label>
                        <input type="text" defaultValue="01000000000" className="w-full bg-black/20 border border-glass-border rounded-lg px-3 py-2" />
                    </div>
                </div>

                {/* Branding */}
                <div className="bg-glass-white border border-glass-border p-6 rounded-2xl space-y-4">
                    <h3 className="font-bold border-b border-white/10 pb-2 mb-4">الهوية البصرية</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-hub-gradient rounded-xl shadow-glow"></div>
                        <button className="text-sm bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20">تغيير اللوجو</button>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">اللون الأساسي</label>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-hub-red border-2 border-white cursor-pointer"></div>
                            <div className="w-8 h-8 rounded-full bg-blue-600 cursor-pointer opacity-50"></div>
                            <div className="w-8 h-8 rounded-full bg-green-600 cursor-pointer opacity-50"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-glow flex items-center gap-2 hover:bg-green-500">
                    <Save size={20} /> حفظ التغييرات
                </button>
            </div>
        </div>
    );
}
