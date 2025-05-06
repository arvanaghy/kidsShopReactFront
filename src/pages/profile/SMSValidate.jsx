import { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import UserContext from "@context/UserContext";
import toast from "react-hot-toast";
const SMSValidate = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || null;
  const [otp, setOtp] = useState("");
  const inputRefs = useRef(null);
  const { phoneNumber } = useParams();
  const { user, updateUser } = useContext(UserContext);
  const [isPending, setIsPending] = useState(false);
  const navigateTo = useNavigate();

  const handleVerify = async () => {
    setIsPending(true);
    try {
      const { data, status } = await axios.post(
        "https://kidsshopapi.electroshop24.ir/api/v1/verify-sms",
        {
          phoneNumber: phoneNumber,
          sms: otp,
        },
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      switch (status) {
        case 202:
          setIsPending(false);
          toast.success(data.message);
          updateUser(data.result);
          if (redirect) {
            navigateTo(redirect);
          } else {
            navigateTo("/profile");
          }
          break;
        default:
          setIsPending(false);
          throw new Error(data?.message);
      }
    } catch (error) {
      setIsPending(false);
      toast.error(
        " کد تایید : " + error?.message ||
          error?.response?.data?.message ||
          "خطا در اتصال"
      );
    } finally {
      setIsPending(false);
      setOtp("");
      inputRefs.current.focus();
    }
  };

  const resendSMS = async () => {
    try {
      const { data, status } = await axios.post(
        "https://kidsshopapi.electroshop24.ir/api/v1/resend-sms",
        {
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 202) throw new Error(data?.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(
        "ارسال مجدد " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    } finally {
      setOtp("");
      inputRefs.current.focus();
    }
  };

  const verifyUserToken = async () => {
    if (!user || user.length === 0 || user.UToken === null) return;
    try {
      const { data } = await axios.post(
        "https://kidsshopapi.electroshop24.ir/api/v1/verify-token",
        {
          UToken: user?.UToken,
        },
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      switch (data.status) {
        case 202:
          toast.success(data.message);
          updateUser(data.result);
          navigateTo("/profile");
          break;
        default:
          updateUser([]);
          throw new Error(data?.message);
      }
    } catch (error) {
      updateUser([]);
      toast.error(
        "تایید توکن" + error?.message ||
          error?.response?.data?.message ||
          "خطا در اتصال"
      );
    }
  };

  useEffect(() => {
    verifyUserToken();
    window.scrollTo(0, 0);
    inputRefs.current.focus();
  }, [user]);

  return (
    <div className="inset-0 flex justify-center min-h-[70vh] px-3 lg:px-0">
      <div className="inset-0 max-w-md p-4 mx-auto my-auto bg-gray-100 rounded-md shadow-md related ">
        <h2 className="py-4 mb-4 text-2xl text-center font-EstedadExtraBold text-CarbonicBlue-500">
          کد پیام کوتاه
        </h2>
        <div className="flex flex-row-reverse justify-center">
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
            minLength={4}
            ref={inputRefs}
            className="w-full h-12 mx-2 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-center mt-5">
          {isPending ? (
            <div className="flex items-center justify-center font-EstedadMedium">
              <button
                type="button"
                className="inline-flex items-center  rounded-lg active:bg-darkgold text-zarblack py-2 px-4 my-3 lg:mx-32  disabled:bg-darkgold/30  transition ease-in-out duration-150 cursor-not-allowed"
                disabled={true}
              >
                درحال پردازش
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
            <button
              onClick={handleVerify}
              className="px-12 py-2 my-3 rounded-lg bg-CarbonicBlue-500 font-EstedadMediumBold hover:bg-Purple-500 duration-300 
                text-white"
            >
              تایید
            </button>
          )}
        </div>
        <div className="flex justify-center my-4 text-sm font-EstedadMedium">
          <p className="">پیام کوتاه را دریافت نکرده اید ؟</p>
          <button className="mx-2 text-Amber-500" onClick={resendSMS}>
            ارسال مجدد
          </button>
        </div>
        <div className="">
          <button
            className="flex justify-center px-4 py-3 mx-auto text-sm text-center text-gray-100 rounded-lg font-EstedadMedium items center bg-CarbonicBlue-500 hover:bg-Purple-500 hover:text-white"
            onClick={() => {
              navigateTo("/login");
            }}
          >
            {" "}
            ویرایش شماره همراه
          </button>
        </div>
      </div>
    </div>
  );
};

export default SMSValidate;
