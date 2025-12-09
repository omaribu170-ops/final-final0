'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Phone } from 'lucide-react';

export default function LoginPage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // For MVP, we'll try to sign in with email/password where email is phone@thehub.com mock
        // or just use standard email input. The prompt asked for Phone + Password.
        // We will simulate logging in.

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: `${phone}@thehub.com`, // Artificial email construction for phone login
                password
            });

            if (error) throw error;
            router.push('/');
        } catch (error) {
            alert('البيانات غلط يا معلم، حاول تاني');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-hub-red/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-hub-orange/20 rounded-full blur-[80px]" />

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold font-arabic bg-hub-gradient bg-clip-text text-transparent">The Hub</h1>
                    <p className="text-gray-400">مساحتك للإبداع والترفيه</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 bg-glass-white border border-glass-border p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
                    <div className="space-y-4">
                        <div className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-hub-orange transition">
                            <Phone className="text-gray-400" />
                            <input
                                type="tel"
                                placeholder="رقم التليفون"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="bg-transparent flex-1 outline-none text-right font-bold"
                                required
                            />
                        </div>
                        <div className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-hub-orange transition">
                            <Lock className="text-gray-400" />
                            <input
                                type="password"
                                placeholder="كلمة السر"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="bg-transparent flex-1 outline-none text-right font-bold"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-hub-gradient text-white font-bold text-lg shadow-glow hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'جاري الدخول...' : 'خش برجلك اليمين'}
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-gray-400 text-sm">
                            أول مرة تنورنا؟ {' '}
                            <Link href="/signup" className="text-hub-orange font-bold hover:underline">
                                اعمل حساب جديد
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
