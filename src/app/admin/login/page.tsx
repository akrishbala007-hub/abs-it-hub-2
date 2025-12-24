"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Laptop } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.message || "Invalid login credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 glass rounded-lg">
                            <Laptop className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">abs it hub</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
                    <p className="text-foreground/50">Secure portal for abs it hub</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground/70">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                            <input
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-primary outline-none transition-all text-white placeholder:text-white/50"
                                placeholder="admin@abs-it-hub.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground/70">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                            <input
                                type="password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 focus:ring-2 focus:ring-primary outline-none transition-all text-white placeholder:text-white/50"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                    >
                        {loading ? "Authenticating..." : "Sign In"} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </motion.div>

            <style jsx>{`
        .login-container {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .max-w-md { max-width: 28rem; }
        .w-full { width: 100%; }
        .p-12 { padding: 3rem; }
        .text-center { text-align: center; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .font-bold { font-weight: 700; }
        .text-foreground\/50 { color: hsla(var(--foreground), 0.5); }
        .text-foreground\/30 { color: hsla(var(--foreground), 0.3); }
        .text-foreground\/70 { color: hsla(var(--foreground), 0.7); }
        .bg-red-500\/10 { background-color: rgba(239, 68, 68, 0.1); }
        .border-red-500\/20 { border-color: rgba(239, 68, 68, 0.2); }
        .text-red-500 { color: rgb(239, 68, 68); }
        .p-4 { padding: 1rem; }
        .pl-12 { padding-left: 3rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-2xl { border-radius: 1rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .left-4 { left: 1rem; }
        .top-1\/2 { top: 50%; }
        .-translate-y-1\/2 { transform: translateY(-50%); }
        .w-5 { width: 1.25rem; }
        .h-5 { height: 1.25rem; }
        .w-8 { width: 2rem; }
        .h-8 { height: 2rem; }
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
      `}</style>
        </div>
    );
}
