import { useState } from "react";
import { useFAQ } from "@hooks/useGeneralSetting";
import JumpingDots from "@components/JumpingDots";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AboutProps } from "@definitions/CompanyType";

const FAQ = () => {
  const [isShowFaq, setIsShowFaq] = useState<{ [key: string]: boolean }>({});

  const { faqInfo, isPending } = useFAQ() as { faqInfo: AboutProps[] | undefined; isPending: boolean };

  if (isPending) return <JumpingDots />;

  const toggleFaq = (faqKey: string) => {
    setIsShowFaq((prevState) => ({
      ...prevState,
      [faqKey]: !prevState[faqKey] || false,
    }));
  };

  return (
    <div className="space-y-4 py-6 font-EstedadMedium flex flex-col justify-evenly">
      <div className="space-y-8 py-6">
        <h2 className="font-EstedadExtraBold drop-shadow-md text-transparent w-fit mx-auto bg-clip-text bg-gradient-to-r from-Amber-500 to-CarbonicBlue-500 py-4 text-center text-3xl px-4 lg:px-0 lg:text-3xl 2xl:text-5xl leading-relaxed">
          جواب سوالات پر تکرار مشتریان ما
        </h2>
      </div>
      <div className="bg-CarbonicBlue-500 px-6 py-8 rounded-2xl font-MontBold text-Blue-text2 space-y-4">
        {faqInfo && faqInfo.length > 0 ? (
          faqInfo.map((item: AboutProps, index: number) => (
            <div key={index}>
              <div
                onClick={() => item.Code && toggleFaq(item.Code)}
                className="flex flex-row justify-between bg-Amber-500 text-black px-4 rounded-3xl py-6 cursor-pointer hover:bg-Amber-500/80 duration-200"
              >
                <div className="text-base 2xl:text-2xl">{item.Title}</div>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={`text-2xl ${item.Code && isShowFaq[item.Code] ? "rotate-180" : ""} duration-200`}
                />
              </div>
              <div
                className={`font-MontLight bg-white rounded-3xl text-sm overflow-hidden transition-all duration-300 leading-relaxed ${item.Code && isShowFaq[item.Code] ? "max-h-[500px] py-6 px-6" : "max-h-0 py-0 px-6"
                  }`}
                style={{
                  transitionProperty: "max-height, padding",
                }}
              >
                {item.Comment}
              </div>
            </div>
          ))
        ) : (
          <div>هیچ سوالی یافت نشد.</div>
        )}
      </div>
    </div>
  );
};

export default FAQ;