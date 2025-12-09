'use client';

import { useState, useEffect } from 'react';
import { Session, Table } from '@/types';
import { Clock, StopCircle, Receipt, PlusCircle } from 'lucide-react';

interface ActiveSessionCardProps {
    session: Session & { table: Table };
    onEndSession: (session: Session) => void;
    onAddOrder: (session: Session) => void;
}

export default function ActiveSessionCard({ session, onEndSession, onAddOrder }: ActiveSessionCardProps) {
    const [duration, setDuration] = useState<string>('00:00:00');
    const [currentCost, setCurrentCost] = useState<number>(0);

    useEffect(() => {
        const calculateTime = () => {
            const start = new Date(session.start_time).getTime();
            const now = new Date().getTime();
            const diff = now - start;

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setDuration(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );

            // Calculate cost (Real-time estimation)
            // Price is per hour. 
            const hoursDecimal = diff / (1000 * 60 * 60);
            const tableCost = hoursDecimal * (session.table?.price_per_hour || 0);
            setCurrentCost(tableCost + (session.total_amount || 0)); // Assuming total_amount includes orders so far
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime(); // Initial call

        return () => clearInterval(timer);
    }, [session]);

    return (
        <div className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border overflow-hidden relative group shadow-sm hover:shadow-glow transition-all duration-300">
            {/* Status Indicator */}
            <div className="absolute top-0 right-0 w-1.5 h-full bg-green-500 animate-pulse" />

            <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start pl-2">
                    <div>
                        <h3 className="text-xl font-bold">{session.table?.name}</h3>
                        <p className="text-sm text-gray-400 font-arabic">
                            {new Date(session.start_time).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" />
                        نشط
                    </div>
                </div>

                {/* Timer & Cost */}
                <div className="bg-black/20 rounded-xl p-4 flex justify-between items-center border border-white/5">
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-hub-orange" />
                        <span className="text-xl font-mono font-bold tracking-wider">{duration}</span>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">التكلفة الحالية</p>
                        <p className="text-lg font-bold text-hub-yellow">
                            {currentCost.toFixed(2)} <span className="text-xs">ج.م</span>
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => onAddOrder(session)}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                        <PlusCircle size={18} />
                        <span className="text-sm font-medium">طلبات</span>
                    </button>
                    <button
                        onClick={() => onEndSession(session)}
                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                        <StopCircle size={18} />
                        <span className="text-sm font-medium">إنهاء</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
