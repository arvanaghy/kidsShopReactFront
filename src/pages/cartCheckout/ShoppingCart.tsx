import { useCartStore } from "@store/CartStore";
import CartItem from "@components/cart/CartItem";
import EmptyList from "@components/EmptyList";
import ClearCart from "@components/cart/ClearCart";
import PaymentDetails from "@components/cart/PaymentDetails";

const ShoppingCart = () => {
  const { cart } = useCartStore();
  if (cart?.length === 0) return <EmptyList title="سبد خرید شما خالی است" />;

  return (
    <div className="grid grid-cols-12 w-full p-3 gap-2 font-EstedadMedium">
      <div className="col-span-12 lg:col-span-9 border rounded-xl relative w-full bg-white/50">
        <ClearCart />
        <h1 className="w-full font-EstedadExtraBold lg:text-start text-center lg:indent-6 text-base lg:text-2xl text-CarbonicBlue-500 py-5">
          سبد خرید شما
        </h1>
        <hr className="mx-auto w-full" />
        <div className="flex flex-col gap-2 w-full">
          {cart?.map((item: any, idx: number) => (
            <CartItem key={idx} item={item} />
          ))}
        </div>

      </div>
      <PaymentDetails />
    </div>
  );
};

export default ShoppingCart;