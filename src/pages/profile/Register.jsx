import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserContext from "@context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || null;
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
        navigate(
          `/SMS-validate/${phoneNumber}${
            redirect ? "?redirect=" + redirect : ""
          }`
        );
      } else if (status == 302) {
        navigate(`/login${redirect && "?redirect=" + redirect}`);
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
          navigateTo(`/profile${redirect && "?redirect=" + redirect}`);
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
    <main className="w-full grid grid-cols-12 items-center justify-center bg-gray-300/60 min-h-[90vh] gap-3 p-4">
      <div className="hidden md:grid w-fit mx-auto md:col-span-6 items-center justify-center bg-gray-100 p-6 xl:p-12 rounded-md shadow-md shadow-black/60 space-y-3">
        <h3
          className="
            lg:text-xl
            xl:text-2xl
            2xl:text-3xl
            line-clamp-1 text-center leading-relaxed tracking-wider text-black font-EstedadExtraBold"
        >
          قوانین عضویت و کاربری
        </h3>

        <ul
          className="w-full leading-relaxed text-black font-EstedadMedium 
          space-y-3 
            lg:text-sm lg:space-y-2
            xl:text-base xl:space-y-3
            2xl:text-lg 2xl:space-y-4
            "
        >
          <li>1 . لطفا شماره موبایل خود را وارد کنید</li>
          <li>2 . شماره تماس شما به عنوان نام کاربری است</li>
          <li>3 . پیام کوتاه تایید برای شماره تلفن مندرج ارسال خواهد شد</li>
          <li>4 . آدرس شما حتما باید به صورت دقیق وارد شود</li>
          <li>5 . مشخصات فردی درج شده به منزله دارنده حساب کاربری میباشد</li>
        </ul>
      </div>
      <div className="col-span-12 md:col-span-6 w-full grid grid-cols-1 items-center text-gray-900 justify-center  ">
        <div
          className="w-fit mx-auto rounded-md p-4 md:p-12 bg-gray-100 grid grid-cols-1 items-center justify-center text-center space-y-8 
          shadow-md shadow-black/60
          "
        >
          <p className="font-EstedadExtraBold text-2xl">عضویت در کیدزشاپ</p>
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
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                </button>
              </div>
            ) : (
              <button className="w-full text-white  px-4 py-2 border font-EstedadMedium bg-CarbonicBlue-500 border-CarbonicBlue-600 hover:bg-CarbonicBlue-300 hover:scale-95 duration-150 ease-in-out rounded-lg cursor-pointer drop-shadow-xl shadow-Purple-500">
                عضویت
              </button>
            )}
          </form>
          <div
            className="text-sm lg:text-base font-EstedadMedium text-center flex flex-col lg:flex-row space-y-3 lg:space-y-0
           items-center justify-center"
          >
            <p className="w-full">قبلا ثبت نام کرده اید ؟</p>
            <Link
              onContextMenu={(e) => e.preventDefault()}
              to="/login"
              className="w-full font-medium text-red-600 hover:underline 
              transition-all ease-in-out duration-300
              px-1.5"
            >
              هم اکنون وارد شوید
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
