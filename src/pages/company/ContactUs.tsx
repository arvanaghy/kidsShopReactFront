import MyMap from "@components/MyMap";
import ContactForm from "@components/contactUs/ContactForm";
import ContactInfo from "@components/contactUs/ContactInfo";



const ContactUs = () => {

  return (
    <div className="flex flex-col items-center justify-center lg:flex-row gap-6 ">
      <div
        className="text-black  bg-CarbonicBlue-500/80 w-full order-2 lg:order-1 lg:w-5/12  rounded-2xl
          flex flex-col font-EstedadMedium justify-evenly items-center shadow-2xl p-3
          gap-3
          "
      >
        <p className="font-EstedadExtraBold text-center text-base xl:py-4 w-full  mx-auto rounded-2xl xl:text-2xl leading-relaxed lg:leading-relaxed xl:leading-loose text-white p-2">
           دریافت مشاوره رایگان
        </p>
        <ContactForm />
        <ContactInfo />
      </div>
      <MyMap />
    </div>
  );
};

export default ContactUs;
