"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, ArrowRight, Loader } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    category: string;
    image: string;
    created_at: string;
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
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
        }
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto mb-20"
            >
                <h1 className="text-5xl font-bold mb-6">Tech Insights</h1>
                <p className="text-xl text-foreground/70 leading-relaxed">
                    Stay informed with the latest trends, expert analyses, and visionary ideas from the world of technology.
                </p>
            </motion.div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold mb-2">No articles yet</h3>
                    <p className="text-foreground/50">Check back soon for updates.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-10">
                    {blogs.map((blog, i) => (
                        <motion.article
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass group overflow-hidden flex flex-col"
                        >
                            <div className="aspect-video relative overflow-hidden bg-white/5">
                                {blog.image ? (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground/20">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-foreground/50 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {new Date(blog.created_at).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3" /> {blog.author}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-foreground/70 mb-6 flex-1 line-clamp-3">
                                    {blog.content}
                                </p>
                                <Link href={`/blog/${blog.id}`} className="flex items-center gap-2 text-primary font-bold group/link mt-auto">
                                    Read Full Story <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}

            <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; }
        .text-center { text-align: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-3xl { max-width: 48rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-20 { margin-bottom: 5rem; }
        .mt-auto { margin-top: auto; }
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .grid { display: grid; }
        @media (min-width: 768px) {
          .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .gap-10 { gap: 2.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-1 { gap: 0.25rem; }
        .p-8 { padding: 2rem; }
        .text-5xl { font-size: 3rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-xs { font-size: 0.75rem; }
        .font-bold { font-weight: 700; }
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 0.05em; }
        .text-primary { color: hsl(var(--primary)); }
        .text-black { color: #000; }
        .text-foreground\/70 { color: hsla(var(--foreground), 0.7); }
        .text-foreground\/50 { color: hsla(var(--foreground), 0.5); }
        .text-foreground\/20 { color: hsla(var(--foreground), 0.2); }
        .leading-relaxed { line-height: 1.625; }
        .aspect-video { aspect-ratio: 16 / 9; }
        .relative { position: relative; }
        .overflow-hidden { overflow: hidden; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .flex-1 { flex: 1 1 0%; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .w-full { width: 100%; }
        .h-full { height: 100%; }
        .h-64 { height: 16rem; }
        .object-cover { object-fit: cover; }
        .transition-transform { transition-property: transform; }
        .duration-500 { transition-duration: 500ms; }
        .rounded-full { border-radius: 9999px; }
        .rounded-2xl { border-radius: 1rem; }
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
        .border { border-width: 1px; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; }
      `}</style>
        </div>
    );
}
