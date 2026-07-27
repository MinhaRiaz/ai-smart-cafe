"use client";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Plus, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import Image from "next/image";

export default function MenuPage() {
  const { menuItems, addToCart, cart } = useStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center text-white/50">Loading Menu...</main>;
  }

  // Get unique categories from menu items
  const categories = ["All", ...Array.from(new Set(menuItems.map(item => item.category)))];

  // Filter items based on search and category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: any) => {
    addToCart(item);
    setAddedIds([...addedIds, item.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary-container)]/10 blur-[150px] rounded-full pointer-events-none" />

      <section className="pt-20 px-6 max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-hanken font-extrabold mb-4">Our Menu</h1>
        <p className="text-[var(--color-on-surface-variant)] max-w-2xl mb-12">
          Explore our artisanal selection of beverages and culinary delights.
        </p>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-outline)]" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the menu..." 
              className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-full py-4 pl-12 pr-6 text-[var(--color-on-surface)] focus:outline-none focus:border-[var(--color-primary)] transition-colors font-geist"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, i) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-geist text-sm whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)]' : 'glass border border-white/10 hover:bg-white/5'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="glass-card p-4 rounded-3xl flex flex-col group relative overflow-hidden">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 bg-[var(--color-surface-bright)]">
                {item.image && (item.image.startsWith('/') || item.image.startsWith('http')) ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-on-surface-variant)]">No Image</div>
                )}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-geist text-[var(--color-primary)] uppercase tracking-wider">
                  {item.category}
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-2 px-2">
                <h3 className="text-xl font-hanken font-bold">{item.name}</h3>
                <div className="font-geist font-semibold text-[var(--color-primary)]">{item.price}</div>
              </div>
              
              <div className="mt-auto px-2 pt-4">
                <button 
                  onClick={() => handleAddToCart(item)}
                  className={`w-full py-3 rounded-xl font-geist text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    addedIds.includes(item.id) 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-[var(--color-surface-container)] hover:bg-[var(--color-primary)] text-[var(--color-on-surface)] hover:text-[var(--color-on-primary)] border border-white/5'
                  }`}
                >
                  {addedIds.includes(item.id) ? (
                    <><Check className="w-4 h-4" /> Added to Order</>
                  ) : (
                    <><Plus className="w-4 h-4" /> Add to Order</>
                  )}
                </button>
              </div>
            </div>
          ))}
          
          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-[var(--color-on-surface-variant)]">
              No items found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
