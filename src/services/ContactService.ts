import axios from "axios";
import toast from "react-hot-toast";

interface ContactFormData {
  info: string;
  contact: string;
  message: string;
}

interface ContactResponse {
  message: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
  try {
    const { data, status } = await axios.post<ContactResponse>(
      `${import.meta.env.VITE_API_URL}/v1/contact-us`,
      formData
    );
    if (status !== 200) throw new Error(data?.message || "خطا در ارسال فرم");
    toast.success(data.message);
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error?.message || "خطا در ارسال فرم");
    throw error;
  }
};