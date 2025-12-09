'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/app/AppLayout';
import { Play, Pause, RefreshCw } from 'lucide-react';

export default function PomodoroPage() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0) {
            alert(mode === 'focus' ? 'عاش يا بطل! خذ استراحة.' : 'يلا نرجع للشغل!');
            setIsActive(false);
            setMode(mode === 'focus' ? 'break' : 'focus');
            setTimeLeft(mode === 'focus' ? 5 * 60 : 25 * 60);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Pomodoro Focus</h1>
                    <p className="text-gray-400">{mode === 'focus' ? 'وقت التركيز 🧠' : 'وقت الراحة ☕'}</p>
                </div>

                {/* Circles */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full border-4 ${mode === 'focus' ? 'border-hub-red/30' : 'border-green-500/30'} animate-pulse`} />
                    <div className={`w-56 h-56 rounded-full ${mode === 'focus' ? 'bg-hub-red/10' : 'bg-green-500/10'} flex items-center justify-center border border-white/10 backdrop-blur-md`}>
                        <span className="text-6xl font-mono font-bold tracking-wider">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={toggleTimer}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-glow transition transform hover:scale-105
                            ${isActive ? 'bg-yellow-600' : mode === 'focus' ? 'bg-hub-red' : 'bg-green-600'}
                        `}
                    >
                        {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 transition"
                    >
                        <RefreshCw size={24} />
                    </button>
                </div>

                <div className="bg-white/5 px-6 py-2 rounded-full text-sm font-bold text-gray-400">
                    {mode === 'focus' ? '25:00 Focus' : '05:00 Break'}
                </div>
            </div>
        </AppLayout>
    );
}
