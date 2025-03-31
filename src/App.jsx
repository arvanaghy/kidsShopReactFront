import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import AboutUs from "./website/pages/AboutUs";
import MainLayout from "./website/layouts/MainLayout";
import Page404 from "./Page404";
import Home from "./website/pages/Home";
import Login from "./website/pages/profile/Login";
import Profile from "./website/pages/profile/Profile";
import Register from "./website/pages/profile/Register";
import SMSValidate from "./website/pages/profile/SMSValidate";
import ContactUs from "./website/pages/ContactUs";
import Categories from "./website/pages/Categories";
import Products from "./website/pages/Products";
import SubCategories from "./website/pages/SubCategories";
import SubCategoryProducts from "./website/pages/SubCategoryProducts";
import Product from "./website/pages/Product";
import OfferedProducts from "./website/pages/OfferedProducts";
import ShoppingCart from "./website/pages/ShoppingCart";
import Search from "./website/pages/Search";
import UserContextProvider from "./UserContextProvider";
import Orders from "./website/pages/profile/Orders";
import Invoice from "./website/pages/profile/Invoice";
import EditInfo from "./website/pages/profile/EditInfo";
import ConfirmedOrders from "./website/pages/profile/ConfirmedOrders";
import UnconfirmedOrders from "./website/pages/profile/UnconfirmedOrders";
import Checkout from "./website/pages/Checkout";
import WebPayment from "./website/pages/WebPayment";
import Success from "./website/pages/paymentResults/Success";
import Failed from "./website/pages/paymentResults/Failed";
import SuccessMobile from "./website/pages/paymentResults/SuccessMobile";
import FailedMobile from "./website/pages/paymentResults/FailedMobile";
import BestSellingProducts from "./website/pages/BestSellingProducts";

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
          path: "/categoires",
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
