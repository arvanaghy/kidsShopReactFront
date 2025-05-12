import React, { useContext } from "react";
import UserContext from "@context/UserContext";
import { Link } from "react-router-dom";
import { DecimalToHexConverter } from "../utils/DecimalToHexConverter";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ComparePage = () => {
  const { compareList, updateCompareList } = useContext(UserContext);

  const clearCompare = () => {
    updateCompareList([]);
  };

  return (
    <div className="p-0.5 md:p-4 min-h-screen bg-white text-black font-EstedadLight">
      <h1 className="w-fit text-center  text-xl lg:text-3xl font-EstedadExtraBold py-4 lg:text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
        مقایسه محصولات
      </h1>
      {compareList.length === 0 ? (
        <p>محصولی برای مقایسه انتخاب نشده است</p>
      ) : (
        <div className="w-full flex flex-col justify-center items-center ">
          <div
            className="w-full overflow-x-auto py-10 grid grid-cols-12
          items-start justify-center lg:gap-6 gap-1 md:gap-3 "
          >
            {compareList.map((item, index) => (
              <div
                key={index}
                className="relative w-full col-span-3 flex flex-col justify-center items-start lg:space-y-6 space-y-1
                md:space-y-3 border-x-2"
              >
                {/* sarvsabztabriz@ */}
                <img
                  src={`https://api.kidsshop110.ir/products-image/webp/${item?.PicName}.webp`}
                  alt={item?.Name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://api.kidsshop110.ir/No_Image_Available.jpg";
                  }}
                  className="w-full rounded-t-lg object-contain aspect-square"
                />
                <button>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="absolute top-2 left-2 text-CarbonicBlue-500"
                    onClick={() => {
                      updateCompareList(
                        compareList.filter(
                          (p) => Math.floor(p.Code) !== Math.floor(item.Code)
                        )
                      );
                    }}
                  />
                </button>
                <Link
                  to={`/product/${item?.Code}`}
                  className="w-full text-center font-EstedadExtraBold
                  xl:text-lg text-sm md:text-base  text-CarbonicBlue-500 hover:text-Purple-500 leading-relaxed
                  "
                >
                  {item?.Name}
                </Link>
                <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight ">
                  {item?.Comment}
                </p>
                <div className="w-full flex flex-col justify-start items-center xl:gap-3 gap-0.5 ">
                  {item?.product_size_color
                    ?.filter((item) => item.Mande > 0)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="w-full flex flex-row justify-between items-center flex-wrap"
                      >
                        <div className=" flex flex-row justify-start items-center lg:gap-x-2 gap-x-0.5 flex-wrap">
                          <p
                            className="w-1 h-1 md:w-5 md:h-5 rounded-full"
                            style={{
                              backgroundColor: DecimalToHexConverter(
                                item?.ColorCode
                              ),
                            }}
                          ></p>
                          <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight text-xs lg:text-base">
                            {item.ColorName}
                          </p>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight text-xs lg:text-base">
                          {item.SizeNum}
                        </p>
                        <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight flex flex-row justify-center items-center md:space-x-2 text-xs lg:text-base">
                          {formatCurrencyDisplay(item.Mablag)}
                          <span className="text-xs block ">ریال</span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={clearCompare}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700
            w-fit transition-all duration-300 ease-in-out
            self-end
            "
          >
            پاک کردن لیست مقایسه
          </button>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
