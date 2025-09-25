import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import Unit from "@components/Unit";
import { useCartStore } from "@store/CartStore";
import { useNavbarVisibility } from "@hooks/useMenu";

interface CartSidebarProps {
  productCode: string;
  product: any;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  productCode,
  product,
}) => {
  const { cart, removeFeatureFromCart } = useCartStore();
  const isNavbarVisible = useNavbarVisibility(false, 600);

  return (
    <div
      className={`col-span-12 lg:col-span-3 flex flex-col gap-6 justify-start items-start bg-white rounded-lg shadow shadow-gray-150 p-2 h-fit lg:sticky ${isNavbarVisible
        ? "2xl:top-[21.5vh] xl:top-[22vh] lg:top-[19vh]"
        : "2xl:top-[12vh] xl:top-[12vh] lg:top-[9vh]"
        }`}
    >
      {cart.length > 0 &&
        cart.find((item) => Math.floor(item?.item?.Code!) === Math.floor(productCode)) ? (
        <div className="w-full text-pretty py-2">
          <p className="font-EstedadMedium text-sm text-center xl:p-2 text-purple-500 leading-relaxed">
            لیست آیتم های این محصول در سبد خرید شما
          </p>
          {(() => {
            const foundItem = cart.find(
              (item) => Math.floor(item?.item?.Code!) === Math.floor(productCode)
            );
            return (
              <div className="font-EstedadMedium p-2 w-full space-y-3 text-pretty">
                {foundItem?.basket?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-row w-full text-pretty leading-loose text-sm text-gray-700 gap-1 items-center justify-between"
                  >
                    <div className="flex flex-row items-center justify-center gap-1 border-b border-gray-300">
                      <b>{formatCurrencyDisplay(item.quantity)}</b> {product.Vahed} <b>{product.Name}</b>
                      {item.feature.ColorName} ، سایز ({toPersianDigits(item.feature.SizeNum)})
                      <b>{formatCurrencyDisplay(item?.SPrice * item.quantity)}</b>
                      <Unit />
                    </div>
                    <button
                      onClick={() => removeFeatureFromCart(item, productCode)}
                      className="text-red-500 bg-white  hover:text-red-700 duration-300 ease-in-out transition-all"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="flex w-full flex-row font-EstedadMedium justify-center items-center text-center lg:p-2.5 text-pretty lg:text-xs leading-relaxed">
          شما از این محصول هیچ آیتمی در سبد خرید ندارید
        </div>
      )}
    </div>
  );
};

export default CartSidebar;