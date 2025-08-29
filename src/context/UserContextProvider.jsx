/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import UserContext from "@context/UserContext";
import toast from "react-hot-toast";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [desktopNavbar, setDesktopNavbar] = useState(false);

  const fetchUser = () => {
    if (loading) return;
    try {
      setLoading(true);
      const _user = window.localStorage.getItem("KidsShop_user");
      if (_user) {
        setUser(JSON.parse(_user));
      }
    } catch (err) {
      toast.error("fetchUser Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_user");
      setUser([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = () => {
    if (loading) return;
    try {
      setLoading(true);
      const _cart = window.localStorage.getItem("KidsShop_cart");
      if (_cart) {
        setCart(JSON.parse(_cart));
      }
    } catch (err) {
      toast.error("fetchCart Context Error:" + err?.message);
      window.localStorage.removeItem("KidsShop_cart");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = () => {
    if (loading) return;
    try {
      const _order = window.localStorage.getItem("KidsShop_order");
      if (_order) {
        setOrder(JSON.parse(_order));
      }
    } catch (err) {
      toast.error("fetchOrder Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_order");
      setOrder([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorite = () => {
    if (loading) return;
    try {
      const _favorite = window.localStorage.getItem("KidsShop_favorite");
      if (_favorite) {
        setFavorite(JSON.parse(_favorite));
      }
    } catch (err) {
      toast.error("fetchFavorite Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_favorite");
      setFavorite([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompareList = () => {
    if (loading) return;
    try {
      const _compareList = window.localStorage.getItem("KidsShop_compareList");
      if (_compareList) {
        setCompareList(JSON.parse(_compareList));
      }
    } catch (err) {
      toast.error("fetchCompareList Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_compareList");
      setCompareList([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (__user) => {
    if (loading) return;
    try {
      setLoading(true);
      window.localStorage.setItem("KidsShop_user", JSON.stringify(__user));
      setUser(__user);
    } catch (err) {
      toast.error("updateUser Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_user");
      setUser([]);
    } finally {
      setLoading(false);
    }
  };

  const updateCart = (__cart) => {
    if (loading) return;
    try {
      setLoading(true);
      setCart(__cart);
      window.localStorage.setItem("KidsShop_cart", JSON.stringify(__cart));
    } catch (err) {
      setCart([]);
      toast.error("updateCart Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_cart");
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = (__order) => {
    if (loading) return;
    try {
      setLoading(true);
      setOrder(__order);
      window.localStorage.setItem("KidsShop_order", JSON.stringify(__order));
    } catch (err) {
      setOrder([]);
      toast.error("updateOrder Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_order");
    } finally {
      setLoading(false);
    }
  };

  const updateFavorite = (__favorite) => {
    if (loading) return;
    try {
      setLoading(true);
      setFavorite(__favorite);
      window.localStorage.setItem(
        "KidsShop_favorite",
        JSON.stringify(__favorite)
      );
    } catch (err) {
      setFavorite([]);
      toast.error("updateFavorite Error:" + err.message);
      window.localStorage.removeItem("KidsShop_favorite");
    } finally {
      setLoading(false);
    }
  };

  const updateCompare = (__compareList) => {
    if (loading) return;
    try {
      setLoading(true);
      if (__compareList.length > 4) {
        __compareList.shift();
        toast.error("حداکثر 4 محصول را میتوانید مقایسه کنید.");
      }
      setCompareList(__compareList);
      window.localStorage.setItem(
        "KidsShop_compareList",
        JSON.stringify(__compareList)
      );
    } catch (err) {
      setCompareList([]);
      toast.error("updateCompare Error:" + err.message);
      window.localStorage.removeItem("KidsShop_compareList");
    } finally {
      setLoading(false);
    }
  };

  const updateDesktopNavbar = (_desktopNavbar) => {
    setDesktopNavbar(_desktopNavbar);
  };

  useEffect(() => {
    fetchUser();
    fetchCart();
    fetchOrder();
    fetchFavorite();
    fetchCompareList();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        fetchUser,
        cart,
        updateCart,
        fetchCart,
        order,
        updateOrder,
        fetchOrder,
        favorite,
        updateFavorite,
        fetchFavorite,
        compareList,
        updateCompare,
        fetchCompareList,
        desktopNavbar,
        updateDesktopNavbar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
