/* eslint-disable react/prop-types */
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toPersianDigits } from "@utils/numeralHelpers";

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
      <h3 className="w-full text-sm px-2  tracking-wider font-EstedadExtraBold py-0.5  text-right leading-relaxed bg-gray-800 rounded-md text-gray-50 ">
        سایز بندی :
      </h3>
      <div className="w-full py-0.5 gap-0.5 flex flex-row flex-wrap justify-between items-start">
        {sizes?.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              addSizeSet(item);
            }}
            className="w-fit flex flex-row justify-start items-center gap-1  duration-300  hover:bg-gray-200 transition-all ease-in-out p-1.5  font-EstedadMedium"
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
            {toPersianDigits(item)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeFilter;
