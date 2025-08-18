import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UserStore {
  user: { Name: string; UToken: string };
  updateUser: (user: { Name: string; UToken: string }) => void;
  verifyUserToken: (
    redirect?: string,
    navigate?: (path: string) => void
  ) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    immer((set, get) => ({
      user: { Name: "", UToken: "" },
      updateUser: (user: { Name: string; UToken: string }) =>
        set((state) => {
          state.user = user;
        }),
      verifyUserToken: async (
        navigate?: (path: string) => void
      ) => {
        const user = get().user;
        if (!user || !user?.UToken) {
          set((state) => {
            state.user = { Name: "", UToken: "" };
          });
          return;
        }

        try {
          const { data, status } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/verify-token`,
            {
              UToken: user.UToken,
            }
          );

          if (status === 202) {
            toast.success(data?.message);
            set((state) => {
              state.user = data?.result;
            });
            if (navigate) {
              navigate(`/profile`);
            }
          } else {
            set((state) => {
              state.user = { Name: "", UToken: "" };
            });
          }
        } catch (error) {
          set((state) => {
            state.user = { Name: "", UToken: "" };
          });
          toast.error(
            "اعتبارسنجی " +
              (error?.response?.data?.message || error?.message) ||
              "خطا در اتصال"
          );
        }
      },
    })),
    {
      name: "KidsShop_user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
