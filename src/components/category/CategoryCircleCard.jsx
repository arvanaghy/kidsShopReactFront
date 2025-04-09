/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryCircleCard = ({
  item = {
    Code: 0,
    Name: "",
    PicName: "",
    Comment: "",
  },
  colSpan = "col-span-12",
}) => {
  return (
    <Link
      to={`/category/${Math.floor(item?.Code)}`}
      className={`w-full flex flex-col justify-center
                        items-center
                        cursor-pointer
                        hover:scale-105  duration-300  ease-in-out transition-all ${colSpan}`}
    >
      <img
        src={
          "https://kidsshopapi.electroshop24.ir/category-images/webp/" +
          `${item?.PicName}.webp`
        }
        alt={item?.Name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23FFFFFF'/%3E%3C/svg%3E";
        }}
        className="w-24 h-24 m-2 rounded-full shadow-md shadow-gray-300"
      />
      <h4 className="text-base text-center text-gray-900 font-EstedadMedium">
        {item?.Name}
      </h4>
    </Link>
  );
};

export default CategoryCircleCard;
