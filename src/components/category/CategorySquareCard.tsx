import { Link } from "react-router-dom";

const CategorySquareCard = ({ item = { Code: 0, Name: "", PicName: "" } }) => {
  return (
    <Link
      to={`/category/${Math.floor(item.Code)}`}
      className="flex flex-col items-center justify-between
                    duration-300 rounded-xl
                    group
                    col-span-6  md:col-span-4
                    lg:col-span-3
                    2xl:col-span-3
                    gap-2
                    "
    >
      <img
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = import.meta.env.VITE_NO_IMAGE_URL;
        }}
        src={`${import.meta.env.VITE_CDN_URL}/category-images/webp/${
          item.PicName
        }.webp`}
        alt={item.Name}
        className="
                    group-hover:scale-105 duration-300 ease-in-out
                    rounded-xl shadow-md shadow-gray-300"
      />
      <div className="flex flex-col px-3 gap-2">
        <h4
          className="
                          text-sm
                          sm:leading-relaxed 2xl:leading-relaxed
                          2xl:text-xl 2xl:pt-2 text-center text-gray-500 font-EstedadExtraBold tracking-wider"
        >
          {item?.Name}
        </h4>
      </div>
    </Link>
  );
};

export default CategorySquareCard;
