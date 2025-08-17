import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UIStore {
  desktopNavbar: boolean;
  updateDesktopNavbar: (value: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  immer((set) => ({
    desktopNavbar: false,
    updateDesktopNavbar: (value) => set((state) => { state.desktopNavbar = value; }),
  }))
);