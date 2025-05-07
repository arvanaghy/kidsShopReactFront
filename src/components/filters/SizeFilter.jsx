import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SizeFilter = ({ sizes, sizeSets, setSizeSets }) => {
  const addSizeSet = (size) => {
    const newSizeSets = [...sizeSets];
    if (newSizeSets.includes(size)) {
      newSizeSets.splice(newSizeSets.indexOf(size), 1);
      return setSizeSets(newSizeSets);
    } else {
      newSizeSets.push(size);
      setSizeSets(newSizeSets);
    }
  };
  return (
    <div className="w-full">
      <h3 className="w-full text-sm xl:text-lg px-2 font-EstedadExtraBold py-0.5 xl:py-2  text-right leading-relaxed bg-gray-800 rounded-md text-gray-50 tracking-wide">
        سایز بندی :
      </h3>
      <div className="w-full py-0.5 xl:py-1.5 flex flex-col justify-start items-start gap-1">
        {sizes?.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              addSizeSet(item);
            }}
            className="w-full flex flex-row justify-start items-center gap-3 duration-300  hover:bg-gray-200 transition-all ease-in-out p-2"
          >
            {sizeSets.includes(item) ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-600"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircle}
                className="text-white border border-black rounded-full "
              />
            )}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
