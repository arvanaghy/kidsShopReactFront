import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AboutUs = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data, status } = await axios.get(
        "https://api.electroshop24.ir/api/v1/about-us",
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 200) throw new Error(data?.message);
      setData(data?.result);
    } catch (error) {
      toast.error(
        " درباره ما : " + error?.message ||
          error?.response?.data?.message ||
          "خطا در اتصال"
      );
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col justify-around items-center min-h-[90vh] space-y-5 pb-8 ">
      <h1 className="w-fit font-EstedadExtraBold text-center  text-CarbonicBlue-500 bg-white border border-CarbonicBlue-500/40 drop-shadow-md rounded-3xl
      text-base py-3 px-5 mt-12
      sm:text-lg sm:py-4 sm:px-7
      md:text-2xl md:py-5 md:px-10
      lg:text-3xl lg:py-6 lg:px-14 sm:mt-0
      xl:text-4xl xl:py-7 xl:px-16
      2xl:text-5xl 2xl:py-8 2xl:px-20
      ">
        با ما بیشتر آشنا شوید
      </h1>
      
      <div className="w-full grid place-items-center
      grid-cols-12 
      px-4
      gap-3
      xl:gap-6 xl:px-6
      min-h-[40vh] ">
        {data &&
          data?.length > 0 &&
          data?.map((item) => (
            <div
              key={item?.Code}
              className="border
              flex flex-col justify-between items-center w-full h-full bg-white rounded-2xl
              border-CarbonicBlue-500/40
              col-span-12
              md:col-span-4
              lg:col-span-4
              overflow-hidden
              "
            >
              <span className="
              text-base
              sm:text-lg
              md:text-lg
              lg:text-xl
              xl:text-2xl
              2xl:text-3xl
              font-EstedadExtraBold
              text-CarbonicBlue-500 p-2 rounded-xl
              truncate

              whitespace-break-spaces ">
                {item?.Title}
              </span>
              <p className="
              truncate
              p-4
              whitespace-break-spaces
              text-xs
              sm:text-sm
              md:text-sm
              lg:text-base
              xl:text-lg
              2xl:text-lg
              overflow-hidden
               font-EstedadMedium text-justify  leading-relaxed
               text-pretty 
              ">
                {item?.Comment}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AboutUs;
