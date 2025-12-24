"use client";

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Share2, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from "@/lib/supabase";

interface BlogPost {
    id: number;
    title: string;
    content: string;
    category: string;
    author: string;
    image: string;
    created_at: string;
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog() {
            if (!resolvedParams.id) return;

            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .eq("id", resolvedParams.id)
                .single();

            if (!error && data) {
                setBlog(data);
            } else {
                console.error("Error fetching blog:", error);
            }
            setLoading(false);
        }

        fetchBlog();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Blog Not Found</h2>
                    <Link href="/blog" className="text-primary hover:underline">Back to Blogs</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-slate-200 pt-24 pb-20">
            <article className="container mx-auto px-6 max-w-4xl">
                {/* Navigation */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blogs
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                            <span className="bg-white/10 px-3 py-1 rounded-full text-white font-medium flex items-center gap-2">
                                <Tag className="w-3 h-3" /> {blog.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="w-4 h-4" /> {blog.author}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-8">
                            {blog.title}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="rounded-3xl overflow-hidden aspect-video relative border border-white/10 shadow-2xl bg-white/5"
                    >
                        {blog.image ? (
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-foreground/20">
                                No Cover Image
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10"
                >
                    <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                        {blog.content}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                        <div className="text-slate-400 text-sm">
                            Share this article
                        </div>
                        <div className="flex gap-4">
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </article>

            <style jsx>{`
                .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); }
            `}</style>
        </div>
    );
}
