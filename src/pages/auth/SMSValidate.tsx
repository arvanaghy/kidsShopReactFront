import { useParams, useSearchParams } from "react-router-dom";

import ChangePhoneNumber from "@components/auth/ChangePhoneNumber";
import ResendSMS from "@components/auth/ResendSMS";
import OtpForm from "@components/auth/OtpForm";
import { useUserStore } from "@store/UserStore";
import { useUserValidation } from "@hooks/useAuth";
import Loading from "@components/Loading";
import LoggedUser from "@components/auth/LoggedUser";

const SMSValidate = () => {
  const [searchParams] = useSearchParams();
  const { phoneNumber = "" } = useParams();
  const redirect: string | null = searchParams.get("redirect");
  const phoneNumberParam: string | null = searchParams.get("phoneNumber");

  const { user } = useUserStore();
  const { isPending, isUserValidated } = useUserValidation(user);

  if (isPending) return <Loading />;

  return (
    <div className="inset-0 flex justify-center min-h-[70vh] px-3 lg:px-0">
      {isUserValidated ? <LoggedUser /> : (
        <div className="inset-0 max-w-md p-4 mx-auto my-auto bg-gray-100 rounded-md shadow-md related ">
          <h2 className="py-4 mb-4 text-2xl text-center font-EstedadExtraBold text-CarbonicBlue-500">
            کد پیام کوتاه
          </h2>
          <OtpForm phoneNumber={phoneNumber} redirect={redirect} />
          <ResendSMS phoneNumber={phoneNumber} />
          <ChangePhoneNumber />
        </div>
      )}

    </div>
  );
};

export default SMSValidate;
