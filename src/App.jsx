import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@layouts/website/MainLayout";
import Page404 from "@pages/Page404";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import SMSValidate from "@pages/auth/SMSValidate";
import FAQ from "@pages/company/FAQ";
import AboutUs from "@pages/company/AboutUs";
import ContactUs from "@pages/company/ContactUs";
import Categories from "@pages/category/Categories";
import SubCategoryProducts from "@pages/category/SubCategoryProducts";
import SubCategories from "@pages/category/SubCategories";
import Products from "@pages/products/Products";
import Product from "@pages/products/Product";
import OfferedProducts from "@pages/products/OfferedProducts";
import BestSellingProducts from "@pages/products/BestSellingProducts";
import FavoritesPage from "@pages/products/FavoritesPage";
import ComparePage from "@pages/products/ComparePage";
import Profile from "@pages/profile/Profile";
import Invoice from "@pages/profile/Invoice";
import EditInfo from "@pages/profile/EditInfo";
import ShoppingCart from "@pages/cartCheckout/ShoppingCart";
import WebPayment from "@pages/cartCheckout/WebPayment";
import Success from "@pages/paymentResults/Success";
import Failed from "@pages/paymentResults/Failed";
import SuccessMobile from "@pages/paymentResults/SuccessMobile";
import FailedMobile from "@pages/paymentResults/FailedMobile";
import ConfirmedOrders from "@pages/profile/ConfirmedOrders";
import ConfirmedOrderDetails from "@pages/profile/ConfirmedOrderDetails";
import UnconfirmedOrders from "@pages/profile/UnconfirmedOrders";
import ProformaDetails from "@pages/profile/ProformaDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: "/", path: "/", element: <Home /> },
        { path: "/about-us", element: <AboutUs /> },
        { path: "/contact-us", element: <ContactUs /> },
        { path: "/categories", element: <Categories /> },
        { path: "/category/:categoryCode", element: <SubCategories /> },
        {
          path: "/sub-category-products/:subCategoryCode",
          element: <SubCategoryProducts />,
        },
        { path: "/product/:productCode", element: <Product /> },
        { path: "/products", element: <Products /> },
        { path: "/offered-products", element: <OfferedProducts /> },
        { path: "/shopping-cart", element: <ShoppingCart /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
        { path: "/register", element: <Register /> },
        { path: "/SMS-validate/:phoneNumber", element: <SMSValidate /> },
        { path: "/edit-info", element: <EditInfo /> },
        { path: "/invoice", element: <Invoice /> },
        { path: "/confirmed-orders", element: <ConfirmedOrders /> },
        { path: "/confirmed-order-details/:orderCode", element: <ConfirmedOrderDetails /> },
        { path: "/unconfirmed-orders", element: <UnconfirmedOrders /> },
        { path: "/proforma-details/:orderCode", element: <ProformaDetails /> },
        { path: "/faq", element: <FAQ /> },
        { path: "/web-payment", element: <WebPayment /> },
        { path: "/payment-success/:transID", element: <Success /> },
        { path: "/payment-failed", element: <Failed /> },
        {
          path: "/payment-success-mobile/:transID",
          element: <SuccessMobile />,
        },
        { path: "/payment-failed-mobile", element: <FailedMobile /> },
        { path: "/best-selling-products", element: <BestSellingProducts /> },
        { path: "/my-favorite", element: <FavoritesPage /> },
        { path: "/compare-products", element: <ComparePage /> },
      ],
    },
    { path: "*", element: <Page404 /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
