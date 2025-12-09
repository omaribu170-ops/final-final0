'use client';

import { useState } from 'react';
import AppLayout from '@/components/app/AppLayout';
import { Bolt, Gamepad2, Timer, MessageSquare } from 'lucide-react';

export default function HomePage() {
    const [mode, setMode] = useState<'work' | 'fun'>('work');

    return (
        <AppLayout>
            <div className={`min-h-screen transition-colors duration-500 p-6 ${mode === 'work' ? 'bg-[#0a0a0f]' : 'bg-[#1a0505]'}`}>
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">أهلاً، عمر 👋</h1>
                        <p className="text-gray-400 text-sm">جاهز للإبداع اليوم؟</p>
                    </div>

                    {/* Mode Switcher */}
                    <button
                        onClick={() => setMode(mode === 'work' ? 'fun' : 'work')}
                        className={`relative w-16 h-8 rounded-full border transition-all duration-300 flex items-center px-1
                            ${mode === 'work' ? 'bg-blue-900/50 border-blue-500' : 'bg-red-900/50 border-red-500'}
                        `}
                    >
                        <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
                            ${mode === 'work' ? 'translate-x-0 bg-blue-400' : 'translate-x-8 bg-red-500'}
                        `}>
                            {mode === 'work' ? <Bolt size={14} className="text-white" /> : <Gamepad2 size={14} className="text-white" />}
                        </div>
                    </button>
                </div>

                {/* Content based on Mode */}
                {mode === 'work' ? (
                    <div className="space-y-6">
                        {/* Workspace Widgets */}
                        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6 rounded-3xl border border-white/5 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Focus Zone</h2>
                            <div className="flex gap-4">
                                <button className="flex-1 bg-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition">
                                    <Timer className="text-blue-400" />
                                    <span className="text-sm">Pomodoro</span>
                                </button>
                                <button className="flex-1 bg-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition">
                                    <MessageSquare className="text-green-400" />
                                    <span className="text-sm">Somaida AI</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Fun Widgets */}
                        <div className="bg-gradient-to-br from-[#2e1a1a] to-[#3e1616] p-6 rounded-3xl border border-red-500/20 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold mb-2 text-red-500">Game Night 🎮</h2>
                                <p className="text-sm text-gray-300 mb-4">البطولة القادمة تبدأ خلال 2 ساعة!</p>
                                <button className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow-glow">
                                    يلا خش (تسجيل)
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
