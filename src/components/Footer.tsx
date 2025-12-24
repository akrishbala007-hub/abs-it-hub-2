import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    {/* Brand */}
                    <Link href="/" className="text-3xl font-extrabold text-white flex items-center gap-2 mb-4">
                        ABS <span className="text-yellow-500">IT Hub</span>
                    </Link>
                    <p className="text-slate-400 mb-8 max-w-lg">
                        Premium refurbished technology for everyone. Sustainable, affordable, and reliable IT solutions powering the future of Coimbatore.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { Icon: Facebook, href: "#" },
                            { Icon: Twitter, href: "#" },
                            { Icon: Instagram, href: "https://www.instagram.com/absit_hub2.0/" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/company/110541982/" }
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target={href !== '#' ? "_blank" : undefined}
                                rel={href !== '#' ? "noopener noreferrer" : undefined}
                                className="w-12 h-12 rounded-full glass-card-sm flex items-center justify-center text-slate-400 hover:text-black hover:bg-yellow-500 hover:border-yellow-500 transition-all"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} ABS IT Hub. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link href="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-yellow-500 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
