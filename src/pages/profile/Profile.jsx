import { useContext, useEffect, useState } from "react";
import ProfileLayout from "./ProfileLayout";
import UserContext from "../../../UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { LuShieldCheck, LuShieldClose } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrencyDisplay } from "../../../utils/numeralHelpers";
import Loading from "../../components/Loading";
const Profile = () => {
  const navigateTo = useNavigate();

  const [confirmedOrderList, setConfirmedOrderList] = useState(0);
  const [unConfirmedOrderList, setUnConfirmedOrderList] = useState(0);

  const { user } = useContext(UserContext);

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
      "https://kidsshopapi.electroshop24.ir/api/v1/list-past-orders?page=1"
    );
    fetchUnConfirmedOrders(
      "https://kidsshopapi.electroshop24.ir/api/v1/list-unverified-orders?page=1"
    );
    window.scrollTo(0, 0);
  }, [user]);

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col lg:flex-row min-h-[90vh]">
      <div className="flex lg:w-2/6 xl:w-1/6 bg-CarbonicBlue-500 ">
        <ProfileLayout />
      </div>

      <div className="inset-0 lg:w-5/6 flex flex-col justify-start bg-stone-50">
        <div className="grid grid-cols-2 items-center  text-center p-10 mt-24 lg:p-24 font-EstedadMedium">
          <div className="col-span-2 border rounded-2xl shadow-lg bg-white h-48 py-4 flex flex-col justify-around">
            <div className="text-2xl w-full">سفارشات شما</div>
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
      </div>
    </div>
  );
};

export default Profile;
