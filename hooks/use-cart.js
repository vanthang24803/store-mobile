import { create } from "zustand";

const useCart = create((set, get) => ({
  items: [],

  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  totalPrice: () => {
    return get().items.reduce(
      (total, item) =>
        total +
        (item.product.options[0].price -
          (item.product.options[0].price * item.product.options[0].sale) /
            100) *
          item.quantity,
      0
    );
  },

  addItems: (data, quantity = 1) => {
    const currentItems = get().items;
    const existingItemIndex = currentItems.findIndex(
      (item) =>
        item.product.id === data.id &&
        item.product.options[0].id === data.options[0].id
    );
    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += quantity;
      set({ items: updatedItems });
    } else {
      set({ items: [...get().items, { product: data, quantity }] });
    }
  },

  removeItem: (id, optionId) => {
    set({
      items: [
        ...get().items.filter(
          (item) =>
            !(item.product.id === id && item.product.options[0].id === optionId)
        ),
      ],
    });
  },

  updateQuantity: (id, optionId, quantity) => {
    const currentItems = get().items;
    const existingItemIndex = currentItems.findIndex(
      (item) =>
        item.product.id === id && item.product.options[0].id === optionId
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity = quantity;
      set({ items: updatedItems });
    }
  },

  removeAll: () => {
    set({
      items: [],
    });
  },
}));

export default useCart;
