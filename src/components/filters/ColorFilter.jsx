/* eslint-disable react/prop-types */
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DecimalToHexConverter } from "../../utils/DecimalToHexConverter";

const ColorFilter = ({ colors, colorSets, setColorSets }) => {
  const addColorSet = (color) => {
    const newColorSets = [...colorSets];
    if (newColorSets.includes(color)) {
      newColorSets.splice(newColorSets.indexOf(color), 1);
      return setColorSets(newColorSets);
    } else {
      newColorSets.push(color);
      setColorSets(newColorSets);
    }
  };
  return (
    <div className="w-full">
      <h3 className="w-full text-sm xl:text-lg px-2 font-EstedadExtraBold py-0.5 xl:py-2  text-right leading-relaxed bg-gray-800 rounded-md text-gray-50 tracking-wide">
        رنگ بندی :
      </h3>
      <div className="w-full py-1.5 flex flex-col justify-start items-start gap-1">
        {colors?.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              addColorSet(item?.ColorCode);
            }}
            className="w-full flex flex-row justify-start items-center gap-3 duration-300 font-EstedadLight hover:bg-gray-200 transition-all ease-in-out p-2"
          >
            {colorSets.includes(item?.ColorCode) ? (
              <FontAwesomeIcon
                icon={faSquareCheck}
                className="text-green-600"
              />
            ) : (
              <FontAwesomeIcon
                icon={faSquare}
                className="text-white border border-black  "
              />
            )}

            <p
              className={`w-5 h-5 rounded-full
                      border border-gray-300
                      `}
              style={{
                backgroundColor: DecimalToHexConverter(item?.ColorCode),
              }}
            ></p>

            {item?.ColorName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
