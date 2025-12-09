'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Session } from '@/types';
import ActiveSessionCard from '@/components/admin/sessions/ActiveSession';
import NewSessionModal from '@/components/admin/sessions/NewSessionModal';
import PaymentModal from '@/components/admin/sessions/PaymentModal';
import { Plus, Archive } from 'lucide-react';

export default function SessionsPage() {
    const [activeSessions, setActiveSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        fetchSessions();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('sessions_changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'sessions' },
                () => fetchSessions()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchSessions = async () => {
        const { data } = await supabase
            .from('sessions')
            .select('*, table:tables(*)') // Join with tables
            .eq('status', 'active')
            .order('start_time', { ascending: false });

        if (data) setActiveSessions(data as any);
        setLoading(false);
    };

    const [selectedSession, setSelectedSession] = useState<(Session & { table: any }) | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleEndSession = (session: Session) => {
        // Safe cast as we know we fetched with table
        setSelectedSession(session as any);
        setIsPaymentModalOpen(true);
    };

    const handleAddOrder = (session: Session) => {
        alert('سيتم فتح قائمة المنتجات لإضافتها للجلسة');
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">الجلسات النشطة</h1>
                    <p className="text-gray-400">إدارة الطاولات، الوقت، والطلبات الحالية</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition">
                        <Archive size={20} />
                        <span>الأرشيف</span>
                    </button>
                    <button
                        onClick={() => setIsNewSessionModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2 rounded-xl bg-hub-gradient text-white shadow-glow hover:opacity-90 transition font-bold"
                    >
                        <Plus size={20} />
                        <span>جلسة جديدة</span>
                    </button>
                </div>
            </div>

            {/* Active Sessions Grid */}
            {loading ? (
                <div className="text-center py-20 text-gray-500">جاري تحميل الجلسات...</div>
            ) : activeSessions.length === 0 ? (
                <div className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-12 text-center">
                    <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Archive size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-300 mb-2">لا توجد جلسات نشطة حالياً</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8">
                        جميع الطاولات فارغة. ابدأ جلسة جديدة لاستقبال العملاء.
                    </p>
                    <button
                        onClick={() => setIsNewSessionModalOpen(true)}
                        className="text-hub-orange hover:text-hub-yellow font-bold transition"
                    >
                        + ابدأ جلسة الآن
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeSessions.map(session => (
                        <ActiveSessionCard
                            key={session.id}
                            session={session as any}
                            onEndSession={handleEndSession}
                            onAddOrder={handleAddOrder}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <NewSessionModal
                isOpen={isNewSessionModalOpen}
                onClose={() => setIsNewSessionModalOpen(false)}
                onSessionStarted={fetchSessions}
            />

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                session={selectedSession}
                onPaymentComplete={fetchSessions}
            />
        </div>
    );
}
