import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-gray-200"
      >
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4 font-EstedadMedium">
          پرداخت ناموفق
        </h1>
        <p className="text-center text-gray-600 mb-8 font-EstedadMedium">
          {exception || "خطایی در پردازش پرداخت رخ داده است."}
        </p>
        <div className="bg-red-50 border-r-4 border-red-500 p-6 rounded-lg shadow-md space-y-4">
          <ul className="space-y-3 text-gray-700 font-EstedadMedium">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              درصورت کسر مبلغ از حساب بانکی شما، تا ۷۲ ساعت آینده به حساب شما عودت می‌گردد.
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              درصورت ناموفق بودن پرداخت، مبلغی به حساب شرکت واریز نشده است.
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              برای اطلاعات بیشتر با پشتیبانی تماس حاصل فرمایید.
            </li>
          </ul>
          <p className="text-center text-sm text-gray-500 mt-4">
            شما در{" "}
            <motion.span
              className="font-bold text-red-600"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              {countdown}
            </motion.span>{" "}
            ثانیه به صفحه اصلی هدایت خواهید شد.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => nav("/")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-EstedadMedium"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Failed;