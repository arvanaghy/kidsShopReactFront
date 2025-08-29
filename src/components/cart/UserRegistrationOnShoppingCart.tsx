import JumpingDots from "@components/JumpingDots";
import { useUserValidation } from "@hooks/useAuth";
import { useUserStore } from "@store/UserStore";
import UserInfoSectionOnShoppingCart from "@components/cart/UserInfoSectionOnShoppingCart";
import UserRegistrationFormOnShoppingCart from "@components/cart/UserRegistrationFormOnShoppingCart";

const UserRegistrationOnShoppingCart = () => {
  const { user } = useUserStore();
  const { isPending, isUserValidated } = useUserValidation(user);

  if (isPending) return <JumpingDots />

  if (isUserValidated) {
    return <UserInfoSectionOnShoppingCart />;
  } else {
    return <UserRegistrationFormOnShoppingCart />
  }
}

export default UserRegistrationOnShoppingCart