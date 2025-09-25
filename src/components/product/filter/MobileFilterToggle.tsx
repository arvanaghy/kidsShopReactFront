// MobileFilterToggle.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

interface MobileFilterToggleProps {
  setIsModal: (modal: boolean) => void;
}

const MobileFilterToggle = ({ setIsModal }: MobileFilterToggleProps) => {
  return (
    <button
      onClick={() => setIsModal(true)}
      className="md:hidden fixed bottom-[10vh] z-50 left-4 bg-blue-700/90 p-4 px-5 rounded-full text-white shadow-md shadow-black/80 hover:bg-blue-900/90"
    >
      <FontAwesomeIcon icon={faFilter} />
    </button>
  );
};

export default MobileFilterToggle;