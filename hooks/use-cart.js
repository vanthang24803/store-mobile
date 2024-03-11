import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCart = create((set, get) => ({
  items: [],

  loadCart: async () => {
    try {
      const storedCart = await AsyncStorage.getItem('@cart');
      if (storedCart) {
        set({ items: JSON.parse(storedCart) });
      }
    } catch (error) {
      console.error('Error loading cart from AsyncStorage:', error);
    }
  },

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

  addItems: async (data, quantity = 1) => {
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
    await AsyncStorage.setItem('@cart', JSON.stringify(get().items));
  },

  removeItem: async (id, optionId) => {
    set({
      items: [
        ...get().items.filter(
          (item) =>
            !(item.product.id === id && item.product.options[0].id === optionId)
        ),
      ],
    });
    await AsyncStorage.setItem('@cart', JSON.stringify(get().items));
  },

  updateQuantity: async (id, optionId, quantity) => {
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
    await AsyncStorage.setItem('@cart', JSON.stringify(get().items));
  },

  removeAll: async () => {
    set({
      items: [],
    });
    await AsyncStorage.removeItem('@cart');
  },
}));

export default useCart;
