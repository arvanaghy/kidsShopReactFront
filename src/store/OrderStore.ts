import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Order, OrderState } from "@types/StoreType";

const STORAGE_KEY = "KidsShop_order";

const persistOptions: PersistOptions<OrderState> = {
  name: STORAGE_KEY,
};

export const useOrderStore = create<OrderState>()(
  persist(
    immer((set) => ({
      orders: [],
      updateOrders: (orders: Order[]) =>
        set((state) => {
          state.orders = orders;
        }),
      fetchOrders: () => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        set((state) => {
          state.orders = data;
        });
      },
    })),
    persistOptions
  )
);
