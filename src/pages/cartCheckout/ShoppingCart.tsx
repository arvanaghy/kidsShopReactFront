/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faSquareCheck,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { confirmToast } from "@utils/confirmToast";
import { useMainStore } from "@store/useMainStore";
import { OrderService } from "@services/OrderService";
import toast from "react-hot-toast";
import CartItem from "@components/cart/CartItem";
import EmptyList from "../../components/EmptyList";
import ClearCart from "../../components/cart/ClearCart";
import Unit from "@components/Unit";

interface TransferService {
  Code: string;
  Name: string;
  Mablag: number;
  CodeKhadamat?: number;
}

const apiService = new OrderService();


const PaymentDetails = ({
  cart,
  description,
  setDescription,
  transferServices,
  selectedTransferService,
  setSelectedTransferService,
  isPending,
  onSubmitOrder,
  onCashPayment,
  isDefaultUser,
}: {
  cart: any[];
  description: string;
  setDescription: (value: string) => void;
  transferServices: TransferService[];
  selectedTransferService: TransferService | null;
  setSelectedTransferService: (service: TransferService | null) => void;
  isPending: boolean;
  onSubmitOrder: () => void;
  onCashPayment: () => void;
  isDefaultUser: string;
}) => (
  <div className="col-span-12 flex flex-col lg:col-span-3 text-center lg:sticky lg:top-[20vh] h-fit w-full space-y-5 border border-CarbonicBlue-500/20 p-4 rounded-xl bg-stone-100 shadow-xl justify-around">
    <div className="text-start">
      <div className="flex flex-row justify-between px-1 items-center border-b">
        <p className="text-sm text-start text-CarbonicBlue-500 pb-2">مشخصات پرداخت</p>
        <p className="text-sm">{formatCurrencyDisplay(cart?.length)} کالا</p>
      </div>
      <ul className="list-disc list-inside text-xs py-2">
        {cart?.length === 0 ? (
          <p className="text-center">سبد خرید شما خالی است.</p>
        ) : (
          <div className="w-full text-gray-600 indent-1 py-2 marker:text-Amber-500 max-h-52 overflow-y-auto">
            {cart?.map((item, idx) => (
              <div
                key={idx}
                className="space-y-1 border-b py-2 flex flex-row justify-between items-center"
              >
                <li className="text-xs font-EstedadMedium">{item?.item?.Name}</li>
                <button onClick={() => removeProductFromCart(item)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 hover:text-red-700 transition-all duration-300 ease-in-out mx-1"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </ul>
    </div>
    <div className="space-y-2">
      <p>توضیحات پیش فاکتور</p>
      <textarea
        className="w-full p-2 border-2 rounded-lg border-CarbonicBlue-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
    <select
      className="ring-CarbonicBlue-500"
      onChange={(e) =>
        setSelectedTransferService(
          transferServices.find((s) => s.Code === e.target.value) || null
        )
      }
    >
      <option value="" className="rounded-md">
        انتخاب نحوه ارسال
      </option>
      {transferServices.map((service, idx) => (
        <option key={idx} value={service.Code}>
          {service.Name} - {formatCurrencyDisplay(service.Mablag)} <Unit />
        </option>
      ))}
    </select>
    <p className="text-center text-base lg:text-end">
      <span className="px-2 text-sm">جمع کل فاکتور :</span>
      <span className="text-xs font-bold text-green-800">
        {cart?.length > 0 &&
          formatCurrencyDisplay(
            cart.reduce(
              (total: number, item: any) =>
                total +
                item.basket.reduce(
                  (subtotal: number, basketItem: any) =>
                    subtotal + (basketItem?.SPrice * basketItem?.quantity || 0),
                  0
                ),
              0
            ) + (selectedTransferService?.Mablag || 0)
          )}
      </span>
      <Unit />
    </p>
    {isPending ? (
      <div className="flex items-center justify-center font-EstedadMedium">
        <button
          type="button"
          className="inline-flex items-center text-white bg-CarbonicBlue-500/80 rounded-lg active:bg-darkgold text-zarblack py-4 px-6 w-full text-center justify-center disabled:bg-darkgold/30 transition ease-in-out duration-150 cursor-not-allowed"
          disabled={true}
        >
          <span>درحال پردازش</span>
          <FontAwesomeIcon icon={faSpinner} spin />
        </button>
      </div>
    ) : (
      <>
        <button
          className="px-6 py-4 text-white duration-150 border rounded-md bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 hover:text-stone-200 hover:scale-105"
          onClick={onSubmitOrder}
        >
          پرداخت آنلاین
        </button>
        {isDefaultUser !== "کاربران پیش فرض" && (
          <button
            className="px-6 py-4 text-white duration-150 border rounded-md bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 hover:text-stone-200 hover:scale-105"
            onClick={onCashPayment}
          >
            پرداخت حین تحویل
          </button>
        )}
      </>
    )}
  </div>
);

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user, cart, updateCart, updateOrder } = useMainStore();
  const [description, setDescription] = useState("");
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
        description,
        selectedTransferService
      );
      setDescription("");
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
      updateOrder([]);
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
      updateOrder([]);
      window.location.href = `https://api.kidsshop110.ir/api/v1/checkout-with-order?BearerToken=${user?.UToken}&orderCode=${order?.Code}`;
      toast.success("پیش فاکتور شما در سیستم ثبت شد.");
    } catch (error) {
      // Error handling is done in ApiService
    }
  };

  const removeProductFromCart = async (item: any) => {
    const isConfirmed = await confirmToast("آیا از حذف این آیتم مطمئن هستید؟");
    if (!isConfirmed) return;
    const newCart = [...cart];
    newCart.splice(
      newCart.findIndex(
        (cartItem: any) => Math.floor(cartItem?.item?.Code) === Math.floor(item?.item?.Code)
      ),
      1
    );
    updateCart(newCart);
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
            <CartItem key={idx} item={item} onRemove={removeProductFromCart} />
          ))}
        </div>

      </div>
      <PaymentDetails
        cart={cart}
        description={description}
        setDescription={setDescription}
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