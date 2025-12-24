"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Layout, Quote, Eye, Upload, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function NewBlogPage() {
    const [blog, setBlog] = useState({ title: "", content: "", category: "", author: "", image: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setImageFile(file);

        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        let imageUrl = blog.image;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `blogs/${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(fileName, imageFile);

            if (uploadError) {
                alert(`Error uploading image: ${uploadError.message}`);
                setUploading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(fileName);

            imageUrl = publicUrl;
        }

        const { error } = await supabase
            .from('blogs')
            .insert([{ ...blog, image: imageUrl }]);

        if (error) {
            alert("Error saving blog post: " + error.message);
        } else {
            alert("Blog post published successfully!");
            setBlog({ title: "", content: "", category: "", author: "", image: "" });
            setImageFile(null);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        setUploading(false);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Write New Blog Post</h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Editor */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 glass p-8"
                    >
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/70">Blog Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="The Future of..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-2xl font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                                    value={blog.title}
                                    onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/70">Cover Image</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-white/10 hover:border-primary/50 rounded-lg p-8 cursor-pointer transition-all bg-white/2">
                                        <Upload className="w-5 h-5 text-foreground/30" />
                                        <span className="text-foreground/50 font-medium truncate max-w-[200px]">
                                            {imageFile ? imageFile.name : "Choose cover image"}
                                        </span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                    {imageFile && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFile(null);
                                                if (previewUrl) URL.revokeObjectURL(previewUrl);
                                                setPreviewUrl(null);
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground/70">Category</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Innovation"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                        value={blog.category}
                                        onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground/70">Author Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                        value={blog.author}
                                        onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground/70">Post Content</label>
                                <textarea
                                    rows={15}
                                    required
                                    placeholder="Start writing your insights..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-serif leading-relaxed"
                                    value={blog.content}
                                    onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                disabled={uploading}
                                className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                            >
                                {uploading ? "Publishing..." : <><Save className="w-5 h-5" /> Publish Post</>}
                            </button>
                        </form>
                    </motion.div>

                    {/* Sidebar/Preview */}
                    <div className="space-y-8">
                        <div className="glass p-6">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-primary" /> Publishing Info
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-foreground/50">Status</span>
                                    <span className="text-green-500 font-bold">Draft</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-foreground/50">Visibility</span>
                                    <span className="font-bold">Public</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-6">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-primary" /> Live Preview
                            </h3>
                            <div className="overflow-hidden border border-white/5 rounded-lg bg-white/2">
                                <div className="aspect-video bg-black/50 relative">
                                    {previewUrl ? (
                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-foreground/20">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold mb-2 truncate">{blog.title || "Untitled Post"}</h4>
                                    <p className="text-xs text-foreground/50 line-clamp-2">{blog.content || "No content yet..."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; }
        .max-w-6xl { max-width: 72rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .grid { display: grid; }
        @media (min-width: 1024px) {
          .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .lg\:col-span-2 { grid-column: span 2 / span 2; }
        }
        @media (min-width: 768px) {
          .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-12 { gap: 3rem; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-8 > * + * { margin-top: 2rem; }
        /* Text styling */
        .text-4xl { font-size: 2.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-xl { font-size: 1.25rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-serif { font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; }
        .leading-relaxed { line-height: 1.625; }
        /* Colors */
        .text-primary { color: hsl(var(--primary)); }
        .text-green-500 { color: #22c55e; }
        .text-red-500 { color: #ef4444; }
        .text-foreground\/70 { color: hsla(var(--foreground), 0.7); }
        .text-foreground\/50 { color: hsla(var(--foreground), 0.5); }
        .text-foreground\/30 { color: hsla(var(--foreground), 0.3); }
        .text-foreground\/20 { color: hsla(var(--foreground), 0.2); }
        /* Backgrounds & Borders */
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .bg-white\/2 { background-color: rgba(255, 255, 255, 0.02); }
        .bg-black\/50 { background-color: rgba(0, 0, 0, 0.5); }
        .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
        .border-white\/5 { border-color: rgba(255, 255, 255, 0.05); }
        /* Utils */
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-full { border-radius: 9999px; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .hidden { display: none; }
        .aspect-video { aspect-ratio: 16 / 9; }
        .relative { position: relative; }
        .object-cover { object-fit: cover; }
        .w-full { width: 100%; }
        .h-full { height: 100%; }
      `}</style>
        </div>
    );
}
