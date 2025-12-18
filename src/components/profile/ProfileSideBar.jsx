import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faGaugeHigh,
  faHourglassHalf,
  faMoneyCheckDollar,
  faStamp,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

import LogoutButton from "@components/profile/LogoutButton";
import { useUserStore } from "@store/UserStore";
import { faBlackTie } from "@fortawesome/free-brands-svg-icons";

const ProfileSideBar = () => {
  const { pathname } = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useUserStore();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="w-full h-full relative items-start justify-start">
      {/* Toggle Button for Mobile View */}
      <button
        className="md:hidden fixed top-40 left-5 z-30 bg-blue-600 text-white p-4 rounded-full shadow-md shadow-black/80 hover:bg-blue-700 duration-200 ease-in-out"
        onClick={toggleNav}
      >
        {isNavOpen ? (
          <FontAwesomeIcon icon={faGauge} />
        ) : (
          <FontAwesomeIcon icon={faGaugeHigh} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed w-full h-full bg-gray-400 text-white z-20 transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-full md:max-w-none items-center justify-center`}
      >
        <div className="flex flex-col  w-full h-full items-center justify-start md:justify-around  font-EstedadMedium pt-12 md:pt-0">
          <div className="w-full">
            <ul className="text-white px-6 md:px-2  flex flex-col items-center justify-center w-full h-full gap-4">
              {user?.Owner !== 1 && (
                <li className="w-full">
                  <Link
                    to="/admin"
                    className={`w-full flex flex-row items-center
                    justify-around gap-2 text-lg md:text-sm lg:text-base border py-4 px-6 md:px-2 lg:px-4 rounded-2xl shadow-xl ${
                      pathname === "/admin"
                        ? "bg-red-800 border-red-800 text-white scale-95"
                        : "bg-red-500 text-white hover:bg-red-600 hover:border-red-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                    }`}
                  >
                    <FontAwesomeIcon icon={faBlackTie} />
                    <span>پنل ادمین</span>
                  </Link>
                </li>
              )}
              <li className="w-full">
                <Link
                  to="/profile"
                  className={`w-full flex flex-row items-center 
                    justify-around gap-2 text-lg md:text-sm lg:text-base border py-4 px-6 md:px-2 lg:px-4 rounded-2xl shadow-xl ${
                      pathname === "/profile"
                        ? "bg-blue-800 border-blue-800 text-white scale-95"
                        : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                    }`}
                >
                  <FontAwesomeIcon icon={faGaugeHigh} />
                  <span>داشبورد</span>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/confirmed-orders"
                  className={`w-full flex flex-row items-center
                    justify-around gap-2 text-lg  md:text-sm  lg:text-base border py-4 px-6  md:px-2 lg:px-4 rounded-2xl shadow-xl ${
                      pathname === "/confirmed-orders"
                        ? "bg-blue-800 border-blue-800 text-white scale-95"
                        : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                    }`}
                >
                  <FontAwesomeIcon icon={faStamp} />
                  سفارشات تایید شده
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/unconfirmed-orders"
                  className={`w-full flex flex-row items-center 
                    justify-around gap-2 text-lg  md:text-sm  lg:text-base border py-4 px-6  md:px-2 lg:px-4 rounded-2xl shadow-xl ${
                      pathname === "/unconfirmed-orders"
                        ? "bg-blue-800 border-blue-800 text-white scale-95"
                        : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                    }`}
                >
                  <FontAwesomeIcon icon={faHourglassHalf} />
                  سفارشات در صف انتظار
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/invoice"
                  className={`w-full flex flex-row items-center justify-around font-EstedadMedium gap-2 text-base lg:text-base border py-4 px-6  md:px-2 lg:px-4  rounded-2xl shadow-xl ${
                    pathname === "/invoice"
                      ? "bg-blue-800 border-blue-800 text-white scale-95"
                      : "bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out"
                  }`}
                >
                  <FontAwesomeIcon icon={faMoneyCheckDollar} />
                  <span>گردش حساب</span>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/edit-info"
                  className={`w-full flex flex-row items-center font-EstedadMedium justify-between gap-2 border py-4 px-6  md:px-2 lg:px-4  rounded-2xl shadow-xl ${
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
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
