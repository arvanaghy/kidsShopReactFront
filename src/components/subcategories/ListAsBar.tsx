import { Link } from "react-router-dom";

interface ListAsBarProps {
  info: any;
}

const ListAsBar = ({ info }: ListAsBarProps) => {

  return (
    <section className="col-span-12 w-full max-w-2xl xl:max-w-7xl 2xl:max-w-full mx-auto p-3 bg-gray-300 rounded-2xl xl:py-8 flex overflow-x-auto 2xl:gap-5">
      {info?.map((item, idx) => (
        <div key={idx} className="flex-shrink-0 w-24 xl:w-30">
          <Link
            to={`/sub-category-products/${Math.floor(item?.Code)}`}
            className={`w-full flex flex-col justify-center
                                    items-center
                                    cursor-pointer
                                    md:hover:scale-105  duration-300  ease-in-out transition-all gap-2 `}
          >
            <img
              src={item?.PicName || import.meta.env.VITE_NO_IMAGE_URL}
              alt={item?.Name}
              onError={(e) => {
                e.target.src = import.meta.env.VITE_NO_IMAGE_URL;
              }}
              className="w-20 h-20 xl:w-24 xl:h-24 m-1 xl:m-2 rounded-full shadow-md shadow-gray-300 object-fill"
            />
            <h4 className="text-xs md:text-base text-center text-gray-900 font-EstedadMedium">
              {item?.Name}
            </h4>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default ListAsBar;
