import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";
import { CartItem, Product, ProductSizeColor } from "@types/StoreType";

interface CartStore {
  cart: CartItem[];
  updateCart: (cart: CartItem[]) => void;
  fetchCart: () => void;
  addProductToCart: (item: Product, productCode: string, feature: ProductSizeColor | null) => void;
  removeFeatureFromCart: (item: { feature: ProductSizeColor }, productCode: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set) => ({
      cart: [],
      updateCart: (cart) => set((state) => { state.cart = cart; }),
      fetchCart: () => {
        const data = JSON.parse(localStorage.getItem("KidsShop_cart") || "[]");
        set((state) => { state.cart = data; });
      },
      addProductToCart: (item, productCode, feature) =>
        set((state) => {
          if (!item || !feature || !feature.SCCode) {
            toast.error("هیچ سایز و رنگ بندی انتخاب نشده است.");
            return;
          }
          const isProductExists = state.cart.find(
            (cartItem) => Math.floor(cartItem?.item?.Code!) == Math.floor(productCode)
          );
          if (isProductExists) {
            const isFeatureExists = isProductExists.basket.find(
              (basketItem) => basketItem.feature.SCCode == feature.SCCode
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
              });
            }
          } else {
            state.cart.push({
              item,
              basket: [{ feature, quantity: 1 }],
            });
          }
          toast.success("محصول به سبد خرید اضافه شد.");
        }),
      removeFeatureFromCart: (item, productCode) =>
        set((state) => {
          const isProductExists = state.cart.find(
            (cartItem) => Math.floor(cartItem?.item?.Code!) == Math.floor(productCode)
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
                  (cartItem) => Math.floor(cartItem?.item?.Code!) == Math.floor(productCode)
                ),
                1
              );
            }
          }
        }),
    })),
    {
      name: "KidsShop_cart",
    }
  )
);