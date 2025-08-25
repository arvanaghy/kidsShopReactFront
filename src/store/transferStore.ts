import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface TransferService {
  Code: string;
  Name: string;
  Mablag: number;
  CodeKhadamat?: number;
}

interface TransferState {
  transfer: TransferService;
  setTransfer: (transfer: TransferService) => void;
  clearTransfer: () => void;
}

const STORAGE_KEY = "KidsShop_transfer";

const persistOptions: any = {
  name: STORAGE_KEY,
  storage: createJSONStorage(() => localStorage),
};

export const useTransferStore = create<TransferState>()(
  persist(
    immer((set) => ({
      transfer: {
        Code: "",
        Name: "",
        Mablag: 0,
        CodeKhadamat: 0,
      },
      setTransfer: (transfer: TransferService) =>
        set((state) => {
          state.transfer = transfer;
        }),
      clearTransfer: () =>
        set((state) => {
          state.transfer = {
            Code: "",
            Name: "",
            Mablag: 0,
            CodeKhadamat: 0,
          };
        }),
    })),
    persistOptions
  )
);
