import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";
import { CartItem, Product, ProductSizeColor, User, Order } from "@types/StoreType";

interface MainStore {
  user: User[];
  cart: CartItem[];
  order: Order[];
  favorite: Product[];
  compareList: Product[];
  desktopNavbar: boolean;
  updateUser: (user: User[]) => void;
  fetchUser: () => void;
  updateCart: (cart: CartItem[]) => void;
  fetchCart: () => void;
  updateOrder: (order: Order[]) => void;
  fetchOrder: () => void;
  updateFavorite: (favorite: Product[]) => void;
  fetchFavorite: () => void;
  updateCompare: (compareList: Product[]) => void;
  fetchCompare: () => void;
  updateDesktopNavbar: (value: boolean) => void;
  addProductToCart: (
    item: Product,
    productCode: string,
    feature: ProductSizeColor | null
  ) => void;
  removeFeatureFromCart: (
    item: { feature: ProductSizeColor },
    productCode: string
  ) => void;
  toggleFavorite: (item: Product) => void;
  toggleCompare: (item: Product) => void;
}

export const useMainStore = create<MainStore>()(
  persist(
    immer((set) => ({
      user: [],
      cart: [],
      order: [],
      favorite: [],
      compareList: [],
      desktopNavbar: false,

      // --- User ---
      updateUser: (user) =>
        set((state) => {
          state.user = user;
        }),
      fetchUser: () => {
        const data = JSON.parse(localStorage.getItem("KidsShop_user") || "[]");
        set((state) => {
          state.user = data;
        });
      },

      // --- Cart ---
      updateCart: (cart) =>
        set((state) => {
          state.cart = cart;
        }),
      fetchCart: () => {
        const data = JSON.parse(localStorage.getItem("KidsShop_cart") || "[]");
        set((state) => {
          state.cart = data;
        });
      },

      // --- Order ---
      updateOrder: (order) =>
        set((state) => {
          state.order = order;
        }),
      fetchOrder: () => {
        const data = JSON.parse(localStorage.getItem("KidsShop_order") || "[]");
        set((state) => {
          state.order = data;
        });
      },

      // --- Favorite ---
      updateFavorite: (favorite) =>
        set((state) => {
          state.favorite = favorite;
        }),
      fetchFavorite: () => {
        const data = JSON.parse(
          localStorage.getItem("KidsShop_favorite") || "[]"
        );
        set((state) => {
          state.favorite = data;
        });
      },

      // --- Compare List ---
      updateCompare: (compareList) =>
        set((state) => {
          if (compareList.length > 4) {
            compareList.shift();
            toast.error("حداکثر 4 محصول را میتوانید مقایسه کنید.");
          }
          state.compareList = compareList;
        }),
      fetchCompare: () => {
        const data = JSON.parse(
          localStorage.getItem("KidsShop_compareList") || "[]"
        );
        set((state) => {
          state.compareList = data;
        });
      },

      // --- Navbar ---
      updateDesktopNavbar: (value) =>
        set((state) => {
          state.desktopNavbar = value;
        }),

      // --- Cart Operations ---
      addProductToCart: (item, productCode, feature) =>
        set((state) => {
          if (!item || !feature || !feature.SCCode) {
            toast.error("هیچ سایز و رنگ بندی انتخاب نشده است.");
            return;
          }
          const isProductExists = state.cart.find(
            (cartItem: CartItem) =>
              Math.floor(cartItem?.item?.Code!) == Math.floor(productCode)
          );
          if (isProductExists) {
            const isFeatureExists = isProductExists.basket.find(
              (basketItem : CartItem) => basketItem.feature.SCCode == feature.SCCode
            );
            if (isFeatureExists?.quantity >= isFeatureExists?.feature?.Mande) {
              toast.error("سفارش شما بیشتر از موجودی است.");
              return;
            }
            if (isFeatureExists) {
              isFeatureExists.quantity += 1;
            } else {
              isProductExists.basket.push({
                feature,
                quantity: 1,
                SPrice : item?.SPrice || 0
              });
            }
          } else {
            state.cart.push({
              item,
              basket: [{ feature, quantity: 1 , SPrice : item?.SPrice || 0}],
            });
          }
          toast.success("محصول به سبد خرید اضافه شد.");
        }),

      removeFeatureFromCart: (item, productCode) =>
        set((state) => {
          const isProductExists = state.cart.find(
            (cartItem : CartItem) =>
              Math.floor(cartItem?.item?.Code!) == Math.floor(productCode)
          );
          if (isProductExists) {
            isProductExists.basket.splice(
              isProductExists.basket.findIndex(
                (basketItem : CartItem) => basketItem.feature.SCCode == item.feature.SCCode
              ),
              1
            );
            if (isProductExists.basket.length === 0) {
              state.cart.splice(
                state.cart.findIndex(
                  (cartItem) =>
                    Math.floor(cartItem?.item?.Code!) == Math.floor(productCode)
                ),
                1
              );
            }
          }
        }),

      // --- Favorite Operations ---
      toggleFavorite: (item) =>
        set((state) => {
          const isFavorite = state.favorite.some((p) => p.Code === item.Code);
          if (isFavorite) {
            state.favorite = state.favorite.filter((p) => p.Code !== item.Code);
            toast.error("محصول مورد نظر از علاقه مندی ها حذف شد.");
          } else {
            state.favorite.push(item);
            toast.success("محصول مورد نظر به علاقه مندی ها اضافه شد.");
          }
        }),

      // --- Compare Operations ---
      toggleCompare: (item) =>
        set((state) => {
          const isCompared = state.compareList.some(
            (p) => p.Code === item.Code
          );
          if (isCompared) {
            state.compareList = state.compareList.filter(
              (p) => p.Code !== item.Code
            );
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
      name: "KidsShop_store",
    }
  )
);

export default useMainStore;
