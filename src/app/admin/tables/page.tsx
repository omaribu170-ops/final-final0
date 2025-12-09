'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Table } from '@/types';
import { Plus, Edit, Trash, DollarSign, Users as UsersIcon } from 'lucide-react';

export default function TablesPage() {
    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState<Partial<Table>>({});

    const supabase = createClient();

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        const { data, error } = await supabase
            .from('tables')
            .select('*')
            .order('name');

        if (data) setTables(data);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!currentTable.name || !currentTable.price_per_hour) return;

        const tableData = {
            name: currentTable.name,
            price_per_hour: currentTable.price_per_hour,
            capacity_min: currentTable.capacity_min || 1,
            capacity_max: currentTable.capacity_max || 4,
            image_url: currentTable.image_url,
            is_active: currentTable.is_active ?? true
        };

        if (currentTable.id) {
            await supabase.from('tables').update(tableData).eq('id', currentTable.id);
        } else {
            await supabase.from('tables').insert([tableData]);
        }

        setIsModalOpen(false);
        setCurrentTable({});
        fetchTables();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذه الطاولة؟')) return;
        await supabase.from('tables').delete().eq('id', id);
        fetchTables();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">إدارة الطاولات</h1>
                <button
                    onClick={() => { setCurrentTable({}); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-hub-gradient text-white px-4 py-2 rounded-xl shadow-glow hover:opacity-90 transition"
                >
                    <Plus size={20} />
                    <span>إضافة طاولة</span>
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20">جاري التحميل...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tables.map((table) => (
                        <div key={table.id} className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border overflow-hidden relative group">
                            <div className="h-40 bg-gray-800/50 flex items-center justify-center text-gray-600">
                                {table.image_url ? (
                                    <img src={table.image_url} alt={table.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-arabic">لا توجد صورة</span>
                                )}
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-bold">{table.name}</h3>
                                    <span className={`w-3 h-3 rounded-full ${table.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                                </div>

                                <div className="flex items-center gap-2 text-gray-300">
                                    <DollarSign size={16} className="text-hub-orange" />
                                    <span>{table.price_per_hour} ج.م / ساعة</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-300">
                                    <UsersIcon size={16} className="text-hub-yellow" />
                                    <span>{table.capacity_min} - {table.capacity_max} أفراد</span>
                                </div>

                                <div className="flex gap-2 pt-2 border-t border-glass-border">
                                    <button
                                        onClick={() => { setCurrentTable(table); setIsModalOpen(true); }}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-blue-300 transition"
                                    >
                                        <Edit size={16} /> تعديل
                                    </button>
                                    <button
                                        onClick={() => handleDelete(table.id)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-300 transition"
                                    >
                                        <Trash size={16} /> حذف
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#1a1a2e] border border-glass-border w-full max-w-lg rounded-2xl p-6 shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">
                            {currentTable.id ? 'تعديل طاولة' : 'إضافة طاولة جديدة'}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">اسم الطاولة</label>
                                <input
                                    type="text"
                                    value={currentTable.name || ''}
                                    onChange={e => setCurrentTable({ ...currentTable, name: e.target.value })}
                                    className="w-full bg-black/20 border border-glass-border rounded-lg px-4 py-2 focus:border-hub-orange outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">السعر / ساعة</label>
                                    <input
                                        type="number"
                                        value={currentTable.price_per_hour || ''}
                                        onChange={e => setCurrentTable({ ...currentTable, price_per_hour: parseFloat(e.target.value) })}
                                        className="w-full bg-black/20 border border-glass-border rounded-lg px-4 py-2 focus:border-hub-orange outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">السعة (أفراد)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={currentTable.capacity_min || ''}
                                            onChange={e => setCurrentTable({ ...currentTable, capacity_min: parseInt(e.target.value) })}
                                            className="w-1/2 bg-black/20 border border-glass-border rounded-lg px-2 py-2 focus:border-hub-orange outline-none"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={currentTable.capacity_max || ''}
                                            onChange={e => setCurrentTable({ ...currentTable, capacity_max: parseInt(e.target.value) })}
                                            className="w-1/2 bg-black/20 border border-glass-border rounded-lg px-2 py-2 focus:border-hub-orange outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-hub-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                                >
                                    حفظ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
