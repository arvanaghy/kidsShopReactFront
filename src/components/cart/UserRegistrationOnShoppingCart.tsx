import { useState } from "react";
import JumpingDots from "@components/JumpingDots";
import { useUserValidation } from "@hooks/useAuth";
import { useUserStore } from "@store/UserStore";
import UserInfoSectionOnShoppingCart from "@components/cart/UserInfoSectionOnShoppingCart";
import UserRegistrationFormOnShoppingCart from "@components/cart/UserRegistrationFormOnShoppingCart";

const UserRegistrationOnShoppingCart = () => {
  const { user } = useUserStore();
  const { isPending, isUserValidated } = useUserValidation(user);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleOtpSuccess = () => {
    setIsOtpVerified(true);
  };

  if (isPending) return <JumpingDots />;

  if (isUserValidated || isOtpVerified) {
    return <UserInfoSectionOnShoppingCart />;
  }

  return <UserRegistrationFormOnShoppingCart onOtpSuccess={handleOtpSuccess} />;
};

export default UserRegistrationOnShoppingCart;