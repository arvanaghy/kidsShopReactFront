import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = () => {
  return (
    <div className='flex flex-row items-center justify-center min-h-screen'>
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="flex flex-row items-center justify-center mx-auto text-7xl"
      />
    </div>
  );
};

export default Loading;