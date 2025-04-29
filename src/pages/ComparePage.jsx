import React, { useContext } from "react";
import UserContext from "@context/UserContext";

const ComparePage = () => {
  const { compareList, clearCompare } = useContext(UserContext);

  return (
    <div className="p-4 min-h-screen bg-white text-black">
      <h1 className="lg:w-fit text-center mt-10 lg:mt-4 text-xl lg:text-3xl font-EstedadExtraBold py-4  lg:text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
        مقایسه محصولات
      </h1>
      {compareList.length === 0 ? (
        <p>محصولی برای مقایسه انتخاب نشده است</p>
      ) : (
        <>
          <div className="overflow-x-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-10">
            {compareList.map((item) => (
              <div key={item.Code} className="border rounded-lg p-4">
                <img
                  src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                    item.GCode
                  )}/${Math.floor(item.SCode)}/${item.PicName}.webp`}
                  alt={item.Name}
                  className="w-full h-40 object-contain mb-2"
                />
                <h2 className="font-bold text-lg text-blue-800">{item.Name}</h2>
                <p>Group: {item.GName}</p>
                <p>Subgroup: {item.SName}</p>
                <p className="text-green-700 font-bold">
                  Price: {item.Price?.toLocaleString()} ریال
                </p>
                {/* You can display sizes/colors here too */}
              </div>
            ))}
          </div>
          <button
            onClick={clearCompare}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            پاگ کردن لیست مقایسه{" "}
          </button>
        </>
      )}
    </div>
  );
};

export default ComparePage;
