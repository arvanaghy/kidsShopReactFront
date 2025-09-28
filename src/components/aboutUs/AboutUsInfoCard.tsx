import { AboutProps } from "@definitions/CompanyType";
const AboutUsInfoCard: React.FC<AboutProps> = ({ Title, Comment }) => {
  return (
    <div
      className="border
              flex flex-col justify-between items-center w-full h-full bg-white rounded-2xl
              border-gray-500/40
              col-span-12
              md:col-span-4
              lg:col-span-4
              xl:col-span-4
              p-2
              lg:p-4
              xl:p-6
              overflow-scroll
              ">
      <span className="
              text-base
              sm:text-lg
              md:text-lg
              lg:text-xl
              xl:text-2xl
              2xl:text-3xl
              font-EstedadExtraBold
              text-gray-800 p-2 rounded-xl
              truncate

              whitespace-break-spaces ">
        {Title}
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
               font-EstedadMedium text-justify text-gray-500 leading-relaxed
               text-pretty
              ">
        {Comment}
      </p>
    </div>
  )
}

export default AboutUsInfoCard