import { Link } from "react-router-dom";
import { toPersianDigits } from "@utils/numeralHelpers";

const TopBar = () => {
  return (
    <Link
      to="/offered-products"
      className="
      hidden md:flex
      w-full min-h-[50px] bg-gradient-to-r from-[#368cd8] to-[#082d60]  items-center justify-center flex-wrap md:py-2 xl:py-4 px-2 z-[102] shadow-lg"
    >
      <div className="text-center">
        <h1 className="text-white text-lg md:text-base font-semibold leading-relaxed">
          <span>تخفیف‌های شگفت انگیز </span>
          <span className="text-[#aedaf9] inline-block animate-pulse">
            مد و پوشاک {toPersianDigits(new Date().getFullYear())}
          </span>
        </h1>
      </div>
    </Link>
  );
};

export default TopBar;
