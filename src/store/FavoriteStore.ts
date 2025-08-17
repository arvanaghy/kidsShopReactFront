import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";
import { Product } from "@types/StoreType";

interface FavoriteStore {
  favorite: Product[];
  updateFavorite: (favorite: Product[]) => void;
  fetchFavorite: () => void;
  toggleFavorite: (item: Product) => void;
  clearFavoriteList: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    immer((set) => ({
      favorite: [],
      updateFavorite: (favorite) =>
        set((state) => {
          state.favorite = favorite;
        }),
      fetchFavorite: () => {
        const data = JSON.parse(
          localStorage.getItem("KidsShop_favorite") || "[]"
        );
        set((state) => {
          state.favorite = data;
        });
      },
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
      clearFavoriteList: () =>
        set((state) => {
          state.favorite = [];
        }),
    })),
    {
      name: "KidsShop_favorite",
    }
  )
);
