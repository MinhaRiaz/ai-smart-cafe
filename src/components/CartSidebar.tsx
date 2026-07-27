"use client";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/\D/g, '')) || 0;
    return acc + (price * item.quantity);
  }, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-[var(--color-surface)] border-l border-white/10 z-[70] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-hanken font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
            Your Order
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-[var(--color-on-surface-variant)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[var(--color-on-surface-variant)] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 opacity-50" />
              </div>
              <p>Your cart is empty.<br/>Add some delicious items from our menu!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-[var(--color-surface-bright)] shrink-0">
                  {item.image && (item.image.startsWith('/') || item.image.startsWith('http')) && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-hanken font-bold text-sm line-clamp-1">{item.name}</h4>
                  <div className="text-[var(--color-primary)] text-sm font-geist">{item.price}</div>
                </div>
                <div className="flex items-center gap-3 bg-[var(--color-surface-container)] rounded-lg p-1">
                  <button 
                    onClick={() => {
                      if (item.quantity > 1) updateCartQuantity(item.id, item.quantity - 1);
                      else removeFromCart(item.id);
                    }}
                    className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-[var(--color-on-surface)]"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-geist w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-[var(--color-on-surface)]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-[var(--color-surface-bright)]">
            <div className="flex justify-between items-center mb-6 font-hanken">
              <span className="text-[var(--color-on-surface-variant)]">Total</span>
              <span className="text-2xl font-bold">Rs. {total}</span>
            </div>
            <button 
              onClick={() => {
                alert("Thank you! Your order has been placed successfully. ☕");
                clearCart();
                onClose();
              }}
              className="w-full bg-[var(--color-primary)] text-[var(--color-on-primary)] py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(242,202,80,0.3)]"
            >
              Proceed to Checkout
            </button>
            <button 
              onClick={clearCart}
              className="w-full mt-4 py-2 text-sm text-[var(--color-on-surface-variant)] hover:text-red-400 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
