import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitContactForm } from "@services/ContactService";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
  isPending: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setMessage: (value: string) => void;
}

export const useContactForm = (): ContactFormState => {
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    try {
      setIsPending(true);
      await submitContactForm({ info: name, contact: email, message });
      navigate("/");
    } catch (error) {
    } finally {
      setIsPending(false);
      setName("");
      setEmail("");
      setMessage("");
      e.currentTarget.reset();
    }
  };

  return { name, email, message, isPending, handleSubmit, setName, setEmail, setMessage };
};