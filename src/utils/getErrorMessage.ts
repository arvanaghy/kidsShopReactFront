import { AxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = "خطایی رخ داده است",
  refer: string = ""
): string => {
  if (error instanceof AxiosError) {
    return (
      refer + (error.response?.data?.message || error.message || defaultMessage)
    );
  }
  if (error instanceof Error) {
    return refer + (error.message || defaultMessage);
  }
  return refer + defaultMessage;
};
