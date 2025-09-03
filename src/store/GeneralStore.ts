import { fetchUnit } from "@api/generalApi";
import { getErrorMessage } from "@utils/getErrorMessage";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import moment from "moment";

interface unit {
  value: string;
  last_fetched_at: string;
  status: string;
}

interface GeneralState {
  unit: unit;
  setUnit: (unit: unit) => void;
  clearUnit: () => void;
  getUnit: (forced: boolean) => void;
}

const STORAGE_KEY = "KidsShop_general";

const persistOptions: any = {
  name: STORAGE_KEY,
  storage: createJSONStorage(() => localStorage),
};

export const useGeneralStore = create<GeneralState>()(
  persist(
    immer((set, get) => ({
      unit: {
        value: "",
        last_fetched_at: "",
        status: "",
      },
      setUnit: (unit: unit) =>
        set((state) => {
          state.unit = unit;
        }),
      clearUnit: () =>
        set((state) => {
          state.unit = {
            value: "",
            last_fetched_at: "",
            status: "",
          };
        }),
      getUnit: async (
        forced = false,
        setIsPending = (pending: boolean) => {}
      ) => {
        setIsPending(true);
        if (get().unit.last_fetched_at) {
          const diff = moment().diff(get().unit.last_fetched_at, "hours");
          if (diff <= 24 && !forced) {
            return;
          }
        }
        try {
          const unit = await fetchUnit();
          set((state) => {
            state.unit = unit;
          });
        } catch (error) {
          toast.error(getErrorMessage(error));
        } finally {
          setIsPending(false);
        }
      },
    })),
    persistOptions
  )
);
