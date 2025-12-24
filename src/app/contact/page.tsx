"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });

    return (
        <div className="container mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto mb-20"
            >
                <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
                <p className="text-xl text-foreground/70 leading-relaxed">
                    Have a question or a project in mind? Our team at <span className="text-primary font-bold">abs it hub</span> is ready to help you innovate.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="glass p-8 flex items-start gap-6">
                        <div className="p-4 bg-primary/10 rounded-xl text-primary">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Email Us</h3>
                            <p className="text-foreground/70">contact@absithub.com</p>
                        </div>
                    </div>

                    <div className="glass p-8 flex items-start gap-6">
                        <div className="p-4 bg-primary/10 rounded-xl text-primary">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Call Us</h3>
                            <p className="text-foreground/70">+91 96007 07601</p>
                            <p className="text-foreground/70">Mon - Sat, 9am - 8pm</p>
                        </div>
                    </div>

                    <div className="glass p-8 flex items-start gap-6">
                        <div className="p-4 bg-primary/10 rounded-xl text-primary">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                            <p className="text-foreground/70">
                                94, Bharathipuram Near Cottolengo Convent 2nd Gate,<br />
                                Sowripalayam, Coimbatore - 641028<br />
                                Tamil Nadu, India
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-10"
                >
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        const { name, email, message } = formState;
                        const text = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
                        window.open(`https://wa.me/919600707601?text=${text}`, '_blank');
                    }}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground/70">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground/70">Email Address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground/70">Message</label>
                            <textarea
                                rows={4}
                                placeholder="How can we help you?"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            ></textarea>
                        </div>
                        <button className="btn-primary w-full flex items-center justify-center gap-2 py-4 hover:opacity-90 transition-opacity">
                            Send Message <Send className="w-4 h-4" />
                        </button>
                    </form>
                </motion.div>
            </div>

            <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; }
        .text-center { text-align: center; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-3xl { max-width: 48rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-20 { margin-bottom: 5rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .p-4 { padding: 1rem; }
        .p-8 { padding: 2rem; }
        .p-10 { padding: 2.5rem; }
        .grid { display: grid; }
        @media (min-width: 768px) {
          .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .gap-6 { gap: 1.5rem; }
        .gap-16 { gap: 4rem; }
        .gap-2 { gap: 0.5rem; }
        .items-start { align-items: flex-start; }
        .justify-center { justify-content: center; }
        .space-y-8 > * + * { margin-top: 2rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .text-5xl { font-size: 3rem; }
        .text-xl { font-size: 1.25rem; }
        .text-sm { font-size: 0.875rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .text-primary { color: hsl(var(--primary)); }
        .text-foreground\/70 { color: hsla(var(--foreground), 0.7); }
        .leading-relaxed { line-height: 1.625; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .w-full { width: 100%; }
        .bg-white\/5 { background-color: rgba(255, 255, 255, 0.05); }
        .border-white\/10 { border-color: rgba(255, 255, 255, 0.1); }
      `}</style>
        </div>
    );
}
