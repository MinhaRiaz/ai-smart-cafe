import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  iconName?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

interface AppState {
  menuItems: MenuItem[];
  cart: CartItem[];
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updatedItem: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const initialMenu: MenuItem[] = [
  { id: '1', name: "Midnight Espresso", price: "Rs. 450", category: "Coffee", image: "/images/midnight_espresso.png" },
  { id: '2', name: "Caramel Cloud Latte", price: "Rs. 600", category: "Coffee", image: "/images/caramel_latte.png" },
  { id: '3', name: "Matcha Zen", price: "Rs. 750", category: "Tea", image: "/images/matcha_zen.png" },
  { id: '4', name: "Chocolate Lava Cake", price: "Rs. 850", category: "Desserts", image: "/images/lava_cake.png" },
  { id: '5', name: "Avocado Toast", price: "Rs. 650", category: "Snacks", image: "/images/avocado_toast.png" },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      menuItems: initialMenu,
      cart: [],
      
      setMenuItems: (items) => set({ menuItems: items }),
      
      addMenuItem: (item) => set((state) => ({
        menuItems: [...state.menuItems, { ...item, id: Math.random().toString(36).substr(2, 9) }]
      })),
      
      updateMenuItem: (id, updatedItem) => set((state) => ({
        menuItems: state.menuItems.map(item => item.id === id ? { ...item, ...updatedItem } : item)
      })),
      
      deleteMenuItem: (id) => set((state) => ({
        menuItems: state.menuItems.filter(item => item.id !== id)
      })),

      addToCart: (item) => set((state) => {
        const existing = state.cart.find(c => c.id === item.id);
        if (existing) {
          return { cart: state.cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c) };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(c => c.id !== id)
      })),

      updateCartQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(c => c.id === id ? { ...c, quantity } : c)
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'ai-smart-cafe-storage',
    }
  )
);
