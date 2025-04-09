import { useContext, useEffect, useState } from "react";
import UserContext from "@context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileLayout from "./ProfileLayout";
import toast from "react-hot-toast";

const EditInfo = () => {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user?.Name || "");
  const [tell, setTell] = useState(user?.Tel || "");
  const [address, setAddress] = useState(user?.Address || "");
  const [company, setCompany] = useState(user?.StorName || "");
  const [job, setJob] = useState(user?.CTitle || "");
  const [isPending, setIsPending] = useState(false);
  const navigateTo = useNavigate();

  const navigate = useNavigate();

  const submitfrom = async (e) => {
    setIsPending(true);
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "https://kidsshopapi.electroshop24.ir/api/v1/edit-user-info",
        {
          Name: name,
          Phone: tell,
          Address: address,
          Company: company,
          Job: job,
        },
        {
          headers: {
            Authorization: `Bearer ${user.UToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      if (status !== 202) throw new Error(data?.message);
      setIsPending(false);
      updateUser(data?.result);
      toast.success(data?.message);
      navigate("/profile");
    } catch (error) {
      setIsPending(false);
      toast.error(
        " تغییر اطلاعات کاربر " +
          (error?.response?.data?.message || error?.message) || "خطا در اتصال"
      );
    } finally {
      setIsPending(false);
    }
  };
  useEffect(() => {
    if (
      !user ||
      !user?.UToken ||
      user?.UToken === null ||
      user?.UToken === ""
    ) {
      toast.error("برای مشاهده این صفحه باید وارد شوید");
      navigateTo("/Login");
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-[90vh] ">
      <div className="flex lg:col-span-2 lg:bg-CarbonicBlue-500  lg:py-10 -mt-10  ">
        <ProfileLayout />
      </div>
      <div className="col-span-12 lg:col-span-8 font-EstedadMedium flex items-center justify-center ">
        <form onSubmit={submitfrom} className="space-y-10 max-w-md w-full p-5">
          <div className="flex flex-col flex-wrap items-center justify-around w-full space-y-3 ">
            <label htmlFor="name">
              نام و نام خانوادگی
              <span className="text-Amber-500">*</span>
            </label>
            <input
              className="py-3 px-3 border border-gray-400 rounded-lg w-72"
              type="text"
              value={name}
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="address">
              آدرس
              <span className="text-Amber-500">*</span>
            </label>
            <textarea
              className="p-3 border border-gray-400 rounded-lg w-72"
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              value={address}
            ></textarea>

            <label htmlFor="tell">شماره تلفن ثابت</label>
            <input
              className="py-3 px-3 border border-gray-400 rounded-lg w-72"
              type="text"
              value={tell}
              name="tell"
              id="tell"
              onChange={(e) => setTell(e.target.value)}
            />

            <label htmlFor="company">نام مغازه یا تعمیرگاه</label>
            <input
              className="py-3 px-3 border border-gray-400 rounded-lg w-72"
              type="text"
              name="company"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <label htmlFor="job">عنوان شغلی</label>
            <input
              className="py-3 px-3 border border-gray-400 rounded-lg w-72"
              type="text"
              name="job"
              id="job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />

            {isPending ? (
              <button
                type="button"
                className="bg-Purple-500 rounded-lg  p-4 m-3 flex flex-row cursor-not-allowed text-white "
                disabled={true}
              >
                درحال پردازش
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 text-center rounded-lg text-white font-EstedadMedium bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 transation-all duration-500 ease-in-out shadow shadow-black hover:shadow-black/60 "
              >
                تایید ویرایش اطلاعات
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfo;
