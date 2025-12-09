'use client';

import { useState, useEffect } from 'react';
import AppLayout from '@/components/app/AppLayout';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types';
import { ShoppingBag, Plus } from 'lucide-react';

export default function StorePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState('all');
    const supabase = createClient();

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase.from('products').select('*').eq('is_inventory', false); // Only sellable items
            if (data) setProducts(data);
        };
        fetchProducts();
    }, []);

    const filtered = products.filter(p => category === 'all' || p.category === category);

    return (
        <AppLayout>
            <div className="p-6 pb-24">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">المتجر</h1>
                    <div className="bg-hub-orange/20 p-2 rounded-full text-hub-orange">
                        <ShoppingBag size={24} />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                    {['all', 'food', 'drink'].map(c => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-6 py-2 rounded-xl font-bold whitespace-nowrap transition
                                ${category === c ? 'bg-white text-black' : 'bg-white/5 text-gray-400'}
                            `}
                        >
                            {c === 'all' ? 'الكل' : c === 'food' ? 'مأكولات' : 'مشروبات'}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {filtered.map(product => (
                        <div key={product.id} className="bg-glass-white border border-glass-border rounded-2xl p-4 flex flex-col gap-3 group">
                            <div className="aspect-square bg-black/20 rounded-xl flex items-center justify-center text-gray-600">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <ShoppingBag size={32} />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold truncate">{product.name}</h3>
                                <p className="text-hub-yellow font-bold text-sm">{product.price} ج.م</p>
                            </div>
                            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center gap-2 transition text-sm font-bold">
                                <Plus size={16} /> إضافة
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
