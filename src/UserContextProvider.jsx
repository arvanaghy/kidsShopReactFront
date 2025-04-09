/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import UserContext from './UserContext';
import toast from 'react-hot-toast';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);


  const fetchUser = () => {
    try {
      const _user = window.localStorage.getItem("KidsShop_User");
      if (_user) {
        setUser(JSON.parse(_user));
      }
    } catch (err) {
      toast.error('fetchUser Context Error:' + err.message);
      window.localStorage.removeItem("KidsShop_User");
      setUser([]);
    }
  }


  const fetchCart = () => {
    try {
      const _cart = window.localStorage.getItem("KidsShop_cart");
      if (_cart) {
        setCart(JSON.parse(_cart));
      }
    } catch (err) {
      toast.error('fetchCart Context Error:' + err?.message);
      window.localStorage.removeItem("KidsShop_cart");
      setCart([]);
    }
  }


  const fetchOrder = () => {
    try {
      const _order = window.localStorage.getItem("KidsShop_order");
      if (_order) {
        setOrder(JSON.parse(_order));
      }
    } catch (err) {
      toast.error('fetchOrder Context Error:' + err.message);
      window.localStorage.removeItem("KidsShop_order");
      setOrder([]);
    }
  }

  const updateUser = (__user) => {
    try {
      window.localStorage.setItem("KidsShop_User", JSON.stringify(__user));
      setUser(__user);
    } catch (err) {
      toast.error('updateUser Context Error:' + err.message);
      window.localStorage.removeItem("KidsShop_User");
      setUser([]);
    }
  }

  const updateCart = (__cart) => {
    try {
      setCart(__cart);
      window.localStorage.setItem("KidsShop_cart", JSON.stringify(__cart));

    } catch (err) {
      setCart([]);
      toast.error('updateCart Context Error:' + err.message);
      window.localStorage.removeItem("KidsShop_cart");
    }
  }

  const updateOrder = (__order) => {
    try {
      setOrder(__order);
      window.localStorage.setItem("KidsShop_order", JSON.stringify(__order));

    } catch (err) {
      setOrder([]);
      toast.error('updateOrder Context Error:' + err.message);
      window.localStorage.removeItem("KidsShop_order");
    }
  }


  useEffect(() => {
    fetchUser();
    fetchCart();
    fetchOrder();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, cart, updateCart, order, updateOrder }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;