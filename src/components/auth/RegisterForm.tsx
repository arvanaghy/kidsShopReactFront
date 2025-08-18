import { useNavigate } from "react-router-dom";
import { useRegister } from "@hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = ({ phoneNumberParam, redirect }: { phoneNumberParam: string, redirect: string }) => {
    const { submitRegister, isPending } = useRegister();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        submitRegister(e, redirect, (url: string) => navigate(url));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="px-4 max-w-md mx-auto space-y-4 w-full font-EstedadMedium "
        >
            <label className="my-2 text-right block">
                نام و نام خانوادگی
                <span className="text-Amber-500 font-EstedadMedium">*</span>
            </label>
            <input
                type="text"
                name="name"
                className="w-full px-3 py-2 bg-white/60 text-CarbonicBlue-500 focus-within:bg-white duration-150 border rounded-lg shadow-sm outline-none"
            />

            <label className="my-2 text-right block ">
                شماره موبایل
                <span className="text-Amber-500 font-EstedadMedium">*</span>
            </label>
            <input
                defaultValue={phoneNumberParam}
                min={0}
                type="number"
                name="phoneNumber"
                className="w-full px-3 py-2 bg-white/60 text-CarbonicBlue-500 focus-within:bg-white duration-150 border rounded-lg shadow-sm outline-none"
            />

            <label className="my-2 text-right block">
                آدرس
                <span className="text-Amber-500 font-EstedadMedium">*</span>
            </label>
            <textarea
                name="address"
                className="w-full px-3 py-2 bg-white/60 text-CarbonicBlue-500 focus-within:bg-white duration-150 border rounded-lg shadow-sm outline-none"
                rows={4}
            ></textarea>
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
                    ثبت نام
                </button>
                )

            }

        </form>
    )
}

export default RegisterForm