"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu as MenuIcon, X, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Reservations", href: "/reservations" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-hanken font-bold text-[var(--color-primary)]">
          AI Smart Cafe
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 text-[var(--color-on-surface-variant)] font-geist text-sm uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-[var(--color-primary)] transition-colors ${
                pathname === link.href ? "text-[var(--color-primary)]" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/ai-assistant"
            className="flex items-center gap-2 text-[var(--color-on-surface)] hover:text-[var(--color-primary)] font-geist text-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-primary)]" /> AI Assistant
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[var(--color-on-surface)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {mounted && cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[var(--color-primary)] text-[var(--color-on-primary)] w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>

          <Link
            href="/menu"
            className="bg-[var(--color-primary)] text-[var(--color-on-primary)] px-6 py-2.5 rounded-full font-geist text-sm font-semibold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(242,202,80,0.3)]"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[var(--color-on-surface)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {mounted && cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[var(--color-primary)] text-[var(--color-on-primary)] w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          <button className="text-[var(--color-on-surface)]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[var(--color-surface)] border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-geist text-sm uppercase tracking-widest ${
                pathname === link.href ? "text-[var(--color-primary)]" : "text-[var(--color-on-surface-variant)]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 w-full my-2" />
          <Link
            href="/ai-assistant"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-[var(--color-primary)] font-geist text-sm"
          >
            <Sparkles className="w-4 h-4" /> AI Assistant
          </Link>
          <Link
            href="/menu"
            onClick={() => setIsOpen(false)}
            className="bg-[var(--color-primary)] text-[var(--color-on-primary)] px-6 py-3 rounded-full font-geist text-sm font-semibold text-center mt-2"
          >
            Order Now
          </Link>
        </div>
      )}

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
