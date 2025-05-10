/* eslint-disable react/prop-types */
import { useContext } from "react";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { userPriceSelect } from "@utils/userPriceHelper";
import UserContext from "@context/UserContext";
import { Link } from "react-router-dom";
import { DecimalToHexConverter } from "../utils/DecimalToHexConverter";

const OfferProductCard = ({ item }) => {
  const { user } = useContext(UserContext);

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
    <Link
      onContextMenu={(e) => e.preventDefault()}
      to={`/product/${item?.Code}`}
      className="grid grid-cols-12 bg-gray-100 rounded-xl h-full items-center justify-center w-full
      px-16
    hover:grayscale
    hover:bg-gray-200
    duration-300 ease-in-out transition-all
    "
    >
      <div className="col-span-12 xl:col-span-6 flex flex-col items-start justify-center space-y-3 xl:space-y-6">
        <div className="flex flex-row items-center justify-start">
          <span className="flex text-gray-700 flex-row items-center gap-1 text-base xl:text-3xl font-EstedadExtraBold text-center">
            {formatCurrencyDisplay(userPriceSelect(item, user))}
            <span className="text-sm">ریال</span>
          </span>
        </div>
        <h3 className="text-gray-700 font-EstedadExtraBold text-base xl:text-3xl text-center ">
          {item?.Name}
        </h3>
        <p className="text-gray-700 text-center font-EstedadLight leading-relaxed ">
          {item?.Comment}
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-gray-700 font-EstedadMedium text-sm xl:text-3xl ">
            رنگ:
          </p>
          {uniqueColorCodes?.length > 0 &&
            uniqueColorCodes?.map((uniqueColorCodes_item, idx) => (
              <div
                className="flex flex-row items-center justify-center gap-2 "
                key={idx}
              >
                <p className="text-gray-700 font-EstedadMedium ">
                  {uniqueColorCodes_item?.ColorName}
                </p>
                <p className="text-gray-700 font-EstedadMedium "></p>
                <p
                  className="w-5 h-5 flex flex-row items-center justify-center rounded-full "
                  style={{
                    backgroundColor: DecimalToHexConverter(
                      uniqueColorCodes_item?.ColorCode
                    ),
                  }}
                ></p>
              </div>
            ))}
        </div>
        <div className="flex flex-row items-center justify-center gap-2 ">
          <p className="text-gray-700 font-EstedadMedium text-sm xl:text-3xl">
            سایز:
          </p>
          {uniqueSizeNums?.length > 0 &&
            uniqueSizeNums?.map((uniqueSizeNums_item, idx) => (
              <p key={idx} className="text-gray-700 font-EstedadMedium ">
                {uniqueSizeNums_item}
              </p>
            ))}
        </div>
      </div>
      {/* images  */}
      <div className="col-span-12 xl:col-span-6 flex flex-col items-start justify-center space-y-6">
        {item?.product_images?.length > 0 && (
          <div className="w-full grid grid-cols-12 gap-4">
            <div className="w-full col-span-2 flex flex-col justify-center items-center gap-2">
              {item.product_images
                .filter((product_image_item) => product_image_item.Def != 1)
                .slice(0, 4)
                .map((product_image_item, idx) => (
                  <div key={idx} className="w-full">
                    <img
                      src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                        item?.GCode
                      )}/${Math.floor(item?.SCode)}/${
                        product_image_item?.PicName
                      }.webp`}
                      alt={item?.Name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";
                      }}
                      className="w-full rounded-lg object-scale-down h-full"
                    />
                  </div>
                ))}
            </div>
            {item.product_images.find(
              (product_image_item) => product_image_item.Def == 1
            ) && (
              <div className="w-full  col-span-10">
                {item.product_images
                  .filter((product_image_item) => product_image_item.Def == 1)
                  .map((product_image_item, idx) => (
                    <div className="w-full h-full" key={idx}>
                      <img
                        src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                          item?.GCode
                        )}/${Math.floor(item?.SCode)}/${
                          product_image_item?.PicName
                        }.webp`}
                        alt={item?.Name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";
                        }}
                        className="w-full rounded-lg object-cover h-full"
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default OfferProductCard;
