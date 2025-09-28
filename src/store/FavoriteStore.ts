import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";
import { Product } from "@definitions/StoreType";

interface FavoriteStore {
  favorite: Product[];
  updateFavorite: (favorite: Product[]) => void;
  toggleFavorite: (item: Product) => void;
  clearFavorite: () => void;
  refreshFavorite: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    immer((set) => ({
      favorite: [],
      updateFavorite: (favorite) =>
        set((state) => {
          state.favorite = favorite;
        }),
      toggleFavorite: (item) =>
        set((state) => {
          const isFavorite = state.favorite.some((p) => p.Code === item.Code);
          if (isFavorite) {
            state.favorite = state.favorite.filter((p) => p.Code !== item.Code);
            toast.error(`${item?.Name} از علاقه مندی ها حذف شد.`);
          } else {
            state.favorite.push(item);
            toast.success(`${item?.Name} به علاقه مندی ها اضافه شد.`);
          }
        }),
      clearFavorite: () =>
        set((state) => {
          state.favorite = [];
        }),
      refreshFavorite: () =>
        set((state) => {
          const updatedCart = localStorage.getItem("KidsShop_favorite");
          if (updatedCart) {
            try {
              state.favorite = JSON.parse(updatedCart).state.favorite || [];
            } catch (error) {
              console.error("Error parsing cart from localStorage:", error);
              state.favorite = [];
            }
          } else {
            state.favorite = [];
          }
        }),
    })),
    {
      name: "KidsShop_favorite",
    }
  )
);
