/* eslint-disable react/prop-types */
import React from "react";

const OfferProductCard = ({ item }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="w-2/3">
        <p>{item?.SPrice}</p>
        <h3>{item?.Name}</h3>
        <p>{item?.Description}</p>
      </div>

    </div>
  );
};

export default OfferProductCard;
