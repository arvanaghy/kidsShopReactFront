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
      order: {},
      updateOrder: (order) =>
        set((state) => {
          state.order = order;
        }),
      clearOrder: () =>
        set((state) => {
          state.orders = [];
        }),
    })),
    persistOptions
  )
);
