import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";

const store = (set) => ({
  user: [],
  cart: [],
  order: [],
  favorite: [],
  compareList: [],
  desktopNavbar: false,

  // --- User ---
  updateUser: (user) =>
    set((state) => {
      state.user = user;
    }),

  fetchUser: () => {
    const data = JSON.parse(localStorage.getItem("KidsShop_user") || "[]");
    set((state) => {
      state.user = data;
    });
  },

  // --- Cart ---
  updateCart: (cart) =>
    set((state) => {
      state.cart = cart;
    }),

  fetchCart: () => {
    const data = JSON.parse(localStorage.getItem("KidsShop_cart") || "[]");
    set((state) => {
      state.cart = data;
    });
  },

  // --- Order ---
  updateOrder: (order) =>
    set((state) => {
      state.order = order;
    }),

  fetchOrder: () => {
    const data = JSON.parse(localStorage.getItem("KidsShop_order") || "[]");
    set((state) => {
      state.order = data;
    });
  },

  // --- Favorite ---
  updateFavorite: (favorite) =>
    set((state) => {
      state.favorite = favorite;
    }),

  fetchFavorite: () => {
    const data = JSON.parse(localStorage.getItem("KidsShop_favorite") || "[]");
    set((state) => {
      state.favorite = data;
    });
  },

  // --- Compare List ---
  updateCompareList: (compareList) =>
    set((state) => {
      if (compareList.length > 4) {
        compareList.shift();
        toast.error("حداکثر 4 محصول را میتوانید مقایسه کنید.");
      }
      state.compareList = compareList;
    }),

  fetchCompareList: () => {
    const data = JSON.parse(
      localStorage.getItem("KidsShop_compareList") || "[]"
    );
    set((state) => {
      state.compareList = data;
    });
  },

  // --- Navbar ---
  updateDesktopNavbar: (value) =>
    set((state) => {
      state.desktopNavbar = value;
    }),
});


export const useMainStore = create(
  persist(immer(store), {
    name: "KidsShop_store",
  })
);

export default useMainStore;