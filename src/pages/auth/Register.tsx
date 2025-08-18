import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useUserStore } from "@store/UserStore";
import Policy from "@components/auth/Policy";
import RegisterForm from "@components/auth/RegisterForm";
import { useEffect } from "react";

const Register = () => {
  const [searchParams] = useSearchParams();
  const phoneNumberParam: string | null = searchParams.get("phoneNumber");
  const redirect: string | null = searchParams.get("redirect");
  const navigate = useNavigate();
  const { verifyUserToken } = useUserStore();

  useEffect(() => {
    verifyUserToken(redirect, navigate);
  }, [verifyUserToken, redirect, navigate]);

  const policy = [
    "1 . لطفا شماره موبایل خود را وارد کنید",
    "2 . شماره تماس شما به عنوان نام کاربری است",
    "3 . پیام کوتاه تایید برای شماره تلفن مندرج ارسال خواهد شد",
    "4 . آدرس شما حتما باید به صورت دقیق وارد شود",
    "5 . مشخصات فردی درج شده به منزله دارنده حساب کاربری میباشد",
  ];

  return (
    <main className="w-full grid grid-cols-12 items-center justify-center bg-gray-300/60 min-h-[90vh] gap-3 p-4">
      <Policy title="قوانین عضویت و کاربری" policy={policy} />
      <div className="col-span-12 md:col-span-6 w-full grid grid-cols-1 items-center text-gray-900 justify-center">
        <div
          className="w-fit mx-auto rounded-md p-4 md:p-12 bg-gray-100 grid grid-cols-1 items-center justify-center text-center space-y-8 
          shadow-lg shadow-gray-400/50"
        >
          <p className="font-EstedadExtraBold text-2xl">عضویت در کیدزشاپ</p>
          <RegisterForm phoneNumberParam={phoneNumberParam} redirect={redirect} />
          <div
            className="text-sm lg:text-base font-EstedadMedium text-center flex flex-col lg:flex-row space-y-3 lg:space-y-0
           items-center justify-center"
          >
            <p className="w-full">قبلا ثبت نام کرده اید؟</p>
            <Link
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