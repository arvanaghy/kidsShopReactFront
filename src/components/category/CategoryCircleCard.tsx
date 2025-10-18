import { Link } from "react-router-dom";
import { categoryImageModeSelector } from "@utils/imageModeSelector";
const CategoryCircleCard = ({
  item = {
    Code: 0,
    Name: "",
    PicName: "",
  },
  colSpan = "col-span-12",
}) => {

  const imageSrcUrl = categoryImageModeSelector(item);
  return (
    <Link
      to={`/category/${Math.floor(item?.Code)}`}
      className={`w-full flex flex-col justify-center
                        items-center
                        cursor-pointer
                        md:hover:scale-105  duration-300  ease-in-out transition-all ${colSpan}`}
    >
      <img
        src={imageSrcUrl}
        alt={item?.Name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23FFFFFF'/%3E%3C/svg%3E";
        }}
        className="w-20 h-20 xl:w-24 xl:h-24 m-1 xl:m-2 rounded-full shadow-md shadow-gray-300"
      />
      <h4 className="text-xs xl:text-base 2xl:text-lg text-center text-gray-900 font-EstedadMedium line-clamp-1">
        {item?.Name}
      </h4>
    </Link>
  );
};

export default CategoryCircleCard;
