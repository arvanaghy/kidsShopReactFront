/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { userPriceSelect } from "@utils/userPriceHelper";
import { useContext } from "react";
import UserContext from "@context/UserContext";
import { DecimalToHexConverter } from "../utils/DecimalToHexConverter";

const ProductCard = ({ item }) => {
  const { user } = useContext(UserContext);

  return (
    <div
      className="rounded-lg  
      w-full
      h-full
      col-span-12 
      sm:col-span-6
      md:col-span-6  
      lg:col-span-3 
      2xl:col-span-3 
      "
    >
      <Link
        to={`/product/${Math.floor(item?.Code)}`}
        className="relative flex flex-col justify-center items-center 
        w-full h-fit
        hover:grayscale
        rounded-lg
      duration-300 ease-in-out transition-all "
      >
        <img
          src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
            item?.GCode
          )}/${Math.floor(item?.SCode)}/${item?.PicName}.webp`}
          alt={item?.Name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";
          }}
          className="w-full rounded-t-lg object-scale-down h-fit"
        />
        <h2
          className="text-center py-1 z-30 absolute top-0 text-white left-0 font-EstedadLight bg-CarbonicBlue-500/80  line-clamp-1 px-2 rounded-br-xl
      rounded-tl-xl
      text-xs
      lg:text-sm
      
      "
        >
          {item?.GName}
        </h2>
        <h2
          className="text-center py-1 z-30 absolute top-0 text-white right-0 font-EstedadLight bg-CarbonicBlue-500/80  line-clamp-1 px-1.5 rounded-bl-xl
      text-xs
      lg:text-sm
      
      "
        >
          {item?.SName}
        </h2>
      </Link>

      <div className="rounded-b-lg px-3 z-50 flex flex-col font-EstedadMedium w-full bg-gray-300/90 text-white">
        <div className="flex flex-col justify-evenly items-center w-full">
          <Link
            to={`/product/${Math.floor(item?.Code)}`}
            className="z-50  text-justify line-clamp-2 leading-relaxed py-1.5  
          text-xs 
          lg:text-sm lg:font-EstedadExtraBold
          2xl:text-lg
          text-CarbonicBlue-500
          hover:text-CarbonicBlue-700 transation-all duration-300 ease-in-out
          "
          >
            {/* {item?.Code} */}
            {item?.Name}
          </Link>
          <div className="flex flex-row items-center gap-2 z-50 text-sm py-2 ">
            <span className="flex text-green-700 flex-row items-center gap-1">
              {formatCurrencyDisplay(userPriceSelect(item, user))}
              <span className="text-xs">ریال</span>
            </span>
          </div>
          <div className=" w-full flex flex-col items-center gap-2 z-50 text-sm py-2">
            {item?.product_size_color?.length > 0 &&
              item?.product_size_color?.map((product_size_color_item, idx) => (
                <div
                  className="w-full flex flex-row items-center
                justify-between gap-2"
                  key={idx}
                >
                  <p>{product_size_color_item?.SizeNum}</p>
                  <div className="flex flex-row items-center justify-center gap-2 ">

                    <p>{product_size_color_item?.ColorName}</p>
                    <p
                      className="w-5 h-5 flex flex-row items-center justify-center rounded-full"
                      style={{
                        backgroundColor: DecimalToHexConverter(
                          product_size_color_item?.ColorCode
                        ),
                      }}
                    ></p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
