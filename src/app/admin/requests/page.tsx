'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus } from 'lucide-react';

export default function RequestsPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'requests' | 'expenses'>('requests');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">الطلبات والمصروفات</h1>
                <div className="flex bg-glass-white border border-glass-border rounded-xl p-1">
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'requests' ? 'bg-hub-gradient text-white' : 'text-gray-400'}`}
                    >
                        طلبات المكان
                    </button>
                    <button
                        onClick={() => setActiveTab('expenses')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'expenses' ? 'bg-hub-gradient text-white' : 'text-gray-400'}`}
                    >
                        المصروفات
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-6">
                {/* Placeholder for list */}
                <div className="text-center py-12 text-gray-500">
                    لا توجد بيانات لعرضها حالياً
                </div>

                <div className="mt-4 pt-4 border-t border-glass-border">
                    <button className="w-full py-3 rounded-xl border border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-white transition flex items-center justify-center gap-2">
                        <Plus size={20} /> إضافة جديد
                    </button>
                </div>
            </div>
        </div>
    );
}
