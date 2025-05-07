/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { userPriceSelect } from "@utils/userPriceHelper";
import { useContext } from "react";
import UserContext from "@context/UserContext";
import { DecimalToHexConverter } from "../utils/DecimalToHexConverter";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRestroom } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ item, colSpan = "col-span-4" }) => {
  const { user } = useContext(UserContext);
  const { favourite, toggleFavourite } = useContext(UserContext);
  const isFavourite = favourite?.some((f) => f.Code === item.Code);
  const { compareList, toggleCompare } = useContext(UserContext);
  const isCompared = compareList.some((p) => p.Code === item.Code);
  const uniqueColorCodes = [
    ...new Map(
      item?.product_size_color
        ?.filter((item) => item.Mande > 0)
        .map((item) => [
          item.ColorCode,
          { ColorCode: item.ColorCode, ColorName: item.ColorName },
        ])
    ).values(),
  ];

  const uniqueSizeNums = [
    ...new Set(
      item?.product_size_color
        ?.filter((item) => item.Mande > 0)
        .map((item) => item.SizeNum)
    ),
  ];

  return (
    <div
      className={`${colSpan} rounded-lg w-full h-full xl:flex-shrink-0 flex flex-col overflow-hidden`}
    >
      {/* Top Section: Image and Labels */}
      <div className="relative flex flex-col justify-center items-center w-full h-64 hover:grayscale rounded-t-lg duration-300 ease-in-out transition-all">
        <img
          src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${item?.PicName}.webp`}
          alt={item?.Name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";
          }}
          className="w-full rounded-t-lg object-scale-down h-full"
        />

        <h2 className="w-1/2 text-center  z-30 absolute top-0 left-0 text-white font-EstedadLight bg-CarbonicBlue-500/80 px-2  rounded-tl-xl text-xs py-1 lg:text-sm overflow-hidden opacity-80">
          <p className="w-full  line-clamp-1">{item?.GName}</p>
        </h2>
        <h2
          className="text-center w-1/2  z-30 absolute top-0 text-white right-0 font-EstedadLight bg-CarbonicBlue-500/80 line-clamp-1 px-1.5  text-xs lg:text-sm py-1
         opacity-80
        "
        >
          <p className="w-full   line-clamp-1">{item?.SName}</p>
        </h2>
        <div className="absolute top-8 left-0 flex flex-col gap-1 px-1">
          <button
            onClick={() => toggleFavourite(item)}
            className="text-xl text-red-500 hover:scale-110 transition-transform"
          >
            <FontAwesomeIcon
              icon={isFavourite ? faSolidHeart : faHeart}
              className={isFavourite ? "text-red-600" : "text-gray-400"}
            />
          </button>
          <button
            onClick={() => toggleCompare(item)}
            className="text-xl text-red-500 hover:scale-110 transition-transform"
          >
            <FontAwesomeIcon
              icon={faRestroom}
              className={isCompared ? "text-red-600" : "text-gray-400"}
            />
          </button>
        </div>
      </div>

      {/* Bottom Section: Details */}
      <div className="rounded-b-lg px-3 flex flex-col font-EstedadMedium w-full bg-gray-300/90 text-white flex-grow">
        <div className="flex flex-col justify-between items-center w-full h-full">
          <Link
            to={`/product/${Math.floor(item?.Code)}`}
            className="z-50 text-justify line-clamp-2 leading-relaxed py-1.5 text-xs lg:text-sm lg:font-EstedadExtraBold 2xl:text-lg text-CarbonicBlue-500 hover:text-CarbonicBlue-700 transition-all duration-300 ease-in-out"
          >
            {item?.Name}
          </Link>
          <div className="flex flex-row items-center gap-2 z-50 text-sm py-2">
            <span className="flex text-green-700 flex-row items-center gap-1">
              {formatCurrencyDisplay(userPriceSelect(item, user))}
              <span className="text-xs">ریال</span>
            </span>
          </div>
          {/* Color and Size Section with Fixed Height */}
          {(uniqueColorCodes?.length > 0 || uniqueSizeNums?.length > 0) && (
            <div className="w-full flex flex-row flex-wrap items-center justify-between gap-4 text-sm py-2">
              {uniqueColorCodes?.length > 0 ? (
                uniqueColorCodes.map((uniqueColorCodes_item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row items-center justify-center gap-2"
                  >
                    <p>{uniqueColorCodes_item?.ColorName}</p>
                    <p
                      className="w-5 h-5 rounded-full"
                      style={{
                        backgroundColor: DecimalToHexConverter(
                          uniqueColorCodes_item?.ColorCode
                        ),
                      }}
                    ></p>
                  </div>
                ))
              ) : (
                <div className="h-5"></div> // Placeholder to maintain height
              )}
              {uniqueSizeNums?.length > 0 ? (
                uniqueSizeNums.map((uniqueSizeNums_item, idx) => (
                  <div key={idx}>
                    <p>{uniqueSizeNums_item}</p>
                  </div>
                ))
              ) : (
                <div className="h-5"></div> // Placeholder to maintain height
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
