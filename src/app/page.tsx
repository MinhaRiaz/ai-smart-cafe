import { Coffee, Sparkles, ArrowRight, Utensils } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[var(--color-primary-container)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#393939]/30 blur-[100px] rounded-full pointer-events-none" />



      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border border-[var(--color-primary)]/20">
          <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="text-[var(--color-primary)] font-geist text-sm tracking-wide">Powered by AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-hanken font-extrabold text-[var(--color-on-surface)] leading-tight mb-6">
          Your Intelligent <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#ffd666]">
            Cafe Companion
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--color-on-surface-variant)] max-w-2xl mb-12 leading-relaxed">
          Discover the perfect food and drink pairings tailored to your taste, mood, and budget. Our AI assistant is ready to take your order.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/ai-assistant" className="bg-[var(--color-primary)] text-[var(--color-on-primary)] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(242,202,80,0.4)] flex items-center justify-center gap-2 group">
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Ask AI Assistant
          </Link>
          <Link href="/menu" className="glass-card px-8 py-4 rounded-full font-bold text-lg text-[var(--color-on-surface)] hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <Utensils className="w-5 h-5" />
            Explore Menu
          </Link>
        </div>
      </section>

      {/* Featured Drinks */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-hanken font-bold mb-4">Curated Signatures</h2>
            <p className="text-[var(--color-on-surface-variant)]">Handcrafted masterpieces, recommended for you.</p>
          </div>
          <Link href="/menu" className="hidden md:flex items-center gap-2 text-[var(--color-primary)] hover:gap-3 transition-all font-geist uppercase tracking-widest text-sm">
            Full Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Midnight Espresso", price: "Rs. 450", desc: "Deep, dark, and intensely aromatic.", image: "/images/midnight_espresso.png" },
            { name: "Caramel Cloud Latte", price: "Rs. 600", desc: "Smooth espresso topped with airy caramel foam.", image: "/images/caramel_latte.png" },
            { name: "Matcha Zen", price: "Rs. 750", desc: "Ceremonial grade matcha with oat milk.", image: "/images/matcha_zen.png" }
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl group hover:-translate-y-2 transition-all duration-300">
              <div className="w-full aspect-square bg-[var(--color-surface-bright)] rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
                 <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-hanken font-bold mb-2">{item.name}</h3>
              <p className="text-[var(--color-on-surface-variant)] mb-4 text-sm">{item.desc}</p>
              <div className="flex justify-between items-center">
                <span className="font-geist text-[var(--color-primary)]">{item.price}</span>
                <Link href="/menu" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-colors">
                  +
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating AI Button (Global) */}
      <Link href="/ai-assistant" className="fixed bottom-8 right-8 w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(242,202,80,0.5)] hover:scale-110 transition-transform z-50 group">
        <Sparkles className="w-8 h-8 text-[var(--color-on-primary)] group-hover:rotate-12 transition-transform" />
      </Link>
    </main>
  );
}
