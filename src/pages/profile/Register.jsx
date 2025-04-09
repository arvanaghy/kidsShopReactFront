import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserContext from "@context/UserContext";
import registerSVG from "/src/assets/images/sign-in-register-svgrepo-com.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const mobilePattern = /^09[0-9]{9}$/;
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const navigateTo = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const submitRegister = async (e) => {
    e.preventDefault();

    if (!mobilePattern.test(phoneNumber)) {
      toast.error("شماره موبایل را وارد نمایید");
      e.target.phoneNumber.focus();
      return;
    }
    try {
      const { data, status } = await axios.post(
        "https://kidsshopapi.electroshop24.ir/api/v1/register",
        {
          name: name,
          phoneNumber: phoneNumber,
          Address: address,
        }
      );
      if (status == 202) {
        toast.success(data?.message);
        navigate("/SMS-validate/" + phoneNumber);
      } else if (status == 302) {
        navigate("/login");
        throw new Error(data?.message);
      } else {
        throw new Error(data?.message);
      }
    } catch (error) {
      toast.error(
        "عضویت " + (error?.response?.data?.message || error?.message) ||
          "خطا در اتصال"
      );
    }
  };

  const verifyUserToken = async () => {
    if (!user || user?.UToken == undefined || user?.UToken == null) return;
    setIsPending(true);
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
          setIsPending(false);
          navigateTo("/profile");
          break;
        default:
          updateUser([]);
          setIsPending(false);
          throw new Error(data?.message);
      }
    } catch (error) {
      updateUser([]);
      setIsPending(false);
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
    window.scrollTo(0, 0);
    verifyUserToken();
  }, [user]);

  return (
    <main className="w-full grid grid-cols-1 items-center justify-center bg-CarbonicBlue-500 lg:grid-cols-2 min-h-[90vh]">
      <div className="hidden lg:min-h-[90vh] lg:grid col-span-1 grid-cols-1 items-center justify-center bg-stone-50 p-10">
        <div className="w-full grid grid-cols-12 items-center justify-center">
          <img
            src={registerSVG}
            alt="loginSvg"
            className="col-span-5 w-full h-full object-cover"
          />
          <div className="col-span-7 grid grid-cols-1 items-center justify-center text-center">
            <h3 className="text-2xl  line-clamp-1 text-center leading-relaxed tracking-wider text-black font-EstedadExtraBold">
              قوانین عضویت و کاربری الکترو شاپ 24
            </h3>

            <ul className="text-black font-EstedadMedium my-6 space-y-4">
              <li>1 . لطفا شماره موبایل خود را وارد کنید</li>
              <li>2 . شماره تماس شما به عنوان نام کاربری است</li>
              <li>3 . پیام کوتاه تایید برای شماره تلفن مندرج ارسال خواهد شد</li>
              <li>4 . آدرس شما حتما باید به صورت دقیق وارد شود</li>
              <li>
                5 . مشخصات فردی درج شده به منزله دارنده حساب کاربری میباشد
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-1 w-full grid grid-cols-1 items-center bg-CarbonicBlue-500 text-stone-50 justify-center  ">
        <div className="w-full grid grid-cols-1 items-center justify-center lg:hidden px-8">
          <img
            src={registerSVG}
            alt="registerSVG"
            className="w-60 h-60 mt-14 "
          />
          <h3 className="font-EstedadExtraBold text-xl text-center leading-relaxed tracking-wider text-black my-4 ">
            عضویت در الکترو شاپ 24
          </h3>
        </div>
        <div className="w-full grid grid-cols-1 items-center justify-center text-center space-y-8 ">
          <form
            onSubmit={(e) => submitRegister(e)}
            className="px-4 max-w-md mx-auto space-y-4 w-full font-EstedadMedium "
          >
            <label className="my-2 text-right block">
              نام و نام خانوادگی
              <span className="text-Amber-500 font-EstedadMedium">*</span>
            </label>
            <input
              value={name}
              type="text"
              name="name"
              id="name"
              className="w-full px-3 py-2 bg-white/60 text-CarbonicBlue-500 focus-within:bg-white duration-150 border rounded-lg shadow-sm outline-none"
              onChange={(e) => setName(e.target.value)}
            />

            <label className="my-2 text-right block ">
              شماره موبایل
              <span className="text-Amber-500 font-EstedadMedium">*</span>
            </label>
            <input
              value={phoneNumber}
              min={0}
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              className="w-full px-3 py-2 bg-white/60 text-CarbonicBlue-500 focus-within:bg-white duration-150 border rounded-lg shadow-sm outline-none"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <label className="my-2 text-right block">
              آدرس
              <span className="text-Amber-500 font-EstedadMedium">*</span>
            </label>
            <textarea
              className="w-full px-3 py-2 bg-white/60 text-CarbonicBlue-500 focus-within:bg-white duration-150 border rounded-lg shadow-sm outline-none"
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              value={address}
            ></textarea>

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
                عضویت
              </button>
            )}
          </form>
          <p className="text-sm lg:text-base font-EstedadMedium text-center">
            قبلا ثبت نام کرده اید ! ؟{" "}
            <Link
              to="/login"
              className="font-medium text-Amber-500 animate-pulse"
            >
              هم اکنون وارد شوید .
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
