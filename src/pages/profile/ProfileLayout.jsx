import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "@context/UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { RxDashboard, RxCross2 } from "react-icons/rx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faGaugeHigh,
  faMoneyCheckDollar,
  faReceipt,
  faRightFromBracket,
  faSpinner,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

const ProfileLayout = () => {
  const { user, updateUser, updateCart } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isPending, setIsPending] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const logOut = async () => {
    setIsPending(true);
    try {
      const { data, status } = await axios.post(
        "https://kidsshopapi.electroshop24.ir/api/v1/log-out",
        {
          UToken: user?.UToken,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.UToken}`,
            cache: "no-cache",
          },
        }
      );
      if (status !== 202) throw new Error(data?.message);
      setIsPending(false);
      updateUser([]);
      updateCart([]);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      setIsPending(false);
      toast.error(
        "خروج : " + error?.message ||
          error?.response?.data?.message ||
          "خطا در اتصال"
      );
    } finally {
      setIsPending(false);
    }
  };


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="relative">
      {/* Toggle Button for Mobile View */}
      <button
        className="lg:hidden fixed bottom-24 left-5 z-30 bg-blue-600 text-white p-3 rounded-full"
        onClick={toggleNav}
      >
        {isNavOpen ? <RxCross2 size={24} /> : <RxDashboard size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full max-w-xs h-full  bg-CarbonicBlue-500 text-white z-20 transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-full lg:max-w-none  `}
      >
        <div className="flex flex-col items-center w-full h-full justify-around font-EstedadMedium">
          <div className="w-full">
            <ul className="text-white px-6 flex flex-col items-center justify-center w-full h-full gap-4">
              <li className="w-full">
                <Link
                  to="/profile"
                  className={`w-full flex flex-row items-center 
                    lg:font-EstedadExtraBold
                    justify-around gap-2 text-lg xl:text-2xl border py-4 px-12 rounded-2xl shadow-xl ${
                      pathname === "/profile"
                        ? "bg-blue-800 border-blue-800 text-white scale-95"
                        : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                    }`}
                >
                  <FontAwesomeIcon icon={faGaugeHigh} />
                  <span>داشبورد</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/unconfirmed-orders"
                  className={`
                    w-full flex flex-row items-center justify-around gap-2 text-lg border
                    lg:font-EstedadExtraBold
                                  text-lg  border 
                         xl:text-lg
                         xl:py-4 xl:px-10 rounded-2xl shadow-xl
                    rounded-2xl shadow-xl  ${
                           pathname === "/unconfirmed-orders"
                             ? "bg-blue-800 border-blue-800 text-white scale-95"
                             : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                         }`}
                >
                  <FontAwesomeIcon icon={faFileInvoice} />
                  سفارشات تایید نشده
                </Link>
              </li>
              <li>
                <Link
                  to="/confirmed-orders"
                  className={`
                    w-full flex flex-row items-center justify-around gap-2 text-lg border
                    lg:font-EstedadExtraBold
                                  text-lg border 
                         xl:text-lg
                         xl:py-4 xl:px-10 rounded-2xl shadow-xl
                    rounded-2xl shadow-xl ${
                      pathname === "/confirmed-orders"
                        ? "bg-blue-800 border-blue-800 text-white scale-95"
                        : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                    }`}
                >
                  <FontAwesomeIcon icon={faReceipt} />
                  سفارشات تایید شده
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/invoice"
                  className={`w-full flex flex-row items-center justify-around font-EstedadMedium lg:font-EstedadExtraBold gap-2 text-base lg:text-lg border py-4 px-12 rounded-2xl shadow-xl ${
                    pathname === "/invoice"
                      ? "bg-blue-800 border-blue-800 text-white scale-95"
                      : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                  }`}
                >
                  <FontAwesomeIcon icon={faMoneyCheckDollar} />{" "}
                  <span>گردش حساب</span>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/edit-info"
                  className={`w-full flex flex-row items-center font-EstedadMedium lg:font-EstedadExtraBold justify-between gap-2 lg:text-lg border py-4 px-12 rounded-2xl shadow-xl ${
                    pathname === "/edit-info"
                      ? "bg-blue-800 border-blue-800 text-white scale-95"
                      : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                  }`}
                >
                  <FontAwesomeIcon icon={faUserPen} />
                  <span>ویرایش پروفایل</span>
                </Link>
              </li>
              <li className="w-full">
                <button
                  onClick={logOut}
                  disabled={isPending}
                  className={`w-full flex flex-row items-center justify-around gap-2 text-lg border py-4 px-12 rounded-2xl shadow-xl bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out
                  }`}
                >
                  {isPending ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="-scale-x-100"
                      />
                      <span>خروج</span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
