import { Link, useSearchParams } from "react-router-dom";
import { useUserStore } from "@store/UserStore";
import Policy from "@components/auth/Policy";
import RegisterForm from "@components/auth/RegisterForm";
import { useUserValidation } from "@hooks/useAuth";
import Loading from "@components/Loading";
import LoggedUser from "@components/auth/LoggedUser";

const Register = () => {
  const [searchParams] = useSearchParams();
  const phoneNumberParam: string | null = searchParams.get("phoneNumber");
  const redirect: string | null = searchParams.get("redirect");

  const { user } = useUserStore();
  const { isPending, isUserValidated } = useUserValidation(user);

  const policy = [
    "1 . لطفا شماره موبایل خود را وارد کنید",
    "2 . شماره تماس شما به عنوان نام کاربری است",
    "3 . پیام کوتاه تایید برای شماره تلفن مندرج ارسال خواهد شد",
    "4 . آدرس شما حتما باید به صورت دقیق وارد شود",
    "5 . مشخصات فردی درج شده به منزله دارنده حساب کاربری میباشد",
  ];

  if (isPending) return <Loading />;

  return (
    <main className="w-full grid grid-cols-12 items-center justify-center bg-gray-300/60 min-h-[90vh] gap-3 p-4 mx-auto">
      <Policy title="قوانین عضویت و کاربری" policy={policy} />
      <div className="col-span-12  md:col-span-3  text-center mx-auto justify-center w-full items-center text-gray-900 ">
        {isUserValidated ? (
          <LoggedUser />
        ) : (
          <div
            className="w-full mx-auto rounded-md p-6  bg-gray-100 items-center justify-center text-center space-y-8
          shadow-lg shadow-gray-400/50"
          >
            <p className="font-EstedadExtraBold text-2xl">عضویت در کیدزشاپ</p>
            <RegisterForm phoneNumberParam={phoneNumberParam} redirect={redirect} />
            <div
              className="text-sm lg:text-base font-EstedadMedium text-center flex flex-col  space-y-3 
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
        )}

      </div>
    </main>
  );
};

export default Register;