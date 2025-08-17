import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { User } from "@types/StoreType";

interface UserStore {
  user: User[];
  updateUser: (user: User[]) => void;
  fetchUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    immer((set) => ({
      user: [],
      updateUser: (user) => set((state) => { state.user = user; }),
      fetchUser: () => {
        const data = JSON.parse(localStorage.getItem("KidsShop_user") || "[]");
        set((state) => { state.user = data; });
      },
    })),
    {
      name: "KidsShop_user",
    }
  )
);