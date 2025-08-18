import { AuthService } from "@services/AuthService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ phoneNumberParam, redirect }: { phoneNumberParam: string, redirect: string }) => {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    return (
        <form
            onSubmit={(e) => AuthService.submitRegister(e, redirect, navigate, setIsPending)}
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
            {isPending ? (<button disabled className="w-full text-white  px-4 py-2 border font-EstedadMedium bg-gray-800 border-CarbonicBlue-600 hover:bg-CarbonicBlue-300 hover:scale-95 duration-150 ease-in-out rounded-lg cursor-pointer drop-shadow-xl shadow-Purple-500">
                درحال پردازش
            </button>
            ) :
                (<button type="submit" className="w-full text-white  px-4 py-2 border font-EstedadMedium bg-CarbonicBlue-500 border-CarbonicBlue-600 hover:bg-CarbonicBlue-300 hover:scale-95 duration-150 ease-in-out rounded-lg cursor-pointer drop-shadow-xl shadow-Purple-500">
                    عضویت
                </button>
                )

            }

        </form>
    )
}

export default RegisterForm