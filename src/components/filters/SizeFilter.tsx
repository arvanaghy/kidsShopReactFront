/* eslint-disable react/prop-types */
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toPersianDigits } from "@utils/numeralHelpers";

const SizeFilter = ({ sizes, sizeSets, setSizeSets } : { sizes: (number | string)[]; sizeSets: (number | string)[]; setSizeSets: (sizeSets: (number | string)[]) => void; }) => {
  const addSizeSet = (size : number | string) => {
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
      <h3 className="w-full text-sm p-2 tracking-wider font-EstedadMedium text-right leading-relaxed bg-gray-800 rounded-md text-gray-50 ">
        سایز بندی :
      </h3>
      <div className="w-full py-0.5 gap-0.5 flex flex-row flex-wrap justify-between items-start">
        {sizes?.map((item: number | string, idx: number) => (
          <button
            key={idx}
            onClick={() => {
              addSizeSet(item);
            }}
            className="w-fit flex flex-row justify-start items-center gap-2 p-1.5  font-EstedadLight text-xs text-gray-100"
          >
            {sizeSets.includes(item) ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-400"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircle}
                className="text-white border border-green-400 rounded-full "
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
