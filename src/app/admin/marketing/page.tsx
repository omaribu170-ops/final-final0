'use client';

import { useState } from 'react';
import { Megaphone, Share2, Send } from 'lucide-react';

export default function MarketingPage() {
    const [activeTab, setActiveTab] = useState<'notifications' | 'affiliate'>('notifications');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">التسويق والإشعارات</h1>
                <div className="flex bg-glass-white border border-glass-border rounded-xl p-1">
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'notifications' ? 'bg-hub-gradient text-white' : 'text-gray-400'}`}
                    >
                        <Megaphone size={16} /> الإشعارات
                    </button>
                    <button
                        onClick={() => setActiveTab('affiliate')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'affiliate' ? 'bg-hub-gradient text-white' : 'text-gray-400'}`}
                    >
                        <Share2 size={16} /> المسوقين
                    </button>
                </div>
            </div>

            {activeTab === 'notifications' ? (
                <div className="bg-glass-white border border-glass-border p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-6">إرسال إشعارات (Push / SMS / Email)</h3>
                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <label className="block text-gray-400 mb-2">عنوان الرسالة</label>
                            <input type="text" className="w-full bg-black/20 border border-glass-border rounded-xl px-4 py-3 outline-none focus:border-hub-orange" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">نص الرسالة</label>
                            <textarea className="w-full bg-black/20 border border-glass-border rounded-xl px-4 py-3 h-32 outline-none focus:border-hub-orange resize-none"></textarea>
                        </div>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-5 h-5 accent-hub-orange" />
                                <span>تطبيق (Push)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 accent-hub-orange" />
                                <span>SMS</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 accent-hub-orange" />
                                <span>Email</span>
                            </label>
                        </div>
                        <button className="w-full py-3 bg-hub-gradient rounded-xl font-bold text-white shadow-glow flex items-center justify-center gap-2">
                            <Send size={18} /> إرسال للجميع
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-glass-white border border-glass-border p-6 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">نظام التسويق بالعمولة</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="text-gray-400 border-b border-white/10">
                                <tr>
                                    <th className="pb-3">المسوق</th>
                                    <th className="pb-3">كود الخصم</th>
                                    <th className="pb-3">عدد المستخدمين</th>
                                    <th className="pb-3">الأرباح</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[1, 2].map(i => (
                                    <tr key={i}>
                                        <td className="py-4 font-bold">سمير كمال</td>
                                        <td className="py-4 font-mono text-hub-yellow">SAMIR2024</td>
                                        <td className="py-4">45</td>
                                        <td className="py-4 text-green-400 font-bold">1,200 ج.م</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
