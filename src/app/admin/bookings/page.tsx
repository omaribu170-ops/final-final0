'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Check, X, Calendar } from 'lucide-react';

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const supabase = createClient();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const { data } = await supabase
            .from('bookings')
            .select('*, user:profiles(full_name, phone)')
            .order('date', { ascending: true });
        if (data) setBookings(data);
    };

    const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
        await supabase.from('bookings').update({ status }).eq('id', id);
        fetchBookings();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">إدارة الحجوزات</h1>

            <div className="grid grid-cols-1 gap-4">
                {bookings.length === 0 && <p className="text-gray-500">لا توجد حجوزات معلقة.</p>}

                {bookings.map(booking => (
                    <div key={booking.id} className="bg-glass-white border border-glass-border p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-hub-orange/20 p-3 rounded-xl text-hub-orange">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{booking.user?.full_name || 'مجهول'}</h3>
                                <p className="text-gray-400 text-sm">{booking.user?.phone}</p>
                                <div className="flex gap-4 mt-1 text-sm">
                                    <span className="text-white bg-white/10 px-2 rounded">{booking.date}</span>
                                    <span className="text-white bg-white/10 px-2 rounded">{booking.start_time}</span>
                                    <span className="text-hub-yellow font-bold">{booking.guests_count} أفراد</span>
                                </div>
                            </div>
                        </div>

                        {booking.status === 'pending' ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => updateStatus(booking.id, 'approved')}
                                    className="px-6 py-2 bg-green-500/10 text-green-400 border border-green-500/50 rounded-xl hover:bg-green-500/20 font-bold flex items-center gap-2"
                                >
                                    <Check size={18} /> قبول
                                </button>
                                <button
                                    onClick={() => updateStatus(booking.id, 'rejected')}
                                    className="px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/50 rounded-xl hover:bg-red-500/20 font-bold flex items-center gap-2"
                                >
                                    <X size={18} /> رفض
                                </button>
                            </div>
                        ) : (
                            <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${booking.status === 'approved' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'
                                }`}>
                                {booking.status === 'approved' ? 'مقبول' : 'مرفوض'}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
