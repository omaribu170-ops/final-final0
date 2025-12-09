'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User, Mail, Phone, Lock, ArrowRight, MessageCircle } from 'lucide-react';

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleRegister = async () => {
        setLoading(true);
        try {
            // 1. Create Auth User
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: `${formData.phone}@thehub.com`, // Using phone as fake email for uniqueness
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                        phone: formData.phone,
                    }
                }
            });

            if (authError) throw authError;

            // 2. Create Profile (Trigger usually handles this, but doing it manually is safer if no trigger)
            if (authData.user) {
                await supabase.from('profiles').insert([{
                    id: authData.user.id,
                    full_name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    role: 'member',
                    balance: 0
                }]);
            }

            // Success -> Go to Welcome Screen (or Home)
            // Ideally we show the 3D Somaida welcome, but redirecting to home for MVP
            router.push('/');
        } catch (error) {
            console.error(error);
            alert('حصلت مشكلة في التسجيل');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

            <div className="w-full max-w-md relative z-10">
                <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white">
                    <ArrowRight size={20} />
                    <span>رجوع</span>
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">عضو جديد؟</h1>
                    <p className="text-gray-400">سجل بياناتك عشان تستمتع بكل مميزات The Hub</p>
                </div>

                <div className="bg-glass-white border border-glass-border p-6 rounded-3xl backdrop-blur-xl">
                    {step === 1 && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                                <User className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="الاسم بالكامل"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-transparent flex-1 outline-none text-right font-bold"
                                />
                            </div>
                            <div className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                                <Mail className="text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="البريد الإلكتروني"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-transparent flex-1 outline-none text-right font-bold"
                                />
                            </div>
                            <div className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                                <Phone className="text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="رقم الموبايل"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="bg-transparent flex-1 outline-none text-right font-bold"
                                />
                            </div>
                            <div className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                                <Lock className="text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="كلمة السر"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="bg-transparent flex-1 outline-none text-right font-bold"
                                />
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={!formData.name || !formData.phone || !formData.password}
                                className="w-full py-4 rounded-xl bg-hub-gradient text-white font-bold text-lg shadow-glow mt-4 disabled:opacity-50"
                            >
                                التالي
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in text-center">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto text-blue-400">
                                <MessageCircle size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">تأكيد الرقم</h3>
                                <p className="text-gray-400 text-sm">بعتنا كود التحقق على رقم {formData.phone}</p>
                                <p className="text-xs text-gray-500 mt-1">(رمز تجريبي: 1234)</p>
                            </div>

                            <input
                                type="text"
                                className="w-full text-center text-3xl tracking-[1em] font-mono bg-black/20 border border-white/10 rounded-xl py-4"
                                maxLength={4}
                                placeholder="0000"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                            />

                            <button
                                onClick={handleRegister}
                                disabled={otp !== '1234' || loading}
                                className="w-full py-4 rounded-xl bg-green-600 text-white font-bold text-lg shadow-glow disabled:opacity-50"
                            >
                                {loading ? 'جاري التسجيل...' : 'تأكيد ودخول'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
