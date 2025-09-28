import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";
import { Product } from "@definitions/StoreType";

interface CompareStore {
  compareList: Product[];
  updateCompare: (compareList: Product[]) => void;
  toggleCompare: (item: Product) => void;
  clearCompare: () => void;
  refreshCompare: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    immer((set) => ({
      compareList: [],
      updateCompare: (compareList) =>
        set((state) => {
          if (compareList.length > 4) {
            compareList.shift();
            toast.error("حداکثر 4 محصول را میتوانید مقایسه کنید.");
          }
          state.compareList = compareList;
        }),
      toggleCompare: (item) =>
        set((state) => {
          const isCompared = state.compareList.some(
            (p) => p.Code === item.Code
          );
          if (isCompared) {
            state.compareList = state.compareList.filter(
              (p) => p.Code !== item.Code
            );
            toast.success(`${item?.Name}  از مقایسه ها حذف شد.`);
          } else {
            if (state.compareList.length >= 4) {
              state.compareList.shift();
              toast.error("حداکثر 4 محصول را میتوانید مقایسه کنید.");
            }
            state.compareList.push(item);
            toast.success(`${item?.Name}  به مقایسه ها اضافه شد.`);
          }
        }),
      clearCompare: () =>
        set((state) => {
          state.compareList = [];
        }),
      refreshCompare: () =>
        set((state) => {
          const updatedCart = localStorage.getItem("KidsShop_compare");
          if (updatedCart) {
            try {
              state.compareList =
                JSON.parse(updatedCart).state.compareList || [];
            } catch (error) {
              console.error("Error parsing cart from localStorage:", error);
              state.compareList = [];
            }
          } else {
            state.compareList = [];
          }
        }),
    })),
    {
      name: "KidsShop_compare",
    }
  )
);

export default useCompareStore;
