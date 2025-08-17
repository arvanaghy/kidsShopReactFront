import { useContactForm } from "@hooks/useContactForm";

const ContactForm = () => {
  const { name, email, message, isPending, handleSubmit, setName, setEmail, setMessage } = useContactForm();

  return (
    <form
      onSubmit={handleSubmit}
      className={`xl:max-h-[65vh] h-full w-full xl:p-10 rounded-3xl flex flex-col justify-evenly gap-3 px-1.5`}
    >
      <div>
        <div className="flex flex-row justify-between gap-4">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full bg-white/60 rounded-xl shadow-lg placeholder:text-white text-sm placeholder:indent-8 font-EstedadMedium py-3 placeholder:font-EstedadMedium indent-4"
            type="text"
            name="firstname"
            placeholder="نام و نام خانوادگی"
          />
        </div>
      </div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full bg-white/60 rounded-xl shadow-lg placeholder:text-white placeholder:indent-8 text-sm font-EstedadMedium placeholder:font-EstedadMedium py-3 indent-4"
        type="text"
        name="email"
        placeholder="ایمیل یا شماره تماس"
      />
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        rows={4}
        className="w-full bg-white/60 rounded-xl shadow-lg placeholder:text-white placeholder:indent-8 text-sm font-EstedadMedium placeholder:font-EstedadMedium py-3 indent-4"
        placeholder="پیام شما"
      />
      <button
        className="w-full mx-auto text-white bg-Teal-500/50 font-EstedadExtraBold rounded-xl shadow-2xl border border-Teal-500/80 text-sm py-2.5 transition-all duration-300 delay-100 hover:bg-Teal-500/10 hover:border-Teal-500"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "در حال ارسال..." : "ثبت درخواست"}
      </button>
    </form>
  );
};

export default ContactForm;