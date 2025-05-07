import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import AboutUs from "@pages/AboutUs";
import MainLayout from "@layouts/MainLayout";
import Page404 from "@pages/Page404";
import Home from "@pages/Home";
import Login from "@pages/profile/Login";
import Profile from "@pages/profile/Profile";
import Register from "@pages/profile/Register";
import SMSValidate from "@pages/profile/SMSValidate";
import ContactUs from "@pages/ContactUs";
import Categories from "@pages/Categories";
import Products from "@pages/Products";
import SubCategories from "@pages/SubCategories";
import SubCategoryProducts from "@pages/SubCategoryProducts";
import Product from "@pages/Product";
import OfferedProducts from "@pages/OfferedProducts";
import ShoppingCart from "@pages/ShoppingCart";
import Search from "@pages/Search";
import UserContextProvider from "@context/UserContextProvider";
import Orders from "@pages/profile/Orders";
import Invoice from "@pages/profile/Invoice";
import EditInfo from "@pages/profile/EditInfo";
import ConfirmedOrders from "@pages/profile/ConfirmedOrders";
import UnconfirmedOrders from "@pages/profile/UnconfirmedOrders";
import Checkout from "@pages/Checkout";
import WebPayment from "@pages/WebPayment";
import Success from "@pages/paymentResults/Success";
import Failed from "@pages/paymentResults/Failed";
import SuccessMobile from "@pages/paymentResults/SuccessMobile";
import FailedMobile from "@pages/paymentResults/FailedMobile";
import BestSellingProducts from "@pages/BestSellingProducts";
import FavouritesPage from "@pages/FavouritesPage";
import ComparePage from "@pages/ComparePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: "/",
          path: "/",
          element: <Home />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/category/:categoryCode",
          element: <SubCategories />,
        },
        {
          path: "/sub-category-products/:subCategoryCode",
          element: <SubCategoryProducts />,
        },
        {
          path: "/product/:productCode",
          element: <Product />,
        },
        {
          exact: true,
          path: "/products",
          element: <Products />,
        },
        {
          exact: true,
          path: "/offered-products",
          element: <OfferedProducts />,
        },
        {
          path: "/shopping-cart",
          element: <ShoppingCart />,
        },
        {
          path: "/search/:searchPhrase",
          element: <Search />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/SMS-validate/:phoneNumber",
          element: <SMSValidate />,
        },
        {
          path: "/edit-info",
          element: <EditInfo />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/invoice",
          element: <Invoice />,
        },
        {
          path: "/unconfirmed-orders",
          element: <UnconfirmedOrders />,
        },
        {
          path: "/confirmed-orders",
          element: <ConfirmedOrders />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/web-payment",
          element: <WebPayment />,
        },
        {
          path: "/payment-success/:transID",
          element: <Success />,
        },
        {
          path: "/payment-failed",
          element: <Failed />,
        },
        {
          path: "/payment-success-mobile/:transID",
          element: <SuccessMobile />,
        },
        {
          path: "/payment-failed-mobile",
          element: <FailedMobile />,
        },
        {
          path: "/best-selling-products",
          element: <BestSellingProducts />,
        },
        {
          path: "/my-favourite",
          element: <FavouritesPage />,
        },
        {
          path: "/compare-products",
          element: <ComparePage />,
        },
      ],
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
