import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "@store/UserStore";
import ChangePhoneNumber from "@components/auth/ChangePhoneNumber";
import ResendSMS from "@components/auth/ResendSMS";
import OtpForm from "@components/auth/OtpForm";

const SMSValidate = () => {
  const [searchParams] = useSearchParams();
  const { phoneNumber } = useParams();
  const redirect: string | null = searchParams.get("redirect");

  const navigate = useNavigate();

  const { verifyUserToken } = useUserStore();

  useEffect(() => {
    verifyUserToken(redirect, navigate);
  }, [verifyUserToken, redirect, navigate]);



  return (
    <div className="inset-0 flex justify-center min-h-[70vh] px-3 lg:px-0">
      <div className="inset-0 max-w-md p-4 mx-auto my-auto bg-gray-100 rounded-md shadow-md related ">
        <h2 className="py-4 mb-4 text-2xl text-center font-EstedadExtraBold text-CarbonicBlue-500">
          کد پیام کوتاه
        </h2>
        <OtpForm phoneNumber={phoneNumber} redirect={redirect} />
        <ResendSMS phoneNumber={phoneNumber} />
        <ChangePhoneNumber />
      </div>
    </div>
  );
};

export default SMSValidate;
