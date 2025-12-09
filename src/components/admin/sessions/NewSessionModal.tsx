'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Table, Profile } from '@/types';
import { X, Search } from 'lucide-react';

interface NewSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSessionStarted: () => void;
}

export default function NewSessionModal({ isOpen, onClose, onSessionStarted }: NewSessionModalProps) {
    const [tables, setTables] = useState<Table[]>([]);
    const [members, setMembers] = useState<Profile[]>([]); // Should be search based ideally
    const [loading, setLoading] = useState(false);

    // Form State
    const [selectedTable, setSelectedTable] = useState<string>('');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [guestName, setGuestName] = useState(''); // For non-registered
    const [searchTerm, setSearchTerm] = useState('');

    const supabase = createClient();

    useEffect(() => {
        if (isOpen) {
            fetchInitialData();
        }
    }, [isOpen]);

    const fetchInitialData = async () => {
        // Fetch active tables only
        const { data: tablesData } = await supabase
            .from('tables')
            .select('*')
            .eq('is_active', true);

        // Use a simple search later, for now query some members
        const { data: membersData } = await supabase
            .from('profiles')
            .select('*')
            .limit(10); // Limit for performance in MVP

        if (tablesData) setTables(tablesData);
        if (membersData) setMembers(membersData);
    };

    const handleStartSession = async () => {
        if (!selectedTable) return;

        setLoading(true);
        try {
            // 1. Create Session
            const { data: session, error } = await supabase
                .from('sessions')
                .insert([{
                    table_id: selectedTable,
                    start_time: new Date().toISOString(),
                    status: 'active',
                    total_amount: 0 // Starts at 0
                }])
                .select()
                .single();

            if (error) throw error;

            // 2. Add Members (if any)
            if (session && selectedMembers.length > 0) {
                const membersToAdd = selectedMembers.map(uid => ({
                    session_id: session.id,
                    user_id: uid
                }));
                await supabase.from('session_members').insert(membersToAdd);
            }

            // 3. Add Guest (if specified)
            if (session && guestName) {
                await supabase.from('session_members').insert([{
                    session_id: session.id,
                    guest_name: guestName
                }]);
            }

            onSessionStarted();
            onClose();
        } catch (error) {
            console.error('Error starting session:', error);
            alert('حدث خطأ أثناء بدء الجلسة');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#1a1a2e] border border-glass-border w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-glass-border flex justify-between items-center">
                    <h2 className="text-xl font-bold">بدء جلسة جديدة</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-6">
                    {/* 1. Select Table */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3">اختر الطاولة</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {tables.map(table => (
                                <button
                                    key={table.id}
                                    onClick={() => setSelectedTable(table.id)}
                                    className={`p-4 rounded-xl border transition-all text-right
                                        ${selectedTable === table.id
                                            ? 'bg-hub-gradient text-white border-transparent'
                                            : 'bg-white/5 border-glass-border hover:border-hub-orange/50'
                                        }`}
                                >
                                    <div className="font-bold">{table.name}</div>
                                    <div className={`text-xs mt-1 ${selectedTable === table.id ? 'text-white/80' : 'text-gray-400'}`}>
                                        {table.capacity_min}-{table.capacity_max} أفراد
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Select Members */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3">الأعضاء (اختياري)</label>
                        <div className="bg-black/20 rounded-xl p-4 border border-glass-border">
                            <div className="relative mb-3">
                                <Search size={18} className="absolute top-3 right-3 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="بحث عن عضو..."
                                    className="w-full bg-black/20 border border-glass-border rounded-lg pr-10 pl-4 py-2.5 outline-none focus:border-hub-orange"
                                // Implementation of real search would go here
                                />
                            </div>

                            <div className="max-h-32 overflow-y-auto space-y-2 custom-scrollbar">
                                {members.map(member => (
                                    <label key={member.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedMembers.includes(member.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedMembers([...selectedMembers, member.id]);
                                                else setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                                            }}
                                            className="w-4 h-4 rounded border-gray-600 bg-transparent text-hub-orange focus:ring-hub-orange"
                                        />
                                        <div>
                                            <div className="text-sm font-bold">{member.full_name || 'بدون اسم'}</div>
                                            <div className="text-xs text-gray-500">{member.phone}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Guest Quick Add */}
                        <div className="mt-3">
                            <label className="text-xs text-gray-500 mb-1 block">أو أضف اسم زائر (Guest)</label>
                            <input
                                type="text"
                                placeholder="اسم الزائر..."
                                value={guestName}
                                onChange={e => setGuestName(e.target.value)}
                                className="w-full bg-black/20 border border-glass-border rounded-lg px-4 py-2 outline-none focus:border-hub-orange text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-glass-border bg-black/20">
                    <button
                        onClick={handleStartSession}
                        disabled={!selectedTable || loading}
                        className={`w-full py-3 rounded-xl font-bold text-lg shadow-glow transition-all
                            ${!selectedTable || loading
                                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                                : 'bg-hub-gradient text-white hover:opacity-90'
                            }`}
                    >
                        {loading ? 'جاري الفتح...' : 'بدء الجلسة الآن'}
                    </button>
                </div>
            </div>
        </div>
    );
}
