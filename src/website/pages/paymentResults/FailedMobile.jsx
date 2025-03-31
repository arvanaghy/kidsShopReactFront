import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FailedMobile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const exception = queryParams.get("exception");

  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    if (countdown === 0) {
      window.location.href = "myelectroshop24app://open";
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className=" w-full h-[90vh] bg-white flex flex-col justify-center items-center">
      <div className="bg-stone-200 rounded-xl border-2 p-5 border-red-500 shadow-xl max-w-xl">
        <h1 className="font-EstedadExtraBold py-4 tracking-widest leading-relaxed text-center text-xl text-red-700">
          پرداخت ناموفق
        </h1>
        <p className="text-red-500 font-bold text-center p-2 tracking-widest leading-relaxed border border-red-500 rounded-lg ">
          {exception}
        </p>
        <ol className="flex flex-col leading-relaxed justify-center lg:justify-between  text-justify font-EstedadMedium p-4  bg-red-600 text-white my-10 rounded-lg shadow-lg space-y-4">
          <li className="leading-relaxed">
            درصورت کسر مبلغ از حساب بانکی شما، تا 72 ساعت آینده به حساب شما عودت
            میگردد
          </li>
          <li className="leading-relaxed tracking-widest py-1.5 ">
            درصورت ناموفق بودن پرداخت مبلغی به حساب شرکت واریز نشده است
          </li>
          <li className="leading-relaxed tracking-widest  py-1.5">
            برای اطلاعات بیشتر با پشتیبانی تماس حاصل فرمایید
          </li>
          <li className="leading-relaxed tracking-widest  py-1.5">
            شما در {countdown} ثانیه به برنامه موبایلی هدایت خواهید شد.
          </li>
          <li className="leading-relaxed tracking-widest  py-1.5 w-full flex justify-center  ">
            <button
              onClick={() =>
                (window.location.href = "myelectroshop24app://open")
              }
              className="text-white bg-gradient-to-r from-stone-500 via-stone-600 to-stone-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-stone-300 bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              بازگشت به برنامه موبایلی
            </button>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default FailedMobile;
