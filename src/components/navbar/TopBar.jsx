import React from "react";

const TopBar = () => {
  return (
    <a
      href="https://nahalbabyshop.com/shop/?sale_products=on"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full min-h-[50px] bg-gradient-to-r from-[#368cd8] to-[#082d60] flex items-center justify-center flex-wrap py-4 px-2 z-[102] shadow-lg"
    >
      <div className="text-center">
        <h1 className="text-white text-lg md:text-xl font-semibold leading-relaxed">
          <span>تخفیف‌های شگفت انگیز </span>
          <span className="text-[#aedaf9] inline-block animate-pulse">
            مد و پوشاک 2025
          </span>
        </h1>
      </div>
    </a>
  );
};

export default TopBar;
