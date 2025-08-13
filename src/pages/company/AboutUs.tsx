
import useAboutUsInfo from "@hooks/useAboutUsInfo";
import { AboutInfoType } from "@types/AboutInfoType";
import AboutUsInfoCard from "@components/aboutUs/AboutUsInfoCard";

const AboutUs: React.FC = () => {

  const { aboutUsInfo, loading } = useAboutUsInfo();
  if (loading) return null;

  return (
    <div className="w-full flex flex-col justify-around items-center min-h-[90vh] h-full space-y-5 py-8 ">
      <h1 className="w-fit font-EstedadExtraBold text-center  text-gray-500 bg-white border border-gray-500/40 drop-shadow-md rounded-3xl
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
        {aboutUsInfo?.length > 0 &&
          aboutUsInfo?.map((item: AboutInfoType) => (
            <AboutUsInfoCard
              key={item?.Code}
              Title={item?.Title}
              Comment={item?.Comment}
            />
          ))}
      </div>
    </div>
  );
};

export default AboutUs;
