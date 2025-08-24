import { searchPattern } from "@entity/pattern";
import { mobilePattern } from "@entity/pattern";
import { namePattern } from "@entity/pattern";
import { addressPattern } from "@entity/pattern";
import { otpPattern } from "@entity/pattern";
import { emailPattern } from "@entity/pattern";
import { messagePattern } from "@entity/pattern";

export const validateSearch = (search: string) => search?.match(searchPattern);

export const validatePhoneNumber = (phoneNumber: string) =>
  mobilePattern.test(phoneNumber);

export const validateUsername = (username: string) =>
  namePattern.test(username);

export const validateAddress = (address: string) =>
  addressPattern.test(address);

export const validateOtp = (otp: string) => otpPattern.test(otp);

export const emailValidation = (email: string) => emailPattern.test(email);

export const messageValidation = (message: string) =>
  messagePattern.test(message);

export const contactValidation = (value: string) =>
  validatePhoneNumber(value) || emailValidation(value);
