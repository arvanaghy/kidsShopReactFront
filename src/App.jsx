import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
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
import Search from "@pages/search/Search";
import Profile from "@pages/profile/Profile";
import Orders from "@pages/profile/Orders";
import Invoice from "@pages/profile/Invoice";
import EditInfo from "@pages/profile/EditInfo";
import ConfirmedOrders from "@pages/profile/ConfirmedOrders";
import UnconfirmedOrders from "@pages/profile/UnconfirmedOrders";
import ShoppingCart from "@pages/cartCheckout/ShoppingCart";
import Checkout from "@pages/cartCheckout/Checkout";
import WebPayment from "@pages/cartCheckout/WebPayment";
import Success from "@pages/paymentResults/Success";
import Failed from "@pages/paymentResults/Failed";
import SuccessMobile from "@pages/paymentResults/SuccessMobile";
import FailedMobile from "@pages/paymentResults/FailedMobile";

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
        { path: "/search/:searchPhrase", element: <Search /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
        { path: "/register", element: <Register /> },
        { path: "/SMS-validate/:phoneNumber", element: <SMSValidate /> },
        { path: "/edit-info", element: <EditInfo /> },
        { path: "/orders", element: <Orders /> },
        { path: "/invoice", element: <Invoice /> },
        { path: "/unconfirmed-orders", element: <UnconfirmedOrders /> },
        { path: "/confirmed-orders", element: <ConfirmedOrders /> },
        { path: "/checkout", element: <Checkout /> },
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
