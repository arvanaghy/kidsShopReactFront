import { useUserStore } from "@store/UserStore";
import JumpingDots from "@components/JumpingDots";
import { useEditInfo } from "@hooks/useProfile";
import React from "react";
const EditInfoForm = () => {

    const { user, updateUser } = useUserStore();
    const { updateUserInfo, isPending } = useEditInfo()


    const handleSubmit = async (e) => {
        updateUserInfo(e, '' ,user, updateUser)
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-10 mx-auto max-w-md w-full p-1 lg:p-5"
        >
            <div className="flex flex-col flex-wrap items-center justify-around w-full space-y-3 ">
                <label htmlFor="name">
                    نام و نام خانوادگی
                    <span className="text-Amber-500">*</span>
                </label>
                <input
                    className="py-3 px-3 border border-gray-400 rounded-lg w-72"
                    type="text"
                    defaultValue={user?.Name || ""}
                    name="name"
                    id="name"
                />
                <label htmlFor="address">
                    آدرس
                    <span className="text-Amber-500">*</span>
                </label>
                <textarea
                    className="p-3 border border-gray-400 rounded-lg w-72"
                    rows={4}
                    name="address"
                    defaultValue={user?.Address || ""}
                ></textarea>
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-8 py-3 text-center rounded-lg text-white font-EstedadMedium bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 transation-all duration-500 ease-in-out shadow shadow-black hover:shadow-black/60 "
                >
                    {isPending ? <JumpingDots /> : (

                        <span>
                            تایید ویرایش اطلاعات
                        </span>
                    )}
                </button>

            </div>
        </form>
    )
}

export default EditInfoForm