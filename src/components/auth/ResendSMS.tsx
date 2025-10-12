import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useResendSMS } from "@hooks/useAuth";
import JumpingDots from "@components/JumpingDots";
const ResendSMS = ({ phoneNumber }: { phoneNumber: string }) => {
    const { resendSMS, isPending } = useResendSMS();

    const handleSubmit = () => {
        resendSMS(phoneNumber);
    };

    return (
        <div className="flex justify-center my-4 text-sm font-EstedadMedium">
            <p className="">پیام کوتاه را دریافت نکرده اید ؟</p>
            {isPending ? <JumpingDots color="bg-amber-700" /> :
                (
                    <button className="mx-2 text-amber-500 hover:text-amber-700 duration-200 delay-150 ease-in-out transition-all hover:-translate-x-1" onClick={handleSubmit}>
                        ارسال مجدد
                    </button>
                )}
        </div>
    )
}

export default ResendSMS