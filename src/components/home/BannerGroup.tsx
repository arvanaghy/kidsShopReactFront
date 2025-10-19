import { Link } from "react-router-dom";

const BannerGroup = ({ banners = [] }: any) => {
  const fallbackImage = import.meta.env.VITE_NO_IMAGE_URL;

  const items = banners.length > 0 ? banners : [{}, {}];
  return (
    <section className="py-4 xl:p-10">
      <div className="grid grid-cols-12 gap-4 xl:gap-8">
        {items.slice(0, 2).map((item: any, idx: number) => (
          <Link
            to={`${item?.CodeKalaGroup
              ? `/category/${item?.CodeKalaGroup}`
              : "/"
              }`}
            key={idx}
            className="relative w-full col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6"
          >
            <img
              src={`${import.meta.env.VITE_CDN_URL}/banner-images/webp/${item?.PicName}_desktop.webp` || fallbackImage}
              alt={item?.title || "no-image"}
              className="w-full object-fill shadow-sm shadow-black/60 rounded-xl  aspect-video"
            />
            {/* <p className="absolute bottom-0 left-0 text-lg font-EstedadExtraBold text-white w-full tracking-wide text-center bg-black/60 py-2 rounded-t-xl">{item?.Comment}</p> */}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BannerGroup;
