import React, { useState } from 'react';
import JumpingDots from '@components/JumpingDots';
import { useOtpOnCart, useRegisterOnCart, useResendSMS } from '@hooks/useAuth';

const UserRegistrationFormOnShoppingCart = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [formResult, setFormResult] = useState(404);

    const { submitRegisterOnCart, isPending } = useRegisterOnCart();
    const { otpVerify, isPending: isOtpPending } = useOtpOnCart();
    const { resendSMS, isPending: isResendPending } = useResendSMS();

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setPhoneNumber(e.currentTarget.phoneNumber.value);
        const resultStatusCode = await submitRegisterOnCart(e);
        setFormResult(resultStatusCode);
    };

    const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const status = await otpVerify(e);
        switch (status) {
            case 202:
                setFormResult(202);
                break;
        }
    };

    const handleResendSMS = async () => {
        await resendSMS(phoneNumber);
        setFormResult(202);
    };

    const inputClassName = `
    w-full bg-white/60 rounded py-2 border
    border-CarbonicBlue-500 placeholder:indent-2
    text-sm font-EstedadMedium placeholder:font-EstedadMedium
    p-1.5 text-gray-800 placeholder:text-gray-600
  `;


    if (formResult === 200 || formResult === 201) {
        return (
            <div className="flex flex-col gap-2">
                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-2">
                    <input
                        type="text"
                        name="otp"
                        placeholder="کد تایید پیامک شده"
                        className={inputClassName}
                    />
                    <input type="hidden" name="phoneNumber" value={phoneNumber} />
                    <button
                        disabled={isPending}
                        type="submit"
                        className="w-full bg-CarbonicBlue-500 text-white py-2 rounded hover:bg-Purple-500 transition-colors font-EstedadMedium"
                    >
                        {isPending ? <JumpingDots /> : 'تایید کد'}
                    </button>
                </form>
                <div className="w-full h-0.5 bg-gray-300"></div>
                <div className="flex flex-row gap-2">

                    <button
                        onClick={() => setFormResult(404)}
                        className="w-full bg-gray-300 text-black py-1 rounded hover:bg-gray-600 hover:text-white transition-colors text-sm font-EstedadLight"
                    >
                        {isPending ? <JumpingDots /> : 'تغییر اطلاعات تماس'}
                    </button>
                    {/* resend sms */}
                    <button
                        type="button"
                        className="w-full bg-gray-300 text-black py-1 rounded hover:bg-gray-600 hover:text-white transition-colors text-sm font-EstedadLight"
                        onClick={handleResendSMS}
                        disabled={isPending}
                    >
                        {isPending ? <JumpingDots /> : 'ارسال مجدد پیامک'}

                    </button>
                </div>
            </div>
        );
    }

    if (formResult === 404) {
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
                    className="w-full bg-CarbonicBlue-500 text-white py-2 rounded hover:bg-CarbonicBlue-600 transition-colors font-EstedadMedium"
                >
                    {isPending ? <JumpingDots color='bg-white' /> : 'ثبت اطلاعات'}
                </button>
            </form>
        );
    }
};

export default UserRegistrationFormOnShoppingCart;