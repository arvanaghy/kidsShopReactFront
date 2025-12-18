import AdminSideBar from "@components/admin/AdminSideBar";
import Loading from "@components/Loading";
import { useAdminValidation } from "@hooks/useAuth";
import { useUserStore } from "@store/UserStore";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, clearUser } = useUserStore();
  const { isPending, isAdminValidated } = useAdminValidation(user);

  const navigate = useNavigate();

  if (isPending) return <Loading />;

  if (!isAdminValidated) return (
    <div className="flex w-full h-full min-h-[90vh] items-center flex-col justify-center gap-6 ">
      <p className="flex flex-row inset-0 font-EstedadExtraBold tracking-wider justify-center items-center w-full h-full text-2xl text-center">
        لطفا ابتدا وارد حساب کاربری خود شوید
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          clearUser();
          navigate("/login");
        }}
        className="bg-Purple-500 hover:bg-CarbonicBlue-500 hover:text-white text-white py-2 px-4 rounded-lg font-EstedadMedium transition-all duration-150 ease-in-out ">ورود به حساب کاربری</button>
    </div>
  );

  return (
    <div className="w-full h-full grid grid-cols-12 min-h-[90vh] items-start justify-start ">
      <div className="w-full h-full col-span-12 md:col-span-3 xl:col-span-2 items-start justify-start ">
        <AdminSideBar />
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

export default AdminLayout;
