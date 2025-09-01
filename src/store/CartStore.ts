import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";
import { CartItem, Product, ProductSizeColor } from "@types/StoreType";

interface CartStore {
  cart: CartItem[];
  updateCart: (cart: CartItem[]) => void;
  addProductToCart: (
    item: Product,
    productCode: string,
    feature: ProductSizeColor | null
  ) => void;
  removeFeatureFromCart: (
    item: { feature: ProductSizeColor },
    productCode: string
  ) => void;
  clearCart: () => void;
  removeProductFromCart: (productCode: string) => void;
  description: string;
  setDescription: (description: string) => void;
  clearDescription: () => void;
  refreshCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set) => ({
      cart: [],
      updateCart: (cart) =>
        set((state) => {
          state.cart = cart;
        }),
      clearCart: () =>
        set((state) => {
          localStorage.removeItem("KidsShop_cart");
          state.cart = [];
        }),
      addProductToCart: (item, productCode, feature) =>
        set((state) => {
          try {
            if (!item || !feature || !feature.SCCode) {
              throw new Error("هیچ سایز و رنگ بندی انتخاب نشده است.");
            }
            const isProductExists = state.cart.find(
              (cartItem: CartItem) =>
                Math.floor(cartItem?.item?.Code!) == Math.floor(productCode)
            );
            if (isProductExists) {
              const isFeatureExists = isProductExists.basket.find(
                (basketItem: CartItem) =>
                  basketItem.feature.SCCode == feature.SCCode
              );
              if (
                isFeatureExists?.quantity >= isFeatureExists?.feature?.Mande
              ) {
                toast.error("سفارش شما بیشتر از موجودی است.");
                return;
              }
              if (isFeatureExists) {
                isFeatureExists.quantity += 1;
              } else {
                isProductExists.basket.push({
                  feature,
                  quantity: 1,
                  SPrice: item?.SPrice || 0,
                });
              }
            } else {
              state.cart.push({
                item,
                basket: [{ feature, quantity: 1, SPrice: item?.SPrice || 0 }],
              });
            }
            toast.success(
              `${item?.Name} , ${feature?.ColorName} , ${feature?.SizeNum} به سبد خرید اضافه شد.`
            );
          } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
          }
        }),
      removeFeatureFromCart: (item, productCode) =>
        set((state) => {
          const isProductExists = state.cart.find(
            (cartItem) =>
              Math.floor(cartItem?.item?.Code!) == Math.floor(productCode)
          );
          if (isProductExists) {
            isProductExists.basket.splice(
              isProductExists.basket.findIndex(
                (basketItem) => basketItem.feature.SCCode == item.feature.SCCode
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
      removeProductFromCart: (productCode) =>
        set((state) => {
          const newCart = state.cart.filter(
            (item) => item.item.Code !== productCode
          );
          state.cart = newCart;
        }),
      description: "",
      setDescription: (description) =>
        set((state) => {
          state.description = description;
        }),
      clearDescription: () =>
        set((state) => {
          state.description = "";
        }),
      refreshCart: () =>
        set((state) => {
          const updatedCart = localStorage.getItem("KidsShop_cart");
          if (updatedCart) {
            try {
              state.cart = JSON.parse(updatedCart).state.cart || [];
            } catch (error) {
              console.error("Error parsing cart from localStorage:", error);
              state.cart = [];
            }
          } else {
            state.cart = [];
          }
        }),
    })),
    {
      name: "KidsShop_cart",
    }
  )
);
