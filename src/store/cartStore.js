import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product) => {
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      return {
        cart: existingProduct
          ? state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.cantidad + 1 }
                : item
            )
          : [...state.cart, { ...product, cantidad: 1 }],
      };
    });
  },
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
