import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import UserContext from "@context/UserContext";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { user, updateUser } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || null;

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
            navigateTo(
              `/SMS-validate/${phoneNumber}${
                redirect ? "?redirect=" + redirect : ""
              }`
            );
            break;
          case 403:
            throw new Error(data?.message);
          case 404:
            setIsPending(false);
            toast.error(data?.message);
            navigateTo(`/register${redirect ? "?redirect=" + redirect : ""}`);
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
    <main className="w-full grid grid-cols-12 items-center justify-center bg-gray-300/60 min-h-[90vh] gap-3 p-4">
      <div className="hidden md:grid w-fit mx-auto md:col-span-6 items-center justify-center bg-gray-100 p-6 xl:p-12 rounded-md shadow-md shadow-black/60 space-y-3">
        <h3
          className="
            lg:text-xl
            xl:text-2xl
            2xl:text-3xl
            line-clamp-1 text-center leading-relaxed tracking-wider text-black font-EstedadExtraBold"
        >
          قوانین ورود
        </h3>

        <ul
          className="w-full leading-relaxed text-black font-EstedadMedium 
          space-y-3 
            lg:text-sm lg:space-y-2
            xl:text-base xl:space-y-3
            2xl:text-lg 2xl:space-y-4
            "
        >
          <li className="w-full leading-loose">
            1 . لطفا شماره موبایل خود را وارد کنید
          </li>
          <li className="w-full leading-loose text-pretty  ">
            2 . شماره تماس شما به عنوان نام کاربری است
          </li>
          <li className="w-full leading-loose">
            3 . پیام کوتاه تایید برای شماره تلفن مندرج ارسال خواهد شد
          </li>
        </ul>
      </div>
      <div className="col-span-12 md:col-span-6 w-full grid grid-cols-1 items-center text-gray-900 justify-center  ">
        <div
          className="w-fit mx-auto rounded-md p-4 md:p-12 bg-gray-100 grid grid-cols-1 items-center justify-center text-center space-y-8 
          shadow-md shadow-black/60
          "
        >
          <p className="font-EstedadExtraBold text-2xl">ورود به حساب کاربری</p>
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
                className="w-full px-3 py-2 my-2 bg-stone-50/60 text-gray-500 font-EstedadMedium focus-within:bg-stone-50 duration-150 border rounded-lg shadow-sm outline-none placeholder:text-gray-400 focus-within:ring-1 focus-within:ring-gray-500 focus-within:border-gray-500 ease-in-out"
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
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                </button>
              </div>
            ) : (
              <button className="w-full bg-CarbonicBlue-500  px-4 py-2 border font-EstedadMedium text-white border-CarbonicBlue-600 hover:bg-CarbonicBlue-300 hover:scale-95 duration-150 ease-in-out rounded-lg cursor-pointer drop-shadow-xl shadow-Purple-500">
                ورود
              </button>
            )}
          </form>
          <div
            className="text-sm lg:text-base font-EstedadMedium text-center flex flex-col lg:flex-row space-y-3 lg:space-y-0
           items-center justify-center"
          >
            <p className="w-full">حساب کاربری ندارید.؟</p>
            <Link
              onContextMenu={(e) => e.preventDefault()}
              to="/register"
              className="w-full font-medium text-red-600 hover:underline 
              transition-all ease-in-out duration-300
              px-1.5"
            >
              هم اکنون عضو شوید .
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
