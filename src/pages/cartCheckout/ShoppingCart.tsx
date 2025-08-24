/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@store/CartStore";
import { useOrderStore } from "@store/OrderStore";
import { OrderService } from "@services/OrderService";
import toast from "react-hot-toast";
import CartItem from "@components/cart/CartItem";
import EmptyList from "@components/EmptyList";
import ClearCart from "@components/cart/ClearCart";
import PaymentDetails from "@components/cart/PaymentDetails";

const apiService = new OrderService();

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user, cart, updateCart } = useCartStore();
  const { updateOrder } = useOrderStore();
  const [transferServices, setTransferServices] = useState<TransferService[]>([]);
  const [selectedTransferService, setSelectedTransferService] = useState<TransferService | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isDefaultUser, setIsDefaultUser] = useState("کاربران پیش فرض");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = await apiService.fetchTransferServices();
        setTransferServices(services);
      } catch (error) {
        // Error handling is done in ApiService
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCustomerGroup = async () => {
      if (user && user.CodeGroup) {
        try {
          const group = await apiService.fetchCustomerGroup(Math.floor(user.CodeGroup));
          setIsDefaultUser(group.Name);
        } catch (error) {
          // Error handling is done in ApiService
        }
      }
    };
    fetchCustomerGroup();
  }, [user]);

  const validateUser = () => {
    const validation = ["", null, undefined, 0, "0", "کاربران پیش فرض اپلیکیشن"];
    if (!user || !user.UToken) {
      toast.error("برای ثبت سفارش حتما باید عضو شوید یا ورود کنید.");
      navigate("/login?redirect=shopping-cart");
      return false;
    }
    if (cart.length === 0) {
      toast.error("سبد خرید خالی است.");
      return false;
    }
    if (
      validation.includes(String(user.Name)) ||
      validation.includes(String(user.Address)) ||
      validation.includes(String(user.Mobile))
    ) {
      toast.error("اطلاعات تماس شما ناقص است لطفا فرم اطلاعات حساب کاربری را تکمیل نمایید");
      navigate("/edit-info?redirect=shopping-cart");
      return false;
    }
    if (!selectedTransferService) {
      toast.error("لطفا یک حامل برای تحویل انتخاب کنید");
      return false;
    }
    return true;
  };

  const submitOrder = async () => {
    if (!validateUser()) return;
    setIsPending(true);
    try {
      const orderData = cart.map((item) => ({
        KCode: item?.item?.Code,
        Basket: item?.basket,
      }));
      const response = await apiService.submitOrder(
        orderData,
        user.UToken,
        // description,
        selectedTransferService
      );
      // setDescription("");
      await onlinePayment(response.result);
      toast.success(response.message);
    } catch (error) {
      // Error handling is done in ApiService
    } finally {
      setIsPending(false);
    }
  };

  const cashPayment = async () => {
    if (!validateUser()) return;
    setIsPending(true);
    try {
      const orderData = cart.map((item) => ({
        KCode: item?.item?.Code,
        Basket: item?.basket,
      }));
      const response = await apiService.submitOrder(
        orderData,
        user.UToken,
        description,
        selectedTransferService
      );
      updateCart([]);
      ([]);
      const { updateOrder } = useCartStore();
      toast.success("پیش فاکتور شما در سیستم ثبت شد.");
      navigate("/unconfirmed-orders");
    } catch (error) {
      // Error handling is done in ApiService
    } finally {
      setIsPending(false);
    }
  };

  const onlinePayment = async (order: any) => {
    try {
      await apiService.checkOnlinePaymentAvailability();
      updateCart([]);
      ([]);
      const { updateOrder } = useCartStore();
      window.location.href = `${process.env.REACT_APP_API_URL}/v1/checkout-with-order?BearerToken=${user?.UToken}&orderCode=${order?.Code}`;
      toast.success("پیش فاکتور شما در سیستم ثبت شد.");
    } catch (error) {
      // Error handling is done in ApiService
    }
  };



  if (cart.length === 0) return <EmptyList title="سبد خرید شما خالی است" />;

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
      <PaymentDetails
        transferServices={transferServices}
        selectedTransferService={selectedTransferService}
        setSelectedTransferService={setSelectedTransferService}
        isPending={isPending}
        onSubmitOrder={submitOrder}
        onCashPayment={cashPayment}
        isDefaultUser={isDefaultUser}
      />
    </div>
  );
};

export default ShoppingCart;