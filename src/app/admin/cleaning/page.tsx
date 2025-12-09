'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, XCircle } from 'lucide-react';

export default function CleaningPage() {
    const [logs, setLogs] = useState<any[]>([]);

    // In a real app, we would generate slots based on time. 
    // Here we will mock the current "Active Slot" or list past logs.

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">نظام النظافة</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Checklist */}
                <div className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        الوردية الحالية
                    </h2>

                    <div className="space-y-4">
                        {['حمامات الرجال', 'حمامات السيدات', 'صالة الجلوس', 'منطقة الألعاب'].map((area, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-transparent hover:border-glass-border transition">
                                <span className="font-bold">{area}</span>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20">
                                        <CheckCircle size={20} />
                                    </button>
                                    <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                                        <XCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* History */}
                <div className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-6">
                    <h2 className="text-xl font-bold mb-4">السجل اليومي</h2>
                    <div className="text-center text-gray-500 py-10">
                        سجل النظافة فارغ اليوم
                    </div>
                </div>
            </div>
        </div>
    );
}
