/* eslint-disable react/prop-types */
// components/BannerGroup.jsx
import { Link } from "react-router-dom";

const BannerGroup = ({ banners = [] }) => {
  const fallbackImage =
    "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";

  const items = banners.length > 0 ? banners : [{}, {}];
  return (
    <section className="py-4 xl:p-10">
      <div className="grid grid-cols-12 gap-4 xl:gap-8">
        {items.slice(0, 2).map((item, idx) => (
          <Link
            to={`/sub-category-products/${item?.CodeKalaSubGroup}`}
            key={idx}
            className="w-full col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6"
          >
            <img
              src={item?.image || fallbackImage}
              alt={item?.title || "no-image"}
              className="w-full object-cover shadow-sm shadow-black/60 rounded-xl"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BannerGroup;
