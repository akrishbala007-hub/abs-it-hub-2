"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X, Layout, Eye } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [blog, setBlog] = useState({ title: "", content: "", category: "", author: "", image: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                alert("Error fetching blog post: " + error.message);
                router.push("/admin/blogs");
            } else if (data) {
                setBlog(data);
                if (data.image) setPreviewUrl(data.image);
            }
            setLoading(false);
        };

        fetchBlog();
    }, [id, router]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setImageFile(file);

        if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
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
            .update({
                title: blog.title,
                content: blog.content,
                category: blog.category,
                author: blog.author,
                image: imageUrl
            })
            .eq("id", id);

        if (error) {
            alert("Error updating blog post: " + error.message);
        } else {
            alert("Blog post updated successfully!");
            router.push("/admin/blogs");
        }
        setUploading(false);
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/admin/blogs" className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Blog Posts
            </Link>

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Edit Blog Post</h1>

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
                                            {imageFile ? imageFile.name : (blog.image ? "Change Image" : "Choose Image")}
                                        </span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground/70">Category</label>
                                    <input
                                        type="text"
                                        required
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
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-serif leading-relaxed"
                                    value={blog.content}
                                    onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                disabled={uploading}
                                className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                            >
                                {uploading ? "Updating..." : <><Save className="w-5 h-5" /> Update Post</>}
                            </button>
                        </form>
                    </motion.div>

                    {/* Sidebar/Preview */}
                    <div className="space-y-8">
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
        /* Utils */
        .text-4xl { font-size: 2.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-xl { font-size: 1.25rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-serif { font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; }
        .leading-relaxed { line-height: 1.625; }
        .text-primary { color: hsl(var(--primary)); }
        .text-foreground\/70 { color: hsla(var(--foreground), 0.7); }
        .text-foreground\/50 { color: hsla(var(--foreground), 0.5); }
        .text-foreground\/30 { color: hsla(var(--foreground), 0.3); }
        .text-foreground\/20 { color: hsla(var(--foreground), 0.2); }
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .bg-white\/2 { background-color: rgba(255, 255, 255, 0.02); }
        .bg-black\/50 { background-color: rgba(0, 0, 0, 0.5); }
        .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
        .border-white\/5 { border-color: rgba(255, 255, 255, 0.05); }
        .rounded-lg { border-radius: 0.5rem; }
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
