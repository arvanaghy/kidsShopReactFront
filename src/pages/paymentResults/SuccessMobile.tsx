import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SuccessMobile = () => {
  const { transID } = useParams();
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    if (!transID) window.location.href = "myelectroshop24app://open";

    const intervalId = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = "myelectroshop24app://open";
    }
  }, [countdown]);

  return (
    <div className=" w-full h-[90vh]  flex flex-col justify-center items-center bg-stone-100">
      <div className=" bg-CarbonicBlue-500 rounded-xl border-2 border-CarbonicBlue-500/40 p-5 shadow-xl">
        <div className="font-EstedadExtraBold py-4 text-center leading-relaxed tracking-widest text-2xl text-white">
          پرداخت موفق
        </div>
        <div className="font-EstedadMedium py-4 bg-white leading-relaxed tracking-widest rounded-xl text-center text-black">
          کد رهگیری شما :
          <span className="animate-pulse underline underline-offset-2">
            {transID}
          </span>
        </div>
        <ol className="flex flex-col justify-center lg:justify-between  text-justify font-EstedadMedium p-4 bg-white/40 my-10 rounded-lg shadow-lg space-y-4  ">
          <li className="leading-relaxed tracking-widest py-1.5 ">
            ممنون بابت پرداخت شما.
          </li>
          <li className="leading-relaxed tracking-widest py-1.5">
            شما در {countdown} ثانیه به برنامه موبایلی هدایت خواهید شد.
          </li>
          <li className="leading-relaxed tracking-widest py-1.5 flex justify-center ">
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

export default SuccessMobile;
