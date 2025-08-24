import { Link } from "react-router-dom";
import secondLogo from "@assets/images/secondLogo.png";

import CallButton from "@components/navbar/CallButton";
import DesktopNavbarSearch from "@components/navbar/DesktopNavbarSearch";
import LoginRegisterSection from "@components/navbar/LoginRegisterSection";
import ShoppingCartMenuItem from "@components/navbar/ShoppingCartMenuItem";
import NavBarItems from "@components/navbar/NavBarItems";
import CFOBSection from "@components/navbar/CFOBSection";
import { useNavbarVisibility } from "@hooks/useMenu";

const TopNavBar = () => {
  const isNavbarVisible = useNavbarVisibility(false, 600);

  return (
    <header
      className={`hidden md:block sticky top-0 shadow-md shadow-gray-600/70 z-50 font-EstedadMedium bg-gray-100 w-full text-gray-600
        transition-all duration-700 ease-in-out
        xl:p-6
        xl:space-y-8
        `}
      style={{ zIndex: 9999 }}
    >
      <section
        className={
          `
           ${isNavbarVisible ? "" : "hidden"}
           w-full grid grid-cols-12 items-center
        transition-all duration-700 ease-in-out
        md:justify-center xl:justify-between md:p-2 xl:p-0 md:text-xs
      xl:text-sm`}
      >
        <div className="w-full md:col-span-3 xl:col-span-3">
          <Link
            to="/"
            className="w-full flex flex-row items-center justify-center"
          >
            <img
              src={secondLogo}
              alt="لوگو کیدزشاپ"
              className="
              w-36
              2xl:w-52
              xl:w-48
              lg:w-44
              md:w-40
            object-scale-down hover:grayscale duration-300 transition-all
            ease-in-out
            "
            />
          </Link>
        </div>
        <DesktopNavbarSearch />
        <div className="md:col-span-5 xl:col-span-4 w-full flex flex-row items-center justify-end md:gap-x-5 xl:gap-x-4">
          <div className="flex flex-row items-center justify-center gap-x-2">
            <CallButton />
          </div>
          <LoginRegisterSection />
          <ShoppingCartMenuItem />
        </div>
      </section>

      <section className="w-full grid grid-cols-12 items-center justify-between text-base">
        <NavBarItems />
        <div className="w-full md:col-span-12 lg:col-span-4 xl:col-span-3 flex flex-row items-center md:justify-end xl:justify-end md:gap-x-5 md:px-2 xl:px-0 xl:gap-x-4 md:pb-2 lg:pb-0 md:text-xs 2xl:text-xl">
          <CFOBSection />
        </div>
      </section>
    </header>
  );
};

export default TopNavBar;
