"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    // Correctly unwrap params using React.use()
    const { id } = use(params);
    const router = useRouter();

    const [product, setProduct] = useState({ name: "", description: "", price: "", image: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                alert("Error fetching product: " + error.message);
                router.push("/admin/products");
            } else if (data) {
                setProduct(data);
                if (data.image) setPreviewUrl(data.image);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id, router]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setImageFile(file);

        // Cleanup old preview URL if it was a blob
        // Note: we don't revoke the initial DB url
        if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        let imageUrl = product.image;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `products/${fileName}`;

            const { data, error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, imageFile);

            if (uploadError) {
                console.error("Supabase Storage Upload Error:", uploadError);
                if (uploadError.message.includes("row-level security")) {
                    alert("Upload failed: Permission denied. Check RLS policies.");
                } else {
                    alert(`Error uploading image: ${uploadError.message}`);
                }
                setUploading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        const { error } = await supabase
            .from('products')
            .update({
                name: product.name,
                description: product.description,
                price: parseFloat(product.price.toString()),
                image: imageUrl
            })
            .eq("id", id);

        if (error) {
            alert("Error updating product: " + error.message);
        } else {
            alert("Product updated successfully!");
            router.push("/admin/products");
        }
        setUploading(false);
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/admin/products" className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Edit Product</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8"
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/70">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    value={product.name}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/70">Description</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                                    value={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/70">Price (₹)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                    value={product.price}
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/70">Product Image</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-white/10 hover:border-primary/50 rounded-lg p-8 cursor-pointer transition-all bg-white/2">
                                        <Upload className="w-5 h-5 text-foreground/30" />
                                        <span className="text-foreground/50 font-medium truncate max-w-[200px]">
                                            {imageFile ? imageFile.name : (product.image ? "Change Image" : "Choose Image")}
                                        </span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            </div>

                            <button
                                disabled={uploading}
                                className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                            >
                                {uploading ? "Updating..." : <><Save className="w-5 h-5" /> Update Product</>}
                            </button>
                        </form>
                    </motion.div>

                    {/* Preview */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-foreground/50">Preview</h3>
                        <div className="glass p-6 overflow-hidden relative">
                            <div className="aspect-square bg-white/5 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden pointer-events-none">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        className="w-full h-full object-cover rounded-xl"
                                        alt="Preview"
                                    />
                                ) : (
                                    <Upload className="w-12 h-12 text-foreground/10" />
                                )}
                            </div>
                            <h4 className="text-2xl font-bold mb-2 truncate">{product.name || "Product Name"}</h4>
                            <p className="text-foreground/50 mb-6 line-clamp-3 h-[4.5rem]">{product.description || "Product description..."}</p>
                            <div className="text-3xl font-bold text-primary">₹{product.price || "0.00"}</div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; }
        .max-w-4xl { max-width: 56rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .p-2 { padding: 0.5rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .grid { display: grid; }
        @media (min-width: 768px) {
          .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-12 { gap: 3rem; }
        .flex { display: flex; }
        .flex-1 { flex: 1 1 0%; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .text-4xl { font-size: 2.25rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-xl { font-size: 1.25rem; }
        .text-sm { font-size: 0.875rem; }
        .font-bold { font-weight: 700; }
        .font-medium { font-weight: 500; }
        .text-primary { color: hsl(var(--primary)); }
        .text-foreground\/50 { color: hsla(var(--foreground), 0.5); }
        .text-foreground\/30 { color: hsla(var(--foreground), 0.3); }
        .text-foreground\/10 { color: hsla(var(--foreground), 0.1); }
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .bg-white\/2 { background-color: rgba(255, 255, 255, 0.02); }
        .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-full { border-radius: 9999px; }
        .hidden { display: none; }
        .aspect-square { aspect-ratio: 1 / 1; }
        .object-cover { object-fit: cover; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
        </div>
    );
}
