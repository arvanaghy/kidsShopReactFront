
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useLogin } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/UserStore";
const LoginFrom = ({ phoneNumberParam, redirect }: { phoneNumberParam: string | null, redirect: string | null }) => {
    const { updateUser } = useUserStore();
    const { loginSubmit, isPending } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        loginSubmit(e, redirect, (url: string) => navigate(url) , updateUser );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 px-5 max-w-md mx-auto "
        >
            <div className="w-full space-y-4 text-right">
                <label className="font-EstedadMedium text-right ">
                    شماره موبایل :
                    <span className="text-xs px-1.5 text-gray-600">(نام کاربری)</span>
                </label>
                <input
                    type="number"
                    min={0}
                    name="phoneNumber"
                    defaultValue={phoneNumberParam || ""}
                    className="w-full px-3 py-2 my-2 bg-stone-50/60 text-gray-500 font-EstedadMedium focus-within:bg-stone-50 duration-150 border rounded-lg shadow-sm outline-none placeholder:text-gray-400 focus-within:ring-1 focus-within:ring-gray-500 focus-within:border-gray-500 ease-in-out"
                />
            </div>
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
                <button className="w-full bg-CarbonicBlue-500  px-4 py-2 border font-EstedadMedium text-white border-CarbonicBlue-600 hover:bg-CarbonicBlue-300 hover:grayscale delay-150 duration-150 ease-in-out rounded-lg cursor-pointer drop-shadow-xl shadow-Purple-500">
                    ورود
                </button>
            )}
        </form>
    )
}

export default LoginFrom