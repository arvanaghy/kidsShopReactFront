import { fetchCurrencyUnit } from "@api/generalApi";
import { getErrorMessage } from "@utils/getErrorMessage";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import moment from "moment";

interface currencyUnit {
  value: string;
  last_fetched_at: string;
  status: string;
}

interface GeneralState {
  currencyUnit: currencyUnit;
  setCurrencyUnit: (currencyUnit: currencyUnit) => void;
  clearCurrencyUnit: () => void;
  getCurrencyUnit: (forced: boolean) => void;
}

const STORAGE_KEY = "KidsShop_general";

const persistOptions: any = {
  name: STORAGE_KEY,
  storage: createJSONStorage(() => localStorage),
};

export const useGeneralStore = create<GeneralState>()(
  persist(
    immer((set, get) => ({
      currencyUnit: {
        value: "",
        last_fetched_at: "",
        status: "",
      },
      setCurrencyUnit: (currencyUnit: currencyUnit) =>
        set((state) => {
          state.currencyUnit = currencyUnit;
        }),
      clearCurrencyUnit: () =>
        set((state) => {
          state.currencyUnit = {
            value: "",
            last_fetched_at: "",
            status: "",
          };
        }),
      getCurrencyUnit: async (
        forced = false,
        setIsPending = (pending: boolean) => {}
      ) => {
        setIsPending(true);
        if (get().currencyUnit.last_fetched_at) {
          const diff = moment().diff(
            get().currencyUnit.last_fetched_at,
            "hours"
          );
          if (diff <= 24 && !forced) {
            return;
          }
        }
        try {
          const unit = await fetchCurrencyUnit();
          set((state) => {
            state.currencyUnit = unit;
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
