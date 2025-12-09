'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types';
import { Plus, Edit, Trash, Package, Search } from 'lucide-react';

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({ category: 'food' });
    const [filter, setFilter] = useState('all');

    const supabase = createClient();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data } = await supabase.from('products').select('*').order('name');
        if (data) setProducts(data);
        setLoading(false);
    };

    const handleSave = async () => {
        const { name, price, stock, category, image_url } = currentProduct;
        if (!name || price === undefined) return;

        const productData = {
            name,
            price,
            stock: stock || 0,
            category,
            image_url,
            // Simple logic: if category is 'asset', it's inventory
            is_inventory: category === 'asset'
        };

        if (currentProduct.id) {
            await supabase.from('products').update(productData).eq('id', currentProduct.id);
        } else {
            await supabase.from('products').insert([productData]);
        }

        setIsModalOpen(false);
        setCurrentProduct({ category: 'food' });
        fetchProducts();
    };

    const handleDelete = async (id: string) => {
        if (confirm('حذف هذا المنتج؟')) {
            await supabase.from('products').delete().eq('id', id);
            fetchProducts();
        }
    };

    const filteredProducts = products.filter(p =>
        filter === 'all' ? true : p.category === filter
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">المخزون والمنتجات</h1>
                <button
                    onClick={() => { setCurrentProduct({ category: 'food' }); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-hub-gradient text-white px-4 py-2 rounded-xl shadow-glow"
                >
                    <Plus size={20} /> إضافة منتج
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-fit">
                {['all', 'food', 'drink', 'asset'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === f ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        {f === 'all' ? 'الكل' : f === 'food' ? 'مأكولات' : f === 'drink' ? 'مشروبات' : 'أصول'}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-glass-white backdrop-blur-md rounded-xl border border-glass-border p-4 hover:border-hub-orange/50 transition duration-300">
                        <div className="flex justify-between items-start mb-3">
                            <div className={`p-2 rounded-lg ${product.category === 'asset' ? 'bg-purple-500/20 text-purple-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                <Package size={20} />
                            </div>
                            <div className="text-sm font-bold">{product.price} ج.م</div>
                        </div>
                        <h3 className="font-bold mb-1">{product.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">الكمية: {product.stock}</p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => { setCurrentProduct(product); setIsModalOpen(true); }}
                                className="flex-1 py-1.5 bg-white/5 rounded-lg text-xs hover:bg-white/10"
                            >
                                تعديل
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20"
                            >
                                <Trash size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a2e] border border-glass-border w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
                        <h2 className="text-xl font-bold">بيانات المنتج</h2>

                        <input
                            placeholder="اسم المنتج"
                            value={currentProduct.name || ''}
                            onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                            className="w-full bg-black/20 border border-glass-border rounded-lg px-4 py-2"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number" placeholder="السعر"
                                value={currentProduct.price || ''}
                                onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                                className="bg-black/20 border border-glass-border rounded-lg px-4 py-2"
                            />
                            <input
                                type="number" placeholder="الكمية"
                                value={currentProduct.stock || ''}
                                onChange={e => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) })}
                                className="bg-black/20 border border-glass-border rounded-lg px-4 py-2"
                            />
                        </div>

                        <select
                            value={currentProduct.category || 'food'}
                            onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                            className="w-full bg-black/20 border border-glass-border rounded-lg px-4 py-2 text-gray-300"
                        >
                            <option value="food">مأكولات</option>
                            <option value="drink">مشروبات</option>
                            <option value="asset">أصول ثابتة</option>
                        </select>

                        <div className="flex justify-end gap-3 pt-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg hover:bg-white/10">إلغاء</button>
                            <button onClick={handleSave} className="bg-hub-gradient px-6 py-2 rounded-lg text-white">حفظ</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
