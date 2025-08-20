import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faBookmark, faRestroom } from "@fortawesome/free-solid-svg-icons";
import { formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import { RGBtoHexConverter } from "@utils/RGBtoHexConverter";
import { useMainStore } from "@store/useMainStore";
import { Product, ProductSizeColor } from "@types/ProductType";
import ShareOnSocialMedia from "@components/product/ShareOnSocialMedia";
import Unit from "@components/Unit";

interface ProductDetailsProps {
  product: Product;
  productCode: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, productCode }) => {

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductSizeColor | null>(null);
  const { favorite, compareList, addProductToCart, toggleFavorite, toggleCompare } = useMainStore();
  const isFavorite = favorite.some((p) => Math.floor(p.Code!) == Math.floor(productCode));
  const isCompared = compareList.some((p) => Math.floor(p.Code!) == Math.floor(productCode));

  // Get unique sizes
  const uniqueSizes = Array.from(new Set(product.product_size_color?.map(item => item.SizeNum)));

  // Get colors for selected size
  const availableColors = selectedSize
    ? product.product_size_color?.filter(item => item.SizeNum === selectedSize)
    : [];

  return (
    <div className="col-span-12 xl:px-6 md:col-span-7 lg:col-span-5 xl:col-span-5 w-full flex flex-col justify-start xl:gap-4 gap-1.5">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="lg:text-2xl text-xl py-5 text-center lg:text-start border-b font-EstedadExtraBold tracking-wide text-CarbonicBlue-500 drop-shadow-sm leading-relaxed text-pretty">
          {product.Name}
        </h1>
        <div className="flex w-fit flex-row justify-between items-center gap-6">
          <ShareOnSocialMedia url={url} />
          <button onClick={() => toggleFavorite(product)}>
            <FontAwesomeIcon
              icon={faBookmark}
              className={`text-2xl duration-300 ease-in-out ${isFavorite ? "text-Purple-500 hover:text-gray-500" : "text-gray-500 hover:text-Purple-500"}`}
            />
          </button>
          <button onClick={() => toggleCompare(product)}>
            <FontAwesomeIcon
              icon={faRestroom}
              className={`text-2xl duration-300 ease-in-out ${isCompared ? "text-Purple-500 hover:text-gray-500" : "text-gray-500 hover:text-Purple-500"}`}
            />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row justify-end items-center font-EstedadExtraBold">
        <p>{formatCurrencyDisplay(product.SPrice)}</p>
        <Unit />
      </div>
      <div className="w-full flex flex-col gap-3 md:gap-4 flex-wrap">
        {product.product_size_color?.length > 0 && (
          <div className="w-full font-EstedadMedium px-2 flex flex-col gap-4 items-start justify-start leading-relaxed">
            {/* Size Dropdown */}
            <select
              value={selectedSize || ""}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                setSelectedColor(null); // Reset color selection when size changes
              }}
              className="w-full p-2 border-2 border-gray-200 rounded-md bg-gray-100 font-EstedadMedium text-gray-800 focus:outline-none focus:border-green-500"
            >
              <option value="" disabled>انتخاب سایز</option>
              {uniqueSizes.map((size, index) => (
                <option key={index} value={size}>
                  {toPersianDigits(size)}
                </option>
              ))}
            </select>

            {/* Color Selection */}
            {selectedSize && availableColors.length > 0 && (
              <div className="w-full flex flex-col gap-2">
                <p className="font-EstedadMedium text-gray-800">انتخاب رنگ:</p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((item, index) => (
                    <button
                      disabled={item.Mande <= 0}
                      onClick={() => setSelectedColor(item)}
                      key={index}
                      className={`flex flex-row gap-2 items-center text-sm font-EstedadMedium text-gray-800 
                        bg-gray-100 duration-300 ease-in-out border-2 border-gray-200 rounded-md p-2
                        disabled:cursor-not-allowed hover:bg-gray-400 hover:text-gray-100
                        ${item.SCCode === selectedColor?.SCCode ? "bg-green-500 text-white border-green-600" : ""}`}
                    >
                      <span
                        className="block w-5 h-5 rounded-full"
                        style={{ backgroundColor: RGBtoHexConverter(item.RGB) }}
                      ></span>
                      <span>{item.ColorName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-full flex flex-row justify-end items-center py-3 md:py-6">
        <button
          disabled={!selectedSize || !selectedColor}
          className={`w-fit flex flex-row gap-2 items-center justify-center border-2 border-green-600 rounded-md px-4 py-2 
            ${selectedSize && selectedColor ? "bg-green-500 text-white hover:bg-green-600 hover:text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"} 
            space-x-1.5 duration-300 ease-in-out transition-all`}
          onClick={() => selectedColor && addProductToCart(product, productCode, selectedColor)}
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
          <ul className="md:pr-2 lg:pr-6 space-y-2 text-start font-EstedadLight">
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