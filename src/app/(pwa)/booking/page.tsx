'use client';

import { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

export default function BookingPage() {
    const [step, setStep] = useState(1);

    return (
        <div className="p-6 space-y-6 pb-24">
            <h1 className="text-2xl font-bold">حجز مساحة</h1>

            {/* Steps */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-hub-orange' : 'bg-white/10'}`} />
                ))}
            </div>

            {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">التاريخ</label>
                        <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                            <Calendar className="text-hub-orange" />
                            <input type="date" className="bg-transparent w-full outline-none text-white text-right" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">الوقت</label>
                            <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                                <Clock className="text-hub-orange" />
                                <input type="time" className="bg-transparent w-full outline-none text-white text-right" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">الضيوف</label>
                            <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3">
                                <Users className="text-hub-orange" />
                                <select className="bg-transparent w-full outline-none text-white text-right bg-none appearance-none">
                                    <option value="1">1 فرد</option>
                                    <option value="2">2 أفراد</option>
                                    <option value="4">مجموعة (4+)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => setStep(2)} className="w-full py-3 bg-hub-gradient rounded-xl font-bold shadow-glow mt-8">
                        التالي
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-fade-in text-center">
                    <h2 className="text-xl font-bold">تأكيد الحجز</h2>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                        <p className="text-gray-400">سيتم خصم مبلغ تأمين ساعة واحدة من محفظتك</p>
                        <h3 className="text-3xl font-bold text-hub-yellow">50.00 ج.م</h3>
                    </div>
                    <button onClick={() => setStep(3)} className="w-full py-3 bg-green-600 rounded-xl font-bold shadow-glow mt-8">
                        دفع وتأكيد
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-fade-in text-center py-12">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users size={40} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400">تم الحجز بنجاح!</h2>
                    <p className="text-gray-400">بانتظارك في الموعد.</p>
                    <button onClick={() => setStep(1)} className="w-full py-3 bg-white/10 rounded-xl font-bold mt-8">
                        العودة للرئيسية
                    </button>
                </div>
            )}
        </div>
    );
}
