
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useOtp } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/UserStore";
const OtpForm = ({ phoneNumber, redirect }: { phoneNumber: string, redirect: string | null | undefined }) => {
    const { otpVerify, isPending } = useOtp();
    const navigate = useNavigate();
    const { updateUser } = useUserStore();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        otpVerify(e, redirect, navigate, updateUser);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-row-reverse justify-center">
                <input
                    type="number"
                    name="otp"
                    className="w-full h-12 mx-2 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input type="hidden" name="phoneNumber" value={phoneNumber} />
            </div>
            <div className="flex items-center justify-center mt-5">
                {isPending ? (<div className="flex items-center justify-center font-EstedadMedium">
                    <button
                        type="button"
                        className="inline-flex items-center bg-Purple-500 rounded-lg active:bg-Purple-500 text-white py-2 px-8 mt-3  disabled:bg-Purple-50030 font-EstedadMedium transition ease-in-out duration-150 cursor-not-allowed"
                        disabled={true}
                    >
                        درحال پردازش
                        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    </button>
                </div>
                ) :
                    (<button type="submit" className="w-full text-white  px-4 py-2 border font-EstedadMedium bg-CarbonicBlue-500 border-CarbonicBlue-600 hover:bg-CarbonicBlue-300 hover:grayscale delay-150 duration-300  ease-in-out rounded-lg cursor-pointer drop-shadow-xl shadow-Purple-500">
                        تایید
                    </button>
                    )

                }
            </div>
        </form>
    )
}

export default OtpForm