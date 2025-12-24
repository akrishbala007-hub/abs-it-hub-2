"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, FileText, AlertCircle, Loader } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface BlogPost {
    id: number;
    title: string;
    category: string;
    author: string;
    created_at: string;
    image: string;
}

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setBlogs(data || []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const { error } = await supabase
                .from("blogs")
                .delete()
                .eq("id", id);

            if (error) throw error;
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            alert("Error deleting post");
            console.error(error);
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Blog Posts</h1>
                    <p className="text-foreground/50">Manage your articles and insights</p>
                </div>
                <Link href="/admin/blogs/new">
                    <button className="btn-primary flex items-center gap-2 px-6 py-3">
                        <Plus className="w-5 h-5" /> Write New Post
                    </button>
                </Link>
            </div>

            {/* Search */}
            <div className="mb-8 relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
                    <h3 className="text-xl font-bold mb-2">No posts found</h3>
                    <p className="text-foreground/50">Start writing to share your knowledge.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredBlogs.map((blog) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-colors"
                        >
                            {/* Image Thumbnail */}
                            <div className="w-full md:w-32 h-20 bg-black/50 rounded-lg overflow-hidden shrink-0">
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground/20">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
                                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-foreground/50">
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{blog.category}</span>
                                    <span>by {blog.author}</span>
                                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link href={`/admin/blogs/${blog.id}`}>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <style jsx>{`
                .container { max-width: 1200px; margin: 0 auto; }
                .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; }
            `}</style>
        </div>
    );
}
