'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types';
import { Search, User, Wallet, History } from 'lucide-react';

export default function MembersPage() {
    const [members, setMembers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const supabase = createClient();

    useEffect(() => {
        const fetchMembers = async () => {
            const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
            if (data) setMembers(data);
            setLoading(false);
        };
        fetchMembers();
    }, []);

    const filteredMembers = members.filter(m =>
        m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        m.phone?.includes(search)
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">إدارة الأعضاء</h1>
                <div className="relative w-64">
                    <Search className="absolute top-2.5 right-3 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="بحث بالاسم أو الهاتف..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-glass-white border border-glass-border rounded-xl pr-10 pl-4 py-2 outline-none focus:border-hub-orange"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map(member => (
                    <div key={member.id} className="bg-glass-white backdrop-blur-md rounded-2xl border border-glass-border p-5 hover:border-hub-orange/30 transition group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xl font-bold border border-glass-border">
                                    {member.full_name?.[0] || <User size={20} />}
                                </div>
                                <div>
                                    <h3 className="font-bold">{member.full_name || 'مستخدم جديد'}</h3>
                                    <p className="text-xs text-gray-400">{member.phone || 'لا يوجد هاتف'}</p>
                                </div>
                            </div>
                            <div className="bg-white/5 px-2 py-1 rounded-lg text-xs text-gray-300">
                                {member.role}
                            </div>
                        </div>

                        <div className="bg-black/20 rounded-xl p-3 flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 text-purple-400">
                                <Wallet size={16} />
                                <span className="text-sm font-bold">{member.balance} ج.م</span>
                            </div>
                            <button className="text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg transition">
                                شحن
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-white/5 rounded-xl text-sm font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
                                <History size={16} /> السجل
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
