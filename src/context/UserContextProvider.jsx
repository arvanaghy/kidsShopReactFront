/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import UserContext from "@context/UserContext";
import toast from "react-hot-toast";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUser = () => {
    if (loading) return;
    try {
      setLoading(true);
      const _user = window.localStorage.getItem("KidsShop_User");
      if (_user) {
        setUser(JSON.parse(_user));
      }
    } catch (err) {
      toast.error("fetchUser Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_User");
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

  const fetchFavourite = () => {
    if (loading) return;
    try {
      const _favourite = window.localStorage.getItem("KidsShop_favourite");
      if (_favourite) {
        setFavourite(JSON.parse(_favourite));
      }
    } catch (err) {
      toast.error("fetchFavourite Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_favourite");
      setFavourite([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (__user) => {
    if (loading) return;
    try {
      setLoading(true);
      window.localStorage.setItem("KidsShop_User", JSON.stringify(__user));
      setUser(__user);
    } catch (err) {
      toast.error("updateUser Context Error:" + err.message);
      window.localStorage.removeItem("KidsShop_User");
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

  const updateFavourite = (newFavourite) => {
    if (loading) return;
    try {
      setLoading(true);
      setFavourite(newFavourite);
      window.localStorage.setItem("KidsShop_favourite", JSON.stringify(newFavourite));
    } catch (err) {
      setFavourite([]);
      toast.error("updateFavourite Error:" + err.message);
      window.localStorage.removeItem("KidsShop_favourite");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = (product) => {
    const exists = favourite.find((f) => f.Code === product.Code);
    const newFavourite = exists
      ? favourite.filter((f) => f.Code !== product.Code)
      : [...favourite, product];
    updateFavourite(newFavourite);
  };

  const [compareList, setCompareList] = useState([]);

const toggleCompare = (product) => {
  const exists = compareList.find((p) => p.Code === product.Code);

  let updated;
  if (exists) {
    updated = compareList.filter((p) => p.Code !== product.Code);
  } else if (compareList.length < 3) {
    updated = [...compareList, product];
  } else {
    toast.error("You can only compare 3 products at a time.");
    return;
  }

  setCompareList(updated);
  window.localStorage.setItem("KidsShop_compare", JSON.stringify(updated));
};

const clearCompare = () => {
  setCompareList([]);
  window.localStorage.removeItem("KidsShop_compare");
};

  useEffect(() => {
    fetchUser();
    fetchCart();
    fetchOrder();
    fetchFavourite();
    const saved = localStorage.getItem("KidsShop_compare");
  if (saved) setCompareList(JSON.parse(saved));
  }, []);

  return (
    <UserContext.Provider
      value={{ user, updateUser, cart, updateCart, order, updateOrder, favourite, updateFavourite, toggleFavourite, compareList,
        toggleCompare,
        clearCompare,}}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
