import toast from "react-hot-toast";
import { fetchUnit } from "@api/generalApi";

export const GeneralSettingService = {
  getUnit: async (setUnit : any, setIsPending: any) => {
    setIsPending(true);
    try {
      const unit = await fetchUnit();
      setUnit(unit);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },
};
