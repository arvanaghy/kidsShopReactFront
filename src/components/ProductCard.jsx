/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { userPriceSelect } from "@utils/userPriceHelper";
import { useContext } from "react";
import UserContext from "@context/UserContext";
import toast from "react-hot-toast";
import { FaBoxes } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import CommentShorter from "./CommentShorter";

const ProductCard = ({ item }) => {
  const { cart, user, updateCart } = useContext(UserContext);

  const increment = async (product) => {
    if (cart && cart?.length >= 1) {
      const isProductExistInCart = cart.find(
        (item) => item.Code === product.Code
      );
      if (isProductExistInCart) {
        const newCart = cart?.map((item) => {
          if (item.Code === product.Code) {
            return {
              ...item,
              unitQuantity: Number(item.unitQuantity) + 1,
              packQuantity: Number(item.packQuantity),
            };
          }
          return item;
        });
        updateCart(newCart);
        toast.success("محصول به سبد خریداضافه شد");
      } else {
        const newCart = [
          ...cart,
          { ...product, unitQuantity: 1, packQuantity: 0 },
        ];
        toast.success("محصول به سبد خریداضافه شد");
        updateCart(newCart);
      }
    } else if (cart?.length === 0) {
      const newCart = [{ ...product, unitQuantity: 1, packQuantity: 0 }];
      toast.success("محصول به سبد خریداضافه شد");
      updateCart(newCart);
    }
  };

  const decrement = (product) => {
    if (cart && cart?.length >= 1) {
      const isProductExistInCart = cart.find(
        (item) => item.Code === product.Code
      );
      if (isProductExistInCart) {
        const newCart = cart.map((item) => {
          if (item.Code === product.Code && item.unitQuantity > 1) {
            return { ...item, unitQuantity: Number(item.unitQuantity) - 1 };
          }
          return item;
        });

        if (isProductExistInCart.unitQuantity === 1) {
          const newCartWithoutProduct = cart.filter(
            (item) => item.Code !== product.Code
          );
          updateCart(newCartWithoutProduct);
          toast.error("تعداد محصول مورد نظر در سبد خرید تغییر یافت");
        } else {
          updateCart(newCart);
          toast.success("تعداد محصول مورد نظر در سبد خرید تغییر یافت");
        }
      } else {
        toast.error("محصول مورد نظر در سبد خرید شما وجود ندارد");
      }
    } else {
      toast.error("سبد خرید شما خالی است");
    }
  };

  const handleInputChange = (e, product) => {
    const value = e.target?.value;
    if (value < 1 || value == null || value == "") {
      toast.error("تعداد باید بیشتر از صفر باشد")
      e.target.value = null;
      e.target.focus;
      return;
    }
    if (cart && cart.length >= 1) {
      const isProductExistInCart = cart.find(
        (item) => item.Code === product.Code
      );
      if (isProductExistInCart) {
        const newCart = cart.map((item) => {
          if (item.Code === product.Code) {
            return {
              ...item,
              unitQuantity: value,
            };
          }
          return item;
        });
        updateCart(newCart);
      } else {
        const newCart = [...cart, { ...product, unitQuantity: value }];
        updateCart(newCart);
      }
    } else if (cart?.length === 0) {
      const newCart = [{ ...product, unitQuantity: value }];
      updateCart(newCart);
    }
    toast.success("سبد خرید بروز رسانی شد");
  };

  return (
    <div
      className='border  rounded-lg shadow-lg border-CarbonicBlue-500/80 bg-stone-50 hover:shadow-xl lg:hover:scale-105 duration-300 ease-in-out relative overflow-hidden group
      col-span-12 h-56
      sm:col-span-6
      md:col-span-6 md:h-64 w-fit
      lg:col-span-3 lg:h-80
      2xl:col-span-3 2xl:h-96
      '
    >
      <Link
        to={`/product/${Math.floor(item?.Code)}`}
        className="block
        h-[80%]
        
        lg:h-3/4">
        <img
          src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
            item?.GCode
          )}/${Math.floor(item?.SCode)}/${item?.PicName}.webp`}
          alt={item?.Name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
            "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFFFFF'/%3E%3C/svg%3E";

          }}
          className="top-0 left-0 right-0 bottom-0 h-full z-50 w-full rounded-t-lg object-fill "
        />
      </Link>

      <h2 className="text-center py-1 z-30 absolute top-0 text-white left-0 font-EstedadLight bg-CarbonicBlue-500/80  line-clamp-1 px-4 rounded-br-xl
      text-xs
      lg:text-sm
      
      ">
        {item?.GName}
      </h2>
      <div className="h-[75%] lg:group-hover:-translate-y-[65%] ease-in-out duration-300 rounded-t-lg px-3 z-50 flex flex-col group-hover:justify-around font-EstedadMedium absolute w-full bg-CarbonicBlue-500 text-white">
        <div className="flex flex-col justify-evenly items-center w-full">
          <Link to={`/product/${Math.floor(item?.Code)}`} className="z-50  text-justify line-clamp-1 leading-relaxed  my-4 
          text-xs 
          lg:text-sm lg:font-EstedadExtraBold
          2xl:text-lg
          hover:underline hover:text-Amber-500 transation-all duration-300 ease-in-out
          ">
            {item?.Name}
          </Link>
          <div className="flex flex-row items-center gap-2 z-50 text-sm mb-4 ">
            <p className="flex items-center gap-1">
              <FaBox className="text-base" />
              {item?.Vahed ? item?.Vahed : " "} {"ی"}
            </p>
            <span className="flex flex-row items-center gap-1">
                {formatCurrencyDisplay(userPriceSelect(item, user))}
              <svg
                fill="#fff"
                className="w-5 h-5"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 220 220"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M110,0C49.346,0,0,49.346,0,110s49.346,110,110,110s110-49.346,110-110S170.654,0,110,0z M110,210
		c-55.14,0-100-44.86-100-100S54.86,10,110,10s100,44.86,100,100S165.14,210,110,210z"
                  />
                  <path
                    d="M110,19.5c-49.902,0-90.5,40.598-90.5,90.5s40.598,90.5,90.5,90.5s90.5-40.598,90.5-90.5S159.902,19.5,110,19.5z
		 M110,197.5c-48.248,0-87.5-39.252-87.5-87.5S61.752,22.5,110,22.5s87.5,39.252,87.5,87.5S158.248,197.5,110,197.5z"
                  />
                  <path
                    d="M81.879,70.989h15.76v58.062c0,7.245-5.895,13.14-13.14,13.14s-13.139-5.895-13.139-13.14s5.894-13.139,13.139-13.139v-12
		c-13.862,0-25.139,11.277-25.139,25.139s11.277,25.14,25.139,25.14s25.14-11.278,25.14-25.14V58.989h-27.76V70.989z"
                  />
                  <path
                    d="M151.603,133.606c-2.605,3.162-6.072,5.585-10.035,6.918l2.022,4.441c0.75,1.648,0.814,3.49,0.179,5.186
		s-1.892,3.043-3.54,3.794c-2.486,1.132-5.392,0.669-7.404-1.181l-8.122,8.834c3.544,3.259,8.092,4.963,12.706,4.963
		c2.634,0,5.291-0.556,7.792-1.695c9.424-4.291,13.6-15.449,9.309-24.873L151.603,133.606z"
                  />
                  <path
                    d="M154.64,119.576c0-1.848-0.253-3.669-0.742-5.418c-0.815-2.915-2.285-5.629-4.329-7.929l-3.685-4.146l-8.291,7.369
		l3.684,4.145c0.366,0.412,0.691,0.854,0.973,1.319c0.422,0.698,0.747,1.449,0.966,2.233c0.219,0.784,0.332,1.6,0.332,2.428
		c0,2.173-0.773,4.169-2.06,5.727c-1.654,2.003-4.155,3.282-6.949,3.282s-5.295-1.279-6.949-3.282
		c-1.286-1.558-2.06-3.554-2.06-5.727V59.443h-11.092v60.133c0,11.084,9.017,20.101,20.101,20.101S154.64,130.66,154.64,119.576z"
                  />
                  <g>
                    <path
                      d="M114.385,140.799c-1.246,0-2.469,0.505-3.345,1.38c-0.884,0.884-1.388,2.106-1.388,3.352c0,1.246,0.505,2.461,1.388,3.345
			c0.876,0.883,2.098,1.388,3.345,1.388s2.469-0.505,3.352-1.388c0.875-0.884,1.38-2.098,1.38-3.345c0-1.246-0.505-2.469-1.38-3.352
			C116.854,141.304,115.632,140.799,114.385,140.799z"
                    />
                  </g>
                  <g>
                    <path
                      d="M128.772,148.877c0.884-0.884,1.389-2.098,1.389-3.345c0-1.246-0.505-2.469-1.389-3.352
			c-0.875-0.876-2.097-1.38-3.344-1.38s-2.461,0.505-3.345,1.38c-0.884,0.884-1.388,2.106-1.388,3.352
			c0,1.246,0.505,2.469,1.388,3.345c0.884,0.883,2.098,1.388,3.345,1.388S127.897,149.76,128.772,148.877z"
                    />
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <div className="group-hover:flex flex-row items-center justify-center gap-2 hidden duration-300">
          <p className="flex items-center gap-1 text-sm">
            <FaBoxes className="text-base" />
            {formatCurrencyDisplay(Math.floor(item?.KMegdar))}
            {" تایی"}
          </p>
          <span className="flex flex-row items-center gap-1">
            <p className="">
              {Math.floor(item.KMegdar) === 0
                ? formatCurrencyDisplay(userPriceSelect(item, user))
                : formatCurrencyDisplay(
                  userPriceSelect(item, user) * item?.KMegdar
                )}
            </p>
            <svg
              fill="#fff"
              className="w-5 h-5"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 220 220"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M110,0C49.346,0,0,49.346,0,110s49.346,110,110,110s110-49.346,110-110S170.654,0,110,0z M110,210
		c-55.14,0-100-44.86-100-100S54.86,10,110,10s100,44.86,100,100S165.14,210,110,210z"
                />
                <path
                  d="M110,19.5c-49.902,0-90.5,40.598-90.5,90.5s40.598,90.5,90.5,90.5s90.5-40.598,90.5-90.5S159.902,19.5,110,19.5z
		 M110,197.5c-48.248,0-87.5-39.252-87.5-87.5S61.752,22.5,110,22.5s87.5,39.252,87.5,87.5S158.248,197.5,110,197.5z"
                />
                <path
                  d="M81.879,70.989h15.76v58.062c0,7.245-5.895,13.14-13.14,13.14s-13.139-5.895-13.139-13.14s5.894-13.139,13.139-13.139v-12
		c-13.862,0-25.139,11.277-25.139,25.139s11.277,25.14,25.139,25.14s25.14-11.278,25.14-25.14V58.989h-27.76V70.989z"
                />
                <path
                  d="M151.603,133.606c-2.605,3.162-6.072,5.585-10.035,6.918l2.022,4.441c0.75,1.648,0.814,3.49,0.179,5.186
		s-1.892,3.043-3.54,3.794c-2.486,1.132-5.392,0.669-7.404-1.181l-8.122,8.834c3.544,3.259,8.092,4.963,12.706,4.963
		c2.634,0,5.291-0.556,7.792-1.695c9.424-4.291,13.6-15.449,9.309-24.873L151.603,133.606z"
                />
                <path
                  d="M154.64,119.576c0-1.848-0.253-3.669-0.742-5.418c-0.815-2.915-2.285-5.629-4.329-7.929l-3.685-4.146l-8.291,7.369
		l3.684,4.145c0.366,0.412,0.691,0.854,0.973,1.319c0.422,0.698,0.747,1.449,0.966,2.233c0.219,0.784,0.332,1.6,0.332,2.428
		c0,2.173-0.773,4.169-2.06,5.727c-1.654,2.003-4.155,3.282-6.949,3.282s-5.295-1.279-6.949-3.282
		c-1.286-1.558-2.06-3.554-2.06-5.727V59.443h-11.092v60.133c0,11.084,9.017,20.101,20.101,20.101S154.64,130.66,154.64,119.576z"
                />
                <g>
                  <path
                    d="M114.385,140.799c-1.246,0-2.469,0.505-3.345,1.38c-0.884,0.884-1.388,2.106-1.388,3.352c0,1.246,0.505,2.461,1.388,3.345
			c0.876,0.883,2.098,1.388,3.345,1.388s2.469-0.505,3.352-1.388c0.875-0.884,1.38-2.098,1.38-3.345c0-1.246-0.505-2.469-1.38-3.352
			C116.854,141.304,115.632,140.799,114.385,140.799z"
                  />
                </g>
                <g>
                  <path
                    d="M128.772,148.877c0.884-0.884,1.389-2.098,1.389-3.345c0-1.246-0.505-2.469-1.389-3.352
			c-0.875-0.876-2.097-1.38-3.344-1.38s-2.461,0.505-3.345,1.38c-0.884,0.884-1.388,2.106-1.388,3.352
			c0,1.246,0.505,2.469,1.388,3.345c0.884,0.883,2.098,1.388,3.345,1.388S127.897,149.76,128.772,148.877z"
                  />
                </g>
              </g>
            </svg>
          </span>
        </div>
        {item?.Comment?.length > 0 && (
          <div className="text-xs 2xl:text-sm text-white duration-150 group-hover:text-white font-EstedadMedium">
            <CommentShorter commentData={item?.Comment} />
          </div>
        )}
        <div className="hidden group-hover:flex flex-row space-x-1 py-2 justify-around w-full xl:px-10 duration-300">
          <div className="flex flex-row">
            <button
              className="w-8 h-8 font-bold text-CarbonicBlue-500 rounded-lg bg-Amber-500 hover:bg-Amber-500/80 hover:scale-105"
              onClick={() => decrement(item)}
            >
              -
            </button>
            <input
              type="number"
              className="w-16 px-2 border rounded-lg text-center text-CarbonicBlue-500 mx-1"
              onChange={(e) => handleInputChange(e, item)}
              min={0}
              value={
                (cart &&
                  cart[cart?.findIndex((p) => p.Code === item?.Code)]
                    ?.unitQuantity) ||
                0
              }
            />
            <button
              className="w-8 h-8 font-bold text-CarbonicBlue-500 rounded-lg bg-Amber-500 hover:bg-Amber-500/80 hover:scale-105"
              onClick={() => increment(item)}
            >
              +
            </button>
          </div>
          <p className="my-auto text-xs xl:text-sm font-EstedadMedium">{item?.Vahed}</p>
        </div>
        <div className="lg:absolute bg-CarbonicBlue-500 
        p-1.5 -top-5 right-[45%]
        lg:p-3 lg:right-[42%] lg:-top-7

        rounded-full text-xl font-bold group-hover:bg-Purple-500 group-hover:rotate-180 duration-700 border-none ">
          <IoIosArrowUp />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;