import { faArrowsToEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CategoryCircleCard from "@components/category/CategoryCircleCard";

interface Props {
  result: any;
}

const Category = ({ result }: Props = { result: null }) => {
  return (
    <section className="w-full max-w-2xl xl:max-w-7xl 2xl:max-w-full mx-auto py-3 xl:py-8 flex overflow-x-auto 2xl:gap-5">
      {result?.categories?.map((item: any, idx: number) => (
        <div key={idx} className="flex-shrink-0 w-24 xl:w-30">
          <CategoryCircleCard item={item} />
        </div>
      ))}
      <div className="flex-shrink-0 w-24 xl:w-30">
        <Link
          to={`/categories`}
          className={`w-full flex flex-col justify-center
                                        items-center
                                        cursor-pointer
                                        xl:hover:scale-105  duration-300  ease-in-out transition-all`}
        >
          <FontAwesomeIcon
            icon={faArrowsToEye}
            className="w-10 h-10 p-4 m-2 rounded-full text-gray-500"
          />
          <h4 className="text-xs xl:text-base text-center text-gray-900 font-EstedadMedium">
            تمام دسته بندی ها
          </h4>
        </Link>
      </div>
    </section>
  );
};

export default Category;
