import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Failed = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const exception = queryParams.get("exception");

  const [countdown, setCountdown] = useState(50);
  const nav = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    if (countdown === 0) {
      nav("/");
    }
    return () => clearInterval(timer);
  }, [countdown, nav]);

  return (
    <div className=" w-full h-[90vh] bg-white flex flex-col justify-center items-center">
      <div className="bg-stone-200 rounded-xl border-2 p-5 border-red-500 shadow-xl max-w-xl">
        <h1 className="font-EstedadMedium text-center text-2xl text-red-700">
          پرداخت ناموفق
        </h1>
        <p className="text-center p-2">{exception}</p>
        <ol className="flex flex-col leading-relaxed justify-center lg:justify-between  text-justify font-EstedadMedium p-4  bg-red-600 text-white my-10 rounded-lg shadow-lg space-y-4">
          <li className="leading-relaxed">
            درصورت کسر مبلغ از حساب بانکی شما، تا 72 ساعت آینده به حساب شما عودت
            میگردد
          </li>
          <li className="leading-relaxed">
            درصورت ناموفق بودن پرداخت مبلغی به حساب شرکت واریز نشده است
          </li>
          <li className="leading-relaxed">
            برای اطلاعات بیشتر با پشتیبانی تماس حاصل فرمایید
          </li>
          <li>شما در {countdown} ثانیه به صفحه اصلی هدایت خواهید شد.</li>
        </ol>
      </div>
    </div>
  );
};

export default Failed;
