import { useRegister } from "@hooks/useAuth";
import JumpingDots from "@components/JumpingDots";

const RegisterForm = ({ phoneNumberParam, redirect }: { phoneNumberParam: string | null, redirect: string | null | undefined }) => {
    const { submitRegister, isPending } = useRegister();

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        submitRegister(e, redirect);
    };

    const inputClassName = `
    w-full bg-white/60 rounded py-2 border
    border-CarbonicBlue-500 placeholder:indent-2
    text-sm font-EstedadMedium placeholder:font-EstedadMedium
    p-1.5 text-gray-800 placeholder:text-gray-600
  `;

    return (

        <form
            onSubmit={handleRegisterSubmit}
            className="w-full flex flex-col justify-center items-center gap-0.5 space-y-1.5">
            <input
                name="name"
                type="text"
                placeholder="نام و نام خانوادگی"
                className={inputClassName}
            />
            <input
                defaultValue={phoneNumberParam || ""}
                type="tel"
                name="phoneNumber"
                placeholder="شماره موبایل"
                className={inputClassName}
            />
            <input
                name="province"
                placeholder="استان"
                className={inputClassName}
            />
            <input
                type="text"
                name="city"
                placeholder="شهرستان"
                className={inputClassName}
            />
            <textarea
                name="address"
                placeholder="آدرس"
                className={inputClassName}
                rows={4}
            />
            <button
                disabled={isPending}
                type="submit"
                className={`w-full ${isPending ? 'pointer-events-none bg-purple-500 hover:bg-purple-600' : 'bg-CarbonicBlue-500 hover:bg-CarbonicBlue-600'}  text-white py-2 rounded  transition-colors font-EstedadMedium`}
            >
                {isPending ? <JumpingDots color="bg-white" /> : 'ثبت اطلاعات'}
            </button>
        </form>

    )
}

export default RegisterForm