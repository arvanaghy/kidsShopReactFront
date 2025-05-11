import React, { useContext } from "react";
import UserContext from "@context/UserContext";
import ProductCard from "../components/ProductCard"; // adjust path

const FavouritesPage = () => {
  const { favourite } = useContext(UserContext);

  return (
    <div className="px-4 py-8 min-h-screen bg-white text-black">
      <h1 className="text-center text-xl lg:text-3xl font-EstedadExtraBold py-4  lg:text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
        لیست علاقه مندی ها
      </h1>
      <div className="grid grid-cols-12 py-6 ">
        {favourite.length === 0 ? (
          <p className="w-full col-span-12 text-gray-600">
            هیچ محصولی به لیست علاقه مندی ها اضافه نکرده اید!
          </p>
        ) : (
          <div className="col-span-12 grid grid-cols-12 gap-4">
            {favourite.map((item) => (
              <ProductCard
                key={item.Code}
                item={item}
                colSpan={`col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
