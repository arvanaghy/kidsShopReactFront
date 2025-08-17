import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";
import { Product } from "@types/StoreType";

interface CompareStore {
  compareList: Product[];
  updateCompareList: (compareList: Product[]) => void;
  fetchCompareList: () => void;
  toggleCompare: (item: Product) => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    immer((set) => ({
      compareList: [],
      updateCompareList: (compareList) =>
        set((state) => {
          if (compareList.length > 4) {
            compareList.shift();
            toast.error("حداکثر 4 محصول را میتوانید مقایسه کنید.");
          }
          state.compareList = compareList;
        }),
      fetchCompareList: () => {
        const data = JSON.parse(localStorage.getItem("KidsShop_compareList") || "[]");
        set((state) => { state.compareList = data; });
      },
      toggleCompare: (item) =>
        set((state) => {
          const isCompared = state.compareList.some((p) => p.Code === item.Code);
          if (isCompared) {
            state.compareList = state.compareList.filter((p) => p.Code !== item.Code);
            toast.error("محصول مورد نظر از مقایسه ها حذف شد.");
          } else {
            if (state.compareList.length >= 4) {
              state.compareList.shift();
              toast.error("حداکثر 4 محصول را میتوانید مقایسه کنید.");
            }
            state.compareList.push(item);
            toast.success("محصول مورد نظر به مقایسه ها اضافه شد.");
          }
        }),
    })),
    {
      name: "KidsShop_compareList",
    }
  )
);