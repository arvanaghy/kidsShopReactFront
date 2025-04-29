import { faArrowsTurnRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <main>
      <div className="flex items-center justify-start h-screen max-w-screen-xl px-4 mx-auto lg:px-8">
        <div className="flex-row-reverse items-center justify-between flex-1 max-w-lg gap-12 mx-auto lg:max-w-none lg:flex">
          <div className="flex-1 max-w-lg">
            <img src="/src/assets/images/404.png" alt="404" />
          </div>
          <div className="flex-1 max-w-xl mt-12 space-y-9 lg:mt-0">
            <h3 className="text-Purple-500 font-EstedadExtraBold">خطأ 404</h3>
            <p className="text-xl lg:text-4xl text-gray-800 font-EstedadExtraBold">
              صفحه مورد نظر یافت نشد
            </p>
            <p className="text-gray-600 font-EstedadMedium text-xs lg:text-sm">
              آدرس مورد نظر اشتباه است یا از سیستم پاک شده است
            </p>
            <Link
              to="/"
              className="inline-flex items-center font-EstedadMedium text-CarbonicBlue-500 hover:text-Purple-500 gap-x-1 hover:-translate-x-3 duration-300 transition-all ease-in-out"
            >
              <FontAwesomeIcon icon={faArrowsTurnRight} className="-scale-x-100 px-2 " />
              بازگشت به صفحه اصلی کیدزشاپ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page404;
