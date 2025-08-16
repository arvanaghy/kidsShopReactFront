import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faBookmark, faRestroom, faSquareShareNodes } from "@fortawesome/free-solid-svg-icons";
import { formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import { RGBtoHexConverter } from "@utils/RGBtoHexConverter";
import { useMainStore } from "@store/useMainStore";
import { Product, ProductSizeColor } from "@types/ProductType";

interface ProductDetailsProps {
  product: Product;
  productCode: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, productCode }) => {
  const [feature, setFeature] = useState<ProductSizeColor | null>(null);
  const { favorite, compareList, addProductToCart, toggleFavorite, toggleCompare } = useMainStore();
  const isFavorite = favorite.some((p) => Math.floor(p.Code!) == Math.floor(productCode));
  const isCompared = compareList.some((p) => Math.floor(p.Code!) == Math.floor(productCode));

  return (
    <div className="col-span-12 xl:px-6 md:col-span-7 lg:col-span-5 xl:col-span-5 w-full flex flex-col justify-start xl:gap-4 gap-1.5">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="lg:text-2xl text-xl py-5 text-center lg:text-start border-b font-EstedadExtraBold tracking-wide text-CarbonicBlue-500 drop-shadow-sm leading-relaxed text-pretty">
          {product.Name}
        </h1>
        <div className="flex w-fit flex-row justify-between items-center gap-6">
          <button
            className="bg-black rounded-lg px-1.5 pt-1 pb-0.5 hover:bg-purple-500 duration-300 ease-in-out"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("لینک کپی شد");
            }}
          >
            <FontAwesomeIcon icon={faSquareShareNodes} className="text-xl text-white" />
          </button>
          <button onClick={() => toggleFavorite(product)}>
            <FontAwesomeIcon
              icon={faBookmark}
              className={`text-2xl duration-300 ease-in-out ${isFavorite ? "text-Purple-500 hover:text-gray-500" : "text-gray-500 hover:text-Purple-500"
                }`}
            />
          </button>
          <button onClick={() => toggleCompare(product)}>
            <FontAwesomeIcon
              icon={faRestroom}
              className={`text-2xl duration-300 ease-in-out ${isCompared ? "text-Purple-500 hover:text-gray-500" : "text-gray-500 hover:text-Purple-500"
                }`}
            />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row justify-end items-center font-EstedadExtraBold">
        <p>{formatCurrencyDisplay(product.SPrice)}</p>
        <p>تومان</p>
      </div>
      <div className="w-full flex flex-col gap-1.5 md:gap-3 flex-wrap">
        {product.product_size_color?.length > 0 && (
          <div className="w-full font-EstedadMedium px-2 flex flex-col gap-4 items-start justify-start leading-relaxed">
            {product.product_size_color.map((item, index) => (
              <button
                disabled={item.Mande <= 0}
                onClick={() => setFeature(item)}
                key={index}
                className={`w-full flex flex-row justify-between gap-2 text-sm font-EstedadMedium text-gray-800 
                  bg-gray-100 duration-300 ease-in-out border-2 border-gray-200 rounded-md p-2
                  disabled:cursor-not-allowed hover:bg-gray-400 hover:text-gray-100
                  ${item.SCCode === feature?.SCCode ? "bg-green-500 text-white" : ""}`}
              >
                <p className="flex flex-row gap-2">
                  <span className="block text-sm font-EstedadMedium">رنگ</span>
                  <span
                    className="block w-5 h-5 rounded-full"
                    style={{ backgroundColor: RGBtoHexConverter(item.RGB) }}
                  ></span>
                  <span>{item.ColorName}</span>
                </p>
                <p className="flex flex-row gap-2">
                  <span className="block text-sm font-EstedadMedium">سایز</span>
                  <span>{toPersianDigits(item.SizeNum)}</span>
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex flex-row justify-end items-center py-3 md:py-6">
        <button
          className="w-fit flex flex-row gap-2 items-center justify-center border-2 border-green-600 rounded-md px-4 py-2 bg-green-500 text-white hover:bg-green-600 hover:text-white space-x-1.5 duration-300 ease-in-out transition-all"
          onClick={() => addProductToCart(product, productCode, feature)}
        >
          <FontAwesomeIcon icon={faCartPlus} />
          <div className="font-EstedadMedium">افزودن به سبد خرید</div>
        </button>
      </div>
      {product.Comment?.length > 0 && (
        <div className="w-full">
          <div className="font-EstedadExtraBold text-start text-Purple-500 text-base lg:text-xl py-4">
            توضیحات :
          </div>
          <ul className="list-disc marker:text-CarbonicBlue-500 md:pr-2 lg:pr-6 space-y-2 text-start font-EstedadLight">
            {product.Comment.split("\r\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;