"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Laptop } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4 glass-panel border-b border-white/10 shadow-sm" : "py-6 bg-transparent"
        }`}
    >
      <div className="w-full mx-auto px-6 flex items-center" style={{ maxWidth: '1400px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Branding */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            ABS IT Hub
          </span>
        </Link>



        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="flex items-center gap-3">
              {link.name === "Home" && (
                <span className="text-white font-bold text-lg hidden lg:inline-block mr-4" style={{ marginRight: '32px' }}>ABS IT Hub</span>
              )}
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-white ${pathname === link.href ? "text-white font-bold" : "text-white/70"
                  }`}
              >
                {link.name}
              </Link>
            </div>
          ))}
          <Link href="/admin/login" className="bg-white text-black font-bold text-sm px-6 py-2 rounded-full hover:shadow-lg hover:shadow-white/20 transition-all hover:scale-105 border border-transparent hover:border-white/50">
            Admin Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-yellow-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel mx-6 mt-4 overflow-hidden border-t-0 rounded-2xl"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium transition-colors ${pathname === link.href ? "text-white font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="btn-primary text-center bg-white text-black border-none font-bold hover:bg-slate-200"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
