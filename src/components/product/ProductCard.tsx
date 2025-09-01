/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { RGBtoHexConverter } from "@utils/RGBtoHexConverter";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { toPersianDigits } from "@utils/numeralHelpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRestroom } from "@fortawesome/free-solid-svg-icons";
import { useFavoriteStore } from "@store/FavoriteStore";
import { useCompareStore } from "@store/CompareStore";
import Unit from "@components/Unit";

const ProductCard = ({ item = {}, colSpan = "col-span-4" }) => {
  const { favorite, toggleFavorite } = useFavoriteStore();

  const { compareList, toggleCompare } = useCompareStore();


  const isFavorite = favorite?.some(
    (f) => Math.floor(f.Code) === Math.floor(item.Code)
  );
  const isCompared = compareList.some(
    (p) => Math.floor(p.Code) === Math.floor(item.Code)
  );
  const uniqueColorCodes = [
    ...new Map(
      item?.product_size_color
        ?.filter((item) => item.Mande > 0)
        .map((item) => [
          item.ColorCode,
          {
            ColorCode: item?.ColorCode,
            ColorName: item?.ColorName,
            RGB: item?.RGB,
          },
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
      className={`${colSpan} rounded-lg h-full xl:flex-shrink-0 flex flex-col overflow-hidden group`}
    >
      {/* Top Section: Image and Labels */}
      <div className="relative flex flex-col justify-center items-center w-full h-64 rounded-t-lg duration-300 ease-in-out transition-all">
        <img
          src={`${import.meta.env.VITE_CDN_URL}/products-image/webp/${item?.PicName
            }.webp`}
          alt={item?.Name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = import.meta.env.VITE_NO_IMAGE_URL;
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
          <p className="w-full line-clamp-1">{item?.SName}</p>
        </h2>
        <div className="absolute top-8 left-0 flex flex-col gap-1 px-1">
          <button
            onClick={() => toggleFavorite(item)}
            className="text-xl text-red-500 hover:scale-110 transition-transform"
          >
            <FontAwesomeIcon
              icon={isFavorite ? faSolidHeart : faHeart}
              className={isFavorite ? "text-red-600" : "text-gray-400"}
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
      <Link
        title={item?.Name}
        to={`/product/${Math.floor(item?.Code)}`}
        className="rounded-b-lg px-3 flex flex-col font-EstedadMedium w-full bg-gray-300/90 text-white flex-grow
         hover:bg-gray-400/90 duration-300 ease-in-out transition-all
        "
      >
        <div className="flex flex-col justify-between items-center w-full h-full">
          <p className="z-20 text-justify line-clamp-2 leading-relaxed py-1.5 text-xs lg:text-sm lg:font-EstedadExtraBold 2xl:text-lg text-CarbonicBlue-500 hover:text-CarbonicBlue-700 transition-all duration-300 ease-in-out">
            {item?.Name}
          </p>
          <div className="flex flex-row items-center gap-2 z-20 text-sm py-2">
            <span className="flex text-green-700 flex-row items-center gap-1">
              {formatCurrencyDisplay(item?.SPrice)}
              <Unit />
            </span>
          </div>
          <div className="w-full flex flex-row flex-wrap justify-between items-center gap-2">
            {uniqueColorCodes?.length > 0 ? (
              uniqueColorCodes.map((uniqueColorCodes_item, idx) => (
                <div
                  key={idx}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <p
                    className="w-5 h-5 rounded-full"
                    style={{
                      backgroundColor: RGBtoHexConverter(
                        uniqueColorCodes_item?.RGB
                      ),
                    }}
                  ></p>
                  <p className="text-xs tracking-wide text-gray-800 ">
                    {uniqueColorCodes_item?.ColorName}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-5"></div>
            )}
          </div>
          {/* Color and Size Section with Fixed Height */}

          <div className="w-full flex flex-row flex-wrap items-center justify-between gap-2 text-sm py-2">
            {uniqueSizeNums?.length > 0 ? (
              uniqueSizeNums.map((uniqueSizeNums_item, idx) => (
                <div
                  key={idx}
                  className="flex flex-row items-center bg-slate-500 px-2 py-1 rounded-md"
                >
                  {toPersianDigits(uniqueSizeNums_item)}
                </div>
              ))
            ) : (
              <div className="h-5"></div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
