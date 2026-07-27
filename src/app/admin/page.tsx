"use client";
import { useState, useEffect } from "react";
import { BarChart3, Users, CalendarDays, Settings, Coffee, Plus, Trash2, Edit2, X } from "lucide-react";
import { useStore, MenuItem } from "@/lib/store";
import Image from "next/image";

export default function AdminDashboardPage() {
  const { menuItems, addMenuItem, deleteMenuItem } = useStore();
  const [activeTab, setActiveTab] = useState<"dashboard" | "menu" | "orders">("dashboard");
  const [mounted, setMounted] = useState(false);
  
  // Add item form state
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Coffee", image: "" });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    
    addMenuItem({
      name: newItem.name,
      price: newItem.price,
      category: newItem.category,
      image: newItem.image || "/images/midnight_espresso.png" // fallback
    });
    setNewItem({ name: "", price: "", category: "Coffee", image: "" });
    setIsAdding(false);
  };

  const stats = [
    { label: "Today's Orders", value: "124", icon: Coffee, trend: "+12%" },
    { label: "Active Reservations", value: "18", icon: CalendarDays, trend: "+4%" },
    { label: "Total Menu Items", value: menuItems.length.toString(), icon: Settings, trend: "Live" },
    { label: "Revenue", value: "Rs. 45,200", icon: BarChart3, trend: "+8%" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center text-white/50">Loading Admin...</main>;
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-primary-container)]/5 blur-[150px] rounded-full pointer-events-none" />

      <section className="pt-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-hanken font-extrabold mb-2">Admin Manager</h1>
            <p className="text-[var(--color-on-surface-variant)]">Control your entire cafe operations here.</p>
          </div>
          <button className="bg-[var(--color-surface-container)] border border-white/10 hover:bg-white/5 text-[var(--color-on-surface)] px-6 py-3 rounded-xl font-geist text-sm font-semibold transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveTab("dashboard")} className={`px-6 py-2 rounded-full font-geist text-sm transition-colors whitespace-nowrap ${activeTab === "dashboard" ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]" : "glass hover:bg-white/5"}`}>Dashboard</button>
          <button onClick={() => setActiveTab("menu")} className={`px-6 py-2 rounded-full font-geist text-sm transition-colors whitespace-nowrap ${activeTab === "menu" ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]" : "glass hover:bg-white/5"}`}>Menu Management</button>
          <button onClick={() => setActiveTab("orders")} className={`px-6 py-2 rounded-full font-geist text-sm transition-colors whitespace-nowrap ${activeTab === "orders" ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]" : "glass hover:bg-white/5"}`}>Live Orders</button>
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <span className="text-xs font-geist font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">{stat.trend}</span>
                  </div>
                  <div className="text-3xl font-hanken font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-geist text-[var(--color-on-surface-variant)] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-card p-8 rounded-3xl lg:col-span-2 min-h-[400px] flex flex-col justify-center items-center text-center">
                <BarChart3 className="w-16 h-16 text-white/10 mb-4" />
                <h3 className="font-hanken font-bold text-xl mb-2 text-[var(--color-on-surface)]">Sales Overview</h3>
                <p className="text-[var(--color-on-surface-variant)]">Charts and detailed analytics will be displayed here.</p>
              </div>
              <div className="glass-card p-8 rounded-3xl min-h-[400px] flex flex-col justify-center items-center text-center">
                <CalendarDays className="w-16 h-16 text-white/10 mb-4" />
                <h3 className="font-hanken font-bold text-xl mb-2 text-[var(--color-on-surface)]">Upcoming Reservations</h3>
                <p className="text-[var(--color-on-surface-variant)]">List of today's booked tables.</p>
              </div>
            </div>
          </>
        )}

        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-hanken font-bold">Manage Menu</h2>
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="bg-[var(--color-primary)] text-[var(--color-on-primary)] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform"
              >
                {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isAdding ? "Cancel" : "Add New Item"}
              </button>
            </div>

            {isAdding && (
              <form onSubmit={handleAddItem} className="glass-card p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4 border border-[var(--color-primary)]/30">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Item Name</label>
                  <input type="text" required value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)]" placeholder="e.g. Vanilla Cold Brew" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Price</label>
                  <input type="text" required value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)]" placeholder="e.g. Rs. 500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Category</label>
                  <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)]">
                    <option>Coffee</option>
                    <option>Tea</option>
                    <option>Desserts</option>
                    <option>Snacks</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[var(--color-on-surface-variant)]">Image URL (Optional)</label>
                  <input type="text" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} className="w-full bg-[var(--color-surface-container)] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)]" placeholder="/images/midnight_espresso.png" />
                </div>
                <div className="md:col-span-2 pt-2">
                  <button type="submit" className="bg-[var(--color-primary)] text-[var(--color-on-primary)] px-8 py-3 rounded-xl font-bold w-full hover:bg-[var(--color-primary)]/90 transition-colors">Save Item</button>
                </div>
              </form>
            )}

            <div className="glass-card rounded-3xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 border-b border-white/10 font-geist text-[var(--color-on-surface-variant)]">
                  <tr>
                    <th className="p-4 uppercase tracking-widest text-xs font-normal">Image</th>
                    <th className="p-4 uppercase tracking-widest text-xs font-normal">Name</th>
                    <th className="p-4 uppercase tracking-widest text-xs font-normal">Category</th>
                    <th className="p-4 uppercase tracking-widest text-xs font-normal">Price</th>
                    <th className="p-4 uppercase tracking-widest text-xs font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {menuItems.map(item => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-[var(--color-surface-bright)]">
                          {item.image && (item.image.startsWith('/') || item.image.startsWith('http')) && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                        </div>
                      </td>
                      <td className="p-4 font-hanken font-bold text-base">{item.name}</td>
                      <td className="p-4"><span className="bg-white/10 px-3 py-1 rounded-full text-xs">{item.category}</span></td>
                      <td className="p-4 font-geist text-[var(--color-primary)]">{item.price}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 bg-[var(--color-surface-container)] hover:bg-white/10 rounded-lg text-blue-400 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteMenuItem(item.id)} className="p-2 bg-[var(--color-surface-container)] hover:bg-red-500/20 rounded-lg text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="glass-card p-20 rounded-3xl flex flex-col items-center justify-center text-center">
             <Coffee className="w-16 h-16 text-white/10 mb-4" />
             <h3 className="text-xl font-bold font-hanken">No active orders right now</h3>
             <p className="text-[var(--color-on-surface-variant)] mt-2">When customers place orders via the Cart, they will appear here.</p>
          </div>
        )}
      </section>
    </main>
  );
}
