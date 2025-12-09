'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Session, Table } from '@/types';
import { X, DollarSign, CreditCard, Wallet, Printer, Receipt } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// Note: We need a font that supports Arabic for jsPDF, typically requires importing a base64 font string.
// For MVP, we might use English for the PDF or strict ASCII if Arabic font isn't loaded. 
// I will attempt a basic implementation first.

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    session: (Session & { table: Table }) | null;
    onPaymentComplete: () => void;
}

export default function PaymentModal({ isOpen, onClose, session, onPaymentComplete }: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'visa' | 'wallet'>('cash');
    const [paymentDetails, setPaymentDetails] = useState(''); // Cardholder or Wallet No.
    const [finalTotal, setFinalTotal] = useState(0);
    const [durationHours, setDurationHours] = useState(0);

    const supabase = createClient();

    useEffect(() => {
        if (session) {
            calculateFinals();
        }
    }, [session]);

    const calculateFinals = () => {
        if (!session) return;
        const now = new Date().getTime();
        const start = new Date(session.start_time).getTime();
        const diff = now - start;
        const hours = diff / (1000 * 60 * 60);

        const tableCost = hours * (session.table?.price_per_hour || 0);
        // Add existing total_amount (orders)
        const total = tableCost + (session.total_amount || 0);

        setDurationHours(hours);
        setFinalTotal(parseFloat(total.toFixed(2)));
    };

    const handleConfirmPayment = async () => {
        if (!session) return;
        setLoading(true);

        try {
            const endTime = new Date().toISOString();

            // Update Session
            const { error } = await supabase
                .from('sessions')
                .update({
                    status: 'closed',
                    end_time: endTime,
                    total_amount: finalTotal,
                    payment_method: paymentMethod,
                    payment_details: paymentDetails ? { info: paymentDetails } : null
                })
                .eq('id', session.id);

            if (error) throw error;

            // Generate Receipt (Auto download)
            generateReceipt();

            onPaymentComplete();
            onClose();
        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء الدفع');
        } finally {
            setLoading(false);
        }
    };

    const generateReceipt = () => {
        if (!session) return;
        const doc = new jsPDF();

        // Simple Receipt Design (English for MVP safety, Arabic requires complex font handling in client-side jsPDF)
        doc.setFontSize(22);
        doc.text("The Hub - Receipt", 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Date: ${new Date().toLocaleString()}`, 20, 40);
        doc.text(`Table: ${session.table?.name}`, 20, 50);
        doc.text(`Payment Method: ${paymentMethod.toUpperCase()}`, 20, 60);

        doc.line(20, 70, 190, 70);

        doc.text(`Duration: ${durationHours.toFixed(2)} hrs`, 20, 80);
        doc.text(`Rate: ${session.table?.price_per_hour} EGP/hr`, 120, 80);
        // If orders exist, list them here (omitted for now as we don't have orders array populated usually)

        doc.setFontSize(16);
        doc.text(`TOTAL: ${finalTotal.toFixed(2)} EGP`, 140, 100, { align: 'right' });

        doc.save(`receipt-${session.id.slice(0, 8)}.pdf`);
    };

    if (!isOpen || !session) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#1a1a2e] border border-glass-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-hub-gradient text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Receipt size={24} />
                        إتمام الجلسة والدفع
                    </h2>
                    <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full"><X size={20} /></button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Summary */}
                    <div className="bg-white/5 rounded-xl p-4 space-y-2 border border-glass-border">
                        <div className="flex justify-between text-gray-300">
                            <span>الطاولة</span>
                            <span className="font-bold text-white">{session.table?.name}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                            <span>المدة</span>
                            <span className="font-bold text-white">{durationHours.toFixed(2)} ساعة</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                            <span>المعدل</span>
                            <span className="font-bold text-white">{session.table?.price_per_hour} ج.م/س</span>
                        </div>
                        <div className="h-px bg-white/10 my-2" />
                        <div className="flex justify-between items-end">
                            <span className="text-lg font-bold text-hub-orange">الإجمالي النهائي</span>
                            <span className="text-3xl font-bold text-white">{finalTotal} <span className="text-sm">ج.م</span></span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                        <p className="text-sm text-gray-400">طريقة الدفع</p>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => setPaymentMethod('cash')}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${paymentMethod === 'cash' ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-white/5 border-transparent text-gray-400'}`}
                            >
                                <DollarSign size={24} />
                                <span className="text-xs font-bold">كاش</span>
                            </button>
                            <button
                                onClick={() => setPaymentMethod('visa')}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${paymentMethod === 'visa' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-white/5 border-transparent text-gray-400'}`}
                            >
                                <CreditCard size={24} />
                                <span className="text-xs font-bold">فيزا</span>
                            </button>
                            <button
                                onClick={() => setPaymentMethod('wallet')}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${paymentMethod === 'wallet' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-white/5 border-transparent text-gray-400'}`}
                            >
                                <Wallet size={24} />
                                <span className="text-xs font-bold">محفظة</span>
                            </button>
                        </div>

                        {/* Extra Fields */}
                        {paymentMethod === 'visa' && (
                            <input
                                type="text"
                                placeholder="اسم صاحب الكارت"
                                value={paymentDetails}
                                onChange={e => setPaymentDetails(e.target.value)}
                                className="w-full bg-black/20 border border-glass-border rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 transition"
                            />
                        )}
                        {paymentMethod === 'wallet' && (
                            <input
                                type="text"
                                placeholder="رقم المحفظة / اسم المرسل"
                                value={paymentDetails}
                                onChange={e => setPaymentDetails(e.target.value)}
                                className="w-full bg-black/20 border border-glass-border rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500 transition"
                            />
                        )}
                    </div>

                    <button
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'جاري المعالجة...' : 'دفع وإغلاق الجلسة'}
                    </button>
                </div>
            </div>
        </div>
    );
}
