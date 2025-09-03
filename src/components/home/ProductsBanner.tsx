import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import ProductCard from "@components/product/ProductCard";



const ProductsBanner = ({ data, link, title, seeMore }: { data: any, link: string, title: string, seeMore: string }) => {
    return (
        <section
            className="
           w-full
           xl:py-14
           md:py-5
           xl:p-6
           grid grid-cols-12 items-center justify-center
           bg-Cream-500
           rounded-xl
         "
        >
            <div className="w-full col-span-12 xl:col-span-3">
                <h2
                    className="font-EstedadExtraBold text-center xl:tracking-wide
               py-4
           text-xl leading-relaxed xl:py-1.5
           md:text-3xl md:pb-4
           lg:text-2xl
           xl:text-4xl 2xl:text-6xl xl:leading-loose 2xl:leading-loose
           text-gray-700
         "
                >
                    {title}
                </h2>
            </div>
            <div className="col-span-12 xl:col-span-9">
                <Swiper
                    modules={[Autoplay, FreeMode, Pagination, Navigation]}
                    className=" py-10 mySwiper"
                    freeMode={false}
                    // navigation={true}
                    centeredSlides={false}
                    pagination={{ clickable: true }}
                    slidesPerGroup={1}
                    loop={data?.length >= 4}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },

                        480: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {data?.map((product: any, index: number) => (

                        <SwiperSlide key={index}>
                            <div className="flex flex-row gap-2 justify-center items-stretch ">
                                <div className="w-full gap-2" >
                                    <ProductCard item={product} />
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                    )}
                </Swiper>
            </div>

            <div className="col-span-12 text-center py-6 lg:py-12">
                <Link
                    to={link}
                    className="font-EstedadExtraBold text-center bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-xl
           transition-all duration-300 ease-in-out text-xs xl:text-base 2xl:text-2xl 2xl:font-EstedadMedium
         "
                >
                    {seeMore}
                </Link>
            </div>
        </section>
    )
}

export default ProductsBanner