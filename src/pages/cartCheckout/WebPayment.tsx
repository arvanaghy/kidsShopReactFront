import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "@components/Loading";

const WebPayment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const authority = queryParams.get("Authority");
  const status = queryParams.get("Status");

  const navigate = useNavigate();

  const handleResult = async () => {
    document.body.style.overflow = "hidden";
    try {
      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/v2/payment-callback`,
        {
          Authority: authority,
        }
      );
      if (status == 200) {
        toast.success(data?.message);
        setTimeout(() => {
          document.body.style.overflow = "auto";
          navigate(`/payment-success/${data.result}`, { replace: true });
        }, 3000);
      } else if (status === 403) {
        toast.error(data?.message);
        navigate("/payment-failed", { replace: true });
      } else {
        toast.error(data?.message);
        setTimeout(() => {
          document.body.style.overflow = "auto";
          navigate("/payment-failed", { replace: true });
        }, 3000);
      }
    } catch (error) {
      toast.error(" پرداخت آنلاین " + error.message);
    }
  };

  useEffect(() => {
    handleResult();
  }, []);

  return <Loading />;
};

export default WebPayment;
