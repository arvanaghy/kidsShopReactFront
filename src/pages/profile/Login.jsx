import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../../UserContext";
import toast from "react-hot-toast";
import loginSvg from "/src/assets/images/login-svgrepo-com.svg";

const Login = () => {
  const { user, updateUser } = useContext(UserContext);

  const navigateTo = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPending, setIsPending] = useState(false);

  const phoneInputRef = useRef();

  const loginSubmit = async (e) => {
    if (isPending) return;
    setIsPending(true);
    e.preventDefault();
    const pattern = /^09[0-9]{9}$/;
    if (pattern.test(phoneNumber)) {
      try {
        const { data, status } = await axios.post(
          "https://kidsshopapi.electroshop24.ir/api/v1/login",
          {
            phoneNumber: phoneNumber,
          }
        );

        switch (status) {
          case 201:
            setIsPending(false);
            updateUser(data?.result);
            toast.success(data?.message);
            navigateTo("/profile");
            break;
          case 202:
            setIsPending(false);
            toast.success(data?.message);
            navigateTo("/SMS-validate/" + phoneNumber);
            break;
          case 403:
            throw new Error(data?.message);
          case 404:
            setIsPending(false);
            toast.error(data?.message);
            navigateTo("/register");
            break;
          default:
            throw new Error(data?.message);
        }
      } catch (error) {
        toast.error(
          "ورود :  " + (error?.response?.data?.message || error?.message) ||
            "خطا در اتصال"
        );
        setIsPending(false);
      } finally {
        setPhoneNumber("");
        e.target.phone.focus();
        setIsPending(false);
      }
    } else {
      toast.error("شماره موبایل وارد شده معتبر نمی باشد");
      setPhoneNumber("");
      e.target.phone.focus();
      setIsPending(false);
    }
  };

  const verifyUserToken = async () => {
    if (!user || user.length === 0 || user.UToken === null) return;
    try {
      const { data, status } = await axios.post(
        "https://kidsshopapi.electroshop24.ir/api/v1/verify-token",
        {
          UToken: user?.UToken,
        }
      );
      switch (status) {
        case 202:
          toast.success(data?.message);
          updateUser(data?.result);
          navigateTo("/profile");
          break;
        default:
          updateUser([]);
          toast.error(data?.message);
          break;
      }
    } catch (error) {
      updateUser([]);
      toast.error(
        "اعتبارسنجی " + (error?.response?.data?.message || error?.message) ||
          "خطا در اتصال"
      );
    }
  };

  useEffect(() => {
    if (user && user.length > 0 && user.UToken && user.UToken !== null) {
      navigateTo("/profile");
    }
    phoneInputRef.current.focus();
    window.scrollTo(0, 0);
    verifyUserToken();
  }, [user]);

  return (
    <main className="w-full grid grid-cols-1 items-center justify-center bg-CarbonicBlue-500 lg:grid-cols-2 min-h-[90vh]">
      <div className="hidden lg:min-h-[90vh] lg:grid col-span-1 grid-cols-1 items-center justify-center bg-stone-50">
        <div className="w-full grid grid-cols-12 items-center justify-center">
          <img
            src={loginSvg}
            alt="loginSvg"
            className="col-span-5 w-full h-full object-cover"
          />
          <div className="col-span-7 grid grid-cols-1 items-center justify-center text-center">
            <h3 className="
            lg:text-xl
            xl:text-2xl
            2xl:text-3xl
            line-clamp-1 text-center leading-relaxed tracking-wider text-black font-EstedadExtraBold">
              قوانین ورود و ثبت نام
            </h3>

            <ul className="text-black font-EstedadMedium 
            lg:text-sm lg:my-6 lg:space-y-2
            xl:text-base xl:my-6 xl:space-y-3
            2xl:text-lg 2xl:my-6 2xl:space-y-4
            ">
              <li>1 . لطفا شماره موبایل خود را وارد کنید</li>
              <li>2 . شماره تماس شما به عنوان نام کاربری است</li>
              <li>3 . پیام کوتاه تایید برای شماره تلفن مندرج ارسال خواهد شد</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-1 w-full grid grid-cols-1 items-center bg-CarbonicBlue-500 text-stone-50 justify-center  ">
        <div className="w-full grid grid-cols-1 items-center justify-center lg:hidden px-8">
          <img
            src={loginSvg}
            alt="logo"
            className="w-60 h-60 mx-auto translate-x-5 "
          />
          <h3 className="font-EstedadExtraBold text-xl text-center leading-relaxed tracking-wider text-black my-4 ">
            ورود به حساب کاربری
          </h3>
        </div>
        <div className="w-full grid grid-cols-1 items-center justify-center text-center space-y-8 ">
          <form
            onSubmit={loginSubmit}
            className="space-y-5 px-5 max-w-md mx-auto "
          >
            <div className="w-full space-y-4 text-right">
              <label className="font-EstedadMedium text-right ">
                شماره موبایل :
              </label>
              <input
                type="number"
                min={0}
                name="phone"
                ref={phoneInputRef}
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 my-2 bg-stone-50/60 text-CarbonicBlue-500 font-EstedadMedium focus-within:bg-stone-50 duration-150 border rounded-lg shadow-sm outline-none placeholder:text-gray-400 focus-within:ring-1 focus-within:ring-gray-500 focus-within:border-gray-500 ease-in-out"
              />
            </div>
            {isPending ? (
              <div className="flex items-center justify-center font-EstedadMedium">
                <button
                  type="button"
                  className="inline-flex items-center bg-Purple-500 rounded-lg active:bg-Purple-500 text-white py-2 px-8 mt-3  disabled:bg-Purple-50030 font-EstedadMedium transition ease-in-out duration-150 cursor-not-allowed"
                  disabled={true}
                >
                  درحال پردازش
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </button>
              </div>
            ) : (
              <button className="w-full bg-white  px-4 py-2 border font-EstedadMedium text-CarbonicBlue-500 border-CarbonicBlue-600 hover:bg-CarbonicBlue-300 hover:scale-95 duration-150 ease-in-out rounded-lg cursor-pointer drop-shadow-xl shadow-Purple-500">
                ورود
              </button>
            )}
          </form>
          <p className="text-sm lg:text-base font-EstedadMedium text-center">
            حساب کاربری ندارید.؟
            <Link
              to="/register"
              className="font-medium text-Amber-500  animate-pulse"
            >
              هم اکنون عضو شوید .
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
