import { Link, useSearchParams } from "react-router-dom";
import Policy from "@components/auth/Policy";
import LoginFrom from "@components/auth/LoginFrom";
import { useUserStore } from "@store/UserStore";
import { useUserValidation } from "@hooks/useAuth";
import Loading from "@components/Loading";
import LoggedUser from "@components/auth/LoggedUser";

const Login = () => {
  const [searchParams] = useSearchParams();
  const phoneNumberParam: string | null = searchParams.get("phoneNumber");
  const redirect: string | null = searchParams.get("redirect");
  const { user } = useUserStore();
  const { isPending, isUserValidated } = useUserValidation(user);

  if (isPending) return <Loading />;


  const policy = [
    "1 . لطفا شماره موبایل خود را وارد کنید",
    "2 . شماره تماس شما به عنوان نام کاربری است",
    "3 . پیام کوتاه تایید برای شماره تلفن مندرج ارسال خواهد شد",
  ];

  return (
    <main className="w-full grid grid-cols-12 items-center justify-center bg-gray-300/60 min-h-[90vh] gap-3 p-4">
      <Policy title="قوانین ورود" policy={policy} />
      <div className="col-span-12 md:col-span-6 w-full grid grid-cols-1 items-center text-gray-900 justify-center  ">
        {isUserValidated ? <LoggedUser /> : (<div
          className="w-fit mx-auto rounded-md p-4 md:p-12 bg-gray-100 grid grid-cols-1 items-center justify-center text-center space-y-8
          shadow-md shadow-black/60
          "
        >
          <p className="font-EstedadExtraBold text-2xl">ورود به حساب کاربری</p>
          <LoginFrom phoneNumberParam={phoneNumberParam} redirect={redirect} />
          <div
            className="text-sm lg:text-base font-EstedadMedium text-center flex flex-col lg:flex-row space-y-3 lg:space-y-0
           items-center justify-center"
          >
            <p className="w-full">حساب کاربری ندارید.؟</p>
            <Link
              to="/register"
              className="w-full font-medium text-red-600 hover:underline 
              transition-all ease-in-out duration-300
              px-1.5"
            >
              هم اکنون عضو شوید .
            </Link>
          </div>
        </div>)}

      </div>
    </main>
  );
};

export default Login;
