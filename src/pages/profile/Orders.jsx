import { Link, useNavigate } from "react-router-dom";
import ProfileLayout from "@layouts/user/ProfileLayout";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Orders = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    if (
      !user ||
      !user?.UToken ||
      user?.UToken === null ||
      user?.UToken === ""
    ) {
      toast.error("برای مشاهده این صفحه باید وارد شوید");
      navigateTo("/Login");
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row min-h-[90vh]">
      <div className="lg:w-1/6 bg-CarbonicBlue-500  py-10 -mt-10 ">
        <ProfileLayout />
      </div>
      <div className="items-center justify-center mx-auto my-5 space-y-5 text-lg text-center lg:w-4/5 lg:my-auto lg:font-EstedadExtraBold lg:text-2xl font-EstedadLight">
        <Link
          
          to="/unconfirmed-orders"
          className="inline-block py-5 font-bold text-white lg:p-14 px-14 lg:mx-20 rounded-xl drop-shadow-white"
        >
          <span>سفارشات تایید نشده</span>
        </Link>

        <Link
          
          to="/confirmed-orders"
          className="inline-block py-5 font-bold text-white lg:p-14 px-14 lg:mx-20 rounded-xl drop-shadow-white"
        >
          <span>سفارشات تایید شده</span>
        </Link>
      </div>
    </div>
  );
};

export default Orders;
