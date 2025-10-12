import Loading from "@components/Loading";
import ProfileSideBar from "@components/profile/ProfileSideBar";
import { useUserValidation } from "@hooks/useAuth";
import { useUserStore } from "@store/UserStore";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const { isPending, isUserValidated } = useUserValidation(user);

  if (isPending) return <Loading />;

  if (!isUserValidated) return (
    <div className="flex w-full h-full min-h-[90vh] items-center justify-center ">
      <p className="flex flex-row  inset-0 font-EstedadExtraBold tracking-wider justify-center items-center w-full h-full text-2xl text-center">
        لطفا ابتدا وارد حساب کاربری خود شوید
      </p>
    </div>
  );

  return (
    <div className="w-full h-full grid grid-cols-12 min-h-[90vh] items-start justify-start ">
      <div className="w-full h-full col-span-12 md:col-span-3 xl:col-span-2 items-start justify-start ">
        <ProfileSideBar />
      </div>
      <div
        className="w-full h-full col-span-12
    md:col-span-9
    xl:col-span-10
    px-1.5 md:px-2
    lg:px-4
    pt-[6vh]
    md:pt-[4vh]
    lg:pt-[3vh]
    xl:pt-[1vh]
    flex flex-col justify-center items-center bg-stone-50"
      >
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
