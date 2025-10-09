import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";
import { toast } from "react-hot-toast";

interface UserStore {
  user: {
    Code: number | string;
    Name: string;
    UToken: string;
    Address: string;
    Mobile: string | number;
  };
  updateUser: (user: {
    Code: number | string;
    Name: string;
    UToken: string;
    Address: string;
    Mobile: string | number;
  }) => void;
  verifyUserToken: (
    redirect?: string,
    navigate?: (path: string | undefined) => void
  ) => Promise<void>;
  clearUser: () => void;
  refreshUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    immer((set) => ({
      user: { Code: "", Name: "", UToken: "", Address: "", Mobile: "" },
      updateUser: (user: {
        Code: number | string;
        Name: string;
        UToken: string;
        Address: string;
        Mobile: string | number;
      }) =>
        set((state) => {
          state.user = user;
        }),
      verifyUserToken: async (
        redirect?: string,
        navigate?: (path: string | undefined) => void
      ) => {
        try {
          const user = get().user;
          if (!user || !user?.UToken) {
            set((state) => {
              state.user = {
                Code: "",
                Name: "",
                UToken: "",
                Address: "",
                Mobile: "",
              };
            });
            throw new Error("کاربر ذخیره شده وجود ندارد");
          }
          const { data, status } = await axios.post(
            `${import.meta.env.VITE_API_URL}/v2/verify-token`,
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
              navigate(redirect || "/profile");
            }
          } else {
            set((state) => {
              state.user = {
                Code: "",
                Name: "",
                UToken: "",
                Address: "",
                Mobile: "",
              };
            });
            toast.error(data?.message);
            if (navigate) {
              navigate("/login");
            }
          }
        } catch (error) {
          set((state) => {
            state.user = {
              Code: "",
              Name: "",
              UToken: "",
              Address: "",
              Mobile: "",
            };
          });
          toast.error(
            "اعتبارسنجی " +
              (error?.response?.data?.message || error?.message) ||
              "خطا در اتصال"
          );
          if (navigate) {
            navigate("/login");
          }
        }
      },
      clearUser: () =>
        set(() => ({ user: { Code: "", Name: "", UToken: "", Address: ""  , Mobile: ""} })),
      refreshUser: () =>
        set((state) => {
          const updatedUser = localStorage.getItem("KidsShop_user");
          if (updatedUser) {
            try {
              state.user = JSON.parse(updatedUser).state.user || {
                Code: "",
                Name: "",
                UToken: "",
                Address: "",
              };
            } catch (error) {
              console.error("Error parsing user from localStorage:", error);
              state.user = {
                Code: "",
                Name: "",
                UToken: "",
                Address: "",
                Mobile: "",
              };
            }
          } else {
            state.user = {
              Code: "",
              Name: "",
              UToken: "",
              Address: "",
              Mobile: "",
            };
          }
        }),
    })),
    {
      name: "KidsShop_user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
