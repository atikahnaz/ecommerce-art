"use client";
import { useState, useContext, createContext } from "react";

//can export more than one function

export const CartItems = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // get items from localstorage

  // function to add items to cart
  //const currentItems = items;

  console.log(items);

  const addItem = (product, quantity) => {
    const itemExist = items.find((item) => item.id == product.id);
    console.log(itemExist);
    console.log(quantity);
    if (itemExist) {
      console.log("items not new");
      setItems(
        items.map((item) =>
          item.id == product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      console.log("item new");
      setItems([...items, { ...product, quantity: quantity }]);
    }
  };

  return (
    <CartItems.Provider value={{ items, addItem }}>
      {children}
    </CartItems.Provider>
  );
};
