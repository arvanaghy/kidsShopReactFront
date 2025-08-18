

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useResendSMS } from "@hooks/useAuth";
const ResendSMS = ({ phoneNumber }: { phoneNumber: string }) => {
    const { resendSMS, isPending } = useResendSMS();

    const handleSubmit = () => {
        resendSMS(phoneNumber);
    };

    return (
        <div className="flex justify-center my-4 text-sm font-EstedadMedium">
            <p className="">پیام کوتاه را دریافت نکرده اید ؟</p>
            {isPending ? <FontAwesomeIcon icon={faSpinner} spin /> : (

                <button className="mx-2 text-Amber-500" onClick={handleSubmit}>
                    ارسال مجدد
                </button>
            )}
        </div>
    )
}

export default ResendSMS