/* eslint-disable react/prop-types */
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <h3 className="w-full text-sm  px-2 font-EstedadExtraBold py-0.5 text-right leading-relaxed bg-gray-800 rounded-md text-gray-50 tracking-wider">
        رنگ بندی :
      </h3>
      <div className="w-full py-0.5 flex flex-row justify-between items-center flex-wrap ">
        {colors?.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              addColorSet(item?.ColorCode);
            }}
            className="w-fit flex flex-row justify-start items-center gap-1  duration-300  hover:bg-gray-200 transition-all ease-in-out p-1.5  font-EstedadLight text-sm xl:text-base "
          >
            {colorSets.includes(item?.ColorCode) ? (
              <FontAwesomeIcon
                icon={faSquareCheck}
                className="text-green-600 border border-black"
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
