"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, FileText, Settings, Users, ArrowUpRight, Plus, LogOut } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [session, setSession] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push("/admin/login");
            } else {
                setSession(session);
            }
        });
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    if (!session) return null;

    const stats = [
        { label: "Products", count: 12, icon: <Package />, link: "/admin/products" },
        { label: "Blog Posts", count: 5, icon: <FileText />, link: "/admin/blogs" },
        { label: "Active Users", count: 48, icon: <Users />, link: "#" },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-foreground/50">Manage your products and insights</p>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-foreground/70 hover:text-red-500 transition-colors">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                {stats.map((stat, i) => (
                    <Link href={stat.link} key={i}>
                        <motion.div
                            whileHover={{ translateY: -5 }}
                            className="glass p-8 flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors"
                        >
                            <div>
                                <div className="text-foreground/50 text-sm font-semibold mb-2 uppercase tracking-wider">{stat.label}</div>
                                <div className="text-4xl font-bold">{stat.count}</div>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                {stat.icon}
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="glass p-8">
                    <h2 className="text-2xl font-bold mb-8">Quick Management</h2>
                    <div className="space-y-4">
                        <Link href="/admin/products/new" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                            <span className="flex items-center gap-4 font-semibold">
                                <Plus className="w-5 h-5 text-primary" /> Add New Product
                            </span>
                            <ArrowUpRight className="w-5 h-5 text-foreground/20 group-hover:text-primary transition-all" />
                        </Link>
                        <Link href="/admin/blogs/new" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                            <span className="flex items-center gap-4 font-semibold">
                                <Plus className="w-5 h-5 text-primary" /> Create Blog Post
                            </span>
                            <ArrowUpRight className="w-5 h-5 text-foreground/20 group-hover:text-primary transition-all" />
                        </Link>
                        <Link href="/admin/settings" className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                            <span className="flex items-center gap-4 font-semibold">
                                <Settings className="w-5 h-5 text-primary" /> Site Settings
                            </span>
                            <ArrowUpRight className="w-5 h-5 text-foreground/20 group-hover:text-primary transition-all" />
                        </Link>
                    </div>
                </div>

                {/* Recent Activity Mock */}
                <div className="glass p-8">
                    <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
                    <div className="space-y-6">
                        {[
                            { type: "Product", msg: "Laptop Pro X1 updated", time: "2 hours ago" },
                            { type: "Blog", msg: "Future of AI published", time: "5 hours ago" },
                            { type: "Auth", msg: "Admin login from new device", time: "1 day ago" },
                        ].map((activity, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-1 h-10 bg-primary/30 rounded-full" />
                                <div>
                                    <div className="text-sm font-bold text-primary">{activity.type}</div>
                                    <div className="font-medium">{activity.msg}</div>
                                    <div className="text-xs text-foreground/40 mt-1">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-16 { margin-bottom: 4rem; }
        .mt-1 { margin-top: 0.25rem; }
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .text-4xl { font-size: 2.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .tracking-wider { letter-spacing: 0.05em; }
        .text-primary { color: hsl(var(--primary)); }
        .text-foreground\/50 { color: hsla(var(--foreground), 0.5); }
        .text-foreground\/40 { color: hsla(var(--foreground), 0.4); }
        .text-foreground\/70 { color: hsla(var(--foreground), 0.7); }
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .bg-white\/10 { background-color: rgba(255, 255, 255, 0.1); }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-2xl { border-radius: 1rem; }
        .rounded-full { border-radius: 9999px; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-8 { gap: 2rem; }
        .grid { display: grid; }
        @media (min-width: 768px) {
          .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .p-4 { padding: 1rem; }
        .p-8 { padding: 2rem; }
        .w-1 { width: 0.25rem; }
        .h-10 { height: 2.5rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
      `}</style>
        </div>
    );
}
