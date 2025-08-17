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
     xl:my-10
     md:py-5
     xl:py-14
     xl:p-6
     grid grid-cols-12 items-center justify-center
     bg-red-300
     rounded-xl
     "
    >
      <div className="w-full col-span-12 xl:col-span-3 p-2 xl:p-0">
        <h2
          className="font-EstedadExtraBold text-center  xl:tracking-wide text-gray-700
            text-xl leading-loose xl:py-1.5
            md:text-3xl md:pb-2
            lg:text-2xl
            xl:text-4xl 2xl:text-6xl xl:leading-loose 2xl:leading-loose
             "
        >
          محصولات پیشنهادی کیدزشاپ
        </h2>
      </div>
      <div className="col-span-12 xl:col-span-9 h-full rounded-xl p-2 xl:p-0">
        <Swiper
          modules={[Autoplay, FreeMode, Pagination, Navigation]}
          className="h-full w-full "
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
      <div className="col-span-12 text-center pt-4 xl:pt-12">
        <Link
          to="/offered-products"
          className="font-EstedadExtraBold text-xs text-center bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-xl
          transition-all duration-300 ease-in-out 2xl:text-2xl 2xl:font-EstedadMedium
          "
        >
          تمامی آفرهای کیدزشاپ
        </Link>
      </div>
    </section>
  )
}

export default OfferedProductsBanner