import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MyMap from "@components/MyMap";

interface IContactUs {
  info: string;
  contact: string;
  message: string;
}


const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    try {
      setIsPending(true);
      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/contact-us`,
        {
          info: name,
          contact: email,
          message: message,
        }
      );
      if (status !== 200) throw new Error(data?.message);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
      setName("");
      setEmail("");
      setMessage("");
      e.currentTarget.reset()
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="relative ">
        <div
          className="hidden  text-black absolute bg-CarbonicBlue-500/80 w-1/3 rounded-2xl xl:min-h-[40vh] 
          lg:top-[5%] lg:right-10
          xl:top-[15%] xl:right-24 z-40 lg:flex flex-col font-EstedadMedium justify-evenly items-center shadow-2xl py-10"
        >
          <form
            onSubmit={(e) => handleSubmit(e)}
            className=" xl:max-h-[65vh] h-full w-full xl:p-10 rounded-3xl flex flex-col justify-evenly gap-3 px-1.5"
          >
            <div className="font-EstedadExtraBold text-center text-base xl:py-4 w-full  mx-auto rounded-2xl xl:text-2xl  text-white">
              برای دریافت مشاوره رایگان فرم زیر را پر کنید
            </div>
            <div>
              <div className="flex flex-row justify-between gap-4">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className=" w-full   bg-white/60 rounded-3xl shadow-lg placeholder:text-white text-sm placeholder:indent-8 font-EstedadMedium  py-1.5
                    placeholder:font-EstedadMedium  indent-4"
                  type="text"
                  name="firstname"
                  placeholder="نام و نام خانوادگی"
                />
              </div>
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className=" w-full   bg-white/60 rounded-3xl shadow-lg placeholder:text-white placeholder:indent-8 text-sm font-EstedadMedium placeholder:font-EstedadMedium   py-1.5   indent-4"
              type="text"
              name="email"
              placeholder="ایمیل یا شماره تماس"
            />
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              rows={4}
              className=" w-full  bg-white/60 rounded-3xl shadow-lg placeholder:text-white placeholder:indent-8 text-sm font-EstedadMedium placeholder:font-EstedadMedium  
               py-1.5 indent-4"
              placeholder="پیام شما"
            />
            <div className="text-xl text-black leading-relaxed bg-stone-50/80  rounded-3xl w-full flex justify-center items-center font ">
              <div className="w-full">
                <ul className="flex flex-col  p-4 space-y-2 font-EstedadMedium ">
                  <li className="text-sm xl:text-xl leading-relaxed text-CarbonicBlue-500">
                    شماره تماس :
                    <span className="text-black px-1.5 xl:text-lg">
                      ۰۹۱۴۹۲۷۶۵۹۰
                    </span>
                  </li>
                  <li className="text-sm xl:text-xl leading-relaxed text-CarbonicBlue-500">
                    آدرس :
                    <span className="text-black text-sm xl:text-lg px-1.5">
                      تبریز،شهرک ارم، منطقه ۷، دوبانده،جنب بیمه ما
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className=" w-full lg:w-4/12 mx-auto text-white bg-Teal-500/50 font-EstedadExtraBold rounded-3xl shadow-2xl border border-Teal-500/80 text-sm py-2.5 transition duration-200 hover:scale-105"
              type="submit"
            >
              ثبت درخواست
            </button>
          </form>
        </div>
        <MyMap />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="lg:hidden bg-CarbonicBlue-500 max-h-[65vh] h-full w-full p-4 my-3  flex flex-col justify-evenly gap-3"
      >
        <div className="font-EstedadExtraBold text-center text-xl py-4 w-full lg:w-4/12 mx-auto rounded-2xl lg:text-2xl  text-white">
          فرم تماس
        </div>
        <div>
          <div className="flex flex-row justify-between gap-4">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className=" w-full   bg-white/60 rounded-3xl shadow-lg placeholder:text-white placeholder:indent-8 font-EstedadMedium placeholder:font-EstedadMedium  indent-4 py-1.5"
              type="text"
              name="firstname"
              id=""
              placeholder="نام و نام خانوادگی"
            />
          </div>
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className=" w-full   bg-white/60 rounded-3xl shadow-lg placeholder:text-white placeholder:indent-8 font-EstedadMedium placeholder:font-EstedadMedium     indent-4 py-1.5"
          type="text"
          name="email"
          placeholder="ایمیل یا شماره تماس"
        />
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className=" w-full   bg-white/60 rounded-3xl shadow-lg placeholder:text-white placeholder:indent-8 font-EstedadMedium placeholder:font-EstedadMedium    indent-4 py-1.5"
          type="text"
          name="message"
          id=""
          placeholder="متن پیام..."
        />
        <button
          className=" w-full lg:w-4/12 mx-auto text-white bg-Teal-500/50 font-EstedadExtraBold rounded-3xl shadow-2xl border border-Teal-500/80 duration-200 hover:scale-105 py-1.5"
          type="submit"
        >
          ثبت درخواست
        </button>
      </form>
    </>
  );
};

export default ContactUs;
