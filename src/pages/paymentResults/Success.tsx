import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Success = () => {
  const { transID } = useParams();
  const nav = useNavigate();
  const [countdown, setCountdown] = useState(50);

  useEffect(() => {
    if (!transID) nav('/');

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [transID, nav]);

  useEffect(() => {
    if (countdown === 0) {
      nav('/unconfirmed-orders', { replace: true });
    }
  }, [countdown, nav]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-blue-200"
      >
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4 font-EstedadMedium">
          پرداخت موفق
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center mb-6">
          <p className="text-gray-700 font-EstedadMedium">
            کد رهگیری شما: 
            <motion.span
              className="font-bold text-blue-600 underline underline-offset-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {transID}
            </motion.span>
          </p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md space-y-4">
          <ul className="space-y-3 text-gray-700 font-EstedadMedium">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              ممنون بابت پرداخت شما.
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              شما در{' '}
              <motion.span
                className="font-bold text-blue-600"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                {countdown}
              </motion.span>{' '}
              ثانیه به صفحه سفارشات هدایت خواهید شد.
            </li>
          </ul>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => nav('/unconfirmed-orders', { replace: true })}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-EstedadMedium"
          >
            رفتن به صفحه سفارشات
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;