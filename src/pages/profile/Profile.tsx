import ProfileLayout from "@layouts/user/ProfileLayout";
import { useUserStore } from "@store/UserStore";
import { Link } from "react-router-dom";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { useConfirmedOrders } from "@hooks/useProfile";
import JumpingDots from "@components/JumpingDots";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user } = useUserStore();
  const { confirmedOrdersTotal, isPending } = useConfirmedOrders(user);

  return (
    <ProfileLayout>
      <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
        <div className="border rounded-2xl shadow-lg bg-white py-4 flex flex-col justify-around">
          <div className="text-2xl w-full py-6">سفارشات شما</div>
          <ul className="flex flex-row justify-around items-center ">
            <Link
              to="/confirmed-orders"
              className="flex flex-col gap-2 lg:text-5xl text-green-600"
            >
              <FontAwesomeIcon icon={faShieldHalved} />
              <p className="text-lg ">
                {isPending ? <JumpingDots /> : formatCurrencyDisplay(confirmedOrdersTotal)}
              </p>
            </Link>
          </ul>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
