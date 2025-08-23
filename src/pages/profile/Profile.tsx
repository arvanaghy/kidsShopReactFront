import { useEffect, useState } from "react";
import ProfileLayout from "@layouts/user/ProfileLayout";
import { useUserStore } from "@store/UserStore";
import toast from "react-hot-toast";
import axios from "axios";
import { LuShieldCheck, LuShieldClose } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import Loading from "@components/Loading";

const Profile = () => {
  const navigateTo = useNavigate();

  const [confirmedOrderList, setConfirmedOrderList] = useState(0);
  const [unConfirmedOrderList, setUnConfirmedOrderList] = useState(0);

  const { user } = useUserStore();


  const fetchConfirmedOrders = async (confirmedOrderUrl) => {
    try {
      const { data, status } = await axios.get(confirmedOrderUrl, {
        headers: {
          Authorization: `Bearer ${user?.UToken}`,
          "Cache-Control": "no-cache",
        },
      });
      if (status != 201) throw new Error(data?.message);

      setConfirmedOrderList(data?.result?.total);
    } catch (error) {
      toast.error(
        "1 سفارشات " + (error?.response?.data?.message || error?.message) ||
          "خطا در اتصال"
      );
    }
  };
  const fetchUnConfirmedOrders = async (unConfirmedOrderUrl) => {
    try {
      const { data, status } = await axios.get(unConfirmedOrderUrl, {
        headers: {
          Authorization: `Bearer ${user?.UToken}`,
          "Cache-Control": "no-cache",
        },
      });
      if (status != 201) throw new Error(data?.message);
      setUnConfirmedOrderList(data?.result?.total);
    } catch (error) {
      toast.error(
        "2 سفارشات  " + (error?.response?.data?.message || error?.message) ||
          "خطا در اتصال"
      );
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchConfirmedOrders(
      "https://api.kidsshop110.ir/api/v1/list-past-orders?page=1"
    );
    fetchUnConfirmedOrders(
      "https://api.kidsshop110.ir/api/v1/list-unverified-orders?page=1"
    );
  }, [user]);

  if (!user) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
        <div className="border rounded-2xl shadow-lg bg-white py-4 flex flex-col justify-around">
          <div className="text-2xl w-full py-6">سفارشات شما</div>
          <ul className="flex flex-row justify-around items-center ">
            <Link
              to="/unconfirmed-orders"
              className="flex flex-col gap-2 lg:text-5xl text-red-600"
            >
              <LuShieldClose />
              <p className="text-lg ">
                {formatCurrencyDisplay(unConfirmedOrderList)}
              </p>
            </Link>
            <Link
              to="/confirmed-orders"
              className="flex flex-col gap-2 lg:text-5xl text-green-600"
            >
              <LuShieldCheck />
              <p className="text-lg ">
                {formatCurrencyDisplay(confirmedOrderList)}
              </p>
            </Link>
            <li className="flex flex-col gap-2 lg:text-4xl ">
              <div className=" ">کل</div>
              <p className="text-lg ">
                {formatCurrencyDisplay(
                  confirmedOrderList + unConfirmedOrderList
                )}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
