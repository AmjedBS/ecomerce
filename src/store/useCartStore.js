import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  addToCart: (product) => {
    const existingItem = get().items.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      set({
        items: get().items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(10, item.quantity + 1),
              }
            : item
        ),
      });
      return;
    }

    set({
      items: [...get().items, { ...product, quantity: 1 }],
    });
  },

  removeFromCart: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },

  decreaseQuantity: (product) => {
    set({
      items: get().items.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      ),
    });
  },

  increaseQuantity: (product) => {
    set({
      items: get().items.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: Math.min(10, item.quantity + 1),
            }
          : item
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },
}));