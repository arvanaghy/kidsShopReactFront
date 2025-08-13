import { useState, useEffect } from "react";
import { getAboutUsInfo } from "@api/aboutUsInfo";
import { AboutInfoType } from "@types/AboutInfoType";

const useAboutUsInfo = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState<AboutInfoType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchAboutUsInfo = async () => {
    try {
      setLoading(true);
      const data = await getAboutUsInfo();
      setAboutUsInfo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUsInfo();
  }, []);

  return { aboutUsInfo, loading };
};

export default useAboutUsInfo;
