import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { ProductImageProps } from "@definitions/ProductType";

interface ProductImagesProps {
    GCode?: number;
    SCode?: number;
    images: ProductImageProps[];
    productName: string;
    setImageModal: (modal: { isOpen: boolean; image: string | null }) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({
    GCode,
    SCode,
    images,
    productName,
    setImageModal,
}) => {
    return (
        <div className="h-fit
         col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-4 w-full">
            {images.length > 0 ? (
                <div className="grid grid-cols-12 items-stretch justify-between gap-2 ">
                    <div className="col-span-2 flex flex-col items-center justify-center gap-2">
                        {images.map((imageItem, index) => (
                            <img
                                key={index}
                                src={`${import.meta.env.VITE_CDN_URL}/products-image/webp/${GCode}/${SCode}/${imageItem.PicName}.webp`}
                                alt={productName}
                                className="col-span-3 w-full object-scale-down rounded-xl hover:cursor-pointer hover:scale-105 hover:grayscale transition-all duration-300 ease-in-out aspect-square"
                                onClick={() =>
                                    setImageModal({
                                        isOpen: true,
                                        image: `${import.meta.env.VITE_CDN_URL}/products-image/webp/${GCode}/${SCode}/${imageItem.PicName}.webp`,
                                    })
                                }
                            />
                        ))}
                    </div>
                    <Swiper
                        modules={[Autoplay, FreeMode, Pagination, Navigation]}
                        className=" w-full flex flex-row items-stretch justify-between  col-span-10"
                        freeMode={false}
                        navigation={true}
                        slidesPerView={1}
                        centeredSlides={true}
                        spaceBetween={1}
                        slidesPerGroup={1}
                        loop={true}
                        autoplay={{ delay: 4500 }}
                    >
                        {images.map((imageItem, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={`${import.meta.env.VITE_CDN_URL}/products-image/webp/${GCode}/${SCode}/${imageItem.PicName}.webp`}
                                    alt={productName}
                                    className="w-full object-scale-down rounded-xl bg-gray-100 aspect-square"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            ) : (
                <img
                    src={import.meta.env.VITE_NO_IMAGE_URL}
                    className="w-full object-fill aspect-square rounded-xl shadow shadow-gray-150"
                />
            )}
        </div>
    );
};

export default ProductImages;