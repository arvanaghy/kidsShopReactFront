import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <main>
      <div className="flex items-center justify-start h-screen max-w-screen-xl px-4 mx-auto lg:px-8">
        <div className="flex-row-reverse items-center justify-between flex-1 max-w-lg gap-12 mx-auto lg:max-w-none lg:flex">
          <div className="flex-1 max-w-lg">
            <img src="/src/assets/images/HPE-Self.webp" alt="404" />
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
              <svg className="w-5 h-5 mx-2 animate-pulse " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              بازگشت به صفحه اصلی کیدزشاپ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page404;
