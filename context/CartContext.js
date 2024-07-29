"use client";
import { useState, useContext, createContext } from "react";

//can export more than one function

export const CartItems = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // get items from localstorage

  // function to add items to cart
  const currentItems = items || [];

  const addItem = (product) => {
    // find item in items storage
    const itemExist = currentItems.find((item) => item.id == product.id);
    if (itemExist) {
      setItems(
        items.map((item) => {
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })
      );
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  return (
    <CartItems.Provider value={{ items, addItem }}>
      {children}
    </CartItems.Provider>
  );
};
