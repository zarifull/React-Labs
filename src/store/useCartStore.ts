import { create } from 'zustand';
import type { Product } from '../types/product';

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    
    addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
            return {
                cart: state.cart.map(item => 
                    item.id === product.id 
                    ? { ...item, quantity: (item.quantity || 1) + 1 } 
                    : item
                )
            };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
    })),

    clearCart: () => set({ cart: [] }),
}));