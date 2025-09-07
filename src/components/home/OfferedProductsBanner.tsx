import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import OfferProductCard from "@components/product/OfferProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
const OfferedProductsBanner = ({ data }: { data: any }) => {
  return (
    <section
      className="
     w-full p-2 h-[80vh]
     grid grid-cols-12 items-center justify-center
     bg-red-300
     rounded-xl
     my-3
     "
    >
      <div className="w-full col-span-12 xl:col-span-2 p-2 xl:p-0">
        <h2
          className="font-EstedadExtraBold text-center  xl:tracking-wide text-gray-700
            text-xl leading-loose xl:py-1.5
            md:text-3xl md:pb-2
            lg:text-2xl
            xl:text-4xl  xl:leading-loose 2xl:leading-loose
             "
        >
          محصولات پیشنهادی کیدزشاپ
        </h2>
      </div>
      <div className="col-span-12 h-[60vh]  xl:col-span-10 w-full rounded-xl p-2 xl:p-0">
        <Swiper
          modules={[Autoplay, FreeMode, Pagination, Navigation]}
          className=" w-full h-[60vh] flex flex-row items-stretch justify-center"
          freeMode={false}
          navigation={true}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={0}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 4500,
          }}
        >
          {data.map((offeredProductsItem: any, index: number) => (
            <SwiperSlide key={index}>
              <OfferProductCard item={offeredProductsItem} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Link
        to="/offered-products"
        className="col-span-4  flex flex-row items-center justify-center w-fit text-center  font-EstedadExtraBold text-xs  text-white py-2 px-4
          transition-all duration-300 ease-in-out 2xl:text-lg  hover:text-gray-200 tracking-wider
          "
      >
        تمامی آفرهای کیدزشاپ
      </Link>
    </section>
  )
}

export default OfferedProductsBanner