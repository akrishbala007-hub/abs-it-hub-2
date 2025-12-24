"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Edit, Trash2, Plus, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching products:", error);
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string, imageUrl: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        // 1. Delete image from storage if it exists
        if (imageUrl) {
            const imagePath = imageUrl.split('images/').pop(); // rough extract, might need refinement based on full URL structure
            // If the URL is full public URL, we might need to parse it better. 
            // Assuming typical Supabase URL: .../storage/v1/object/public/images/folder/file.ext
            if (imagePath) {
                const { error: storageError } = await supabase.storage
                    .from('images')
                    .remove([imagePath]);
                if (storageError) console.error("Error deleting image:", storageError);
            }
        }

        // 2. Delete record from database
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Error deleting product: " + error.message);
        } else {
            // Refresh list
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add New
                </Link>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-20">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 text-foreground/50">No products found.</div>
            ) : (
                <div className="glass overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-foreground/70 uppercase text-sm">
                            <tr>
                                <th className="p-6">Product</th>
                                <th className="p-6">Price</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-foreground/30">No Img</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.name}</div>
                                            <div className="text-xs text-foreground/50 truncate max-w-[200px]">{product.description}</div>
                                        </div>
                                    </td>
                                    <td className="p-6 font-mono">₹{product.price}</td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/products/${product.id}`} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id, product.image)}
                                                className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                .container { max-width: 1200px; margin: 0 auto; }
                .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
                .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; }
                .flex { display: flex; }
                .gap-2 { gap: 0.5rem; }
                .gap-4 { gap: 1rem; }
                .items-center { align-items: center; }
                .justify-between { justify-content: space-between; }
                .justify-center { justify-content: center; }
                .justify-end { justify-content: flex-end; }
                .text-right { text-align: right; }
                .p-6 { padding: 1.5rem; }
                .p-4 { padding: 1rem; }
                .p-2 { padding: 0.5rem; }
                .w-full { width: 100%; }
                .w-12 { width: 3rem; }
                .h-12 { height: 3rem; }
                .w-5 { width: 1.25rem; }
                .h-5 { height: 1.25rem; }
                .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
                .bg-white\/10 { background-color: rgba(255, 255, 255, 0.1); }
                .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
                .text-foreground\/50 { color: hsla(var(--foreground), 0.5); }
                .text-foreground\/70 { color: hsla(var(--foreground), 0.7); }
                .hover\:bg-white\/5:hover { background-color: rgba(255, 255, 255, 0.05); }
                .bg-blue-500\/20 { background-color: rgba(59, 130, 246, 0.2); }
                .text-blue-400 { color: rgb(96, 165, 250); }
                .bg-red-500\/20 { background-color: rgba(239, 68, 68, 0.2); }
                .text-red-400 { color: rgb(248, 113, 113); }
                .rounded-lg { border-radius: 0.5rem; }
                .rounded-xl { border-radius: 0.75rem; }
                .object-cover { object-fit: cover; }
            `}</style>
        </div>
    );
}
