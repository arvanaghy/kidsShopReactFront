import { Link } from "react-router-dom";
import { RGBtoHexConverter } from "@utils/RGBtoHexConverter";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMainStore } from "@store/useMainStore";
import { toPersianDigits } from "@utils/numeralHelpers";

const ComparePage = () => {
  const { compareList, updateCompareList } = useMainStore();
  const clearCompare = () => {
    updateCompareList([]);
  };

  return (
    <div className="p-0.5 md:p-4 min-h-screen bg-white text-black font-EstedadLight">
      <h1 className="w-fit text-center  text-xl lg:text-3xl font-EstedadExtraBold py-4 lg:text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
        مقایسه محصولات
      </h1>
      {compareList.length <= 0 ? (
        <p className="w-full text-center
        text-pretty font-EstedadLight
        py-2">محصولی برای مقایسه انتخاب نشده است</p>
      ) : (
        <div className="w-full flex flex-col justify-center items-center ">
          <div
            className="w-full overflow-x-auto py-10 grid grid-cols-12
          items-start justify-center lg:gap-6 gap-1 md:gap-3 "
          >
            {compareList.map((product, index) => (
              <div
                key={index}
                className="relative w-full col-span-3 flex flex-col justify-center items-start lg:space-y-6 space-y-1
                md:space-y-3 border-x-2"
              >
                <img
                  src={`${import.meta.env.VITE_CDN_URL}/products-image/webp/${
                    product?.PicName
                  }.webp`}
                  alt={product?.Name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = import.meta.env.VITE_NO_IMAGE_URL;
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
                          (p) => Math.floor(p.Code) !== Math.floor(product.Code)
                        )
                      );
                    }}
                  />
                </button>
                <Link
                  to={`/product/${product?.Code}`}
                  className="w-full text-center font-EstedadExtraBold
                  xl:text-lg text-sm md:text-base  text-CarbonicBlue-500 hover:text-Purple-500 leading-relaxed
                  "
                >
                  {product?.Name}
                </Link>
                <p className="text-gray-700 leading-relaxed  w-full text-pretty font-EstedadLight flex flex-row text-left justify-center items-center md:space-x-2 text-xs lg:text-base">
                  {formatCurrencyDisplay(product?.SPrice)}
                  <span className="text-xs block ">تومان</span>
                </p>
                <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight ">
                  {product?.Comment}
                </p>
                <div className="w-full flex flex-col justify-start items-center xl:gap-3 gap-0.5 p-1.5">
                  <div
                    key={index}
                    className="w-full flex flex-row justify-between items-center flex-wrap"
                  >
                    <div className=" flex flex-row justify-start items-center lg:gap-x-2 gap-x-0.5 flex-wrap">
                      <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight text-xs lg:text-base">
                        رنگ
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight text-xs lg:text-base">
                      سایز
                    </p>
                  </div>
                  {product?.product_size_color
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
                              backgroundColor: RGBtoHexConverter(item?.RGB),
                            }}
                          ></p>
                          <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight text-xs lg:text-base">
                            {item.ColorName}
                          </p>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-pretty font-EstedadLight text-xs lg:text-base">
                          {toPersianDigits(item?.SizeNum)}
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
