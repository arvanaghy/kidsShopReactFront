import JumpingDots from '@components/JumpingDots';
import { faSquarePhoneFlip, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContactForm } from '@hooks/useGeneralSetting';
import { useEffect, useRef, useState } from 'react'

const ContactModal = () => {
    const [contactWithUsModal, setContactWithUsModal] = useState(false);
    const contactWithUsModalRef = useRef<HTMLDivElement>(null);
    const contactWithUsButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                contactWithUsModalRef.current &&
                contactWithUsButtonRef.current &&
                !contactWithUsModalRef.current.contains(event.target as Node) &&
                !contactWithUsButtonRef.current.contains(event.target as Node)
            ) {
                setContactWithUsModal(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const { isPending, submitContactForm } = useContactForm();


    return (
        <>
            <button
                disabled={isPending}
                ref={contactWithUsButtonRef}
                onClick={() => {
                    setContactWithUsModal((prev) => !prev);
                }}
                className="fixed bottom-[12vh] md:bottom-[8vh] right-4 md:right-10 z-30 p-0 m-0"
            >
                <FontAwesomeIcon
                    icon={faSquarePhoneFlip}
                    className={`text-6xl opacity-90 lg:opacity-70
          duration-300 ease-in-out transition-all
        ${contactWithUsModal
                            ? "text-green-800 hover:text-green-500"
                            : "text-green-500 hover:text-green-700"
                        }
          `}
                />
            </button>

            <div
                ref={contactWithUsModalRef}

                className={`fixed
          bottom-[20vh] right-4
          w-fit
          md:bottom-[18vh] md:right-10 z-30 p-3 bg-gray-100 shadow-md shadow-gray-300 rounded-lg flex flex-col justify-center items-center gap-2
          ${contactWithUsModal ? "" : "hidden"}
          `}>

                <div className="w-full flex flex-row items-center justify-between">
                    <h2 className="font-EstedadExtraBold tracking-wide leading-relaxed py-0.5 text-center w-fit">
                        ارتباط با ما
                    </h2>
                    <button
                        onClick={() => setContactWithUsModal(false)}
                        className="p-1 w-fit
          hover:text-red-500 transition-all duration-300 ease-in-out
          "
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <form
                    onSubmit={(e) => submitContactForm(e)}
                    className="flex flex-col justify-center items-center gap-2"
                >
                    <input
                        type="text"
                        name="info"
                        placeholder="نام خود را وارد کنید"
                        className="w-full py-2 px-3 rounded-lg shadow-md shadow-gray-300 font-EstedadLight "
                    />
                    <input
                        type="number"
                        min={0}
                        minLength={10}
                        name="contact"
                        placeholder="شماره موبایل خود را وارد کنید"
                        className="w-full py-2 px-3 rounded-lg shadow-md shadow-gray-300 font-EstedadLight "
                    />
                    <textarea
                        name="message"
                        placeholder="پیام خود را وارد کنید"
                        className="w-full py-2 px-3 rounded-lg shadow-md shadow-gray-300 font-EstedadLight "
                    />

                    <button
                        disabled={isPending}
                        className="w-full py-2 px-3 rounded-lg shadow-md shadow-gray-300 font-EstedadLight
        text-white
        bg-green-500 hover:bg-green-700 duration-300 ease-in-out
        transition-all"
                    >{
                            isPending ? <JumpingDots color='bg-white' /> : "ارسال"
                        }
                    </button>
                </form>
            </div>

        </>
    )
}

export default ContactModal