import React from 'react';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50">
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white shadow-sm">
        {/* آیکون سبد خرید */}
        <svg 
          className="w-16 h-16 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <h2 className="text-lg font-EstedadExtraBold text-gray-800">سبد خرید شما خالی است</h2>
        <p className="text-sm text-gray-500 font-EstedadMedium">محصولات مورد علاقه‌تون رو اضافه کنید و خرید رو شروع کنید!</p>
        <a 
          href="/products" 
          className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-EstedadMedium tracking-widest rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          مشاهده محصولات
        </a>
      </div>
    </div>
  );
};

export default EmptyCart;