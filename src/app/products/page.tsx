"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ShoppingBag, Star, AlertCircle, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface Product {
    id: string; // Assuming uuid
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .order("created_at", { ascending: false });

                if (error) throw error;
                setProducts(data || []);
            } catch (err: any) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                    >
                        Premium Refurbished Store
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-400 max-w-2xl mx-auto"
                    >
                        Discover top-tier laptops and desktops at unbeatable prices.
                        Certified quality, warranty backed, and ready for action.
                    </motion.p>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="min-h-[40vh] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                ) : error ? (
                    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-4 text-red-400">
                        <AlertCircle className="w-12 h-12" />
                        <p>Failed to load products. please try again later.</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                        <ShoppingBag className="w-16 h-16 opacity-50" />
                        <p className="text-xl">No products available at the moment.</p>
                        <p>Check back soon for new stock!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col h-full"
                            >
                                {/* Image Aspect Ratio Container */}
                                <div className="aspect-square bg-black relative overflow-hidden flex items-center justify-center p-8 shrink-0">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                                            <ShoppingBag className="w-12 h-12 text-white/20" />
                                        </div>
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex flex-col flex-1 gap-4">
                                    <div className="flex-1 flex flex-col gap-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2 h-[3.5rem] flex items-center">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-400 h-[4.5rem] overflow-hidden text-ellipsis leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Price</span>
                                            <span className="text-2xl font-bold text-white">
                                                ₹{product.price.toLocaleString("en-IN")}
                                            </span>
                                        </div>

                                        <Link
                                            href="/contact"
                                            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
