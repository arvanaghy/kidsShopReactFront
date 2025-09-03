/* eslint-disable react/prop-types */
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { Link } from "react-router-dom";
import { toPersianDigits } from "@utils/numeralHelpers";
import { RGBtoHexConverter } from "@utils/RGBtoHexConverter";
import Unit from "@components/Unit";

const OfferProductCard = ({ item }) => {
  const uniqueColorCodes = [
    ...new Map(
      item?.product_size_color
        ?.filter((item) => item.Mande > 0)
        .map((item) => [
          item.ColorCode,
          {
            ColorCode: item.ColorCode,
            ColorName: item.ColorName,
            RGB: item.RGB,
          },
        ])
    ).values(),
  ];

  console.log("item", item);

  const uniqueSizeNums = [
    ...new Set(
      item?.product_size_color
        ?.filter((item) => item.Mande > 0)
        .map((item) => item.SizeNum)
    ),
  ];

  return (
    <Link
      to={`/product/${item?.Code}`}
      className="grid grid-cols-12 bg-gray-100 rounded-xl h-full items-start
      xl:items-center justify-center w-full
      p-2
    "
    >
      <div className="col-span-12 xl:col-span-4 flex flex-col items-start justify-center space-y-3 xl:space-y-6">
        <div className="flex flex-row items-center justify-start">
          <span className="flex text-gray-700 flex-row items-center gap-1 text-base xl:text-3xl font-EstedadExtraBold text-center">
            {formatCurrencyDisplay(item?.SPrice)}
            <Unit />
          </span>
        </div>
        <h3 className="text-gray-700 font-EstedadExtraBold text-base xl:text-3xl text-center ">
          {item?.Name}
        </h3>
        <p className="text-gray-700 text-center font-EstedadLight leading-relaxed ">
          {item?.Comment}
        </p>
        {uniqueColorCodes?.length > 0 && (
          <div className="flex flex-row items-center justify-center gap-2">
            <p className="text-gray-700 font-EstedadExtraBold tracking-wide text-sm xl:text-lg ">
              رنگ:
            </p>
            {uniqueColorCodes?.map((uniqueColorCodes_item, idx) => (
              <div
                className="flex flex-row items-center justify-center gap-2 "
                key={idx}
              >
                <p className="text-gray-700 font-EstedadMedium ">
                  {uniqueColorCodes_item?.ColorName}
                </p>
                <p
                  className="w-5 h-5 flex flex-row items-center justify-center rounded-full "
                  style={{
                    backgroundColor: RGBtoHexConverter(
                      uniqueColorCodes_item?.RGB
                    ),
                  }}
                ></p>
              </div>
            ))}
          </div>
        )}
        {uniqueSizeNums?.length > 0 && (
          <div className="flex flex-row items-center justify-center gap-2 ">
            <p className="text-gray-700 font-EstedadExtraBold tracking-wide text-sm xl:text-lg ">
              سایز:
            </p>
            {uniqueSizeNums?.map((uniqueSizeNums_item, idx) => (
              <p key={idx} className="text-gray-700 font-EstedadMedium ">
                {toPersianDigits(uniqueSizeNums_item)}
              </p>
            ))}
          </div>
        )}
      </div>
      {/* images  */}
      <div className="col-span-12 xl:col-span-8 flex flex-col items-start justify-center space-y-6">
        {item?.product_images?.length > 0 && (
          <div className="w-full grid grid-cols-12 gap-4 p-3">
            {item.product_images.slice(0, 4).map((product_image_item, idx) => (
              <img
                key={idx}
                src={`${import.meta.env.VITE_CDN_URL}/products-image/webp/${
                  product_image_item?.PicName
                }.webp`}
                alt={item?.Name}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = import.meta.env.VITE_NO_IMAGE_URL;
                }}
                className="col-span-6 md:col-span-3 lg:col-span-3 w-full rounded-lg object-scale-down md:object-fill  lg:h-[38vh] md:h-full h-[18vh]"
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default OfferProductCard;
